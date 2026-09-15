import { motion, useReducedMotion, type MotionValue } from "framer-motion";
import { useId, type CSSProperties } from "react";
import { cn } from "@/utils/cn";

export type BotMood = "happy" | "wink" | "talk" | "focus";

export type BotProps = {
  size?: number;
  className?: string;
  style?: CSSProperties;
  mood?: BotMood;
  lookX?: MotionValue<number>;
  lookY?: MotionValue<number>;
  disc?: boolean;
  blink?: boolean;
  image?: string;
};

/**
 * Amigo — the AI companion. Pure SVG so it can blink, look around and glow.
 */
export function AmigoBot({
  size = 320,
  className,
  style,
  mood = "happy",
  lookX,
  lookY,
  disc = true,
  blink = true,
  image,
}: BotProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = (n: string) => `${uid}-${n}`;
  const url = (n: string) => `url(#${id(n)})`;
  const height = Math.round(size * (340 / 320));
  const fillBox: CSSProperties = { transformBox: "fill-box", transformOrigin: "center" };

  if (image) {
    return (
      <img
        src={image}
        alt="Amigo, your AI companion"
        width={size}
        height={size}
        className={cn("select-none object-contain", className)}
        style={style}
        draggable={false}
      />
    );
  }

  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 320 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("select-none", className)}
      style={{ overflow: "visible", ...style }}
      role="img"
      aria-label="Amigo, your AI companion"
    >
      <defs>
        <linearGradient id={id("white")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E4DDF2" />
        </linearGradient>
        <linearGradient id={id("purple")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C4A1FF" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#6C2BD9" />
        </linearGradient>
        <linearGradient id={id("screen")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#201A2E" />
          <stop offset="100%" stopColor="#09090F" />
        </linearGradient>
        <linearGradient id={id("neon")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F7F1FF" />
          <stop offset="100%" stopColor="#D8B4FE" />
        </linearGradient>
        <radialGradient id={id("disc")} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D8B4FE" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#A855F7" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#6C2BD9" stopOpacity="0" />
        </radialGradient>
        <filter id={id("neonGlow")} x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#EAD9FF" floodOpacity="1" />
          <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor="#A855F7" floodOpacity="0.85" />
        </filter>
        <filter id={id("boltGlow")} x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#A855F7" floodOpacity="0.6" />
        </filter>
        <filter id={id("soft")} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#6C2BD9" floodOpacity="0.22" />
        </filter>
      </defs>

      {disc && (
        <g>
          <ellipse cx="160" cy="324" rx="98" ry="16" fill={url("disc")} className="animate-pulse-soft" style={fillBox} />
          <ellipse cx="160" cy="324" rx="56" ry="5" fill="#EAD9FF" opacity="0.9" filter={url("neonGlow")} />
        </g>
      )}

      {/* arms */}
      <path d="M126 238 L86 194" stroke={url("white")} strokeWidth="24" strokeLinecap="round" />
      <circle cx="82" cy="190" r="15" fill="#FFFFFF" stroke="#E4DDF2" strokeWidth="2" />
      <path d="M194 240 L234 270" stroke={url("white")} strokeWidth="24" strokeLinecap="round" />
      <circle cx="238" cy="274" r="14" fill="#FFFFFF" stroke="#E4DDF2" strokeWidth="2" />

      {/* torso */}
      <rect x="116" y="192" width="88" height="104" rx="40" fill={url("white")} stroke="#E4DDF2" strokeWidth="2" />
      <path
        d="M138 234 H182 A9 9 0 0 1 189.5 248 L167.5 279 A9 9 0 0 1 152.5 279 L130.5 248 A9 9 0 0 1 138 234 Z"
        fill={url("screen")}
      />
      <text
        x="160"
        y="266"
        textAnchor="middle"
        fontSize="24"
        fontWeight="800"
        fill={url("neon")}
        filter={url("neonGlow")}
      >
        A
      </text>

      {/* head */}
      <g transform="rotate(-6 160 122)">
        <g transform="translate(214 -14) rotate(10 22 36)">
          <path d="M26 0 L2 40 H20 L12 74 L44 28 H26 L36 0 Z" fill={url("purple")} filter={url("boltGlow")} />
          <path d="M28 6 L13 33" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />
        </g>

        <rect x="30" y="96" width="28" height="58" rx="14" fill={url("purple")} />
        <rect x="262" y="96" width="28" height="58" rx="14" fill={url("purple")} />
        <rect x="36" y="104" width="7" height="28" rx="3.5" fill="#FFFFFF" opacity="0.35" />
        <rect x="268" y="104" width="7" height="28" rx="3.5" fill="#FFFFFF" opacity="0.35" />

        <rect x="50" y="40" width="220" height="166" rx="68" fill={url("white")} stroke="#E4DDF2" strokeWidth="2" filter={url("soft")} />
        <rect x="72" y="60" width="176" height="122" rx="48" fill={url("screen")} />
        <ellipse cx="118" cy="80" rx="34" ry="8" fill="#FFFFFF" opacity="0.08" transform="rotate(-10 118 80)" />

        <motion.g style={{ x: lookX, y: lookY }}>
          <g className={cn(blink && "animate-blink")} style={fillBox}>
            <circle cx="126" cy="114" r="16" stroke={url("neon")} strokeWidth="7" filter={url("neonGlow")} />
            {mood === "wink" ? (
              <path
                d="M178 118 Q195 100 212 118"
                stroke={url("neon")}
                strokeWidth="7"
                strokeLinecap="round"
                filter={url("neonGlow")}
              />
            ) : (
              <circle
                cx="195"
                cy="114"
                r={mood === "focus" ? 12 : 16}
                stroke={url("neon")}
                strokeWidth="7"
                filter={url("neonGlow")}
              />
            )}
          </g>
          {mood === "talk" ? (
            <ellipse
              cx="161"
              cy="150"
              rx="9"
              ry="6"
              fill={url("neon")}
              filter={url("neonGlow")}
              className="animate-talk"
              style={fillBox}
            />
          ) : (
            <path
              d="M149 146 Q161 158 173 146"
              stroke={url("neon")}
              strokeWidth="6"
              strokeLinecap="round"
              filter={url("neonGlow")}
            />
          )}
        </motion.g>
      </g>
    </svg>
  );
}

/**
 * Floating variant: gentle hover + breathing, separate grounded glow disc.
 */
export function AmigoFloating({
  className,
  amplitude = 12,
  duration = 6,
  glow = true,
  ...bot
}: BotProps & { amplitude?: number; duration?: number; glow?: boolean }) {
  const reduce = useReducedMotion();
  const size = bot.size ?? 320;
  return (
    <div className={cn("relative inline-block", className)} style={{ width: size }}>
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[45%] -z-10 h-[70%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amigo-vivid/30 blur-3xl animate-pulse-soft"
        />
      )}
      <motion.div
        animate={reduce ? undefined : { y: [0, -amplitude, 0], rotate: [-1.2, 1.2, -1.2] }}
        transition={{
          y: { duration, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: duration * 1.7, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <AmigoBot {...bot} size={size} disc={false} />
      </motion.div>
      {/* grounded glow disc */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -translate-x-1/2"
        style={{ bottom: -size * 0.02, width: size * 0.56, height: size * 0.09 }}
        animate={reduce ? undefined : { scaleX: [1, 0.86, 1], opacity: [0.9, 0.6, 0.9] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="h-full w-full rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(216,180,254,0.95),rgba(168,85,247,0.45)_45%,rgba(108,43,217,0)_72%)]" />
        <div className="absolute left-1/2 top-1/2 h-[3px] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EAD9FF] shadow-[0_0_18px_6px_rgba(168,85,247,0.7)]" />
      </motion.div>
    </div>
  );
}
