const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../model/user')

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