import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://dummyjson.com',
    headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
    const localData = localStorage.getItem('auth-token')

    if (localData) {
        try {
            const parsedData = JSON.parse(localData)
            const token = parsedData.state?.token

            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
        } catch (e) {
            console.error('Ошибка парсинга токена', e)
        }
    }

    return config
})
