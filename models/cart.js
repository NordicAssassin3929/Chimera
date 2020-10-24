let cart = null;
const CartModel = require('./cartModel')

module.exports = class Cart {

    static save(product) {

        let cartModel = new CartModel();

        console.log('Product: ' + product)
        if (cart == null) {
            cart = {products: [], totalPrice: 0}
        }

        // if(userId == '5f940f8876ad3e073a2e1e8b') {
        console.log('Cart already exists ')
        // 5f940f8876ad3e073a2e1e8b
        let done = function(err, result) {} // this runs after the mongoose operation }

        cartModel.updateOne(
            {
                userId: '5f940f8876ad3e073a2e1e8b'
            },
            {
                $push: {
                    products:
                        {
                            'title': product.title,
                            'price': product.price,
                            'amount': product.amount
                        },
                    totalPrice: product.amount * product.price
                }
            },
            done()
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
