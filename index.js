const express = require("express");
const app=express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

// middleware
app.use(express.json());

//import routes files
const blog = require("./routes/blog")
//mount
app.use("/api/v1",blog);

const dbConnect = require("./config/database");
dbConnect();

// Start the server
app.listen(3000,()=>{
    console.log(`App running at port no. ${PORT}`);
})

// define routes
app.get("/",(req,res)=>{
    res.send(`<h1>This is my homePage</h1>`)
})