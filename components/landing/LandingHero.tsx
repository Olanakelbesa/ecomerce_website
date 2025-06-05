import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-background py-10">
      

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* Left Content */}
          <div className="space-y-8 z-10">
            <div className="space-y-6">
              {/* Trending Badge */}
              <Badge
                className="bg-muted hover:bg-mute  text-muted-foreground text-sm font-medium px-4 py-2 "
              >
                <Zap className="h-4 w-4 mr-2 text-yellow-500" />
                New Collection Available
              </Badge>

              {/* Main Heading */}
               <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-primary">
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

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link href="/auth/signin">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary text-white px-8 py-4 text-lg font-medium group shadow-lg"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary hover:text-primary px-6 py-4 rounded-full font-medium group"
              >
                <div className="flex items-center">Learn More</div>
              </Button>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Yellow Paint Brush Background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-96 lg:w-[500px] lg:h-[500px]">
                {/* Paint brush stroke effect */}
                {/* Removed previous decorative circles */}
              </div>
            </div>

            {/* Model Image */}
            <div className="relative z-10 flex items-center justify-center">
              <div className="relative w-600 h-400 lg:w-[1000px] lg:h-[500px] -right-40 rounded-full">
                <Image
                  src="/hero.png"
                  alt="Woman in yellow sweater with shopping bags"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 320px, 384px"
                  priority
                />
              </div>
            </div>

            {/* Decorative Badge */}
            <div className="absolute bottom-16 left-8 lg:left-16 z-20">
              <div className="w-16 h-16 bg-brand-secondary rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xs text-white font-bold">NEW</div>
                  <div className="text-xs text-white font-bold">
                    BRAND
                  </div>
                </div>
              </div>
            </div>

            {/* Shopping Bags Floating Element */}
            <div className="absolute top-12 right-8 lg:right-16 z-20 animate-bounce">
              <div className="w-12 h-12 bg-background rounded-full shadow-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-gradient-to-r from-red-400 to-pink-400 rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional decorative elements */}
      <div className="absolute bottom-8 left-8 opacity-20">
        <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
      </div>
      <div className="absolute top-16 right-20 opacity-20">
        <div className="w-80 h-80 bg-yellow-300 rounded-full animate-pulse"></div>
      </div>
      <div className="absolute -bottom-20 right-1/2 opacity-20">
        <div className="w-80 h-80 bg-yellow-300 rounded-full animate-pulse"></div>
      </div>
      <div className="absolute -bottom-10 right-0 opacity-20">
        <div className="w-72 h-72 bg-yellow-200 rounded-full animate-pulse"></div>
      </div>
      <div className="absolute top-32 left-16 opacity-20">
        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse delay-1000"></div>
      </div>
      <div className="absolute top-48 right-8 opacity-20">
        <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse delay-500"></div>
      </div>
    </section>
  );
}
