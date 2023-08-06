
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../Models/Register")
const personalData = require("../Models/Personal")

const Login = async(req,res)=>{
    const {email,pass} = req.body
    try{
        const check = await User.findOne({Email:email})
        if(!check){
            res.send({mess:"Create Account"})
        }else{
            const hassPass = await bcrypt.compare(pass,check.Password)
            if(!hassPass){
                res.send({mess:"Wronge Password"})
            }else{
                const token = jwt.sign({id:check.Email},process.env.JWT,{expiresIn:"5h"})
                const data = await personalData.findOne({Email:check.Email})
                res.send({mess:"Success",token,data})
            }
        }
    }catch{
        res.status(400).send({mess:"server error"})
    }
}

module.exports = Login