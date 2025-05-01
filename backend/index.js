const express = require("express");

const cors = require("cors");

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://swastik25:Mongodb2520@no-sql-learning.wfhnsdu.mongodb.net/?retryWrites=true&w=majority&appName=no-sql-learning')
.then((result) => console.log('connected to db'))
.catch((err) => console.log(err));

const productModel = require("./models/Product");
const User = require("./models/User");

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
    //console.log(req?.body, "sasasas")
    if(req.body != "undefined"){
        const result = await productModel.collection.insertOne(req.body)
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

app.put("/product/:id", async (req, res)=>{
    try{
        const filter = {_id:req.params.id}
        const updateDocument = {$set: req.body}
        const updateData = await productModel.updateOne(filter, updateDocument)
        console.log(updateData)
        res.send(updateData)
    } catch(error){
        console.log(`Logs are: ${error}`)
    }


})

app.post("/signup", (req, res)=>{
    let error = {}
    let uname = req.body.username
    let eid = req.body.emailid
    let pswd = req.body.password
    let terms = req.body.terms

    if(!uname){
        error.username = "Username can't be empty"
    } else {
        console.log((uname).length)
        if((uname).length < 4){
            error.username = "Username should minimum length of 4"
        }
    }
    //console.log(req.body)
    console.log(eid)
    if(!eid){
        error.email = "Email can't be empty"
    } else {
        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        //let mail = "test@example.com";
        if (regex.test(eid)) {
            console.log("Valid Email address");
        } else {
            error.email = "Invalid Email address"
            console.log("Invalid Email address");
        }
    }

    if(!pswd){
        error.password = "Password can't be empty"
    } else {
        if(pswd.length < 8){
            error.password = "Password length must be 8 character"
        } else {
            function hasSpecialChars(str) {
                return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(str);
              }
              //Special character check
              if(hasSpecialChars(pswd)){
                    console.log("Specialcase Exist"+pswd)
                }
            for(let i=0;i<pswd.length;i++){
                //Lowercase check
                if(pswd.charCodeAt(i)>=97 && pswd.charCodeAt(i)<=122){
                    console.log("Lowercase Exist"+pswd[i])
                }

                //Uppercase check
                if(pswd.charCodeAt(i)>=65 && pswd.charCodeAt(i)<=90){
                    console.log("Uppercase Exist"+pswd[i])
                }

                //isNumeric check
                if(pswd.charCodeAt(i)>=48 && pswd.charCodeAt(i)<=57){
                    console.log("Number Exist"+pswd[i])
                }
            }
        }
    }

    if(Object.keys(error).length != 0){
        return res.send(error)
    }
    
    console.log(req.body)
    res.send(req.body)
})

app.listen(5002)