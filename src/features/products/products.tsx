import { ProductsHeader } from '@/features/products/components/products-header'
import { ProductsBody } from '@/features/products/components/products-body'

export const Products = () => {
    return (
        <div className="py-5 gap-y-7.5 flex flex-col">
            <ProductsHeader />
            <ProductsBody />
        </div>
    )
}
