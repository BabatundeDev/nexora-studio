import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu, X, Phone, Mail, MapPin, Clock, ChevronDown, ChevronRight, ArrowRight, ArrowUpRight,
  Star, Check, Building2, Ruler, PenTool, Layers, ClipboardCheck, TreePine, Users, Award,
  ShieldCheck, Sparkles, Sun, Moon, MessageCircle, ArrowUp, Quote, Plus, Minus, Compass,
  Hammer, FileCheck2, Boxes, Landmark, Home as HomeIcon, Building, Warehouse, ChevronUp
} from "lucide-react";

/* ---------------------------------- DATA ---------------------------------- */

const NAV_PAGES = ["home", "about", "services", "projects", "contact"];

const SERVICES = [
  { icon: Compass, cat: "Architectural Design", title: "Residential Building Design", overview: "Bespoke residential architecture shaped around how a family actually lives, from first sketch to final elevation.", benefits: ["Tailored floor plans", "Climate-responsive orientation", "Timeless material palettes"], timeline: "4 – 8 weeks", deliverables: ["Concept drawings", "Working drawings", "3D exterior renders"] },
  { icon: Building, cat: "Architectural Design", title: "Commercial Building Design", overview: "Functional, brand-forward commercial architecture engineered for footfall, efficiency, and long-term value.", benefits: ["Optimised floor efficiency", "Regulatory-ready drawings", "Scalable design systems"], timeline: "6 – 12 weeks", deliverables: ["Space programming", "Full architectural set", "Signage & facade study"] },
  { icon: Sparkles, cat: "Architectural Design", title: "Luxury Home Design", overview: "Statement residences for clients who see a home as an heirloom, not a structure.", benefits: ["Signature architectural identity", "Premium material curation", "Discreet, private planning"], timeline: "8 – 14 weeks", deliverables: ["Master plan", "Interior shell coordination", "Cinematic 3D walkthrough"] },
  { icon: Hammer, cat: "Architectural Design", title: "Building Renovation", overview: "Reviving existing structures with contemporary sensibility while respecting original character and structural integrity.", benefits: ["Structural condition survey", "Cost-conscious phasing", "Minimal-disruption planning"], timeline: "3 – 10 weeks", deliverables: ["Existing condition report", "Renovation drawings", "Before/after visualisation"] },
  { icon: Layers, cat: "Interior Design", title: "Interior Design", overview: "Interiors that carry the building's architectural language inward, layer by layer.", benefits: ["Material and lighting schemes", "Custom joinery detailing", "Furniture and fixture sourcing"], timeline: "4 – 9 weeks", deliverables: ["Mood boards", "Interior layout drawings", "Finishes schedule"] },
  { icon: Ruler, cat: "Interior Design", title: "Space Planning", overview: "Precision spatial strategy that resolves flow, function, and future flexibility before a single wall is built.", benefits: ["Improved circulation", "Zoning for privacy and light", "Future-proofed layouts"], timeline: "2 – 4 weeks", deliverables: ["Zoning diagrams", "Furniture layout plans", "Flow analysis report"] },
  { icon: Boxes, cat: "Interior Design", title: "3D Visualization", overview: "Photoreal renders and walkthroughs that let clients stand inside a design before it exists.", benefits: ["Design validation pre-construction", "Marketing-ready imagery", "Faster stakeholder approval"], timeline: "1 – 3 weeks", deliverables: ["Exterior & interior renders", "Animated walkthrough", "VR-ready model"] },
  { icon: ClipboardCheck, cat: "Construction Consultancy", title: "Project Supervision", overview: "On-site technical oversight that keeps craftsmanship faithful to the approved design intent.", benefits: ["Weekly site quality audits", "Contractor accountability", "Design-intent compliance"], timeline: "Ongoing", deliverables: ["Site inspection reports", "Snag lists", "Progress photo logs"] },
  { icon: FileCheck2, cat: "Construction Consultancy", title: "Project Management", overview: "End-to-end coordination of consultants, contractors, and timelines under one accountable roof.", benefits: ["Single point of accountability", "Budget and schedule control", "Risk mitigation planning"], timeline: "Full project duration", deliverables: ["Master programme", "Cost tracking reports", "Stakeholder updates"] },
  { icon: Landmark, cat: "Construction Consultancy", title: "Building Approval Documentation", overview: "Navigating statutory approvals with drawing packages built to pass first submission.", benefits: ["Compliance-first drafting", "Faster approval turnaround", "Liaison with authorities"], timeline: "3 – 6 weeks", deliverables: ["Approval drawing set", "Statutory forms", "Authority correspondence"] },
  { icon: ShieldCheck, cat: "Construction Consultancy", title: "Quantity Survey Coordination", overview: "Rigorous cost planning that keeps ambition and budget in the same conversation.", benefits: ["Accurate bill of quantities", "Value engineering options", "Tender documentation support"], timeline: "2 – 5 weeks", deliverables: ["Bill of quantities", "Cost plan", "Tender comparison report"] },
  { icon: TreePine, cat: "Property Development Consultancy", title: "Landscape Design", overview: "Grounds and gardens composed as a continuation of the architecture, not an afterthought.", benefits: ["Site-responsive planting plans", "Outdoor living zones", "Sustainable irrigation design"], timeline: "3 – 6 weeks", deliverables: ["Landscape master plan", "Planting schedule", "Hardscape drawings"] },
  { icon: Building2, cat: "Property Development Consultancy", title: "Property Development Consultancy", overview: "Feasibility and positioning guidance for investors and developers shaping their next asset.", benefits: ["Site feasibility analysis", "Highest-and-best-use studies", "Investor-ready presentations"], timeline: "2 – 4 weeks", deliverables: ["Feasibility report", "Massing studies", "Development brief"] },
];

const SERVICE_CATEGORIES = [...new Set(SERVICES.map(s => s.cat))];

const PROJECTS = [
  { title: "Oranmiyan Residence", cat: "Luxury Homes", location: "Ile Ife, Osun State", desc: "A five-bedroom courtyard residence organised around a central reflecting pool and framed in brushed limestone.", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" },
  { title: "Adejare Villa", cat: "Modern Villas", location: "Ibadan, Oyo State", desc: "A cantilevered villa that steps down a sloped site, opening every living space to cross ventilation.", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80" },
  { title: "Iremide Business Park", cat: "Commercial Buildings", location: "Lagos, Nigeria", desc: "A nine-storey commercial tower with a perforated brise-soleil facade tuned to Lagos sun angles.", img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80" },
  { title: "Grace Covenant Chapel", cat: "Churches", location: "Ife-Ijesha, Osun State", desc: "A 2,000-seat sanctuary with a soaring laminated-timber roof and clerestory light wells.", img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80" },
  { title: "Bright Path Academy", cat: "Schools", location: "Ile Ife, Osun State", desc: "A campus of shaded courtyards and cross-ventilated classroom blocks designed around daylight and airflow.", img: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=1200&q=80" },
  { title: "Serene Palms Hotel", cat: "Hotels", location: "Osogbo, Osun State", desc: "A 64-key boutique hotel wrapped around a central garden atrium, with every room facing greenery.", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80" },
  { title: "Meridian Office Complex", cat: "Office Complexes", location: "Abuja, FCT", desc: "A twin-tower office complex linked by a glazed sky-bridge and shared landscaped podium.", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80" },
  { title: "Heritage House Restoration", cat: "Renovation Projects", location: "Ile Ife, Osun State", desc: "Full structural and facade restoration of a 1960s residence, preserving its original terrazzo and brise-soleil.", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80" },
  { title: "Ocean Terrace Apartments", cat: "Apartment Buildings", location: "Lekki, Lagos", desc: "A 48-unit apartment building with stepped terraces that give every home a private garden.", img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80" },
  { title: "Ife Central Quarter", cat: "Mixed Use Developments", location: "Ile Ife, Osun State", desc: "A mixed-use quarter combining ground-floor retail, mid-rise offices, and rooftop residences.", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" },
];

const PROJECT_CATEGORIES = ["All", ...new Set(PROJECTS.map(p => p.cat))];

const PROCESS_STEPS = [
  { title: "Consultation", desc: "We listen first — understanding your vision, budget, and how you intend to use the space." },
  { title: "Site Inspection", desc: "Our team surveys the land, studying orientation, soil, and surrounding context." },
  { title: "Concept Development", desc: "Initial design directions are sketched and reviewed against your brief." },
  { title: "Design", desc: "The chosen concept is developed into detailed architectural drawings." },
  { title: "3D Visualization", desc: "Photoreal renders let you walk through the design before construction begins." },
  { title: "Approval", desc: "We prepare and submit documentation for statutory building approval." },
  { title: "Construction", desc: "Our supervisors oversee every phase on site, keeping quality faithful to the design." },
  { title: "Project Delivery", desc: "A final walkthrough, snag resolution, and handover of your completed space." },
];

const STATS = [
  { value: 120, suffix: "+", label: "Projects delivered" },
  { value: 15, suffix: "+", label: "Years of experience" },
  { value: 98, suffix: "%", label: "Client satisfaction" },
  { value: 40, suffix: "+", label: "Team members" },
];

const TESTIMONIALS = [
  { name: "Adebayo Ogundimu", role: "Property Developer, Lagos", quote: "Archi City Homes turned a difficult sloped site into the most striking villa in the neighbourhood. Every deadline was met.", rating: 5 },
  { name: "Folasade Adeyemi", role: "Homeowner, Ile Ife", quote: "They listened to how our family actually lives before drawing a single wall. The result feels entirely ours.", rating: 5 },
  { name: "Pastor Emmanuel Okafor", role: "Grace Covenant Chapel", quote: "From concept to consecration, their team managed every consultant and approval without a single surprise.", rating: 5 },
  { name: "Chiamaka Nwosu", role: "Hotel Owner, Osogbo", quote: "Transparent communication throughout. We always knew exactly where budget and timeline stood.", rating: 5 },
];

const WHY_US = [
  { icon: Sparkles, title: "Modern Designs", desc: "Contemporary architectural language suited to how Nigeria builds and lives today." },
  { icon: Users, title: "Experienced Architects", desc: "A senior team with over a decade shaping landmark residential and commercial work." },
  { icon: ShieldCheck, title: "Quality Construction", desc: "Rigorous on-site supervision protects design intent from foundation to finish." },
  { icon: MessageCircle, title: "Transparent Communication", desc: "Clear reporting and a single point of contact throughout your project." },
  { icon: Clock, title: "On-Time Delivery", desc: "Disciplined programme management keeps milestones honest." },
  { icon: Ruler, title: "Attention to Detail", desc: "Every junction, material, and sightline considered before it's built." },
  { icon: PenTool, title: "Innovative Solutions", desc: "Creative problem-solving for difficult sites, briefs, and budgets." },
  { icon: TreePine, title: "Sustainable Designs", desc: "Passive cooling, daylight, and material choices suited to our climate." },
];

const TRUST_BADGES = ["Licensed Professionals", "Modern Design Solutions", "Quality Construction", "Client Focused", "Project Excellence", "Sustainable Architecture", "Innovative Designs", "Professional Consultancy"];

const PARTNERS = ["Osun State Ministry of Works", "Ife Chamber of Commerce", "Nigerian Institute of Architects", "Federation of Construction Industry", "Council of Registered Builders", "Real Estate Developers Association"];

const FAQS = [
  { cat: "Architectural Services", q: "What architectural services does Archi City Homes provide?", a: "We provide full architectural design for residential, commercial, and institutional buildings — including luxury homes, renovations, interior design, space planning, and 3D visualisation." },
  { cat: "Construction Process", q: "Do you manage construction, or only design?", a: "Both. We offer construction consultancy, project supervision, and full project management, so the same team that designs your building can oversee its construction." },
  { cat: "Project Duration", q: "How long does a typical project take?", a: "A residential design typically takes 4–8 weeks; commercial and luxury projects can take 8–14 weeks. Construction timelines depend on scale and are set during project management." },
  { cat: "Cost Estimates", q: "How is project cost estimated?", a: "Our quantity survey coordination service produces a detailed bill of quantities and cost plan once your design is finalised, so you have clarity before construction begins." },
  { cat: "Building Approvals", q: "Do you handle building approval documentation?", a: "Yes. We prepare compliant drawing packages and liaise directly with the relevant authorities to secure approval." },
  { cat: "Design Revisions", q: "How many design revisions are included?", a: "Every engagement includes structured revision rounds at the concept and design development stages, so your feedback is built in, not billed as an afterthought." },
  { cat: "Architectural Services", q: "Can you work with an existing building?", a: "Yes — our renovation and space planning services are built around surveying and respecting existing structures before proposing change." },
  { cat: "Project Duration", q: "Do you take on projects outside Osun State?", a: "Yes, our team has delivered projects across Lagos, Oyo, Abuja, and beyond, from our base in Ile Ife." },
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
        <span style={{ fontFamily: "Poppins, sans-serif", color: "#C89B3C", fontWeight: 700, fontSize: 15 }}>AC</span>
      </div>
      <div style={{ fontFamily: "Poppins, sans-serif" }}>
        <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: "0.02em", color: dark ? "#F8FAFC" : "#0F172A", lineHeight: 1.05 }}>ARCHI CITY</div>
        <div style={{ fontWeight: 400, fontSize: 9.5, letterSpacing: "0.3em", color: "#C89B3C", lineHeight: 1.1 }}>HOMES LTD.</div>
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

function Nav({ page, setPage, dark, setDark, scrolled }) {
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
          <button onClick={() => setDark(!dark)} aria-label="Toggle dark mode" className="p-2 rounded-full transition-colors" style={{ color: txt, border: `1px solid ${txt === "#F8FAFC" ? "rgba(248,250,252,0.3)" : "rgba(15,23,42,0.2)"}` }}>
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
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
      <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80" alt="" className="absolute inset-0 w-full h-full object-cover transition-all duration-[2500ms]" style={{ opacity: drawn ? 0.42 : 0, transform: drawn ? "scale(1)" : "scale(1.08)" }} />
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
            <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.3em", color: "#C89B3C" }}>ARCHITECTURE · CONSTRUCTION · ILE IFE, NIGERIA</span>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "#F8FAFC", letterSpacing: "-0.01em" }} className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.06] max-w-4xl">
            Designing Landmark Spaces That Inspire Living
          </h1>
        </Reveal>
        <Reveal delay={220}>
          <p className="mt-7 max-w-xl text-base lg:text-lg" style={{ fontFamily: "Inter, sans-serif", color: "#CBD5E1", lineHeight: 1.7 }}>
            Archi City Homes Ltd. delivers innovative architectural design, construction planning, interior solutions, and project management for residential and commercial developments across Nigeria.
          </p>
        </Reveal>
        <Reveal delay={340}>
          <div className="mt-10 flex flex-wrap gap-4">
            <GoldButton onClick={() => setPage("contact")}>Book a Consultation</GoldButton>
            <GhostButton onClick={() => setPage("projects")} dark>View Our Projects</GhostButton>
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
            <img src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1000&q=80" alt="Archi City Homes studio" className="w-full h-[420px] object-cover" />
            <div className="absolute -bottom-8 -right-8 hidden sm:block p-6" style={{ background: "#C89B3C", maxWidth: 220 }}>
              <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 32, color: "#0F172A" }}>15+</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#0F172A" }}>Years designing landmark Nigerian spaces</div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <SectionEyebrow dark={dark}>WHO WE ARE</SectionEyebrow>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: dark ? "#F8FAFC" : "#0F172A" }} className="text-3xl lg:text-[2.6rem] leading-tight mb-6">
            A design studio and construction consultancy built on precision
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", color: dark ? "#94A3B8" : "#64748B", lineHeight: 1.8 }} className="mb-8">
            From our studio at Oranmiyan Tower in Ile Ife, we design and deliver residences, commercial buildings, and institutions across Nigeria — carrying every project from first sketch through final handover with one accountable team.
          </p>
          <div className="grid grid-cols-2 gap-6 mb-9">
            {["Licensed architectural team", "Full construction consultancy", "In-house 3D visualisation", "Transparent project reporting"].map((t) => (
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
              A portfolio of landmark spaces
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
            <GoldButton onClick={() => setPage("contact")}>Book a Consultation</GoldButton>
            <GhostButton onClick={() => setPage("projects")} dark>View Our Projects</GhostButton>
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
          <h4 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "#F8FAFC" }} className="text-sm mb-5 tracking-wide">NAVIGATE</h4>
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
            <div className="flex gap-2.5"><MapPin size={15} className="mt-0.5 flex-shrink-0" style={{ color: "#C89B3C" }} /><span>Oranmiyan Tower, Lagere Road, Ile Ife 220221, Osun State, Nigeria</span></div>
            <div className="flex gap-2.5"><Phone size={15} className="flex-shrink-0" style={{ color: "#C89B3C" }} /><span>0703 375 0709</span></div>
            <div className="flex gap-2.5"><Clock size={15} className="mt-0.5 flex-shrink-0" style={{ color: "#C89B3C" }} /><span>Mon – Fri, 8:00 AM – 5:00 PM</span></div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#475569" }}>© {new Date().getFullYear()} Archi City Homes Ltd. All rights reserved.</span>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#475569" }}>Architecture · Construction · Interior Design · Ile Ife, Nigeria</span>
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
      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="w-11 h-11 flex items-center justify-center transition-transform hover:-translate-y-1" style={{ background: dark ? "#1E293B" : "#0F172A", color: "#F8FAFC", borderRadius: "50%" }} aria-label="Back to top">
          <ChevronUp size={18} />
        </button>
      )}
      <a href="tel:+2347033750709" className="w-12 h-12 flex items-center justify-center transition-transform hover:-translate-y-1" style={{ background: "#0F172A", color: "#F8FAFC", borderRadius: "50%" }} aria-label="Call us">
        <Phone size={18} />
      </a>
      <a href="https://wa.me/2347033750709" target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center transition-transform hover:-translate-y-1" style={{ background: "#25D366", color: "#fff", borderRadius: "50%" }} aria-label="WhatsApp us">
        <MessageCircle size={19} />
      </a>
    </div>
  );
}

/* ------------------------------- PAGE: ABOUT -------------------------------- */

function AboutPage({ dark }) {
  const values = [
    { title: "Integrity", desc: "We design and quote honestly, with no hidden costs or shifting scope." },
    { title: "Craftsmanship", desc: "Every drawing and detail is executed to a standard we'd put our name on." },
    { title: "Client Partnership", desc: "You are involved at every decision point, not just the first and last." },
    { title: "Innovation", desc: "We bring contemporary technique to Nigerian climate, culture, and context." },
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
          <SectionEyebrow dark>ABOUT ARCHI CITY HOMES</SectionEyebrow>
          <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "#F8FAFC" }} className="text-4xl lg:text-6xl">Our Story</h1>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p style={{ fontFamily: "Inter, sans-serif", color: dark ? "#94A3B8" : "#64748B", lineHeight: 1.9 }} className="text-lg mb-6">
              Archi City Homes Ltd. began in Ile Ife with a simple conviction: that Nigerian architecture deserves the same rigour, ambition, and craftsmanship celebrated on the world's biggest stages. What started as a small design practice has grown into a full architecture, construction, and interior consultancy trusted by homeowners, developers, and institutions across the country.
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", color: dark ? "#94A3B8" : "#64748B", lineHeight: 1.9 }} className="text-lg">
              Today, our team carries every project — from luxury residences to schools, churches, and commercial towers — from first sketch through final handover, holding ourselves accountable to the same standard at every stage.
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
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: dark ? "#F8FAFC" : "#0F172A" }} className="text-3xl lg:text-4xl leading-tight">The people behind every drawing</h2>
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
              <p style={{ fontFamily: "Inter, sans-serif", color: dark ? "#94A3B8" : "#64748B", lineHeight: 1.8 }}>Every project is supervised against our own internal quality benchmarks, not just statutory minimums — because our name stays on the building long after handover.</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ background: dark ? "#0B1220" : "#FFFFFF", border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(15,23,42,0.07)"}` }} className="p-10 h-full">
              <TreePine size={30} style={{ color: "#C89B3C" }} strokeWidth={1.5} />
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: dark ? "#F8FAFC" : "#0F172A" }} className="text-2xl mt-5 mb-3">Innovation & Sustainability</h3>
              <p style={{ fontFamily: "Inter, sans-serif", color: dark ? "#94A3B8" : "#64748B", lineHeight: 1.8 }}>Passive cooling, daylight modelling, and locally sourced materials are considered from concept stage, not bolted on afterward.</p>
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
          <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "#F8FAFC" }} className="text-4xl lg:text-6xl">Every stage, under one roof</h1>
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
      <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: dark ? "#F8FAFC" : "#0F172A" }} className="text-2xl lg:text-3xl mb-6">Not sure which service fits your project?</h3>
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
          <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "#F8FAFC" }} className="text-4xl lg:text-6xl">Landmark spaces, delivered</h1>
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
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: dark ? "#F8FAFC" : "#0F172A" }} className="text-3xl leading-tight">Heritage House Restoration — drag to compare</h2>
        </Reveal>
        <div className="relative h-[420px] select-none" style={{ touchAction: "none" }}>
          <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80" alt="After renovation" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
            <img src="https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80" alt="Before renovation" className="h-full object-cover" style={{ width: "420px", maxWidth: "none" }} />
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
                <div className="flex gap-4"><MapPin size={20} style={{ color: "#C89B3C" }} className="flex-shrink-0 mt-1" /><div><div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: dark ? "#F8FAFC" : "#0F172A" }} className="mb-1">Address</div><p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: dark ? "#94A3B8" : "#64748B", lineHeight: 1.7 }}>Oranmiyan Tower, Lagere Road, Ile Ife 220221, Osun State, Nigeria</p></div></div>
                <div className="flex gap-4"><Phone size={20} style={{ color: "#C89B3C" }} className="flex-shrink-0 mt-1" /><div><div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: dark ? "#F8FAFC" : "#0F172A" }} className="mb-1">Phone</div><p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: dark ? "#94A3B8" : "#64748B" }}>0703 375 0709</p></div></div>
                <div className="flex gap-4"><Clock size={20} style={{ color: "#C89B3C" }} className="flex-shrink-0 mt-1" /><div><div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: dark ? "#F8FAFC" : "#0F172A" }} className="mb-1">Business Hours</div><p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: dark ? "#94A3B8" : "#64748B" }}>Monday – Friday, 8:00 AM – 5:00 PM</p></div></div>
                <div className="flex gap-4"><Mail size={20} style={{ color: "#C89B3C" }} className="flex-shrink-0 mt-1" /><div><div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: dark ? "#F8FAFC" : "#0F172A" }} className="mb-1">Email</div><p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: dark ? "#94A3B8" : "#64748B" }}>info@archicityhomes.com</p></div></div>
              </div>
              <a href="https://wa.me/2347033750709" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2.5 px-6 py-3 text-sm mb-8" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, background: "#25D366", color: "#fff" }}><MessageCircle size={16} /> Chat on WhatsApp</a>
              <div className="h-64 flex items-center justify-center" style={{ background: dark ? "#0F172A" : "#F8FAFC", border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)"}` }}>
                <div className="text-center px-6">
                  <MapPin size={26} style={{ color: "#C89B3C" }} className="mx-auto mb-2" />
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: dark ? "#94A3B8" : "#64748B" }}>Google Maps — Plus Code FGPW+WH Ife</p>
                </div>
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
  const [dark, setDark] = useState(false);
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
        select { appearance: none; }
        input, select, textarea { border-radius: 0; }
        input:focus, select:focus, textarea:focus { border-color: #C89B3C !important; }
        ::selection { background: #C89B3C; color: #0F172A; }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
      `}</style>

      <Nav page={page} setPage={setPage} dark={dark} setDark={setDark} scrolled={scrolled} />

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