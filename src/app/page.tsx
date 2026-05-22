"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AICoreAnimation } from "@/components/AICoreAnimation";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Workflow,
  Boxes,
  CloudUpload,
  Headphones,
  PenTool,
  Cpu,
  Image as ImageIcon,
  Globe,
  Rocket,
  MapPin,
  Mail,
  Menu,
  X,
  ChevronDown,
  MessageCircle,
  Star,
  Send,
} from "lucide-react";

function HudCorners() {
  const cls = "absolute h-3 w-3 border-[#39FF14]/60";
  return (
    <>
      <span className={`${cls} top-2 left-2 border-t border-l`} />
      <span className={`${cls} top-2 right-2 border-t border-r`} />
      <span className={`${cls} bottom-2 left-2 border-b border-l`} />
      <span className={`${cls} bottom-2 right-2 border-b border-r`} />
    </>
  );
}

function PrimaryButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={`group inline-flex items-center gap-2 rounded-md bg-neon px-5 py-3 text-sm font-semibold uppercase tracking-wider text-black transition-all duration-300 ease-in-out hover:brightness-110 hover:shadow-neon ${className}`}
    >
      <span className="transition-transform duration-300 group-hover:scale-[1.03]">
        {children}
      </span>
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </button>
  );
}

function GhostButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="group inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.02] px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:border-[#39FF14]/50 hover:text-[#39FF14]">
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </button>
  );
}

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={`sticky top-0 z-50 border-b border-white/[0.06] transition-colors duration-300 ${menuOpen ? "bg-[#050505]" : "bg-[#050505]/80 backdrop-blur-md"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="text-lg font-extrabold tracking-[0.2em] text-white">
          ASTRAFORGE
        </a>
        <nav className="hidden items-center gap-10 md:flex">
          {["Services", "Work", "Process", "Contact"].map((l) => (
            <Link
              key={l}
              href={l === "Process" ? "/process" : `#${l.toLowerCase()}`}
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              {l}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <button className="rounded-md bg-neon px-4 py-2 text-sm font-semibold text-black transition-all duration-300 hover:brightness-110 hover:shadow-neon">
            Book a Call
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.02] text-white transition hover:border-[#39FF14]/50 hover:text-[#39FF14] md:hidden"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {menuOpen && (
        <div className="fixed inset-x-0 top-[69px] bottom-0 z-[100] flex flex-col bg-[#050505] md:hidden border-t border-white/[0.06] shadow-[0_10px_50px_rgba(0,0,0,0.8)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(57,255,20,0.06),transparent_60%)]" />
          <nav className="relative z-10 flex flex-col items-center gap-8 py-16 px-6">
            {["Services", "Work", "Process", "Contact"].map((l) => (
              <Link
                key={l}
                href={l === "Process" ? "/process" : `#${l.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="text-xl font-semibold tracking-wider text-zinc-300 transition hover:text-[#39FF14]"
              >
                {l}
              </Link>
            ))}
            <button
              onClick={() => setMenuOpen(false)}
              className="mt-6 w-full max-w-xs rounded-md bg-neon py-4 text-center text-sm font-bold tracking-[0.25em] text-black transition-all duration-300 hover:brightness-110 hover:shadow-neon"
            >
              BOOK A CALL
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const visualRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = visualRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x: px * 18, y: py * 18 });
  };
  const handleMouseLeave = () => setParallax({ x: 0, y: 0 });

  return (
    <section className="relative overflow-hidden grid-bg">
      <div className="pointer-events-none absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(57,255,20,0.18),transparent_70%)] blur-3xl animate-pulse-slow" />
      <div className="pointer-events-none absolute top-1/3 right-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.12),transparent_70%)] blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#39FF14] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
            </span>
            <p className="font-mono-hud text-[10px] tracking-[0.3em] text-emerald-soft">
              STRATEGY . DESIGN . ENGINEERING.
            </p>
          </div>

          <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
            AI Systems for
            <br />
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#39FF14] via-[#7CFF6A] to-[#39FF14] bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer">
                Ambitious Growth.
              </span>
              <span className="absolute -bottom-2 left-0 h-1 w-full origin-left scale-x-0 animate-grow-x bg-gradient-to-r from-[#39FF14] to-transparent" />
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-300">
            We bridge the gap between complex AI and real-world impact. Automate your
            operations, scale your content, and dominate your market with custom-engineered
            AI solutions.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <PrimaryButton>Book a Free Audit</PrimaryButton>
            <GhostButton>View Our Work</GhostButton>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/[0.06] pt-6">
            {[
              ["120+", "Systems Shipped"],
              ["48h", "Avg Audit Turnaround"],
              ["SOC2", "Aligned Practices"],
            ].map(([k, v]) => (
              <div key={v} className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-neon">{k}</span>
                <span className="font-mono-hud text-[10px] tracking-[0.25em] text-zinc-400">
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={visualRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative mx-auto flex h-[320px] xs:h-[400px] sm:h-[480px] w-full max-w-[520px] items-center justify-center animate-fade-up [animation-delay:120ms]"
        >
          <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.28),transparent_60%)] blur-3xl" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[220px] w-[220px] xs:h-[280px] xs:w-[280px] sm:h-[320px] sm:w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(57,255,20,0.18),transparent_70%)] animate-pulse-slow" />

          <div
            className="relative z-10 h-[280px] w-[280px] xs:h-[360px] xs:w-[360px] sm:h-[440px] sm:w-[440px] flex items-center justify-center animate-float transition-transform duration-300 ease-out will-change-transform"
            style={{
              transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
            }}
          >
            <AICoreAnimation />
          </div>
        </div>
      </div>
    </section>
  );
}

const capabilities = [
  {
    Icon: Sparkles,
    title: "AI Strategy & Architecture",
    desc: "We audit your existing business workflows, identify your costliest bottlenecks, and map out a high-impact AI implementation roadmap designed for immediate ROI.",
  },
  {
    Icon: Workflow,
    title: "Intelligent Workflow Automation",
    desc: "We design, build, and connect custom backend engines that eliminate manual data entry, streamline multi-app communication, and handle your heavy operational lifting 24/7.",
  },
  {
    Icon: Boxes,
    title: "System Integration & Design",
    desc: "We bridge the gap between complex AI logic and your team's day-to-day operations. We build clean, intuitive interfaces and data flows that your staff can trust and use effortlessly.",
  },
  {
    Icon: CloudUpload,
    title: "Secure, Scalable Deployment",
    desc: "We deploy enterprise-grade automations using cloud-infrastructure and secure API pipelines. Your data remains entirely yours—built to scale as your transaction volume grows.",
  },
];

function Capabilities() {
  return (
    <section id="services" className="border-t border-white/[0.05]">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono-hud text-xs tracking-[0.3em] text-emerald-soft">
              ▪ CAPABILITIES
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Strategy to Shipped Products
            </h2>
            <p className="mt-3 max-w-lg text-zinc-300">
              Engineering efficiency through the power of Large Language Models and custom
              automation flows.
            </p>
          </div>
          <Link
            href="/process"
            className="group inline-flex items-center gap-2 font-mono-hud text-xs tracking-[0.25em] text-neon"
          >
            SEE OUR PROCESS
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-xl glass-card p-6 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-[#39FF14]/30"
            >
              <HudCorners />
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#39FF14]/30 bg-[#39FF14]/10">
                <Icon className="h-5 w-5 text-neon" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{desc}</p>
              <Link
                href="/process"
                className="mt-6 inline-flex items-center gap-1 font-mono-hud text-[11px] tracking-[0.25em] text-neon transition-all group-hover:gap-2"
              >
                LEARN MORE <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface ServiceItem {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  desc: string;
  bullets: string[];
}

function ServiceAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: ServiceItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { Icon, label, desc, bullets } = item;

  return (
    <div
      className={`group rounded-xl transition-all duration-300 border ${
        isOpen
          ? "border-[#39FF14]/15 bg-gradient-to-b from-[#39FF14]/[0.02] to-[transparent]"
          : "border-white/[0.04] bg-white/[0.01] hover:border-white/[0.1] hover:bg-white/[0.02]"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left focus:outline-none cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <div
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border transition-all duration-300 ${
              isOpen
                ? "border-[#39FF14]/25 bg-[#39FF14]/0.08 text-neon"
                : "border-white/10 bg-white/[0.03] text-zinc-400 group-hover:border-[#39FF14]/20 group-hover:text-neon group-hover:bg-[#39FF14]/5"
            }`}
          >
            <Icon className="h-5 w-5" />
          </div>
          <span
            className={`text-base font-semibold tracking-wide transition-colors duration-300 ${
              isOpen ? "text-neon" : "text-zinc-200 group-hover:text-white"
            }`}
          >
            {label}
          </span>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-zinc-500 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-neon" : "group-hover:text-zinc-300"
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 pt-1 border-t border-white/[0.03] mt-1">
            <p className="text-sm leading-relaxed text-zinc-400 font-normal mb-4">
              {desc}
            </p>
            <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neon" />
                  <span className="leading-tight">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Ecosystem() {
  const [activeItem, setActiveItem] = useState<{ [key: string]: string | null }>({
    "CORE WORKFLOW AUTOMATIONS": "AI-Driven Customer Support Desk",
  });

  const handleToggle = (colTitle: string, label: string) => {
    setActiveItem((prev) => ({
      ...prev,
      [colTitle]: prev[colTitle] === label ? null : label,
    }));
  };

  const core = [
    {
      Icon: Headphones,
      label: "AI-Driven Customer Support Desk",
      desc: "Deploy autonomous customer support systems that resolve up to 80% of common queries instantly. Integrates with Zendesk, Intercom, and custom CRM platforms.",
      bullets: [
        "Instant response times 24/7",
        "Semantic search on knowledge bases",
        "Automated ticketing & escalation",
        "Sentiment analysis & reporting",
      ],
    },
    {
      Icon: PenTool,
      label: "Hyper-Personalized Content & Research Assistant",
      desc: "Accelerate your content production and research pipelines. Build AI agents that scrape deep web sources, extract intelligence, and generate brand-aligned assets.",
      bullets: [
        "Real-time market intelligence scraping",
        "Automated SEO optimization",
        "Multilingual tone tuning",
        "Automated citation verification",
      ],
    },
    {
      Icon: Cpu,
      label: "Custom Automation Setup",
      desc: "Connect your entire software stack with custom LLM middleware. Streamline processes between your CRM, marketing channels, and internal databases.",
      bullets: [
        "Custom APIs & webhooks",
        "Vector database design",
        "Background task processors",
        "End-to-end security compliance",
      ],
    },
  ];

  const others = [
    {
      Icon: ImageIcon,
      label: "AI-Generated UGC & Marketing Ad Creatives",
      desc: "Generate hyper-converting image and video assets at scale. Iterate fast on thousands of creative variations tailored to TikTok, Instagram, and YouTube.",
      bullets: [
        "Script-to-video generation",
        "Realistic voice synthesis",
        "Creative variation A/B tests",
        "Dynamic copy & thumbnails",
      ],
    },
    {
      Icon: MessageCircle,
      label: "Intelligent Website Chatbots",
      desc: "Convert website visitors into qualified leads. Conversational assistants that guide users, answer technical questions, and book sales calls.",
      bullets: [
        "Interactive qualification flows",
        "Cal.com / Calendly sync",
        "Floating chat widgets",
        "Live conversation logs",
      ],
    },
    {
      Icon: Globe,
      label: "AI-Powered Websites & \"Website in a Day\"",
      desc: "Launch modern Next.js/React web applications optimized for speed, design, and search engine visibility. Embedded with interactive AI features.",
      bullets: [
        "Stunning custom CSS themes",
        "Server-Side Rendering (SSR)",
        "SEO-ready layouts & semantics",
        "Interactive product demos",
      ],
    },
    {
      Icon: Star,
      label: "Automated Review Funnels",
      desc: "Systematically collect reviews, direct happy customers to Google/Trustpilot, and capture constructive feedback internally before it hits public boards.",
      bullets: [
        "SMS & email review campaigns",
        "Smart routing by rating",
        "Analytical tracking dashboard",
        "Shopify & Stripe integration",
      ],
    },
    {
      Icon: Send,
      label: "Newsletter & Social Content Engines",
      desc: "Automate your organic social growth. Auto-generate LinkedIn carousels, Twitter/X threads, and weekly newsletter drafts based on your recent work.",
      bullets: [
        "Automated newsletter compiles",
        "Social post generation",
        "Image asset synthesis",
        "Performance tracking & metrics",
      ],
    },
  ];

  const columns = [
    { title: "CORE WORKFLOW AUTOMATIONS", items: core },
    { title: "AUTOMATED GROWTH & MEDIA SERVICES", items: others },
  ];

  return (
    <section className="border-t border-white/[0.05] bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.08),transparent_70%)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1fr_2fr]">
        <div>
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            Advanced
            <br /> Service
            <br /> Ecosystem
          </h2>
          <p className="mt-6 max-w-md text-zinc-300">
            Our specialized squads focus on core business transformation and high-growth
            media tools.
          </p>
          <div className="relative mt-8 inline-block rounded-lg border border-[#39FF14]/25 bg-[#39FF14]/[0.04] px-6 py-5">
            <HudCorners />
            <p className="font-mono-hud text-[10px] tracking-[0.3em] text-emerald-soft">
              ● ACTIVE NODES
            </p>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-white">94.2%</span>
              <span className="font-mono-hud text-[10px] tracking-[0.25em] text-zinc-400">
                AVG EFFICIENCY GAIN
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-5">
              <p className="font-mono-hud text-[11px] tracking-[0.3em] text-emerald-soft mb-2">
                {col.title}
              </p>
              <div className="flex flex-col gap-4">
                {col.items.map((item) => (
                  <ServiceAccordionItem
                    key={item.label}
                    item={item}
                    isOpen={activeItem[col.title] === item.label}
                    onToggle={() => handleToggle(col.title, item.label)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Impact() {
  const stats = [
    { v: "$10M+", l: "COST SAVINGS DELIVERED" },
    { v: "3.5x", l: "AVERAGE ROI" },
    { v: "78%", l: "MANUAL EFFORT REDUCED" },
  ];
  const logos = ["NEXORA", "VERITY", "KITE AI", "LATTICE", "ATHALON", "NEXO"];
  return (
    <section className="border-t border-white/[0.05]">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 text-center sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.l}>
              <p className="text-5xl font-bold text-neon drop-shadow-[0_0_20px_rgba(57,255,20,0.35)] sm:text-6xl">
                {s.v}
              </p>
              <p className="mt-3 font-mono-hud text-[11px] tracking-[0.3em] text-zinc-400">
                {s.l}
              </p>
            </div>
          ))}
        </div>

        <div className="relative mt-16 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex w-max animate-marquee gap-20">
            {[...logos, ...logos].map((l, i) => (
              <span
                key={i}
                className="whitespace-nowrap text-2xl font-bold tracking-[0.15em] text-zinc-600/80"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="border-t border-white/[0.05]">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-6 sm:p-10 md:p-14">
          <HudCorners />
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
                Ready to
                <br /> build what&apos;s
                <br /> next?
              </h2>
              <p className="mt-6 max-w-md text-zinc-300">
                Tell us about your goals. Our team of specialists will get back to you
                within 1 business day.
              </p>
              <div className="mt-8 space-y-3 text-sm text-zinc-300">
                <p className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-neon" />
                  San Francisco, CA // Worldwide by design
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-neon" />
                  hello@astraforge.ai
                </p>
              </div>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="rounded-xl border border-white/[0.06] bg-black/40 p-8 backdrop-blur-md"
            >
              <Field label="FULL NAME" placeholder="John Doe" />
              <Field label="COMPANY NAME" placeholder="Acme Corp" className="mt-6" />
              <div className="mt-6">
                <label className="font-mono-hud text-[10px] tracking-[0.3em] text-zinc-400">
                  MAIN BOTTLENECK
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your current challenge…"
                  className="input-dark mt-2 w-full rounded-md px-3 py-3 text-sm placeholder:text-zinc-500"
                />
              </div>
              <button
                type="submit"
                className="mt-8 w-full rounded-md bg-neon py-4 text-sm font-bold tracking-[0.25em] text-black transition-all duration-300 hover:brightness-110 hover:shadow-neon"
              >
                SEND ENQUIRY
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  placeholder,
  className = "",
}: {
  label: string;
  placeholder: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="font-mono-hud text-[10px] tracking-[0.3em] text-zinc-400">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="input-dark mt-2 w-full rounded-md px-3 py-3 text-sm placeholder:text-zinc-500"
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.05]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between">
        <p className="font-extrabold tracking-[0.2em] text-white">ASTRAFORGE</p>
        <div className="flex flex-wrap items-center gap-6">
          {["Privacy", "Terms", "Security", "LinkedIn"].map((l) => (
            <a key={l} href="#" className="transition hover:text-white">
              {l}
            </a>
          ))}
        </div>
        <p className="text-xs text-zinc-500">
          © 2025 Astraforge AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Nav />
      <Hero />
      <Capabilities />
      <Ecosystem />
      <Impact />
      <Contact />
      <Footer />
    </main>
  );
}
