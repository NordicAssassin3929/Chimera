const CartModel = require('../schemas/cartModel')

let cart = null;

module.exports = class Cart {

    static async save(product) {
        let userId = '5f940f8876ad3e073a2e1e8b'

        cart = await CartModel.findOne({userId})

        console.log('Cart: ' + cart)

        if (cart == null) {
            cart = {products: [], totalPrice: 0}
        }

        let productObj = {
            'title': product.title,
            'price': product.price,
            'amount': product.amount
        };

        const searchedElement = CartModel.find({
                products: {
                    $elemMatch: {
                        title: 'BTC'}
                }
        });

        console.log('Element exists: ' + searchedElement)

        // read userId from cookies or session when user logs in
        // https://stackoverflow.com/questions/44816519/how-to-get-cookie-value-in-expressjs
        // if BTC doesn't exist, add it to products
        if (!searchedElement) {
            console.log('DID THIS EXECUTE ?')
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
        // if BTC exists, just update amount and total cost
        else {
            console.log('or are we here ?')
            CartModel.updateOne(
                {
                    userId: userId
                },
                {
                    $push: {
                        products: {
                            'amount': product.amount
                        }
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
    }

    static getCart(user_Id) {
        //'5f95619d4d2a9ea311eb6fd1'
        console.log('user_Id ' + user_Id)
        CartModel.findOne({_id: {$eq: user_Id}})
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

    static getCartContent(doc) {
        cart = doc
    }

    static delete(productId) {
        const isExisting = cart.products.findIndex(p => p.id == productId);
        if (isExisting >= 0) {
            cart.products.splice(isExisting, 1)
        }
    }
}
