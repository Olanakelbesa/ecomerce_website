import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-background py-6 sm:py-10">
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[500px] lg:min-h-[600px]">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 z-10 order-1 lg:order-none">
            <div className="space-y-4 lg:space-y-6">
              {/* Trending Badge */}
              <Badge className="bg-muted hover:bg-muted text-muted-foreground text-sm font-medium px-4 py-2">
                <Zap className="h-4 w-4 mr-2 text-yellow-500" />
                New Collection Available
              </Badge>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-primary">Shop Smart,</span>
                <br />
                <span className="text-foreground">Live Better</span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg">
                Discover premium products from top brands worldwide. Quality
                guaranteed, fast shipping, and exceptional customer service.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link href="/auth/signin" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary hover:bg-primary text-white px-8 py-4 text-lg font-medium group shadow-lg"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-primary hover:text-primary px-6 py-4 rounded-full font-medium group"
              >
                <div className="flex items-center">Learn More</div>
              </Button>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative flex justify-center lg:justify-end order-2 lg:order-none mt-8 lg:mt-0">
            {/* Yellow Paint Brush Background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-[500px] lg:h-[500px]">
                {/* Paint brush stroke effect */}
              </div>
            </div>

            {/* Model Image */}
            <div className="relative z-10 flex items-center justify-center">
              <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[450px] lg:right-16 rounded-full">
                <Image
                  src="/hero.png"
                  alt="Woman in yellow sweater with shopping bags"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 400px, 600px"
                  priority
                />
              </div>
            </div>

            {/* Decorative Badge */}
            <div className="absolute bottom-8 sm:bottom-16 left-4 sm:left-8 lg:left-16 z-20">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-brand-secondary rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-[10px] sm:text-xs text-white font-bold">
                    NEW
                  </div>
                  <div className="text-[10px] sm:text-xs text-white font-bold">
                    BRAND
                  </div>
                </div>
              </div>
            </div>

            {/* Shopping Bags Floating Element */}
            <div className="absolute top-8 sm:top-12 right-4 sm:right-8 lg:right-16 z-20 animate-bounce">
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-background rounded-full shadow-lg flex items-center justify-center">
                <div className="w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-red-400 to-pink-400 rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional decorative elements */}
      <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 opacity-20">
        <div className="w-6 h-6 sm:w-10 sm:h-10 bg-yellow-400 rounded-full animate-pulse"></div>
      </div>
      <div className="absolute top-8 sm:top-16 right-8 sm:right-20 opacity-20">
        <div className="w-40 h-40 sm:w-80 sm:h-80 bg-yellow-300 rounded-full animate-pulse"></div>
      </div>
      <div className="absolute -bottom-10 sm:-bottom-20 right-1/2 opacity-20">
        <div className="w-40 h-40 sm:w-80 sm:h-80 bg-yellow-300 rounded-full animate-pulse"></div>
      </div>
      <div className="absolute -bottom-5 sm:-bottom-10 right-0 opacity-20">
        <div className="w-36 h-36 sm:w-72 sm:h-72 bg-yellow-200 rounded-full animate-pulse"></div>
      </div>
      <div className="absolute top-16 sm:top-32 left-8 sm:left-16 opacity-20">
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full animate-pulse delay-1000"></div>
      </div>
      <div className="absolute top-24 sm:top-48 right-4 sm:right-8 opacity-20">
        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pink-400 rounded-full animate-pulse delay-500"></div>
      </div>
    </section>
  );
}
