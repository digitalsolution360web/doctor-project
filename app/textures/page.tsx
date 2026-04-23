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
  ClipboardList
} from "lucide-react";

const RevealOnScroll = ({ children, className = "", direction = "up" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
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
      id: "tablets",
      title: "Tablets & Bolus",
      subtitle: "Solid Dosage Excellence",
      desc: "Our high-speed compression technology produces tablets with precise active ingredient distribution and optimized dissolution rates. We offer film-coated, enteric-coated, and sustained-release variants.",
      image: "/9.webp",
      specs: ["Uncoated / Coated", "Dispersible", "Effervescent", "Multi-layer"],
      icon: CircleDot
    },
    {
      id: "capsules",
      title: "Hard & Soft Capsules",
      subtitle: "Encapsulation Technology",
      desc: "Advanced encapsulation services for both hard-shell and soft-gelatin formats. Ensuring maximum bioavailability and stability for sensitive chemical and herbal compounds.",
      image: "/2.webp",
      specs: ["HPMC Hard Shell", "Soft-gelatin", "Liquid Filled", "Band Sealed"],
      icon: Layers
    },
    {
      id: "liquids",
      title: "Liquid Orals",
      subtitle: "Homogeneous Solutions",
      desc: "Precision formulated syrups, suspensions, and elixirs. Our automated mixing tanks ensure 100% homogeneity and stable pH levels across every batch.",
      image: "/10.webp",
      specs: ["Syrups", "Suspensions", "Dry Syrups", "Drops"],
      icon: Droplets
    },
    {
      id: "topicals",
      title: "Topical Formats",
      subtitle: "Dermatological Mastery",
      desc: "Developing high-absorption creams, ointments, and gels. Our cold-process manufacturing maintains the integrity of heat-sensitive active ingredients.",
      image: "/6.webp",
      specs: ["Gels", "Creams", "Ointments", "Lotions"],
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
            className="object-cover opacity-30 object-[center_30%]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <RevealOnScroll className="max-w-3xl space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 font-black text-xs uppercase tracking-widest mb-4">
              Advanced Delivery Formats
            </div>
            <h1 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tighter uppercase">
              Precision <span className="text-teal-400">Textures</span> <br />
              & Formats.
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl font-bold leading-relaxed">
              From high-compression tablets to micro-emulsion liquids, we master every physical format of medicine delivery.
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
                  <div className="relative aspect-video rounded-[48px] overflow-hidden shadow-2xl group border border-slate-100">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]" 
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
                    <span>Technical Compliance</span>
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
                Need a <span className="text-teal-400">Custom Texture</span> for your product?
              </h2>
              <p className="text-slate-400 text-lg font-bold">
                Our R&D team can develop unique delivery formats tailored to your specific active ingredient and target market requirements.
              </p>
              <div className="pt-4">
                <Link href="/about" className="px-10 py-5 bg-teal-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-teal-500 transition-all inline-block shadow-2xl">
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
