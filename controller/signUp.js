const User = require("../Models/Register")
const bcrypt = require("bcrypt")
const Otp = require("../Models/otp")
const personalData = require("../Models/Personal")

const Register = async (req, res) => {
    const { fname, lname, pass, email, code } = req.body
    try {
        // console.log(code)
        const check = await Otp.findOne({ otp: code })
        if (check) {
            Store(req, res, fname, lname, pass, email)
        } else {
            res.send({ mess: "incorrect code" })
        }
    } catch {
        res.status(400).send({ mess: "server error 2" })
    }

}


const Store = async (req, res, fname, lname, pass, email) => {
    try {
        const hashPass = await bcrypt.hash(pass, 10)
        const userData = {
            Name: fname,
            Email: email,
            Password: hashPass,
            lastName: lname,
        }
        const PersonalData = {
            Name: fname,
            lastName: lname,
            Email: email,
            WorkAs: "",
            Status:"",
            City:"",
            Country:"",
            ProfilePic:"https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg",
            CoverPic:"https://i.pinimg.com/736x/ce/11/6f/ce116f46e4b65a89e8890de09c1f59f0--bubble-photography-cover-quotes.jpg"
        }
        await User.create(userData)
        await personalData.create(PersonalData)

        res.send({ mess: "account created" }).status(200)
    } catch {
        res.status(404).send({ mess: "server error while account creating" })
    }
}

module.exports = Register