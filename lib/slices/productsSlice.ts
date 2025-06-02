import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { Product, FilterState } from "../types"
import { getProducts, getCategories } from "../api"

interface ProductsState {
  products: Product[]
  filteredProducts: Product[]
  categories: string[]
  loading: boolean
  error: string | null
  filters: FilterState
  sortBy: string
}

type SortableField = 'title' | 'price' | 'rating.rate'

interface SortPayload {
  field: SortableField
  direction: 'asc' | 'desc'
}

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  categories: [],
  loading: false,
  error: null,
  filters: {
    category: "",
    minPrice: 0,
    maxPrice: 1000,
    minRating: 0,
    searchQuery: "",
  },
  sortBy: "title",
}

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const products = await getProducts()
  return products
})

export const fetchCategories = createAsyncThunk("products/fetchCategories", async () => {
  const categories = await getCategories()
  return categories
})

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      state.filters = { ...state.filters, ...action.payload }
      applyFiltersAndSort(state)
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload
      applyFiltersAndSort(state)
    },
    sortProducts: (state, action: PayloadAction<SortPayload>) => {
      const { field, direction } = action.payload
      state.filteredProducts.sort((a, b) => {
        if (field === 'title') {
          return direction === 'asc'
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
        }
        
        const aValue = field === 'rating.rate' ? a.rating.rate : a.price
        const bValue = field === 'rating.rate' ? b.rating.rate : b.price
        
        return direction === 'asc'
          ? aValue - bValue
          : bValue - aValue
      })
    },
    clearFilters: (state) => {
      state.filters = {
        category: "",
        minPrice: 0,
        maxPrice: 1000,
        minRating: 0,
        searchQuery: "",
      }
      state.sortBy = "title"
      applyFiltersAndSort(state)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
        applyFiltersAndSort(state)
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch products"
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })
  },
})

function applyFiltersAndSort(state: ProductsState) {
  let filtered = [...state.products]

  // Apply filters
  if (state.filters.category) {
    filtered = filtered.filter((product) => product.category === state.filters.category)
  }

  if (state.filters.searchQuery) {
    const query = state.filters.searchQuery.toLowerCase()
    filtered = filtered.filter(
      (product) => product.title.toLowerCase().includes(query) || product.description.toLowerCase().includes(query),
    )
  }

  filtered = filtered.filter(
    (product) =>
      product.price >= state.filters.minPrice &&
      product.price <= state.filters.maxPrice &&
      product.rating.rate >= state.filters.minRating,
  )

  // Apply sorting
  switch (state.sortBy) {
    case "price-low":
      filtered.sort((a, b) => a.price - b.price)
      break
    case "price-high":
      filtered.sort((a, b) => b.price - a.price)
      break
    case "rating":
      filtered.sort((a, b) => b.rating.rate - a.rating.rate)
      break
    case "title":
    default:
      filtered.sort((a, b) => a.title.localeCompare(b.title))
      break
  }

  state.filteredProducts = filtered
}

export const { setFilters, setSortBy, clearFilters, sortProducts } = productsSlice.actions
export default productsSlice.reducer
