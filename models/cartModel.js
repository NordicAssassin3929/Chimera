const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        products: [
            {
                title: String,
                price: Number,
                amount: Number
            }
        ],
        totalPrice: Number
    }
);

const CartModel = mongoose.model('CartModel', cartSchema, "cart");

module.exports = CartModel
