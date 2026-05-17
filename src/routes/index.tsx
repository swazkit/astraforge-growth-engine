import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
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
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

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
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#050505]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="text-lg font-extrabold tracking-[0.2em] text-white">
          ASTRAFORGE
        </a>
        <nav className="hidden items-center gap-10 md:flex">
          {["Services", "Work", "Process", "Contact"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              {l}
            </a>
          ))}
        </nav>
        <button className="rounded-md bg-neon px-4 py-2 text-sm font-semibold text-black transition-all duration-300 hover:brightness-110 hover:shadow-neon">
          Book a Call
        </button>
      </div>
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
          className="relative mx-auto flex h-[480px] w-full max-w-[520px] items-center justify-center animate-fade-up [animation-delay:120ms]"
        >
          <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.28),transparent_60%)] blur-3xl" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(57,255,20,0.18),transparent_70%)] animate-pulse-slow" />

          <div
            className="relative z-10 h-[440px] w-[440px] flex items-center justify-center animate-float transition-transform duration-300 ease-out will-change-transform"
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
    title: "AI Strategy",
    desc: "We identify high-impact opportunities and define a clear roadmap aligned to your business goals.",
  },
  {
    Icon: Workflow,
    title: "Workflow Automation",
    desc: "We design and build intelligent automations that streamline operations and eliminate manual work.",
  },
  {
    Icon: Boxes,
    title: "Product Design",
    desc: "Human-centred design for AI products that are intuitive, trustworthy and deliver real value.",
  },
  {
    Icon: CloudUpload,
    title: "Scalable Deployment",
    desc: "Fast, accessible and performant deployments that bring AI experiences to life at scale.",
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
          <a
            href="#process"
            className="group inline-flex items-center gap-2 font-mono-hud text-xs tracking-[0.25em] text-neon"
          >
            SEE OUR PROCESS
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
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
              <a
                href="#"
                className="mt-6 inline-flex items-center gap-1 font-mono-hud text-[11px] tracking-[0.25em] text-neon transition-all group-hover:gap-2"
              >
                LEARN MORE <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ecosystem() {
  const core = [
    { Icon: Headphones, label: "AI Support Desk" },
    { Icon: PenTool, label: "Content Engine" },
    { Icon: Cpu, label: "Custom LLM Setup" },
  ];
  const others = [
    { Icon: ImageIcon, label: "AI Visual Media" },
    { Icon: Globe, label: "Web Excellence" },
    { Icon: Rocket, label: "Growth Automations" },
  ];

  return (
    <section className="border-t border-white/[0.05] bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.08),transparent_70%)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2">
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

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {[
            { title: "CORE SOLUTIONS", items: core },
            { title: "HIGH GROWTH", items: others },
          ].map((col) => (
            <div key={col.title}>
              <p className="font-mono-hud text-[11px] tracking-[0.3em] text-emerald-soft">
                {col.title}
              </p>
              <ul className="mt-5 space-y-1">
                {col.items.map(({ Icon, label }) => (
                  <li
                    key={label}
                    className="group flex items-center justify-between border-b border-white/[0.06] py-4 transition hover:border-[#39FF14]/30"
                  >
                    <span className="text-lg font-semibold text-white">{label}</span>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#39FF14]/25 bg-[#39FF14]/[0.06] transition group-hover:bg-[#39FF14]/15">
                      <Icon className="h-4 w-4 text-neon" />
                    </span>
                  </li>
                ))}
              </ul>
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
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-10 md:p-14">
          <HudCorners />
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
                Ready to
                <br /> build what's
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

function Index() {
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
