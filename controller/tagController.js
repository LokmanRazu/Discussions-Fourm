const { castObject, findByIdAndDelete } = require('../model/tag');
const Tag = require('../model/tag')

exports.getTag = async (req,res,next)=>{
try{
const tags = await Tag.find();

res.status(200).json({
    status:'SUCCESS',
    result:tags.length,
    data:{
        tags
    }
})

}catch(e){
    console.log(`I am from GetTag and Error is : ${e}`)
    next(e) 
}
};

exports.getSingleTag = async (req,res,next)=>{
    try{
        const tag = await Tag.findById(req.params.id)

        res.status(200).json({
            status:'SUCCESS',
            data:{
                tag
            }
        })
    }catch(e){
        console.log(`I am from GetSingleTag and Error is : ${e}`)
        next(e)
    }
};

exports.postTag =async (req,res,next)=>{
    const { name,slug,postCount } = req.body
    try{
        const postTag = new Tag({
            name,
            slug,
            postCount
        });

        await postTag.save();

        res.status(200).json({
            status:'SUCCESS',
            result:Tag.length,
            data:{
                postTag
            }
        });

    }catch(e){
        console.log(`I am from PostTag and Error is : ${e}`)
        next(e) 
    }
};

exports.updateTag = async (req,res,next)=>{
    try{
        const updateTag = await Tag.findByIdAndUpdate(req.params.id,req.body)

        res.status(200).json({
            status:'SUCCESS',
            result:updateTag.length,
            data:{
                updateTag
            }
        });

    }catch(e){
        console.log(`I am from UpdateTag and Error is : ${e}`)
        next(e)
    }
};

exports.deteleTag = async (req,res,next)=>{
try{
    const deleteTag = await findByIdAndDelete(req.params.id);

    res.status(200).json({
        status:'SUCCESS'
    });

}catch(e){
    console.log(`I am from DeteteTag and Error is : ${e}`)
    next(e)
}
}