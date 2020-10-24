const Product = require('../models/product');
const Cart = require('../models/cart');
const CartModel = require('../models/cartModel')

exports.getAllProducts = (req, res, next) => {
    console.log('something is done');
    const products = Product.findAll();
    console.log(products);
    // sending to angular
    res.render('index', { name: 'Josh', prods: products, path: '/', pageTitle: 'Home' });
}

exports.getProductDetail = (req, res, next) => {
    const products = Product.findById(req.params.prodId);
    res.render('product-detail', { prod: products[0], pageTitle: 'Product Detail', path: '/', name: 'Edward' });
}

exports.addToCart = (req, res, next) => {
    console.log('Request: ' + req.body.title)
    // const addedProduct = Product.findById(req.body.id)[0];
    const addedProduct = new Product(
        req.body.title,
        req.body.price,
        req.body.amount)
    console.log('Added product: ' + addedProduct)
    Cart.save(addedProduct);
    //res.redirect('/cart');
}

exports.getCart = (req, res, next) => {
    // res.render('cart', { cart: Cart.getCart(), pageTitle: 'Shopping Cart Detail', path: '/cart', name: 'Edward' })
    const id = req.params.cartId;
    CartModel.findById(id)
        .then(doc => {
            console.log(doc)
            res.status(200).json(doc)
        })
        .catch(err => {
                console.log(err)
                res.status(500).json({error: err})
            }
        )
}

exports.deleteInCart = (req, res, next) => {
    Cart.delete(req.body.prodId);
    res.redirect('/cart');
}
