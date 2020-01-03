const mongoose = require("mongoose");
const pSch = mongoose.Schema({
    userId:String,
    category:String,
    section:String,
    name:String,
    price:Number,
    description:String,
    image:String
})
var productModel = mongoose.model("product", pSch, "product");

module.exports = productModel;