import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { CartItem } from "../types"

interface CartState {
  items: CartItem[]
  total: number
}

const initialState: CartState = {
  items: [],
  total: 0,
}

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }

      state.total = calculateTotal(state.items)
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      state.total = calculateTotal(state.items)
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id)
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== action.payload.id)
        } else {
          item.quantity = action.payload.quantity
        }
      }
      state.total = calculateTotal(state.items)
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
    },
    loadCartFromStorage: (state) => {
      if (typeof window !== "undefined") {
        try {
          const savedCart = localStorage.getItem("cart")
          if (savedCart) {
            const parsedCart = JSON.parse(savedCart)
            if (parsedCart && Array.isArray(parsedCart.items)) {
              state.items = parsedCart.items
              state.total = calculateTotal(state.items)
            }
          }
        } catch (error) {
          console.error("Error loading cart from storage:", error)
          // Reset to initial state on error
          state.items = []
          state.total = 0
        }
      }
    },
    saveCartToStorage: (state) => {
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("cart", JSON.stringify(state))
        } catch (error) {
          console.error("Error saving cart to storage:", error)
        }
      }
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, loadCartFromStorage, saveCartToStorage } =
  cartSlice.actions
export default cartSlice.reducer
