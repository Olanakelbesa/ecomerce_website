import { ProductDetail } from "@/components/products/ProductDetail";
import { getProduct, getProducts } from "@/lib/api";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = Number.parseInt(id);

  // Validate that the ID is a valid number
  if (isNaN(productId) || productId <= 0) {
    notFound();
  }

  try {
    const product = await getProduct(productId);

    if (!product) {
      notFound();
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <ProductDetail product={product} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    notFound();
  }
}

export async function generateStaticParams() {
  try {
    // Fetch all products to generate static params
    const products = await getProducts();

    return products.map((product) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    // Return empty array if API fails, pages will be generated on-demand
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = Number.parseInt(id);

  if (isNaN(productId)) {
    return {
      title: "Product Not Found",
    };
  }

  try {
    const product = await getProduct(productId);

    return {
      title: `${product.title} - UrjiStore`,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [product.image],
      },
    };
  } catch (error) {
    return {
      title: "Product Not Found",
    };
  }
}
