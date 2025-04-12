const express = require("express");

const cors = require("cors");

const app = express();

const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://swastik25:Mongodb2520@no-sql-learning.wfhnsdu.mongodb.net/?retryWrites=true&w=majority&appName=no-sql-learning')
.then((result) => console.log('connected to db'))
.catch((err) => console.log(err));


const User = require("./models/userModel")

app.use(express.json());

app.use(cors({ origin: "http://localhost:5173" }));

app.get("/", (req, res)=>{
    const newRes = {
        status : 200,
        data : "Hello, Welcome to MegaFarm",
        message : "No new message"
    }
    res.send(newRes)
})

app.listen(5001)