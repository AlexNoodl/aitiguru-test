import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '@/pages/login-page/login-page'
import { ProtectedRoute } from '@/features/router/protected-route'
import { ProductsPage } from '@/pages/products-page/products-page'

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route
                path="/products"
                element={
                    <ProtectedRoute>
                        <ProductsPage />
                    </ProtectedRoute>
                }
            />

            <Route path="*" element={<Navigate to="/products" replace />} />
        </Routes>
    )
}
