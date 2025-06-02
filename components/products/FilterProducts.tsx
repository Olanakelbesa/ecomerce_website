"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/lib/store";
import {
  setFilters,
  setSortBy,
  clearFilters,
  fetchCategories,
  sortProducts,
} from "@/lib/slices/productsSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Define main categories
const mainCategories = [
  "all",
  "electronics",
  "women's clothing",
  "men's clothing",
  "jewelery",
];

// Define sort options
const sortOptions = [
  { value: "title", label: "Name" },
  { value: "price", label: "Price" },
  { value: "rating.rate", label: "Rating" },
];

export function FilterProducts() {
  const dispatch = useDispatch<AppDispatch>();
  const { filters, sortBy, categories } = useSelector(
    (state: RootState) => state.products
  );
  const [sortDirections, setSortDirections] = useState<Record<string, boolean>>(
    {
      title: true,
      price: true,
      "rating.rate": false,
    }
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleClearFilters = () => {
    dispatch(clearFilters());
    // Reset sort directions to default
    setSortDirections({
      title: true,
      price: true,
      "rating.rate": false,
    });
  };

  const handleSort = (value: string) => {
    const isAscending = !sortDirections[value];
    setSortDirections((prev) => ({ ...prev, [value]: isAscending }));

    // Update sort state and sort products
    dispatch(
      sortProducts({
        field: value as "title" | "price" | "rating.rate",
        direction: isAscending ? "asc" : "desc",
      })
    );
  };

  const getCurrentSortValue = (value: string) => {
    return sortBy === `${value}-low` || sortBy === `${value}-high`;
  };

  const getSortDirection = (value: string) => {
    return sortDirections[value];
  };

  return (
    <Card className="mb-8 border-border-color bg-card">
      <CardContent className="p-6">
        {/* Categories Section */}
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-3 text-foreground">
            Categories
          </h4>
          <div className="flex flex-wrap gap-2">
            {mainCategories.map((category) => (
              <Button
                key={category}
                variant={filters.category === category ? "default" : "outline"}
                className="capitalize"
                onClick={() =>
                  dispatch(
                    setFilters({ category: category === "all" ? "" : category })
                  )
                }
              >
                {category === "all" ? "All Products" : category}
              </Button>
            ))}
          </div>
        </div>

        {/* Sort Section */}
        <div>
          <h4 className="text-sm font-medium mb-3 text-foreground">Sort By</h4>
          <div className="flex flex-wrap gap-2">
            {sortOptions.map((option) => {
              const isActive = getCurrentSortValue(option.value);
              return (
                <Button
                  key={option.value}
                  variant={isActive ? "default" : "outline"}
                  onClick={() => handleSort(option.value)}
                  className={cn(
                    "flex items-center gap-2 transition-colors",
                    isActive &&
                      "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  {option.label}
                  {getSortDirection(option.value) ? (
                    <ArrowUp className="h-4 w-4" />
                  ) : (
                    <ArrowDown className="h-4 w-4" />
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
