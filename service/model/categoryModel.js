const mongoose = require("mongoose");
const cateScheme = mongoose.Schema({
    name:String
});
var categoryModel = mongoose.model("Category", cateScheme, "category");
module.exports = categoryModel;