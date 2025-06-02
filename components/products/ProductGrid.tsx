"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/lib/store";
import { fetchProducts } from "@/lib/slices/productsSlice";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

export function ProductGrid() {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredProducts, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    // Add error boundary to prevent crashes
    try {
      dispatch(fetchProducts());
    } catch (error) {
      console.error("Error dispatching fetchProducts:", error);
    }
  }, [dispatch]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg">Error: {error}</p>
        <button
          onClick={() => dispatch(fetchProducts())}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          No products found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div
      id="products"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
