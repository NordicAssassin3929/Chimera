let cart = null;
const CartModel = require('./cartModel')

module.exports = class Cart {

    static async save(product) {
        let userId = '5f940f8876ad3e073a2e1e8b'

        cart = await CartModel.findOne({ userId })

        console.log('Cart: ' + cart)

        if (cart == null) {
            cart = {products: [], totalPrice: 0}
        }

        let productObj = {
            'title': product.title,
            'price': product.price,
            'amount': product.amount
        };

        // read userId from cookies or session when user logs in
        // https://stackoverflow.com/questions/44816519/how-to-get-cookie-value-in-expressjs
        CartModel.updateOne(
            {
                userId: userId
            },
            {
                $push: {
                    products: productObj
                },
                $inc: {
                    totalPrice: product.amount * product.price
                }
            },
            {upsert: true, new: true},
            function (error, success) {
                if (error) {
                    console.log(error)
                } else {
                    console.log(success)
                }
            }
        );
    }

    static getCart(res, userId) {
        let cart = null
        CartModel.findById(userId)
            .then(doc => {
                console.log(doc)
                cart = doc
                //res.status(200).json({document: doc})
            })
            .catch(err => {
                    console.log(err)
                    res.status(500).json({error: err})
                }
            )
        return cart
    }

    static delete(productId) {
        const isExisting = cart.products.findIndex(p => p.id == productId);
        if (isExisting >= 0) {
            cart.products.splice(isExisting, 1)
        }
    }
}
