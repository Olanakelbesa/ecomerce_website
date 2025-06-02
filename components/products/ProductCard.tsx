"use client";

import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/lib/slices/cartSlice";
import {
  addToFavorites,
  removeFromFavorites,
} from "@/lib/slices/favoritesSlice";
import type { Product } from "@/lib/types";
import type { RootState } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const [isLiked, setIsLiked] = useState(false);

  // Check if product is in favorites
  useEffect(() => {
    const isFavorite = favorites.some((item) => item.id === product.id);
    setIsLiked(isFavorite);
  }, [favorites, product.id]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      })
    );
  };

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      // Optionally show a message or redirect to login
      return;
    }

    if (isLiked) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(
        addToFavorites({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
          rating: product.rating,
        })
      );
    }
  };

  return (
    <Card className="group hover:shadow-lg dark:hover:shadow-xl transition-all duration-300 border-border hover:border-primary/20 bg-card">
      <CardContent className="p-4">
        <div className="relative">
          <Link href={`/products/${product.id}`}>
            <div className="aspect-square relative mb-4 overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-800/50 group-hover:bg-gray-100 dark:group-hover:bg-gray-800/70 transition-colors">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
          </Link>

          {/* Wishlist button */}
          <button
            onClick={handleToggleFavorite}
            className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-all duration-200 shadow-sm ${
              isAuthenticated
                ? "bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800"
                : "bg-gray-200/80 dark:bg-gray-700/80 cursor-not-allowed"
            }`}
            disabled={!isAuthenticated}
            title={
              isAuthenticated ? "Add to favorites" : "Sign in to add favorites"
            }
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isLiked
                  ? "text-red-500 fill-current"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            />
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground capitalize font-medium bg-muted/50 px-2 py-1 rounded-md">
              {product.category}
            </p>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span className="text-xs text-muted-foreground">
                {product.rating.rate}
              </span>
            </div>
          </div>

          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors text-foreground leading-tight">
              {product.title}
            </h3>
          </Link>

          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-foreground">
              ${product.price.toFixed(2)}
            </p>
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating.rate)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.rating.count})
              </span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full group" size="sm">
          <ShoppingCart className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
