const mongoose = require('mongoose');

const cartSchema = mongoose.Schema(
    {
        products: [
            {
                title: String,
                price: Number,
                amount: Number
            }
        ],
    }
);

module.exports = mongoose.model('CartModel  ', cartSchema, "cart");
