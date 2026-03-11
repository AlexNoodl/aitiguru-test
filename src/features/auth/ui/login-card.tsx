import { Button, Checkbox, Form, Input } from 'antd'
import LogoIcon from '@/shared/assets/icons/logo.svg?react'
import UserIcon from '@/shared/assets/icons/user-icon.svg?react'
import LockIcon from '@/shared/assets/icons/lock.svg?react'
import EyeOffIcon from '@/shared/assets/icons/eye-off.svg?react'
import CloseIcon from '@/shared/assets/icons/close.svg?react'
import { Link } from 'react-router-dom'
import { useLogin } from '@/features/auth/api/use-login'
import type { LoginCredentials } from '@/features/auth/model/types'

type FieldType = {
    username?: string
    password?: string
    rememberMe?: boolean
}

export const LoginCard = () => {
    const { mutate, isPending, error } = useLogin()

    const onFinish = (values: LoginCredentials) => {
        mutate(values)
    }

    return (
        <div className="w-128.75 h-179 mx-auto p-1.5 shadow-login-form rounded-[40px] bg-white">
            <div className="border rounded-[34px] border-border p-12 bg-gradient-soft h-176">
                <div className="flex flex-col">
                    <div className="mx-auto h-13">
                        <LogoIcon />
                    </div>
                    <p className="text-dark text-center text-[40px] font-semibold mt-8">
                        Добро пожаловать!
                    </p>
                    <p className="text-center text-[#E0E0E0] text-[18px] font-normal mt-3">
                        Пожалуйста, авторизуйтесь
                    </p>

                    <Form
                        name="login"
                        requiredMark="optional"
                        onFinish={onFinish}
                        initialValues={{ rememberMe: false }}
                    >
                        <Form.Item<FieldType>
                            label="Логин"
                            name="username"
                            layout="vertical"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите свой логин!',
                                },
                            ]}
                            className="mt-8! mb-0!"
                        >
                            <Input
                                placeholder="Введите имя пользователя"
                                size="medium"
                                prefix={<UserIcon className="size-6" />}
                                suffix={<CloseIcon className="size-6" />}
                                className="h-13.75 py-3.5 rounded-xl!"
                            />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Пароль"
                            name="password"
                            layout="vertical"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите свой пароль!',
                                },
                            ]}
                            className="mt-4! mb-0!"
                        >
                            <Input
                                placeholder="Введите пароль"
                                size="medium"
                                prefix={<LockIcon className="size-6" />}
                                className="h-13.75 py-3.5 rounded-xl!"
                                suffix={<EyeOffIcon className="size-6" />}
                            />
                        </Form.Item>

                        <Form.Item<FieldType>
                            name="rememberMe"
                            valuePropName="checked"
                            label={null}
                            className="mt-5! mb-0!"
                        >
                            <Checkbox>
                                <p className="font-medium text-[#9C9C9C]">
                                    Запомнить данные
                                </p>
                            </Checkbox>
                        </Form.Item>

                        <Form.Item label={null} className="mt-5! mb-0!">
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                loading={isPending}
                                className="px-2 py-4 w-full h-13.5 rounded-xl bg-brand-blue! hover:bg-[#1a23a3]!"
                            >
                                Войти
                            </Button>
                        </Form.Item>
                    </Form>

                    <div className="flex gap-2.5 items-center w-full mt-4">
                        <div className="border border-border h-px flex-1" />
                        <p className="text-center text-border font-medium">
                            или
                        </p>
                        <div className="border border-border h-px flex-1" />
                    </div>

                    <div className="flex mx-auto gap-1 mt-8">
                        <p className="text-[18px] text-[#6C6C6C]">
                            Нет аккаунта?
                        </p>
                        <Link
                            to="/register"
                            className="text-brand-blue text-[18px] font-semibold underline"
                        >
                            Создать
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
