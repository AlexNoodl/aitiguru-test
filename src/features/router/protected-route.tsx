import type { ReactNode } from 'react'
import { useUserStore } from '@/entities/user/model/store'
import { Navigate, useLocation } from 'react-router-dom'

type Props = {
    children: ReactNode
}

export const ProtectedRoute = ({ children }: Props) => {
    const isAuth = useUserStore((state) => state.isAuth)
    const location = useLocation()

    if (!isAuth) {
        return <Navigate to={'/login'} state={{ from: location }} replace />
    }

    return <>{children}</>
}
