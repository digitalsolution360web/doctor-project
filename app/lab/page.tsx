"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Microscope, 
  FlaskConical, 
  ShieldCheck, 
  Zap, 
  TestTube2, 
  Dna, 
  Database,
  Search,
  ArrowRight
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

export default function LabPage() {
  const labFeatures = [
    {
      title: "Molecular Stability",
      desc: "Our lab tests formulations under various climatic conditions to ensure maximum shelf-life and efficacy.",
      icon: Dna
    },
    {
      title: "Purity Analysis",
      desc: "High-performance liquid chromatography (HPLC) ensures every raw material meets our 99.9% purity benchmark.",
      icon: FlaskConical
    },
    {
      title: "Quality Vault",
      desc: "Every batch is recorded in our digital database for full traceability and regulatory transparency.",
      icon: Database
    },
    {
      title: "Fast Formulation",
      desc: "Our rapid prototyping lab allows us to move from concept to pilot batch in record time.",
      icon: Zap
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-white">
        <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:block">
          <div className="relative h-full w-full">
            <Image 
              src="/8.webp" 
              alt="Advanced Research Lab" 
              fill 
              className="object-cover object-center scale-110"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <RevealOnScroll className="max-w-2xl space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-700 font-black text-xs uppercase tracking-widest">
              State-of-the-Art R&D Center
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tighter uppercase">
              The <span className="text-teal-600">Science</span> <br />
              Behind Wellness.
            </h1>
            <p className="text-xl text-slate-700 max-w-lg font-bold leading-relaxed">
              Our in-house laboratory is the heart of Dr Expert Formulation, where molecules transform into life-changing products.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <button className="px-10 py-5 bg-teal-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-slate-950 transition-all shadow-xl">
                Technical Expertise
              </button>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Lab Stats */}
      <section className="py-16 bg-slate-950 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Research Scientists", val: "25+" },
              { label: "Lab Square Ft", val: "5000+" },
              { label: "Patents Pending", val: "12" },
              { label: "Success Rate", val: "99.9%" }
            ].map((stat, i) => (
              <RevealOnScroll key={i} className="space-y-2">
                <p className="text-4xl md:text-5xl font-black text-teal-400">{stat.val}</p>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <RevealOnScroll className="max-w-3xl mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              Research <span className="text-teal-600">Capabilities</span>
            </h2>
            <p className="text-slate-700 text-lg font-bold leading-relaxed">
              We leverage advanced analytical tools and clinical methodologies to ensure product excellence.
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {labFeatures.map((f, i) => (
              <RevealOnScroll key={i} direction={i % 2 === 0 ? "left" : "right"}>
                <div className="p-10 bg-slate-50 rounded-[40px] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-700 group h-full">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-8 group-hover:bg-teal-600 transition-all">
                    <f.icon className="w-8 h-8 text-teal-600 group-hover:text-white" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4">{f.title}</h4>
                  <p className="text-slate-700 text-lg font-bold leading-relaxed">{f.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <RevealOnScroll direction="left" className="flex-1 space-y-8">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                Rigorous <span className="text-teal-600">Testing</span> Protocols
              </h2>
              <div className="space-y-6">
                {[
                  "Accelerated & Real-time Stability Studies",
                  "Dissolution & Bio-equivalence Profiles",
                  "Microbiological Purity Testing",
                  "Heavy Metal & Solvent Residue Analysis"
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center text-white text-[10px] font-black">
                      {i + 1}
                    </div>
                    <span className="text-slate-800 font-black text-xs uppercase tracking-widest">{item}</span>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
            <RevealOnScroll direction="right" className="flex-1">
              <div className="relative aspect-video rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
                <Image src="/banner.webp" alt="Lab Testing" fill className="object-cover" />
                <div className="absolute inset-0 bg-teal-600/20 mix-blend-multiply"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center animate-pulse">
                    <ShieldCheck className="w-10 h-10 text-white" />
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <RevealOnScroll className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase">
              Partner with <span className="text-teal-600">Precision</span>.
            </h2>
            <p className="text-slate-700 text-lg font-bold">
              Our laboratory services are available for custom formulation development and third-party testing.
            </p>
            <div className="pt-4">
              <Link href="/services" className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-teal-600 transition-all inline-block shadow-2xl">
                Explore Services <ArrowRight className="inline-block ml-2 w-4 h-4" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
