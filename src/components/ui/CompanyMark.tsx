import { COMPANY_COLORS } from "@/data/questions";
import { cn } from "@/utils/cn";

/**
 * Monogram tile standing in for a company logo — brand colour plus the initial.
 */
export function CompanyMark({ name, size = 30, className }: { name: string; size?: number; className?: string }) {
  const color = COMPANY_COLORS[name] ?? "#6C2BD9";
  return (
    <span
      aria-hidden
      className={cn("inline-grid shrink-0 place-items-center font-extrabold text-white", className)}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.48,
        borderRadius: size * 0.28,
        background: `linear-gradient(140deg, ${color}, ${color}cc)`,
        boxShadow: `0 6px 16px -8px ${color}`,
      }}
    >
      {name[0]}
    </span>
  );
}
