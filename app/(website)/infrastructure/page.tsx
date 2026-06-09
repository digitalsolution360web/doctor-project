"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Settings,
  Factory,
  Zap,
  ChevronRight,
  Layers,
  Thermometer,
  Wind,
  Maximize,
  ArrowRight
} from "lucide-react";

// --- Count-Up Component ---
function CountUp({ target, suffix = "" }: { target: number | string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started || typeof target !== "number") return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [started, target]);

  if (typeof target !== "number") return <span ref={ref}>{target}</span>;
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// --- Stats Carousel (standalone) ---
const statsData = [
  { num: 180, suffix: " Tons+", title: "Monthly Manufacturing", sub: "Capacity", icon: Layers },
  { num: 50000, suffix: "", title: "Tube Filling", sub: "Tubes Per Day", icon: Settings, img: "/Tube-FIlling.webp" },
  { num: 75000, suffix: "", title: "Bottle Filling", sub: "4-Head Servo Liquid", icon: Zap, img: "/Bottle-filling.webp" },
  { num: 40000, suffix: "", title: "Jar Filling", sub: "2-Head Jar Per Day", icon: Factory },
  { num: 30000, suffix: "", title: "Labeling Capacity", sub: "Units Per Day", icon: Factory, img: "/labeling-machines.webp" },
  { num: 25000, suffix: "", title: "Tube Sealing", sub: "Units Per Day", icon: ShieldCheck, img: "/Tube-Sealing.webp" },
  { num: 100, suffix: "%", title: "Sterile Manufacturing", sub: "Environment", icon: ShieldCheck },
];

function StatCarousel() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-[10px] font-bold text-teal-600 tracking-[0.3em] uppercase mb-4 flex items-center">
            <span className="w-8 h-[1px] bg-teal-600 mr-3"></span>
            Production Power
          </h2>
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            Manufacturing <span className="text-slate-400">Capacity.</span>
          </h3>
        </div>

        <div className="relative group px-2">
          <div
            id="stats-carousel"
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-12 snap-x snap-mandatory"
          >
            {statsData.map((stat, i) => (
              <div
                key={i}
                className="min-w-[300px] md:min-w-[380px] bg-white rounded-[32px] overflow-hidden border border-slate-100 group/card transition-all duration-500 snap-center shadow-sm flex flex-col"
              >
                {/* Image Section */}
                <div className="relative h-[220px] w-full overflow-hidden bg-slate-100">
                  {stat.img ? (
                    <Image
                      src={stat.img}
                      alt={stat.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-50 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                      <stat.icon className="w-16 h-16 text-teal-500/20 relative z-10" />
                    </div>
                  )}

                  {/* Floating Icon Badge */}

                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="mb-4">
                    <p className="text-4xl font-black tracking-tight text-slate-900 mb-1">
                      <CountUp target={stat.num} suffix={stat.suffix} />
                    </p>
                    <div className="h-1 w-12 bg-teal-500 rounded-full"></div>
                  </div>

                  <div className="mt-auto">
                    <h4 className="text-xl font-bold text-slate-900 leading-tight mb-2 uppercase tracking-tight">
                      {stat.title}
                    </h4>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">
                      {stat.sub}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Left Arrow */}
          <button
            onClick={() => { const el = document.getElementById('stats-carousel'); if (el) el.scrollBy({ left: -300, behavior: 'smooth' }); }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-11 h-11 bg-white rounded-full shadow-xl border border-slate-100 flex items-center justify-center text-slate-900 hover:bg-teal-600 hover:text-white transition-all z-20"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => { const el = document.getElementById('stats-carousel'); if (el) el.scrollBy({ left: 300, behavior: 'smooth' }); }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-11 h-11 bg-white rounded-full shadow-xl border border-slate-100 flex items-center justify-center text-slate-900 hover:bg-teal-600 hover:text-white transition-all z-20"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}


interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
}
const galleryImages = [
  {
    src: "/secondary-packaging-area.webp",
    title: "Secondary Packaging Area",
    desc: "High-speed automated final packaging line ensuring zero-error distribution.",
    tag: "Efficiency"
  },
  {
    src: "/secondary-packaging-area2.webp",
    title: "Thermal Sealing Zone",
    desc: "Precision controlled environments for consistent product integrity.",
    tag: "Integrity"
  },
  {
    src: "/tube-filling-section.webp",
    title: "High-Speed Tube Filling",
    desc: "Multi-track filling modules capable of 50,000 units per shift.",
    tag: "Automated"
  },
  {
    src: "/tube-filling-section2.webp",
    title: "Sanitized Filling Modules",
    desc: "ISO Class cleanroom technology with sterile filling points.",
    tag: "Sterile"
  },
  {
    src: "/tube-filling-section2.webp",
    title: "Batch Monitoring System",
    desc: "Real-time sensory tracking for complete batch consistency.",
    tag: "Precision"
  },
  {
    src: "/work-area.webp",
    title: "HEPA Filtered Work Zone",
    desc: "100% hygienic environment maintained via advanced air filtration.",
    tag: "Controlled"
  }
];

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children, className = "", direction = "up" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const animationClass = isVisible
    ? direction === "left" ? "animate-reveal-left"
      : direction === "right" ? "animate-reveal-right"
        : "animate-fade-up"
    : "opacity-0";

  return (
    <div ref={ref} className={`${className} ${animationClass}`}>
      {children}
    </div>
  );



};

export default function InfrastructurePage() {
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string; desc: string; tag: string } | null>(null);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxImage]);

  const facilityFeatures = [
    {
      title: "Advanced Machinery",
      desc: "Our facility is equipped with state-of-the-art automated machinery, including vacuum emulsifiers, high-speed tube filling, and multi-track packaging units for precision manufacturing.",
      icon: Settings,
      image: "/8.webp"
    },
    {
      title: "Production Capacity",
      desc: "We boast a massive production capacity, capable of scaling from small startup batches to large-scale millions of units per month with consistent quality and fast turnaround.",
      icon: Zap,
      image: "/9.webp"
    },
    {
      title: "Hygiene Standards",
      desc: "Maintaining strict hygiene standards is our priority. Our facility features ISO Class cleanrooms with HEPA filtration and rigorous sanitation protocols to ensure zero-contamination.",
      icon: ShieldCheck,
      image: "/10.webp"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] py-24 flex items-center overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/infrastructure-banner.webp"
            alt="Factory Infrastructure"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          {/* Left-side dark gradient: very dark on the far left for text readability, fading to transparent on the right to keep machinery clear */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 md:via-slate-950/40 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <RevealOnScroll className="max-w-4xl space-y-6 text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 font-black text-[10px] md:text-xs uppercase tracking-[0.2em] mb-4 backdrop-blur-sm">
              Modern Hi-Tech Infrastructure
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-white">
              World-Class <br />
              <span className="text-teal-400">Infrastructure.</span>
            </h1>
            <p className="text-base md:text-xl text-slate-100 max-w-2xl font-bold leading-relaxed drop-shadow-xl">
              Our manufacturing facility is designed on a modern clean-room concept to ensure 100% hygienic and contamination-free production conditions. We use advanced automated machinery and controlled manufacturing processes to maintain superior product consistency, safety, and quality standards.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Manufacturing Capacity Carousel Section */}
      <StatCarousel />


      {/* Why Our Infrastructure Matters */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px]"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <RevealOnScroll direction="left" className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">
                Why Our <br />
                <span className="text-teal-400">Infrastructure Matters.</span>
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {[
                  "Clean-room based manufacturing environment",
                  "Advanced automated production systems",
                  "Hygienic and contamination-controlled processing",
                  "High-speed filling and packaging operations",
                  "Scalable production capabilities",
                  "Batch consistency and quality assurance",
                  "Efficient turnaround timelines"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-2 h-2 bg-teal-500 rounded-full group-hover:scale-150 transition-transform"></div>
                    <p className="text-slate-300 font-bold text-sm md:text-lg tracking-tight group-hover:text-white transition-colors">{item}</p>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right" className="relative group">
              <div className="relative aspect-square rounded-[60px] overflow-hidden border-8 border-white/5">
                <Image src="/home.webp" alt="Automated Machinery" fill className="object-cover group-hover:scale-110 transition-transform duration-[5s]" />
                <div className="absolute inset-0 bg-teal-600/10 mix-blend-overlay"></div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-10 -left-10 bg-teal-600 p-8 rounded-[40px] shadow-2xl animate-bounce-slow hidden md:block">
                <ShieldCheck className="w-12 h-12 text-white mb-2" />
                <p className="text-white font-black text-xl uppercase tracking-tighter">100% Sterile</p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Advanced Technical Gallery */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none select-none overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mb-20">
            <RevealOnScroll>
              <div className="flex items-center gap-4 mb-6">
                <span className="h-[2px] w-12 bg-teal-500 rounded-full"></span>
                <span className="text-xs font-black text-teal-600 uppercase tracking-[0.4em]">Infrastructure 4.0</span>
              </div>
              <h2 className="text-2xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-[0.9] mb-8">
                A Modern Manufacturing <br />
                <span className="text-slate-300">Powerhouse.</span>
              </h2>
              <p className="text-slate-500 text-lg md:text-xl font-bold max-w-2xl leading-relaxed">
                Take a closer look at our high-tech facility, where state-of-the-art machinery meets rigorous hygiene standards to deliver world-class excellence.
              </p>
            </RevealOnScroll>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[180px] md:auto-rows-[200px]">
            {galleryImages.map((img, index) => (
              <div key={index} onClick={() => setLightboxImage(img)} className="cursor-pointer">
                <RevealOnScroll
                  className="relative group overflow-hidden rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/40 h-[180px] md:h-[200px]"
                >
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    className="object-cover transition-all duration-[1.5s] group-hover:scale-110"
                  />

                  {/* Always-visible dark gradient at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                  {/* Zoom Icon - appears on hover */}
                  <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                      <Maximize className="w-4 h-4 text-slate-900" />
                    </div>
                  </div>

                  {/* Always-visible title label at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-3">
                    <div className="inline-block bg-slate-900/80 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                      <h4 className="text-[11px] font-black text-white uppercase tracking-widest leading-none">{img.title}</h4>
                    </div>
                  </div>

                  {/* Hover glow overlay */}
                  <div className="absolute inset-0 ring-2 ring-teal-500 ring-inset opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                </RevealOnScroll>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Popup */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {/* Full Image */}
            <div className="relative w-full aspect-video">
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 80vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            </div>

            {/* Caption */}
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-[2px] bg-teal-500"></span>
                <span className="text-teal-400 text-[10px] font-black uppercase tracking-[0.3em]">{lightboxImage.tag}</span>
              </div>
              <h3 className="text-xl md:text-3xl font-black text-white uppercase tracking-tight mb-2">{lightboxImage.title}</h3>
              <p className="text-slate-400 font-medium text-sm leading-relaxed">{lightboxImage.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <RevealOnScroll className="max-w-3xl mx-auto space-y-10">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">Visit Our Facility</h2>
            <p className="text-slate-600 text-xl font-bold">We welcome brand owners for physical tours of our state-of-the-art production floors in Noida.</p>
            <Link href="/#contact" className="px-12 py-6 bg-slate-950 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-teal-600 transition-all shadow-2xl inline-block hover:-translate-y-1">
              Schedule a Factory Tour
            </Link>
          </RevealOnScroll>
        </div>
      </section>



    </div>
  );
}
