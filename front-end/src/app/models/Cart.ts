export interface Cart {
  userId: string
  products: Product[]
  totalPrice: number
}

export interface Product {
  title: string,
  price: number,
  amount: number
}
