const {Schema,model} = require('mongoose');

const userSchema = new Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlegth:15
    },
    photo:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

const User = model('User',userSchema);
module.exports = User;


