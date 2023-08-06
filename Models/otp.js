
const mongoose= require("mongoose")

const otpSchema = new mongoose.Schema({

    otp:{
        type:Number,
        required:true
    }
})

const Otp = mongoose.model("otp",otpSchema)

module.exports = Otp
