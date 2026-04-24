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
  FileCheck
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

export default function CertificationsPage() {
  const certs = [
    {
      title: "ISO 9001:2015",
      body: "Quality Management System",
      desc: "Internationally recognized standard for quality management, ensuring consistent products and services that meet customer and regulatory requirements.",
      icon: Award
    },
    {
      title: "WHO-GMP",
      body: "Good Manufacturing Practices",
      desc: "World Health Organization standards for ensuring that products are consistently produced and controlled according to quality standards.",
      icon: ShieldCheck
    },
    {
      title: "HACCP",
      body: "Food Safety Management",
      desc: "Hazard Analysis Critical Control Point system for identifying, evaluating, and controlling food safety hazards in our nutraceutical production.",
      icon: ClipboardCheck
    },
    {
      title: "FSSAI Certified",
      body: "Food Safety Authority of India",
      desc: "Full compliance with the Food Safety and Standards Authority of India for all our herbal and nutritional formulations.",
      icon: CheckCircle
    },
    {
      title: "HALAL Certified",
      body: "Global Halal Compliance",
      desc: "Certification ensuring our production processes and ingredients meet the strict dietary guidelines of Halal standards.",
      icon: Globe
    },
    {
      title: "GLP Compliant",
      body: "Good Laboratory Practices",
      desc: "Ensuring that our laboratory studies are planned, performed, monitored, recorded, and reported according to global standards.",
      icon: FileCheck
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-slate-50">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 border border-teal-500 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 border border-teal-500 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <RevealOnScroll className="max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-700 font-black text-xs uppercase tracking-widest mb-4">
              Quality Above All
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tighter uppercase">
              Global Standards. <br />
              <span className="text-teal-600">Uncompromised</span> Quality.
            </h1>
            <p className="text-xl text-slate-700 max-w-2xl mx-auto font-bold leading-relaxed">
              Our facilities and processes are audited and certified by leading international bodies to ensure your safety and trust.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Main Certs Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {certs.map((cert, i) => (
              <RevealOnScroll key={i} direction={i % 2 === 0 ? "left" : "right"}>
                <div className="p-10 bg-white border border-slate-100 rounded-[40px] shadow-sm hover:shadow-2xl transition-all duration-700 group relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-teal-600 transition-all shadow-sm">
                      <cert.icon className="w-8 h-8 text-teal-600 group-hover:text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">{cert.title}</h3>
                    <p className="text-teal-600 font-black text-xs uppercase tracking-[0.2em] mb-6">{cert.body}</p>
                    <p className="text-slate-600 text-lg font-bold leading-relaxed">{cert.desc}</p>
                  </div>

                  <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between group-hover:border-teal-100 transition-colors">
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Valid & Verified</span>
                    <Trophy className="w-5 h-5 text-slate-200 group-hover:text-teal-500 transition-colors" />
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Assurance Section */}
      <section className="py-16 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.1),transparent_70%)]"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <RevealOnScroll direction="left" className="flex-1 space-y-8">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">
                Quality is <br /> <span className="text-teal-400">Not an Accident.</span>
              </h2>
              <p className="text-slate-400 text-xl font-bold leading-relaxed">
                It is always the result of high intention, sincere effort, intelligent direction, and skillful execution. We don't just follow standards; we set them.
              </p>
              <div className="flex items-center space-x-12">
                <div className="space-y-1">
                  <p className="text-4xl font-black text-white">100%</p>
                  <p className="text-teal-400 text-[10px] font-black uppercase tracking-widest">Audit Compliance</p>
                </div>
                <div className="w-px h-12 bg-white/10"></div>
                <div className="space-y-1">
                  <p className="text-4xl font-black text-white">0%</p>
                  <p className="text-teal-400 text-[10px] font-black uppercase tracking-widest">Batch Rejection</p>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right" className="flex-1 relative">
              <div className="relative aspect-square rounded-[48px] overflow-hidden border border-white/10 group">
                <Image 
                  src="/banner.webp" 
                  alt="Quality Assurance" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-[3000ms]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20">
                  <p className="text-white font-black text-lg uppercase tracking-tight italic">
                    "Every dose is a promise of health kept."
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="p-12 bg-slate-50 rounded-[48px] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase">Download Compliance</h2>
              <p className="text-slate-600 font-bold text-lg">Access our full list of certifications and technical audit reports.</p>
            </div>
            <button className="px-10 py-5 bg-teal-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-slate-900 transition-all shadow-xl shrink-0">
              Technical Documents
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
