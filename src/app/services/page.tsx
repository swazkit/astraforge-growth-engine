"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  Headphones,
  PenTool,
  Cpu,
  Image as ImageIcon,
  MessageCircle,
  Globe,
  Star,
  Send,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Menu,
  X,
  ChevronRight,
  Play,
  SendHorizontal,
  RefreshCw,
  Sliders,
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

// Mouse-reactive parallax background stars
function ParallaxStars() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setCoords({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="absolute inset-0 opacity-30 transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${coords.x * 20}px, ${coords.y * 20}px)`,
          backgroundImage: "radial-gradient(1.5px 1.5px at 20px 30px, #fff, transparent), radial-gradient(1px 1px at 75px 140px, #fff, transparent), radial-gradient(2px 2px at 150px 80px, #39FF14, transparent), radial-gradient(1px 1px at 250px 200px, #fff, transparent)",
          backgroundSize: "300px 300px",
        }}
      />
      <div
        className="absolute inset-0 opacity-45 transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${coords.x * -40}px, ${coords.y * -40}px)`,
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
        background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(57, 255, 20, 0.02), transparent 80%)`,
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
      { threshold: 0.1 }
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
      className={`transition-all duration-500 ${
        isVisible ? animationClass : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

// Interactive Sandboxes for each Service
function SupportDeskSandbox() {
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const simulateTicket = () => {
    setLoading(true);
    setLogs(["[INCOMING] Ticket #4029: 'Cannot access API endpoint keys'", "Analyzing customer account status..."]);
    
    setTimeout(() => {
      setLogs(prev => [...prev, "Extracting vector matching database answers..."]);
    }, 800);

    setTimeout(() => {
      setLogs(prev => [...prev, "Formulating step-by-step resolution: 'Reset client dashboard token'", "Executing validation check..."]);
    }, 1600);

    setTimeout(() => {
      setLogs(prev => [...prev, "✓ Ticket Auto-Resolved. Sent client resolution email.", "Response latency: 142ms"]);
      setLoading(false);
    }, 2400);
  };

  return (
    <div className="flex flex-col h-full justify-between p-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <span className="font-mono-hud text-[10px] text-zinc-400">SUPPORT DESK SANDBOX</span>
        <span className="h-2 w-2 rounded-full bg-neon animate-pulse" />
      </div>
      <div className="flex-1 font-mono-hud text-[11px] text-zinc-500 my-4 space-y-1.5 min-h-[120px] max-h-[140px] overflow-y-auto">
        {logs.length === 0 ? (
          <p className="text-zinc-600 italic">Click simulation button to test the AI support agent response flows.</p>
        ) : (
          logs.map((log, idx) => (
            <p key={idx} className={log.startsWith("✓") ? "text-[#39FF14]" : log.startsWith("[INCOMING]") ? "text-red-400" : "text-zinc-400"}>
              {log}
            </p>
          ))
        )}
      </div>
      <button
        onClick={simulateTicket}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 rounded border border-[#39FF14]/30 bg-[#39FF14]/5 py-2 font-mono-hud text-xs text-neon hover:bg-[#39FF14]/10 transition disabled:opacity-50"
      >
        <Play className="h-3 w-3" /> {loading ? "Simulating System Actions..." : "Simulate Support Ticket"}
      </button>
    </div>
  );
}

function ResearchAssistantSandbox() {
  const [topic, setTopic] = useState("AI agent orchestration");
  const [status, setStatus] = useState<string | null>(null);

  const startCrawl = () => {
    setStatus("SCRAPING");
    setTimeout(() => setStatus("COMPILING"), 1000);
    setTimeout(() => setStatus("DONE"), 2200);
  };

  return (
    <div className="flex flex-col h-full justify-between p-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <span className="font-mono-hud text-[10px] text-zinc-400">RESEARCH CO-PILOT SANDBOX</span>
        <span className="font-mono-hud text-[9px] text-[#39FF14]">{status || "IDLE"}</span>
      </div>
      <div className="flex-1 my-4 flex flex-col gap-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter research topic..."
            className="flex-1 rounded border border-white/10 bg-white/[0.02] px-3 py-1.5 font-mono-hud text-xs text-white focus:outline-none focus:border-[#39FF14]"
          />
          <button
            onClick={startCrawl}
            className="px-4 py-1.5 rounded bg-neon font-mono-hud text-xs font-semibold text-black hover:brightness-110 transition"
          >
            Go
          </button>
        </div>

        <div className="flex-1 rounded border border-white/5 bg-black/30 p-2 font-mono-hud text-[10px] text-zinc-500 overflow-hidden min-h-[90px]">
          {status === "SCRAPING" && (
            <div className="space-y-1">
              <p className="text-zinc-400">&gt; crawling scientific repositories for &quot;{topic}&quot;</p>
              <p className="text-zinc-500 animate-pulse">fetching matching papers: 18 located...</p>
            </div>
          )}
          {status === "COMPILING" && (
            <div className="space-y-1">
              <p className="text-zinc-400">&gt; extracting semantic outlines & highlights</p>
              <p className="text-zinc-400">&gt; tuning vocabulary output tone</p>
              <p className="text-zinc-500 animate-pulse">synthesizing clean summaries...</p>
            </div>
          )}
          {status === "DONE" && (
            <div className="space-y-1.5">
              <p className="text-[#39FF14] font-semibold">✓ Research Completed Successfully</p>
              <p className="text-zinc-300">Generated: &quot;A systematic analysis of {topic} showcasing hybrid architectural flows, latency reduction parameters, and multi-agent loops.&quot;</p>
            </div>
          )}
          {!status && <p className="text-zinc-600 italic">Enter a topic and click Go to extract research intelligence.</p>}
        </div>
      </div>
    </div>
  );
}

function AutomationSetupSandbox() {
  return (
    <div className="flex flex-col h-full justify-between p-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <span className="font-mono-hud text-[10px] text-zinc-400">INTEGRATION TOPOLOGY FLOW</span>
        <span className="font-mono-hud text-[9px] text-[#39FF14]">LIVE NODE FEED</span>
      </div>

      <div className="flex-1 my-4 flex items-center justify-between gap-2 relative">
        <div className="px-2 py-1 rounded border border-red-500/30 bg-red-500/5 text-[9px] font-mono-hud text-red-400 text-center flex-1">
          TRIGGER<br />Stripe Event
        </div>
        <div className="h-[1px] flex-1 bg-dashed border-t border-[#39FF14]/30 relative">
          <span className="absolute -top-1 left-1/2 h-1.5 w-1.5 rounded-full bg-[#39FF14] animate-ping" />
        </div>
        <div className="px-2 py-1 rounded border border-[#39FF14]/30 bg-[#39FF14]/5 text-[9px] font-mono-hud text-neon text-center flex-1">
          PROCESSOR<br />AI Agent Filter
        </div>
        <div className="h-[1px] flex-1 bg-dashed border-t border-[#39FF14]/30 relative">
          <span className="absolute -top-1 left-1/2 h-1.5 w-1.5 rounded-full bg-[#39FF14] animate-ping" />
        </div>
        <div className="px-2 py-1 rounded border border-blue-500/30 bg-blue-500/5 text-[9px] font-mono-hud text-blue-400 text-center flex-1">
          ACTION<br />DB Insert
        </div>
      </div>

      <div className="font-mono-hud text-[9px] text-zinc-600 text-center border-t border-white/5 pt-2">
        LATENCY MONITOR: 4ms • WORKFLOW SECURE: TLS 1.3
      </div>
    </div>
  );
}

function UGCAdCreativesSandbox() {
  const [platform, setPlatform] = useState("TikTok");
  const [dimensions, setDimensions] = useState("9:16 (Vertical)");

  const handlePlatformChange = (p: string) => {
    setPlatform(p);
    setDimensions(p === "YouTube" ? "16:9 (Landscape)" : "9:16 (Vertical)");
  };

  return (
    <div className="flex flex-col h-full justify-between p-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <span className="font-mono-hud text-[10px] text-zinc-400">UGC GENERATOR SCREEN</span>
        <div className="flex gap-1.5">
          {["TikTok", "Instagram", "YouTube"].map(p => (
            <button
              key={p}
              onClick={() => handlePlatformChange(p)}
              className={`px-1.5 py-0.5 rounded text-[8px] font-mono-hud transition ${platform === p ? "bg-[#39FF14] text-black font-bold" : "border border-white/10 text-zinc-400"}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 my-4 flex items-center justify-center">
        <div className="relative rounded border border-white/10 bg-[#0c0c0c] flex flex-col items-center justify-center p-3 text-center w-48 h-32 overflow-hidden">
          <HudCorners />
          <ImageIcon className="h-6 w-6 text-[#39FF14] animate-bounce" />
          <span className="font-mono-hud text-[9px] text-zinc-300 mt-2">{dimensions} mockup template</span>
          <span className="font-mono-hud text-[8px] text-[#39FF14] mt-1 tracking-wider uppercase">{platform} video render active</span>
        </div>
      </div>

      <div className="font-mono-hud text-[9px] text-zinc-500 border-t border-white/5 pt-2 flex justify-between">
        <span>AUDIO: ELEVENLABS AI VOICE</span>
        <span>RESOLUTION: 1080p</span>
      </div>
    </div>
  );
}

function ChatbotSandbox() {
  const [messages, setMessages] = useState<Array<{ role: "bot" | "user"; text: string }>>([
    { role: "bot", text: "Hey! Looking to automate your customer workflows or build something custom? Select a prompt:" }
  ]);

  const addMessage = (userText: string, botText: string) => {
    setMessages(prev => [...prev, { role: "user", text: userText }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "bot", text: botText }]);
    }, 600);
  };

  return (
    <div className="flex flex-col h-full justify-between p-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <span className="font-mono-hud text-[10px] text-zinc-400">WEBSITE CHATBOT INTERACTIVE WIDGET</span>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      </div>

      <div className="flex-1 my-3 bg-black/40 border border-white/5 rounded p-2.5 flex flex-col gap-2 overflow-y-auto max-h-[110px] min-h-[100px]">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <span className={`px-2.5 py-1 rounded text-[10px] font-sans max-w-[85%] ${msg.role === "user" ? "bg-neon text-black font-semibold" : "bg-white/5 text-zinc-300 border border-white/10"}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => addMessage("How do we start?", "Awesome! We begin with an audit mapping session to score operational waste. Let's schedule a call.")}
          className="flex-1 text-[8px] font-mono-hud border border-white/10 rounded py-1 text-zinc-400 hover:border-[#39FF14] hover:text-[#39FF14] transition"
        >
          &quot;How do we start?&quot;
        </button>
        <button
          onClick={() => addMessage("What is the cost?", "We offer fixed-scope project agreements based on custom automation complexities.")}
          className="flex-1 text-[8px] font-mono-hud border border-white/10 rounded py-1 text-zinc-400 hover:border-[#39FF14] hover:text-[#39FF14] transition"
        >
          &quot;What is the cost?&quot;
        </button>
      </div>
    </div>
  );
}

function PoweredWebsitesSandbox() {
  const [theme, setTheme] = useState("Cyberpunk Neon");

  return (
    <div className="flex flex-col h-full justify-between p-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <span className="font-mono-hud text-[10px] text-zinc-400">NEXT.JS THEME TOGGLER</span>
        <div className="flex gap-1">
          {["Cyberpunk Neon", "Clean Dark", "Minimal Light"].map(t => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`px-1 py-0.5 rounded text-[8px] font-mono-hud transition ${theme === t ? "bg-[#39FF14] text-black font-bold" : "border border-white/10 text-zinc-400"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 my-4 flex items-center justify-center">
        <div className={`w-full rounded border p-3 flex flex-col gap-1.5 transition-all duration-300 ${
          theme === "Cyberpunk Neon" ? "border-[#39FF14]/30 bg-[#050505] text-[#39FF14]" :
          theme === "Clean Dark" ? "border-zinc-800 bg-[#121212] text-white" :
          "border-zinc-200 bg-white text-black"
        }`}>
          <div className="flex justify-between items-center border-b pb-1 border-current">
            <span className="font-mono-hud text-[9px] font-bold">SAMPLE_NAV</span>
            <span className="text-[8px] font-mono-hud">MENU</span>
          </div>
          <div className="space-y-1">
            <div className="h-2 w-3/4 rounded bg-current opacity-30" />
            <div className="h-1.5 w-1/2 rounded bg-current opacity-20" />
          </div>
        </div>
      </div>

      <div className="font-mono-hud text-[9px] text-zinc-500 border-t border-white/5 pt-2 text-center">
        SSR: SPEEDINDEX 0.3s • SEARCH-ENGINE ENGINE READY
      </div>
    </div>
  );
}

function ReviewFunnelsSandbox() {
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const getTargetMsg = () => {
    if (rating >= 4) {
      return "✓ HIGH RATING DETECTED. Redirecting user client straight to Google/Trustpilot profile...";
    }
    return "⚠ CRITICAL FEEDBACK DETECTED. Prompting custom feedback form to intercept before public release...";
  };

  return (
    <div className="flex flex-col h-full justify-between p-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <span className="font-mono-hud text-[10px] text-zinc-400">SMART RATING CAMPAIGN ROUTER</span>
        <span className="h-2 w-2 rounded-full bg-neon animate-pulse" />
      </div>

      <div className="flex-1 my-4 flex flex-col items-center justify-center gap-3">
        {!submitted ? (
          <>
            <span className="font-mono-hud text-[10px] text-zinc-400">Submit test stars:</span>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(val => (
                <button
                  key={val}
                  onClick={() => setRating(val)}
                  className={`text-xl transition-transform hover:scale-125 ${val <= rating ? "text-[#39FF14]" : "text-zinc-700"}`}
                >
                  ★
                </button>
              ))}
            </div>
            <button
              onClick={() => setSubmitted(true)}
              className="mt-1 px-4 py-1 rounded bg-neon font-mono-hud text-[10px] font-bold text-black"
            >
              Test Route Action
            </button>
          </>
        ) : (
          <div className="text-center space-y-2">
            <p className="font-mono-hud text-[10px] text-zinc-300">{getTargetMsg()}</p>
            <button
              onClick={() => setSubmitted(false)}
              className="font-mono-hud text-[8px] tracking-[0.2em] text-[#39FF14] uppercase underline"
            >
              RESET AND RETRY
            </button>
          </div>
        )}
      </div>

      <div className="font-mono-hud text-[9px] text-zinc-600 border-t border-white/5 pt-2 text-center">
        PREVENT PUBLIC REPUTATION DAMAGE
      </div>
    </div>
  );
}

function NewsletterSandbox() {
  const [channel, setChannel] = useState("LinkedIn");

  return (
    <div className="flex flex-col h-full justify-between p-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <span className="font-mono-hud text-[10px] text-zinc-400">CONTENT ENGINE SANDBOX</span>
        <div className="flex gap-1.5">
          {["LinkedIn", "Twitter", "Newsletter"].map(c => (
            <button
              key={c}
              onClick={() => setChannel(c)}
              className={`px-1.5 py-0.5 rounded text-[8px] font-mono-hud transition ${channel === c ? "bg-[#39FF14] text-black font-bold" : "border border-white/10 text-zinc-400"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 my-3 bg-black/30 border border-white/5 rounded p-2.5 font-mono-hud text-[10px] text-zinc-400 leading-relaxed min-h-[90px]">
        {channel === "LinkedIn" && (
          <div className="space-y-1">
            <p className="text-neon">🚀 How we cut operational waste by 80% using custom AI middleware.</p>
            <p className="text-zinc-500 font-sans text-[9px] mt-1.5">Traditional systems create manual bottlenecks. By planning custom API flows and agent pools, we build robust infrastructure...</p>
          </div>
        )}
        {channel === "Twitter" && (
          <div className="space-y-1">
            <p className="text-neon">1/8 Traditional businesses throw headcount at common support tickets.</p>
            <p className="text-zinc-500 mt-1">Here is how we automate that using next-gen LLM structures. Thread 👇</p>
          </div>
        )}
        {channel === "Newsletter" && (
          <div className="space-y-1">
            <p className="text-neon">Subject: Designing autonomous agency loops</p>
            <p className="text-zinc-500 text-[9px] font-sans mt-1">This week we map the exact infrastructure topology used to synchronize external database records with vector parameters...</p>
          </div>
        )}
      </div>

      <div className="font-mono-hud text-[9px] text-zinc-600 border-t border-white/5 pt-2 text-center">
        AUTO-GEN SYSTEM SYNDICATION ACTIVE
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("AI-Driven Customer Support Desk");

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
      sandbox: <SupportDeskSandbox />,
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
      sandbox: <ResearchAssistantSandbox />,
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
      sandbox: <AutomationSetupSandbox />,
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
      sandbox: <UGCAdCreativesSandbox />,
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
      sandbox: <ChatbotSandbox />,
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
      sandbox: <PoweredWebsitesSandbox />,
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
      sandbox: <ReviewFunnelsSandbox />,
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
      sandbox: <NewsletterSandbox />,
    },
  ];

  const allServices = [...core, ...others];
  const currentService = allServices.find(s => s.label === selectedService) || allServices[0];
  const CurrentIcon = currentService.Icon;

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-[#39FF14]/30 selection:text-[#39FF14] overflow-x-hidden font-sans">
      {/* Background patterns */}
      <ParallaxStars />
      <MouseGlow />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      {/* Top Navigation */}
      <header className={`sticky top-0 z-50 border-b border-white/[0.06] transition-colors duration-300 ${menuOpen ? "bg-[#050505]" : "bg-[#050505]/80 backdrop-blur-md"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-extrabold tracking-[0.2em] text-white flex items-center gap-2">
            <span className="text-neon">■</span> ASTRAFORGE
          </Link>
          <nav className="hidden items-center gap-10 md:flex">
            <Link href="/services" className="text-sm text-white font-semibold">Services</Link>
            <Link href="/#work" className="text-sm text-zinc-400 transition hover:text-white">Work</Link>
            <Link href="/process" className="text-sm text-zinc-400 transition hover:text-white">Process</Link>
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
              <Link href="/services" onClick={() => setMenuOpen(false)} className="text-xl font-semibold tracking-wider text-[#39FF14]">Services</Link>
              <Link href="/#work" onClick={() => setMenuOpen(false)} className="text-xl font-semibold tracking-wider text-zinc-300 transition hover:text-[#39FF14]">Work</Link>
              <Link href="/process" onClick={() => setMenuOpen(false)} className="text-xl font-semibold tracking-wider text-zinc-300 transition hover:text-[#39FF14]">Process</Link>
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
      <section className="relative z-10 px-6 pt-24 pb-16 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 border border-[#39FF14]/20 bg-[#39FF14]/5 rounded-full px-4 py-1.5 text-xs text-neon font-mono-hud tracking-[0.15em] mb-8 animate-fade-up">
          <Sparkles className="h-3.5 w-3.5" /> DYNAMIC SYSTEM WORKFLOWS
        </div>
        
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl leading-[1.1] animate-fade-up">
          Advanced Service <br />
          <span className="text-neon bg-gradient-to-r from-neon via-emerald-soft to-neon bg-clip-text text-transparent">Ecosystem Hub</span>
        </h1>
        
        <p className="mt-8 max-w-2xl text-zinc-300 text-lg sm:text-xl leading-relaxed animate-fade-up">
          Select an individual service on the dashboard below to explore specific pipelines and test simulated action models.
        </p>
      </section>

      {/* Showcase Grid Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Services List (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <ScrollReveal animationClass="animate-fade-in-left">
            <div>
              <span className="font-mono-hud text-xs tracking-[0.25em] text-zinc-500 uppercase">01 / CORE AUTOMATIONS</span>
              <div className="mt-4 flex flex-col gap-3">
                {core.map(s => {
                  const Icon = s.Icon;
                  const active = s.label === selectedService;
                  return (
                    <button
                      key={s.label}
                      onClick={() => setSelectedService(s.label)}
                      className={`text-left w-full rounded-xl p-4 glass-card border transition-all duration-300 flex items-start gap-4 ${
                        active ? "border-[#39FF14]/40 bg-[#39FF14]/[0.02] shadow-[0_0_15px_rgba(57,255,20,0.05)]" : "border-white/5 hover:border-white/10 hover:bg-white/[0.01]"
                      }`}
                    >
                      <div className={`h-9 w-9 rounded border flex items-center justify-center flex-shrink-0 transition ${active ? "border-[#39FF14]/40 bg-[#39FF14]/10 text-neon" : "border-white/10 text-zinc-400"}`}>
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className={`block text-sm font-semibold transition ${active ? "text-neon" : "text-white"}`}>
                          {s.label}
                        </span>
                        <span className="block text-[11px] text-zinc-500 truncate mt-1">{s.desc}</span>
                      </div>
                      <ChevronRight className={`h-4 w-4 flex-shrink-0 mt-2 transition-transform duration-300 ${active ? "translate-x-1 text-neon" : "text-zinc-600"}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-10">
              <span className="font-mono-hud text-xs tracking-[0.25em] text-zinc-500 uppercase">02 / GROWTH ENGINES</span>
              <div className="mt-4 flex flex-col gap-3">
                {others.map(s => {
                  const Icon = s.Icon;
                  const active = s.label === selectedService;
                  return (
                    <button
                      key={s.label}
                      onClick={() => setSelectedService(s.label)}
                      className={`text-left w-full rounded-xl p-4 glass-card border transition-all duration-300 flex items-start gap-4 ${
                        active ? "border-[#39FF14]/40 bg-[#39FF14]/[0.02] shadow-[0_0_15px_rgba(57,255,20,0.05)]" : "border-white/5 hover:border-white/10 hover:bg-white/[0.01]"
                      }`}
                    >
                      <div className={`h-9 w-9 rounded border flex items-center justify-center flex-shrink-0 transition ${active ? "border-[#39FF14]/40 bg-[#39FF14]/10 text-neon" : "border-white/10 text-zinc-400"}`}>
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className={`block text-sm font-semibold transition ${active ? "text-neon" : "text-white"}`}>
                          {s.label}
                        </span>
                        <span className="block text-[11px] text-zinc-500 truncate mt-1">{s.desc}</span>
                      </div>
                      <ChevronRight className={`h-4 w-4 flex-shrink-0 mt-2 transition-transform duration-300 ${active ? "translate-x-1 text-neon" : "text-zinc-600"}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Side: Active Service Sandbox & Details (7 Columns) */}
        <div className="lg:col-span-7">
          <ScrollReveal animationClass="animate-fade-in-right">
            <div className="rounded-xl border border-white/5 bg-black/40 p-6 sm:p-8 flex flex-col gap-6 relative min-h-[500px]">
              <HudCorners />

              {/* Service header */}
              <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-6">
                <div className="flex gap-4 items-center">
                  <div className="h-12 w-12 rounded border border-[#39FF14]/30 bg-[#39FF14]/10 flex items-center justify-center text-neon">
                    <CurrentIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{currentService.label}</h2>
                    <span className="font-mono-hud text-[10px] tracking-[0.2em] text-[#39FF14] uppercase mt-1 block">SERVICE PROFILE ACTIVE</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <span className="font-mono-hud text-[10px] tracking-[0.25em] text-zinc-500 block uppercase">SYSTEM SCOPE</span>
                <p className="mt-2 text-zinc-300 text-sm leading-relaxed">{currentService.desc}</p>
              </div>

              {/* Bullets grid */}
              <div>
                <span className="font-mono-hud text-[10px] tracking-[0.25em] text-zinc-500 block uppercase mb-3">KEY CAPABILITIES</span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentService.bullets.map((b, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-xs text-zinc-400">
                      <CheckCircle2 className="h-4 w-4 text-[#39FF14] flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sandbox Panel */}
              <div className="mt-4 border border-white/5 rounded-xl bg-white/[0.01] overflow-hidden min-h-[220px] flex flex-col justify-between">
                {currentService.sandbox}
              </div>

              {/* Book Call trigger */}
              <div className="mt-4 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-mono-hud text-[10px] text-zinc-500">READY FOR SYSTEM DEPLOYMENT</span>
                <Link
                  href="/#contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md bg-neon px-6 py-2.5 text-xs font-bold text-black transition hover:brightness-110 hover:shadow-neon"
                >
                  Deploy this Service
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>

      </section>

      {/* Call to Action Section */}
      <section className="relative z-10 border-t border-white/[0.05] bg-[radial-gradient(ellipse_at_center,rgba(57,255,20,0.04),transparent_70%)]">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <ScrollReveal>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#39FF14]/20 bg-[#39FF14]/5 text-neon mb-8">
              <Cpu className="h-6 w-6" />
            </div>
            
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Integrate custom model workflows
            </h2>
            
            <p className="mx-auto mt-6 max-w-xl text-zinc-400 text-sm sm:text-base leading-relaxed">
              We design specific pipelines custom fitted to scale your operations. Launch a discovery session with our engineers.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-2 rounded-md bg-neon px-8 py-4 text-sm font-semibold text-black transition hover:brightness-110 hover:shadow-neon justify-center"
              >
                Launch Discovery Call
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
            <Link href="/services" className="hover:text-[#39FF14] transition">SERVICES</Link>
            <Link href="/#work" className="hover:text-[#39FF14] transition">WORK</Link>
            <Link href="/process" className="hover:text-[#39FF14] transition">PROCESS</Link>
            <Link href="/#contact" className="hover:text-[#39FF14] transition">CONTACT</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
