const { Schema,model } = require('mongoose');
const Tag = require('./tag')
const Category = require('./category')

const postSchema = new Schema({
    title:{
        type:String,
        unique:true,
        maxlength:20,
        trim:true

    },
    category:{
        type:Schema.Types.ObjectId,
        ref:Category
    },
    body:{
        type:String,
        required:true,
        trim:true,
        maxlength:250
        
    },
    tags:{
        type:Schema.Types.ObjectId,
        ref:Tag
    },
    isAnonymus:{
        type:Boolean,
        default:false
    },
    voteCount:{
        type:Number,
        default:0

    },
    viewCount:{
        type:Number,
        default:0
    }

},{timestamps:true});

const Post = model('Post',postSchema);
module.exports = Post;