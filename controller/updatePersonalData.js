
const personalData = require("../Models/Personal")
const jwt = require("jsonwebtoken")
const User = require("../Models/Register")
const changeData = async (req, res) => {
    const { token } = req.params
    const { fname, lname, city, status, country, profession, profilePic, coverPic } = req.body
    try {
        const check = await jwt.verify(token, process.env.JWT)
        const data = await User.findOne({Email:check.id})
        const person = await personalData.findOne({Email:check.id})
        // console.log(person)
        if (check) {
            await personalData.findOneAndUpdate({ Email: check.id }, {
                $set: {
                    Name: fname ==="" ? data.Name : fname,
                    lastName: lname ==="" ? data.lastName : lname,
                    Email:check.id,
                    WorkAs: profession ==="" ? person.WorkAs : profession,
                    Status: status ==="" ? person.Status : status,
                    City: city ==="" ? person.City : city,
                    Country:country ==="" ? person.Country : country ,
                    ProfilePic:profilePic ==="" ? person.ProfilePic : profilePic ,
                    CoverPic:coverPic ==="" ? person.CoverPic: coverPic, 
                }
            })
            console.log (token)
            res.status(200).send({mess:"updated"})
        } else {
            res.send({ mess: "expire" })
        }
    } catch {
        res.status(404).send({ mess: "server error" })
        console.log("error");
    }
}

module.exports = changeData