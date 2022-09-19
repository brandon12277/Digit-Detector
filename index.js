const express=require("express");
const {spawn}=require("child_process");
const bodyParser=require("body-parser")
const { urlencoded } = require("body-parser");
const ejs=require("ejs")
const app=express()

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("static"));
app.set("view engine","ejs")


const port= 3000;
app.listen(port,()=>{
    console.log("server running");
})

app.get("/",(req,res)=>{
    res.render("home",{});
})
