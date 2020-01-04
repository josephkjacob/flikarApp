const mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    name:String,
    password:String,
    type:Number,
    email:String,
    phone:Number
});
var userModel = mongoose.model("user", userSchema, "user");

module.exports = userModel;