const bcrypt = require('bcrypt');
const e = require('express');
const jwt = require('jsonwebtoken')
const User = require('../model/user')
const sendMail = require('../utils/email');
const crypto = require('crypto')

exports.getUser =async (req,res,next)=>{
    try{
        const user = await User.find();

        res.status(200).json({
            status:'SUCCESS',
            result:user.length,
            data:{
                user
            }
        })
        
    }catch(e){
        console.log(`I am from getUser and Error is : ${e}`)
        next(e)
    }
};

exports.postUser =async (req,res,next)=>{
    let { name,photo,email,password } = req.body
    try{
        const hashedPassword = await bcrypt.hash(password,11)
        let user = new User({
            name,
            photo,
            email,
            password:hashedPassword
        })

            await user.save();
             
            res.status(200).json({
                status:'SUCCESS',
                data:{
                    user
                }
            })

        
    }catch(e){
        console.log(`I am from postUser and Error is : ${e}`)
        next(e) 
    }
    

};

exports.LoggedInUser =async (req,res,next)=>{
    let { email,password } = req.body
    try{
        let user = await User.findOne({ email })
        console.log(user)
        if(!user){
            return res.status(403).json({
                message:'Invalid Email'
            });
        };

        const matchPassword = await bcrypt.compare(password,user.password);
        if(!matchPassword){
            return res.status(403).json({
                mesage:'Invalid password'
            })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET ,{ expiresIn:process.env.JWT_EXPIRES_IN });
            res.status(200).json({
                status:'SUCCESS',
                data:{
                    token
                }
            })

        
    }catch(e){
        console.log(`I am from postUser and Error is : ${e}`)
        next(e) ;
    }
    

};

exports.forgetPassword =async (req,res,next)=>{
try{
    // 1. Get user based on POSTed Email
    const user = await User.findOne({ email:req.body.email})
    if(!user){
        return next();
    };
             // 2.Generate the random reset token
             const resetToken = user.CreatePasswordResetToken()
                console.log(`resettoken isss ${resetToken}`)
             await user.save();

         //  3.Send it to user Email
         const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
         const message = `forgot Your Password? submit a patch request with your new pasword: ${resetURL}.
         If you did not forget your password,Please Ignore thios email`;

         try{
            await sendMail ({ email:user.email, subject:'Your password reset Token', message });
            res.status(200).json({
               status:'success',
               message:'Token sent to email'
            })
         }catch(e){
             user.PasswordResetToken = undefined
             user.passwordResetExpires = undefined
             await user.save()
            return next(e);
         }


}catch(e){
    console.log(`I am from Forget password and Error is : ${e}`)
    next(e) ;
}
};

// Reset password
exports.resetPassword =async (req,res,next)=>{
    try{
    // 1.Get user based on Token
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    console.log('hashedToken: ',hashedToken)
    const user = await User.findOne({PasswordResetToken:hashedToken,passwordResetExpires:{ $gt: Date.now() }});
    console.log('user :',user)

    // 2.If token has not expired, and there is user,set the new password
    if(!user){
        return next(new appError('Token is invalid or has expired',400))
    }
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    const newUser = await user.save();
    console.log('newuser :',newUser)
    // 3. Update ChangedPasswordAt property for the user

    // 4. Log the user in, sent JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET ,{ expiresIn:process.env.JWT_EXPIRES_IN });
    console.log('token: ',token)
    res.status(200).json({
        status:'sucsess',
        data:{
            token
        }
    })

    }catch(e){
        console.log(`I am from Reset Password and error is : ${e}`)
        next(e);
    }
};