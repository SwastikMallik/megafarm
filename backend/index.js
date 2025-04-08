const express = require("express");

const app = express();

app.get("/", (req, res)=>{
    const newRes = {
        status : 200,
        data : "Hello, Welcome to MegaFarm"
    }
    res.send(newRes)
})

app.listen(5001)