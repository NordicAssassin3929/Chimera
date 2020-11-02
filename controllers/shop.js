const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getAllProducts = (req, res, next) => {
    const products = Product.findAll();
    res.send(products)
}

exports.getCart = (req, res, next) => {
    // here I will get usedId from logged in user
    //const id = req.params.cartId;
    //const user_Id = '5f940f8876ad3e073a2e1e8b'
    const user_Id = '5f95619d4d2a9ea311eb6fd1'
    const cart = Cart.getCart(user_Id);
    res.send(cart)
}

exports.addToCart = (req, res, next) => {
    console.log('Request: ' + req.body.title)
    // const addedProduct = Product.findById(req.body.id)[0];
    const addedProduct = new Product(
        req.body.title,
        req.body.price,
        req.body.amount)
    Cart.save(addedProduct).then(r => console.log(r));
    //res.redirect('/cart');
}

exports.getProductDetail = (req, res, next) => {
    const products = Product.findById(req.params.prodId);
    res.render('product-detail', { prod: products[0], pageTitle: 'Product Detail', path: '/', name: 'Edward' });
}

exports.deleteInCart = (req, res, next) => {
    Cart.delete(req.body.prodId);
    res.redirect('/cart');
}
