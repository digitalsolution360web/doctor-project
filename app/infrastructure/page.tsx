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
  Wind
} from "lucide-react";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
}

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
  const facilityFeatures = [
    {
      title: "Advanced Machinery",
      desc: "High-speed automated production lines including vacuum emulsifiers, tube filling machines, and multi-track sachet packing units.",
      icon: Settings,
      image: "/8.webp"
    },
    {
      title: "Production Capacity",
      desc: "Scaling your brand from small batches to millions of units per month with zero compromise on precision.",
      icon: Zap,
      image: "/9.webp"
    },
    {
      title: "Hygiene Standards",
      desc: "ISO & GMP certified cleanrooms with HEPA filtration and strict sanitation protocols to ensure zero-contamination environments.",
      icon: ShieldCheck,
      image: "/10.webp"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/banner.webp" 
            alt="Factory Infrastructure" 
            fill 
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <RevealOnScroll className="max-w-3xl space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 font-black text-xs uppercase tracking-widest mb-4">
              Our Manufacturing Strength
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
              State-of-the-Art <br />
              <span className="text-teal-400">Infrastructure.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl font-bold leading-relaxed">
              Equipped with global technology and high-precision machinery to deliver pharmaceutical-grade cosmetic manufacturing at scale.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Grid Features */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {facilityFeatures.map((f, i) => (
              <RevealOnScroll key={i} className="group">
                <div className="relative aspect-square rounded-[40px] overflow-hidden mb-8 shadow-2xl border border-slate-100">
                  <Image src={f.image} alt={f.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-8 left-8">
                    <f.icon className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-4">{f.title}</h3>
                <p className="text-slate-600 font-bold leading-relaxed">{f.desc}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="bg-slate-900 rounded-[60px] p-12 md:p-24 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
              {[
                { val: "50,000+", label: "Sq. Ft. Facility" },
                { val: "100k+", label: "Daily Capacity" },
                { val: "25+", label: "Auto Lines" },
                { val: "Zero", label: "Waste Target" }
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                  <p className="text-5xl font-black text-teal-400 tracking-tighter">{stat.val}</p>
                  <p className="text-slate-400 font-black text-xs uppercase tracking-[0.3em]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hygiene Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <RevealOnScroll direction="left" className="flex-1 space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                Pure Environment. <br />
                <span className="text-teal-600">Pure Products.</span>
              </h2>
              <div className="space-y-6">
                {[
                  { icon: Wind, title: "Air Filtration", desc: "Equipped with HVAC systems and ISO Class Cleanrooms for sterilized air flow." },
                  { icon: Thermometer, title: "Temp Controlled", desc: "Sensitive active ingredients are stored and processed at optimal temperatures." },
                  { icon: Layers, title: "Zero Cross-Contamination", desc: "Separated zones for R&D, manufacturing, and storage to ensure purity." }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-6 p-6 bg-slate-50 rounded-[32px] border border-slate-100">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm text-teal-600">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 uppercase tracking-tight text-sm mb-1">{item.title}</h4>
                      <p className="text-slate-600 font-bold text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll direction="right" className="flex-1 relative">
              <div className="relative aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl">
                <Image src="/logo.webp" alt="Hygiene Process" fill className="object-contain bg-slate-50 p-20 opacity-20" />
                <div className="absolute inset-0 bg-teal-600/10 mix-blend-overlay"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="bg-white/90 backdrop-blur-md p-10 rounded-[40px] border border-white shadow-2xl text-center space-y-4">
                      <ShieldCheck className="w-16 h-16 text-teal-600 mx-auto" />
                      <p className="font-black text-slate-900 uppercase tracking-widest text-lg">GMP Certified</p>
                      <p className="text-slate-500 font-bold text-xs uppercase">Safe & Sterile</p>
                   </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <RevealOnScroll className="max-w-2xl mx-auto space-y-10">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">Visit Our Facility</h2>
            <p className="text-slate-600 text-xl font-bold">We welcome brand owners for physical tours of our state-of-the-art production floors.</p>
            <Link href="/#contact" className="px-12 py-6 bg-slate-950 text-white rounded-[24px] font-black text-sm uppercase tracking-widest hover:bg-teal-600 transition-all shadow-2xl inline-block">
              Schedule a Factory Tour
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
