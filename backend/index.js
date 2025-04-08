const express = require("express");

const app = express();

app.get("/", (req, res)=>{
    res.send("Hello, Welcome to MegaFarm")
})

app.listen(5001)