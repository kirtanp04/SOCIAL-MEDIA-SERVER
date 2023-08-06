const personalData = require("../Models/Personal")
const jwt = require("jsonwebtoken")

const getRequest = async(req,res)=>{
    const{token} = req.params
    try{
        const check = await jwt.verify(token,process.env.JWT)
        if(check){
            const user = await personalData.findOne({Email:check.id})
            const data = user.UserRequest
            res.status(202).send({mess:"success",data})
        }

    }catch{
        res.status(404).send({mess:"error"})
    }
}

module.exports = getRequest