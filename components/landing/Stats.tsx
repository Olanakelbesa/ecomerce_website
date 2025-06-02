import { TrendingUp, Users, Package, Award } from "lucide-react"

export function Stats() {
  const stats = [
    {
      icon: Users,
      value: "50K+",
      label: "Happy Customers",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Package,
      value: "10K+",
      label: "Products Sold",
      color: "text-green-600 dark:text-green-400",
    },
    {
      icon: TrendingUp,
      value: "99%",
      label: "Satisfaction Rate",
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: Award,
      value: "5★",
      label: "Average Rating",
      color: "text-yellow-600 dark:text-yellow-400",
    },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-background shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
