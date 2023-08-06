const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config()
const mongoose = require("mongoose");
const router = require('./Router/router');
app.use(cors());
app.use(express.json({limit:"50mb"}))

const PORT = process.env.PORT || 9000
mongoose.connect(process.env.DB_URL).then(()=>console.log("Connected to Database"))

app.use("/api",router)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})