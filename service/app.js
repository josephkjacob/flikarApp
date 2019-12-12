const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");


var app = new express();
app.use(express.static(path.join(__dirname,"public")));
var signupRouter = require("./src/router/signupRouter");
var productsRouter = require("./src/router/productsRouter");

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());


app.use("/signup",signupRouter);
app.use("/products", productsRouter);



app.get("/", (req, res) =>{
    res.send("service is working");    
})


app.listen(4000, (res)=>{
    console.log("filpkart service is ready in 4000");
})