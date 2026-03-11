import { create } from 'zustand'

type ProductModalState = {
    isModalOpen: boolean
    setIsModalOpen: (state: boolean) => void
}

export const useProductModal = create<ProductModalState>((set) => ({
    isModalOpen: false,
    setIsModalOpen: (state) => set({ isModalOpen: state }),
}))
