"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Gift, Bell, Sparkles } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 dark:from-blue-800 dark:via-purple-800 dark:to-blue-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 opacity-20 animate-bounce">
        <Gift className="h-8 w-8" />
      </div>
      <div className="absolute top-20 right-20 opacity-20 animate-pulse">
        <Sparkles className="h-6 w-6" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-20 animate-bounce delay-1000">
        <Bell className="h-10 w-10" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6 mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Mail className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Stay Updated</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold">Get Exclusive Deals & Updates</h2>

            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about new products, special offers, and exclusive
              discounts.
            </p>
          </div>

          <Card className="max-w-md mx-auto bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              {isSubscribed ? (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Thank You!</h3>
                    <p className="text-white/80">You've successfully subscribed to our newsletter.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    />
                    <Button type="submit" className="bg-white text-blue-600 hover:bg-white/90">
                      Subscribe
                    </Button>
                  </div>
                  <p className="text-xs text-white/60">
                    By subscribing, you agree to our Privacy Policy and Terms of Service.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
            <div className="text-center space-y-2">
              <Gift className="h-8 w-8 mx-auto opacity-80" />
              <h3 className="font-semibold">Exclusive Offers</h3>
              <p className="text-sm opacity-80">Get access to subscriber-only deals and discounts</p>
            </div>
            <div className="text-center space-y-2">
              <Bell className="h-8 w-8 mx-auto opacity-80" />
              <h3 className="font-semibold">Early Access</h3>
              <p className="text-sm opacity-80">Be first to shop new collections and sales</p>
            </div>
            <div className="text-center space-y-2">
              <Sparkles className="h-8 w-8 mx-auto opacity-80" />
              <h3 className="font-semibold">Special Content</h3>
              <p className="text-sm opacity-80">Receive style tips and product recommendations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
