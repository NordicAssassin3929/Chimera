const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
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

const CartModel = mongoose.model('CartModel', cartSchema, "carts");

module.exports = CartModel
