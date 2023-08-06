const mongoose = require('mongoose')
const date = new Date();

const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();

const userSchema = new mongoose.Schema({
    Name:{type:String,required:true},
    Email:{type:String,required:true},
    Password:{type:String,required:true},
    lastName:{type:String,required:true},
    joinDate:{ type:String,default: day +'/'+ month +'/'+ year}
})

const User = mongoose.model('User', userSchema)

module.exports = User