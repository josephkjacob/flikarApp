const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const productsRouter = express.Router();
var dbUrl = "mongodb://localhost:27017:27017/flipkart";
var categoryModel = require("../../model/categoryModel");
var sectionModel = require("../../model/sectionModel");
var productModel = require("../../model/productModel");

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw err;
    else console.log("DB connection is established")
})

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "uploads");
    },
    filename: function (req, file, callback) {        
        callback(null, file.originalname);      
    }
})
var uploads = multer({ storage: storage });

productsRouter.get("/", (req, res) => {
    res.send("products");
})
productsRouter.post("/addcategory", (req, res) => {
    console.log(req.body.name);
    var sch = new categoryModel();
    sch.name = req.body.name;
    sch.save((err) => {
        console.log("cate saved");
        res.send({ msg: "cate saved" });
    })
});
productsRouter.get("/getcategory", (req, res) => {
    categoryModel.find({}, (err, data) => {
        if (err) throw err;
        else {
            res.send(data);
        }
    })
})
productsRouter.post("/addsection", (req, res) => {
    console.log(req.body.category, "****", req.body.section);
    var sec = new sectionModel();
    sec.category = req.body.category;
    sec.section = req.body.section;
    sec.save((err) => {
        if (err) throw err;
        else {
            res.send({ msg: "section saved" })
        }
    })
})
productsRouter.get("/getsection", (req, res) => {
    sectionModel.find({}, (err, data) => {
        if (err) throw err;
        else {
            res.send(data);
        }
    })
})
productsRouter.get("/test", (req, res)=>{
    console.log("test........ calls");
    res.send("test works")
})
productsRouter.post("/addproduct", uploads.single("imageFile"), (req, res) => {

    /// enabling CORS policy
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200/*   ');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    
    var prd = new productModel();
    prd.userId = req.body.userId;
    prd.category = req.body.category;
    prd.section = req.body.section;
    prd.name = req.body.name;
    prd.price = req.body.price;
    prd.description = req.body.description;
    prd.image = req.file.filename;
    prd.save({}, (err) => {
        console.log("product saved");
        res.send({ msg: "product saved" });
    })
})
productsRouter.get("/getProduct", (req, res) => {
    productModel.find({}, (err, data) => {
        if (err) throw err;
        else {
            
            res.send(data);
        }
    })
})
productsRouter.get("/getProduct/:id", (req, res) =>{
    productModel.find({userId:req.params.id}, (err, data) => {
        if (err) throw err;
        else {
            
            res.send(data);
        }
    })
})
productsRouter.get("/img/:id", (req, res) => {
    
    /// enabling CORS policy
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200/*   ');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    console.log(path.join(__dirname, "../../uploads/" + req.params.id));
    //res.send("img req");
    res.sendFile(path.join(__dirname, "../uploads/" + "../../uploads/" + req.params.id));
})
productsRouter.get("/removeproduct/:id", (req, res) => {
    console.log("removeproduct");
    productModel.deleteOne({ _id: req.params.id }, (err) => {
        if (err) throw err;
        else {
            res.send({ msg: "success" });
        }
    })
})
productsRouter.post("/editproduct", (req, res) => {
    var prd = {
        category:req.body.category,
        section:req.body.section,
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        image:"-"
    }
    productModel.updateOne({_id:req.body._id},prd,(err)=>{
        if(err) throw err;
        else{
            res.send({msg:"success"});
        }
    })

})



module.exports = productsRouter;