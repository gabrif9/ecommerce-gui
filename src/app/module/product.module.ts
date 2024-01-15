export interface ProductListDetails {
  count: number
  products: Product[]
}

export interface Product {
  _id: number
  name: string
  price: number
  description: string
  category: string
  image: string
}

