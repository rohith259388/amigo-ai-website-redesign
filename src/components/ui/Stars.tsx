import { Star } from "lucide-react";
import { cn } from "@/utils/cn";

export function Stars({ rating, size = 14, className }: { rating: number; size?: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} role="img" aria-label={`${rating.toFixed(1)} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={0}
          className={i < Math.round(rating) ? "fill-amigo-purple" : "fill-amigo-dark/15"}
        />
      ))}
    </span>
  );
}
