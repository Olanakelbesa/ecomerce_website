"use client"

import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Calendar, DollarSign } from "lucide-react"

export function OrdersContent() {
  // Mock orders data
  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "Delivered",
      total: 129.99,
      items: 3,
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      status: "Shipped",
      total: 89.5,
      items: 2,
    },
    {
      id: "ORD-003",
      date: "2024-01-05",
      status: "Processing",
      total: 199.99,
      items: 1,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">My Orders</h1>
          <p className="text-muted-foreground">Track and manage your order history</p>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Order {order.id}</CardTitle>
                  <Badge
                    variant={
                      order.status === "Delivered" ? "default" : order.status === "Shipped" ? "secondary" : "outline"
                    }
                  >
                    {order.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{order.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{order.items} items</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">${order.total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
