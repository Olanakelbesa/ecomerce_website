"use client"

import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/lib/store"
import { removeFromFavorites, clearFavorites } from "@/lib/slices/favoritesSlice"
import { addToCart } from "@/lib/slices/cartSlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Trash2, ShoppingCart, Calendar, Filter, SortAsc, SortDesc, Grid, List, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth"

type SortOption = "newest" | "oldest" | "price-high" | "price-low" | "rating"
type ViewMode = "grid" | "list"

export function FavoritesContent() {
  const { user } = useAuth()
  const dispatch = useDispatch()
  const favorites = useSelector((state: RootState) => state.favorites.items)
  const [sortBy, setSortBy] = useState<SortOption>("newest")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [filterCategory, setFilterCategory] = useState<string | null>(null)

  // Get unique categories
  const categories = Array.from(new Set(favorites.map((item) => item.category)))

  // Handle sorting and filtering
  const sortedAndFilteredFavorites = [...favorites]
    .filter((item) => (filterCategory ? item.category === filterCategory : true))
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.dateAdded - a.dateAdded
        case "oldest":
          return a.dateAdded - b.dateAdded
        case "price-high":
          return b.price - a.price
        case "price-low":
          return a.price - b.price
        case "rating":
          return b.rating.rate - a.rating.rate
        default:
          return 0
      }
    })

  const handleRemoveFromFavorites = (id: number) => {
    dispatch(removeFromFavorites(id))
  }

  const handleAddToCart = (item: (typeof favorites)[0]) => {
    dispatch(
      addToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
      }),
    )
  }

  const handleClearFavorites = () => {
    if (confirm("Are you sure you want to clear all favorites?")) {
      dispatch(clearFavorites())
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString()
  }

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">My Favorites</h1>
            <p className="text-muted-foreground">Save your favorite products for easy access</p>
          </div>

          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-8">Start adding products to your favorites to see them here</p>
            <Link href="/dashboard">
              <Button>Browse Products</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">My Favorites</h1>
          <p className="text-muted-foreground">
            {user?.name}'s collection of {favorites.length} favorite products
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {/* Category Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  {filterCategory ? `Category: ${filterCategory}` : "All Categories"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setFilterCategory(null)}>All Categories</DropdownMenuItem>
                {categories.map((category) => (
                  <DropdownMenuItem key={category} onClick={() => setFilterCategory(category)}>
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort Options */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                  {sortBy === "newest" || sortBy === "oldest" ? (
                    <Calendar className="h-4 w-4 mr-2" />
                  ) : sortBy === "price-high" || sortBy === "price-low" ? (
                    sortBy === "price-high" ? (
                      <SortDesc className="h-4 w-4 mr-2" />
                    ) : (
                      <SortAsc className="h-4 w-4 mr-2" />
                    )
                  ) : (
                    <Star className="h-4 w-4 mr-2" />
                  )}
                  Sort:{" "}
                  {sortBy === "newest"
                    ? "Newest"
                    : sortBy === "oldest"
                      ? "Oldest"
                      : sortBy === "price-high"
                        ? "Price (High to Low)"
                        : sortBy === "price-low"
                          ? "Price (Low to High)"
                          : "Rating"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setSortBy("newest")}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Newest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("oldest")}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Oldest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("price-high")}>
                  <SortDesc className="h-4 w-4 mr-2" />
                  Price (High to Low)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("price-low")}>
                  <SortAsc className="h-4 w-4 mr-2" />
                  Price (Low to High)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("rating")}>
                  <Star className="h-4 w-4 mr-2" />
                  Rating
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* View Mode Toggle */}
            <div className="flex items-center border border-border rounded-md overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                className="rounded-none"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                className="rounded-none"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Clear All Button */}
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 border-red-200 dark:border-red-900"
            onClick={handleClearFavorites}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>

        {/* Favorites List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedAndFilteredFavorites.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 border-border">
                <CardContent className="p-4">
                  <div className="relative">
                    <Link href={`/products/${item.id}`}>
                      <div className="aspect-square relative mb-4 overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-800/50">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                      </div>
                    </Link>

                    {/* Remove button */}
                    <button
                      onClick={() => handleRemoveFromFavorites(item.id)}
                      className="absolute top-2 right-2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 shadow-sm"
                    >
                      <Heart className="h-4 w-4 text-red-500 fill-current" />
                    </button>

                    {/* Date added */}
                    <div className="absolute bottom-2 left-2 px-2 py-1 rounded-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 inline mr-1" />
                      {formatDate(item.dateAdded)}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="capitalize">
                        {item.category}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-muted-foreground">{item.rating.rate}</span>
                      </div>
                    </div>

                    <Link href={`/products/${item.id}`}>
                      <h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors text-foreground leading-tight">
                        {item.title}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-foreground">${item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button onClick={() => handleAddToCart(item)} className="flex-1" size="sm">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      onClick={() => handleRemoveFromFavorites(item.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedAndFilteredFavorites.map((item) => (
              <Card key={item.id} className="border-border hover:shadow-md transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Image */}
                    <div className="relative w-full sm:w-32 h-32">
                      <Link href={`/products/${item.id}`}>
                        <div className="h-full relative rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800/50">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 128px"
                          />
                        </div>
                      </Link>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <Badge variant="outline" className="capitalize">
                            {item.category}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-muted-foreground">{item.rating.rate}</span>
                          </div>
                        </div>

                        <Link href={`/products/${item.id}`}>
                          <h3 className="font-semibold hover:text-primary transition-colors text-foreground leading-tight mb-2">
                            {item.title}
                          </h3>
                        </Link>

                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <Calendar className="h-3 w-3 mr-1" />
                          Added on {formatDate(item.dateAdded)}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-xl font-bold text-foreground">${item.price.toFixed(2)}</p>

                        <div className="flex gap-2">
                          <Button onClick={() => handleAddToCart(item)} size="sm">
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                          <Button
                            onClick={() => handleRemoveFromFavorites(item.id)}
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
