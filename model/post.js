const { Schema,model, default: mongoose } = require('mongoose');

const postSchema = new Schema({
    title:{
        type:String,
        maxlength:20,
        trim:true

    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category'
    },
    body:{
        type:String,
        required:true,
        trim:true,
        maxlength:250
        
    },
    tags:{
        type:Schema.Types.ObjectId,
        ref:'Tag'
    },
    isAnonymus:{
        type:Boolean,
        default:false
    },
    voteCount:{
        type:Number,
        required:true,
        default:0

    },
    viewCount:{
        type:Number,
        required:true,
        default:0
    }

},{timestamps:true});

const Post = model('Post',postSchema);
module.exports = Post;