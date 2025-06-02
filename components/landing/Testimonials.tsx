import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fashion Blogger",
      content:
        "UrjiStore has the best collection of trendy clothes. The quality is amazing and shipping is super fast!",
      rating: 5,
      avatar: "👩‍💼",
    },
    {
      name: "Mike Chen",
      role: "Tech Enthusiast",
      content:
        "I've bought several electronics from here. Great prices, authentic products, and excellent customer service.",
      rating: 5,
      avatar: "👨‍💻",
    },
    {
      name: "Emily Davis",
      role: "Jewelry Designer",
      content:
        "The jewelry collection is stunning! Each piece is carefully crafted and arrives beautifully packaged.",
      rating: 5,
      avatar: "👩‍🎨",
    },
    {
      name: "David Wilson",
      role: "Fitness Coach",
      content:
        "Perfect place for sports equipment. High-quality gear at competitive prices. Highly recommended!",
      rating: 5,
      avatar: "🏋️‍♂️",
    },
  ];

  return (
    <section className="py-20 bg-muted/30" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers
            have to say about us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-border"
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Quote className="h-8 w-8 text-primary opacity-50" />

                  <p className="text-muted-foreground leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center space-x-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>

                  <div className="flex items-center space-x-3 pt-2">
                    <div className="text-2xl">{testimonial.avatar}</div>
                    <div>
                      <div className="font-semibold text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
