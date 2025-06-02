import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 dark:from-blue-800 dark:via-purple-800 dark:to-blue-900 text-white rounded-xl p-8 md:p-12 shadow-2xl">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px] animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent" />

      {/* Floating elements */}
      <div className="absolute top-4 right-4 opacity-20">
        <Sparkles className="h-8 w-8 animate-bounce" />
      </div>
      <div className="absolute bottom-4 left-4 opacity-20">
        <Sparkles className="h-6 w-6 animate-pulse" />
      </div>

      <div className="relative max-w-3xl">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
          <Sparkles className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">New Collection Available</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
          Discover Amazing Products
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 text-blue-50 leading-relaxed">
          Shop the latest trends with our curated collection of high-quality products from around the world
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="#products">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/products">
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
