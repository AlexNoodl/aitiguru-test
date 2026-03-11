import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { ProductListRepsonse } from '../model/types'
import { api } from '@/shared/api/base'

export const useProduct = (page: number, limit: number = 20) => {
    return useQuery({
        queryKey: ['products', page],
        queryFn: async () => {
            const skip = (page - 1) * limit
            const { data } = await api.get<ProductListRepsonse>(
                `/products?limit=${limit}&skip=${skip}`
            )
            return data.products
        },
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60 * 3,
    })
}
