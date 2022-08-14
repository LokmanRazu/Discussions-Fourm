const { Schema,model } = require('mongoose')

const tagSchema = new Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlegth:15
    },
    slug:{
        type:String,
        unique:true
    },
    postCount:{
        type:Number,
        default:0
    }
},{timestamps:true});

tagSchema.pre('save', function(){
    this.slug = this.name.toLowerCase().split(' ').join('-') + '-' + Date.now();
})

const Tag = model('Tag',tagSchema);
module.exports = Tag;