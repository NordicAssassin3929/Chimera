const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getAllProducts = (req, res, next) => {
    const products = Product.findAll();
    res.send(products)
}

exports.getCart = async(req, res, next) => {
    // here I will get usedId from logged in user
    //const id = req.params.cartId;
    //const user_Id = '5f940f8876ad3e073a2e1e8b'
    const user_Id = '5f940f8876ad3e073a2e1e8b'
    const cart = await Cart.getCart(user_Id);
    console.log('cart: ' + cart)
    res.send(cart)
}

exports.addToCart = (req, res, next) => {
    // const addedProduct = Product.findById(req.body.id)[0];
    const addedProduct = new Product(
        req.body.title,
        req.body.price,
        req.body.amount)
    Cart.save(addedProduct).then(r => console.log(r));
}

exports.getProductDetail = (req, res, next) => {
    const products = Product.findById(req.params.prodId);
    res.render('product-detail', { prod: products[0], pageTitle: 'Product Detail', path: '/', name: 'Edward' });
}

exports.deleteInCart = (req, res, next) => {
    console.log('req.params.coinName: ' + req.params.coinName)
    Cart.delete(req.params.coinName);
}
