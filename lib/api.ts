import axios from "axios"
import type { Product, User } from "./types"

const API_BASE_URL = "https://fakestoreapi.com"

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.status, error.message)
    throw error
  },
)

// Products API
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get<Product[]>("/products")
    return response.data
  } catch (error) {
    console.error("Error fetching products:", error)
    throw new Error("Failed to fetch products")
  }
}

export const getProduct = async (id: number): Promise<Product> => {
  try {
    const response = await api.get<Product>(`/products/${id}`)

    // Check if the response is valid
    if (!response.data || !response.data.id) {
      throw new Error("Product not found")
    }

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Product not found")
      }
      if (error.response?.status && error.response.status >= 500) {
        throw new Error("Server error")
      }
    }
    console.error("Error fetching product:", error)
    throw new Error("Failed to fetch product")
  }
}

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const response = await api.get<Product[]>(`/products/category/${category}`)
    return response.data
  } catch (error) {
    console.error("Error fetching products by category:", error)
    throw new Error("Failed to fetch products by category")
  }
}

export const getCategories = async (): Promise<string[]> => {
  try {
    const response = await api.get<string[]>("/products/categories")
    return response.data
  } catch (error) {
    console.error("Error fetching categories:", error)
    throw new Error("Failed to fetch categories")
  }
}

// Simplified auth - no external API call needed for demo
export const authLogin = async (username: string, password: string): Promise<User> => {
  // Demo user data - in production, this would come from your API
  const demoUsers: Record<string, User> = {
    mor_2314: {
      id: 1,
      email: "mor_2314@gmail.com",
      username: "mor_2314",
      password: "",
      name: {
        firstname: "John",
        lastname: "Doe",
      },
      address: {
        city: "kilcoole",
        street: "7835 new road",
        number: 3,
        zipcode: "12926-3874",
        geolocation: {
          lat: "-37.3159",
          long: "81.1496",
        },
      },
      phone: "1-570-236-7033",
    },
  }

  const user = demoUsers[username]
  if (user) {
    return user
  }

  throw new Error("Invalid credentials")
}
