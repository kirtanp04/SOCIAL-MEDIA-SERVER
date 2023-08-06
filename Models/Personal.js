const mongoose = require('mongoose')


const personalSchema = new mongoose.Schema({
    Name:{type:String,require:true},
    lastName:{type:String,require:true},
    Email:{type:String,require:true},
    WorkAs:{type:String,require:true},
    Status:{type:String,require:true},
    City:{type:String,require:true},
    Country:{type:String,require:true},
    ProfilePic:{type:String,require:true},
    CoverPic:{type:String,require:true},
    Posts:[],
    Videos:[],
    UserRequest:[{
        name:{type:String},
        pic:{type:String},
        id:{type:String}
    }],
    Followers:[],
    Following:[],
    sentTo:[]
})

const personalData = mongoose.model('personalData', personalSchema)

module.exports = personalData