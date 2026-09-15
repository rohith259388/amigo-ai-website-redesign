import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/utils/cn";

type Variant = "primary" | "gradient" | "ghost" | "light" | "outline-light";

const variants: Record<Variant, string> = {
  primary:
    "bg-amigo-dark text-white shadow-[0_10px_30px_-10px_rgba(17,19,24,0.5)] hover:shadow-[0_18px_40px_-12px_rgba(108,43,217,0.55)]",
  gradient:
    "bg-[linear-gradient(120deg,#6C2BD9,#A855F7_55%,#B78EFF)] bg-[length:180%_100%] bg-left hover:bg-right text-white shadow-glow",
  ghost: "glass text-amigo-dark hover:bg-white/90",
  light: "bg-white text-amigo-dark shadow-[0_18px_40px_-14px_rgba(183,142,255,0.6)] hover:shadow-glow-lg",
  "outline-light": "border border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.1]",
};

const sizes = {
  sm: "h-10 px-5 text-[14px]",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-8 text-[16px]",
};

export function MagneticButton({
  children,
  className,
  variant = "primary",
  size = "md",
  href = "#",
  strength = 0.3,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  size?: keyof typeof sizes;
  href?: string;
  strength?: number;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-[-0.01em] transition-[background-position,box-shadow,background-color] duration-500",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {(variant === "primary" || variant === "gradient") && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.18)_50%,transparent_70%)] transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.a>
  );
}
