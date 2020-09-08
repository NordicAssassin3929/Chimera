const express = require('express');
const path = require('path');
const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getAllProducts);

router.get('/products/:prodId', shopController.getProductDetail);

router.post('/add-to-cart', shopController.addToCart);

router.get('/cart', shopController.getCart);

router.post('/delete-cart', shopController.deleteInCart);

module.exports = router;
