const User = require('../models/user');

exports.getUser = (req, res, next) => {
    const products = Product.findAll();
    res.send(products)
}

exports.createUser = (req, res, next) => {
    const products = Product.findAll();
    res.send(products)
}