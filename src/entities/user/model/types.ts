export interface User {
    id: number
    username: string
    password: string
    email: string
    token?: string
}

export interface UserSchema {
    user: User | null
    token: string | null
    isAuth: boolean
    rememberMe: boolean
    setAuth: (user: User, token: string, rememberMe: boolean) => void
    logout: () => void
}
