
const personalData = require("../Models/Personal")
const jwt = require("jsonwebtoken")

const acceptReq = async(req,res)=>{
    const{id,token} = req.params
    try{
        const check = await jwt.verify(token,process.env.JWT)
        if(check){
            const Currentuser = await personalData.findOne({Email:check.id})
            const secondUser = await personalData.findOne({Email:id})
            // console.log(user.UserRequest)
            // console.log(id)
            const datas = secondUser.sentTo.filter((val)=>val !== Currentuser.Email)
            const info = Currentuser.UserRequest.filter((val)=>val.id !== id)
            await personalData.findOneAndUpdate({Email:Currentuser.Email},{
                $set:{
                    Followers:[
                        ...Currentuser.Followers,id
                    ],
                    UserRequest:info
                }
            })
            await personalData.findOneAndUpdate({Email:id},{
                $set:{
                    Following:[
                        ...secondUser.Following,Currentuser.Email
                    ],
                    sentTo:datas
                }
            })
            
        }
        res.status(202).send({mess:"success"})
    }catch{
        res.status(404).send({mess:"error"})
    }
}

module.exports = acceptReq