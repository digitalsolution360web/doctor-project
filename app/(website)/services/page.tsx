"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import CategoriesSection from "@/app/(website)/categories/page";
import Link from "next/link";
import {
  FlaskConical,
  ShieldCheck,
  ArrowRight,
  Beaker,
  ClipboardCheck,
  Truck,
  Settings,
  Package,
  TrendingUp,
  Palette,
  ChevronRight,
  CheckCircle2
} from "lucide-react";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
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
        : "animate-fade-up"
    : "opacity-0";

  return (
    <div ref={ref} className={`${className} ${animationClass}`} style={style}>
      {children}
    </div>
  );
};

export default function ServicesPage() {
  const services = [
    {
      id: "private-label",
      title: "Private Label Manufacturing",
      subtitle: "Launch Your Brand Effortlessly",
      description: "Start your own cosmetic brand without owning a factory. We provide a complete turnkey solution from concept to market-ready products.",
      features: ["Ready formulations", "Custom branding", "Packaging support"],
      image: "/manufac.webp",
      icon: Package
    },
    {
      id: "custom-formulation",
      title: "Custom Formulation",
      subtitle: "Unique & Exclusive Recipes",
      description: "Unique formulations tailored to your brand vision. Our R&D team develops exclusive recipes using high-performance active ingredients.",
      features: ["Active ingredients", "Trend-based products (Niacinamide, Kojic Acid, etc.)", "Stability testing"],
      image: "/custom.webp",
      icon: FlaskConical
    },
    {
      id: "contract-manufacturing",
      title: "Contract Manufacturing",
      subtitle: "Scalable Production Excellence",
      description: "Large-scale production with consistent quality. We offer flexible manufacturing capacities to grow with your brand.",
      features: ["Bulk production", "High-speed filling", "Quality assurance & compliance"],
      image: "/contract.webp",
      icon: Settings
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero / Banner Section */}
      <section className="relative h-[60vh] flex items-center pt-20 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <Image
            src="/services.webp"
            alt="Manufacturing Services"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <RevealOnScroll className="max-w-4xl space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 font-black text-xs uppercase tracking-[0.2em] mb-4">
              Complete Beauty Solutions
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-[0.85]">
              Our Manufacturing <span className="text-teal-400">Services.</span>
            </h1>
            <h2 className="text-xl md:text-3xl font-bold text-slate-300 tracking-tight leading-tight uppercase">
              Complete Third-Party & <br className="hidden md:block" /> Private Label Solutions
            </h2>
          </RevealOnScroll>
        </div>
      </section>

      {/* Services List Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <RevealOnScroll direction="left" className="space-y-10 group">
              <div className="relative aspect-[4/5] rounded-[60px] overflow-hidden border-8 border-slate-50 shadow-2xl">
                <Image src="/lab.webp" alt="Service Excellence" fill className="object-cover group-hover:scale-105 transition-transform duration-[4000ms]" />
                <div className="absolute inset-0 bg-teal-600/10 mix-blend-overlay"></div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right" className="space-y-12">
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold text-teal-600 tracking-[0.3em] uppercase mb-4">A-Z Solutions</h3>
                <h4 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Global Standard <br /><span className="text-slate-400">Capabilities.</span></h4>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {[
                  "Custom Cosmetic Formulation Development",
                  "Third-Party Manufacturing",
                  "Private Label Manufacturing",
                  "Product Concept Development",
                  "Packaging & Branding Support",
                  "Bulk Manufacturing Solutions",
                  "Regulatory & Documentation Support",
                  "Product Stability & Quality Testing",
                  "Innovative Ingredient-Based Product Development"
                ].map((service, i) => (
                  <div key={i} className="flex items-center gap-5 group/item">
                    <div className="w-6 h-6 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 group-hover/item:bg-teal-600 group-hover/item:text-white transition-all">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <p className="text-slate-700 font-bold text-base md:text-lg tracking-tight group-hover/item:text-teal-700 transition-colors">{service}</p>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Categories Grid Section */}
      {/* <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-lime-500/5 rounded-full blur-[120px]"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <RevealOnScroll className="text-center mb-20 space-y-4">
            <h3 className="text-[10px] font-bold text-teal-400 tracking-[0.3em] uppercase mb-4">Manufacturing Scope</h3>
            <h4 className="text-3xl md:text-6xl font-black tracking-tighter uppercase">Categories We <br className="hidden md:block" /><span className="text-teal-400">Manufacture.</span></h4>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {[
              "Skincare", "Haircare", "Body Care", "Bath & Shower",
              "Sunscreens", "Handmade Soaps", "Baby Care", "Mother Care",
              "Men’s Grooming", "Intimate Hygiene", "Derma Cosmetics",
              "Dental Care Products", "PDRN & Advanced Cosmetic Formulations"
            ].map((cat, i) => (
              <RevealOnScroll key={i} className="group p-8 bg-white/5 border border-white/10 rounded-[40px] hover:bg-white transition-all duration-700">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-teal-400 group-hover:bg-teal-600 group-hover:text-white transition-all">
                    <Package className="w-6 h-6" />
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500 group-hover:scale-[3] transition-transform"></div>
                </div>
                <h5 className="text-lg md:text-xl font-black tracking-tight group-hover:text-slate-900 transition-colors">{cat}</h5>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-4 opacity-0 group-hover:opacity-100 transition-all group-hover:text-teal-600">Premium Formulation</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section> */}
      <CategoriesSection />

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <RevealOnScroll className="max-w-3xl mx-auto space-y-10">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-tight">
              Bring Your Vision <br /><span className="text-teal-600">to Life.</span>
            </h2>
            <Link href="/#contact" className="px-12 py-6 bg-slate-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-teal-600 transition-all shadow-2xl inline-block">
              Request Project Proposal
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}






