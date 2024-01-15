import { Product } from "./product.module"

export interface Orders {
  count: number
  orders: Order[]
}

export interface Order {
  _id?: string
  product: Product
  quantity: number
  status?: string
}

