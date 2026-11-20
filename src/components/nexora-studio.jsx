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

/* IMAGE LIBRARY */

const U = (id, w = 1800) => `https://unsplash.com/photos/${id}/download?force=true&w=${w}`;

const HOME_HERO = U("J2GhKlTKV9M", 1600);

const PAGE_HEROES = {
  about: U("a8Slhd4Kvxw"),
  services: U("2HIFbbo8LLw"),
  projects: U("1lFIgkExOxw"),
  contact: U("Xs0Run-Z5aw"),
};

const PRELOAD_IMAGES = Object.values(PAGE_HEROES);

const PROJECTS = [
  { title: "Horizon Residence", cat: "Luxury Homes", location: "Lagos, Nigeria", desc: "A sculptural coastal home framed by open terraces, private courtyards, and panoramic views.", img: U("hHz4yrvxwlA", 1400) },
  { title: "Skyline Business Hub", cat: "Commercial Buildings", location: "Victoria Island, Lagos", desc: "A mixed-use business landmark defined by intelligent facades, flexible work zones, and elevated amenity.", img: U("LdzsHY_6In4", 1400) },
  { title: "The Willow Villa", cat: "Modern Villas", location: "Abuja, Nigeria", desc: "An elegant family villa centred around a landscaped courtyard and seamless indoor-outdoor living.", img: U("u1iFdXU1tl0", 1400) },
  { title: "Aurora Office Tower", cat: "Office Complexes", location: "Ikoyi, Lagos", desc: "A refined headquarters that balances light, acoustics, and a calm, contemporary corporate identity.", img: U("26MEa00pvbQ", 1400) },
  { title: "Green Haven Apartments", cat: "Apartment Buildings", location: "Lekki, Lagos", desc: "A residential collection with generous balconies, landscaped pockets, and a measured sense of privacy.", img: U("KkYihWTf6Tw", 1400) },
  { title: "Crestview Hotel", cat: "Hotels", location: "Abuja, Nigeria", desc: "A boutique hospitality concept where warm materials, curated circulation, and understated luxury meet.", img: U("eJlISrE0usI", 1400) },
  { title: "Harmony Learning Centre", cat: "Schools", location: "Port Harcourt, Nigeria", desc: "A learning environment shaped around adaptability, daylight, and collaborative social spaces.", img: U("EUgLMtR13Ac", 1400) },
  { title: "Nova Retail Plaza", cat: "Retail", location: "Lagos, Nigeria", desc: "A destination retail experience anchored by an airy promenade, signature storefronts, and flexible tenant planning.", img: U("Ckjt9861adU", 1400) },
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

/* TOWER AND MARQUEE DATA */

const TOWER_BLOCKS = [
  { w: 14, d: 14, h: 70, y: 0 },
  { w: 110, d: 90, h: 110, y: 70 },
  { w: 160, d: 130, h: 130, y: 180 },
  { w: 220, d: 180, h: 60, y: 310 },
];

const MARQUEE_ITEMS = ["ARCHITECTURE", "INTERIOR DESIGN", "CONSTRUCTION", "3D VISUALIZATION", "SITE SUPERVISION"];

/* ------------------------------- HELPERS ---------------------------------- */

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setVisible(true); return; }
    const obs = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useImgReady(fallbackMs = 0) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth > 0) setReady(true);
    if (!fallbackMs) return;
    const t = setTimeout(() => setReady(true), fallbackMs);
    return () => clearTimeout(t);
  }, []);
  return [ref, ready, () => setReady(true)];
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

/* MOTION HELPERS */

function ParallaxLayer({ children, speed = 0.18 }) {
  const ref = useRef(null);
  useEffect(() => {
    let raf = null;
    const update = () => {
      raf = null;
      if (ref.current) ref.current.style.transform = `translate3d(0, ${window.scrollY * speed}px, 0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);
  return <div ref={ref} className="absolute inset-x-0 -top-[20%] bottom-0 will-change-transform">{children}</div>;
}

function Scrim({ show, strength = 0.6 }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `linear-gradient(to top, rgba(23,23,23,${strength}) 0%, rgba(23,23,23,${strength * 0.4}) 45%, rgba(23,23,23,0) 80%)`,
        opacity: show ? 1 : 0,
        transition: "opacity 1.2s ease 0.4s",
      }}
    />
  );
}

function ImageWipe({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={className}>
      <div
        className="h-full"
        style={{ clipPath: visible ? "inset(0 0 0 0)" : "inset(0 0 100% 0)", transition: `clip-path 1.2s cubic-bezier(.77,0,.18,1) ${delay}ms` }}>
        {children}
      </div>
    </div>
  );
}

function ScrollProgress() {
  const barRef = useRef(null);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none" style={{ height: 3 }}>
      <div ref={barRef} className="h-full origin-left" style={{ background: "#B56A35", transform: "scaleX(0)" }} />
    </div>
  );
}

/* ARCHITECT CURSOR */

function ArchCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const hotRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.documentElement.classList.add("nx-cursor");
    let x = 0, y = 0, rx = 0, ry = 0, raf;

    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.opacity = 1;
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      if (ringRef.current) ringRef.current.style.opacity = 1;
      if (labelRef.current) {
        labelRef.current.textContent = `X ${String(Math.round(x)).padStart(4, "0")} / Y ${String(Math.round(y + window.scrollY)).padStart(4, "0")}`;
      }
      if (hotRef.current) hotRef.current.classList.toggle("is-hot", !!e.target.closest("button, a, input, select, textarea"));
    };

    const loop = () => {
      rx += (x - rx) * 0.14;
      ry += (y - ry) * 0.14;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("nx-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="fixed top-0 left-0 z-[79] pointer-events-none" style={{ opacity: 0 }}>
        <div ref={hotRef} className="nx-ring" />
      </div>
      <div ref={dotRef} className="fixed top-0 left-0 z-[80] pointer-events-none" style={{ opacity: 0 }}>
        <span className="absolute" style={{ left: -10, top: 0, width: 20, height: 1, background: "#B56A35" }} />
        <span className="absolute" style={{ left: 0, top: -10, width: 1, height: 20, background: "#B56A35" }} />
        <span ref={labelRef} className="absolute whitespace-nowrap" style={{ left: 18, top: 16, fontFamily: "DM Sans, sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "#B56A35", textShadow: "0 1px 8px rgba(0,0,0,0.55)" }} />
      </div>
    </>
  );
}

/* HERO GRID */

function HeroGrid() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el && el.parentElement;
    if (!parent) return;
    const move = (e) => {
      const r = parent.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    parent.addEventListener("mousemove", move);
    return () => parent.removeEventListener("mousemove", move);
  }, []);

  return <div ref={ref} className="nx-grid absolute inset-0 pointer-events-none" />;
}

/* WIREFRAME TOWER */

function WireBox({ w, d, h, y }) {
  const base = {
    position: "absolute",
    border: "2px solid #E08A45",
    backgroundColor: "rgba(23,23,23,0.22)",
    backgroundImage: "repeating-linear-gradient(0deg, transparent 0 17px, rgba(224,138,69,0.6) 17px 19px), repeating-linear-gradient(90deg, transparent 0 17px, rgba(224,138,69,0.6) 17px 19px)",
  };
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 0, height: 0, transformStyle: "preserve-3d", transform: `translateY(${y}px)` }}>
      <div style={{ ...base, width: w, height: h, left: -w / 2, top: 0, transform: `translateZ(${d / 2}px)` }} />
      <div style={{ ...base, width: w, height: h, left: -w / 2, top: 0, transform: `rotateY(180deg) translateZ(${d / 2}px)` }} />
      <div style={{ ...base, width: d, height: h, left: -d / 2, top: 0, transform: `rotateY(90deg) translateZ(${w / 2}px)` }} />
      <div style={{ ...base, width: d, height: h, left: -d / 2, top: 0, transform: `rotateY(-90deg) translateZ(${w / 2}px)` }} />
      <div style={{ ...base, width: w, height: d, left: -w / 2, top: -d / 2, transform: "rotateX(90deg)" }} />
    </div>
  );
}

function WireTower() {
  return (
    <div className="nx-tower nx-fade absolute pointer-events-none" style={{ "--d": "1s", width: 300, height: 400, perspective: 1400 }} aria-hidden="true">
      <div className="nx-spin" style={{ position: "relative", width: 300, height: 400, transformStyle: "preserve-3d" }}>
        <div style={{ position: "absolute", left: 150, top: 10, transformStyle: "preserve-3d" }}>
          {TOWER_BLOCKS.map((b) => <WireBox key={b.y} {...b} />)}
          <div style={{ position: "absolute", width: 460, height: 460, left: -230, top: 140, border: "2px dashed rgba(224,138,69,0.9)", backgroundImage: "repeating-linear-gradient(0deg, transparent 0 29px, rgba(224,138,69,0.45) 29px 31px), repeating-linear-gradient(90deg, transparent 0 29px, rgba(224,138,69,0.45) 29px 31px)", transform: "rotateX(90deg)" }} />
        </div>
      </div>
    </div>
  );
}

/* OUTLINE MARQUEE */

function Marquee() {
  const row = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="overflow-hidden py-12 select-none" style={{ background: "#FFFFFF", borderBottom: "1px solid rgba(23,23,23,0.08)" }}>
      <div className="nx-marquee flex w-max items-center">
        {row.map((t, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span className="nx-outline" style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: "clamp(48px, 8vw, 120px)", lineHeight: 1, letterSpacing: "-0.02em", padding: "0 0.4em" }}>{t}</span>
            <span style={{ width: 14, height: 14, background: "#B56A35", transform: "rotate(45deg)" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* TILT CARD */

function Tilt({ children, className = "", max = 8 }) {
  const ref = useRef(null);

  const move = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg) scale3d(1.02,1.02,1.02)`;
  };

  const leave = () => {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
  };

  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={leave} className={className} style={{ transition: "transform 0.5s cubic-bezier(.16,.84,.44,1)" }}>
      {children}
    </div>
  );
}

function PageHero({ image, eyebrow, title, className = "" }) {
  const [imgRef, ready, onReady] = useImgReady(4000);

  return (
    <section className={`relative flex items-end overflow-hidden ${className}`}>
      <ParallaxLayer>
        <img
          ref={imgRef}
          src={image}
          alt=""
          fetchPriority="high"
          loading="eager"
          decoding="async"
          onLoad={onReady}
          onError={onReady}
          className={`nx-reveal-img w-full h-full object-cover${ready ? " is-ready" : ""}`}
        />
      </ParallaxLayer>
      <Scrim show={ready} strength={0.7} />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-14 lg:pb-16 w-full" style={{ visibility: ready ? "visible" : "hidden" }}>
        <div className={ready ? "nx-rise" : ""} style={{ "--d": "0.6s" }}>
          <SectionEyebrow dark>{eyebrow}</SectionEyebrow>
        </div>
        <h1 className={`${ready ? "nx-rise " : ""}text-4xl lg:text-6xl`} style={{ "--d": "0.75s", fontFamily: "DM Sans, sans-serif", fontWeight: 700, color: "#FFFFFF", textShadow: "0 2px 30px rgba(0,0,0,0.45)" }}>{title}</h1>
        <span className={`${ready ? "nx-grow " : ""}block mt-6`} style={{ "--d": "1.1s", width: 96, height: 2, background: "#B56A35" }} />
      </div>
    </section>
  );
}

/* DRAFT MARKS */
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
      <div className="relative w-9 h-9 flex items-center justify-center" style={{ border: `1px solid #B56A35` }}>
        <span style={{ fontFamily: "DM Sans, sans-serif", color: "#B56A35", fontWeight: 700, fontSize: 15 }}>NS</span>
      </div>
      <div style={{ fontFamily: "DM Sans, sans-serif" }}>
        <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: "0.02em", color: dark ? "#FFFFFF" : "#171717", lineHeight: 1.05 }}>NEXORA</div>
        <div style={{ fontWeight: 400, fontSize: 9.5, letterSpacing: "0.3em", color: "#B56A35", lineHeight: 1.1 }}>STUDIO</div>
      </div>
    </div>
  );
}

function GoldButton({ children, onClick, icon: Icon = ArrowRight, className = "" }) {
  const pull = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
  };
  const release = (e) => {
    e.currentTarget.style.transform = "translate(0px, 0px)";
    e.currentTarget.style.background = "#B56A35";
  };
  return (
    <button onClick={onClick}
      className={`group inline-flex items-center gap-2.5 px-7 py-3.5 text-sm tracking-wide transition-all duration-300 ${className}`}
      style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, background: "#B56A35", color: "#171717", borderRadius: 2 }}
      onMouseMove={pull}
      onMouseEnter={e => e.currentTarget.style.background = "#C77A43"}
      onMouseLeave={release}>
      {children}
      <Icon size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
    </button>
  );
}

function GhostButton({ children, onClick, dark }) {
  return (
    <button onClick={onClick}
      className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm tracking-wide transition-all duration-300"
      style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, border: `1px solid ${dark ? "rgba(248,250,252,0.35)" : "rgba(23,23,23,0.22)"}`, color: dark ? "#FFFFFF" : "#171717", borderRadius: 2, background: "transparent" }}>
      {children}
      <ArrowRight size={16} />
    </button>
  );
}

function SectionEyebrow({ children, dark }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span style={{ width: 32, height: 1, background: "#B56A35" }} />
      <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.28em", color: "#B56A35" }}>{children}</span>
    </div>
  );
}

/* ---------------------------------- NAV ------------------------------------ */

function Nav({ page, setPage, dark, scrolled }) {
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  const go = (p) => { setPage(p); setOpen(false); setMegaOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const bg = scrolled || page !== "home" ? (dark ? "rgba(11,18,32,0.92)" : "rgba(255,255,255,0.95)") : "transparent";
  const txt = scrolled || page !== "home" ? (dark ? "#FFFFFF" : "#171717") : "#171717";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500" style={{ background: bg, backdropFilter: (scrolled || page !== "home") ? "blur(14px)" : "none", borderBottom: (scrolled || page !== "home") ? `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(23,23,23,0.08)"}` : "none" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <button onClick={() => go("home")}><Logo dark={txt === "#FFFFFF"} /></button>

        <nav className="hidden lg:flex items-center gap-9" style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13.5, fontWeight: 500, letterSpacing: "0.02em", color: txt }}>
          <button onClick={() => go("home")} className="hover:opacity-70 transition-opacity">Home</button>
          <button onClick={() => go("about")} className="hover:opacity-70 transition-opacity">About</button>
          <div className="relative" onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)}>
            <button onClick={() => go("services")} className="flex items-center gap-1 hover:opacity-70 transition-opacity">Services <ChevronDown size={14} /></button>
            {megaOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                <div className="grid grid-cols-2 gap-x-10 gap-y-2 p-7 shadow-2xl" style={{ width: 460, background: dark ? "#F7F6F2" : "#FFFFFF", border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(23,23,23,0.10)"}` }}>
                  {SERVICE_CATEGORIES.map((c) => (
                    <button key={c} onClick={() => go("services")} className="text-left py-1.5 hover:text-[#B56A35] transition-colors" style={{ color: dark ? "#A3A3A3" : "#404040", fontSize: 12.5 }}>{c}</button>
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
        <div className="lg:hidden px-6 pb-8 pt-2 flex flex-col gap-1" style={{ background: dark ? "#F7F6F2" : "#FFFFFF", fontFamily: "DM Sans, sans-serif" }}>
          {["home", "about", "services", "projects", "contact"].map((p) => (
            <button key={p} onClick={() => go(p)} className="text-left py-3 capitalize border-b" style={{ color: dark ? "#FFFFFF" : "#171717", borderColor: dark ? "rgba(255,255,255,0.06)" : "rgba(23,23,23,0.08)", fontSize: 15, fontWeight: 500 }}>{p}</button>
          ))}
          <div className="pt-5"><GoldButton onClick={() => go("contact")} className="w-full justify-center">Book a Consultation</GoldButton></div>
        </div>
      )}
    </header>
  );
}

/* --------------------------------- HERO ------------------------------------ */

function Hero({ setPage }) {
  const [imgRef, ready, onReady] = useImgReady(3000);

  return (
    <section className="relative h-screen min-h-[720px] flex items-end overflow-hidden">
      <ParallaxLayer>
        <img
          ref={imgRef}
          src={HOME_HERO}
          alt=""
          fetchPriority="high"
          loading="eager"
          decoding="sync"
          onLoad={onReady}
          onError={onReady}
          className="nx-kenburns w-full h-full object-cover"
          style={{ opacity: 1 }}
        />
      </ParallaxLayer>

      <Scrim show={ready} strength={0.65} />
      <WireTower />

      <div
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-24 lg:pb-32 w-full"
        style={{ opacity: ready ? 1 : 0, visibility: ready ? "visible" : "hidden", transition: "opacity 0.5s ease" }}
      >
        <div className={ready ? "nx-rise flex items-center gap-3 mb-7" : "flex items-center gap-3 mb-7"} style={{ "--d": "0s" }}>
          <span style={{ width: 40, height: 1, background: "#B56A35" }} />
          <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.3em", color: "#B56A35" }}>ARCHITECTURE · INTERIOR DESIGN · CONSTRUCTION CONSULTANCY</span>
        </div>
        <h1 className={`${ready ? "nx-rise " : ""}text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.06] max-w-4xl`} style={{ "--d": "0.08s", fontFamily: "DM Sans, sans-serif", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.01em", textShadow: "0 2px 30px rgba(0,0,0,0.45)" }}>
          Designing Spaces That Inspire Tomorrow
        </h1>
        <p className={`${ready ? "nx-rise " : ""}mt-7 max-w-xl text-base lg:text-lg`} style={{ "--d": "0.16s", fontFamily: "Inter, sans-serif", color: "#F5F5F5", lineHeight: 1.7, textShadow: "0 1px 16px rgba(0,0,0,0.45)" }}>
          From modern homes to commercial developments, Nexora Studio delivers architectural solutions that combine creativity, functionality, and timeless design.
        </p>
        <div className={`${ready ? "nx-rise " : ""}mt-10 flex flex-wrap gap-4`} style={{ "--d": "0.24s" }}>
          <GoldButton onClick={() => setPage("projects")}>Explore Projects</GoldButton>
          <GhostButton onClick={() => setPage("contact")} dark>Book a Consultation</GhostButton>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2 z-10" style={{ color: "rgba(248,250,252,0.7)", opacity: ready ? 1 : 0, transition: "opacity 0.5s ease" }}>
        <span style={{ writingMode: "vertical-rl", fontFamily: "DM Sans, sans-serif", fontSize: 10, letterSpacing: "0.25em" }}>SCROLL</span>
        <span style={{ width: 1, height: 40, background: "rgba(248,250,252,0.4)" }} />
      </div>
    </section>
  );
}

/* --------------------------------- HOME PAGE SECTIONS ----------------------- */

function AboutPreview({ dark, setPage }) {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-10" style={{ background: dark ? "#F7F6F2" : "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <Reveal className="relative">
          <div className="relative">
            <ImageWipe>
              <img src={U("SQfsaXqdXLU", 1400)} alt="Nexora Studio studio" className="w-full h-[420px] object-cover" />
            </ImageWipe>
            <div className="absolute -bottom-8 -right-8 hidden sm:block p-6" style={{ background: "#B56A35", maxWidth: 220 }}>
              <div style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: 32, color: "#171717" }}>35+</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#171717" }}>Concept-led spaces shaped across modern cities</div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <SectionEyebrow dark={dark}>WHO WE ARE</SectionEyebrow>
          <h2 style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, color: dark ? "#FFFFFF" : "#171717" }} className="text-3xl lg:text-[2.6rem] leading-tight mb-6">
            A fictional architecture studio built for modern living
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", color: dark ? "#737373" : "#525252", lineHeight: 1.8 }} className="mb-8">
            Nexora Studio is a fictional architecture and design practice created as a portfolio concept to showcase premium architectural design, interior planning, and construction consultancy. The studio focuses on creating functional, elegant, and sustainable spaces for residential, commercial, and mixed-use developments.
          </p>
          <div className="grid grid-cols-2 gap-6 mb-9">
            {["Design excellence", "Interior-led planning", "3D architectural visualization", "Transparent project delivery"].map((t) => (
              <div key={t} className="flex items-start gap-3">
                <Check size={16} style={{ color: "#B56A35", marginTop: 3, flexShrink: 0 }} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: dark ? "#A3A3A3" : "#404040" }}>{t}</span>
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
    <section className="py-24 lg:py-32 px-6 lg:px-10" style={{ background: dark ? "#171717" : "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto">
        <Reveal className="max-w-2xl mb-16">
          <SectionEyebrow dark={dark}>WHAT WE DO</SectionEyebrow>
          <h2 style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, color: dark ? "#FFFFFF" : "#171717" }} className="text-3xl lg:text-[2.6rem] leading-tight">
            Services shaped around every stage of your build
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <div className="group relative p-8 h-full transition-all duration-500 hover:-translate-y-1"
                style={{ background: dark ? "#F7F6F2" : "#FFFFFF", border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(23,23,23,0.08)"}` }}>
                <DraftMarks dark={dark} />
                <s.icon size={28} style={{ color: "#B56A35" }} strokeWidth={1.5} />
                <h3 style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, color: dark ? "#FFFFFF" : "#171717" }} className="text-lg mt-5 mb-3">{s.title}</h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13.5, color: dark ? "#737373" : "#525252", lineHeight: 1.7 }}>{s.overview}</p>
                <button onClick={() => setPage("services")} className="mt-6 inline-flex items-center gap-2 text-xs group-hover:gap-3 transition-all" style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, color: "#B56A35", letterSpacing: "0.05em" }}>
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
    <section className="py-24 lg:py-32 px-6 lg:px-10" style={{ background: dark ? "#F7F6F2" : "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto">
        <Reveal className="max-w-2xl mb-16">
          <SectionEyebrow dark={dark}>WHY CHOOSE US</SectionEyebrow>
          <h2 style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, color: dark ? "#FFFFFF" : "#171717" }} className="text-3xl lg:text-[2.6rem] leading-tight">
            Built on precision, delivered with reliability
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: dark ? "rgba(255,255,255,0.07)" : "rgba(23,23,23,0.08)" }}>
          {WHY_US.map((w, i) => (
            <Reveal key={w.title} delay={i * 60}>
              <div className="p-8 h-full" style={{ background: dark ? "#F7F6F2" : "#FFFFFF" }}>
                <w.icon size={24} style={{ color: "#B56A35" }} strokeWidth={1.5} />
                <h3 style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, color: dark ? "#FFFFFF" : "#171717" }} className="text-base mt-5 mb-2.5">{w.title}</h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: dark ? "#737373" : "#525252", lineHeight: 1.65 }}>{w.desc}</p>
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
    <section className="py-24 lg:py-32 px-6 lg:px-10" style={{ background: dark ? "#171717" : "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto">
        <Reveal className="flex flex-wrap justify-between items-end gap-6 mb-16">
          <div>
            <SectionEyebrow dark={dark}>SELECTED WORK</SectionEyebrow>
            <h2 style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, color: dark ? "#FFFFFF" : "#171717" }} className="text-3xl lg:text-[2.6rem] leading-tight max-w-xl">
              A portfolio of contemporary spaces
            </h2>
          </div>
          <GhostButton onClick={() => setPage("projects")} dark={dark}>All Projects</GhostButton>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {featured.map((p, i) => (
            <Reveal key={p.title} delay={i * 70}>
              <Tilt><ProjectCard p={p} dark={dark} /></Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, dark }) {
  const [imgRef, ready, onReady] = useImgReady();
  return (
    <div className="group relative overflow-hidden cursor-pointer">
      <div className="relative h-72 overflow-hidden">
        <img ref={imgRef} onLoad={onReady} onError={onReady} src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <Scrim show={ready} strength={0.85} />
        <span className="absolute top-4 left-4 px-3 py-1 text-[10px] tracking-widest" style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, background: "rgba(200,155,60,0.92)", color: "#171717" }}>{p.cat.toUpperCase()}</span>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-1.5 mb-1.5" style={{ color: "#E08A45" }}><MapPin size={12} /><span style={{ fontFamily: "Inter, sans-serif", fontSize: 11.5 }}>{p.location}</span></div>
          <h3 style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, color: "#FFFFFF" }} className="text-lg mb-2">{p.title}</h3>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#F1F1F1", lineHeight: 1.6 }} className="max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-500 overflow-hidden">{p.desc}</p>
          <span className="inline-flex items-center gap-1.5 mt-3 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, color: "#E08A45" }}>PROJECT DETAILS <ArrowUpRight size={13} /></span>
        </div>
      </div>
    </div>
  );
}


function ProcessTimeline({ dark }) {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-10" style={{ background: dark ? "#F7F6F2" : "#FFFFFF" }}>
      <div className="max-w-5xl mx-auto">
        <Reveal className="max-w-2xl mb-16">
          <SectionEyebrow dark={dark}>OUR PROCESS</SectionEyebrow>
          <h2 style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, color: dark ? "#FFFFFF" : "#171717" }} className="text-3xl lg:text-[2.6rem] leading-tight">
            Eight stages, one accountable team
          </h2>
        </Reveal>

        <div className="relative pl-10 sm:pl-16">
          {/* Vertical timeline line */}
          <span
            className="absolute top-2 bottom-2 left-3 sm:left-5"
            style={{
              width: 1,
              background: "#B56A35"
            }}
          />

          {PROCESS_STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 60} className="relative pb-12 last:pb-0">

              {/* Numbered circle aligned with vertical line */}
              <span
                className="absolute -left-10 sm:-left-14 top-0 z-10 flex items-center justify-center"
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: dark ? "#F7F6F2" : "#FFFFFF",
                  border: "1px solid #B56A35",
                  boxSizing: "border-box"
                }}
              >
                <span
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: 600,
                    fontSize: 10,
                    color: "#B56A35"
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>

              <h3
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: 600,
                  color: dark ? "#FFFFFF" : "#171717"
                }}
                className="text-lg mb-2"
              >
                {s.title}
              </h3>

              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                  color: dark ? "#737373" : "#525252",
                  lineHeight: 1.7,
                  maxWidth: 520
                }}
              >
                {s.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


function Stats({ dark }) {
  return (
    <section className="py-20 px-6 lg:px-10" style={{ background: "#171717" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, color: "#B56A35" }} className="text-4xl lg:text-5xl mb-2"><Counter value={s.value} suffix={s.suffix} /></div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#737373", letterSpacing: "0.02em" }}>{s.label}</div>
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
    <section className="py-24 lg:py-32 px-6 lg:px-10" style={{ background: dark ? "#171717" : "#FFFFFF" }}>
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <SectionEyebrow dark={dark}><span className="mx-auto">CLIENT TESTIMONIALS</span></SectionEyebrow>
        </Reveal>
        <Reveal delay={80}>
          <Quote size={36} style={{ color: "#B56A35", opacity: 0.4 }} className="mx-auto mb-6" />
          <p key={i} style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 500, color: dark ? "#FFFFFF" : "#171717" }} className="text-xl lg:text-2xl leading-relaxed mb-8">"{t.quote}"</p>
          <div className="flex justify-center gap-1 mb-4">{Array.from({ length: t.rating }).map((_, k) => <Star key={k} size={15} fill="#B56A35" color="#B56A35" />)}</div>
          <div style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, color: dark ? "#FFFFFF" : "#171717" }}>{t.name}</div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: dark ? "#737373" : "#525252" }}>{t.role}</div>
        </Reveal>
        <div className="flex justify-center gap-2 mt-9">
          {TESTIMONIALS.map((_, k) => (
            <button key={k} onClick={() => setI(k)} style={{ width: k === i ? 24 : 8, height: 3, background: k === i ? "#B56A35" : (dark ? "rgba(255,255,255,0.2)" : "rgba(23,23,23,0.14)"), transition: "all 0.3s" }} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnersStrip({ dark }) {
  return (
    <section className="py-14 px-6 lg:px-10 overflow-hidden" style={{ background: dark ? "#F7F6F2" : "#FFFFFF", borderTop: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(23,23,23,0.08)"}`, borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(23,23,23,0.08)"}` }}>
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-12 gap-y-4">
        {PARTNERS.map((p) => (
          <span key={p} style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 500, fontSize: 12.5, letterSpacing: "0.04em", color: dark ? "#525252" : "#737373" }}>{p}</span>
        ))}
      </div>
    </section>
  );
}

function CallToAction({ setPage }) {
  const [imgRef, ready, onReady] = useImgReady();
  return (
    <section className="relative py-28 px-6 lg:px-10 overflow-hidden">
      <img ref={imgRef} onLoad={onReady} onError={onReady} src={HOME_HERO} alt="" fetchPriority="high" loading="eager" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(23,23,23,0.7) 0%, rgba(23,23,23,0.5) 50%, rgba(23,23,23,0.35) 100%)", opacity: ready ? 1 : 0, transition: "opacity 1.2s ease 0.4s" }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <Reveal>
          <h2 style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, color: "#FFFFFF", textShadow: "0 2px 24px rgba(0,0,0,0.45)" }} className="text-3xl lg:text-[2.6rem] leading-tight mb-6">
            Ready to build something that lasts generations?
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", color: "#F5F5F5", textShadow: "0 1px 16px rgba(0,0,0,0.45)" }} className="mb-10 max-w-xl mx-auto">
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
    <footer style={{ background: "#171717", borderTop: "1px solid rgba(255,255,255,0.06)" }} className="pt-20 pb-8 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-14">
        <div>
          <Logo dark />
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#525252", lineHeight: 1.8 }} className="mt-6 max-w-xs">
            Architectural design, construction consultancy, and interior solutions for landmark spaces across Nigeria.
          </p>
        </div>
        <div>
          <h4 style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, color: "#FFFFFF" }} className="text-sm mb-5 tracking-wide">QUICK LINKS</h4>
          <div className="flex flex-col gap-3">
            {NAV_PAGES.map((p) => <button key={p} onClick={() => { setPage(p); window.scrollTo(0, 0); }} className="text-left capitalize hover:text-[#B56A35] transition-colors" style={{ fontFamily: "Inter, sans-serif", fontSize: 13.5, color: "#737373" }}>{p}</button>)}
          </div>
        </div>
        <div>
          <h4 style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, color: "#FFFFFF" }} className="text-sm mb-5 tracking-wide">SERVICES</h4>
          <div className="flex flex-col gap-3">
            {SERVICE_CATEGORIES.map((c) => <span key={c} style={{ fontFamily: "Inter, sans-serif", fontSize: 13.5, color: "#737373" }}>{c}</span>)}
          </div>
        </div>
        <div>
          <h4 style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, color: "#FFFFFF" }} className="text-sm mb-5 tracking-wide">CONTACT</h4>
          <div className="flex flex-col gap-3.5" style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#737373" }}>
            <div className="flex gap-2.5"><MapPin size={15} className="mt-0.5 flex-shrink-0" style={{ color: "#B56A35" }} /><span>Innovation District, Victoria Island, Lagos, Nigeria</span></div>
            <div className="flex gap-2.5"><Phone size={15} className="flex-shrink-0" style={{ color: "#B56A35" }} /><span>+234 800 000 0000</span></div>
            <div className="flex gap-2.5"><Clock size={15} className="mt-0.5 flex-shrink-0" style={{ color: "#B56A35" }} /><span>Monday – Friday, 9:00 AM – 6:00 PM</span></div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#737373" }}>© {new Date().getFullYear()} Nexora Studio. Concept Project. All rights reserved.</span>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#737373" }}>Architecture · Interior Design · Construction Consultancy · Lagos, Nigeria</span>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#737373", display: "block", textAlign: "center", marginTop: 6 }}>Nexora Studio is a fictional architecture brand created exclusively to demonstrate frontend development, UI/UX design, and responsive web development skills.</span>
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
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="w-11 h-11 flex items-center justify-center transition-transform hover:-translate-y-1" style={{ background: dark ? "#262626" : "#171717", color: "#FFFFFF", borderRadius: "50%" }} aria-label="Back to top">
          <ChevronUp size={18} />
        </button>
      )} */}
      {/* <a href="tel:+2348000000000" className="w-12 h-12 flex items-center justify-center transition-transform hover:-translate-y-1" style={{ background: "#171717", color: "#FFFFFF", borderRadius: "50%" }} aria-label="Call us">
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
    <div style={{ background: dark ? "#F7F6F2" : "#FFFFFF" }}>
      <PageHero image={PAGE_HEROES.about} eyebrow="ABOUT NEXORA STUDIO" title="Our Story" className="h-[52vh] min-h-[420px]" />

      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p style={{ fontFamily: "Inter, sans-serif", color: dark ? "#737373" : "#525252", lineHeight: 1.9 }} className="text-lg mb-6">
              Nexora Studio is a fictional architecture and design practice created as a portfolio concept to showcase premium architectural design, interior planning, and construction consultancy.
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", color: dark ? "#737373" : "#525252", lineHeight: 1.9 }} className="text-lg">
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
              <div className="p-9 h-full" style={{ background: dark ? "#171717" : "#FFFFFF", borderTop: "2px solid #B56A35" }}>
                <h3 style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, color: dark ? "#FFFFFF" : "#171717" }} className="text-xl mb-3">{b.t}</h3>
                <p style={{ fontFamily: "Inter, sans-serif", color: dark ? "#737373" : "#525252", lineHeight: 1.75, fontSize: 14.5 }}>{b.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 lg:px-10" style={{ background: dark ? "#171717" : "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto">
          <Reveal className="max-w-2xl mb-14"><SectionEyebrow dark={dark}>CORE VALUES</SectionEyebrow>
            <h2 style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, color: dark ? "#FFFFFF" : "#171717" }} className="text-3xl lg:text-4xl leading-tight">What guides every decision we make</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 70}>
                <div className="p-7 h-full" style={{ background: dark ? "#F7F6F2" : "#FFFFFF", border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(23,23,23,0.08)"}` }}>
                  <h3 style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, color: "#B56A35" }} className="text-base mb-2.5">{v.title}</h3>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13.5, color: dark ? "#737373" : "#525252", lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="max-w-2xl mb-14"><SectionEyebrow dark={dark}>MEET OUR TEAM</SectionEyebrow>
            <h2 style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, color: dark ? "#FFFFFF" : "#171717" }} className="text-3xl lg:text-4xl leading-tight">The creative minds behind every concept</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 70}>
                <div className="text-center">
                  <ImageWipe className="h-64 mb-5 overflow-hidden" delay={i * 120}>
                    <img src={m.img} alt={m.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                  </ImageWipe>
                  <h3 style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, color: dark ? "#FFFFFF" : "#171717" }} className="text-base">{m.name}</h3>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#B56A35" }}>{m.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProcessTimeline dark={dark} />

      <section className="py-24 px-6 lg:px-10" style={{ background: dark ? "#171717" : "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
          <Reveal className="p-10" >
            <div style={{ background: dark ? "#F7F6F2" : "#FFFFFF", border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(23,23,23,0.08)"}` }} className="p-10 h-full">
              <ShieldCheck size={30} style={{ color: "#B56A35" }} strokeWidth={1.5} />
              <h3 style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, color: dark ? "#FFFFFF" : "#171717" }} className="text-2xl mt-5 mb-3">Commitment to Quality</h3>
              <p style={{ fontFamily: "Inter, sans-serif", color: dark ? "#737373" : "#525252", lineHeight: 1.8 }}>Every project is shaped with a rigorous design process and a commitment to lasting quality from concept through completion.</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ background: dark ? "#F7F6F2" : "#FFFFFF", border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(23,23,23,0.08)"}` }} className="p-10 h-full">
              <TreePine size={30} style={{ color: "#B56A35" }} strokeWidth={1.5} />
              <h3 style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, color: dark ? "#FFFFFF" : "#171717" }} className="text-2xl mt-5 mb-3">Innovation & Sustainability</h3>
              <p style={{ fontFamily: "Inter, sans-serif", color: dark ? "#737373" : "#525252", lineHeight: 1.8 }}>Sustainable design thinking, careful detailing, and spatial intelligence are woven into each concept from the earliest sketches.</p>
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
    <div style={{ background: dark ? "#F7F6F2" : "#FFFFFF" }}>
      <PageHero image={PAGE_HEROES.services} eyebrow="OUR SERVICES" title="Design services for every stage of the journey" className="h-[46vh] min-h-[360px]" />

      <section className="py-16 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-14">
            {cats.map((c) => (
              <button key={c} onClick={() => setActiveCat(c)} className="px-5 py-2.5 text-xs transition-all"
                style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, letterSpacing: "0.03em", background: activeCat === c ? "#B56A35" : "transparent", color: activeCat === c ? "#171717" : (dark ? "#737373" : "#525252"), border: `1px solid ${activeCat === c ? "#B56A35" : (dark ? "rgba(255,255,255,0.15)" : "rgba(23,23,23,0.14)")}` }}>
                {c}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {list.map((s, i) => (
              <Reveal key={s.title} delay={(i % 6) * 60}>
                <div className="p-9 h-full relative" style={{ background: dark ? "#171717" : "#FFFFFF", border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(23,23,23,0.08)"}` }}>
                  <DraftMarks dark={dark} />
                  <div className="flex items-start justify-between mb-5">
                    <s.icon size={30} style={{ color: "#B56A35" }} strokeWidth={1.5} />
                    <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 10.5, fontWeight: 600, letterSpacing: "0.1em", color: dark ? "#525252" : "#737373" }}>{s.cat.toUpperCase()}</span>
                  </div>
                  <h3 style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, color: dark ? "#FFFFFF" : "#171717" }} className="text-xl mb-3">{s.title}</h3>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: dark ? "#737373" : "#525252", lineHeight: 1.75 }} className="mb-6">{s.overview}</p>

                  <div className="mb-5">
                    <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: "#B56A35" }} className="mb-2.5">KEY BENEFITS</div>
                    <div className="flex flex-col gap-2">
                      {s.benefits.map((b) => <div key={b} className="flex items-center gap-2"><Check size={13} style={{ color: "#B56A35" }} /><span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: dark ? "#A3A3A3" : "#404040" }}>{b}</span></div>)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-5" style={{ borderTop: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(23,23,23,0.10)"}` }}>
                    <div>
                      <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 10.5, fontWeight: 600, letterSpacing: "0.08em", color: dark ? "#525252" : "#737373" }}>TIMELINE</div>
                      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: dark ? "#FFFFFF" : "#171717" }}>{s.timeline}</div>
                    </div>
                    <div className="text-right">
                      <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 10.5, fontWeight: 600, letterSpacing: "0.08em", color: dark ? "#525252" : "#737373" }}>DELIVERABLES</div>
                      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: dark ? "#FFFFFF" : "#171717" }}>{s.deliverables.length} items</div>
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
    <section className="py-20 px-6 lg:px-10 text-center" style={{ background: dark ? "#171717" : "#FFFFFF" }}>
      <h3 style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, color: dark ? "#FFFFFF" : "#171717" }} className="text-2xl lg:text-3xl mb-6">Not sure which service fits your next project?</h3>
      <GoldButton onClick={() => window.scrollTo(0, 0)}>Talk To Our Team</GoldButton>
    </section>
  );
}

/* ------------------------------ PAGE: PROJECTS ------------------------------ */

function ProjectsPage({ dark }) {
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? PROJECTS : PROJECTS.filter(p => p.cat === cat);
  return (
    <div style={{ background: dark ? "#F7F6F2" : "#FFFFFF" }}>
      <PageHero image={PAGE_HEROES.projects} eyebrow="OUR PORTFOLIO" title="Spaces shaped for modern living" className="h-[46vh] min-h-[360px]" />

      <section className="py-16 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-14">
            {PROJECT_CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCat(c)} className="px-5 py-2.5 text-xs transition-all"
                style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, background: cat === c ? "#B56A35" : "transparent", color: cat === c ? "#171717" : (dark ? "#737373" : "#525252"), border: `1px solid ${cat === c ? "#B56A35" : (dark ? "rgba(255,255,255,0.15)" : "rgba(23,23,23,0.14)")}` }}>
                {c}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {list.map((p, i) => (
              <Reveal key={p.title} delay={(i % 6) * 60}><Tilt><ProjectCard p={p} dark={dark} /></Tilt></Reveal>
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
    <section className="py-24 px-6 lg:px-10" style={{ background: dark ? "#171717" : "#FFFFFF" }}>
      <div className="max-w-5xl mx-auto">
        <Reveal className="max-w-xl mb-12">
          <SectionEyebrow dark={dark}>RENOVATION SPOTLIGHT</SectionEyebrow>
          <h2
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 700,
              color: dark ? "#FFFFFF" : "#171717"
            }}
            className="text-3xl leading-tight"
          >
            The Willow Villa — drag to compare
          </h2>
        </Reveal>

        {/* Before and After Comparison */}
        <div className="relative h-[420px] w-full overflow-hidden select-none" style={{ touchAction: "none" }}>

          {/* After Image */}
          <img
            src={U("u1iFdXU1tl0", 1400)}
            alt="After renovation"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center" }}
            draggable="false"
          />

          {/* Before Image */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              clipPath: `inset(0 ${100 - pos}% 0 0)`
            }}
          >
            <img
              src={U("5EazjioPXck", 1400)}
              alt="Before renovation"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: "center" }}
              draggable="false"
            />
          </div>

          {/* Comparison Line */}
          <div
            className="absolute top-0 bottom-0 z-10 pointer-events-none"
            style={{
              left: `${pos}%`,
              width: 2,
              background: "#B56A35",
              transform: "translateX(-50%)"
            }}
          />

          {/* Drag Handle */}
          <div
            className="absolute top-1/2 z-20 flex items-center justify-center pointer-events-none"
            style={{
              left: `${pos}%`,
              transform: "translate(-50%, -50%)",
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#B56A35"
            }}
          >
            <ChevronRight size={14} style={{ color: "#171717", marginRight: -4 }} />
            <ChevronRight size={14} style={{ color: "#171717", transform: "rotate(180deg)", marginLeft: -4 }} />
          </div>

          {/* Slider Control */}
          <input
            type="range"
            min="0"
            max="100"
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            className="absolute inset-0 z-30 w-full h-full opacity-0 cursor-ew-resize"
            aria-label="Before and after comparison slider"
          />

          {/* Before Label */}
          <span
            className="absolute top-4 left-4 z-10 px-3 py-1 text-[10px] pointer-events-none"
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 600,
              background: "rgba(23,23,23,0.7)",
              color: "#FFFFFF"
            }}
          >
            BEFORE
          </span>

          {/* After Label */}
          <span
            className="absolute top-4 right-4 z-10 px-3 py-1 text-[10px] pointer-events-none"
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 600,
              background: "rgba(200,155,60,0.9)",
              color: "#171717"
            }}
          >
            AFTER
          </span>
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

  const inputStyle = { fontFamily: "Inter, sans-serif", fontSize: 14, background: dark ? "#F7F6F2" : "#FFFFFF", color: dark ? "#FFFFFF" : "#171717", border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(23,23,23,0.12)"}`, padding: "13px 16px", width: "100%", outline: "none" };
  const labelStyle = { fontFamily: "DM Sans, sans-serif", fontSize: 11.5, fontWeight: 600, letterSpacing: "0.05em", color: dark ? "#737373" : "#525252", marginBottom: 8, display: "block" };

  return (
    <div style={{ background: dark ? "#F7F6F2" : "#FFFFFF" }}>
      <PageHero image={PAGE_HEROES.contact} eyebrow="GET IN TOUCH" title="Let's design what's next" className="h-[42vh] min-h-[320px]" />

      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2">
            <Reveal>
              <h2 style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, color: dark ? "#FFFFFF" : "#171717" }} className="text-2xl mb-8">Visit or reach us</h2>
              <div className="flex flex-col gap-7 mb-10">
                <div className="flex gap-4"><MapPin size={20} style={{ color: "#B56A35" }} className="flex-shrink-0 mt-1" /><div><div style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, color: dark ? "#FFFFFF" : "#171717" }} className="mb-1">Address</div><p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: dark ? "#737373" : "#525252", lineHeight: 1.7 }}>Innovation District, Victoria Island, Lagos, Nigeria</p></div></div>
                <div className="flex gap-4"><Phone size={20} style={{ color: "#B56A35" }} className="flex-shrink-0 mt-1" /><div><div style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, color: dark ? "#FFFFFF" : "#171717" }} className="mb-1">Phone</div><p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: dark ? "#737373" : "#525252" }}>+234 800 000 0000</p></div></div>
                <div className="flex gap-4"><Clock size={20} style={{ color: "#B56A35" }} className="flex-shrink-0 mt-1" /><div><div style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, color: dark ? "#FFFFFF" : "#171717" }} className="mb-1">Business Hours</div><p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: dark ? "#737373" : "#525252" }}>Monday – Friday, 9:00 AM – 6:00 PM</p></div></div>
                <div className="flex gap-4"><Mail size={20} style={{ color: "#B56A35" }} className="flex-shrink-0 mt-1" /><div><div style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, color: dark ? "#FFFFFF" : "#171717" }} className="mb-1">Email</div><p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: dark ? "#737373" : "#525252" }}>hello@nexorastudio.design</p></div></div>
              </div>
              <a href="https://wa.me/2348000000000" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2.5 px-6 py-3 text-sm mb-8" style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, background: "#25D366", color: "#fff" }}><FaWhatsapp size={18} /> Chat on WhatsApp</a>
              <div className="w-full h-64 overflow-hidden" style={{ background: dark ? "#171717" : "#FFFFFF", border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(23,23,23,0.10)"}` }}>
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
                <div className="p-10 text-center" style={{ background: dark ? "#171717" : "#FFFFFF", border: "1px solid #B56A35" }}>
                  <Check size={30} style={{ color: "#B56A35" }} className="mx-auto mb-4" />
                  <h3 style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, color: dark ? "#FFFFFF" : "#171717" }} className="text-xl mb-2">Message received</h3>
                  <p style={{ fontFamily: "Inter, sans-serif", color: dark ? "#737373" : "#525252" }}>Thank you for reaching out — our team will contact you within one business day.</p>
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

      <section className="py-24 px-6 lg:px-10" style={{ background: dark ? "#171717" : "#FFFFFF" }}>
        <div className="max-w-3xl mx-auto">
          <Reveal className="mb-12 text-center">
            <SectionEyebrow dark={dark}><span className="mx-auto">FAQ</span></SectionEyebrow>
            <h2 style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, color: dark ? "#FFFFFF" : "#171717" }} className="text-3xl">Frequently asked questions</h2>
          </Reveal>
          <div className="flex flex-col gap-3">
            {FAQS.map((f, i) => (
              <div key={f.q} style={{ background: dark ? "#F7F6F2" : "#FFFFFF", border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(23,23,23,0.10)"}` }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-6 py-5 text-left">
                  <span style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, fontSize: 14.5, color: dark ? "#FFFFFF" : "#171717" }}>{f.q}</span>
                  {openFaq === i ? <Minus size={16} style={{ color: "#B56A35" }} className="flex-shrink-0 ml-4" /> : <Plus size={16} style={{ color: "#B56A35" }} className="flex-shrink-0 ml-4" />}
                </button>
                <div style={{ maxHeight: openFaq === i ? 200 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13.5, color: dark ? "#737373" : "#525252", lineHeight: 1.75 }} className="px-6 pb-6">{f.a}</p>
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

  useEffect(() => {
    let timer;
    const run = () => {
      timer = setTimeout(() => {
        PRELOAD_IMAGES.forEach((src) => { const img = new Image(); img.src = src; });
      }, 1200);
    };
    if (document.readyState === "complete") run();
    else window.addEventListener("load", run, { once: true });
    return () => { clearTimeout(timer); window.removeEventListener("load", run); };
  }, []);

  return (
    <div style={{ background: dark ? "#F7F6F2" : "#FFFFFF", minHeight: "100vh" }}>
      <link rel="preconnect" href="https://unsplash.com" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="preload" as="image" href={HOME_HERO} fetchPriority="high" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        button, a, [role="button"] { cursor: pointer; }
        select { appearance: none; }
        input, select, textarea { border-radius: 0; }
        input:focus, select:focus, textarea:focus { border-color: #B56A35 !important; }
        ::selection { background: #B56A35; color: #171717; }

        body { background: #FFFFFF; color: #171717; }
        img { display: block; }
        a { text-decoration: none; }
        button { -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { width: 9px; }
        ::-webkit-scrollbar-track { background: #F7F6F2; }
        ::-webkit-scrollbar-thumb { background: #B56A35; border-radius: 999px; }

        .nx-rise { animation: nx-rise 0.7s cubic-bezier(.16,.84,.44,1) var(--d, 0s) backwards; }
        .nx-fade { animation: nx-fade 1.4s ease var(--d, 0s) backwards; }
        @keyframes nx-rise { from { opacity: 0; transform: translateY(16px); } }
        @keyframes nx-fade { from { opacity: 0; } }

        .nx-reveal-img { clip-path: inset(100% 0 0 0); transform: scale(1.18); }
        .nx-reveal-img.is-ready { clip-path: inset(0 0 0 0); transform: scale(1); transition: clip-path 1.5s cubic-bezier(.77,0,.18,1), transform 2.6s cubic-bezier(.16,.84,.44,1); }
        .nx-kenburns { animation: nx-kenburns 18s cubic-bezier(.16,.84,.44,1) both; }
        .nx-grow { transform-origin: left; animation: nx-grow 1.1s cubic-bezier(.77,0,.18,1) var(--d, 0s) backwards; }
        .nx-page { animation: nx-page 0.8s cubic-bezier(.16,.84,.44,1) backwards; }
        @keyframes nx-kenburns { from { transform: scale(1.14); } to { transform: scale(1); } }
        @keyframes nx-grow { from { transform: scaleX(0); } }
        @keyframes nx-page { from { opacity: 0; transform: translateY(24px); } }

        html.nx-cursor, html.nx-cursor * { cursor: none !important; }
        html.nx-cursor input, html.nx-cursor textarea, html.nx-cursor select { cursor: text !important; }
        .nx-ring { width: 36px; height: 36px; margin: -18px 0 0 -18px; border: 1px solid #B56A35; border-radius: 50%; transition: transform 0.3s ease, background 0.3s ease; }
        .nx-ring.is-hot { transform: scale(1.9); background: rgba(181,106,53,0.15); }

        .nx-grid { --mx: 50%; --my: 50%; background-image: linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px); background-size: 64px 64px; -webkit-mask-image: radial-gradient(circle 260px at var(--mx) var(--my), #000, transparent); mask-image: radial-gradient(circle 260px at var(--mx) var(--my), #000, transparent); }

        .nx-tower { right: 2%; top: 11%; transform: scale(0.5); transform-origin: top right; }
        @media (min-width: 640px) { .nx-tower { right: 4%; top: 12%; transform: scale(0.8); } }
        @media (min-width: 1024px) { .nx-tower { right: 5%; top: 14%; transform: scale(1.2); } }

        .nx-spin { transform: rotateX(-18deg) rotateY(30deg); animation: nx-spin 48s linear infinite; }
        @keyframes nx-spin { from { transform: rotateX(-18deg) rotateY(0deg); } to { transform: rotateX(-18deg) rotateY(360deg); } }

        .nx-marquee { animation: nx-marquee 38s linear infinite; }
        .nx-marquee:hover { animation-play-state: paused; }
        @keyframes nx-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        .nx-outline { color: transparent; -webkit-text-stroke: 1.5px #171717; transition: color 0.4s ease, -webkit-text-stroke-color 0.4s ease; }
        .nx-outline:hover { color: #B56A35; -webkit-text-stroke-color: #B56A35; }
      `}</style>

      <ScrollProgress />
      <ArchCursor />
      <Nav page={page} setPage={setPage} dark={dark} scrolled={scrolled} />

      <div key={page} className="nx-page">
        {page === "home" && (
          <>
            <Hero setPage={setPage} />
            <Marquee />
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
      </div>

      <section className="py-4" style={{ background: dark ? "#171717" : "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex flex-wrap justify-center gap-x-8 gap-y-2">
          {TRUST_BADGES.map((b) => (
            <span key={b} className="flex items-center gap-1.5" style={{ fontFamily: "Inter, sans-serif", fontSize: 11.5, color: dark ? "#525252" : "#737373" }}>
              <ShieldCheck size={12} style={{ color: "#B56A35" }} /> {b}
            </span>
          ))}
        </div>
      </section>

      <Footer dark={dark} setPage={setPage} />
      <Floating dark={dark} />
    </div>
  );
}