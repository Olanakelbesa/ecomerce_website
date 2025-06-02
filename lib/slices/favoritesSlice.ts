import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface FavoriteItem {
  id: number
  title: string
  price: number
  image: string
  category: string
  rating: {
    rate: number
    count: number
  }
  dateAdded: number // timestamp
}

interface FavoritesState {
  items: FavoriteItem[]
  initialized: boolean
}

const initialState: FavoritesState = {
  items: [],
  initialized: false,
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Omit<FavoriteItem, "dateAdded">>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id)

      if (!existingItem) {
        state.items.push({
          ...action.payload,
          dateAdded: Date.now(),
        })
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    clearFavorites: (state) => {
      state.items = []
    },
    loadFavoritesFromStorage: (state) => {
      if (typeof window !== "undefined") {
        try {
          const savedFavorites = localStorage.getItem("UrjiStore_favorites")
          if (savedFavorites) {
            const parsedFavorites = JSON.parse(savedFavorites)
            if (parsedFavorites && Array.isArray(parsedFavorites.items)) {
              state.items = parsedFavorites.items
            }
          }
          state.initialized = true
        } catch (error) {
          console.error("Error loading favorites from storage:", error)
          state.items = []
          state.initialized = true
        }
      }
    },
    saveFavoritesToStorage: (state) => {
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("UrjiStore_favorites", JSON.stringify(state))
        } catch (error) {
          console.error("Error saving favorites to storage:", error)
        }
      }
    },
  },
})

export const { addToFavorites, removeFromFavorites, clearFavorites, loadFavoritesFromStorage, saveFavoritesToStorage } =
  favoritesSlice.actions

export default favoritesSlice.reducer
