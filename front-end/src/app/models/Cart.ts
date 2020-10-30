export interface Cart {
  userId: string
  products: Array<Products>
  totalPrice: Number
}

export interface Products {
  title: String,
  price: Number,
  amount: Number
}
