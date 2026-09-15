import { motion, useInView } from "framer-motion";
import { useRef, type ElementType, type ReactNode } from "react";
import { EASE } from "@/lib/motion";
import { cn } from "@/utils/cn";

export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  amount = 0.3,
  once = true,
  duration = 0.9,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
  once?: boolean;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Line-by-line masked text reveal for headlines.
 */
export function TextReveal({
  lines,
  className,
  as = "h2",
  delay = 0,
  lineClassName,
}: {
  lines: ReactNode[];
  className?: string;
  as?: ElementType;
  delay?: number;
  lineClassName?: string;
}) {
  const Tag = as as ElementType;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: "some" });
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className={cn("block overflow-hidden pb-[0.12em] -mb-[0.12em]", lineClassName)}>
          <motion.span
            className="block"
            initial={{ y: "110%", rotate: 1.5 }}
            animate={inView ? { y: 0, rotate: 0 } : undefined}
            transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.1 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function SectionTitleSize({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("headline text-[clamp(2.5rem,5.6vw,5rem)]", className)}>{children}</span>;
}
