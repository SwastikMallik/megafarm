const express = require("express");

const cors = require("cors");

const app = express();



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