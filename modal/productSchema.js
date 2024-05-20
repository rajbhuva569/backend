const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost:27017/magesDB"); 

const ProductSchema = new mongoose.Schema({
    product_name: {
        type: String,
        // require: true
    },
    price: {
        type: Number,
        // require: true
    },
    descrption: {
        type: String,
        // require: true
    },
    imagename: {
        type: String,
    }



})

const product = new mongoose.model("product", ProductSchema)
module.exports = product