import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function Categories() {
  const categories = [
    {
      name: "Electronics",
      description: "Latest gadgets and tech",
      image: "📱",
      count: "500+ Products",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Fashion",
      description: "Trendy clothing & accessories",
      image: "👕",
      count: "1000+ Products",
      color: "from-pink-500 to-rose-500",
    },
    {
      name: "Jewelry",
      description: "Elegant and luxury pieces",
      image: "💎",
      count: "200+ Products",
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "Sports",
      description: "Fitness and outdoor gear",
      image: "⚽",
      count: "300+ Products",
      color: "from-green-500 to-emerald-500",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse collection of products across multiple categories.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-border"
            >
              <CardContent className="p-0">
                <div className={`h-32 bg-gradient-to-br ${category.color} flex items-center justify-center text-4xl`}>
                  {category.image}
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">{category.name}</h3>
                  <p className="text-muted-foreground">{category.description}</p>
                  <p className="text-sm font-medium text-primary">{category.count}</p>
                  <Link href="/products">
                    <Button
                      variant="ghost"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      Browse Category
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
