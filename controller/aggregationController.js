const Tag = require('../router/tagRouter');

exports.getTagAggreation =async (req,res,next)=>{
    try{
        const stats = await Tag.aggreate([
            { $match: {name: 'Tag3'}}
        ])

    }catch(e){
        console.log(`I am from Aggregation Controller and error is : ${e}`);
        next(e);
    }
}