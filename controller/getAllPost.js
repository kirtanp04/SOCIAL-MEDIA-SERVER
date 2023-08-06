const AllPosts = require("../Models/Posts")


const getAllPost = async(req,res)=>{
    try{
        const data = await AllPosts.find()
        res.status(202).send({mess:"success",data})
    }catch{
        res.status(404).send({mess:"error"})
    }
}

module.exports = getAllPost