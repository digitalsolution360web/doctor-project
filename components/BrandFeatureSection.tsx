"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  Settings,
  FlaskConical,
  Factory,
  Target,
  Sparkles,
  ArrowRight
} from "lucide-react";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "scale";
  style?: React.CSSProperties;
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children, className = "", direction = "up", style }) => {
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
        : direction === "scale" ? "animate-scale-up"
          : "animate-fade-up"
    : "opacity-0";

  return (
    <div ref={ref} className={`${className} ${animationClass}`} style={style}>
      {children}
    </div>
  );
};

const BrandFeatureSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-slate-50 to-transparent"></div>
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-teal-50 rounded-full blur-[100px] opacity-60"></div>
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-lime-50 rounded-full blur-[100px] opacity-60"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <RevealOnScroll direction="left" className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 text-teal-700 font-bold text-xs uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              Innovation & Trust
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
              Premium Cosmetic <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-lime-600">Manufacturing</span>
            </h2>

            <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl">
              At <span className="text-slate-900 font-bold">MIDFLORA HERBAL LLP</span>, we don’t just manufacture products — we help brands create experiences customers remember. With advanced clean-room infrastructure, high-capacity automated production, and a research-driven approach, we turn cosmetic ideas into market-ready success stories.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {[
                "Advanced Clean-Room Setup",
                "High-Capacity Automated Production",
                "Research-Driven Formulations",
                "Scalable Manufacturing Solutions"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-lime-100 flex items-center justify-center text-lime-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-700 font-bold text-sm tracking-tight">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-6">
              <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
                <Factory className="w-5 h-5 text-teal-600" />
                <span className="text-slate-800 font-bold text-sm">Modern Infrastructure</span>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
                <FlaskConical className="w-5 h-5 text-teal-600" />
                <span className="text-slate-800 font-bold text-sm">Research-Driven</span>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="right" className="relative group">
            <div className="relative aspect-[4/5] rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl border-8 border-white group-hover:scale-[1.02] transition-transform duration-700">
              <Image
                src="/lab.webp"
                alt="State-of-the-art Manufacturing"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">Our Expertise</p>
                    <h4 className="text-white text-lg font-bold">Skincare to Haircare & Beyond</h4>
                  </div>
                  <div className="w-12 h-12 bg-lime-400 rounded-2xl flex items-center justify-center text-slate-900">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Achievement Card */}
            <div className="absolute -top-10 -left-10 bg-white p-6 rounded-3xl shadow-xl border border-slate-50 hidden md:block animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center text-white">
                  <Settings className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900 leading-none">100%</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Automated Units</p>
                </div>
              </div>
            </div>

            {/* Floating Achievement Card 2 */}
            <div className="absolute -bottom-10 -right-5 bg-white p-6 rounded-3xl shadow-xl border border-slate-50 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-lime-400 rounded-2xl flex items-center justify-center text-slate-900">
                  <FlaskConical className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900 leading-none">500+</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Formulations</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>

        </div>

        <RevealOnScroll className="mt-24 pt-12 border-t border-slate-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Skincare", value: "Serums & Creams" },
              { label: "Haircare", value: "Oils & Shampoos" },
              { label: "Derma Cosmetics", value: "Clinical Range" },
              { label: "Baby Care", value: "Gentle Products" }
            ].map((item, index) => (
              <div key={index} className="text-center md:text-left space-y-1">
                <p className="text-xs font-bold text-teal-600 uppercase tracking-[0.2em]">{item.label}</p>
                <p className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">{item.value}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default BrandFeatureSection;
