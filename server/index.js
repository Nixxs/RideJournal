require("dotenv").config();

// start up all the database services
const db = require("./db");
const models = require("./models");
models.init();

// start up the app services
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("hello world");
});

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`listening on port: ${port}`);
});