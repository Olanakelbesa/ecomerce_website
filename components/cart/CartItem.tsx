"use client"

import Image from "next/image"
import type { CartItem as CartItemType } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus, Trash2 } from "lucide-react"

interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (quantity: number) => void
  onRemove: () => void
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="relative h-20 w-20 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-contain rounded-lg"
              sizes="80px"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold truncate">{item.title}</h3>
            <p className="text-xl font-bold mt-1">${item.price.toFixed(2)}</p>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateQuantity(item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center font-semibold">{item.quantity}</span>
            <Button variant="outline" size="sm" onClick={() => onUpdateQuantity(item.quantity + 1)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-right">
            <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 mt-1"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
