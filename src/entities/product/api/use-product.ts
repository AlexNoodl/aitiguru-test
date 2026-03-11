import { useQuery } from '@tanstack/react-query'
import type { ProductListResponse } from '../model/types'
import { api } from '@/shared/api/base'
import { useProductPagination } from '@/entities/product/model/store'
import { useDebounce } from '@/shared/hooks/use-debounce'

export const useProduct = () => {
    const {
        currentPage,
        pageSize,
        setProducts,
        setTotal,
        searchQuery,
        sortBy,
        order,
    } = useProductPagination()
    const skip = (currentPage - 1) * pageSize

    const debounceQuery = useDebounce(searchQuery, 500)

    return useQuery({
        queryKey: [
            'products',
            currentPage,
            pageSize,
            debounceQuery,
            sortBy,
            order,
        ],
        queryFn: async () => {
            let url = searchQuery
                ? `/products/search?q=${searchQuery}`
                : `/products?`
            url += `&limit=${pageSize}&skip=${skip}`

            if (sortBy && order) {
                url += `&sortBy=${sortBy}&order=${order}`
            }

            const { data } = await api.get<ProductListResponse>(url)

            setProducts(data.products)
            setTotal(data.total)

            return data
        },
        enabled: true,
    })
}
