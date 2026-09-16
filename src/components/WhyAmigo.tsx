import { FileText, MessagesSquare, Send, Target, type LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";
import { Eyebrow } from "./ui/Brand";
import { Reveal, TextReveal } from "./ui/Reveal";

type Benefit = {
  n: string;
  title: string;
  text: string;
  detail: string;
  Icon: LucideIcon;
  span: string;
  dark?: boolean;
  videoUrl?: string;
};

const BENEFITS: Benefit[] = [
  {
    n: "01",
    title: "Build smarter",
    text: "Create CVs tailored to the role.",
    detail: "Every application gets a resume shaped for that job — the right keywords, structure and story.",
    Icon: FileText,
    span: "lg:col-span-4",
    dark: true,
    videoUrl: "/videos/resume-building-typing.mp4",
  },
  {
    n: "02",
    title: "Apply faster",
    text: "Spend less time searching.",
    detail: "Amigo surfaces roles that genuinely fit and drafts applications you approve in one look.",
    Icon: Send,
    span: "lg:col-span-2",
    videoUrl: "/videos/job-searching-scrolling.mp4",
  },
  {
    n: "03",
    title: "Prepare better",
    text: "Practice with role-specific guidance.",
    detail: "Rehearse the questions this company actually asks, with feedback that adapts to you.",
    Icon: Target,
    span: "lg:col-span-2",
    videoUrl: "/videos/interview-prep-thinking.mp4",
  },
  {
    n: "04",
    title: "Interview with confidence",
    text: "Get assistance when you need it.",
    detail: "Real-time suggestions from Amigo — and a Buddy who has your back when it matters most.",
    Icon: MessagesSquare,
    span: "lg:col-span-4",
    videoUrl: "/videos/interview-confidence-talking.mp4",
  },
];

export function WhyAmigo() {
  return (
    <section className="relative overflow-hidden bg-white py-28 lg:py-36">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-amigo-light/15 blur-[150px]" />

      <div className="container-x relative">
        <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
          <Eyebrow>Why Amigo</Eyebrow>
          <TextReveal
            className="headline mt-5 text-[clamp(2.6rem,5.4vw,5rem)] text-amigo-dark"
            lines={["One Companion.", <span key="g" className="text-gradient pr-2">Your Entire Job Search.</span>]}
          />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-[520px] text-[17px] leading-relaxed text-amigo-dark/60">
              Four ways Amigo changes how the search feels — from the first draft to the final answer.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-4 lg:mt-16 lg:grid-cols-6 lg:gap-5">
          {BENEFITS.map((b, i) => (
            <li key={b.n} className={b.span}>
              <Reveal delay={i * 0.08} className="h-full">
                <div
                  className={cn(
                    "relative flex h-full flex-col overflow-hidden rounded-[28px] border p-7 transition-all duration-300 sm:p-9",
                    b.dark
                      ? "border-white/10 bg-amigo-dark text-white shadow-glow-lg"
                      : "border-amigo-border bg-white shadow-card hover:-translate-y-1 hover:border-amigo-light/60 hover:shadow-glow"
                  )}
                >
                  {b.dark && (
                    <>
                      <div aria-hidden className="grid-lines-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_20%,black,transparent_70%)]" />
                      <div aria-hidden className="pointer-events-none absolute -right-20 -top-24 h-[320px] w-[320px] rounded-full bg-amigo-purple/40 blur-[110px]" />
                    </>
                  )}

                  <div className="relative flex items-center justify-between">
                    <span
                      className={cn(
                        "grid h-12 w-12 place-items-center rounded-2xl z-10 relative",
                        b.dark ? "bg-white/10 text-amigo-light" : "bg-amigo-pale text-amigo-purple"
                      )}
                    >
                      <b.Icon size={22} />
                    </span>
                    <span className={cn("text-[12px] font-bold tracking-[0.24em] z-10 relative", b.dark ? "text-white/35" : "text-amigo-dark/25")}>
                      {b.n}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <h3
                      className={cn(
                        "relative mt-7 text-[26px] font-extrabold tracking-[-0.03em] sm:text-[30px]",
                        b.dark ? "text-white" : "text-amigo-dark"
                      )}
                    >
                      {b.title}
                    </h3>
                    <p className={cn("relative mt-2 text-[17px] font-semibold", b.dark ? "text-amigo-light" : "text-amigo-purple")}>
                      {b.text}
                    </p>
                    <p className={cn("relative mt-4 max-w-[460px] text-[15px] leading-relaxed", b.dark ? "text-white/60" : "text-amigo-dark/60")}>
                      {b.detail}
                    </p>
                  </div>

                  {b.videoUrl && (
                    <div 
                      className="absolute right-0 bottom-0 top-0 w-[60%] opacity-30 pointer-events-none overflow-hidden"
                      style={{ WebkitMaskImage: "linear-gradient(to left, black 20%, transparent)" }}
                    >
                      <video
                        src={b.videoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
