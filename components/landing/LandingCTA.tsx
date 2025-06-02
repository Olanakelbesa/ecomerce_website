import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles, ShoppingBag } from "lucide-react";
import Link from "next/link";

export function LandingCTA() {
  return (
    <section className="py-20 bg-[#2A6DB4] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 opacity-20 animate-bounce">
        <ShoppingBag className="h-8 w-8" />
      </div>
      <div className="absolute top-20 right-20 opacity-20 animate-pulse">
        <Sparkles className="h-6 w-6" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6 mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Sparkles className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">
                Ready to Start Shopping?
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold">
              Join UrjiStore Today
            </h2>

            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Create your account now and get access to exclusive deals, premium
              products, and exceptional customer service.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/signin">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#features">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-transparent  hover:bg-white/10 backdrop-blur-sm"
              >
                Learn More
              </Button>
            </Link>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 text-center text-white/80">
                <ShoppingBag className="h-8 w-8 mx-auto mb-3 opacity-80" />
                <h3 className="font-semibold mb-2 ">Instant Access</h3>
                <p className="text-sm opacity-80">
                  Start shopping immediately after registration
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 text-center text-white/80">
                <Sparkles className="h-8 w-8 mx-auto mb-3 opacity-80" />
                <h3 className="font-semibold mb-2 ">Exclusive Deals</h3>
                <p className="text-sm opacity-80">
                  Member-only discounts and special offers
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 text-center text-white/80">
                <ArrowRight className="h-8 w-8 mx-auto mb-3 opacity-80" />
                <h3 className="font-semibold mb-2 ">Fast Checkout</h3>
                <p className="text-sm opacity-80">
                  Streamlined purchasing process
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
