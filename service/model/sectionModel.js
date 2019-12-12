const mongoose = require("mongoose");
const sectSchema = mongoose.Schema({
    category:String,
    section:String
});
var sectionModel = mongoose.model("section", sectSchema, "section");

module.exports = sectionModel;