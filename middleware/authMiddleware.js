const User = require('../model/user');

const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.authentication = async (req,res,next)=>{
    try{
        let token;

            //  CHECHING THE TOKEN.. IS IT IN THE req.headers.authorization
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
            };
            if(!token){
                return res.status(403).json({
                    mesage:'Invalid token'
                })
            }

            //  VERIFY TOKEN
            const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
            console.log(decode);

           // Check if user still exist
        const freshUser = await User.findById(decode.id);
        console.log(freshUser+".......");
            req.user = freshUser;
            next()

    }catch(e){
        console.log(`I am from Authentication Middleware and Error is : ${e}`)
        next(e) ;
    }
}