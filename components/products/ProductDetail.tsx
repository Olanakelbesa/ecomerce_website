"use client";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/lib/slices/cartSlice";
import {
  addToFavorites,
  removeFromFavorites,
} from "@/lib/slices/favoritesSlice";
import type { Product } from "@/lib/types";
import type { RootState } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="aspect-square relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground capitalize mb-2">
            {product.category}
          </p>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

          <div className="flex items-center space-x-2 mb-4">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating.rate)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>

          <p className="text-4xl font-bold mb-6">${product.price.toFixed(2)}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="w-1/2 flex flex-row gap-4">
          <Button
          variant={"default"}
            onClick={handleAddToCart}
            size="lg"
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
          </Button>

          <Button
            onClick={handleToggleFavorite}
            variant={"outline"}
            className="bg-transparent text-primary"
            title={isAuthenticated ? undefined : "Sign in to add favorites"}
          >
            <Heart className={`h-5 w-5 ${isLiked ? "fill-primary " : ""}`} />
          </Button>
        </div>
      </div>
    </div>
  );
}
