export interface Product {
  count: number
  products: ProductList[]
}

export interface ProductList {
  _id: number
  name: string
  price: number
  description: string
  category: string
  image: string
}

