import { AlignJustify, ListX, MonitorUp, MousePointer2, Repeat2, type LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";
import codesignalLogo from "@/assets/logos/codesignal.svg";
import googlemeetLogo from "@/assets/logos/googlemeet.svg";
import gotomeetingLogo from "@/assets/logos/gotomeeting.svg";
import hackerearthLogo from "@/assets/logos/hackerearth.svg";
import hackerrankLogo from "@/assets/logos/hackerrank.svg";
import microsoftteamsLogo from "@/assets/logos/microsoftteams.svg";
import webexLogo from "@/assets/logos/webex.svg";
import zoomLogo from "@/assets/logos/zoom.svg";
import { Eyebrow } from "./ui/Brand";
import { Reveal, TextReveal } from "./ui/Reveal";

type Card = { n: string; title: string; text: string; Icon: LucideIcon };

type Platform = { name: string; logo: string };

const PLATFORMS: Platform[] = [
  { name: "Zoom", logo: zoomLogo },
  { name: "Microsoft Teams", logo: microsoftteamsLogo },
  { name: "Google Meet", logo: googlemeetLogo },
  { name: "Webex", logo: webexLogo },
  { name: "GoToMeeting", logo: gotomeetingLogo },
  { name: "HackerRank", logo: hackerrankLogo },
  { name: "CodeSignal", logo: codesignalLogo },
  { name: "HackerEarth", logo: hackerearthLogo },
];

const CARDS: Card[] = [
  {
    n: "01",
    title: "Invisible on Screen Share",
    text: "Share your screen while Amigo stays completely invisible to others.",
    Icon: MonitorUp,
  },
  {
    n: "02",
    title: "Invisible in Dock",
    text: "Amigo stays hidden from the Dock, with no icon or activity indicator.",
    Icon: AlignJustify,
  },
  {
    n: "03",
    title: "Invisible in Activity Monitor",
    text: "The process has no visible name or icon in Activity Monitor.",
    Icon: ListX,
  },
  {
    n: "04",
    title: "Invisible to Tab Switching",
    text: "Switch tabs or windows without platforms detecting that you moved away.",
    Icon: Repeat2,
  },
  {
    n: "05",
    title: "Cursor Undetectability",
    text: "Your cursor stays unchanged when hovering, clicking, or adjusting settings.",
    Icon: MousePointer2,
  },
];

export function PrivacySection() {
  return (
    <section className="relative overflow-hidden bg-amigo-surface py-28 lg:py-36">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-amigo-light/20 blur-[150px]" />

      <div className="container-x relative">
        <div className="mx-auto flex max-w-[680px] flex-col items-center text-center">
          <Eyebrow>Privacy</Eyebrow>
          <TextReveal
            className="headline mt-5 text-[clamp(2.4rem,4.8vw,4.25rem)] text-amigo-dark"
            lines={[
              <span key="l1">
                Your 100% <span className="text-gradient">Private</span>
              </span>,
              "Advantage.",
            ]}
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-[520px] text-[17px] leading-relaxed text-amigo-dark/60">
              Get real-time help without distraction or judgment. Completely undetectable, completely yours.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-5">
          {CARDS.map((c, i) => (
            <li key={c.n}>
              <Reveal delay={i * 0.06} className="h-full">
                <div className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-amigo-border bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-amigo-purple/30 hover:shadow-glow">
                  {/* corner wash + faint grid, for depth instead of an empty tile */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-amigo-pale opacity-70 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(108,43,217,0.35),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  <div className="relative flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[linear-gradient(135deg,#6C2BD9,#A855F7)] text-white shadow-[0_10px_22px_-8px_rgba(108,43,217,0.85)] transition-transform duration-300 group-hover:scale-105">
                      <c.Icon size={21} />
                    </span>
                    <span className="text-[12px] font-extrabold tabular-nums tracking-[0.1em] text-amigo-dark/20 transition-colors duration-300 group-hover:text-amigo-purple/40">
                      {c.n}
                    </span>
                  </div>

                  {/* fixed title height keeps every card's body copy on the same baseline */}
                  <h3 className="relative mt-6 min-h-[2.7em] text-[17px] font-bold leading-snug tracking-[-0.015em] text-amigo-dark">
                    {c.title}
                  </h3>
                  <p className="relative mt-1.5 text-[14px] leading-relaxed text-amigo-dark/60">{c.text}</p>

                  <span
                    aria-hidden
                    className="relative mt-auto block h-[3px] w-9 shrink-0 translate-y-2 rounded-full bg-[linear-gradient(90deg,#6C2BD9,#B78EFF)] transition-all duration-500 group-hover:w-full"
                  />
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={0.25}>
          <div className="mx-auto mt-20 max-w-[980px]">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-center">
              <span className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-amigo-dark">
                <MonitorUp size={17} className="text-amigo-purple" />
                Real-time AI assistance across every major platform
              </span>
              <span className="hidden text-amigo-dark/30 sm:inline">·</span>
              <span className="text-[13px] font-medium text-amigo-dark/45">Compatible with the tools you already use</span>
            </div>

            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
              {PLATFORMS.map((p, i) => (
                <li key={p.name}>
                  <Reveal delay={0.3 + i * 0.04} className="h-full">
                    <div className="flex h-full flex-col items-center gap-3 rounded-2xl border border-amigo-border bg-white p-4 text-center shadow-card">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-amigo-pale/60 p-2.5">
                        <img src={p.logo} alt={`${p.name} logo`} className="h-full w-full object-contain" />
                      </span>
                      <span className="text-[13px] font-bold leading-tight text-amigo-dark">{p.name}</span>
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                        <span className={cn("h-1.5 w-1.5 rounded-full bg-emerald-500")} />
                        Verified
                      </span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-center text-[13px] text-amigo-dark/40">
              No plugin, no visible window, no trace — on any of them.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
