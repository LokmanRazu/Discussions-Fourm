const Category = require('../model/category') ;

exports.getCategory = async (req,res,next)=>{
    try{
        const category = await Category.find();

        res.status(200).json({
            status:'SUCCESS',
            result:category.length,
            data:{
                category
            }
        })
    }catch(e){
        console.log(`I am from getCategory and Error is : ${e}`)
        next(e)
    }
};

exports.postCategory = async (req,res,next)=>{
    let { name,slug,postCount } = req.body
    try{
        const category = new Category({
            name,
            slug,
            postCount
        })
        await category.save();

        res.status(200).json({
            status:'SUCCESS',
            data:{
                category
            }
        });

    }catch(e){
        console.log(`I am from postCategory and Error is : ${e}`)
        next(e)
    }
}