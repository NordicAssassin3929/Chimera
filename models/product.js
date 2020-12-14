const ProductModel = require('../schemas/productModel')

let products = null

module.exports = class Product {

    constructor(title,
                price, amount) {
        this.title = title;
        this.price = price;
        this.amount = amount;
    }

    save() {
        this.id = Math.floor(Math.random() * 100000);
    }

    static findAll() {
        ProductModel.find()
            .then(doc => {
                this.getProducts(doc)
            })
            .catch(err => {
                console.log(err)
            })
        console.log('Find all ' + products)
        return products
    }

    static getProducts(doc){
        products = doc
    }

    static findById(prodId) {
        return products.filter(p => p.id == prodId);
    }
}

