
const User = require("../Models/Register")
const nodemailer = require("nodemailer")
const Otp = require("../Models/otp")
// const bcrypt = require("bcrypt")

const Verification = async (req, res, next) => {
    const { email,fname,lname,pass } = req.body
    try {
        const check = await User.findOne({ Email: email })
        if (check) { return res.send({ mess: "Email is in Used" }) }
        else {
            const num = Math.floor(Math.random() * 9000 + 1000);
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.USER,
                    pass: process.env.PASS
                }
            });
            const mailOptions = {
                from: process.env.USER,
                to: email,
                subject: "Email Verification",
                html: `<h1> your code is </h1> ` + num
            }
            transporter.sendMail(mailOptions, async (err, info) => {
                if (err) {
                    console.log(err).status(404).send({ mess: "error to send code" })
                } else {
                    const userData = {
                        otp: num
                    }
                    await Otp.create(userData)
                    setTimeout(async () => {
                        await Otp.deleteOne({ otp: num })
                    }, 60000)
                    res.status(200).send({ mess: "sent" })
                
                }
            })
            
        }

    } catch {
        res.status(404).send({ mess: "server error" })
    }
}





module.exports = { Verification }