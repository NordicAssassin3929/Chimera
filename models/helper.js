const e = require('express');
const express = require('express');
const CartModel = require('../schemas/cartModel');
const UserModel = require('../schemas/userModel');

module.exports = class Helper {
    static async getProductFromArray(coinName){
        let product = null
        await CartModel.find({'products.title': coinName},
        {_id: 0, products: {$elemMatch: {title: coinName}}}, (error, success) => {
            if (error) {
                console.log(error)
            } else {
                product = success[0].products[0]
            }
        })
        return product
    }

    static async getCart(userId){
        let cart = null
        await CartModel.findOne( {userId: ObjectId(userId)} , (error, success) => {
            if (error) {
                console.log(error)
            } else {
                cart = success
            }
        })
        return cart
    }
}