import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu, X, Phone, Mail, MapPin, Clock, ChevronDown, ChevronRight, ArrowRight, ArrowUpRight,
  Star, Check, Ruler, Layers, ClipboardCheck, TreePine, Users, Award,
  ShieldCheck, Sparkles, MessageCircle, Quote, Plus, Minus, Compass,
  Hammer, FileCheck2, Boxes, Home as HomeIcon, Building, ChevronUp
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

/* ---------------------------------- DATA ---------------------------------- */

const NAV_PAGES = ["home", "about", "services", "projects", "contact"];

const SERVICES = [
  { icon: Compass, cat: "Architectural Design", title: "Architectural Design", overview: "Concept-driven spatial design for homes, developments, and commercial propositions that balance beauty with performance.", benefits: ["Site-responsive planning", "Elegant massing studies", "Coordinated design narratives"], timeline: "4 – 8 weeks", deliverables: ["Concept sketches", "Design development package", "3D massing studies"] },
  { icon: HomeIcon, cat: "Residential Design", title: "Residential Design", overview: "Thoughtful homes shaped around everyday routines, natural light, and refined materiality.", benefits: ["Lifestyle-led floor plans", "Indoor-outdoor flow", "Tailored material palettes"], timeline: "4 – 8 weeks", deliverables: ["Residence planning set", "Interior shell coordination", "Visual presentation board"] },
  { icon: Building, cat: "Commercial Architecture", title: "Commercial Architecture", overview: "Workplaces and mixed-use destinations designed to support operations, identity, and long-term growth.", benefits: ["Operational efficiency", "Brand-led facade concepts", "Flexible planning"], timeline: "6 – 12 weeks", deliverables: ["Space program", "Architectural package", "Facade exploration studies"] },
  { icon: Layers, cat: "Interior Design", title: "Interior Design", overview: "Refined interiors that bring architectural character into every room with balance and clarity.", benefits: ["Material and lighting concepts", "Custom finish coordination", "Furniture and fixture guidance"], timeline: "4 – 9 weeks", deliverables: ["Interior concept boards", "Layout drawings", "Finish specification set"] },
  { icon: Hammer, cat: "Renovation & Remodeling", title: "Renovation & Remodeling", overview: "Sensitive transformations that respect existing structure while introducing contemporary comfort and performance.", benefits: ["Feasibility and planning", "Phased execution strategy", "Minimal disruption solutions"], timeline: "3 – 10 weeks", deliverables: ["Existing condition survey", "Renovation drawings", "Visual before/after concepts"] },
  { icon: Ruler, cat: "Space Planning", title: "Space Planning", overview: "Precise spatial strategies developed to improve movement, usability, and flexibility from day one.", benefits: ["Functional zoning", "Circulation refinement", "Future-ready layouts"], timeline: "2 – 4 weeks", deliverables: ["Zoning diagrams", "Furniture layout plans", "Space optimization report"] },
  { icon: Boxes, cat: "3D Architectural Visualization", title: "3D Architectural Visualization", overview: "Immersive visual studies that help clients experience the project before construction begins.", benefits: ["Photorealistic renders", "Design validation", "Stakeholder presentation materials"], timeline: "1 – 3 weeks", deliverables: ["Exterior renders", "Interior renders", "Animated walkthroughs"] },
  { icon: FileCheck2, cat: "Construction Documentation", title: "Construction Documentation", overview: "Detailed documentation designed to support tendering, approvals, and precise on-site execution.", benefits: ["Documentation accuracy", "Code-compliant detailing", "Clear construction coordination"], timeline: "3 – 6 weeks", deliverables: ["Construction drawing set", "Detailing package", "Specification support"] },
  { icon: ClipboardCheck, cat: "Project Management", title: "Project Management", overview: "Coordinated delivery from concept through handover with clear communication and careful oversight.", benefits: ["Milestone tracking", "Consultant coordination", "Risk-aware scheduling"], timeline: "Full project duration", deliverables: ["Project programme", "Progress reporting", "Handover coordination"] },
  { icon: ShieldCheck, cat: "Site Supervision", title: "Site Supervision", overview: "On-site presence and quality control that keeps construction aligned with the approved vision.", benefits: ["Regular site audits", "Quality assurance checks", "Detailed snag management"], timeline: "Ongoing", deliverables: ["Inspection reports", "Snag lists", "Progress documentation"] },
];

const SERVICE_CATEGORIES = [...new Set(SERVICES.map(s => s.cat))];

const PROJECTS = [
  { title: "Horizon Residence", cat: "Luxury Homes", location: "Lagos, Nigeria", desc: "A sculptural coastal home framed by open terraces, private courtyards, and panoramic views.", img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80" },
  { title: "Skyline Business Hub", cat: "Commercial Buildings", location: "Victoria Island, Lagos", desc: "A mixed-use business landmark defined by intelligent facades, flexible work zones, and elevated amenity.", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80" },
  { title: "The Willow Villa", cat: "Modern Villas", location: "Abuja, Nigeria", desc: "An elegant family villa centred around a landscaped courtyard and seamless indoor-outdoor living.", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80" },
  { title: "Aurora Office Tower", cat: "Office Complexes", location: "Ikoyi, Lagos", desc: "A refined headquarters that balances light, acoustics, and a calm, contemporary corporate identity.", img: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80" },
  { title: "Green Haven Apartments", cat: "Apartment Buildings", location: "Lekki, Lagos", desc: "A residential collection with generous balconies, landscaped pockets, and a measured sense of privacy.", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80" },
  { title: "Crestview Hotel", cat: "Hotels", location: "Abuja, Nigeria", desc: "A boutique hospitality concept where warm materials, curated circulation, and understated luxury meet.", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80" },
  { title: "Harmony Learning Centre", cat: "Schools", location: "Port Harcourt, Nigeria", desc: "A learning environment shaped around adaptability, daylight, and collaborative social spaces.", img: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80" },
  { title: "Nova Retail Plaza", cat: "Retail", location: "Lagos, Nigeria", desc: "A destination retail experience anchored by an airy promenade, signature storefronts, and flexible tenant planning.", img: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80" },
];

const PROJECT_CATEGORIES = ["All", ...new Set(PROJECTS.map(p => p.cat))];

const PROCESS_STEPS = [
  { title: "Discovery", desc: "We begin by listening carefully, understanding your goals, and shaping the brief around how you want to live and work." },
  { title: "Site Study", desc: "Every project is grounded in its context, including orientation, climate, views, and the surrounding urban fabric." },
  { title: "Concept Design", desc: "Initial ideas are explored through sketches, spatial planning, and a clear design narrative." },
  { title: "Design Development", desc: "The selected direction evolves into detailed architectural and interior proposals." },
  { title: "Visualization", desc: "Immersive visuals and 3D representation help you experience the design before it is built." },
  { title: "Documentation", desc: "We prepare refined drawings and specifications to support approvals, coordination, and execution." },
  { title: "Construction Oversight", desc: "Our team monitors quality, sequencing, and communication during the build." },
  { title: "Project Handover", desc: "A thoughtful closeout ensures the finished space is delivered with clarity and confidence." },
];

const STATS = [
  { value: 35, suffix: "+", label: "Concept Projects" },
  { value: 8, suffix: "", label: "Design Specialists" },
  { value: 12, suffix: "", label: "Cities Inspired" },
  { value: 100, suffix: "%", label: "Design Focus" },
];

const TESTIMONIALS = [
  { name: "Daniel Alvarez", role: "Private Residence Client", quote: "Working with Nexora Studio was a seamless experience. Their creative ideas and attention to detail exceeded our expectations.", rating: 5 },
  { name: "Maya Chen", role: "Commercial Development Partner", quote: "The team translated our vision into a space that feels both refined and practical. Every detail was considered with care.", rating: 5 },
  { name: "Noah Ibrahim", role: "Hospitality Founder", quote: "From first concept to final delivery, Nexora Studio made the process calm, collaborative, and inspiring.", rating: 5 },
];

const WHY_US = [
  { icon: Sparkles, title: "Contemporary Design Approach", desc: "Spaces are shaped with a modern architectural language that feels timeless and tailored." },
  { icon: Users, title: "Client First Process", desc: "Every decision is made with your priorities, lifestyle, and ambitions in mind." },
  { icon: TreePine, title: "Sustainable Design Principles", desc: "Natural light, efficiency, and durable materials are considered from the very beginning." },
  { icon: ShieldCheck, title: "Experienced Design Team", desc: "A multidisciplinary studio with a strong track record across residential and commercial projects." },
  { icon: MessageCircle, title: "Transparent Project Management", desc: "Clear communication keeps budgets, timing, and decision-making aligned at every step." },
  { icon: Ruler, title: "Attention to Every Detail", desc: "From planning to finishing, the small decisions are handled with care and intention." },
  { icon: Award, title: "High Quality Deliverables", desc: "Every package is produced to a standard that supports confident approvals and execution." },
  { icon: Boxes, title: "Modern Technology & 3D Visualization", desc: "Advanced visuals and digital tools bring clarity to complex design concepts." },
];

const TRUST_BADGES = ["Contemporary Design Vision", "Client Centric Delivery", "Sustainable Architecture", "Premium Project Planning", "Thoughtful Interiors", "Technical Precision", "Collaborative Process", "Design Excellence"];

const PARTNERS = ["Design Excellence Council", "Future Living Alliance", "Studio Practice Forum", "Urban Design Collective", "Architectural Visualization Network", "Sustainable Spaces Network"];

const FAQS = [
  { cat: "Architectural Services", q: "What services does Nexora Studio provide?", a: "We deliver architectural design, interior planning, renovations, 3D visualization, construction documentation, project management, and site supervision." },
  { cat: "Design Process", q: "How does a typical engagement begin?", a: "Every project begins with discovery, site study, and concept development so the brief is grounded in both aspiration and context." },
  { cat: "Project Duration", q: "How long does a project take?", a: "Timelines vary by scope, but residential concepts are typically developed within a few weeks while larger developments require more detailed planning and coordination." },
  { cat: "Budget Planning", q: "How is budget guidance handled?", a: "We develop a clear design strategy and documentation package to support realistic planning, informed decisions, and aligned expectations." },
  { cat: "Design Revisions", q: "How are revisions managed?", a: "Revisions are structured around each design stage so feedback is incorporated thoughtfully rather than at random." },
  { cat: "Project Delivery", q: "Can Nexora Studio support construction?", a: "Yes. We can provide project management and on-site supervision to keep the build aligned with the approved design intent." },
];

/* ------------------------------- HELPERS ---------------------------------- */

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={className}
      style={{ transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(.16,.84,.44,1) ${delay}ms`, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)" }}>
      {children}
    </div>
  );
}

function Counter({ value, suffix }) {
  const [ref, visible] = useReveal();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let raf, start;
    const dur = 1600;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / dur, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [visible, value]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* Corner registration marks — the recurring blueprint motif */
function DraftMarks({ dark }) {
  const c = dark ? "rgba(200,155,60,0.55)" : "rgba(200,155,60,0.65)";
  return (
    <>
      <span style={{ position: "absolute", top: 10, left: 10, width: 14, height: 14, borderTop: `1px solid ${c}`, borderLeft: `1px solid ${c}` }} />
      <span style={{ position: "absolute", bottom: 10, right: 10, width: 14, height: 14, borderBottom: `1px solid ${c}`, borderRight: `1px solid ${c}` }} />
    </>
  );
}

/* ------------------------------- SUB-COMPONENTS ---------------------------- */

function Logo({ dark }) {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className="relative w-9 h-9 flex items-center justify-center" style={{ border: `1px solid #C89B3C` }}>
        <span style={{ fontFamily: "Poppins, sans-serif", color: "#C89B3C", fontWeight: 700, fontSize: 15 }}>NS</span>
      </div>
      <div style={{ fontFamily: "Poppins, sans-serif" }}>
        <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: "0.02em", color: dark ? "#F8FAFC" : "#0F172A", lineHeight: 1.05 }}>NEXORA</div>
        <div style={{ fontWeight: 400, fontSize: 9.5, letterSpacing: "0.3em", color: "#C89B3C", lineHeight: 1.1 }}>STUDIO</div>
      </div>
    </div>
  );
}

function GoldButton({ children, onClick, icon: Icon = ArrowRight, className = "" }) {
  return (
    <button onClick={onClick}
      className={`group inline-flex items-center gap-2.5 px-7 py-3.5 text-sm tracking-wide transition-all duration-300 ${className}`}
      style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, background: "#C89B3C", color: "#0F172A", borderRadius: 2 }}
      onMouseEnter={e => e.currentTarget.style.background = "#dcae52"}
      onMouseLeave={e => e.currentTarget.style.background = "#C89B3C"}>
      {children}
      <Icon size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
    </button>
  );
}

function GhostButton({ children, onClick, dark }) {
  return (
    <button onClick={onClick}
      className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm tracking-wide transition-all duration-300"
      style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, border: `1px solid ${dark ? "rgba(248,250,252,0.35)" : "rgba(15,23,42,0.25)"}`, color: dark ? "#F8FAFC" : "#0F172A", borderRadius: 2, background: "transparent" }}>
      {children}
      <ArrowRight size={16} />
    </button>
  );
}

function SectionEyebrow({ children, dark }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span style={{ width: 32, height: 1, background: "#C89B3C" }} />
      <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.28em", color: "#C89B3C" }}>{children}</span>
    </div>
  );
}

/* ---------------------------------- NAV ------------------------------------ */

function Nav({ page, setPage, dark, scrolled }) {
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  const go = (p) => { setPage(p); setOpen(false); setMegaOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const bg = scrolled || page !== "home" ? (dark ? "rgba(11,18,32,0.92)" : "rgba(255,255,255,0.95)") : "transparent";
  const txt = scrolled || page !== "home" ? (dark ? "#F8FAFC" : "#0F172A") : "#F8FAFC";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500" style={{ background: bg, backdropFilter: (scrolled || page !== "home") ? "blur(14px)" : "none", borderBottom: (scrolled || page !== "home") ? `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.06)"}` : "none" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <button onClick={() => go("home")}><Logo dark={txt === "#F8FAFC"} /></button>

        <nav className="hidden lg:flex items-center gap-9" style={{ fontFamily: "Poppins, sans-serif", fontSize: 13.5, fontWeight: 500, letterSpacing: "0.02em", color: txt }}>
          <button onClick={() => go("home")} className="hover:opacity-70 transition-opacity">Home</button>
          <button onClick={() => go("about")} className="hover:opacity-70 transition-opacity">About</button>
          <div className="relative" onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)}>
            <button onClick={() => go("services")} className="flex items-center gap-1 hover:opacity-70 transition-opacity">Services <ChevronDown size={14} /></button>
            {megaOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                <div className="grid grid-cols-2 gap-x-10 gap-y-2 p-7 shadow-2xl" style={{ width: 460, background: dark ? "#0B1220" : "#FFFFFF", border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)"}` }}>
                  {SERVICE_CATEGORIES.map((c) => (
                    <button key={c} onClick={() => go("services")} className="text-left py-1.5 hover:text-[#C89B3C] transition-colors" style={{ color: dark ? "#CBD5E1" : "#334155", fontSize: 12.5 }}>{c}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button onClick={() => go("projects")} className="hover:opacity-70 transition-opacity">Projects</button>
          <button onClick={() => go("contact")} className="hover:opacity-70 transition-opacity">Contact</button>
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <GoldButton onClick={() => go("contact")}>Book a Consultation</GoldButton>
        </div>

        <button className="lg:hidden" style={{ color: txt }} onClick={() => setOpen(!open)}>{open ? <X size={24} /> : <Menu size={24} />}</button>
      </div>

      {open && (
        <div className="lg:hidden px-6 pb-8 pt-2 flex flex-col gap-1" style={{ background: dark ? "#0B1220" : "#FFFFFF", fontFamily: "Poppins, sans-serif" }}>
          {["home", "about", "services", "projects", "contact"].map((p) => (
            <button key={p} onClick={() => go(p)} className="text-left py-3 capitalize border-b" style={{ color: dark ? "#F8FAFC" : "#0F172A", borderColor: dark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.06)", fontSize: 15, fontWeight: 500 }}>{p}</button>
          ))}
          <div className="pt-5"><GoldButton onClick={() => go("contact")} className="w-full justify-center">Book a Consultation</GoldButton></div>
        </div>
      )}
    </header>
  );
}

/* --------------------------------- HERO ------------------------------------ */

function Hero({ setPage, dark }) {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setDrawn(true), 300); return () => clearTimeout(t); }, []);

  return (
    <section className="relative h-screen min-h-[720px] flex items-end overflow-hidden" style={{ background: "#0F172A" }}>
      <img src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=2000&q=80" alt="" className="absolute inset-0 w-full h-full object-cover transition-all duration-[2500ms]" style={{ opacity: drawn ? 0.42 : 0, transform: drawn ? "scale(1)" : "scale(1.08)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(15,23,42,0.75) 0%, rgba(15,23,42,0.35) 45%, rgba(15,23,42,0.94) 100%)" }} />

      {/* signature: blueprint elevation line-drawing */}
      <svg viewBox="0 0 900 420" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" style={{ opacity: drawn ? 0.28 : 0.9, transition: "opacity 1.8s ease 1.6s" }}>
        <g fill="none" stroke="#C89B3C" strokeWidth="1.1">
          {[
            "M60,380 L60,180 L160,180 L160,380",
            "M160,380 L160,120 L340,120 L340,380",
            "M340,380 L340,60 L520,60 L520,380",
            "M520,380 L520,150 L680,150 L680,380",
            "M680,380 L680,220 L820,220 L820,380",
            "M60,180 L820,180", "M60,240 L820,240", "M60,300 L820,300",
            "M180,150 L180,380 M220,150 L220,380 M260,150 L260,380",
          ].map((d, i) => (
            <path key={i} d={d}
              style={{ strokeDasharray: 1400, strokeDashoffset: drawn ? 0 : 1400, transition: `stroke-dashoffset 2.2s cubic-bezier(.16,.84,.44,1) ${i * 90}ms` }} />
          ))}
        </g>
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-24 lg:pb-32 w-full">
        <Reveal>
          <div className="flex items-center gap-3 mb-7">
            <span style={{ width: 40, height: 1, background: "#C89B3C" }} />
            <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.3em", color: "#C89B3C" }}>ARCHITECTURE · INTERIOR DESIGN · CONSTRUCTION CONSULTANCY</span>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "#F8FAFC", letterSpacing: "-0.01em" }} className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.06] max-w-4xl">
            Designing Spaces That Inspire Tomorrow
          </h1>
        </Reveal>
        <Reveal delay={220}>
          <p className="mt-7 max-w-xl text-base lg:text-lg" style={{ fontFamily: "Inter, sans-serif", color: "#CBD5E1", lineHeight: 1.7 }}>
            From modern homes to commercial developments, Nexora Studio delivers architectural solutions that combine creativity, functionality, and timeless design.
          </p>
        </Reveal>
        <Reveal delay={340}>
          <div className="mt-10 flex flex-wrap gap-4">
            <GoldButton onClick={() => setPage("projects")}>Explore Projects</GoldButton>
            <GhostButton onClick={() => setPage("contact")} dark>Book a Consultation</GhostButton>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2 z-10" style={{ color: "rgba(248,250,252,0.5)" }}>
        <span style={{ writingMode: "vertical-rl", fontFamily: "Poppins, sans-serif", fontSize: 10, letterSpacing: "0.25em" }}>SCROLL</span>
        <span style={{ width: 1, height: 40, background: "rgba(248,250,252,0.3)" }} />
      </div>
    </section>
  );
}

/* --------------------------------- HOME PAGE SECTIONS ----------------------- */

function AboutPreview({ dark, setPage }) {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-10" style={{ background: dark ? "#0B1220" : "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <Reveal className="relative">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1000&q=80" alt="Nexora Studio studio" className="w-full h-[420px] object-cover" />
            <div className="absolute -bottom-8 -right-8 hidden sm:block p-6" style={{ background: "#C89B3C", maxWidth: 220 }}>
              <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 32, color: "#0F172A" }}>35+</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#0F172A" }}>Concept-led spaces shaped across modern cities</div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <SectionEyebrow dark={dark}>WHO WE ARE</SectionEyebrow>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: dark ? "#F8FAFC" : "#0F172A" }} className="text-3xl lg:text-[2.6rem] leading-tight mb-6">
            A fictional architecture studio built for modern living
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", color: dark ? "#94A3B8" : "#64748B", lineHeight: 1.8 }} className="mb-8">
            Nexora Studio is a fictional architecture and design practice created as a portfolio concept to showcase premium architectural design, interior planning, and construction consultancy. The studio focuses on creating functional, elegant, and sustainable spaces for residential, commercial, and mixed-use developments.
          </p>
          <div className="grid grid-cols-2 gap-6 mb-9">
            {["Design excellence", "Interior-led planning", "3D architectural visualization", "Transparent project delivery"].map((t) => (
              <div key={t} className="flex items-start gap-3">
                <Check size={16} style={{ color: "#C89B3C", marginTop: 3, flexShrink: 0 }} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: dark ? "#CBD5E1" : "#334155" }}>{t}</span>
              </div>
            ))}
          </div>
          <GhostButton onClick={() => setPage("about")} dark={dark}>More About Us</GhostButton>
        </Reveal>
      </div>
    </section>
  );
}

function FeaturedServices({ dark, setPage }) {
  const featured = SERVICES.slice(0, 6);
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-10" style={{ background: dark ? "#0F172A" : "#F8FAFC" }}>
      <div className="max-w-7xl mx-auto">
        <Reveal className="max-w-2xl mb-16">
          <SectionEyebrow dark={dark}>WHAT WE DO</SectionEyebrow>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: dark ? "#F8FAFC" : "#0F172A" }} className="text-3xl lg:text-[2.6rem] leading-tight">
            Services shaped around every stage of your build
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <div className="group relative p-8 h-full transition-all duration-500 hover:-translate-y-1"
                style={{ background: dark ? "#0B1220" : "#FFFFFF", border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(15,23,42,0.07)"}` }}>
                <DraftMarks dark={dark} />
                <s.icon size={28} style={{ color: "#C89B3C" }} strokeWidth={1.5} />
                <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: dark ? "#F8FAFC" : "#0F172A" }} className="text-lg mt-5 mb-3">{s.title}</h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13.5, color: dark ? "#94A3B8" : "#64748B", lineHeight: 1.7 }}>{s.overview}</p>
                <button onClick={() => setPage("services")} className="mt-6 inline-flex items-center gap-2 text-xs group-hover:gap-3 transition-all" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "#C89B3C", letterSpacing: "0.05em" }}>
                  LEARN MORE <ArrowRight size={13} />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14 text-center" delay={100}>
          <GoldButton onClick={() => setPage("services")}>View All Services</GoldButton>
        </Reveal>
      </div>
    </section>
  );
}

function WhyChooseUs({ dark }) {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-10" style={{ background: dark ? "#0B1220" : "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto">
        <Reveal className="max-w-2xl mb-16">
          <SectionEyebrow dark={dark}>WHY CHOOSE US</SectionEyebrow>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: dark ? "#F8FAFC" : "#0F172A" }} className="text-3xl lg:text-[2.6rem] leading-tight">
            Built on precision, delivered with reliability
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: dark ? "rgba(255,255,255,0.07)" : "rgba(15,23,42,0.07)" }}>
          {WHY_US.map((w, i) => (
            <Reveal key={w.title} delay={i * 60}>
              <div className="p-8 h-full" style={{ background: dark ? "#0B1220" : "#FFFFFF" }}>
                <w.icon size={24} style={{ color: "#C89B3C" }} strokeWidth={1.5} />
                <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: dark ? "#F8FAFC" : "#0F172A" }} className="text-base mt-5 mb-2.5">{w.title}</h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: dark ? "#94A3B8" : "#64748B", lineHeight: 1.65 }}>{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProjects({ dark, setPage }) {
  const featured = PROJECTS.slice(0, 6);
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-10" style={{ background: dark ? "#0F172A" : "#F8FAFC" }}>
      <div className="max-w-7xl mx-auto">
        <Reveal className="flex flex-wrap justify-between items-end gap-6 mb-16">
          <div>
            <SectionEyebrow dark={dark}>SELECTED WORK</SectionEyebrow>
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: dark ? "#F8FAFC" : "#0F172A" }} className="text-3xl lg:text-[2.6rem] leading-tight max-w-xl">
              A portfolio of contemporary spaces
            </h2>
          </div>
          <GhostButton onClick={() => setPage("projects")} dark={dark}>All Projects</GhostButton>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {featured.map((p, i) => (
            <Reveal key={p.title} delay={i * 70}>
              <ProjectCard p={p} dark={dark} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, dark }) {
  return (
    <div className="group relative overflow-hidden cursor-pointer">
      <div className="relative h-72 overflow-hidden">
        <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 transition-opacity duration-500" style={{ background: "linear-gradient(180deg, rgba(15,23,42,0) 40%, rgba(15,23,42,0.92) 100%)" }} />
        <span className="absolute top-4 left-4 px-3 py-1 text-[10px] tracking-widest" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, background: "rgba(200,155,60,0.92)", color: "#0F172A" }}>{p.cat.toUpperCase()}</span>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-1.5 mb-1.5" style={{ color: "#C89B3C" }}><MapPin size={12} /><span style={{ fontFamily: "Inter, sans-serif", fontSize: 11.5 }}>{p.location}</span></div>
          <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "#F8FAFC" }} className="text-lg mb-2">{p.title}</h3>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#CBD5E1", lineHeight: 1.6 }} className="max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-500 overflow-hidden">{p.desc}</p>
          <span className="inline-flex items-center gap-1.5 mt-3 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "#C89B3C" }}>PROJECT DETAILS <ArrowUpRight size={13} /></span>
        </div>
      </div>
    </div>
  );
}

function ProcessTimeline({ dark }) {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-10" style={{ background: dark ? "#0B1220" : "#FFFFFF" }}>
      <div className="max-w-5xl mx-auto">
        <Reveal className="max-w-2xl mb-16">
          <SectionEyebrow dark={dark}>OUR PROCESS</SectionEyebrow>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: dark ? "#F8FAFC" : "#0F172A" }} className="text-3xl lg:text-[2.6rem] leading-tight">
            Eight stages, one accountable team
          </h2>
        </Reveal>
        <div className="relative pl-10 sm:pl-16">
          <span className="absolute top-2 bottom-2 left-3 sm:left-5" style={{ width: 1, background: dark ? "rgba(200,155,60,0.3)" : "rgba(200,155,60,0.35)" }} />
          {PROCESS_STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 60} className="relative pb-12 last:pb-0">
              <span className="absolute -left-10 sm:-left-16 top-0 flex items-center justify-center" style={{ width: 24, height: 24, borderRadius: "50%", background: dark ? "#0B1220" : "#FFFFFF", border: "1px solid #C89B3C" }}>
                <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 10, color: "#C89B3C" }}>{String(i + 1).padStart(2, "0")}</span>
              </span>
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: dark ? "#F8FAFC" : "#0F172A" }} className="text-lg mb-2">{s.title}</h3>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: dark ? "#94A3B8" : "#64748B", lineHeight: 1.7, maxWidth: 520 }}>{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats({ dark }) {
  return (
    <section className="py-20 px-6 lg:px-10" style={{ background: "#0F172A" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "#C89B3C" }} className="text-4xl lg:text-5xl mb-2"><Counter value={s.value} suffix={s.suffix} /></div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#94A3B8", letterSpacing: "0.02em" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials({ dark }) {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-10" style={{ background: dark ? "#0F172A" : "#F8FAFC" }}>
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <SectionEyebrow dark={dark}><span className="mx-auto">CLIENT TESTIMONIALS</span></SectionEyebrow>
        </Reveal>
        <Reveal delay={80}>
          <Quote size={36} style={{ color: "#C89B3C", opacity: 0.4 }} className="mx-auto mb-6" />
          <p key={i} style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, color: dark ? "#F8FAFC" : "#0F172A" }} className="text-xl lg:text-2xl leading-relaxed mb-8">"{t.quote}"</p>
          <div className="flex justify-center gap-1 mb-4">{Array.from({ length: t.rating }).map((_, k) => <Star key={k} size={15} fill="#C89B3C" color="#C89B3C" />)}</div>
          <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: dark ? "#F8FAFC" : "#0F172A" }}>{t.name}</div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: dark ? "#94A3B8" : "#64748B" }}>{t.role}</div>
        </Reveal>
        <div className="flex justify-center gap-2 mt-9">
          {TESTIMONIALS.map((_, k) => (
            <button key={k} onClick={() => setI(k)} style={{ width: k === i ? 24 : 8, height: 3, background: k === i ? "#C89B3C" : (dark ? "rgba(255,255,255,0.2)" : "rgba(15,23,42,0.15)"), transition: "all 0.3s" }} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnersStrip({ dark }) {
  return (
    <section className="py-14 px-6 lg:px-10 overflow-hidden" style={{ background: dark ? "#0B1220" : "#FFFFFF", borderTop: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.06)"}`, borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.06)"}` }}>
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-12 gap-y-4">
        {PARTNERS.map((p) => (
          <span key={p} style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: 12.5, letterSpacing: "0.04em", color: dark ? "#64748B" : "#94A3B8" }}>{p}</span>
        ))}
      </div>
    </section>
  );
}

function CallToAction({ setPage }) {
  return (
    <section className="relative py-28 px-6 lg:px-10 overflow-hidden" style={{ background: "#0F172A" }}>
      <img src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=80" alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(15,23,42,0.97) 20%, rgba(15,23,42,0.6) 100%)" }} />
      <div className="relative max-w-4xl mx-auto text-center">
        <Reveal>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "#F8FAFC" }} className="text-3xl lg:text-[2.6rem] leading-tight mb-6">
            Ready to build something that lasts generations?
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", color: "#94A3B8" }} className="mb-10 max-w-xl mx-auto">
            Book a consultation with our design team and bring your vision to a licensed architect's table.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <GoldButton onClick={() => setPage("projects")}>Explore Projects</GoldButton>
            <GhostButton onClick={() => setPage("contact")} dark>Book a Consultation</GhostButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- FOOTER ----------------------------------- */

function Footer({ dark, setPage }) {
  return (
    <footer style={{ background: "#070B14", borderTop: "1px solid rgba(255,255,255,0.06)" }} className="pt-20 pb-8 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-14">
        <div>
          <Logo dark />
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#64748B", lineHeight: 1.8 }} className="mt-6 max-w-xs">
            Architectural design, construction consultancy, and interior solutions for landmark spaces across Nigeria.
          </p>
        </div>
        <div>
          <h4 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "#F8FAFC" }} className="text-sm mb-5 tracking-wide">QUICK LINKS</h4>
          <div className="flex flex-col gap-3">
            {NAV_PAGES.map((p) => <button key={p} onClick={() => { setPage(p); window.scrollTo(0, 0); }} className="text-left capitalize hover:text-[#C89B3C] transition-colors" style={{ fontFamily: "Inter, sans-serif", fontSize: 13.5, color: "#94A3B8" }}>{p}</button>)}
          </div>
        </div>
        <div>
          <h4 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "#F8FAFC" }} className="text-sm mb-5 tracking-wide">SERVICES</h4>
          <div className="flex flex-col gap-3">
            {SERVICE_CATEGORIES.map((c) => <span key={c} style={{ fontFamily: "Inter, sans-serif", fontSize: 13.5, color: "#94A3B8" }}>{c}</span>)}
          </div>
        </div>
        <div>
          <h4 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "#F8FAFC" }} className="text-sm mb-5 tracking-wide">CONTACT</h4>
          <div className="flex flex-col gap-3.5" style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#94A3B8" }}>
            <div className="flex gap-2.5"><MapPin size={15} className="mt-0.5 flex-shrink-0" style={{ color: "#C89B3C" }} /><span>Innovation District, Victoria Island, Lagos, Nigeria</span></div>
            <div className="flex gap-2.5"><Phone size={15} className="flex-shrink-0" style={{ color: "#C89B3C" }} /><span>+234 800 000 0000</span></div>
            <div className="flex gap-2.5"><Clock size={15} className="mt-0.5 flex-shrink-0" style={{ color: "#C89B3C" }} /><span>Monday – Friday, 9:00 AM – 6:00 PM</span></div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#475569" }}>© {new Date().getFullYear()} Nexora Studio. Concept Project. All rights reserved.</span>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#475569" }}>Architecture · Interior Design · Construction Consultancy · Lagos, Nigeria</span>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#475569", display: "block", textAlign: "center", marginTop: 6 }}>Nexora Studio is a fictional architecture brand created exclusively to demonstrate frontend development, UI/UX design, and responsive web development skills.</span>
      </div>
    </footer>
  );
}

/* --------------------------------- FLOATING UI ------------------------------ */

function Floating({ dark }) {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const h = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
      {/* {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="w-11 h-11 flex items-center justify-center transition-transform hover:-translate-y-1" style={{ background: dark ? "#1E293B" : "#0F172A", color: "#F8FAFC", borderRadius: "50%" }} aria-label="Back to top">
          <ChevronUp size={18} />
        </button>
      )} */}
      {/* <a href="tel:+2348000000000" className="w-12 h-12 flex items-center justify-center transition-transform hover:-translate-y-1" style={{ background: "#0F172A", color: "#F8FAFC", borderRadius: "50%" }} aria-label="Call us">
        <Phone size={18} />
      </a> */}
      <a href="https://wa.me/2348000000000" target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center transition-transform hover:-translate-y-1" style={{ background: "#25D366", color: "#fff", borderRadius: "50%" }} aria-label="WhatsApp us">
        <FaWhatsapp size={24} />
      </a>
    </div>
  );
}

/* ------------------------------- PAGE: ABOUT -------------------------------- */

function AboutPage({ dark }) {
  const values = [
    { title: "Design Excellence", desc: "Every concept is developed with clarity, proportion, and a strong spatial narrative." },
    { title: "Innovation", desc: "Modern tools and forward-thinking design strategies keep each project fresh and future-ready." },
    { title: "Sustainability", desc: "Environmental awareness is embedded in material choices, planning, and long-term performance." },
    { title: "Integrity", desc: "Honest communication and disciplined delivery underpin everything we create." },
    { title: "Collaboration", desc: "We bring together clients, consultants, and ideas in a shared design process." },
    { title: "Quality Craftsmanship", desc: "Precision and detail are treated as essential parts of the architectural experience." },
  ];
  const team = [
    { name: "Arc. Oluwaseun Adewale", role: "Principal Architect", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
    { name: "Arc. Temitope Bello", role: "Design Director", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" },
    { name: "Eng. Chukwuemeka Uzo", role: "Head of Construction", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80" },
    { name: "Ibukun Fashola", role: "Interior Design Lead", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80" },
  ];
  return (
    <div style={{ background: dark ? "#0B1220" : "#FFFFFF" }}>
      <section className="relative h-[52vh] min-h-[420px] flex items-end" style={{ background: "#0F172A" }}>
        <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=80" alt="" className="absolute inset-0 w-full h-full object-cover opacity-35" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(15,23,42,0.4) 0%, rgba(15,23,42,0.96) 100%)" }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pb-16 w-full">
          <SectionEyebrow dark>ABOUT NEXORA STUDIO</SectionEyebrow>
          <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "#F8FAFC" }} className="text-4xl lg:text-6xl">Our Story</h1>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p style={{ fontFamily: "Inter, sans-serif", color: dark ? "#94A3B8" : "#64748B", lineHeight: 1.9 }} className="text-lg mb-6">
              Nexora Studio is a fictional architecture and design practice created as a portfolio concept to showcase premium architectural design, interior planning, and construction consultancy.
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", color: dark ? "#94A3B8" : "#64748B", lineHeight: 1.9 }} className="text-lg">
              The studio focuses on creating functional, elegant, and sustainable spaces for residential, commercial, and mixed-use developments. Driven by creativity and precision, Nexora Studio blends modern architecture with practical solutions to deliver timeless environments that elevate everyday living and business experiences.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-4 px-6 lg:px-10 pb-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { t: "Mission", d: "To design and deliver spaces that improve how people live, work, and worship, through disciplined architecture and honest construction." },
            { t: "Vision", d: "To be Nigeria's most trusted name in landmark architecture and construction consultancy." },
            { t: "Philosophy", d: "Great architecture is quiet confidence — it serves the people inside it before it impresses the people outside it." },
          ].map((b, i) => (
            <Reveal key={b.t} delay={i * 80}>
              <div className="p-9 h-full" style={{ background: dark ? "#0F172A" : "#F8FAFC", borderTop: "2px solid #C89B3C" }}>
                <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: dark ? "#F8FAFC" : "#0F172A" }} className="text-xl mb-3">{b.t}</h3>
                <p style={{ fontFamily: "Inter, sans-serif", color: dark ? "#94A3B8" : "#64748B", lineHeight: 1.75, fontSize: 14.5 }}>{b.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 lg:px-10" style={{ background: dark ? "#0F172A" : "#F8FAFC" }}>
        <div className="max-w-7xl mx-auto">
          <Reveal className="max-w-2xl mb-14"><SectionEyebrow dark={dark}>CORE VALUES</SectionEyebrow>
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: dark ? "#F8FAFC" : "#0F172A" }} className="text-3xl lg:text-4xl leading-tight">What guides every decision we make</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 70}>
                <div className="p-7 h-full" style={{ background: dark ? "#0B1220" : "#FFFFFF", border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(15,23,42,0.07)"}` }}>
                  <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "#C89B3C" }} className="text-base mb-2.5">{v.title}</h3>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13.5, color: dark ? "#94A3B8" : "#64748B", lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="max-w-2xl mb-14"><SectionEyebrow dark={dark}>MEET OUR TEAM</SectionEyebrow>
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: dark ? "#F8FAFC" : "#0F172A" }} className="text-3xl lg:text-4xl leading-tight">The creative minds behind every concept</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 70}>
                <div className="text-center">
                  <div className="h-64 mb-5 overflow-hidden"><img src={m.img} alt={m.name} className="w-full h-full object-cover" /></div>
                  <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: dark ? "#F8FAFC" : "#0F172A" }} className="text-base">{m.name}</h3>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#C89B3C" }}>{m.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProcessTimeline dark={dark} />

      <section className="py-24 px-6 lg:px-10" style={{ background: dark ? "#0F172A" : "#F8FAFC" }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
          <Reveal className="p-10" >
            <div style={{ background: dark ? "#0B1220" : "#FFFFFF", border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(15,23,42,0.07)"}` }} className="p-10 h-full">
              <ShieldCheck size={30} style={{ color: "#C89B3C" }} strokeWidth={1.5} />
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: dark ? "#F8FAFC" : "#0F172A" }} className="text-2xl mt-5 mb-3">Commitment to Quality</h3>
              <p style={{ fontFamily: "Inter, sans-serif", color: dark ? "#94A3B8" : "#64748B", lineHeight: 1.8 }}>Every project is shaped with a rigorous design process and a commitment to lasting quality from concept through completion.</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ background: dark ? "#0B1220" : "#FFFFFF", border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(15,23,42,0.07)"}` }} className="p-10 h-full">
              <TreePine size={30} style={{ color: "#C89B3C" }} strokeWidth={1.5} />
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: dark ? "#F8FAFC" : "#0F172A" }} className="text-2xl mt-5 mb-3">Innovation & Sustainability</h3>
              <p style={{ fontFamily: "Inter, sans-serif", color: dark ? "#94A3B8" : "#64748B", lineHeight: 1.8 }}>Sustainable design thinking, careful detailing, and spatial intelligence are woven into each concept from the earliest sketches.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------ PAGE: SERVICES ------------------------------ */

function ServicesPage({ dark }) {
  const [activeCat, setActiveCat] = useState("All");
  const cats = ["All", ...SERVICE_CATEGORIES];
  const list = activeCat === "All" ? SERVICES : SERVICES.filter(s => s.cat === activeCat);
  return (
    <div style={{ background: dark ? "#0B1220" : "#FFFFFF" }}>
      <section className="relative h-[46vh] min-h-[360px] flex items-end" style={{ background: "#0F172A" }}>
        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80" alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(15,23,42,0.4) 0%, rgba(15,23,42,0.96) 100%)" }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pb-14 w-full">
          <SectionEyebrow dark>OUR SERVICES</SectionEyebrow>
          <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "#F8FAFC" }} className="text-4xl lg:text-6xl">Design services for every stage of the journey</h1>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-14">
            {cats.map((c) => (
              <button key={c} onClick={() => setActiveCat(c)} className="px-5 py-2.5 text-xs transition-all"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, letterSpacing: "0.03em", background: activeCat === c ? "#C89B3C" : "transparent", color: activeCat === c ? "#0F172A" : (dark ? "#94A3B8" : "#64748B"), border: `1px solid ${activeCat === c ? "#C89B3C" : (dark ? "rgba(255,255,255,0.15)" : "rgba(15,23,42,0.15)")}` }}>
                {c}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {list.map((s, i) => (
              <Reveal key={s.title} delay={(i % 6) * 60}>
                <div className="p-9 h-full relative" style={{ background: dark ? "#0F172A" : "#F8FAFC", border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(15,23,42,0.07)"}` }}>
                  <DraftMarks dark={dark} />
                  <div className="flex items-start justify-between mb-5">
                    <s.icon size={30} style={{ color: "#C89B3C" }} strokeWidth={1.5} />
                    <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 10.5, fontWeight: 600, letterSpacing: "0.1em", color: dark ? "#64748B" : "#94A3B8" }}>{s.cat.toUpperCase()}</span>
                  </div>
                  <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: dark ? "#F8FAFC" : "#0F172A" }} className="text-xl mb-3">{s.title}</h3>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: dark ? "#94A3B8" : "#64748B", lineHeight: 1.75 }} className="mb-6">{s.overview}</p>

                  <div className="mb-5">
                    <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: "#C89B3C" }} className="mb-2.5">KEY BENEFITS</div>
                    <div className="flex flex-col gap-2">
                      {s.benefits.map((b) => <div key={b} className="flex items-center gap-2"><Check size={13} style={{ color: "#C89B3C" }} /><span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: dark ? "#CBD5E1" : "#334155" }}>{b}</span></div>)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-5" style={{ borderTop: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)"}` }}>
                    <div>
                      <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 10.5, fontWeight: 600, letterSpacing: "0.08em", color: dark ? "#64748B" : "#94A3B8" }}>TIMELINE</div>
                      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: dark ? "#F8FAFC" : "#0F172A" }}>{s.timeline}</div>
                    </div>
                    <div className="text-right">
                      <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 10.5, fontWeight: 600, letterSpacing: "0.08em", color: dark ? "#64748B" : "#94A3B8" }}>DELIVERABLES</div>
                      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: dark ? "#F8FAFC" : "#0F172A" }}>{s.deliverables.length} items</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CallToActionInline dark={dark} />
    </div>
  );
}

function CallToActionInline({ dark }) {
  return (
    <section className="py-20 px-6 lg:px-10 text-center" style={{ background: dark ? "#0F172A" : "#F8FAFC" }}>
      <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: dark ? "#F8FAFC" : "#0F172A" }} className="text-2xl lg:text-3xl mb-6">Not sure which service fits your next project?</h3>
      <GoldButton onClick={() => window.scrollTo(0, 0)}>Talk To Our Team</GoldButton>
    </section>
  );
}

/* ------------------------------ PAGE: PROJECTS ------------------------------ */

function ProjectsPage({ dark }) {
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? PROJECTS : PROJECTS.filter(p => p.cat === cat);
  return (
    <div style={{ background: dark ? "#0B1220" : "#FFFFFF" }}>
      <section className="relative h-[46vh] min-h-[360px] flex items-end" style={{ background: "#0F172A" }}>
        <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=80" alt="" className="absolute inset-0 w-full h-full object-cover opacity-35" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(15,23,42,0.4) 0%, rgba(15,23,42,0.96) 100%)" }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pb-14 w-full">
          <SectionEyebrow dark>OUR PORTFOLIO</SectionEyebrow>
          <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "#F8FAFC" }} className="text-4xl lg:text-6xl">Spaces shaped for modern living</h1>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-14">
            {PROJECT_CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCat(c)} className="px-5 py-2.5 text-xs transition-all"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, background: cat === c ? "#C89B3C" : "transparent", color: cat === c ? "#0F172A" : (dark ? "#94A3B8" : "#64748B"), border: `1px solid ${cat === c ? "#C89B3C" : (dark ? "rgba(255,255,255,0.15)" : "rgba(15,23,42,0.15)")}` }}>
                {c}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {list.map((p, i) => (
              <Reveal key={p.title} delay={(i % 6) * 60}><ProjectCard p={p} dark={dark} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      <BeforeAfter dark={dark} />
      <Stats dark={dark} />
    </div>
  );
}

function BeforeAfter({ dark }) {
  const [pos, setPos] = useState(50);
  return (
    <section className="py-24 px-6 lg:px-10" style={{ background: dark ? "#0F172A" : "#F8FAFC" }}>
      <div className="max-w-5xl mx-auto">
        <Reveal className="max-w-xl mb-12">
          <SectionEyebrow dark={dark}>RENOVATION SPOTLIGHT</SectionEyebrow>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: dark ? "#F8FAFC" : "#0F172A" }} className="text-3xl leading-tight">The Willow Villa — drag to compare</h2>
        </Reveal>
        <div className="relative h-[420px] select-none" style={{ touchAction: "none" }}>
          <img src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80" alt="After renovation" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
            <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80" alt="Before renovation" className="h-full object-cover" style={{ width: "420px", maxWidth: "none" }} />
          </div>
          <div className="absolute top-0 bottom-0" style={{ left: `${pos}%`, width: 2, background: "#C89B3C", transform: "translateX(-1px)" }} />
          <div className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center" style={{ left: `${pos}%`, transform: "translate(-50%,-50%)", width: 40, height: 40, borderRadius: "50%", background: "#C89B3C" }}>
            <ChevronRight size={14} style={{ color: "#0F172A", marginRight: -4 }} />
            <ChevronRight size={14} style={{ color: "#0F172A", transform: "rotate(180deg)", marginLeft: -4 }} />
          </div>
          <input type="range" min="0" max="100" value={pos} onChange={(e) => setPos(Number(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize" aria-label="Before and after comparison slider" />
          <span className="absolute top-4 left-4 px-3 py-1 text-[10px]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, background: "rgba(15,23,42,0.7)", color: "#F8FAFC" }}>BEFORE</span>
          <span className="absolute top-4 right-4 px-3 py-1 text-[10px]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, background: "rgba(200,155,60,0.9)", color: "#0F172A" }}>AFTER</span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ PAGE: CONTACT ------------------------------- */

function ContactPage({ dark }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "", budget: "", date: "", location: "", message: "" });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = (e) => { e.preventDefault(); setSent(true); };

  const inputStyle = { fontFamily: "Inter, sans-serif", fontSize: 14, background: dark ? "#0B1220" : "#F8FAFC", color: dark ? "#F8FAFC" : "#0F172A", border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.12)"}`, padding: "13px 16px", width: "100%", outline: "none" };
  const labelStyle = { fontFamily: "Poppins, sans-serif", fontSize: 11.5, fontWeight: 600, letterSpacing: "0.05em", color: dark ? "#94A3B8" : "#64748B", marginBottom: 8, display: "block" };

  return (
    <div style={{ background: dark ? "#0B1220" : "#FFFFFF" }}>
      <section className="relative h-[42vh] min-h-[320px] flex items-end" style={{ background: "#0F172A" }}>
        <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=80" alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(15,23,42,0.4) 0%, rgba(15,23,42,0.96) 100%)" }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pb-14 w-full">
          <SectionEyebrow dark>GET IN TOUCH</SectionEyebrow>
          <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "#F8FAFC" }} className="text-4xl lg:text-6xl">Let's design what's next</h1>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2">
            <Reveal>
              <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: dark ? "#F8FAFC" : "#0F172A" }} className="text-2xl mb-8">Visit or reach us</h2>
              <div className="flex flex-col gap-7 mb-10">
                <div className="flex gap-4"><MapPin size={20} style={{ color: "#C89B3C" }} className="flex-shrink-0 mt-1" /><div><div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: dark ? "#F8FAFC" : "#0F172A" }} className="mb-1">Address</div><p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: dark ? "#94A3B8" : "#64748B", lineHeight: 1.7 }}>Innovation District, Victoria Island, Lagos, Nigeria</p></div></div>
                <div className="flex gap-4"><Phone size={20} style={{ color: "#C89B3C" }} className="flex-shrink-0 mt-1" /><div><div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: dark ? "#F8FAFC" : "#0F172A" }} className="mb-1">Phone</div><p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: dark ? "#94A3B8" : "#64748B" }}>+234 800 000 0000</p></div></div>
                <div className="flex gap-4"><Clock size={20} style={{ color: "#C89B3C" }} className="flex-shrink-0 mt-1" /><div><div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: dark ? "#F8FAFC" : "#0F172A" }} className="mb-1">Business Hours</div><p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: dark ? "#94A3B8" : "#64748B" }}>Monday – Friday, 9:00 AM – 6:00 PM</p></div></div>
                <div className="flex gap-4"><Mail size={20} style={{ color: "#C89B3C" }} className="flex-shrink-0 mt-1" /><div><div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: dark ? "#F8FAFC" : "#0F172A" }} className="mb-1">Email</div><p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: dark ? "#94A3B8" : "#64748B" }}>hello@nexorastudio.design</p></div></div>
              </div>
              <a href="https://wa.me/2348000000000" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2.5 px-6 py-3 text-sm mb-8" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, background: "#25D366", color: "#fff" }}><MessageCircle size={16} /> Chat on WhatsApp</a>
              <div className="w-full h-64 overflow-hidden" style={{ background: dark ? "#0F172A" : "#F8FAFC", border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)"}` }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1014756.9317317619!2d2.8772983577518967!3d6.535035912837754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf2bae227550d%3A0xe771ad7f1bbe89d6!2sLagos!5e0!3m2!1sen!2sng!4v1785157340701!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Nexora Studio Lagos location"
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            <Reveal delay={100}>
              {sent ? (
                <div className="p-10 text-center" style={{ background: dark ? "#0F172A" : "#F8FAFC", border: "1px solid #C89B3C" }}>
                  <Check size={30} style={{ color: "#C89B3C" }} className="mx-auto mb-4" />
                  <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: dark ? "#F8FAFC" : "#0F172A" }} className="text-xl mb-2">Message received</h3>
                  <p style={{ fontFamily: "Inter, sans-serif", color: dark ? "#94A3B8" : "#64748B" }}>Thank you for reaching out — our team will contact you within one business day.</p>
                </div>
              ) : (
                <form onSubmit={submit} className="grid sm:grid-cols-2 gap-6">
                  <div><label style={labelStyle}>FULL NAME</label><input required style={inputStyle} value={form.name} onChange={update("name")} placeholder="Your full name" /></div>
                  <div><label style={labelStyle}>EMAIL ADDRESS</label><input required type="email" style={inputStyle} value={form.email} onChange={update("email")} placeholder="you@email.com" /></div>
                  <div><label style={labelStyle}>PHONE NUMBER</label><input required style={inputStyle} value={form.phone} onChange={update("phone")} placeholder="080..." /></div>
                  <div><label style={labelStyle}>PROJECT TYPE</label>
                    <select style={inputStyle} value={form.type} onChange={update("type")}>
                      <option value="">Select project type</option>
                      {["Residential Design", "Commercial Design", "Renovation", "Interior Design", "Construction Consultancy", "Other"].map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div><label style={labelStyle}>ESTIMATED BUDGET</label>
                    <select style={inputStyle} value={form.budget} onChange={update("budget")}>
                      <option value="">Select a range</option>
                      {["Under ₦20m", "₦20m – ₦50m", "₦50m – ₦150m", "₦150m and above"].map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div><label style={labelStyle}>PREFERRED START DATE</label><input type="date" style={inputStyle} value={form.date} onChange={update("date")} /></div>
                  <div className="sm:col-span-2"><label style={labelStyle}>PROJECT LOCATION</label><input style={inputStyle} value={form.location} onChange={update("location")} placeholder="City, State" /></div>
                  <div className="sm:col-span-2"><label style={labelStyle}>MESSAGE</label><textarea rows={5} style={{ ...inputStyle, resize: "none" }} value={form.message} onChange={update("message")} placeholder="Tell us about your project" /></div>
                  <div className="sm:col-span-2"><GoldButton>Send Message</GoldButton></div>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-10" style={{ background: dark ? "#0F172A" : "#F8FAFC" }}>
        <div className="max-w-3xl mx-auto">
          <Reveal className="mb-12 text-center">
            <SectionEyebrow dark={dark}><span className="mx-auto">FAQ</span></SectionEyebrow>
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: dark ? "#F8FAFC" : "#0F172A" }} className="text-3xl">Frequently asked questions</h2>
          </Reveal>
          <div className="flex flex-col gap-3">
            {FAQS.map((f, i) => (
              <div key={f.q} style={{ background: dark ? "#0B1220" : "#FFFFFF", border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)"}` }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-6 py-5 text-left">
                  <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 14.5, color: dark ? "#F8FAFC" : "#0F172A" }}>{f.q}</span>
                  {openFaq === i ? <Minus size={16} style={{ color: "#C89B3C" }} className="flex-shrink-0 ml-4" /> : <Plus size={16} style={{ color: "#C89B3C" }} className="flex-shrink-0 ml-4" />}
                </button>
                <div style={{ maxHeight: openFaq === i ? 200 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13.5, color: dark ? "#94A3B8" : "#64748B", lineHeight: 1.75 }} className="px-6 pb-6">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------------------------- ROOT ------------------------------------ */

export default function App() {
  const [page, setPage] = useState("home");
  const dark = false;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{ background: dark ? "#0B1220" : "#FFFFFF", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        button, a, [role="button"] { cursor: pointer; }
        select { appearance: none; }
        input, select, textarea { border-radius: 0; }
        input:focus, select:focus, textarea:focus { border-color: #C89B3C !important; }
        ::selection { background: #C89B3C; color: #0F172A; }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
      `}</style>

      <Nav page={page} setPage={setPage} dark={dark} scrolled={scrolled} />

      {page === "home" && (
        <>
          <Hero setPage={setPage} dark={dark} />
          <AboutPreview dark={dark} setPage={setPage} />
          <FeaturedServices dark={dark} setPage={setPage} />
          <WhyChooseUs dark={dark} />
          <FeaturedProjects dark={dark} setPage={setPage} />
          <ProcessTimeline dark={dark} />
          <Stats dark={dark} />
          <Testimonials dark={dark} />
          <PartnersStrip dark={dark} />
          <CallToAction setPage={setPage} />
        </>
      )}
      {page === "about" && <AboutPage dark={dark} />}
      {page === "services" && <ServicesPage dark={dark} />}
      {page === "projects" && <ProjectsPage dark={dark} />}
      {page === "contact" && <ContactPage dark={dark} />}

      <section className="py-4" style={{ background: dark ? "#0F172A" : "#F8FAFC" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex flex-wrap justify-center gap-x-8 gap-y-2">
          {TRUST_BADGES.map((b) => (
            <span key={b} className="flex items-center gap-1.5" style={{ fontFamily: "Inter, sans-serif", fontSize: 11.5, color: dark ? "#64748B" : "#94A3B8" }}>
              <ShieldCheck size={12} style={{ color: "#C89B3C" }} /> {b}
            </span>
          ))}
        </div>
      </section>

      <Footer dark={dark} setPage={setPage} />
      <Floating dark={dark} />
    </div>
  );
}