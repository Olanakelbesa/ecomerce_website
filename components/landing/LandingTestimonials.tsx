import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

export function LandingTestimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fashion Enthusiast",
      content:
        "UrjiStore has completely transformed my shopping experience. The quality is outstanding!",
      rating: 5,
      avatar: "👩‍💼",
    },
    {
      name: "Mike Chen",
      role: "Tech Professional",
      content:
        "Amazing selection of products and lightning-fast delivery. Highly recommend to everyone!",
      rating: 5,
      avatar: "👨‍💻",
    },
    {
      name: "Emily Davis",
      role: "Small Business Owner",
      content:
        "The customer service is exceptional. They really care about their customers' satisfaction.",
      rating: 5,
      avatar: "👩‍🎨",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust UrjiStore for their
            shopping needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
