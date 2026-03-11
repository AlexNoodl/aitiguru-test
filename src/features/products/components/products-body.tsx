import {
    Button,
    Image,
    Modal,
    notification,
    Table,
    type TableColumnsType,
    type TableProps,
} from 'antd'
import PlusCircleIcon from '@/shared/assets/icons/plus-circle.svg?react'
import ArrowsClockwiseIcon from '@/shared/assets/icons/arrows-clockwise.svg?react'
import DotsCircleIcon from '@/shared/assets/icons/dots-thre-circle.svg?react'
import type { DataType, Product } from '@/entities/product/model/types'
import React, { type Key, type ReactNode, useState } from 'react'
import {
    type SortOrderType,
    useProductPagination,
} from '@/entities/product/model/store'
import { useProduct } from '@/entities/product/api/use-product'
import { useProductModal } from '@/entities/product/stores/product-modal-store'
import { ProductsModal } from '@/features/products/components/products-modal'

type TableRowSelection<T extends object = object> =
    TableProps<T>['rowSelection']

export const ProductsBody = () => {
    const { isLoading } = useProduct()
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
    const {
        currentPage,
        pageSize,
        setPage,
        total,
        products,
        sortBy,
        order,
        setSorting,
    } = useProductPagination()
    const { isModalOpen, setIsModalOpen } = useProductModal()
    const [api, contextHolder] = notification.useNotification()

    const onSelectChange = (newSelectedRowKeys: Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys)
        setSelectedRowKeys(newSelectedRowKeys)
    }

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    const getTotalElement = (
        total: number,
        range: [number, number]
    ): ReactNode => {
        return (
            <p className="font-normal text-[18px] absolute left-0">
                <span className="text-[#969B9F]">Показано </span>
                {range[0]}-{range[1]} <span className="text-[#969B9F]">из</span>{' '}
                {total}
            </p>
        )
    }

    const onModalOk = () => {
        setIsModalOpen(false)
        openNotification()
    }

    const openNotification = () => {
        api.info({
            title: 'Удачное добавление',
            description: 'Продукт добавлен',
            placement: 'topRight',
        })
    }

    const columns: TableColumnsType<DataType> = [
        {
            title: 'Наименование',
            dataIndex: 'title',
            key: 'title',
            render: (_, record: Product) => (
                <div className="flex items-center gap-4.5">
                    <Image
                        src={record.images[0]}
                        width={48}
                        height={48}
                        className="rounded-lg"
                    />
                    <div>
                        <p className="font-bold text-[#161919] text-[16px]">
                            {record.title}
                        </p>
                        <p className="text-[14px] text-[#B2B3B9]">
                            {record.category}
                        </p>
                    </div>
                </div>
            ),
            sorter: true,
            sortOrder:
                sortBy === 'title'
                    ? order === 'asc'
                        ? 'ascend'
                        : 'descend'
                    : null,
        },
        {
            title: 'Вендор',
            dataIndex: 'brand',
            key: 'brand',
            render: (_, record: Product) => (
                <p className="text-[16px] text-black font-bold">
                    {record.brand}
                </p>
            ),
            sorter: true,
            sortOrder:
                sortBy === 'brand'
                    ? order === 'asc'
                        ? 'ascend'
                        : 'descend'
                    : null,
        },
        {
            title: 'Артикул',
            dataIndex: 'sku',
            key: 'sku',
            render: (_, record: Product) => (
                <p className="text-[16px] font-normal">{record.sku}</p>
            ),
            sorter: true,
            sortOrder:
                sortBy === 'sku'
                    ? order === 'asc'
                        ? 'ascend'
                        : 'descend'
                    : null,
        },
        {
            title: 'Оценка',
            dataIndex: 'rating',
            key: 'rating',
            render: (_, record: Product) => (
                <div>
                    <span
                        className={
                            record.rating < 3 ? 'text-[#F11010]' : 'text-black]'
                        }
                    >
                        {record.rating}
                    </span>
                    /5
                </div>
            ),
            sorter: true,
            sortOrder:
                sortBy === 'rating'
                    ? order === 'asc'
                        ? 'ascend'
                        : 'descend'
                    : null,
        },
        {
            title: 'Цена, ₽',
            dataIndex: 'price',
            key: 'price',
            render: (_, record: Product) => <p>{record.price}</p>,
            sorter: true,
            sortOrder:
                sortBy === 'price'
                    ? order === 'asc'
                        ? 'ascend'
                        : 'descend'
                    : null,
        },
        {
            title: '',
            render: () => (
                <div className="flex gap-8 items-center">
                    <Button
                        type="primary"
                        className="bg-brand-blue! rounded-[23px]! p-1! w-13! h-6.75!"
                    >
                        +
                    </Button>
                    <DotsCircleIcon />
                </div>
            ),
        },
    ]

    const handleTableChange: TableProps<DataType>['onChange'] = (
        pagination,
        filters,
        sorter
    ) => {
        const orderMap = { ascend: 'asc', descend: 'desc' }

        if (sorter.order) {
            setSorting(sorter.field, orderMap[sorter.order as SortOrderType])
        } else {
            setSorting('', '')
        }
    }

    return (
        <div className="p-7.5 bg-white">
            {contextHolder}
            <div className="flex justify-between items-center">
                <p className="text-[20px] font-bold">Все позиции</p>
                <div className="flex gap-2 items-center">
                    <Button className="rounded-lg! size-10.5! p-2.5!">
                        <ArrowsClockwiseIcon className="size-5.5!" />
                    </Button>
                    <Button
                        className="gap-3.75 h-10.5! rounded-lg! py-2.5! px-5! w-34.25! bg-brand-blue! hover:bg-[#1a23a3]!"
                        type="primary"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <PlusCircleIcon />
                        <span>Добавить</span>
                    </Button>
                </div>
            </div>

            <Table<DataType>
                columns={columns}
                dataSource={products}
                rowSelection={rowSelection}
                onChange={handleTableChange}
                pagination={{
                    total: total,
                    current: currentPage,
                    pageSize: pageSize,
                    onChange: (page) => setPage(page),
                    showTotal: (total: number, range: [number, number]) =>
                        getTotalElement(total, range),
                    showSizeChanger: false,
                }}
                loading={isLoading}
            />

            <Modal
                title="Добавить новый элемент таблицы"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={onModalOk}
                onCancel={() => setIsModalOpen(false)}
            >
                <ProductsModal />
            </Modal>
        </div>
    )
}
