"use client"

import type React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "./store"
import { loadCartFromStorage } from "./slices/cartSlice"
import { loadFavoritesFromStorage, saveFavoritesToStorage } from "./slices/favoritesSlice"

export function PersistenceProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch()
  const cartState = useSelector((state: RootState) => state.cart)
  const favoritesState = useSelector((state: RootState) => state.favorites)

  // Load cart and favorites from localStorage on mount
  useEffect(() => {
    // Add a small delay to ensure the component is mounted
    const timer = setTimeout(() => {
      dispatch(loadCartFromStorage())
      dispatch(loadFavoritesFromStorage())
    }, 100)

    return () => clearTimeout(timer)
  }, [dispatch])

  // Save cart to localStorage whenever cart state changes
  useEffect(() => {
    if (typeof window !== "undefined" && cartState.items.length >= 0) {
      try {
        localStorage.setItem("cart", JSON.stringify(cartState))
      } catch (error) {
        console.error("Error saving cart to localStorage:", error)
      }
    }
  }, [cartState])

  // Save favorites to localStorage whenever favorites state changes
  useEffect(() => {
    if (typeof window !== "undefined" && favoritesState.initialized) {
      dispatch(saveFavoritesToStorage())
    }
  }, [favoritesState, dispatch])

  return <>{children}</>
}
