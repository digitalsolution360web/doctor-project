"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Beaker,
  Microscope,
  FlaskConical,
  Sparkles,
  ShieldCheck,
  Globe,
  Smile,
  Leaf
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

export default function RDPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-white border-b border-slate-100">
        <div className="absolute inset-0 z-0 bg-slate-950">
          <Image
            src="/labb.webp"
            alt="R&D Lab"
            fill
            sizes="100vw"
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <RevealOnScroll className="max-w-4xl space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 font-black text-[10px] md:text-xs uppercase tracking-[0.2em] mb-4">
              Our Strength
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9] text-white">
              Research & Development <br />
              <span className="text-teal-400 text-xl md:text-4xl mt-4 block">is Our Core Strength</span>
            </h1>
            <p className="text-base md:text-xl text-slate-300 max-w-2xl font-bold leading-relaxed">
              At MIDFLORA HERBAL LLP, innovation begins in our R&D lab. Our experienced formulation team continuously works on trending ingredients, advanced textures, high-performance actives, and market-driven concepts to help brands stay ahead in the evolving cosmetic industry.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Expertise Sections */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-teal-50 rounded-full blur-[120px] opacity-60"></div>
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <RevealOnScroll direction="left" className="space-y-10">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                  We focus <span className="text-teal-600 font-semibold tracking-normal lowercase italic">on excellence.</span>
                </h2>
                <div className="w-20 h-1 bg-teal-600"></div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Innovative ingredient combinations", icon: FlaskConical },
                  { title: "Stable & effective formulations", icon: ShieldCheck },
                  { title: "Premium textures and sensorial experience", icon: Smile },
                  { title: "Market trend research", icon: Globe },
                  { title: "Product customization", icon: Sparkles },
                  { title: "Fast product development support", icon: Beaker }
                ].map((item, i) => (
                  <div key={i} className="flex items-start p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-500 group">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all mr-4 shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <p className="text-slate-900 font-bold text-sm tracking-tight pt-1 leading-tight">{item.title}</p>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
            <RevealOnScroll direction="right">
              <div className="relative aspect-square rounded-[60px] overflow-hidden shadow-2xl border-[12px] border-slate-50 group">
                <Image src="/contract.webp" alt="R&D Team at Work" fill sizes="(max-width: 768px) 100vw, 600px" className="object-cover group-hover:scale-110 transition-transform duration-[5s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-transparent"></div>
              </div>
            </RevealOnScroll>
          </div>

          <RevealOnScroll className="max-w-4xl mx-auto">
            <div className="p-12 md:p-20 bg-slate-950 rounded-[60px] text-center relative overflow-hidden">
                {/* Decorative glow */}
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-teal-500/20 rounded-full blur-[80px]"></div>
                
                <h3 className="relative z-10 text-xl md:text-3xl text-teal-400 font-black italic tracking-tight leading-relaxed">
                  "We believe every successful cosmetic product starts with strong research and thoughtful formulation science."
                </h3>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <RevealOnScroll className="max-w-3xl mx-auto space-y-10">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-tight">
              Ready to Innovate <br /><span className="text-teal-600">Your Brand?</span>
            </h2>
            <Link href="/#contact" className="px-12 py-6 bg-slate-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-teal-600 transition-all shadow-2xl inline-block hover:-translate-y-1">
              Start Formulation Now
            </Link>
          </RevealOnScroll>
        </div>
      </section>

    </div>
  );
}
