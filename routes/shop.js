const express = require('express');
const path = require('path');
const shopController = require('../controllers/shop');

const router = express.Router();

// done
router.get('/', shopController.getAllProducts);

router.get('/products/:prodId', shopController.getProductDetail);

// done
router.post('/add-to-cart', shopController.addToCart);

// half done - need userId
router.get('/cart', shopController.getCart);

// done
router.delete('/delete/:coinName', shopController.deleteInCart);

module.exports = router;
