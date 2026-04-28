"use client";

import Hero from "@/components/Hero";
import TrustSignals from "@/components/TrustSignals";
import ServicesSection from "@/components/ServicesSection";
import CategorySection from "@/components/CategorySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Microscope,
  Settings,
  Palette,
  Clock,
  Award,
  Heart,
  Sparkles,
  Droplets,
  Wind,
  Smile
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
      <section className="py-12 lg:py-16 bg-slate-950 text-white relative overflow-hidden">
        {/* Animated background glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-900/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#A3E635]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <RevealOnScroll className="max-w-3xl mb-8">
            <h2 className="text-xs font-bold text-[#A3E635] tracking-[0.3em] mb-4 flex items-center uppercase">
              <span className="w-8 h-[2px] bg-[#A3E635] mr-3"></span>
              Why Choose Midflora Herbal
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.1]">
              Where Quality Meets <br />
              <span className="text-white/60 font-semibold">Affordability.</span>
            </h3>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Low Moq", desc: "Perfect for startups to launch their brand with minimal initial investment." },
              { icon: Award, title: "Affordable Pricing", desc: "Competitive pricing structures with premium international quality standards." },
              { icon: Microscope, title: "In-house R&d Experts", desc: "Innovative formulation development led by experienced scientific professionals." },
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

      <section className="py-12 lg:py-16 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <RevealOnScroll className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-teal-600 tracking-[0.3em] mb-4 uppercase">Manufacturing Process</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1]">
              Our Professional <span className="text-slate-400 font-semibold">Workflow.</span>
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
      <section className="py-12 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <RevealOnScroll>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight uppercase">Manufactured under strict<br />quality and safety standards.</h3>
            </RevealOnScroll>
            <RevealOnScroll className="flex flex-wrap items-center justify-center gap-10 md:gap-20">
              {["ISO", "GMP", "FDA"].map((cert, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-default">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-6 h-6 text-teal-600" />
                  </div>
                  <span className="text-xs font-bold tracking-[0.2em] text-slate-500 group-hover:text-slate-900 transition-colors">{cert}</span>
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
      <div className="bg-slate-50 py-4">
         <TrustSignals />
      </div>

      {/* Premium CTA / Contact Form - Refined */}
      <section id="contact" className="py-12 lg:py-16 bg-slate-950 text-white relative overflow-hidden">
        {/* Dynamic background lighting */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-teal-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-[#A3E635]/5 rounded-full blur-[120px]"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <RevealOnScroll direction="left">
              <h2 className="text-xs font-bold text-[#A3E635] tracking-[0.3em] mb-6 flex items-center uppercase">
                <span className="w-8 h-[2px] bg-[#A3E635] mr-3"></span>
                Start Your Project
              </h2>
              <h3 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-8">
                Launch Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 uppercase text-6xl">Cosmetic Brand</span> <br />
                Today.
              </h3>
              <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed mb-12 max-w-md">
                Connect with our expert formulators and business consultants to discuss your requirements and get a customized pricing plan.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="group px-10 py-5 bg-[#A3E635] text-slate-950 rounded-2xl font-black text-sm tracking-widest hover:bg-white transition-all flex items-center justify-center">
                  Request Pricing
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-10 py-5 bg-transparent border border-white/20 text-white rounded-2xl font-black text-sm tracking-widest hover:bg-white/5 transition-all text-center">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 tracking-[0.2em]">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full px-6 py-5 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-teal-600/5 focus:border-teal-600 text-slate-900 transition-all font-bold placeholder:text-slate-300" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 tracking-[0.2em]">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="w-full px-6 py-5 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-teal-600/5 focus:border-teal-600 text-slate-900 transition-all font-bold placeholder:text-slate-300" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 tracking-[0.2em]">Product Category</label>
                  <div className="relative">
                    <select className="w-full px-6 py-5 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-teal-600/5 focus:border-teal-600 text-slate-900 transition-all appearance-none font-bold">
                      <option>Skincare</option>
                      <option>Haircare</option>
                      <option>Herbal Range</option>
                      <option>Color Cosmetics</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ArrowRight className="w-4 h-4 rotate-90 text-slate-400" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 tracking-[0.2em]">Message</label>
                  <textarea placeholder="Describe your vision..." rows={3} className="w-full px-6 py-5 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-teal-600/5 focus:border-teal-600 text-slate-900 transition-all resize-none font-bold placeholder:text-slate-300"></textarea>
                </div>

                <button type="submit" className="w-full py-6 bg-slate-900 text-white rounded-2xl font-black text-sm tracking-[0.2em] hover:bg-teal-600 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center group">
                  Submit Requirement
                  <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}

