const express = require("express");

const cors = require("cors");

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://swastik25:Mongodb2520@no-sql-learning.wfhnsdu.mongodb.net/?retryWrites=true&w=majority&appName=no-sql-learning')
.then((result) => console.log('connected to db'))
.catch((err) => console.log(err));

const productModel = require("./models/Product")

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
//app.use(cors({ origin: "http://localhost:5173", allowedHeaders: ['Content-type', 'application-json'] }));
app.use(cors());


app.get("/", (req, res)=>{
    console.log(req)
    const newRes = {
        status : 200,
        data : "Hello, Welcome to MegaFarm",
        message : "No new message"
    }
    res.send(newRes)
})

app.post("/add-product", async (req, res)=>{
    console.log(req?.body, "sasasas")
    if(req.body != "undefined"){
        const result = await productModel.collection.insertOne(req.body)
        const newRes = {
            status : 200,
            data : "Hello, Welcome to MegaFarm",
            message : "No new message"
        }
        res.send(result)
    }
})

app.listen(5002)