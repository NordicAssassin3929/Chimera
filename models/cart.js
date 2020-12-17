const CartModel = require('../schemas/cartModel');
const Helper = require('./helper');
ObjectId = require('mongodb').ObjectID;

module.exports = class Cart {

    static async save(product) {
        let cart = null;
        let userId = '5f940f8876ad3e073a2e1e8b'

        cart = await CartModel.findOne({userId})

        console.log('THIS IS CART ' + cart)

        if (cart == null) {
            cart = {products: [], totalPrice: 0}
        }

        let productObj = {
            'title': product.title,
            'price': product.price,
            'amount': product.amount
        };

       let searchQuery = { 'products.title': product.title }

       const searchedElement = CartModel.exists(searchQuery, (err, result) => {
        if (err) {
            console.log('Error ' + err)
        } else {
            console.log('Result: ' + result)
        // read userId from cookies or session when user logs in
        // https://stackoverflow.com/questions/44816519/how-to-get-cookie-value-in-expressjs
        // if BTC doesn't exist, add it to products
        if (!result) {
            console.log('There is no searched element!')
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
            console.log('Searched element has been found!')
            console.log('Updating existing product in array!')
            CartModel.updateOne(
                {
                    userId: userId,
                    'products.title': product.title
                },
                {
                    $inc: {
                        'products.$.amount': product.amount,
                        totalPrice: product.amount * product.price
                    }
                },
                {multi: true},
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
    });
    }

    static async getCart(user_Id) {
        let cart = await Helper.getCart(user_Id)
        return cart
    }

    static async delete(coinName) {
        // read from cookies
        let userId = '5f940f8876ad3e073a2e1e8b'

        // get product by coinName
        let product = await Helper.getProductFromArray(coinName)
        // get cart by userId
        let cart = await Helper.getCart(userId)
       
        // get ObjectId
        let objectId = cart._id

        console.log(objectId)

        // delete
        CartModel.findByIdAndUpdate(
            { _id : ObjectId(objectId)},
            { $pull: { "products": { title: coinName} },
            $inc: {
                totalPrice: -(product.amount * product.price)
            } }, function(err) {
                if(err) console.log(err);
                console.log("Successful deletion")
            });
    }
}
