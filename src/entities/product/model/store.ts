import { create } from 'zustand'
import type { DataType, Product } from '@/entities/product/model/types'
import { persist } from 'zustand/middleware'

export type SortOrderType = 'asc' | 'desc' | ''

export type PaginationState = {
    currentPage: number
    pageSize: number
    products: DataType[]
    total: number
    searchQuery: string
    sortBy: string
    order: SortOrderType

    setPage: (page: number) => void
    setPageSize: (size: number) => void
    setProducts: (products: Product[]) => void
    setTotal: (total: number) => void
    setSearch: (query: string) => void
    setSorting: (field: string, order: SortOrderType) => void
}

export const useProductPagination = create<PaginationState>()(
    persist(
        (set) => ({
            currentPage: 1,
            pageSize: 10,
            products: [],
            total: 0,
            searchQuery: '',
            sortBy: '',
            order: '',

            setPage: (page) => set({ currentPage: page }),
            setPageSize: (size) => set({ pageSize: size, currentPage: 1 }),
            setProducts: (items) => set({ products: addKey(items) }),
            setTotal: (total) => set({ total }),
            setSearch: (query) => set({ searchQuery: query, currentPage: 1 }),
            setSorting: (field, order) =>
                set({ sortBy: field, order, currentPage: 1 }),
        }),
        { name: 'table-setting-store' }
    )
)

function addKey(products: Product[]): DataType[] {
    return products.map((product, idx) => ({ ...product, key: idx }))
}
