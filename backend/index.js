const express = require("express");

const cors = require("cors");

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://swastik25:Mongodb2520@no-sql-learning.wfhnsdu.mongodb.net/?retryWrites=true&w=majority&appName=no-sql-learning')
.then((result) => console.log('connected to db'))
.catch((err) => console.log(err));

const productModel = require("./models/Product");
const Product = require("./models/Product");

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

app.get("/products", async (req, res)=>{
    try {
        const products = await productModel.find();
        res.json(products);
      } 
      catch (err) {
        res.status(500).json({ message: "Error getting products", error: err });
      }
})

app.get("/product/:id", async (req, res)=>{
    try{
        const getProductById = await productModel.findById(req.params.id)
        console.log(getProductById)
        if (!getProductById) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(getProductById)
    } catch(err){
        //console.log("000", err)
        res.status(500).json({ error: 'Server error' });
    }
})

app.listen(5002)