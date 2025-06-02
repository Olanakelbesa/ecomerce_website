"use client";

import { ProductGrid } from "@/components/products/ProductGrid";
import { FilterProducts } from "@/components/products/FilterProducts";
import { useAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Clock, Database, Key } from "lucide-react";

export function DashboardContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Welcome back, {user?.name || user?.username}!
          </h1>
          <p className="text-muted-foreground">
            Discover amazing products and add them to your cart
          </p>
        </div>

        <FilterProducts />
        <ProductGrid />
      </div>
    </div>
  );
}
