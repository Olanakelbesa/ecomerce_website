export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image skeleton */}
        <div className="aspect-square bg-muted rounded-lg animate-pulse" />

        {/* Content skeleton */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded animate-pulse w-1/4" />
            <div className="h-8 bg-muted rounded animate-pulse w-3/4" />
            <div className="h-6 bg-muted rounded animate-pulse w-1/2" />
            <div className="h-10 bg-muted rounded animate-pulse w-1/3" />
          </div>

          <div className="space-y-2">
            <div className="h-6 bg-muted rounded animate-pulse w-1/4" />
            <div className="h-4 bg-muted rounded animate-pulse w-full" />
            <div className="h-4 bg-muted rounded animate-pulse w-full" />
            <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
          </div>

          <div className="h-12 bg-muted rounded animate-pulse w-48" />
        </div>
      </div>
    </div>
  )
}
