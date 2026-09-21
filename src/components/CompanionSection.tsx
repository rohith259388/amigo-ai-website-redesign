import { useEffect, useRef, useState } from "react";
import "./CompanionSection.css";

interface VideoColumn {
  type: "video";
  data: {
    caption: string;
    videoUrl: string;
    thumbnailUrl: string;
  };
}

interface TweetData {
  name: string;
  handle: string;
  avatar: string;
  verified: boolean;
  text: string;
  time: string;
  likes: number;
  repliesText?: string;
  image?: string;
}

interface ReviewData {
  name: string;
  initials: string;
  date: string;
  text: string;
  bg: string;
  fg: string;
}

interface StackedColumn {
  type: "stacked";
  top: TweetData;
  bottom: ReviewData;
}

interface TweetColumn {
  type: "tweet";
  data: TweetData;
}

type Column = VideoColumn | StackedColumn | TweetColumn;

const COLUMNS: Column[] = [
  {
    type: "video",
    data: {
      caption: "Amigo caught the question before I panicked",
      videoUrl: "https://videos.pexels.com/video-files/8496765/8496765-hd_1080_1920_25fps.mp4",
      thumbnailUrl: "https://images.pexels.com/videos/8496765/abstract-adult-art-background-8496765.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630"
    }
  },
  {
    type: "stacked",
    top: {
      name: "Oskar Kuder",
      handle: "@OskarKuder",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
      verified: false,
      text: "🤯 HOLY SHIT, Amigo is an absolute must for calls.\n\nIt's like having the ultimate backup when your brain decides to lag.\n\nIf you've got a call coming up, do yourself a favour and use it.",
      time: "7:36 PM · Aug 24, 2026",
      likes: 1,
      repliesText: "Read more on X"
    },
    bottom: {
      name: "Rahul S.",
      initials: "RS",
      date: "Apr 29, 2025",
      text: "I had no issues during the call. The app was straightforward and easy to use.\n\nIt is well-designed, and there is no need to make any changes to it.",
      bg: "#f5c253",
      fg: "#4d3205"
    }
  },
  {
    type: "video",
    data: {
      caption: "Amigo is a lifesaver for",
      videoUrl: "https://videos.pexels.com/video-files/6965115/6965115-uhd_2160_4096_25fps.mp4",
      thumbnailUrl: "https://images.pexels.com/videos/6965115/pexels-photo-6965115.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630"
    }
  },
  {
    type: "tweet",
    data: {
      name: "Pat Walls",
      handle: "@thepatwalls",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
      verified: true,
      text: "weekend AI project + a few tiktoks = $16K/month business\n\nwe're in the golden age of solopreneurship.\n\nget on the ride!",
      time: "11:06 PM · Jan 7, 2025",
      likes: 981,
      repliesText: "Read 25 replies",
      image: "https://images.pexels.com/photos/34069/pexels-photo.jpg?auto=compress&cs=tinysrgb&fit=crop&h=520&w=800"
    }
  },
  {
    type: "stacked",
    top: {
      name: "Maya Chen",
      handle: "@mayacodes",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80",
      verified: true,
      text: "Used Amigo during a 90-min technical architecture panel today. Zero freeze, zero latency.\n\nFelt like someone handed me cheat codes to my own career.",
      time: "5:12 PM · Feb 19, 2026",
      likes: 428,
      repliesText: "Read more on X"
    },
    bottom: {
      name: "Jane D.",
      initials: "JD",
      date: "Jan 17, 2025",
      text: "If I'm honest, there were absolutely zero faults. It is really a game changer. I've already recommended it to all my friends and family. Thank you for creating such an amazing app!",
      bg: "#9bd43b",
      fg: "#1b3d07"
    }
  },
  {
    type: "video",
    data: {
      caption: "I was super nervous before the call...",
      videoUrl: "https://videos.pexels.com/video-files/6595457/6595457-uhd_2160_3840_30fps.mp4",
      thumbnailUrl: "https://images.pexels.com/videos/6595457/pexels-photo-6595457.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630"
    }
  },
  {
    type: "stacked",
    top: {
      name: "Marcus Sterling",
      handle: "@msterling_dev",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
      verified: false,
      text: "The auto-detect meeting feature is insane. Meeting started on Google Meet, Amigo quietly popped up in the background and handled notes the whole call.",
      time: "2:45 PM · Sep 03, 2026",
      likes: 114,
      repliesText: "Read more on X"
    },
    bottom: {
      name: "Priya M.",
      initials: "PM",
      date: "Feb 8, 2025",
      text: "Hands down one of the best apps I have ever used. Made interviewing enjoyable and stress free and really helps to focus answers and thoughts about what you want to say.",
      bg: "#7db4db",
      fg: "#11314a"
    }
  },
  {
    type: "tweet",
    data: {
      name: "Alex Rivera",
      handle: "@arivera_ai",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=160&q=80",
      verified: true,
      text: "My conversion rate on sales discovery calls went from 18% to 42% after feeding our customer playbooks into Amigo documents.\n\nBest ROI tool this year.",
      time: "9:20 AM · Mar 11, 2026",
      likes: 672,
      repliesText: "Read 18 replies",
      image: "https://images.pexels.com/photos/106344/pexels-photo-106344.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=520&w=800"
    }
  }
];

const ICONS = {
  x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="#1d9bf0"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
  reply: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>',
  mute: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  unmute: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  full: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  env: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  verified: '<svg viewBox="0 0 24 24" fill="#5f8f16"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>'
};

function VideoCard({ data }: { data: VideoColumn['data'] }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div
      className="relative h-[470px] w-[290px] flex-shrink-0 cursor-pointer overflow-hidden rounded-[20px] bg-black shadow-lg outline outline-1 outline-black/8 transition-all hover:-translate-y-1 hover:shadow-2xl"
      onClick={togglePlay}
      role="button"
      tabIndex={0}
    >
      <video
        ref={videoRef}
        src={data.videoUrl}
        poster={data.thumbnailUrl}
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover transition-transform hover:scale-105"
      />
      <button
        className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white/90 backdrop-blur transition hover:bg-black/80"
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        <div dangerouslySetInnerHTML={{ __html: isMuted ? ICONS.mute : ICONS.unmute }} />
      </button>
      <div className={`absolute inset-0 flex items-center justify-center transition-all ${isPlaying ? 'opacity-0 scale-95' : 'opacity-100'}`}>
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/75 text-white backdrop-blur">
          <div dangerouslySetInnerHTML={{ __html: ICONS.play }} />
        </div>
      </div>
      {data.caption && (
        <div className="pointer-events-none absolute bottom-16 left-4 right-4 text-center">
          <span className="inline-block rounded bg-black/30 px-3 py-1 text-sm font-bold text-white drop-shadow backdrop-blur-sm">
            {data.caption}
          </span>
        </div>
      )}
    </div>
  );
}

function TweetCard({ data, compact }: { data: TweetData; compact: boolean }) {
  return (
    <article className={`flex flex-col justify-between rounded-[18px] border border-amigo-border bg-white p-3.5 text-left shadow-sm transition hover:border-amigo-purple/40 hover:shadow-card ${compact ? 'h-56 w-[305px]' : 'h-[470px] w-[305px]'}`}>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={data.avatar}
              alt={data.name}
              className="h-8 w-8 rounded-full object-cover shadow-sm shadow-black/5"
            />
            <div>
              <div className="flex items-center gap-1 text-sm font-bold text-amigo-dark">
                {data.name}
                {data.verified && <div dangerouslySetInnerHTML={{ __html: ICONS.check }} className="h-3.5 w-3.5" />}
              </div>
              <div className="text-xs text-amigo-dark/60">{data.handle} · <span className="cursor-pointer font-semibold text-amigo-purple hover:underline">Follow</span></div>
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: ICONS.x }} className="text-amigo-dark" />
        </div>
        <p className="mt-2 whitespace-pre-line text-sm text-amigo-dark leading-[1.35]" style={{ fontSize: compact ? '12.5px' : '13px' }}>
          {compact ? data.text.split('\n').slice(0, 4).join('\n') : data.text}
        </p>
        {data.image && !compact && (
          <div className="mt-2.5 overflow-hidden rounded-[12px] border border-amigo-border/50 bg-amigo-pale">
            <img src={data.image} alt="Attached media" className="h-36 w-full object-cover" />
          </div>
        )}
      </div>
      <div className="border-t border-amigo-border/50 pt-2">
        <div className="flex items-center justify-between pb-1.5 text-xs text-amigo-dark/60">
          <span>{data.time}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4M12 8h.01"/>
          </svg>
        </div>
        <div className="flex gap-4 border-t border-amigo-border/50 py-1 text-xs font-medium text-amigo-dark/60">
          <button className="flex cursor-pointer items-center gap-1 text-amigo-purple hover:text-amigo-purple transition">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span>{data.likes}</span>
          </button>
          <button className="flex cursor-pointer items-center gap-1 hover:text-amigo-purple transition">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span>Reply</span>
          </button>
        </div>
        <a
          href="https://x.com"
          target="_blank"
          rel="noreferrer"
          className="mt-1.5 block w-full rounded-full border border-amigo-border bg-white py-1 text-center text-[11.5px] font-bold text-amigo-purple transition hover:bg-amigo-purple/5"
        >
          {data.repliesText || "Read more on X"}
        </a>
      </div>
    </article>
  );
}

function ReviewCard({ data }: { data: ReviewData }) {
  return (
    <article className="flex h-56 flex-col justify-between rounded-[18px] border border-amigo-border bg-white p-4 shadow-sm transition hover:border-amigo-purple/40 hover:shadow-card">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold"
              style={{ background: data.bg, color: data.fg }}
            >
              {data.initials}
            </span>
            <div>
              <p className="text-sm font-bold text-amigo-dark">{data.name}</p>
              <p className="text-xs text-amigo-dark/60">{data.date}</p>
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: ICONS.env }} className="text-amigo-dark/60" />
        </div>
        <p className="mt-3 whitespace-pre-line text-xs leading-[1.55] text-amigo-dark/80">
          {data.text}
        </p>
      </div>
      <div className="flex items-center justify-between border-t border-amigo-border/50 pt-2 text-xs text-amigo-dark/60">
        <span className="flex items-center gap-1 font-medium">
          <svg viewBox="0 0 24 24" fill="#5a8f16" className="h-4 w-4">
            <circle cx="12" cy="12" r="10"/>
            <path d="m9 12 2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
          Verified submission
        </span>
        <span className="font-semibold text-amigo-purple">5.0 ★</span>
      </div>
    </article>
  );
}

export function CompanionSection() {
  const zoneRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHeaderVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    const headerEl = document.getElementById("testimonials-header");
    if (headerEl) observer.observe(headerEl);

    return () => {
      if (headerEl) observer.unobserve(headerEl);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (zoneRef.current) {
      const zone = zoneRef.current;
      const distance = 340;

      zone.scrollBy({
        left: direction === 'left' ? -distance : distance,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative overflow-hidden bg-amigo-surface/30 py-14 lg:py-16" id="testimonials">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_30rem_at_12%_-5%,rgba(108,43,217,0.08)_0%,transparent_60%),radial-gradient(50rem_28rem_at_95%_105%,rgba(108,43,217,0.06)_0%,transparent_60%)]" />

      <div className="container-x">
        <div className="text-center" id="testimonials-header">
          <span className={`inline-flex items-center gap-2 rounded-full border border-amigo-purple/25 bg-amigo-purple/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amigo-purple transition-all ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 text-amigo-light"><path d="M12 2.4l2.94 6.02 6.66.63-5.03 4.48 1.48 6.55L12 16.98l-6.05 3.1 1.48-6.55-5.03-4.48 6.66-.63L12 2.4z"/></svg>
            340,000+ five-star reviews
          </span>

          <h2 className={`headline mt-5 text-[clamp(2.25rem,3.6vw,3.25rem)] transition-all ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{transitionDelay: headerVisible ? '0ms' : undefined}}>
            People Trust & <span className="text-gradient">Love</span> Amigo
          </h2>

          <p className={`mx-auto mt-4 max-w-[36rem] text-base text-amigo-dark/60 transition-all ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{transitionDelay: headerVisible ? '300ms' : undefined}}>
            Real people. Real conversations. Real confidence.
          </p>

          <div className={`mt-7 flex flex-wrap items-center justify-center gap-3 transition-all ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{transitionDelay: headerVisible ? '500ms' : undefined}}>
            <div className="flex items-center gap-3 rounded-full border border-amigo-border bg-white p-2 px-4 shadow-sm">
              <div className="flex -space-x-2">
                {[
                  'linear-gradient(135deg, #b78eff 0%, #6c2bd9 100%)',
                  'linear-gradient(135deg, #9b8de8 0%, #5a2bb8 100%)',
                  'linear-gradient(135deg, #d4a5f9 0%, #8b4ac7 100%)',
                  'linear-gradient(135deg, #c494f2 0%, #7c3ab5 100%)',
                  'linear-gradient(135deg, #e0b3fa 0%, #9d52d4 100%)'
                ].map((gradient, i) => (
                  <span
                    key={i}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-[9.5px] font-bold text-white shadow-sm shadow-black/10"
                    style={{ background: gradient }}
                  >
                    {['OK', 'PW', 'RS', 'JD', 'MC'][i]}
                  </span>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-amigo-dark/60">Trusted by <strong className="text-amigo-dark">1.5</strong>M+ people</p>
            </div>
            <div className="hidden h-4 w-px bg-amigo-border sm:block" />
            <div className="flex items-center gap-2.5 rounded-full border border-amigo-border bg-white p-2 px-4 shadow-sm">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-amigo-purple">
                    <path d="M12 2.4l2.94 6.02 6.66.63-5.03 4.48 1.48 6.55L12 16.98l-6.05 3.1 1.48-6.55-5.03-4.48 6.66-.63L12 2.4z"/>
                  </svg>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-amigo-dark/60"><strong className="text-amigo-dark">4.86</strong> from 340K+ reviews</p>
            </div>
          </div>
        </div>

        <div className={`mt-8 transition-opacity ${headerVisible ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: headerVisible ? '1000ms' : undefined}}>
          <div className="marquee-container relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-amigo-surface/30 to-amigo-surface/0" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-amigo-surface/30 to-amigo-surface/0" />

            <div className="absolute inset-0 z-20 flex items-center justify-between px-2">
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full border border-amigo-border bg-white/95 text-amigo-dark shadow-card transition hover:scale-105 hover:bg-white hover:shadow-glow active:scale-95"
                onClick={() => scroll('left')}
                aria-label="Scroll left"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-4 w-4">
                  <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full border border-amigo-border bg-white/95 text-amigo-dark shadow-card transition hover:scale-105 hover:bg-white hover:shadow-glow active:scale-95"
                onClick={() => scroll('right')}
                aria-label="Scroll right"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-4 w-4">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            <div
              ref={zoneRef}
              className="no-scrollbar flex overflow-x-auto scroll-smooth"
            >
              <div
                ref={trackRef}
                className="marquee-scroll flex gap-5 px-4 py-4"
                style={{ width: 'max-content' }}
              >
                {[...COLUMNS, ...COLUMNS].map((col, idx) => (
                  <div key={idx}>
                    {col.type === 'video' && <VideoCard data={col.data} />}
                    {col.type === 'tweet' && <TweetCard data={col.data} compact={false} />}
                    {col.type === 'stacked' && (
                      <div className="flex flex-col gap-3">
                        <TweetCard data={col.top} compact={true} />
                        <ReviewCard data={col.bottom} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-amigo-dark/60">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 text-amigo-purple animate-pulse">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Hover to pause · Click video to play with audio · Drag or use arrows to navigate
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-7">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-amigo-dark/50">Verified across</span>
            <a href="#" className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-amigo-dark/60 transition hover:text-amigo-purple">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5"><path d="M16.36 12.94c.03 3.26 2.86 4.35 2.89 4.36-.02.08-.45 1.55-1.49 3.07-.9 1.31-1.83 2.62-3.3 2.65-1.44.03-1.9-.86-3.55-.86-1.65 0-2.16.83-3.52.89-1.42.05-2.5-1.38-3.4-2.69C2.72 17.98 1.44 13.74 3 10.9c.78-1.39 2.17-2.27 3.68-2.3 1.39-.03 2.7.93 3.55.93.84 0 2.42-1.15 4.08-.98.69.03 2.64.28 3.89 2.13-.1.06-2.33 1.36-2.28 3.69zM13.5 3.85c.75-.91 1.26-2.18 1.12-3.44-1.08.04-2.39.72-3.17 1.63-.7.81-1.31 2.1-1.14 3.34 1.2.1 2.44-.61 3.19-1.53z"/></svg>
              App Store
            </a>
            <a href="#" className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-amigo-dark/60 transition hover:text-amigo-purple">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5"><path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12 3.84 21.85c-.5-.25-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.59.69.59 1.19s-.22.89-.57 1.16l-2.29 1.32-2.5-2.48 2.5-2.48 2.27 1.29zM6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z"/></svg>
              Google Play
            </a>
            <a href="#" className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-amigo-dark/60 transition hover:text-amigo-purple">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5"><rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/><path d="M8.2 8h7.6M12 8v8.5" strokeLinecap="round"/></svg>
              Trustpilot
            </a>
            <a href="#" className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-amigo-dark/60 transition hover:text-amigo-purple">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.3 2.5 3.5 5.4 3.5 8.5s-1.2 6-3.5 8.5c-2.3-2.5-3.5-5.4-3.5-8.5s1.2-6 3.5-8.5z"/></svg>
              SimilarWeb
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
