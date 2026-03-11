import { Form, Input } from 'antd'
import type { Product } from '@/entities/product/model/types'

type FieldType = Omit<Product, 'id'> & {}

export const ProductsModal = () => {
    return (
        <Form name="product">
            <Form.Item
                label="Наименование"
                name="title"
                layout="vertical"
                rules={[
                    {
                        required: true,
                        message: 'Наименование не может быть пустым!',
                    },
                ]}
            >
                <Input placeholder="Введите наименование" size="medium" />
            </Form.Item>
            <Form.Item
                label="Категория"
                name="category"
                layout="vertical"
                rules={[
                    {
                        required: true,
                        message: 'Категория не может быть пустой!',
                    },
                ]}
            >
                <Input placeholder="Введите категорию" size="medium" />
            </Form.Item>
            <Form.Item
                label="Вендор"
                name="title"
                layout="vertical"
                rules={[
                    {
                        required: true,
                        message: 'Вендор не может быть пустым!',
                    },
                ]}
            >
                <Input placeholder="Введите вендор" size="medium" />
            </Form.Item>
            <Form.Item
                label="Артикул"
                name="title"
                layout="vertical"
                rules={[
                    {
                        required: true,
                        message: 'Артикул не может быть пустым!',
                    },
                ]}
            >
                <Input placeholder="Введите артикул" size="medium" />
            </Form.Item>
            <Form.Item
                label="Оценка"
                name="title"
                layout="vertical"
                rules={[
                    {
                        required: true,
                        message: 'Оценка не может быть пустой!',
                    },
                ]}
            >
                <Input placeholder="Введите оценку" size="medium" />
            </Form.Item>
            <Form.Item
                label="Цена"
                name="title"
                layout="vertical"
                rules={[
                    {
                        required: true,
                        message: 'Цена не может быть пустой!',
                    },
                ]}
            >
                <Input placeholder="Введите цену" size="medium" />
            </Form.Item>
        </Form>
    )
}
