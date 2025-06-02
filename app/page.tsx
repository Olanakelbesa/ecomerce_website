import { LandingHero } from "@/components/landing/LandingHero"
import { LandingFeatures } from "@/components/landing/LandingFeatures"
import { LandingTestimonials } from "@/components/landing/LandingTestimonials"
import { LandingCTA } from "@/components/landing/LandingCTA"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <LandingHero />
      <LandingFeatures />
      <LandingTestimonials />
      <LandingCTA />
    </div>
  )
}
