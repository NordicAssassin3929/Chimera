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

    static async checkIfUserExists(email) {
        let searchQuery = { email: email }
        await UserModel.exists(searchQuery, (err, result) => {
            if (err) {
                console.log('Error ' + err)
            } else {
                console.log('Result: ' + result)
            if (result) {
                return true
            }
            else{
                return false
            }
            }
        })
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