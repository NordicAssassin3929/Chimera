export interface Cart {
  userId: string
  products: Product[]
  totalPrice: Number
}

export interface Product {
  title: String,
  price: Number,
  amount: Number
}
