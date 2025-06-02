"use client";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/lib/store";
import {
  removeFromFavorites,
  clearFavorites,
} from "@/lib/slices/favoritesSlice";
import { addToCart } from "@/lib/slices/cartSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Heart,
  Trash2,
  ShoppingCart,
  Calendar,
  Filter,
  SortAsc,
  SortDesc,
  Grid,
  List,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";

type SortOption = "newest" | "oldest" | "price-high" | "price-low" | "rating";
type ViewMode = "grid" | "list";

export function FavoritesContent() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  // Get unique categories
  const categories = Array.from(
    new Set(favorites.map((item) => item.category))
  );

  // Handle sorting and filtering
  const sortedAndFilteredFavorites = [...favorites]
    .filter((item) =>
      filterCategory ? item.category === filterCategory : true
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.dateAdded - a.dateAdded;
        case "oldest":
          return a.dateAdded - b.dateAdded;
        case "price-high":
          return b.price - a.price;
        case "price-low":
          return a.price - b.price;
        case "rating":
          return b.rating.rate - a.rating.rate;
        default:
          return 0;
      }
    });

  const handleRemoveFromFavorites = (id: number) => {
    dispatch(removeFromFavorites(id));
  };

  const handleAddToCart = (item: (typeof favorites)[0]) => {
    dispatch(
      addToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
      })
    );
  };

  const handleClearFavorites = () => {
    if (confirm("Are you sure you want to clear all favorites?")) {
      dispatch(clearFavorites());
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 text-foreground">
              My Favorites
            </h1>
            <p className="text-muted-foreground">
              Save your favorite products for easy access
            </p>
          </div>

          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-foreground">
              No favorites yet
            </h2>
            <p className="text-muted-foreground mb-8">
              Start adding products to your favorites to see them here
            </p>
            <Link href="/dashboard">
              <Button variant="default">Browse Products</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-foreground">
            My Favorites
          </h1>
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
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                >
                  <Filter className="h-4 w-4 mr-2 text-foreground" />
                  {filterCategory
                    ? `Category: ${filterCategory}`
                    : "All Categories"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem
                  onClick={() => setFilterCategory(null)}
                  className="text-foreground hover:bg-muted/50"
                >
                  All Categories
                </DropdownMenuItem>
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => setFilterCategory(category)}
                    className="text-foreground hover:bg-muted/50"
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort Options */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                >
                  {sortBy === "newest" || sortBy === "oldest" ? (
                    <Calendar className="h-4 w-4 mr-2 text-foreground" />
                  ) : sortBy === "price-high" || sortBy === "price-low" ? (
                    sortBy === "price-high" ? (
                      <SortDesc className="h-4 w-4 mr-2 text-foreground" />
                    ) : (
                      <SortAsc className="h-4 w-4 mr-2 text-foreground" />
                    )
                  ) : (
                    <Star className="h-4 w-4 mr-2 text-foreground" />
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
                <DropdownMenuItem
                  onClick={() => setSortBy("newest")}
                  className="text-foreground hover:bg-muted/50"
                >
                  <Calendar className="h-4 w-4 mr-2 text-foreground" />
                  Newest First
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("oldest")}
                  className="text-foreground hover:bg-muted/50"
                >
                  <Calendar className="h-4 w-4 mr-2 text-foreground" />
                  Oldest First
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("price-high")}
                  className="text-foreground hover:bg-muted/50"
                >
                  <SortDesc className="h-4 w-4 mr-2 text-foreground" />
                  Price (High to Low)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("price-low")}
                  className="text-foreground hover:bg-muted/50"
                >
                  <SortAsc className="h-4 w-4 mr-2 text-foreground" />
                  Price (Low to High)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("rating")}
                  className="text-foreground hover:bg-muted/50"
                >
                  <Star className="h-4 w-4 mr-2 text-foreground" />
                  Rating
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* View Mode Toggle */}
            <div className="flex items-center border border-border-color rounded-md overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                className="rounded-none"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4 text-foreground" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                className="rounded-none"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4 text-foreground" />
              </Button>
            </div>
          </div>

          <Button
            variant="destructive"
            size="sm"
            onClick={handleClearFavorites}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Clear All
          </Button>
        </div>

        {/* Favorites Grid/List */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }
        >
          {sortedAndFilteredFavorites.map((item) => (
            <Card
              key={item.id}
              className={
                viewMode === "list"
                  ? "flex items-center border-border-color bg-card p-4"
                  : "border-border-color bg-card"
              }
            >
              <CardContent
                className={
                  viewMode === "list"
                    ? "flex-1 p-0 flex items-center gap-6"
                    : "p-4"
                }
              >
                <Link
                  href={`/products/${item.id}`}
                  className={
                    viewMode === "list"
                      ? "w-20 h-20 relative flex-shrink-0"
                      : "aspect-square relative mb-4 overflow-hidden rounded-lg bg-background group-hover:bg-muted/50 transition-colors"
                  }
                >
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className={
                      viewMode === "list"
                        ? "object-contain"
                        : "object-contain group-hover:scale-105 transition-transform duration-300"
                    }
                    sizes={
                      viewMode === "list"
                        ? "80px"
                        : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    }
                  />
                </Link>

                <div
                  className={
                    viewMode === "list" ? "flex-1 space-y-2" : "space-y-2"
                  }
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground capitalize font-medium bg-muted/50 px-2 py-1 rounded-md">
                      {item.category}
                    </p>
                    {viewMode === "list" && item.rating && (
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-muted-foreground">
                          {item.rating.rate}
                        </span>
                      </div>
                    )}
                  </div>

                  <Link href={`/products/${item.id}`}>
                    <h3
                      className={
                        viewMode === "list"
                          ? "font-semibold line-clamp-1 hover:text-primary transition-colors text-foreground leading-tight"
                          : "font-semibold line-clamp-2 hover:text-primary transition-colors text-foreground leading-tight"
                      }
                    >
                      {item.title}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-foreground">
                      ${item.price.toFixed(2)}
                    </p>
                    {viewMode === "grid" && item.rating && (
                      <div className="flex items-center space-x-1">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(item.rating.rate)
                                  ? "text-yellow-400 fill-current"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          ({item.rating.count})
                        </span>
                      </div>
                    )}
                  </div>

                  {viewMode === "list" && (
                    <div className="flex items-center gap-4 mt-4">
                      <Button
                        onClick={() => handleAddToCart(item)}
                        size="sm"
                        variant="secondary"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveFromFavorites(item.id)}
                        className="flex items-center gap-2 text-destructive hover:text-destructive/90 border-border-color hover:bg-destructive/10"
                      >
                        <Heart className="h-4 w-4 fill-current text-destructive" />
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>

              {viewMode === "grid" && (
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <Button
                    onClick={() => handleAddToCart(item)}
                    className="group w-full"
                    size="sm"
                    variant="secondary"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFromFavorites(item.id)}
                    className="flex items-center justify-center w-fit h-fit p-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                  >
                    <Heart className="h-4 w-4 fill-current text-destructive" />
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
