import { motion } from "framer-motion";
import { Check, Image as ImageIcon, Mic, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { Avatar, Bolt, LiveDot, Ring, Wave } from "@/components/ui/Brand";
import { fadeUp, growX, popIn, scaleIn, slideRight, stagger } from "@/lib/motion";
import { cn } from "@/utils/cn";

type VisualProps = { active?: boolean; className?: string };

const CARD_SHADOW = "shadow-[0_30px_80px_-30px_rgba(108,43,217,0.65)]";

function Frame({ children, className, active = true }: { children: ReactNode; className?: string; active?: boolean }) {
  return (
    <motion.div
      variants={stagger(0.07)}
      initial="hidden"
      animate={active ? "show" : "hidden"}
      className={cn("relative w-full max-w-[340px]", className)}
    >
      {children}
    </motion.div>
  );
}

const Line = ({ w = "100%", className }: { w?: string; className?: string }) => (
  <motion.div
    variants={growX}
    style={{ width: w, transformOrigin: "left" }}
    className={cn("h-1.5 rounded-full bg-amigo-dark/10", className)}
  />
);

const Label = ({ children, light }: { children: ReactNode; light?: boolean }) => (
  <div className={cn("text-[9px] font-bold uppercase tracking-[0.18em]", light ? "text-white/45" : "text-amigo-dark/40")}>
    {children}
  </div>
);

/* ---------------- RESUME ---------------- */
export function ResumeVisual({ active = true, className }: VisualProps) {
  return (
    <Frame active={active} className={className}>
      <motion.div variants={scaleIn} className={cn("rounded-2xl bg-white p-5 text-amigo-dark", CARD_SHADOW)}>
        <div className="flex items-center gap-3">
          <Avatar name="Alex Morgan" size={38} />
          <div className="leading-tight">
            <div className="text-[14px] font-bold">Alex Morgan</div>
            <div className="text-[11px] text-amigo-dark/50">Senior Java Developer</div>
          </div>
          <span className="ml-auto rounded-full bg-amigo-pale px-2 py-0.5 text-[10px] font-bold text-amigo-purple">TAILORED</span>
        </div>
        <div className="mt-4 space-y-2">
          <Label>Summary</Label>
          <Line />
          <Line w="92%" className="bg-[linear-gradient(90deg,#B78EFF,#D8B4FE)]" />
          <Line w="70%" />
        </div>
        <div className="mt-4">
          <Label>Skills</Label>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["Java", "Spring Boot", "Microservices", "AWS", "Kafka"].map((s, i) => (
              <motion.span
                key={s}
                variants={popIn}
                className={cn(
                  "rounded-md px-2 py-1 text-[10px] font-semibold",
                  i < 3 ? "bg-amigo-purple text-white" : "bg-amigo-pale text-amigo-purple"
                )}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <Label>Experience</Label>
          <Line />
          <Line w="84%" className="bg-[linear-gradient(90deg,#B78EFF,#D8B4FE)]" />
          <Line w="58%" />
        </div>
      </motion.div>

      <motion.div
        variants={popIn}
        className="glass-dark shadow-panel absolute -right-3 -top-4 flex items-center gap-2 rounded-2xl px-3 py-2 text-white"
      >
        <Ring value={active ? 92 : 0} size={38} stroke={4} className="text-white" />
        <div className="leading-tight">
          <div className="text-[10px] text-white/50">ATS score</div>
          <div className="text-[13px] font-bold">Excellent</div>
        </div>
      </motion.div>

      <motion.div
        variants={slideRight}
        className="absolute -left-3 bottom-8 flex items-center gap-1.5 rounded-full bg-amigo-dark px-3 py-1.5 text-[11px] font-semibold text-white ring-1 ring-white/10"
      >
        <Bolt className="h-3 w-3" /> Tailored for Nexa Labs
      </motion.div>
    </Frame>
  );
}

/* ---------------- JOBS ---------------- */
const JOBS = [
  { title: "Software Engineer", co: "Nexa Labs", loc: "Berlin · Hybrid", match: 94 },
  { title: "Frontend Developer", co: "Lumen", loc: "Remote", match: 91 },
  { title: "AI Engineer", co: "Orbital", loc: "Amsterdam", match: 89 },
];

export function JobsVisual({ active = true, className }: VisualProps) {
  return (
    <Frame active={active} className={className}>
      <motion.div variants={fadeUp} className="mb-3 flex items-center gap-2 text-[11px] font-semibold text-amigo-lilac">
        <Bolt className="h-3.5 w-3.5" /> Matched to your profile
      </motion.div>
      <div className="space-y-2.5">
        {JOBS.map((j, i) => (
          <motion.div
            key={j.title}
            variants={popIn}
            style={{ marginLeft: i * 10 }}
            className={cn(
              "glass-dark flex items-center gap-3 rounded-2xl p-3.5 text-white",
              i === 0 && "border-amigo-light/50 shadow-glow"
            )}
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10 text-[13px] font-bold">{j.co[0]}</span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-bold">{j.title}</div>
              <div className="truncate text-[11px] text-white/50">
                {j.co} · {j.loc}
              </div>
            </div>
            <span className="rounded-full bg-amigo-purple/30 px-2 py-1 text-[11px] font-bold text-amigo-lilac ring-1 ring-amigo-light/30">
              {j.match}%
            </span>
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

/* ---------------- PREPARE ---------------- */
export function PrepareVisual({ active = true, className }: VisualProps) {
  return (
    <Frame active={active} className={className}>
      <motion.div variants={scaleIn} className="absolute inset-x-5 -top-3 bottom-3 rounded-2xl bg-white/5 ring-1 ring-white/10" />
      <motion.div variants={scaleIn} className={cn("relative rounded-2xl bg-white p-5 text-amigo-dark", CARD_SHADOW)}>
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.16em] text-amigo-dark/45">
          <span>Behavioural · Q3 of 10</span>
          <span className="flex items-center gap-1.5 text-amigo-purple">
            <LiveDot color="#A855F7" /> 01:30
          </span>
        </div>
        <motion.p variants={fadeUp} className="mt-3 text-[16px] font-bold leading-snug tracking-tight">
          “Tell me about a time you led a project under pressure.”
        </motion.p>
        <div className="mt-4 grid grid-cols-4 gap-1.5">
          {["Situation", "Task", "Action", "Result"].map((s, i) => (
            <motion.div
              key={s}
              variants={popIn}
              className={cn(
                "rounded-lg px-1 py-1.5 text-center text-[10px] font-semibold",
                i < 2 ? "bg-amigo-purple text-white" : "bg-amigo-pale text-amigo-purple"
              )}
            >
              {s}
            </motion.div>
          ))}
        </div>
        <motion.div
          variants={fadeUp}
          className="mt-4 flex items-start gap-2 rounded-xl bg-amigo-surface p-2.5 text-[11.5px] leading-snug text-amigo-dark/70"
        >
          <Sparkles size={14} className="mt-0.5 shrink-0 text-amigo-purple" />
          <span>
            <b className="text-amigo-dark">Amigo tip:</b> quantify the outcome — “shipped two weeks early”.
          </span>
        </motion.div>
      </motion.div>
    </Frame>
  );
}

/* ---------------- INTERVIEW ---------------- */
export function InterviewVisual({
  active = true,
  className,
  phase = "assist",
}: VisualProps & { phase?: "listen" | "assist" }) {
  return (
    <Frame active={active} className={className}>
      <motion.div variants={scaleIn} className="glass-dark shadow-panel rounded-2xl p-4 text-white">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[linear-gradient(135deg,#6C2BD9,#B78EFF)]">
            <Bolt solid="#fff" className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <div className="text-[13px] font-bold">Amigo</div>
            <div className="text-[10px] text-amigo-lilac/80">{phase === "listen" ? "Listening" : "Assisting"}</div>
          </div>
          <Wave className="ml-auto h-3.5" light bars={5} active={active} />
        </div>
        {phase === "listen" ? (
          <motion.div variants={fadeUp} className="mt-4 rounded-xl bg-white/5 p-3 text-[12px] leading-relaxed text-white/65 ring-1 ring-white/10">
            Ready. I’ll surface help the moment a question comes in — nobody else sees it.
          </motion.div>
        ) : (
          <>
            <motion.div variants={fadeUp} className="mt-4 rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
              <Label light>Question detected</Label>
              <div className="mt-1 text-[13px] font-semibold">“Explain your experience with Java.”</div>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="mt-2.5 rounded-xl bg-[linear-gradient(135deg,rgba(108,43,217,0.4),rgba(183,142,255,0.12))] p-3 ring-1 ring-amigo-light/30"
            >
              <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-amigo-lilac">
                <Sparkles size={11} /> Suggested answer
              </div>
              <div className="mt-1.5 text-[12px] leading-relaxed text-white/85">
                Based on your CV: 4 years building Spring Boot microservices at Nexa — lead with the monolith migration and the 40% faster deploys.
              </div>
            </motion.div>
          </>
        )}
      </motion.div>
    </Frame>
  );
}

/* ---------------- BUDDY ---------------- */
export function BuddyVisual({ active = true, className }: VisualProps) {
  return (
    <Frame active={active} className={className}>
      <div className="relative flex items-center justify-between px-4">
        <motion.div variants={popIn} className="flex flex-col items-center gap-2">
          <Avatar name="Alex Morgan" size={56} className="ring-4 ring-white/10" />
          <span className="text-[11px] font-semibold text-white/70">You</span>
        </motion.div>
        <div className="relative mx-4 mb-6 h-px flex-1 bg-white/10">
          <motion.div
            variants={growX}
            style={{ transformOrigin: "left" }}
            className="absolute inset-0 bg-[linear-gradient(90deg,#6C2BD9,#B78EFF)]"
          />
          <motion.span
            variants={popIn}
            className="absolute left-1/2 top-1/2 grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-amigo-dark shadow-glow ring-1 ring-amigo-light/40"
          >
            <Bolt className="h-3.5 w-3.5" />
          </motion.span>
        </div>
        <motion.div variants={popIn} className="flex flex-col items-center gap-2">
          <Avatar name="Maya Chen" size={56} className="ring-4 ring-amigo-light/40" />
          <span className="text-[11px] font-semibold text-white/70">Maya · Buddy</span>
        </motion.div>
      </div>
      <motion.div
        variants={fadeUp}
        className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white ring-1 ring-white/10"
      >
        <LiveDot /> Your Buddy joined
      </motion.div>
      <motion.div variants={popIn} className={cn("mt-3 rounded-2xl rounded-tr-sm bg-white p-3.5 text-amigo-dark", CARD_SHADOW)}>
        <div className="text-[10px] font-bold text-amigo-purple">Maya</div>
        <p className="mt-0.5 text-[12.5px] leading-relaxed">
          Mention the migration project — it fits this question perfectly. You’ve got this 💜
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-amigo-pale px-2.5 py-1 text-[10px] font-semibold text-amigo-purple">
            <Mic size={11} /> 0:08
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-amigo-pale px-2.5 py-1 text-[10px] font-semibold text-amigo-purple">
            <ImageIcon size={11} /> diagram.png
          </span>
        </div>
      </motion.div>
    </Frame>
  );
}

/* ---------------- PROFILE ---------------- */
export function ProfileVisual({ active = true, className }: VisualProps) {
  return (
    <Frame active={active} className={className}>
      <motion.div variants={scaleIn} className={cn("rounded-2xl bg-white p-5 text-amigo-dark", CARD_SHADOW)}>
        <div className="flex items-center gap-3">
          <Avatar name="Alex Morgan" size={44} />
          <div className="leading-tight">
            <div className="text-[14px] font-bold">Alex Morgan</div>
            <div className="text-[11px] text-amigo-dark/50">alex@amigo.app</div>
          </div>
          <Ring value={active ? 100 : 0} size={40} className="ml-auto text-amigo-purple" />
        </div>
        <div className="mt-4 space-y-2">
          {[
            ["Target role", "Senior Java Developer"],
            ["Location", "Berlin · Remote"],
            ["Experience", "4 years"],
          ].map(([k, v]) => (
            <motion.div
              key={k}
              variants={slideRight}
              className="flex items-center justify-between rounded-xl bg-amigo-surface px-3 py-2 text-[12px]"
            >
              <span className="text-amigo-dark/50">{k}</span>
              <span className="font-semibold">{v}</span>
            </motion.div>
          ))}
        </div>
        <motion.div variants={fadeUp} className="mt-3 flex items-center gap-2 text-[11px] font-semibold text-emerald-600">
          <Check size={14} strokeWidth={3} /> Profile complete — Amigo knows your story.
        </motion.div>
      </motion.div>
    </Frame>
  );
}

/* ---------------- APPLICATIONS ---------------- */
export function ApplicationsVisual({ active = true, className }: VisualProps) {
  const cols = [
    { name: "Applied", items: ["Lumen", "Orbital", "Vantage"] },
    { name: "Interview", items: ["Nexa Labs", "Northwind"] },
    { name: "Offer", items: ["Nexa Labs"] },
  ];
  return (
    <Frame active={active} className={className}>
      <div className="grid grid-cols-3 gap-2">
        {cols.map((c, ci) => (
          <div key={c.name}>
            <motion.div
              variants={fadeUp}
              className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.14em] text-white/50"
            >
              <span>{c.name}</span>
              <span>{c.items.length}</span>
            </motion.div>
            <div className="space-y-2">
              {c.items.map((it) => (
                <motion.div
                  key={it}
                  variants={popIn}
                  className={cn(
                    "glass-dark rounded-xl px-2.5 py-2 text-[11px] font-semibold text-white",
                    ci === 2 && "border-amigo-light/50 bg-amigo-purple/30 shadow-glow"
                  )}
                >
                  {it}
                  {ci === 2 && <span className="mt-1 block text-[9px] font-medium text-amigo-lilac">🎉 Offer received</span>}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}
