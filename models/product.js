const products = [];

const ProductModel = require('./productModel')

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
        let products = null
        ProductModel.find()
            .then(doc => {
                console.log(doc)
                products = doc
            })
            .catch(err => {
                console.log(err)
            })
        return products
    }

    static findById(prodId) {
        return products.filter(p => p.id == prodId);
    }

    update() {
        const editProductIndex = products.findIndex(p => p.id == this.id);
        products[editProductIndex] = this;
    }

    static deleteById(prodId) {
        const deleteProductIndex = products.findIndex(p => p.id == prodId);
        products.splice(deleteProductIndex, 1);
    }
}

