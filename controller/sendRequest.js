const jwt = require("jsonwebtoken")
const personalData = require("../Models/Personal")

const sendRequest = async(req,res)=>{
    const{token,email} = req.params
    try{
        const check = await jwt.verify(token,process.env.JWT)
        const id = check.id
        const currentUser = await personalData.findOne({Email:id})
        const findUser = await personalData.findOne({Email:email})
        const ids = findUser.Email
        const updateUser = await personalData.findOneAndUpdate({Email:email},{
                $set:{
                    UserRequest:[
                        ...findUser.UserRequest,
                        {
                            name:currentUser.Name,
                            pic:currentUser.ProfilePic,
                            id:currentUser.Email
                        }
                    ]
                }
            })
        
        await personalData.findOneAndUpdate({Email:id},{
            $set:{
                sentTo:[
                    ...currentUser.sentTo,ids
            ]
            }
        })
        res.send({mess:"success",updateUser}).status(202)
        // console.log(findUser.Email)
        
    }catch{
        res.status(404).send({mess:"error"})
    }
}

module.exports = sendRequest