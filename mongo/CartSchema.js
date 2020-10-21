import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
    {
        products: [
            {
                title: String,
                price: Number,
                amount: Number
            }
        ],
    },
    { timestamps: true },
);

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
