

const personalData = require("../Models/Personal")
const jwt = require("jsonwebtoken")

const getData = async(req,res)=>{
    const {token} = req.params
    try{
        const verify = await jwt.verify(token,process.env.JWT)
        const data = await personalData.findOne({Email : verify.id})
        res.status(202).send({mess:"success",data})
    }catch{
        res.status(404).send({mess:"server error"})
    }
}

module.exports = getData