"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Microscope, 
  FlaskConical, 
  ShieldCheck, 
  Zap, 
  Trophy, 
  Globe, 
  ChevronRight, 
  ArrowRight, 
  Beaker, 
  ClipboardCheck, 
  Truck, 
  Dna
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

export default function ServicesPage() {
  const mainServices = [
    {
      id: "pharma",
      title: "Pharmaceutical Formulations",
      subtitle: "Precision Dose Engineering",
      desc: "Advanced manufacturing of life-saving medicines including tablets, capsules, and liquid orals with global quality compliance.",
      image: "/9.webp",
      features: ["Controlled Release Tablets", "Soft-Gelatin Capsules", "Pediatric Oral Suspensions", "Sterile Injectables"],
      icon: FlaskConical,
      color: "teal"
    },
    {
      id: "herbal",
      title: "Ayurvedic & Herbal",
      subtitle: "Nature's Wisdom, Scientific Proof",
      desc: "Integrating ancient Ayurvedic wisdom with modern clinical validation for effective herbal health solutions.",
      image: "/3.webp",
      features: ["Standardized Extracts", "Herbal Tonic Formulations", "Ancient Wellness Oils", "Natural Immunity Boosters"],
      icon: Beaker,
      color: "emerald"
    },
    {
      id: "nutra",
      title: "Nutraceuticals",
      subtitle: "Performance & Wellness",
      desc: "Developing high-performance supplements and vitamins that bridge the gap between nutrition and medicine.",
      image: "/6.webp",
      features: ["Multivitamin Complexes", "Protein Supplements", "Antioxidant Formulas", "Digestive Health Enymes"],
      icon: Zap,
      color: "blue"
    },
    {
      id: "cosmetic",
      title: "Cosmeceuticals",
      subtitle: "Dermatological Excellence",
      desc: "Science-backed topical formulations including therapeutic gels, creams, and skin rejuvenation products.",
      image: "/10.webp",
      features: ["Topical Gels & Creams", "Medicated Shampoos", "Anti-aging Solutions", "Sun Protection Formats"],
      icon: Dna,
      color: "purple"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "R&D Analysis",
      desc: "Comprehensive molecular analysis and stability testing in our state-of-the-art laboratory.",
      icon: Microscope
    },
    {
      step: "02",
      title: "Raw Sourcing",
      desc: "Ethical procurement of high-purity API and herbal extracts from certified global suppliers.",
      icon: Globe
    },
    {
      step: "03",
      title: "Precision Mfg",
      desc: "Automated production in WHO-GMP certified environment with zero-contamination protocols.",
      icon: Trophy
    },
    {
      step: "04",
      title: "Quality Vault",
      desc: "Rigorous 5-stage quality control checks ensuring 100% compliance with international pharmacopeia.",
      icon: ShieldCheck
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center pt-24 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/banner.webp" 
            alt="Pharmaceutical Services" 
            fill 
            className="object-cover object-[center_20%]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <RevealOnScroll className="max-w-3xl animate-reveal-left space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-700 font-black text-xs uppercase tracking-widest">
              <span className="relative flex h-2.5 w-2.5 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
              </span>
              GLOBAL MANUFACTURING HUB
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tighter uppercase">
              Our <span className="text-teal-600">Services</span> <br />
              & Global Expertise.
            </h1>
            
            <p className="text-lg md:text-xl text-slate-700 max-w-2xl font-bold leading-relaxed">
              Dr Expert Formulation delivers end-to-end manufacturing solutions across pharmaceutical, herbal, and nutraceutical domains.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Link href="#contact" className="px-12 py-5 bg-teal-600 text-white rounded-2xl font-black text-sm flex items-center justify-center hover:bg-slate-950 transition-all shadow-[0_20px_50px_-15px_rgba(20,184,166,0.4)] hover:-translate-y-1 uppercase tracking-widest">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="#capabilities" className="px-12 py-5 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl font-black text-sm flex items-center justify-center hover:bg-slate-50 transition-all hover:-translate-y-1 uppercase tracking-widest">
                Capabilities
              </Link>
            </div>
          </RevealOnScroll>
        </div>

        {/* Simplified Stats Bar */}
        <div className="absolute bottom-10 left-0 w-full hidden lg:block">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center space-x-12 py-6 border-t border-slate-900/5 max-w-3xl">
              {[
                { label: "Products", val: "500+" },
                { label: "Patents", val: "25+" },
                { label: "Countries", val: "15+" }
              ].map((stat, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="w-1 h-8 bg-teal-500 rounded-full"></div>
                  <div>
                    <p className="text-2xl font-black text-slate-900 leading-none">{stat.val}</p>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Exploration */}
      <section id="capabilities" className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <RevealOnScroll className="max-w-3xl mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              Core <span className="text-teal-600">Specializations</span>
            </h2>
            <p className="text-slate-700 text-lg font-bold leading-relaxed max-w-2xl">
              Our multidisciplinary expertise allows us to provide comprehensive health solutions under one roof.
            </p>
          </RevealOnScroll>

          <div className="space-y-20">
            {mainServices.map((service, index) => (
              <div 
                key={service.id} 
                className={`flex flex-col lg:flex-row items-center gap-16 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Visual */}
                <RevealOnScroll direction={index % 2 === 0 ? "left" : "right"} className="flex-1 relative w-full">
                  <div className="relative aspect-[4/3] rounded-[60px] overflow-hidden shadow-2xl group border border-slate-100">
                    <Image 
                      src={service.image} 
                      alt={service.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                    <div className="absolute top-10 right-10 w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:rotate-12 transition-transform duration-700">
                      <service.icon className="w-10 h-10 text-teal-600" />
                    </div>
                  </div>
                  {/* Decorative Elements */}
                  <div className={`absolute -z-10 w-64 h-64 bg-teal-50 rounded-full blur-3xl opacity-60 ${index % 2 === 0 ? '-top-10 -left-10' : '-bottom-10 -right-10'}`}></div>
                </RevealOnScroll>

                {/* Content */}
                <RevealOnScroll direction={index % 2 === 0 ? "right" : "left"} className="flex-1 space-y-6">
                  <div className="space-y-3">
                    <p className="text-teal-600 font-black text-xs uppercase tracking-[0.4em] mb-4">{service.subtitle}</p>
                    <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">{service.title}</h3>
                    <p className="text-slate-700 text-lg font-bold leading-relaxed">{service.desc}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center space-x-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-teal-200 hover:bg-white hover:shadow-xl transition-all duration-500 group">
                        <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center group-hover:bg-teal-600 transition-colors">
                          <ChevronRight className="w-4 h-4 text-teal-600 group-hover:text-white" />
                        </div>
                        <span className="text-slate-800 font-black text-xs uppercase tracking-tight">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className="flex items-center space-x-4 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-teal-600 transition-all duration-500 shadow-2xl group">
                    <span>Technical Data Sheet</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </button>
                </RevealOnScroll>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Process */}
      <section className="py-16 bg-slate-50 relative overflow-hidden border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <RevealOnScroll className="max-w-2xl mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              The <span className="text-teal-600">Blue-Print</span> of Quality
            </h2>
            <p className="text-slate-600 text-lg font-bold italic opacity-60">"Rigorous precision from initial molecule to final delivery."</p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {processSteps.map((p, i) => (
              <RevealOnScroll key={i} className="relative group" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="mb-10 relative">
                  <div className="w-20 h-20 bg-white border border-slate-200 rounded-[24px] flex items-center justify-center group-hover:bg-teal-600 transition-all duration-700 transform group-hover:-translate-y-2 group-hover:rotate-6 shadow-xl">
                    <p className="text-teal-600 group-hover:text-white font-black text-3xl tracking-tighter">{p.step}</p>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-teal-400 transition-all">
                    <p.icon className="w-5 h-5 text-white/40 group-hover:text-white" />
                  </div>
                </div>
                <h4 className="text-xl font-black mb-3 text-slate-900 uppercase tracking-tight">{p.title}</h4>
                <p className="text-slate-600 font-bold text-sm leading-relaxed">{p.desc}</p>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-12 -right-6 w-12 h-px bg-white/10"></div>
                )}
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* R&D Lab Section */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-[#05080f] rounded-[48px] p-10 md:p-16 relative overflow-hidden text-white flex flex-col lg:flex-row items-center gap-16">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/2"></div>
            
            <RevealOnScroll direction="left" className="flex-1 space-y-10 relative z-10">
              <div className="inline-block px-6 py-2 bg-white/5 border border-white/10 rounded-full text-teal-400 text-xs font-black uppercase tracking-[0.4em] mb-4">
                Innovation Hub
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-none">
                Where Science <br /> <span className="text-teal-500">Meets Care.</span>
              </h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-lg">
                Our in-house R&D laboratory is equipped with advanced chromatography and spectroscopy systems to ensure every formulation is perfectly balanced.
              </p>
              <div className="flex items-center space-x-12 pt-4">
                <div>
                  <p className="text-4xl font-black text-white">25+</p>
                  <p className="text-teal-500 text-[10px] font-black uppercase tracking-widest mt-1">Research Scientists</p>
                </div>
                <div className="w-px h-12 bg-white/10"></div>
                <div>
                  <p className="text-4xl font-black text-white">100%</p>
                  <p className="text-teal-500 text-[10px] font-black uppercase tracking-widest mt-1">Quality Guaranteed</p>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right" className="flex-1 relative w-full">
              <div className="relative aspect-square rounded-[48px] overflow-hidden shadow-2xl border border-white/10 group">
                <Image 
                  src="/8.webp" 
                  alt="R&D Laboratory" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-[3000ms]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl">
                  <p className="text-white font-black text-lg uppercase tracking-tight leading-snug italic">
                    "Pushing the boundaries of molecular stability for better clinical outcomes."
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-16 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <RevealOnScroll direction="left" className="flex-1 space-y-6">
              <div className="inline-block px-6 py-2 bg-teal-50 border border-teal-100 rounded-full text-teal-700 text-xs font-black uppercase tracking-[0.4em] mb-4">
                Global Footprint
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                Delivering Health <br /> <span className="text-teal-600">Across Borders.</span>
              </h2>
              <p className="text-slate-700 text-lg font-bold leading-relaxed">
                Our formulations reach over 15+ countries, meeting diverse regulatory requirements with consistent excellence.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-4">
                {[
                  { label: "Export Markets", val: "15+" },
                  { label: "Global Partners", val: "100+" },
                  { label: "Compliance Rate", val: "100%" },
                  { label: "Supply Chain", val: "24/7" }
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <p className="text-3xl font-black text-slate-900">{item.val}</p>
                    <p className="text-teal-600 text-[10px] font-black uppercase tracking-widest">{item.label}</p>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right" className="flex-1 relative">
              <div className="relative aspect-square w-full max-w-lg mx-auto">
                <div className="absolute inset-0 bg-teal-500/5 rounded-full blur-3xl animate-pulse"></div>
                <Image 
                  src="/globe.svg" 
                  alt="Global Presence Map" 
                  fill 
                  className="object-contain opacity-20 invert grayscale" 
                />
                {/* Pulsing Dots for Markets */}
                {[
                  { top: "30%", left: "20%" },
                  { top: "45%", left: "55%" },
                  { top: "60%", left: "40%" },
                  { top: "25%", left: "75%" },
                  { top: "70%", left: "80%" }
                ].map((pos, i) => (
                  <div 
                    key={i} 
                    className="absolute w-3 h-3 bg-teal-500 rounded-full shadow-[0_0_20px_rgba(20,184,166,1)] animate-ping"
                    style={{ top: pos.top, left: pos.left }}
                  ></div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-teal-600">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-400/30 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10 text-white">
          <RevealOnScroll className="max-w-3xl mx-auto space-y-10">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none uppercase">
              Ready to <span className="text-teal-100">Partner?</span>
            </h2>
            <p className="text-teal-50 text-xl md:text-2xl font-bold opacity-90 uppercase tracking-[0.2em] leading-relaxed">
              Join hands with Dr Expert Formulation for world-class manufacturing excellence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
              <button className="w-full sm:w-auto px-12 py-6 bg-white text-teal-700 rounded-3xl font-black text-xl hover:shadow-[0_20px_60px_-10px_rgba(255,255,255,0.4)] hover:-translate-y-2 transition-all duration-500 uppercase tracking-widest">
                Start Consultation
              </button>
              <button className="w-full sm:w-auto px-12 py-6 bg-teal-500/20 backdrop-blur-md border border-white/30 text-white rounded-3xl font-black text-xl hover:bg-white hover:text-teal-700 transition-all duration-500 uppercase tracking-widest">
                Download Brochure
              </button>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
