import { Form, Input } from 'antd'
import SearchIcon from '@/shared/assets/icons/search.svg?react'
import { useProductPagination } from '@/entities/product/model/store'
import type { BaseSyntheticEvent } from 'react'

type FieldType = {
    search: string
}

export const ProductsHeader = () => {
    const setSearch = useProductPagination((s) => s.setSearch)

    const onChange = (e: BaseSyntheticEvent) => {
        setSearch(e.target.value)
    }

    return (
        <div className="p-7.5 flex gap-77.5 bg-white">
            <p className="text-[24px] font-bold">Товары</p>

            <Form<FieldType> name="search-form">
                <Form.Item>
                    <Input
                        placeholder="Найти"
                        prefix={<SearchIcon />}
                        className="w-255.75! h-12! px-5! py-3! rounded-lg! bg-[#F3F3F3]!"
                        onChange={onChange}
                    />
                </Form.Item>
            </Form>
        </div>
    )
}
