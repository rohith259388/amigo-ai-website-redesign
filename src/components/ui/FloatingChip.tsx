import { Check } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Avatar, Wave } from "./Brand";

export type ChipVariant = "default" | "live" | "wave" | "avatars" | "check";

export function FloatingChip({
  icon,
  label,
  variant = "default",
  className,
  dark,
  style,
}: {
  icon?: ReactNode;
  label: string;
  variant?: ChipVariant;
  className?: string;
  dark?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
      style={style}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4 text-[13px] font-semibold whitespace-nowrap",
        dark ? "glass-dark text-white shadow-panel" : "glass text-amigo-dark shadow-card",
        className
      )}
    >
      {variant === "avatars" ? (
        <span className="flex -space-x-2">
          <Avatar name="Alex Morgan" size={26} ring />
          <Avatar name="Maya Chen" size={26} ring />
        </span>
      ) : variant === "check" ? (
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[linear-gradient(135deg,#6C2BD9,#B78EFF)] text-white">
          <Check size={14} strokeWidth={3} />
        </span>
      ) : variant === "wave" ? (
        <span className="grid h-7 w-7 place-items-center rounded-full bg-amigo-dark">
          <Wave bars={4} className="h-3" light />
        </span>
      ) : (
        <span
          className={cn(
            "relative grid h-7 w-7 place-items-center rounded-full",
            dark ? "bg-white/10 text-amigo-lilac" : "bg-amigo-pale text-amigo-purple"
          )}
        >
          {icon}
          {variant === "live" && (
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[#22C55E] ring-2 ring-white" />
          )}
        </span>
      )}
      <span>{label}</span>
      {variant === "live" && <span className="ml-0.5 h-1.5 w-1.5 animate-pulse rounded-full bg-amigo-vivid" />}
    </div>
  );
}
