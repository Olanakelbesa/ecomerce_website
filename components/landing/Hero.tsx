import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, Star, ShoppingBag } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.05))]" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 opacity-20 animate-bounce">
        <ShoppingBag className="h-8 w-8 text-blue-500" />
      </div>
      <div className="absolute top-40 right-20 opacity-20 animate-pulse">
        <Star className="h-6 w-6 text-purple-500" />
      </div>
      <div className="absolute bottom-20 left-20 opacity-20 animate-bounce delay-1000">
        <Sparkles className="h-10 w-10 text-pink-500" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                New Collection Available
              </Badge>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Shop Smart,
                </span>
                <br />
                <span className="text-foreground">Live Better</span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Discover premium products from top brands worldwide. Quality
                guaranteed, fast shipping, and exceptional customer service.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#featured-products">
                <Button
                  size="lg"
                  className="group shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Shopping
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="outline" className="border-2">
                  Browse All Products
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-1">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 border-2 border-white dark:border-gray-800"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground ml-2">
                  10,000+ Happy Customers
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  4.9/5 Rating
                </span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
                    <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
                    <div className="w-full h-24 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
                    <div className="w-full h-24 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
                    <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg animate-bounce">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs font-medium">Free Shipping</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg animate-pulse">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-xs font-medium">Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
