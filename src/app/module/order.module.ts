export interface Orders {
  count: number
  orders: Order[]
}

export interface Order {
  _id: string
  product: Product
  quantity: number
  status: string
}

export interface Product {
  _id: string
  name: string
  price: number
  category: string
  description: string
  image: string
  __v: number
}
