
const AllPosts = require("../Models/Posts")
const personalData = require("../Models/Personal")
const jwt = require("jsonwebtoken")

const uploadPost = async(req,res)=>{
    const{token}=req.params
    const{pic,caption,video} = req.body

    try{
        const check = await jwt.verify(token,process.env.JWT)
        const findUser = await personalData.findOne({Email:check.id})
        if(video===""){
            await personalData.findOneAndUpdate({Email:check.id},{
                $set:{
                    Posts:[
                        ...findUser.Posts,pic
                    ]
                }
            })
        }else{
            await personalData.findOneAndUpdate({Email:check.id},{
                $set:{
                    Videos:[
                        ...findUser.Videos,video
                    ]
                }
            })
        }
        
        const newPhote = {
            UserID:check.id,
            name:findUser.Name,
            Post:pic,
            Video:video,
            caption:caption,
        }
        await AllPosts.create(newPhote)
        res.status(202).send({mess:"success"})
    }catch{
        res.status(404).send({mess:"error while post upload"})
    }
}

module.exports = uploadPost