"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Users, 
  History, 
  Target, 
  Eye, 
  Heart, 
  Globe, 
  Award,
  ArrowRight,
  ShieldCheck
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

export default function AboutPage() {
  const values = [
    {
      title: "Precision",
      desc: "Absolute accuracy in every formulation and dosage we manufacture.",
      icon: Target
    },
    {
      title: "Integrity",
      desc: "Ethical sourcing and transparent manufacturing processes.",
      icon: ShieldCheck
    },
    {
      title: "Innovation",
      desc: "Constant evolution through scientific research and technology.",
      icon: Eye
    },
    {
      title: "Care",
      desc: "A deep commitment to improving global health outcomes.",
      icon: Heart
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/banner.webp" 
            alt="About Our Heritage" 
            fill 
            className="object-cover opacity-10"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <RevealOnScroll className="max-w-4xl mx-auto space-y-10">
            <div className="relative h-20 w-80 mx-auto mb-12">
              <Image src="/logo.webp" alt="Logo" fill className="object-contain" priority sizes="(max-width: 768px) 100vw, 320px" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-none tracking-tighter uppercase">
              Pioneering <span className="text-teal-600">Beauty</span> <br /> Since 2004.
            </h1>
            <p className="text-xl md:text-2xl text-slate-700 max-w-3xl mx-auto font-bold leading-relaxed">
              Midflora Herbal is built on two decades of manufacturing excellence and a relentless pursuit of cosmetic and herbal perfection.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <RevealOnScroll direction="left" className="p-12 bg-white rounded-[48px] border border-slate-100 shadow-sm space-y-6">
              <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 uppercase tracking-tighter">Our Mission</h2>
              <p className="text-slate-700 text-lg font-bold leading-relaxed">
                To provide high-quality, premium cosmetic and herbal solutions through advanced manufacturing technology and rigorous R&D, making premium beauty accessible to every brand.
              </p>
            </RevealOnScroll>
            <RevealOnScroll direction="right" className="p-12 bg-slate-900 rounded-[48px] text-white space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl"></div>
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-teal-400">
                <Eye className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tighter">Our Vision</h2>
              <p className="text-slate-400 text-lg font-bold leading-relaxed">
                To become a global benchmark in cosmetic engineering, recognized for our commitment to quality, innovation, and ethical leadership in the herbal beauty industry.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* The Story Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <RevealOnScroll direction="left" className="flex-1 space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-black text-xs uppercase tracking-widest">
                <History className="w-4 h-4 mr-2" /> OUR JOURNEY
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tighter uppercase leading-tight">
                Two Decades of <br /> <span className="text-teal-600">Pure Dedication.</span>
              </h2>
              <div className="space-y-6 text-slate-700 text-lg font-bold leading-relaxed">
                <p>
                  Founded in 2004, Midflora Herbal started with a simple goal: to manufacture personal care products that meet international standards of purity and efficacy.
                </p>
                <p>
                  Today, we operate a state-of-the-art facility in Noida, India, serving over 1000+ formulations and helping brands dominate the skincare and haircare markets.
                </p>
                <p>
                  Our growth is fueled by our people—a team of dedicated scientists, engineers, and R&D experts who believe that quality is the ultimate foundation of beauty.
                </p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll direction="right" className="flex-1">
              <div className="relative aspect-square rounded-[60px] overflow-hidden shadow-2xl border-[12px] border-slate-50 group">
                <Image src="/8.webp" alt="Our Facility" fill className="object-cover group-hover:scale-105 transition-transform duration-[4000ms]" />
                <div className="absolute inset-0 bg-teal-600/10 mix-blend-overlay"></div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/2"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <RevealOnScroll className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tighter uppercase leading-none">
              Our Core <span className="text-teal-600">Values</span>
            </h2>
            <p className="text-slate-600 text-lg font-bold">The fundamental principles that guide every decision we make.</p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <RevealOnScroll key={i} className="group">
                <div className="p-10 bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700 h-full text-center space-y-6">
                  <div className="w-20 h-20 bg-teal-50 rounded-3xl flex items-center justify-center mx-auto text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all duration-500 transform group-hover:rotate-6 shadow-sm">
                    <v.icon className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-900 uppercase tracking-tight">{v.title}</h4>
                  <p className="text-slate-600 text-base font-bold leading-relaxed">{v.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Global Impact Banner */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative rounded-[60px] bg-[#05080f] p-12 md:p-24 overflow-hidden text-center">
            <div className="absolute inset-0 opacity-10">
              <Image src="/globe.svg" alt="Globe" fill className="object-contain scale-150 grayscale invert" />
            </div>
            <RevealOnScroll className="relative z-10 max-w-3xl mx-auto space-y-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter uppercase leading-[1.1]">
                Health has no <br /> <span className="text-teal-400">Boundaries.</span>
              </h2>
              <p className="text-slate-400 text-xl font-bold leading-relaxed">
                Join us in our mission to create a healthier world. Whether you are a partner, a client, or a team member, there is a place for you in our story.
              </p>
              <div className="pt-6">
                <Link href="/services" className="px-12 py-6 bg-teal-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-slate-900 transition-all inline-block shadow-2xl">
                  Work With Us <ArrowRight className="inline-block ml-3 w-5 h-5" />
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}
