export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export interface CartItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}

export interface User {
  id: number
  email: string
  username: string
  password: string
  name: {
    firstname: string
    lastname: string
  }
  address: {
    city: string
    street: string
    number: number
    zipcode: string
    geolocation: {
      lat: string
      long: string
    }
  }
  phone: string
}

export interface AuthResponse {
  token: string
}

export interface SortOption {
  value: string
  label: string
}

export interface FilterState {
  category: string
  minPrice: number
  maxPrice: number
  minRating: number
  searchQuery: string
}
