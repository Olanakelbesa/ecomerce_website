import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-gray-50 dark:bg-gray-900 py-16 lg:py-24">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 text-8xl font-bold text-gray-200 dark:text-gray-800 opacity-50">
        05
      </div>
      <div className="absolute bottom-20 right-32 text-6xl font-bold text-gray-200 dark:text-gray-800 opacity-50">
        01
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* Left Content */}
          <div className="space-y-8 z-10">
            <div className="space-y-6">
              {/* Trending Badge */}
              <Badge
                variant="secondary"
                className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 text-sm font-medium px-4 py-2"
              >
                <Zap className="h-4 w-4 mr-2 text-yellow-500" />
                TRENDING COLLECTION
              </Badge>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900 dark:text-white">
                Explore Winter
                <br />
                <span className="text-gray-900 dark:text-white">
                  Collection
                </span>
              </h1>

              {/* Description */}
              <div className="max-w-md">
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  We Design Pieces Of Furniture And Object That Perfectly
                  <br />
                  Gap Between Functionality And Beauty.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link href="/auth/signin">
                <Button
                  size="lg"
                  className="bg-[#2A6DB4] hover:bg-primary text-white px-8 py-4 text-lg font-medium group shadow-lg"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Button
                size="lg"
                variant="outline"
                className="border-2 hover:bg-[#2A6DB4] border-primary-400 text-gray-900 px-6 py-4 rounded-full font-medium group"
              >
                <div className="flex items-center">
                  
                  Learn More
                </div>
              </Button>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Yellow Paint Brush Background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-96 lg:w-[500px] lg:h-[500px]">
                {/* Paint brush stroke effect */}
                <div className="relative w-full h-full">
                  {/* <div className="absolute inset-0 bg-yellow-400 rounded-full transform rotate-12 scale-110 opacity-90"></div> */}
                  <div className="absolute top-4 -right-8 w-32 h-24 bg-blue-400 rounded-full transform rotate-45 opacity-80"></div>
                  <div className="absolute -bottom-4 -left-8 w-24 h-32 bg-blue-400 rounded-full transform -rotate-12 opacity-80"></div>
                  <div className="absolute top-1/2 -right-12 w-16 h-16 bg-blue-500 rounded-full opacity-70"></div>
                </div>
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
              <div className="w-16 h-16 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xs text-white dark:text-gray-900 font-bold">
                    NEW
                  </div>
                  <div className="text-xs text-white dark:text-gray-900 font-bold">
                    SEASON
                  </div>
                </div>
              </div>
            </div>

            {/* Shopping Bags Floating Element */}
            <div className="absolute top-12 right-8 lg:right-16 z-20 animate-bounce">
              <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center">
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
      <div className="absolute top-32 left-16 opacity-20">
        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse delay-1000"></div>
      </div>
      <div className="absolute top-48 right-8 opacity-20">
        <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse delay-500"></div>
      </div>
    </section>
  );
}
