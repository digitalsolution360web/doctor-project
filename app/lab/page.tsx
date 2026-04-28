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
        <div className="absolute inset-0 z-0">
          <Image 
            src="/banner.webp" 
            alt="R&D Lab" 
            fill
            sizes="100vw"
            className="object-cover opacity-10 grayscale scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <RevealOnScroll className="max-w-3xl space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-700 font-black text-xs uppercase tracking-widest mb-4">
              Science-Driven Innovation
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase leading-none text-slate-900">
              R&D & <br />
              <span className="text-teal-600">Formulation Hub.</span>
            </h1>
            <p className="text-xl text-slate-700 max-w-2xl font-bold leading-relaxed">
              Where serious chemistry meets cosmetic art. Our in-house scientists transform your vision into market-ready, dermatologically tested formulations.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Expertise Sections */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <RevealOnScroll direction="left" className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tighter uppercase leading-none">
                In-House <span className="text-teal-600">Chemists.</span>
              </h2>
              <p className="text-slate-700 text-lg font-bold leading-relaxed">
                Our team of experienced cosmetic chemists and pharmacologists work tirelessly to create unique textures and high-performance products. We don't just use formulas; we engineer results.
              </p>
              <ul className="space-y-4">
                {["Stability Testing", "Microbial Testing", "Compatibility Analysis", "pH Balanced Control"].map((item, i) => (
                  <li key={i} className="flex items-center font-black text-slate-900 uppercase tracking-widest text-xs">
                    <ShieldCheck className="w-5 h-5 text-teal-600 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
            <RevealOnScroll direction="right">
              <div className="relative aspect-square rounded-[60px] overflow-hidden shadow-2xl border border-slate-100">
                <Image src="/8.webp" alt="In-house chemists" fill sizes="(max-width: 768px) 100vw, 600px" className="object-cover" />
              </div>
            </RevealOnScroll>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <RevealOnScroll direction="right" className="lg:order-2 space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tighter uppercase leading-none">
                Global <span className="text-teal-600">Sourcing.</span>
              </h2>
              <p className="text-slate-700 text-lg font-bold leading-relaxed">
                We ethically source premium active ingredients from certified suppliers worldwide. From Swiss peptides to Amazonian clays, we ensure your brand uses only the highest purity materials.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <Globe className="w-8 h-8 text-teal-600 mb-3" />
                    <p className="font-black text-slate-900 uppercase tracking-tight text-xs">Certified Global Suppliers</p>
                 </div>
                 <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <Leaf className="w-8 h-8 text-teal-600 mb-3" />
                    <p className="font-black text-slate-900 uppercase tracking-tight text-xs">Ethically Sourced Extracts</p>
                 </div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll direction="left" className="lg:order-1">
              <div className="relative aspect-square rounded-[60px] overflow-hidden shadow-2xl border border-slate-100">
                <Image src="/3.webp" alt="Global Sourcing" fill sizes="(max-width: 768px) 100vw, 600px" className="object-cover" />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Trend-based formulations */}
      <section className="py-24 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.1),transparent_70%)]"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <RevealOnScroll className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase leading-none">
              Trend-Based <span className="text-teal-400">Formulations.</span>
            </h2>
            <p className="text-xl text-slate-400 font-bold max-w-2xl mx-auto">
              Stay ahead of the market with our trend-focused R&D capabilities. We specialize in modern global beauty movements.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "K-Beauty Inspired", icon: Sparkles, desc: "Glass skin finishes, essence-driven textures, and high-hydration formats." },
                { title: "Ayurvedic Science", icon: Leaf, desc: "Integrating ancient herbal wisdom with modern clinical validation." },
                { title: "Clean Beauty", icon: ShieldCheck, desc: "Sulfate-free, paraben-free, and vegan formulations for conscious consumers." }
              ].map((trend, i) => (
                <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[40px] hover:bg-white hover:text-slate-900 transition-all duration-700 group text-left">
                  <trend.icon className="w-12 h-12 text-teal-400 mb-6 group-hover:text-teal-600" />
                  <h4 className="text-xl font-bold uppercase tracking-tight mb-4">{trend.title}</h4>
                  <p className="text-slate-400 group-hover:text-slate-600 font-bold text-sm leading-relaxed">{trend.desc}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <RevealOnScroll className="max-w-3xl mx-auto space-y-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 uppercase tracking-tighter leading-tight">
              Create Your Unique <br /><span className="text-teal-600">Formulation Today.</span>
            </h2>
            <p className="text-slate-600 text-xl font-bold">Talk to our lead chemists about developing a custom product that belongs only to your brand.</p>
            <Link href="/#contact" className="px-12 py-6 bg-slate-950 text-white rounded-[24px] font-black text-sm uppercase tracking-widest hover:bg-teal-600 transition-all shadow-2xl inline-block">
              Request Lab Consultation
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
