const products = [];

class Product {

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
        return products;
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

module.exports = Product;
