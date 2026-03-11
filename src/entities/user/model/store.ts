import { create } from 'zustand'
import type { UserSchema } from './types'
import { createJSONStorage, persist } from 'zustand/middleware'
import { hybridStorage } from '@/shared/helpers/hybrid-storage'

export const useUserStore = create<UserSchema>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuth: false,
            rememberMe: false,

            setAuth: (user, token, rememberMe) => {
                const newState = { user, token, isAuth: true, rememberMe }
                set(newState)
            },

            logout: () =>
                set({
                    user: null,
                    token: null,
                    isAuth: false,
                    rememberMe: false,
                }),
        }),
        {
            name: 'auth-token',
            partialize: (state) => ({
                token: state.token,
                user: state.user,
                isAuth: state.isAuth,
                rememberMe: state.rememberMe,
            }),
            storage: createJSONStorage(() => hybridStorage),
        }
    )
)
