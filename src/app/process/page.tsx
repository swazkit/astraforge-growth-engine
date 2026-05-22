"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Search,
  Code,
  Terminal,
  Activity,
  CheckCircle2,
  Sparkles,
  Cpu,
  Layers,
  Globe,
  Menu,
  X,
} from "lucide-react";

function HudCorners() {
  return (
    <>
      <div className="absolute top-0 left-0 h-2 w-2 border-t-2 border-l-2 border-[#39FF14]/40" />
      <div className="absolute top-0 right-0 h-2 w-2 border-t-2 border-r-2 border-[#39FF14]/40" />
      <div className="absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 border-[#39FF14]/40" />
      <div className="absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2 border-[#39FF14]/40" />
    </>
  );
}

// Mouse-reactive parallax stars
function ParallaxStars() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse positions (-0.5 to 0.5)
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setCoords({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep background stars */}
      <div
        className="absolute inset-0 opacity-30 transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${coords.x * 20}px, ${coords.y * 20}px)`,
          backgroundImage: "radial-gradient(1.5px 1.5px at 20px 30px, #fff, transparent), radial-gradient(1px 1px at 75px 140px, #fff, transparent), radial-gradient(2px 2px at 150px 80px, #39FF14, transparent), radial-gradient(1px 1px at 250px 200px, #fff, transparent)",
          backgroundSize: "300px 300px",
        }}
      />
      {/* Mid background stars */}
      <div
        className="absolute inset-0 opacity-40 transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${coords.x * -45}px, ${coords.y * -45}px)`,
          backgroundImage: "radial-gradient(2px 2px at 40px 80px, #39FF14, transparent), radial-gradient(1.5px 1.5px at 120px 220px, #fff, transparent), radial-gradient(1px 1px at 200px 50px, #fff, transparent), radial-gradient(2.5px 2.5px at 280px 170px, #39FF14, transparent)",
          backgroundSize: "200px 200px",
        }}
      />
    </div>
  );
}

// Mouse glow effect
function MouseGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(57, 255, 20, 0.03), transparent 80%)`,
      }}
    />
  );
}

// Scroll-Reveal component
function ScrollReveal({
  children,
  animationClass = "animate-fade-in-up",
}: {
  children: React.ReactNode;
  animationClass?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-300 ${
        isVisible ? animationClass : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

export default function ProcessPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // Creative visualizations for steps
  const steps = [
    {
      num: "01",
      title: "Discovery & System Audit",
      subtitle: "Map Bottlenecks & Audit Operational Waste",
      icon: Search,
      desc: "Our architects map out your current business pipelines, identifying manual bottlenecks, repetitive work, and system inefficiencies.",
      bullets: [
        "Interactive shadow session audits",
        "Cost-waste and system-friction scoring",
        "API capability & data silo mapping",
        "Initial ROI and efficiency projection",
      ],
      viz: (
        <div className="relative h-64 w-full rounded-xl border border-white/5 bg-black/40 flex items-center justify-center overflow-hidden">
          <HudCorners />
          <div className="absolute inset-0 grid-bg opacity-40" />
          
          {/* Animated Scanning Circle */}
          <div className="relative h-44 w-44 rounded-full border border-zinc-800 flex items-center justify-center">
            <div className="absolute inset-2 rounded-full border border-dashed border-[#39FF14]/30 animate-spin-slow" />
            <div className="absolute inset-6 rounded-full border border-[#39FF14]/10" />
            <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-[#39FF14] animate-spin" />
            
            {/* Inner nodes */}
            <div className="relative z-10 flex flex-col items-center justify-center font-mono-hud text-[10px] text-zinc-400">
              <span className="text-[#39FF14] animate-pulse">AUDITING</span>
              <span className="mt-1 font-bold">14 active nodes</span>
            </div>

            {/* Orbiting data points */}
            <div className="absolute top-4 left-4 h-3.5 w-3.5 rounded-full border border-[#39FF14]/40 bg-[#39FF14]/10 flex items-center justify-center">
              <span className="h-1.5 w-1.5 rounded-full bg-[#39FF14]" />
            </div>
            <div className="absolute bottom-8 right-3 h-3 w-3 rounded-full border border-red-500/40 bg-red-500/10 flex items-center justify-center animate-ping">
              <span className="h-1 w-1 rounded-full bg-red-500" />
            </div>
          </div>

          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between font-mono-hud text-[9px] text-zinc-500 border-t border-white/5 pt-2">
            <span>AUDIT STATUS: ACTIVE</span>
            <span className="text-[#39FF14]">84% WASTE LOCATED</span>
          </div>
        </div>
      ),
    },
    {
      num: "02",
      title: "Strategy & Architecture",
      subtitle: "Custom Engineering Blueprints",
      icon: Cpu,
      desc: "We plan a tailored system topology combining AI, database architectures, and middleware layers, ready for implementation.",
      bullets: [
        "Custom LLM & agent orchestration blueprints",
        "Security, permissions & governance models",
        "Tech stack selection (Next.js, Python, Supabase)",
        "Fixed-scope cost and schedule estimates",
      ],
      viz: (
        <div className="relative h-64 w-full rounded-xl border border-white/5 bg-black/40 flex items-center justify-center overflow-hidden">
          <HudCorners />
          <div className="absolute inset-0 grid-bg opacity-40" />

          {/* Connected Topology Diagram */}
          <div className="relative w-72 flex flex-col gap-6 items-center">
            {/* Input Node */}
            <div className="flex items-center gap-12">
              <div className="px-3 py-1.5 rounded border border-white/10 bg-white/[0.02] font-mono-hud text-[10px] text-zinc-300">
                USER CLIENT
              </div>
              <div className="px-3 py-1.5 rounded border border-[#39FF14]/30 bg-[#39FF14]/5 font-mono-hud text-[10px] text-[#39FF14]">
                LLM AGENT
              </div>
            </div>

            {/* Connecting lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minHeight: "150px" }}>
              <path d="M 60 25 L 210 25 L 210 120" fill="none" stroke="#39FF14" strokeWidth="1" strokeDasharray="4 4" className="animate-[marquee_15s_linear_infinite]" />
              <path d="M 210 25 L 140 85" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            </svg>

            {/* Middleware / Vector DB Node */}
            <div className="flex items-center gap-8">
              <div className="px-3 py-1.5 rounded border border-white/10 bg-white/[0.02] font-mono-hud text-[10px] text-zinc-300">
                VECTOR DATA
              </div>
              <div className="px-3 py-1.5 rounded border border-white/10 bg-white/[0.02] font-mono-hud text-[10px] text-zinc-300">
                EXTERNAL API
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between font-mono-hud text-[9px] text-zinc-500 border-t border-white/5 pt-2">
            <span>MODEL: HYBRID-LLM</span>
            <span>TOKEN COST OPTIMIZED: 65%</span>
          </div>
        </div>
      ),
    },
    {
      num: "03",
      title: "Build & Integration",
      subtitle: "High-Speed Software Engineering",
      icon: Code,
      desc: "Our engineering squad develops the automation workflows, integrates custom agents with your databases, and creates the client interface.",
      bullets: [
        "Next.js web systems & backend pipeline design",
        "Database integration and caching architecture",
        "Interactive visual playground & dashboard builds",
        "Rigorous prompt validation & edge-case checks",
      ],
      viz: (
        <div className="relative h-64 w-full rounded-xl border border-white/5 bg-black/40 flex flex-col justify-between p-4 overflow-hidden">
          <HudCorners />
          
          {/* Mock Console compilation */}
          <div className="flex items-center gap-2 border-b border-white/5 pb-2">
            <Terminal className="h-4 w-4 text-neon" />
            <span className="font-mono-hud text-[10px] text-zinc-400">ASTRA_ENGINE_CONSOLE v1.0.4</span>
          </div>

          <div className="flex-1 font-mono-hud text-[10px] text-zinc-500 mt-2 space-y-1 overflow-hidden select-none">
            <p className="text-[#39FF14]">&gt; npm run build:systems</p>
            <p className="text-zinc-400">⚡ compiling model integrations...</p>
            <p className="text-zinc-500">✓ connection pool established (350ms)</p>
            <p className="text-[#39FF14]/70">✓ pipeline loaded: support-escalation.yaml</p>
            <p className="text-zinc-500">✓ semantic cache matching enabled</p>
            <p className="text-zinc-400 font-semibold animate-pulse">&gt; running latency audits [9ms avg]</p>
          </div>

          <div className="flex items-center justify-between font-mono-hud text-[9px] text-zinc-500 border-t border-white/5 pt-2">
            <span>COMPILED SUCCESS</span>
            <span className="text-[#39FF14]">98.6% TEST COVERAGE</span>
          </div>
        </div>
      ),
    },
    {
      num: "04",
      title: "Deployment & Scaling",
      subtitle: "Production Release & Analytics",
      icon: Activity,
      desc: "We deploy the systems, train your team, and continuously monitor efficiency parameters to fine-tune system triggers.",
      bullets: [
        "Cloud hosting orchestration & security setups",
        "Real-time usage tracking & model feedback loops",
        "Workflow triggering optimizations",
        "Weekly status reports & model updates",
      ],
      viz: (
        <div className="relative h-64 w-full rounded-xl border border-white/5 bg-black/40 flex items-center justify-center overflow-hidden">
          <HudCorners />
          <div className="absolute inset-0 grid-bg opacity-40" />

          {/* Pulse/Efficiency Graph */}
          <div className="relative w-full px-8 flex flex-col gap-5">
            <div className="flex justify-between items-baseline font-mono-hud">
              <span className="text-xs text-zinc-400">SYSTEM HEALTH</span>
              <span className="text-lg font-bold text-neon animate-pulse">99.98% UPTIME</span>
            </div>
            
            {/* Animated Graph Wave */}
            <div className="h-16 w-full flex items-end gap-1.5">
              {[35, 45, 55, 40, 60, 85, 75, 90, 80, 85, 95, 100, 90, 85, 95].map((val, idx) => (
                <div
                  key={idx}
                  className="flex-1 bg-gradient-to-t from-[#39FF14]/5 to-[#39FF14]/40 border border-[#39FF14]/30 rounded-t"
                  style={{
                    height: `${val}%`,
                    animation: `pulse-slow 3s ease-in-out infinite`,
                    animationDelay: `${idx * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between font-mono-hud text-[9px] text-zinc-500 border-t border-white/5 pt-2">
            <span>NODES: AUTO-SCALE ACTIVE</span>
            <span>ERRORS: 0.00%</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-[#39FF14]/30 selection:text-[#39FF14] overflow-x-hidden font-sans">
      {/* Background Interactive Elements */}
      <ParallaxStars />
      <MouseGlow />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      {/* Top Navigation */}
      <header className={`sticky top-0 z-50 border-b border-white/[0.06] transition-colors duration-300 ${menuOpen ? "bg-[#050505]" : "bg-[#050505]/80 backdrop-blur-md"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-extrabold tracking-[0.2em] text-white flex items-center gap-2">
            <span className="text-neon">■</span> ASTRAFORGE
          </Link>
          <nav className="hidden items-center gap-10 md:flex">
            <Link href="/#services" className="text-sm text-zinc-400 transition hover:text-white">Services</Link>
            <Link href="/#work" className="text-sm text-zinc-400 transition hover:text-white">Work</Link>
            <Link href="/process" className="text-sm text-white font-semibold">Process</Link>
            <Link href="/#contact" className="text-sm text-zinc-400 transition hover:text-white">Contact</Link>
          </nav>
          <div className="hidden md:block">
            <Link href="/#contact" className="rounded-md bg-neon px-4 py-2 text-sm font-semibold text-black transition-all duration-300 hover:brightness-110 hover:shadow-neon">
              Book a Call
            </Link>
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
          <div className="fixed inset-x-0 top-[69px] bottom-0 z-[100] flex flex-col bg-[#050505] md:hidden border-t border-white/[0.06] shadow-[0_10px_50px_rgba(0,0,0,0.8)] animate-fade-in-up">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(57,255,20,0.06),transparent_60%)]" />
            <nav className="relative z-10 flex flex-col items-center gap-8 py-16 px-6">
              <Link href="/#services" onClick={() => setMenuOpen(false)} className="text-xl font-semibold tracking-wider text-zinc-300 transition hover:text-[#39FF14]">Services</Link>
              <Link href="/#work" onClick={() => setMenuOpen(false)} className="text-xl font-semibold tracking-wider text-zinc-300 transition hover:text-[#39FF14]">Work</Link>
              <Link href="/process" onClick={() => setMenuOpen(false)} className="text-xl font-semibold tracking-wider text-[#39FF14]">Process</Link>
              <Link href="/#contact" onClick={() => setMenuOpen(false)} className="text-xl font-semibold tracking-wider text-zinc-300 transition hover:text-[#39FF14]">Contact</Link>
              <Link
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-6 w-full max-w-xs rounded-md bg-neon py-4 text-center text-sm font-bold tracking-[0.25em] text-black transition-all duration-300 hover:brightness-110 hover:shadow-neon"
              >
                BOOK A CALL
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-24 pb-20 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 border border-[#39FF14]/20 bg-[#39FF14]/5 rounded-full px-4 py-1.5 text-xs text-neon font-mono-hud tracking-[0.15em] mb-8 animate-fade-up">
          <Sparkles className="h-3.5 w-3.5" /> SHAPING INTELLIGENT SYSTEM ECOSYSTEMS
        </div>
        
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl leading-[1.1] animate-fade-up">
          Our Architectural <br />
          <span className="text-neon bg-gradient-to-r from-neon via-emerald-soft to-neon bg-clip-text text-transparent">Engineering Process</span>
        </h1>
        
        <p className="mt-8 max-w-2xl text-zinc-300 text-lg sm:text-xl leading-relaxed animate-fade-up">
          From initial blueprint mapping to high-velocity system orchestration, learn how we engineer high-impact AI models custom fitted for your operations.
        </p>

        <div className="mt-10 flex gap-4 animate-fade-up">
          <a
            href="#timeline"
            className="group inline-flex items-center gap-2 rounded-md bg-neon px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110 hover:shadow-neon"
          >
            Explore Process Timeline
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.02] px-6 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-white/[0.05] hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </div>
      </section>

      {/* Interactive Timeline Area */}
      <section id="timeline" className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-white/[0.05]">
        <div className="relative">
          {/* Vertical pipeline line - centered on desktop, left on mobile */}
          <div className="timeline-line hidden md:block" />
          
          <div className="space-y-32">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              const isEven = idx % 2 === 0;

              return (
                <div key={idx} className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  
                  {/* Timeline node marker - desktop only */}
                  <div className="hidden md:block timeline-dot top-8" />

                  {/* Left Side Content */}
                  <div className={`flex flex-col gap-4 ${isEven ? "md:order-1 md:pr-12" : "md:order-2 md:pl-12"}`}>
                    <ScrollReveal animationClass={isEven ? "animate-fade-in-left" : "animate-fade-in-right"}>
                      <div className="flex items-center gap-4">
                        <span className="font-mono-hud text-3xl font-extrabold text-neon">{step.num}</span>
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-neon/40 to-transparent" />
                      </div>

                      <h2 className="text-3xl font-bold tracking-tight text-white mt-4">{step.title}</h2>
                      <p className="font-mono-hud text-[11px] tracking-[0.25em] text-emerald-soft mt-1 uppercase">
                        {step.subtitle}
                      </p>

                      <p className="mt-4 text-zinc-300 text-sm leading-relaxed max-w-md">
                        {step.desc}
                      </p>

                      <ul className="mt-6 grid gap-y-2.5">
                        {step.bullets.map((bullet, bulletIdx) => (
                          <li key={bulletIdx} className="flex items-start gap-3 text-xs text-zinc-400">
                            <CheckCircle2 className="h-4 w-4 text-neon flex-shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </ScrollReveal>
                  </div>

                  {/* Right Side Content (Creative Visualization) */}
                  <div className={`${isEven ? "md:order-2 md:pl-12" : "md:order-1 md:pr-12"}`}>
                    <ScrollReveal animationClass={isEven ? "animate-fade-in-right" : "animate-fade-in-left"}>
                      <div className="transition-transform duration-500 hover:scale-[1.02]">
                        {step.viz}
                      </div>
                    </ScrollReveal>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative z-10 border-t border-white/[0.05] bg-[radial-gradient(ellipse_at_center,rgba(57,255,20,0.04),transparent_70%)]">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <ScrollReveal>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#39FF14]/20 bg-[#39FF14]/5 text-neon mb-8">
              <Layers className="h-6 w-6" />
            </div>
            
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Ready to engineer your custom system?
            </h2>
            
            <p className="mx-auto mt-6 max-w-xl text-zinc-400 text-sm sm:text-base leading-relaxed">
              We translate complexity into clean, optimized workflows. Book a call to launch a discovery session with our system architects.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-2 rounded-md bg-neon px-8 py-4 text-sm font-semibold text-black transition hover:brightness-110 hover:shadow-neon justify-center"
              >
                Schedule Architecture Call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/"
                className="group inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.02] px-8 py-4 text-sm font-semibold text-zinc-300 transition hover:bg-white/[0.05] hover:text-white justify-center"
              >
                Return to Homepage
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.05] bg-[#020202] py-12">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6 font-mono-hud text-[11px] text-zinc-500 tracking-[0.1em]">
          <span>© 2026 ASTRAFORGE. ALL SYSTEMS GO.</span>
          <div className="flex gap-8">
            <Link href="/#services" className="hover:text-[#39FF14] transition">SERVICES</Link>
            <Link href="/#work" className="hover:text-[#39FF14] transition">WORK</Link>
            <Link href="/process" className="hover:text-[#39FF14] transition">PROCESS</Link>
            <Link href="/#contact" className="hover:text-[#39FF14] transition">CONTACT</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
