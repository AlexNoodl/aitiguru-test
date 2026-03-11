import { useUserStore } from '@/entities/user/model/store'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { User } from '@/entities/user/model/types'
import { api } from '@/shared/api/base'
import type { LoginCredentials } from '@/features/auth/model/types'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
    const setAuth = useUserStore((state) => state.setAuth)
    const navigate = useNavigate()

    return useMutation<User, AxiosError<{ message: string }>, LoginCredentials>(
        {
            mutationFn: async ({ username, password }) => {
                const { data } = await api.post<User>('/auth/login', {
                    username,
                    password,
                    expiresInMins: 1440,
                })

                return data
            },
            onSuccess: (data, variables) => {
                console.log('Мутация завершена успешно, сохраняем данные...')
                setAuth(data, data.token, variables.rememberMe)
                navigate('/products')
            },
            // onError: (error: any) => {
            //     const errorMessage = error.response?.data?.message
            //     message.error(errorMessage)
            // }
        }
    )
}
