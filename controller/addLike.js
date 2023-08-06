
const AllPosts = require("../Models/Posts")

const addLike = async(req,res)=>{
    const{id}= req.params

    try{
        const like = await AllPosts.findOne({_id:id})
        await AllPosts.findOneAndUpdate({_id:id},{
            $set:{
                likes: like.likes + 1
            }
        })
        // console.log(like)
        res.status(202).send({mess:"success"})
        
    }catch{
        res.status(404).send({mess:"error"})
    }
}

module.exports = addLike