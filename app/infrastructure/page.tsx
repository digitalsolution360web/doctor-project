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
      <section className="relative min-h-[60vh] py-20 flex items-center overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/infractural.webp"
            alt="Factory Infrastructure"
            fill
            sizes="100vw"
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <RevealOnScroll className="max-w-4xl space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 font-black text-xs uppercase tracking-[0.2em] mb-4">
              Modern Hi-Tech Infrastructure
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9]">
              World-Class <br />
              <span className="text-teal-400">Infrastructure.</span>
            </h1>
            <p className="text-base md:text-xl text-slate-400 max-w-2xl font-bold leading-relaxed">
              Our manufacturing facility is designed on a modern clean-room concept to ensure 100% hygienic and contamination-free production conditions. We use advanced automated machinery and controlled manufacturing processes to maintain superior product consistency, safety, and quality standards.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Stats Section - Manufacturing Capacity */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <RevealOnScroll className="mb-16">
            <h2 className="text-[10px] font-bold text-teal-600 tracking-[0.3em] uppercase mb-4">Production Power</h2>
            <h3 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase">Manufacturing <span className="text-slate-400">Capacity.</span></h3>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { val: "180 Tons+", label: "Monthly Manufacturing Capacity", icon: Layers },
              { val: "50,000", label: "Tube Filling (Tubes Per Day)", icon: Settings },
              { val: "75,000", label: "Bottle Filling (4-Head Servo Liquid)", icon: Zap },
              { val: "40,000", label: "Jar Filling (2-Head Jar Per Day)", icon: Factory }
            ].map((stat, i) => (
              <div key={i} className="p-10 bg-slate-50 rounded-[40px] border border-slate-100 hover:bg-slate-900 group transition-all duration-700">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-teal-600 transition-colors">
                  <stat.icon className="w-7 h-7 text-teal-600 group-hover:text-white" />
                </div>
                <p className="text-4xl font-black text-slate-900 tracking-tighter mb-2 group-hover:text-white transition-colors">{stat.val}</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-relaxed group-hover:text-slate-400 transition-colors">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                <Image src="/8.webp" alt="Automated Machinery" fill className="object-cover group-hover:scale-110 transition-transform duration-[5s]" />
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
