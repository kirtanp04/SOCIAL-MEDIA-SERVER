const AllPosts = require("../Models/Posts")
const personalData = require("../Models/Personal")
const jwt = require("jsonwebtoken")

const addComments = async (req, res) => {
    const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
    const { id, token } = req.params
    const { comm } = req.body
    try {
        // get user
        const check = await jwt.verify(token, process.env.JWT)
        const users = await personalData.findOne({Email:check.id})

        // get post
        const post = await AllPosts.findOne({ _id: id })
        
        await AllPosts.findOneAndUpdate({ _id: post._id }, {
            $set: {
                Comments: [
                    ...post.Comments,
                    {
                    user:users.Name,
                    userPic: users.ProfilePic,
                    dat: day +'/'+ month +'/'+ year,
                    comment: comm
            }]
            }
        })

        res.status(202).send({mess:"success"})



    } catch {
        res.status(400).send({ mess: "server error" })
    }
}

module.exports = addComments