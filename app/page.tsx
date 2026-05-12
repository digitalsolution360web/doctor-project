"use client";

import Hero from "@/components/Hero";
import TrustSignals from "@/components/TrustSignals";
import ServicesSection from "@/components/ServicesSection";
import CategorySection from "@/components/CategorySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Microscope,
  Clock,
  Award,
  Palette
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "scale";
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
        : direction === "scale" ? "animate-scale-up"
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
    <div className="flex flex-col min-h-screen bg-white font-sans text-slate-800">
      <Hero />
      <TrustSignals />

      {/* Integrated Premium Services Section */}
      <RevealOnScroll>
        <ServicesSection />
      </RevealOnScroll>

      {/* Integrated Premium Product Categories */}
      <RevealOnScroll>
        <CategorySection />
      </RevealOnScroll>

      {/* Premium Dark Section (Why Choose Us) - Refined */}
      <section className="py-8 lg:py-16 bg-slate-950 text-white relative overflow-hidden">
        {/* Animated background glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-900/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#A3E635]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <RevealOnScroll className="max-w-3xl mb-6 md:mb-8">
            <h2 className="text-[10px] md:text-xs font-bold text-[#A3E635] tracking-[0.3em] mb-3 md:mb-4 flex items-center uppercase">
              <span className="w-6 md:w-8 h-[2px] bg-[#A3E635] mr-3"></span>
              Why Choose Midflora Herbal
            </h2>
            <h3 className="text-2xl md:text-5xl font-bold text-white tracking-tight leading-[1.2] md:leading-[1.1]">
              Where Quality Meets <br className="hidden md:block" />
              <span className="text-white/60 font-semibold">Affordability.</span>
            </h3>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Low MOQ", desc: "Perfect for startups to launch their brand with minimal initial investment." },
              { icon: Award, title: "Affordable Pricing with Premium Quality", desc: "Competitive pricing structures with premium international quality standards." },
              { icon: Microscope, title: "In-house R&D Experts", desc: "Innovative formulation development led by experienced scientific professionals." },
              { icon: Clock, title: "Fast Turnaround Time", desc: "Optimized production and dispatch to keep your supply chain moving." },
              { icon: Palette, title: "Custom Branding Support", desc: "End-to-end professional design and branding support for packaging." },
              { icon: ShieldCheck, title: "Regulatory Compliance", desc: "Complete support for licensing, certifications, and quality audits." }
            ].map((item, i) => (
              <RevealOnScroll key={i} className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-500 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-[#A3E635] group-hover:text-slate-900 transition-all duration-500">
                  <item.icon className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-semibold mb-4 text-white tracking-tight">{item.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">{item.desc}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 lg:py-16 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <RevealOnScroll className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
            <h2 className="text-[10px] md:text-xs font-bold text-teal-600 tracking-[0.3em] mb-3 md:mb-4 uppercase">From Formula to Finished Product</h2>
            <h3 className="text-2xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.2] md:leading-[1.1]">
              Our Manufacturing <span className="text-slate-400 font-semibold">Process.</span>
            </h3>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 relative">
            {/* Connecting lines for desktop */}
            <div className="hidden lg:block absolute top-10 left-0 w-full h-px bg-slate-100 -z-10"></div>

            {[
              { step: "01", title: "Requirement Analysis", desc: "Deeply understanding your brand vision, audience, and product requirements." },
              { step: "02", title: "Product Formulation", desc: "Developing innovative and stable formulations tailored to your exact specifications." },
              { step: "03", title: "Sampling & Testing", desc: "Rigorous testing of physical properties, stability, and efficacy." },
              { step: "04", title: "Approval", desc: "Refining the product based on your feedback until you are completely satisfied." },
              { step: "05", title: "Bulk Production", desc: "State-of-the-art manufacturing facilities ensuring consistent quality at scale." },
              { step: "06", title: "Packaging & Dispatch", desc: "Final products are securely packaged and dispatched with all documentation." }
            ].map((item, i) => (
              <RevealOnScroll key={i} className="relative flex flex-col group" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-16 h-16 rounded-2xl bg-slate-50 text-slate-900 font-black text-xl flex items-center justify-center mb-6 border border-slate-200 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600 transition-all duration-500 shadow-sm">
                  {item.step}
                </div>
                <h4 className="text-xl font-semibold text-slate-900 tracking-tight mb-4">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications (Clean, Minimal) */}
      <section className="py-8 md:py-12 bg-slate-100 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <RevealOnScroll>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight uppercase text-center md:text-left">Manufactured under strict<br className="hidden md:block" />quality and safety standards.</h3>
            </RevealOnScroll>
            <RevealOnScroll className="flex flex-wrap items-center justify-center gap-12 md:gap-24">
              {[
                { name: "ISO", logo: "/iso_logo.png" },
                { name: "GMP", logo: "/gmp_logo.png" },
                { name: "FDA", logo: "/fda_logo.png" }
              ].map((cert, i) => (
                <div key={i} className="flex items-center gap-5 group cursor-default">
                  <div className="w-20 h-20 rounded-full bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-all duration-500 group-hover:shadow-[0_20px_40px_-15px_rgba(20,184,166,0.2)] overflow-hidden p-2">
                    <Image 
                      src={cert.logo} 
                      alt={cert.name} 
                      width={60} 
                      height={60} 
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm font-black tracking-[0.25em] text-slate-900 group-hover:text-teal-600 transition-colors">{cert.name}</span>
                </div>
              ))}
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Premium Testimonials Section */}
      <RevealOnScroll direction="scale">
        <TestimonialsSection />
      </RevealOnScroll>

      {/* Premium FAQ Section */}
      <RevealOnScroll direction="scale">
        <FAQSection />
      </RevealOnScroll>

      {/* Re-emphasize trust before the final CTA */}
      {/* <div className="bg-slate-50 py-4">
        <TrustSignals />
      </div> */}

      {/* Premium CTA / Contact Form - Refined */}
      <section id="contact" className="py-8 lg:py-16 bg-slate-100 text-black relative overflow-hidden">
        {/* Dynamic background lighting */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-teal-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-[#A3E635]/5 rounded-full blur-[120px]"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <RevealOnScroll direction="left">
              <h2 className="text-[10px] md:text-xs font-bold text-[#A3E635] tracking-[0.3em] mb-4 md:mb-6 flex items-center uppercase">
                <span className="w-6 md:w-8 h-[2px] bg-[#A3E635] mr-3"></span>
                Start Your Project
              </h2>
              <h3 className="text-2xl md:text-5xl font-black tracking-tight leading-[1.1] md:leading-[1.02] mb-6 md:mb-8">
                Launch Your <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-black/40 text-4xl md:text-6xl">Cosmetic Brand</span> <br className="hidden md:block" />
                Today.
              </h3>
              <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed mb-12 max-w-md">
                Connect with our expert formulators and business consultants to discuss your requirements and get a customized pricing plan.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="group px-7 md:px-10 py-3.5 md:py-5 bg-[#A3E635] text-slate-950 rounded-xl md:rounded-2xl font-black text-xs md:text-sm tracking-widest hover:bg-yellow-400 transition-all flex items-center justify-center">
                  Request Pricing
                  <ArrowRight className="ml-1.5 md:ml-2 w-3.5 md:w-4 h-3.5 md:h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-10 py-5 bg-transparent border border-black/20 text-black rounded-2xl font-black text-sm tracking-widest hover:bg-gray-300 duration-200 transition-all text-center">
                  Talk to Expert
                </button>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right" className="bg-white p-8 md:p-10 rounded-[40px] shadow-2xl relative">
              <form className="space-y-6">
                <div className="mb-4">
                  <h4 className="text-3xl font-black text-slate-900 tracking-tight">Project Inquiry</h4>
                  <p className="text-slate-500 text-sm font-medium mt-1">Fill the form and we'll get back to you within 24 hours.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-widest ml-1">Full Name</label>
                    <input type="text" placeholder="e.g. John Doe" className="w-full px-6 py-4.5 bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-teal-600/10 focus:border-teal-600 text-slate-900 transition-all font-semibold placeholder:text-slate-400" />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-widest ml-1">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="w-full px-6 py-4.5 bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-teal-600/10 focus:border-teal-600 text-slate-900 transition-all font-semibold placeholder:text-slate-400" />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-widest ml-1">Phone Number</label>
                    <input type="tel" placeholder="+91 00000 00000" className="w-full px-6 py-4.5 bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-teal-600/10 focus:border-teal-600 text-slate-900 transition-all font-semibold placeholder:text-slate-400" />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-widest ml-1">Product Category</label>
                  <div className="relative">
                    <select className="w-full px-6 py-4.5 bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-teal-600/10 focus:border-teal-600 text-slate-900 transition-all appearance-none font-semibold">
                      <option>Skincare (Serums, Creams)</option>
                      <option>Haircare (Oils, Shampoo)</option>
                      <option>Herbal & Ayurvedic Range</option>
                      <option>Color Cosmetics</option>
                      <option>Bath & Body</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ArrowRight className="w-4 h-4 rotate-90 text-slate-500" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-widest ml-1">Message / Requirements</label>
                  <textarea placeholder="Describe your vision or specific product needs..." rows={3} className="w-full px-6 py-5 bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-teal-600/10 focus:border-teal-600 text-slate-900 transition-all resize-none font-semibold placeholder:text-slate-400"></textarea>
                </div>

                <button type="submit" className="w-full py-5 md:py-6 bg-slate-950 text-white rounded-2xl font-black text-xs md:text-sm tracking-[0.2em] uppercase hover:bg-teal-600 transition-all shadow-2xl shadow-slate-900/20 flex items-center justify-center group">
                  Submit Requirement
                  <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform" />
                </button>
              </form>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}

