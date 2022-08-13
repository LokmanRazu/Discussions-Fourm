const Post = require('../model/post');

exports.getPost = async (req,res,next) =>{
    try{
        const post = await Post.find();

        res.status(200).json({
            status:'SUCCESS',
            result:post.length,
            data:{
                post
            }
        })

    }catch(e){
        console.log(`I am from GetPost and Error is : ${e}`);
        next(e) 
    }
};

exports.getSinglePost = async (req,res,next) =>{
    try{
        const post = await Post.findById(req.params.id)

        res.status(200).json({
            status:'SUCCESS',
            result:post.length,
            data:{
                post
            }
        })

    }catch(e){
        console.log(`I am from GetSinglePost and Error is : ${e}`);
        next(e) 
    }
};

exports.postPost = async (req,res,next) =>{
    const { title,category,body,tags,isAnonymus,voteCount,viewVote } = req.body
    try{
        const post = new Post({
            title,category,body,tags,isAnonymus,voteCount,viewVote
        })

        const CreatedPost = await post.save();


        res.status(200).json({
            status:'SUCCESS',
            data:{
                CreatedPost
            }
        })

    }catch(e){
        console.log(`I am from POSTPost and Error is : ${e}`);
        next(e) 
    }
};

exports.patchPost = async (req,res,next) =>{
    try{
        const post = await Post.findByIdAndUpdate(req.params.id,req.body);


        res.status(200).json({
            status:'SUCCESS',
            data:{
                post
            }
        })

    }catch(e){
        console.log(`I am from PATCHPost and Error is : ${e}`);
        next(e) 
    }
};

exports.deletePost = async (req,res,next) =>{
    try{
        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status:'SUCCESS'
        })

    }catch(e){
        console.log(`I am from DELETEPost and Error is : ${e}`)
        next(e) 
    }
};