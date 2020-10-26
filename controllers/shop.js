const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getAllProducts = (req, res, next) => {
    const products = Product.findAll();
    console.log(products);
    res.json(products)
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
    Cart.save(addedProduct).then(r => console.log(r));
    //res.redirect('/cart');
}

exports.getCart = (req, res, next) => {
    // res.render('cart', { cart: Cart.getCart(), pageTitle: 'Shopping Cart Detail', path: '/cart', name: 'Edward' })
    // here I will get usedId from logged in user
    const id = req.params.cartId;
    const userId = '5f940f8876ad3e073a2e1e8b'
    const cart = Cart.getCart(userId);
    res.json(cart)
}

exports.deleteInCart = (req, res, next) => {
    Cart.delete(req.body.prodId);
    res.redirect('/cart');
}
