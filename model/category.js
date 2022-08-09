const { Schema,model} = require('mongoose');

const categorySchema = new Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:15,
        unique:true
    
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

categorySchema.pre('save',function(){
    this.slug = this.name.toLowerCase().split(' ').join('-')+"-"+ Date.now()
});

const Category = model('Category',categorySchema)
module.exports = Category;