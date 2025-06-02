import { ProductGrid } from "@/components/products/ProductGrid";
import { FilterProducts } from "@/components/products/FilterProducts";

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">All Products</h1>
        <p className="text-muted-foreground">
          Discover our complete collection of high-quality products
        </p>
      </div>

      <FilterProducts />
      <ProductGrid />
    </div>
  );
}
