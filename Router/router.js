const express = require("express")
const { Verification } = require("../controller/Register")
const Register = require("../controller/signUp")
const Login = require("../controller/Login")
const getData = require("../controller/getPersonalData")
const changeData = require("../controller/updatePersonalData")
const allUsers = require("../controller/getUsers")
const sendRequest = require("../controller/sendRequest")
const uploadPost = require("../controller/upLoadPost")
const getAllPost = require("../controller/getAllPost")
const addLike = require("../controller/addLike")
const addComments = require("../controller/addComment")
const getComments = require("../controller/getComments")
const getSingleUser = require("../controller/getSingleUser")
const getRequest = require("../controller/getRequest")
const acceptReq = require("../controller/acceptRequest")
// const ForgetPass = require("../controller/ForgetPass")
const router = express.Router()


router.post('/register',Verification)
router.post('/verification',Register)

// login

router.post('/login',Login)

// getdata

router.get('/getdata/:token',getData)
router.get('/getusers/:token',allUsers)


// update

router.post('/update/:token',changeData)

// sendRequest

router.post('/sendrequest/:token/:email',sendRequest)

// upload posts


router.post('/uploadpost/:token',uploadPost)

// getposts

router.get('/getposts',getAllPost)

// add Like

router.put('/addlike/:id',addLike)

// addcomment

router.post('/addcomment/:id/:token',addComments)

// getcomment

router.get('/getcomment/:id',getComments)

// get single user
router.get('/singleuser/:id',getSingleUser)

// get request

router.get('/getrequest/:token',getRequest)

// accept request

router.post("/getrequest/:id/:token",acceptReq)

// forget pass

// router.post('/forgetpass',ForgetPass)


module.exports = router