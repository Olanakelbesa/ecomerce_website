import {
  Shield,
  Truck,
  Headphones,
  RefreshCw,
  CreditCard,
  Globe,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function Features() {
  const features = [
    {
      icon: Shield,
      title: "Secure Shopping",
      description:
        "Your data is protected with enterprise-grade security and SSL encryption.",
      color: "text-green-600 dark:text-green-400",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description:
        "Free shipping on orders over $50. Express delivery available worldwide.",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description:
        "Our customer service team is here to help you anytime, anywhere.",
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description:
        "30-day hassle-free returns. No questions asked, full refund guaranteed.",
      color: "text-orange-600 dark:text-orange-400",
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description:
        "Multiple payment options including PayPal, Stripe, and major credit cards.",
      color: "text-red-600 dark:text-red-400",
    },
    {
      icon: Globe,
      title: "Global Shipping",
      description:
        "We deliver to over 100 countries worldwide with tracking included.",
      color: "text-teal-600 dark:text-teal-400",
    },
  ];

  return (
    <section className="py-20 bg-[#2A6DB4]/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose UrjiStore?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing the best shopping experience with
            premium features and exceptional service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-border"
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
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
