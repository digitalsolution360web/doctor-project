"use client";

import Hero from "@/components/Hero";
import Link from "next/link";
import { CheckCircle, ArrowRight, ShieldCheck, Zap, Users, Microscope, Trophy, Globe, ChevronRight } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

const Counter: React.FC<CounterProps> = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
};

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

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Hero />
      
      {/* Stats Section */}
      <RevealOnScroll className="py-16 bg-slate-950 text-white relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.1),transparent_70%)]"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Products", value: 500, suffix: "+" },
              { label: "Experience", value: 20, suffix: "+ Yrs" },
              { label: "Global Clients", value: 100, suffix: "+" },
              { label: "R&D Scientists", value: 25, suffix: "+" }
            ].map((stat, i) => (
              <div key={i} className="space-y-4 group">
                <div className="relative inline-block">
                  <p className="text-5xl md:text-6xl font-black text-teal-500 tracking-tighter group-hover:scale-110 transition-transform duration-500">
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </p>
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-teal-500/20 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
                <p className="text-slate-500 text-xs font-black uppercase tracking-[0.3em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>

      {/* About Section */}
      <section id="about" className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center gap-16">
          <RevealOnScroll direction="left" className="flex-1 relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-teal-50 rounded-full -z-10 animate-pulse"></div>
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl group border border-slate-100">
              <img 
                src="/8.webp" 
                alt="Laboratory" 
                className="w-full h-full object-cover aspect-video lg:aspect-square scale-105 group-hover:scale-100 transition-transform duration-1000" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-2xl">
                <p className="text-white font-black text-lg leading-snug uppercase tracking-tight">Excellence in every drop, precision in every dose.</p>
              </div>
            </div>
          </RevealOnScroll>
          <RevealOnScroll direction="right" className="flex-1 space-y-8">
            <div className="inline-block px-4 py-2 bg-teal-50 border border-teal-100 rounded-xl text-teal-700 text-xs font-black uppercase tracking-[0.3em]">
              Established 2004
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-[1.1] tracking-tighter uppercase">
              Pioneering <span className="text-teal-600">Health Solutions</span> Through Science.
            </h2>
            <p className="text-slate-700 text-xl leading-relaxed font-bold">
              Dr Expert Formulation Pvt Ltd is a premier manufacturing facility dedicated to delivering high-quality pharmaceutical and herbal products that meet international standards.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
              {[
                { icon: ShieldCheck, text: "GMP Certified Facility" },
                { icon: Microscope, text: "Advanced R&D Lab" },
                { icon: Trophy, text: "Quality Excellence Awards" },
                { icon: Globe, text: "International Export" }
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-teal-200 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center group-hover:bg-teal-500 transition-colors duration-700">
                    <item.icon className="text-teal-600 group-hover:text-white w-5 h-5 transition-transform group-hover:scale-110" /> 
                  </div>
                  <span className="text-slate-800 font-black text-xs uppercase tracking-tight">{item.text}</span>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <RevealOnScroll className="max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase">Our Core Expertise</h2>
            <p className="text-slate-700 text-xl font-bold leading-relaxed">We specialize in a wide range of formulations across multiple therapeutic categories.</p>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { img: "/2.webp", title: "Pharma Formulations", desc: "Expertly crafted medicinal tablets, capsules, and liquids." },
              { img: "/3.webp", title: "Herbal Products", desc: "100% natural and effective Ayurvedic and herbal remedies." },
              { img: "/6.webp", title: "Nutraceuticals", desc: "Performance boosting health supplements and vitamins." }
            ].map((s, i) => (
              <RevealOnScroll key={i} direction={i === 0 ? "left" : i === 2 ? "right" : "up"} className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-slate-100 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all duration-700 group flex flex-col text-left">
                <div className="h-72 overflow-hidden relative">
                  <img src={s.img} className="w-full h-full object-cover object-[center_top] group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-6 right-6 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-2xl transform translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                    <ArrowRight className="text-teal-600 w-6 h-6" />
                  </div>
                </div>
                <div className="p-10 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    <h4 className="font-black text-2xl text-slate-900 tracking-tight uppercase leading-none">{s.title}</h4>
                    <p className="text-slate-700 font-bold text-base leading-relaxed opacity-80">{s.desc}</p>
                  </div>
                  <Link href="/services" className="mt-10 text-teal-600 font-black text-xs uppercase tracking-[0.2em] flex items-center group-hover:translate-x-2 transition-transform duration-500">
                    View Technical Specs <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Process */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-teal-600/5 skew-x-12 translate-x-1/2"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <RevealOnScroll className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-none uppercase">Precision <span className="text-teal-400">Process</span></h2>
            <p className="text-slate-400 text-lg font-bold italic opacity-60">"From molecule to market, excellence in every phase."</p>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {[
              { step: "01", title: "R&D Design", desc: "Formulation development and stability testing in our lab.", icon: Microscope },
              { step: "02", title: "Sourcing", desc: "Ethical procurement of high-grade raw materials.", icon: Zap },
              { step: "03", title: "Production", desc: "Automated, GMP-compliant manufacturing.", icon: Trophy },
              { step: "04", title: "Quality Check", desc: "Rigorous multi-stage testing before release.", icon: ShieldCheck }
            ].map((p, i) => (
              <RevealOnScroll key={i} className="relative group" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="mb-8 inline-block p-6 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[32px] group-hover:bg-teal-500 transition-all duration-700 transform group-hover:-translate-y-2 group-hover:rotate-6 shadow-2xl">
                  <p className="text-teal-400 group-hover:text-white font-black text-3xl mb-1 tracking-tighter">{p.step}</p>
                  <p className="text-white/40 group-hover:text-white/70 text-[10px] font-black uppercase tracking-[0.3em]">Phase</p>
                </div>
                <h4 className="text-xl font-black mb-4 text-white uppercase tracking-tight">{p.title}</h4>
                <p className="text-slate-400 font-bold text-sm leading-relaxed opacity-70">{p.desc}</p>
                {i < 3 && <div className="hidden lg:block absolute top-14 -right-5 w-10 h-px bg-white/10"></div>}
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories Visual Grid */}
      <section id="textures" className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <RevealOnScroll className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-10">
            <div className="max-w-2xl space-y-4 text-left">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter leading-none uppercase">Product <span className="text-teal-600">Portfolio</span></h2>
              <p className="text-slate-700 text-2xl font-bold leading-relaxed">Manufacturing over 500+ formulations across various delivery formats.</p>
            </div>
            <div className="hidden lg:flex items-center space-x-6">
              <Link href="/textures" className="text-teal-600 font-black text-xs uppercase tracking-[0.3em] hover:text-slate-950 transition-colors flex items-center group">
                View All Formats <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="flex space-x-3">
                <button className="w-14 h-14 rounded-full border-2 border-slate-100 flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all duration-700 shadow-xl">
                  <ArrowRight className="w-6 h-6 rotate-180" />
                </button>
                <button className="w-14 h-14 rounded-full bg-slate-950 text-white flex items-center justify-center hover:bg-teal-600 transition-all duration-700 shadow-2xl">
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Tablets & Capsules", img: "/9.webp", count: "200+ Variants" },
              { title: "Liquid Orals", img: "/10.webp", count: "80+ Variants" },
              { title: "Topical Gels", img: "/6.webp", count: "50+ Variants" },
              { title: "Ayurvedic Oils", img: "/7.webp", count: "120+ Variants" }
            ].map((cat, i) => (
              <RevealOnScroll key={i} direction={i % 2 === 0 ? "left" : "right"} className="group relative rounded-[40px] overflow-hidden aspect-[4/5] shadow-2xl transition-all duration-1000 hover:-translate-y-2 border border-slate-50">
                <img src={cat.img} className="w-full h-full object-cover object-[center_top] group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent opacity-90"></div>
                <div className="absolute bottom-8 left-8 right-8 space-y-2">
                  <p className="text-teal-400 font-black text-[10px] uppercase tracking-[0.3em]">{cat.count}</p>
                  <h4 className="text-white font-black text-2xl leading-none uppercase tracking-tighter">{cat.title}</h4>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Global Certifications */}
      <section id="certifications" className="py-16 bg-slate-50 border-y border-slate-200 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <RevealOnScroll className="grid grid-cols-2 md:grid-cols-5 gap-12 items-center opacity-70 hover:opacity-100 transition-opacity duration-1000">
            {["ISO 9001:2015", "WHO-GMP", "HACCP", "FSSAI", "HALAL"].map((cert, i) => (
              <div key={i} className="flex flex-col items-center space-y-5 grayscale hover:grayscale-0 transition-all duration-700 group">
                <div className="w-20 h-20 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center shadow-xl group-hover:border-teal-500 transition-all duration-500 transform group-hover:rotate-12">
                  <ShieldCheck className="w-10 h-10 text-slate-300 group-hover:text-teal-600 transition-colors" />
                </div>
                <p className="text-slate-900 font-black text-xs uppercase tracking-[0.3em]">{cert}</p>
              </div>
            ))}
          </RevealOnScroll>
          <div className="mt-12 text-center">
            <Link href="/certifications" className="inline-flex items-center space-x-3 px-8 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-black text-xs uppercase tracking-[0.3em] hover:bg-teal-600 hover:text-white transition-all shadow-lg group">
              <span>View All Compliance Certificates</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <RevealOnScroll direction="left" className="space-y-8 text-left">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[1.1] uppercase">Got <br /><span className="text-teal-600">Questions?</span></h2>
              <p className="text-slate-700 text-2xl font-bold leading-relaxed max-w-lg">
                Everything you need to know about our manufacturing capabilities and partnership process.
              </p>
              <div className="p-10 bg-[#05080f] rounded-[48px] text-white space-y-6 relative overflow-hidden group border border-white/5 shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
                <p className="text-3xl font-black leading-tight tracking-tighter uppercase">Custom Formulation Needed?</p>
                <p className="text-slate-400 text-lg font-bold opacity-70">Our technical team is ready to discuss your specific active ingredient requirements.</p>
                <button className="px-10 py-5 bg-teal-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-teal-500 transition-all shadow-[0_20px_50px_-10px_rgba(20,184,166,0.5)] hover:-translate-y-1 block w-full sm:w-auto">Chat with Experts</button>
              </div>
            </RevealOnScroll>
            <RevealOnScroll direction="right" className="space-y-4">
              {[
                { q: "What is your typical production lead time?", a: "Depending on the complexity of the formulation and batch size, typical lead times range from 3-5 weeks from approval." },
                { q: "Do you offer private labeling services?", a: "Yes, we provide end-to-end private labeling services including packaging design and regulatory compliance assistance." },
                { q: "Are your facilities WHO-GMP certified?", a: "Absolutely. Our state-of-the-art facility adheres to global WHO-GMP standards for pharmaceutical manufacturing." },
                { q: "Can you assist with formulation development?", a: "Our in-house R&D team specializes in creating custom formulations tailored to specific market requirements." }
              ].map((faq, i) => (
                <div key={i} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-teal-200 hover:bg-white hover:shadow-2xl transition-all duration-700 group cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <p className="font-black text-slate-900 uppercase text-xs tracking-widest">{faq.q}</p>
                    <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center group-hover:bg-teal-600 transition-all duration-700 shadow-sm">
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white transform group-hover:rotate-90 transition-all duration-700" />
                    </div>
                  </div>
                  <p className="text-slate-700 text-base font-bold leading-relaxed hidden group-hover:block animate-in fade-in slide-in-from-top-2 duration-700">{faq.a}</p>
                </div>
              ))}
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-teal-600">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/10 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal-400/20 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10 text-white animate-fade-up">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1] uppercase">Let's Build the <br /><span className="text-teal-100">Future Together.</span></h2>
            <p className="text-teal-50 text-lg font-bold opacity-80 uppercase tracking-[0.2em]">Global Manufacturing Excellence Starts Here.</p>
            <div className="pt-4">
              <button className="px-10 py-4 bg-white text-teal-700 rounded-2xl font-black text-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 uppercase tracking-widest">
                Start Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
