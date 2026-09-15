import { Check } from "lucide-react";
import { MagneticButton } from "./ui/MagneticButton";
import { Reveal, TextReveal } from "./ui/Reveal";

const PERKS = [
  { title: "Fixed monthly pay", text: "Not per view, not per click. The same amount every month." },
  { title: "Nothing to write", text: "You read what is on your screen. No scripting needed." },
];

const CHECKLIST = [
  "Fixed pay every month, not per view",
  "A laptop, a phone, and one person to record",
  "No experience needed, nothing to write",
];

export function CreatorsSection() {
  return (
    <section id="creators" className="relative overflow-hidden bg-white py-28 lg:py-36">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[36px] border border-amigo-border bg-amigo-surface p-6 sm:p-10 lg:p-16">
          <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-amigo-light/25 blur-[120px]" />
          <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-amigo-purple/15 bg-amigo-pale px-4 py-1.5 text-[14px] font-semibold text-amigo-purple">
                <span className="h-1.5 w-1.5 rounded-full bg-amigo-purple" /> For content creators
              </span>
              <TextReveal
                className="headline mt-6 text-[clamp(2.5rem,4.8vw,4.25rem)] text-amigo-dark"
                lines={["Make Videos About Amigo.", <span key="g" className="text-gradient pr-2">Get Paid.</span>]}
              />
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-[480px] text-[19px] leading-relaxed text-amigo-dark/65">
                  Apply even if you've never filmed a video. No face required.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <ul className="mt-10 space-y-6">
                  {PERKS.map((p) => (
                    <li key={p.title} className="flex gap-4">
                      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-amigo-pale text-amigo-purple">
                        <Check size={14} strokeWidth={3} />
                      </span>
                      <div>
                        <div className="text-[17px] font-bold text-amigo-dark">{p.title}</div>
                        <p className="mt-1 text-[15px] leading-relaxed text-amigo-dark/60">{p.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal delay={0.15} y={36}>
              <div className="rounded-[28px] border border-amigo-border bg-white p-7 shadow-card sm:p-10">
                <h3 className="text-[26px] font-bold tracking-[-0.02em] text-amigo-dark">Join the creator program</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-amigo-dark/60">
                  Film one short video and upload it. That is the whole application.
                </p>
                <ul className="mt-8 space-y-4">
                  {CHECKLIST.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[16px] text-amigo-dark/80">
                      <Check size={18} strokeWidth={2.5} className="shrink-0 text-amigo-purple" />
                      {item}
                    </li>
                  ))}
                </ul>
                <MagneticButton
                  href="mailto:hello@amigo.app?subject=Creator%20program%20application"
                  variant="gradient"
                  size="lg"
                  strength={0.1}
                  className="mt-10 w-full"
                >
                  Apply now
                </MagneticButton>
                <p className="mt-5 text-center text-[13px] text-amigo-dark/45">No upfront costs · First video payment guaranteed</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
