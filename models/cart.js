const CartModel = require('../schemas/cartModel');
const Helper = require('./helper');
ObjectId = require('mongodb').ObjectID;

let cart = null;

module.exports = class Cart {

    static async save(product) {
        let userId = '5f940f8876ad3e073a2e1e8b'

        cart = await CartModel.findOne({userId})

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

    static getCart(user_Id) {
        CartModel.find({userId: ObjectId(user_Id)})
            .then(doc => {
                this.getCartContent(doc)
            })
            .catch(err => {
                    console.log(err)
                }
            )
        return cart
    }

    static getCartContent(doc) {
        cart = doc
    }
    /*
    db.carts.update({ _id : ObjectId('5fc6888b42d86bad7dafa319')},
    { $pull: { "products": { title: 'BTC'} } } )
    db.carts.find({userId : ObjectId('5f940f8876ad3e073a2e1e8b') } )
    db.carts.find({"_id" : ObjectId('5fc6888b42d86bad7dafa319') } )
    db.carts.find({ products: { $elemMatch: {title: 'BTC' }}}).pretty()   
    db.carts.find({ 'products.title': 'BTC' }).pretty()  

    db.carts.find(
    {"products.title": "BTC"}, 
    {_id: 0, products: {$elemMatch: {title: "BTC"}}}).pretty()

    db.carts.findOne(
    {userId: ObjectId("5f940f8876ad3e073a2e1e8b")})

    ObjectId(user_Id)
    */
    static async delete(coinName) {
        let userId = '5f940f8876ad3e073a2e1e8b'

        // get product by coinName
        let product = await Helper.getProduct(coinName)
        // get cart by userId
        let cart = await Helper.getCart(userId)

        // get total price from cart
        let totalPrice = cart.totalPrice

        console.log(product)
        console.log(product.amount)
        console.log(product.price)
       
        CartModel.findByIdAndUpdate(
            { _id : ObjectId('5fc96af5e941dadd44031850')},
            { $pull: { "products": { title: coinName} },
            $inc: {
                totalPrice: -(product.amount * product.price)
            } }, function(err) {
                if(err) console.log(err);
                console.log("Successful deletion");
            });
    }
}
