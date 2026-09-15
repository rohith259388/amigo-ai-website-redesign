import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { cn } from "@/utils/cn";
import { Bolt } from "./Brand";

export function BoltDivider({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <div className={cn("container-x relative", className)} aria-hidden>
      <div className="relative flex h-12 items-center justify-center">
        <motion.span
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.2, ease: EASE }}
          className={cn(
            "absolute inset-x-0 h-px",
            dark
              ? "bg-[linear-gradient(90deg,transparent,rgba(183,142,255,0.5),transparent)]"
              : "bg-[linear-gradient(90deg,transparent,rgba(108,43,217,0.35),transparent)]"
          )}
        />
        <motion.span
          initial={{ scale: 0, rotate: -30 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.5 }}
          className={cn(
            "relative grid h-10 w-10 place-items-center rounded-full",
            dark ? "bg-amigo-dark ring-1 ring-white/10" : "bg-white shadow-card ring-1 ring-amigo-purple/10"
          )}
        >
          <Bolt className="h-4 w-4" />
        </motion.span>
      </div>
    </div>
  );
}
