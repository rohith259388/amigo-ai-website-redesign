import { AlignJustify, ListX, MonitorUp, MousePointer2, Repeat2, ShieldCheck, type LucideIcon } from "lucide-react";
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
                <div className="flex h-full flex-col rounded-[24px] border border-amigo-border bg-white p-6 shadow-card">
                  <div className="flex items-center justify-between">
                    <span className="headline text-[26px] text-amigo-dark/15">{c.n}</span>
                  </div>

                  <div className="relative mt-3 grid aspect-square place-items-center overflow-hidden rounded-2xl bg-amigo-pale/50">
                    <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_20%,black,transparent_75%)]" />
                    <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amigo-purple/15 blur-[40px]" />
                    <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-white text-amigo-purple shadow-card">
                      <c.Icon size={24} />
                    </span>
                  </div>

                  <h3 className="mt-5 text-[17px] font-bold tracking-[-0.01em] text-amigo-dark">{c.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-amigo-dark/60">{c.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={0.25}>
          <div className="mx-auto mt-20 max-w-[980px]">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-center">
              <span className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-amigo-dark">
                <ShieldCheck size={17} className="text-emerald-600" />
                Verified invisible on every platform below
              </span>
              <span className="hidden text-amigo-dark/30 sm:inline">·</span>
              <span className="text-[13px] font-medium text-amigo-dark/45">Checked continuously, not once at launch</span>
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
