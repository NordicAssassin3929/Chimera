let cart = null;
const CartModel = require('./cartModel')

module.exports = class Cart {

    static save(product) {

        console.log('Product: ' + product)
        if (cart == null) {
            cart = {products: [], totalPrice: 0}
        }

        // if(userId == '5f940f8876ad3e073a2e1e8b') {
        // 5f940f8876ad3e073a2e1e8b

        let productObj = {
            'title': product.title,
            'price': product.price,
            'amount': product.amount
        };

        let done = function (err, result) {
        } // this runs after the mongoose operation }

        CartModel.update(
            {
                userId: '5f940f8876ad3e073a2e1e8b'
            },
            {
                $push: {
                    products: productObj
                },
                $set: {
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
        // }
        // else { // doesn't exists
        // console.log('Cart already exists ')
        // cart.userId = "5f940f8876ad3e073a2e1e8b"
        // cart.products.push({
        //     'title': product.title,
        //     'price': product.price,
        //     'amount': product.amount,
        // });
        // cart.totalPrice += product.amount * product.price;
        //
        // cart.totalPrice += product.price;
        // console.dir(cart)
        //
        // cartModel = new CartModel(cart);
        //
        // cartModel.save(function (err, doc) {
        //     if (err) return console.error(err);
        //     console.log("Document inserted succussfully!");
        // });
    }

    static saveToDatabase() {

    }

    static getCart() {
        return cart;
    }

    static delete(productId) {
        const isExisting = cart.products.findIndex(p => p.id == productId);
        if (isExisting >= 0) {
            cart.products.splice(isExisting, 1);
        }
    }
}
