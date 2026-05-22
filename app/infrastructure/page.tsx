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
      <section className="relative min-h-[50vh] py-20 flex items-center overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/newbanner.webp"
            alt="Factory Infrastructure"
            fill
            sizes="100vw"
            className="object-cover opacity-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <RevealOnScroll className="max-w-4xl space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 font-black text-xs uppercase tracking-[0.2em] mb-4">
              Our Manufacturing Strength
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
              State-of-the-Art <br />
              <span className="text-teal-400">Infrastructure.</span>
            </h1>
            <p className="text-base md:text-xl text-slate-400 max-w-2xl font-medium leading-relaxed">
              Equipped with global technology and high-precision machinery to deliver pharmaceutical-grade cosmetic manufacturing at scale.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Grid Features */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {facilityFeatures.map((f, i) => (
              <RevealOnScroll key={i} className="group">
                <div className="relative aspect-[4/3] md:aspect-square rounded-[32px] md:rounded-[40px] overflow-hidden mb-6 shadow-xl border border-slate-100">
                  <Image src={f.image} alt={f.title} fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6">
                    <f.icon className="w-8 h-8 md:w-10 md:h-10 text-teal-400" />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tighter mb-3">{f.title}</h3>
                <p className="text-slate-600 font-medium text-sm md:text-base leading-relaxed">{f.desc}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="bg-slate-900 rounded-[32px] md:rounded-[60px] p-8 md:p-16 text-white shadow-2xl border border-white/5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 text-center">
              {[
                { val: "12,000", label: "Sq. Ft. Facility" },
                { val: "55k", label: "Bottles Daily Capacity Automatic Servo-Based Bottle Filling Machine" },
                { val: "40k", label: "Jars Daily Capacity  Automatic Jar  Filling Machine" },
                { val: "55k", label: "Tubs Automatic Double Head Tube Filling Machine" }
              ].map((stat, i) => (
                <div key={i} className="space-y-1 md:space-y-3 group p-4 rounded-3xl transition-colors hover:bg-white/5">
                  <p className="text-2xl sm:text-3xl md:text-5xl font-black text-teal-400 tracking-tighter transition-transform group-hover:scale-110 duration-500">{stat.val}</p>
                  <p className="text-[10px] md:text-xs text-slate-400 font-black uppercase tracking-[0.2em] leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hygiene Section */}
      <section className="py-12 md:py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <RevealOnScroll direction="left" className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                Pure Environment. <br />
                <span className="text-teal-600">Pure Products.</span>
              </h2>
              <div className="grid grid-cols-1 gap-4 md:gap-6">
                {[
                  { icon: Wind, title: "Air Filtration", desc: "Equipped with HVAC systems and ISO Class Cleanrooms for sterilized air flow." },
                  { icon: Thermometer, title: "Temp Controlled", desc: "Sensitive active ingredients are stored and processed at optimal temperatures." },
                  { icon: Layers, title: "Zero Cross-Contamination", desc: "Separated zones for R&D, manufacturing, and storage to ensure purity." }
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-4 md:space-x-6 p-5 md:p-6 bg-slate-50 rounded-[24px] md:rounded-[32px] border border-slate-100 hover:border-teal-200 transition-colors">
                    <div className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 shadow-sm text-teal-600">
                      <item.icon className="w-5 h-5 md:w-7 md:h-7" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 uppercase tracking-tight text-xs md:text-sm mb-1">{item.title}</h4>
                      <p className="text-slate-500 font-medium text-[10px] md:text-xs leading-tight md:leading-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right" className="flex-1 relative w-full">
              <div className="relative aspect-square md:aspect-[4/5] rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl">
                <Image src="/logo.webp" alt="Hygiene Process" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain bg-slate-50 p-12 md:p-20 opacity-20" />
                <div className="absolute inset-0 bg-teal-600/5 mix-blend-overlay"></div>
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="bg-white/90 backdrop-blur-md p-6 md:p-10 rounded-[32px] md:rounded-[40px] border border-white shadow-2xl text-center space-y-2 md:space-y-4 max-w-[280px] md:max-w-none">
                    <ShieldCheck className="w-10 h-10 md:w-16 md:h-16 text-teal-600 mx-auto" />
                    <p className="font-black text-slate-900 uppercase tracking-widest text-base md:text-lg">GMP Certified</p>
                    <p className="text-slate-500 font-bold text-[10px] md:text-xs uppercase">Safe & Sterile</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <RevealOnScroll className="max-w-2xl mx-auto space-y-8">
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
