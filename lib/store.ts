import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./slices/cartSlice"
import productsReducer from "./slices/productsSlice"
import favoritesReducer from "./slices/favoritesSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
