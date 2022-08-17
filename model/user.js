const {Schema,model} = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto') // for random Token genarate

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
    },
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date
},{timestamps:true});

// Forget Password
userSchema.methods.CreatePasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    console.log({resetToken},this.passwordResetToken)
    this.passwordResetExpires = Date.now() + 10 *10 *1000;

    return resetToken;
};

// Password changed Time
userSchema.pre('save', function(next){
    if(!this.isModified('password') || this.isNew) return next()

    this.passwordChangedAt = Date.now() - 1000 ;
})


const User = model('User',userSchema);
module.exports = User;


