let cart = null;

module.exports = class Cart {
    static save(product) {
        console.log('Product: ' + product)
        if(cart == null){
            cart = { products: [], totalPrice: 0}
        }

        const existingProductIndex = cart.products.findIndex(p => p.id == product.id); // to check product is existing in cart
        if(existingProductIndex >= 0) { // exists in cart already
            const existingProduct = cart.products[existingProductIndex];
            //existingProductIndex.qty += 1;
        }
        else { // doesn't exists
            //product.qty = 1;
            cart.products.push(product);
        }

        cart.totalPrice += product.price;
    }

    static getCart() {
        return cart;
    }

    static delete(productId) {
        const isExisting = cart.products.findIndex(p => p.id == productId);
        if(isExisting >= 0) {
            cart.products.splice(isExisting, 1);
        }
    }
}
