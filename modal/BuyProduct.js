const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const BuyProductSchema = new mongoose.Schema({
    userId: { type: Schema.ObjectId },
    productId: { type: Schema.ObjectId }
})

const BuyProduct = new mongoose.model("BuyProduct", BuyProductSchema)
module.exports = BuyProduct