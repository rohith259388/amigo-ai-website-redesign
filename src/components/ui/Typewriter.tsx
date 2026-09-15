import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function Typewriter({
  text,
  active,
  speed = 26,
  className,
  cursor = true,
}: {
  text: string;
  active: boolean;
  speed?: number;
  className?: string;
  cursor?: boolean;
}) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
    if (reduce) {
      setCount(text.length);
      return;
    }
    setCount(0);
    let i = 0;
    const t = window.setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) window.clearInterval(t);
    }, speed);
    return () => window.clearInterval(t);
  }, [active, text, speed, reduce]);

  const done = count >= text.length;
  return (
    <span className={className}>
      {text.slice(0, count)}
      {cursor && active && !done && <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-current" />}
    </span>
  );
}
