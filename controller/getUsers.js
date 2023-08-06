
const personalData = require("../Models/Personal")
const jwt = require("jsonwebtoken")
const allUsers = async(req,res)=>{
    const {token} = req.params
    try{
        const check = await jwt.verify(token,process.env.JWT)
        const users = await personalData.find()
        const allUser = users.filter((val)=>val.Email !== check.id)
        res.send(allUser).status(200)
        // console.log(allUser)
    }catch{
        res.send({mess:"error"}).status(404)
    }
}


module.exports = allUsers