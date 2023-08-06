const mongoose = require('mongoose')
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();

const postSchema = new mongoose.Schema({
    UserID:{type:String,require:true},
    name:{type:String,require:true},
    Post:{type:String},
    Video:{type:String},
    likes:{type:Number,default:0},
    Comments:[{
        user:{type:String},
        userPic:{type:String},
        dat:{type:String},
        comment:{type:String}
    }],
    caption:{type:String},
    uploadedOn:{ type:String,default: day +'/'+ month +'/'+ year}
    
})

const AllPosts = mongoose.model('allPosts', postSchema)

module.exports = AllPosts