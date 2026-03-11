import { StateStorage } from 'zustand/middleware'

export const hybridStorage: StateStorage = {
    getItem: (name: string): string | null => {
        return localStorage.getItem(name) || sessionStorage.getItem(name)
    },
    setItem: (name: string, value: string): void => {
        const state = JSON.parse(value)
        const rememberMe = state.state?.rememberMe

        if (rememberMe) {
            localStorage.setItem(name, value)
        } else {
            sessionStorage.setItem(name, value)
            localStorage.removeItem(name)
        }
    },
    removeItem: (name: string): void => {
        localStorage.removeItem(name)
        sessionStorage.removeItem(name)
    },
}
