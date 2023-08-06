
const personalData = require("../Models/Personal")

const getSingleUser = async(req,res)=>{
    const{id}= req.params

    try{
        const user = await personalData.findOne({_id:id})
        res.status(202).send({mess:"success",user})
    }catch{
        res.status(404).send({mess:"error"})
    }
}

module.exports = getSingleUser