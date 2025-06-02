import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function ProductCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="aspect-square bg-muted rounded-lg mb-4 animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded animate-pulse w-1/3" />
          <div className="h-5 bg-muted rounded animate-pulse" />
          <div className="h-5 bg-muted rounded animate-pulse w-2/3" />
          <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
          <div className="h-6 bg-muted rounded animate-pulse w-1/4" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="h-9 bg-muted rounded animate-pulse w-full" />
      </CardFooter>
    </Card>
  )
}
