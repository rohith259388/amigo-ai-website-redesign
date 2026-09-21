import { NAV_LINKS } from "./Navbar";
import { Logo } from "./ui/Brand";

const SOCIALS = [
  {
    name: "X",
    href: "#",
    path: "M18.9 2H22l-7.4 8.5L23 22h-6.8l-5.3-6.9L4.8 22H1.7l7.9-9.1L1.3 2h7l4.8 6.3L18.9 2Zm-1.2 18h1.9L7.2 3.9H5.2L17.7 20Z",
  },
  {
    name: "LinkedIn",
    href: "#",
    path: "M20.4 2H3.6A1.6 1.6 0 0 0 2 3.6v16.8A1.6 1.6 0 0 0 3.6 22h16.8a1.6 1.6 0 0 0 1.6-1.6V3.6A1.6 1.6 0 0 0 20.4 2ZM8 19H5V9.5h3V19ZM6.5 8.2a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4ZM19 19h-3v-4.6c0-1.1 0-2.5-1.5-2.5S12.7 13 12.7 14.3V19h-3V9.5h2.9v1.3a3.2 3.2 0 0 1 2.9-1.6c3 0 3.6 2 3.6 4.6V19Z",
  },
  {
    name: "Instagram",
    href: "#",
    path: "M12 2.2c3.2 0 3.6 0 4.8.1 3.2.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 4 2.4 7.2 2.3c1.2-.1 1.6-.1 4.8-.1ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.2-9.6a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z",
  },
  {
    name: "YouTube",
    href: "#",
    path: "M23.5 6.5a3 3 0 0 0-2.1-2.1C19.5 4 12 4 12 4s-7.5 0-9.4.4A3 3 0 0 0 .5 6.5 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.5 3 3 0 0 0 2.1 2.1C4.5 20 12 20 12 20s7.5 0 9.4-.4a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.5ZM9.6 15.5v-7l6.2 3.5-6.2 3.5Z",
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-amigo-ink text-white">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(183,142,255,0.4),transparent)]" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-full h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amigo-purple/35 blur-[140px] animate-drift" />
      <div aria-hidden className="pointer-events-none absolute -right-20 bottom-0 h-[260px] w-[260px] rounded-full bg-amigo-vivid/20 blur-[100px] animate-pulse-soft" />

      <div className="container-x relative pb-10 pt-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-[280px] text-[15px] leading-relaxed text-white/55">Your AI job-search companion.</p>
            <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.24em] text-white/30">Practice smarter · Answer better · Crack the job</p>
          </div>
          <div>
            <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/35">Product</div>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[15px] text-white/70 transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/35">Company</div>
            <ul className="mt-4 space-y-2.5">
              {["About", "Contact"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-[15px] text-white/70 transition-colors hover:text-white">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/35">Legal</div>
            <ul className="mt-4 space-y-2.5">
              {["Privacy", "Terms"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-[15px] text-white/70 transition-colors hover:text-white">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-[13px] text-white/40">© {new Date().getFullYear()} Amigo. Small steps. Big future.</p>
          <div className="flex items-center gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                aria-label={s.name}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-white/60 ring-1 ring-white/10 transition-all hover:bg-amigo-purple hover:text-white hover:shadow-glow"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
