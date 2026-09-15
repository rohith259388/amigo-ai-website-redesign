import { useId, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import amigoMonogram from "@/assets/amigo-monogram.png";

/* ---------- Amigo monogram (brand signature) ---------- */
export function Bolt({
  className,
  style,
}: {
  className?: string;
  solid?: string;
  style?: CSSProperties;
}) {
  return (
    <img
      src={amigoMonogram}
      alt=""
      className={cn("h-5 w-5 object-contain", className)}
      style={style}
      aria-hidden
    />
  );
}

/* ---------- Wordmark ---------- */
export function Logo({ dark, className, compact }: { dark?: boolean; className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 leading-none", className)}>
      <span
        className={cn(
          "font-extrabold tracking-[-0.06em]",
          compact ? "text-[20px]" : "text-[22px]",
          dark ? "text-white" : "text-amigo-dark"
        )}
      >
        AMIGO
      </span>
      <Bolt className={cn("-mt-1", compact ? "h-4 w-4" : "h-5 w-5")} />
    </span>
  );
}

/* ---------- Avatar (initials, deterministic gradient) ---------- */
const PALETTES = [
  "linear-gradient(135deg,#6C2BD9,#B78EFF)",
  "linear-gradient(135deg,#F59E0B,#F97316)",
  "linear-gradient(135deg,#0EA5E9,#6366F1)",
  "linear-gradient(135deg,#10B981,#34D399)",
  "linear-gradient(135deg,#EC4899,#A855F7)",
];

export function Avatar({
  name,
  size = 32,
  className,
  ring,
}: {
  name: string;
  size?: number;
  className?: string;
  ring?: boolean;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const idx = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % PALETTES.length;
  return (
    <span
      className={cn(
        "inline-grid shrink-0 place-items-center rounded-full font-bold text-white",
        ring && "ring-2 ring-white",
        className
      )}
      style={{ width: size, height: size, fontSize: size * 0.36, background: PALETTES[idx] }}
      aria-label={name}
    >
      {initials}
    </span>
  );
}

/* ---------- Audio waveform ---------- */
export function Wave({
  bars = 5,
  className,
  light,
  active = true,
}: {
  bars?: number;
  className?: string;
  light?: boolean;
  active?: boolean;
}) {
  return (
    <span className={cn("inline-flex h-4 items-center gap-[3px]", className)} aria-hidden>
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "block w-[3px] rounded-full",
            light ? "bg-amigo-lilac" : "bg-amigo-purple",
            active && "animate-wave"
          )}
          style={{
            height: "100%",
            animationDelay: `${i * 0.12}s`,
            animationDuration: `${0.9 + (i % 3) * 0.2}s`,
            transform: active ? undefined : "scaleY(0.3)",
          }}
        />
      ))}
    </span>
  );
}

/* ---------- Eyebrow label ---------- */
export function Eyebrow({
  children,
  tone = "purple",
  className,
}: {
  children: ReactNode;
  tone?: "purple" | "light" | "muted";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "eyebrow",
        tone === "purple" && "text-amigo-purple",
        tone === "light" && "text-amigo-light",
        tone === "muted" && "text-amigo-dark/50",
        className
      )}
    >
      <Bolt className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}

/* ---------- Live dot ---------- */
export function LiveDot({ className, color = "#22C55E" }: { className?: string; color?: string }) {
  return (
    <span className={cn("relative inline-flex h-2 w-2", className)} aria-hidden>
      <span className="absolute inset-0 rounded-full animate-ping-soft" style={{ background: color }} />
      <span className="relative h-2 w-2 rounded-full" style={{ background: color }} />
    </span>
  );
}

/* ---------- Progress ring ---------- */
export function Ring({
  value,
  size = 44,
  stroke = 4,
  className,
  showLabel = true,
  trackOpacity = 0.15,
}: {
  value: number;
  size?: number;
  stroke?: number;
  className?: string;
  showLabel?: boolean;
  trackOpacity?: number;
}) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={cn("shrink-0", className)}>
      <defs>
        <linearGradient id={`ring-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#B78EFF" />
          <stop offset="1" stopColor="#6C2BD9" />
        </linearGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={r} stroke="currentColor" strokeOpacity={trackOpacity} strokeWidth={stroke} fill="none" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={`url(#ring-${id})`}
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c - (c * Math.max(0, Math.min(100, value))) / 100}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)" }}
      />
      {showLabel && (
        <text
          x="50%"
          y="52%"
          dominantBaseline="central"
          textAnchor="middle"
          fontSize={size * 0.3}
          fontWeight="800"
          fill="currentColor"
        >
          {Math.round(value)}
        </text>
      )}
    </svg>
  );
}
