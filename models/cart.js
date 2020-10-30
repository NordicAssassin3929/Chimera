const CartModel = require('./cartModel')

let cart = null;

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

    static getCart(user_Id) {
        //'5f95619d4d2a9ea311eb6fd1'
        CartModel.findOne({_id: { $eq: '5f95619d4d2a9ea311eb6fd1'}})
            .then(doc => {
                console.log('Doc ' + doc.products)
                this.getCartContent(doc)
            })
            .catch(err => {
                    console.log(err)
                }
            )
        console.log('Get cart ' + cart)
        return cart
    }

    static getCartContent(doc){
        cart = doc
    }

    static delete(productId) {
        const isExisting = cart.products.findIndex(p => p.id == productId);
        if (isExisting >= 0) {
            cart.products.splice(isExisting, 1)
        }
    }
}
