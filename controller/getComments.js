
const AllPosts = require("../Models/Posts")

const getComments = async(req,res)=>{
    const{id} = req.params

    try{
        const data = await AllPosts.findById({_id:id})
        const comment = data.Comments
        res.status(200).send({mess:"success",comment})
    }catch{
        res.status(404).send({mess:"error"})
    }
}

module.exports= getComments