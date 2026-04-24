"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, 
  Award, 
  CheckCircle, 
  Globe, 
  ChevronRight, 
  Trophy,
  ClipboardCheck,
  FileCheck,
  Medal,
  CheckCircle2
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

export default function CertificationsPage() {
  const certs = [
    {
      title: "ISO 22716:2007",
      body: "Cosmetic GMP Standard",
      desc: "The international standard for Good Manufacturing Practices (GMP) specifically for the cosmetics industry, ensuring safety and quality through all stages.",
      icon: Award
    },
    {
      title: "GMP Certified",
      body: "Good Manufacturing Practices",
      desc: "Our production facility strictly adheres to GMP guidelines, ensuring that products are consistently produced and controlled according to quality standards.",
      icon: ShieldCheck
    },
    {
      title: "ISO 9001:2015",
      body: "Quality Management System",
      desc: "Certification for our ability to consistently provide products that meet customer and applicable statutory and regulatory requirements.",
      icon: Medal
    },
    {
      title: "Dermatologically Tested",
      body: "Safety First Excellence",
      desc: "We follow rigorous clinical protocols to ensure every formulation is safe for skin and meets international safety benchmarks.",
      icon: CheckCircle2
    },
    {
      title: "HALAL Certified",
      body: "Ethical Manufacturing",
      desc: "Compliance with Halal standards, ensuring that our ingredients and manufacturing processes are ethically and religiously compliant.",
      icon: Globe
    },
    {
      title: "FDA Compliant",
      body: "Regulatory Authority",
      desc: "Our formulations and facility maintain strict compliance with FDA guidelines for cosmetic manufacturing and labeling.",
      icon: FileCheck
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-slate-50 border-b border-slate-100">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 border border-teal-500 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 border border-teal-500 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <RevealOnScroll className="max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-700 font-black text-xs uppercase tracking-widest mb-4">
              Uncompromising Quality
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter uppercase">
              Global <span className="text-teal-600">Certifications.</span>
            </h1>
            <p className="text-xl text-slate-700 max-w-2xl mx-auto font-bold leading-relaxed">
              We don't just claim quality; we prove it. Our facility and processes are audited by international authorities to ensure world-class standards.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Main Certs Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {certs.map((cert, i) => (
              <RevealOnScroll key={i} className="h-full">
                <div className="p-10 bg-white border border-slate-100 rounded-[40px] shadow-sm hover:shadow-2xl transition-all duration-700 group relative overflow-hidden h-full flex flex-col">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
                  
                  <div className="relative z-10 flex-1">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-teal-600 transition-all shadow-sm">
                      <cert.icon className="w-8 h-8 text-teal-600 group-hover:text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">{cert.title}</h3>
                    <p className="text-teal-600 font-black text-xs uppercase tracking-[0.2em] mb-6">{cert.body}</p>
                    <p className="text-slate-600 text-lg font-bold leading-relaxed">{cert.desc}</p>
                  </div>

                  <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between group-hover:border-teal-100 transition-colors relative z-10">
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Global Compliance</span>
                    <Medal className="w-5 h-5 text-slate-200 group-hover:text-teal-500 transition-colors" />
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              Certification <span className="text-teal-600">Badges.</span>
            </h2>
            <p className="text-slate-600 text-xl font-bold uppercase tracking-widest text-xs">Our Commitment in Seals</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <RevealOnScroll key={i} className="relative aspect-square bg-white rounded-3xl border border-slate-200 p-10 flex items-center justify-center hover:shadow-2xl transition-all duration-500 group">
                <ShieldCheck className="w-16 h-16 text-slate-100 group-hover:text-teal-500 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <p className="text-slate-900 font-black text-xs uppercase tracking-widest leading-tight">ISO 22716 Certified Process</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.1),transparent_70%)]"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <RevealOnScroll className="max-w-3xl mx-auto space-y-10">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-tight">
              Safety is <span className="text-teal-400">Non-Negotiable.</span>
            </h2>
            <p className="text-slate-400 text-xl font-bold leading-relaxed">
              Every batch undergoes rigorous quality checks before it leaves our facility. We prioritize consumer safety above all else.
            </p>
            <div className="pt-4">
              <Link href="/infrastructure" className="px-10 py-5 bg-teal-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all inline-block shadow-2xl">
                Explore Our Infrastructure
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
