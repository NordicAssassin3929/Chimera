const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        // _id: String,
        title: String,
        price: Number,
        amount: Number,
        imageURL: String,
        description: String
    }
);

const ProductModel = mongoose.model('ProductModel', productSchema, "products");

module.exports = ProductModel
