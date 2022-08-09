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
        let user = new User({
            name,photo,email,password})
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
    

}