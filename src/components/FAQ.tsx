import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { EASE } from "@/lib/motion";
import { cn } from "@/utils/cn";
import { Eyebrow } from "./ui/Brand";
import { Reveal, TextReveal } from "./ui/Reveal";

const FAQS = [
  {
    q: "What is Amigo?",
    a: "Amigo is your AI job-search companion. It helps you build a job-ready CV, discover and apply to relevant roles, prepare for interviews, and get real-time help during them — with the option to bring a trusted friend along.",
  },
  {
    q: "How does the Resume Builder work?",
    a: "Paste a job description and Amigo analyses what the role really needs, matches it against your experience, rewrites your sections for that position and shows you an ATS score before you send it.",
  },
  {
    q: "How does Auto Apply work?",
    a: "Auto Apply is coming soon. You set your preferences once; Amigo surfaces roles that fit and drafts applications using your tailored CV. You always review and approve before anything is sent.",
  },
  {
    q: "What is Interview AI?",
    a: "During an interview, Amigo listens alongside your video call, detects questions and suggests answers grounded in your CV — technical, behavioural, coding or role-specific. Everything it shows is private to you.",
  },
  {
    q: "What is Buddy?",
    a: "Buddy lets you invite someone you trust — a friend, mentor or former colleague — into your interview session. They see the questions and can send you hints as text, voice notes or images in real time.",
  },
  {
    q: "Does Amigo work on Windows and Mac?",
    a: "Yes. Amigo runs on both Windows and macOS and works alongside the video tools you already use.",
  },
  {
    q: "How do I get started?",
    a: "Create a free account, tell Amigo about your experience and goals, and build your first tailored CV in minutes. Upgrade whenever the interviews start rolling in.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-white py-28 lg:py-36">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>FAQ</Eyebrow>
          <TextReveal className="headline mt-5 text-[clamp(2.75rem,5.4vw,5rem)] text-amigo-dark" lines={["Questions?", <span key="g" className="text-gradient pr-2">We've got you.</span>]} />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-[380px] text-[17px] leading-relaxed text-amigo-dark/60">
              Can't find what you're looking for? Say hi at{" "}
              <a href="mailto:hello@amigo.app" className="font-semibold text-amigo-purple underline-offset-4 hover:underline">
                hello@amigo.app
              </a>
              .
            </p>
          </Reveal>
        </div>

        <ul className="border-t border-amigo-dark/10">
          {FAQS.map((f, i) => {
            const on = open === i;
            return (
              <li key={f.q} className="border-b border-amigo-dark/10">
                <button
                  type="button"
                  onClick={() => setOpen(on ? null : i)}
                  aria-expanded={on}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left sm:py-7"
                >
                  <span className={cn("text-[20px] font-bold tracking-[-0.02em] transition-colors duration-300 sm:text-[24px]", on ? "text-amigo-purple" : "text-amigo-dark group-hover:text-amigo-purple")}>
                    {f.q}
                  </span>
                  <motion.span
                    animate={{ rotate: on ? 45 : 0, backgroundColor: on ? "#6C2BD9" : "rgba(17,19,24,0.05)", color: on ? "#fff" : "#111318" }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full"
                  >
                    <Plus size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      key="a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ height: { duration: 0.45, ease: EASE }, opacity: { duration: 0.3, delay: on ? 0.1 : 0 } }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[640px] pb-7 text-[16px] leading-relaxed text-amigo-dark/65">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
