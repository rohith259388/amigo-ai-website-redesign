import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, Moon, Sparkles, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { EASE, SNAPPY } from "@/lib/motion";
import { cn } from "@/utils/cn";
import amigoMonogram from "@/assets/amigo-monogram.png";
import { AmigoBot } from "./ui/AmigoBot";
import { LiveDot, Logo } from "./ui/Brand";
import { MagneticButton } from "./ui/MagneticButton";

export const NAV_LINKS: { label: string; href: string; highlight?: boolean }[] = [
  { label: "Resume", href: "#resume" },
  { label: "Auto Apply", href: "#auto-apply" },
  { label: "Interview AI", href: "#interview" },
  { label: "Buddy", href: "#buddy" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Questions", href: "#/questions" },
  { label: "Pricing", href: "#pricing" },
  { label: "Creators Wanted", href: "#/creators", highlight: true },
];

export function Navbar({ activeHref }: { activeHref: string | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 32));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [activeHref]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="container-x">
          <nav
            className={cn(
              "mt-3 flex h-[62px] items-center justify-between rounded-full pl-5 pr-2.5 transition-all duration-500 sm:mt-4",
              scrolled && !open ? "glass shadow-card" : "border border-transparent bg-transparent"
            )}
          >
            <a href="#top" aria-label="Amigo — home" className="relative z-10">
              <Logo dark={open} />
            </a>

            <ul className="hidden items-center gap-0.5 xl:flex">
              {NAV_LINKS.map((l) => {
                const isActive = activeHref ? l.href === activeHref : active === l.href.slice(1);
                if (l.highlight) {
                  return (
                    <li key={l.href} className="ml-1">
                      <a
                        href={l.href}
                        className={cn(
                          "group relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[14px] font-semibold ring-1 transition-all duration-300",
                          isActive
                            ? "bg-amigo-purple text-white shadow-glow ring-transparent"
                            : "bg-amigo-pale text-amigo-purple ring-amigo-purple/25 hover:shadow-glow hover:ring-amigo-purple/50"
                        )}
                      >
                        <Sparkles size={14} className="transition-transform duration-300 group-hover:rotate-12" />
                        {l.label}
                        {!isActive && <LiveDot color="#A855F7" className="-mr-0.5" />}
                      </a>
                    </li>
                  );
                }
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className={cn(
                        "relative block rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors duration-300",
                        isActive ? "text-amigo-dark" : "text-amigo-dark/60 hover:text-amigo-dark"
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-amigo-dark/[0.06]"
                          transition={SNAPPY}
                        />
                      )}
                      <span className="relative">{l.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="relative z-10 flex items-center gap-2">
              <ThemeToggle onDark={open} />
              <MagneticButton size="sm" href="#pricing" className="hidden sm:inline-flex">
                Try for free
              </MagneticButton>
              <button
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className={cn(
                  "grid h-11 w-11 place-items-center rounded-full transition-colors xl:hidden",
                  open ? "bg-white/10 text-white" : "glass text-amigo-dark"
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={open ? "x" : "menu"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="grid place-items-center"
                  >
                    {open ? <X size={20} /> : <Menu size={20} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>{open && <MobileMenu onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const origin = "calc(100% - 46px) 52px";
  return (
    <motion.div
      className="fixed inset-0 z-40 overflow-hidden bg-amigo-dark text-white"
      initial={{ clipPath: `circle(0% at ${origin})` }}
      animate={{ clipPath: `circle(160% at ${origin})` }}
      exit={{ clipPath: `circle(0% at ${origin})` }}
      transition={{ duration: 0.75, ease: EASE }}
    >
      <div className="pointer-events-none absolute -right-20 top-1/3 h-[420px] w-[420px] rounded-full bg-amigo-purple/35 blur-[120px]" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-[300px] w-[300px] rounded-full bg-amigo-light/20 blur-[100px]" />
      <div className="container-x flex h-full flex-col pb-8 pt-28">
        <ul>
          {NAV_LINKS.map((l, i) => (
            <motion.li
              key={l.href}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: EASE }}
            >
              <a
                href={l.href}
                onClick={onClose}
                className="flex items-center justify-between border-b border-white/10 py-4 text-[30px] font-extrabold tracking-[-0.03em] sm:text-[36px]"
              >
                {l.highlight ? (
                  <span className="flex items-center gap-3">
                    <span className="text-gradient-light">{l.label}</span>
                    <span className="rounded-full bg-amigo-purple px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
                      Open
                    </span>
                  </span>
                ) : (
                  <span>{l.label}</span>
                )}
                <ArrowUpRight className="text-amigo-light" />
              </a>
            </motion.li>
          ))}
        </ul>
        <motion.div
          className="mt-auto flex items-end justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: EASE }}
        >
          <div>
            <p className="mb-4 text-[14px] text-white/50">Your AI job-search companion.</p>
            <MagneticButton variant="gradient" href="#pricing" onClick={onClose}>
              Try for free
            </MagneticButton>
          </div>
          <AmigoBot size={108} mood="wink" image={amigoMonogram} />
        </motion.div>
      </div>
    </motion.div>
  );
}

function ThemeToggle({ onDark }: { onDark: boolean }) {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className={cn(
        "grid h-11 w-11 place-items-center rounded-full transition-colors",
        onDark ? "bg-white/10 text-white" : "glass text-amigo-dark hover:text-amigo-purple"
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="grid place-items-center"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
