import { type Key } from 'react'

export interface Product {
    id: number
    title: string
    price: number
    category: string
    rating: number
    brand: string
    sku: string
    images: string[]
}

export interface ProductListResponse {
    products: Product[]
    limit: number
    total: number
    skip: number
}

export type DataType = Product & {
    key: Key
}
