"use client"

import { FavoritesContent } from "@/components/favorites/FavoritesContent"
import { withAuth } from "@/lib/auth"

function FavoritesPage() {
  return <FavoritesContent />
}

export default withAuth(FavoritesPage)
