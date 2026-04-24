"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  FlaskConical, 
  ArrowRight, 
  ChevronRight, 
  Layers, 
  Droplets, 
  CircleDot, 
  Sparkles,
  ClipboardList,
  Wind,
  Zap,
  Smile
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

export default function TexturesPage() {
  const textures = [
    {
      id: "serums",
      title: "Active Serums",
      subtitle: "High-Penetration Formats",
      desc: "Lightweight, water or oil-based formulations designed for deep skin penetration. Perfect for high-concentration active ingredients like Vitamin C, Niacinamide, and Hyaluronic Acid.",
      image: "/9.webp",
      specs: ["Water-based", "Oil-based", "Bi-phasic", "Silicone-free"],
      icon: Droplets
    },
    {
      id: "creams",
      title: "Luxurious Creams",
      subtitle: "Emulsion Excellence",
      desc: "Rich, velvety emulsions that provide hydration and protection. We master the art of stable oil-in-water and water-in-oil emulsions for various skin types.",
      image: "/2.webp",
      specs: ["Day Creams", "Night Repairs", "Moisturizers", "Anti-aging"],
      icon: Layers
    },
    {
      id: "lotions",
      title: "Fluid Lotions",
      subtitle: "Daily Hydration",
      desc: "Lightweight fluid textures for daily body and face care. Formulated for quick absorption and long-lasting moisture without a greasy feel.",
      image: "/10.webp",
      specs: ["Body Lotions", "Face Milks", "Cleansing Lotions", "Sun Protection"],
      icon: Wind
    },
    {
      id: "gels",
      title: "Soothing Gels",
      subtitle: "Cooling & Transparent",
      desc: "Crystal-clear gel formulations that provide an instant cooling effect. Ideal for aloe-based products, eye gels, and lightweight face treatments.",
      image: "/6.webp",
      specs: ["Face Gels", "Eye Gels", "Hair Gels", "Exfoliating Gels"],
      icon: Sparkles
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/banner.webp" 
            alt="Product Textures" 
            fill 
            className="object-cover opacity-30 object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <RevealOnScroll className="max-w-3xl space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 font-black text-xs uppercase tracking-widest mb-4">
              Advanced Cosmetic Formats
            </div>
            <h1 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tighter uppercase">
              Precision <span className="text-teal-400">Textures</span> <br />
              & Sensory Appeal.
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl font-bold leading-relaxed">
              From ultra-light serums to rich, velvety creams, we master the sensory science of cosmetic delivery.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Grid Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {textures.map((item, i) => (
              <RevealOnScroll key={i} className="group cursor-pointer">
                <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-700 h-full">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:bg-teal-600 transition-all">
                    <item.icon className="w-7 h-7 text-teal-600 group-hover:text-white" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">{item.title}</h4>
                  <p className="text-slate-500 text-xs font-black uppercase tracking-widest">{item.subtitle}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Sections */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-32">
            {textures.map((item, index) => (
              <div 
                key={item.id} 
                className={`flex flex-col lg:flex-row items-center gap-16 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Visual */}
                <RevealOnScroll direction={index % 2 === 0 ? "left" : "right"} className="flex-1 w-full">
                  <div className="rounded-[48px] overflow-hidden shadow-2xl group border border-slate-100 bg-white aspect-[4/3] relative">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                  </div>
                </RevealOnScroll>

                {/* Content */}
                <RevealOnScroll direction={index % 2 === 0 ? "right" : "left"} className="flex-1 space-y-6">
                  <div className="space-y-4">
                    <p className="text-teal-600 font-black text-xs uppercase tracking-[0.4em] mb-4">{item.subtitle}</p>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">{item.title}</h2>
                    <p className="text-slate-700 text-lg font-bold leading-relaxed">{item.desc}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {item.specs.map((spec, i) => (
                      <div key={i} className="flex items-center space-x-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-teal-200 transition-all duration-500">
                        <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                        <span className="text-slate-800 font-black text-[10px] uppercase tracking-tight">{spec}</span>
                      </div>
                    ))}
                  </div>

                  <button className="flex items-center space-x-4 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-teal-600 transition-all shadow-xl group">
                    <span>Explore Formats</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </button>
                </RevealOnScroll>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-[#05080f] rounded-[48px] p-10 md:p-16 relative overflow-hidden text-white text-center">
            <RevealOnScroll className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-tight">
                Need a <span className="text-teal-400">Custom Texture</span> for your brand?
              </h2>
              <p className="text-slate-400 text-lg font-bold">
                Our sensory experts can develop unique textures and feels tailored to your brand's unique market positioning.
              </p>
              <div className="pt-4">
                <Link href="/#contact" className="px-10 py-5 bg-teal-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-teal-500 transition-all inline-block shadow-2xl">
                  Contact R&D Team
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}
