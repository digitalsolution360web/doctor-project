"use client";

import Hero from "@/components/Hero";
import Link from "next/link";
import { 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Users, 
  Microscope, 
  Trophy, 
  Globe, 
  ChevronRight, 
  FlaskConical, 
  Settings, 
  Box, 
  Palette, 
  Truck, 
  Clock, 
  Award, 
  Heart, 
  Star,
  Sparkles,
  Droplets,
  Wind,
  Smile
} from "lucide-react";
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
      
      {/* Section: What You Offer */}
      <section id="services" className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <RevealOnScroll className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              End-to-End Cosmetic <span className="text-teal-600">Manufacturing Solutions</span>
            </h2>
            <p className="text-slate-600 text-lg font-bold">Comprehensive services to bring your brand from concept to market reality.</p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Microscope, title: "Custom Formulation", desc: "Unique formulations tailored to your brand's specific needs and market trends." },
              { icon: ShieldCheck, title: "Private Labeling", desc: "Ready-to-market products with your branding and customized packaging." },
              { icon: Settings, title: "Bulk Manufacturing", desc: "High-capacity production facilities to handle orders of any scale efficiently." },
              { icon: Palette, title: "Packaging & Branding Support", desc: "End-to-end design and regulatory support for a standout brand identity." }
            ].map((service, i) => (
              <RevealOnScroll key={i} className="group bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center mb-8 group-hover:bg-teal-600 transition-colors duration-500">
                  <service.icon className="w-8 h-8 text-teal-600 group-hover:text-white transition-colors duration-500" />
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">{service.title}</h4>
                <p className="text-slate-600 font-bold text-sm leading-relaxed">{service.desc}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Product Categories */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <RevealOnScroll className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                Our <span className="text-teal-600">Product Categories</span>
              </h2>
              <p className="text-slate-600 text-xl font-bold">Diverse range of high-quality cosmetic and herbal products.</p>
            </div>
            <Link href="/textures" className="inline-flex items-center px-8 py-4 bg-slate-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-teal-600 transition-all shadow-xl group">
              View All Products <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Skincare", items: "Serums, Creams, Face Wash", icon: Droplets, img: "/2.webp" },
              { title: "Haircare", items: "Oils, Shampoo, Masks", icon: Sparkles, img: "/3.webp" },
              { title: "Bath & Body", items: "Soaps, Shower Gel", icon: Wind, img: "/6.webp" },
              { title: "Herbal Products", items: "Natural Formulations", icon: Heart, img: "/7.webp" },
              { title: "Men’s Grooming", items: "Beard Oils, Face Wash", icon: Smile, img: "/10.webp" }
            ].map((cat, i) => (
              <RevealOnScroll key={i} className="group relative rounded-[40px] overflow-hidden aspect-[4/3] shadow-2xl border border-slate-50">
                <img src={cat.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-4">
                    <cat.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">{cat.title}</h4>
                  <p className="text-white/70 text-xs font-bold uppercase tracking-widest leading-none">{cat.items}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Why Choose Midflora Herbal */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-teal-500/5 -skew-x-12 translate-x-1/2"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <RevealOnScroll className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">
              Why Choose <span className="text-teal-400">Midflora Herbal</span>
            </h2>
            <p className="text-slate-400 text-lg font-bold">Partnering with us means excellence, speed, and reliability.</p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: Zap, title: "Low MOQ", desc: "Perfect for startups to launch their brand with minimal investment." },
              { icon: Award, title: "Premium Quality", desc: "Affordable pricing without compromising on international standards." },
              { icon: Microscope, title: "In-house R&D Experts", desc: "Innovative formulation development by experienced scientists." },
              { icon: Clock, title: "Fast Turnaround", desc: "Quick production and dispatch to keep your supply chain moving." },
              { icon: Palette, title: "Custom Branding", desc: "Professional design support for packaging that sells." },
              { icon: ShieldCheck, title: "Regulatory Compliance", desc: "Full support for licensing, certifications, and quality audits." }
            ].map((item, i) => (
              <RevealOnScroll key={i} className="p-8 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[32px] hover:bg-white group transition-all duration-700">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/10 flex items-center justify-center mb-8 group-hover:bg-teal-600 transition-colors">
                  <item.icon className="w-6 h-6 text-teal-400 group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-xl font-black mb-4 group-hover:text-slate-900 transition-colors uppercase tracking-tight">{item.title}</h4>
                <p className="text-slate-400 group-hover:text-slate-600 transition-colors font-bold text-sm leading-relaxed">{item.desc}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Manufacturing Process */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <RevealOnScroll className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              Our <span className="text-teal-600">Manufacturing Process</span>
            </h2>
            <p className="text-slate-600 text-lg font-bold italic">A systematic approach to ensuring the highest quality standards.</p>
          </RevealOnScroll>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
              {[
                { step: "01", title: "Requirement Analysis" },
                { step: "02", title: "Product Formulation" },
                { step: "03", title: "Sampling & Testing" },
                { step: "04", title: "Approval" },
                { step: "05", title: "Bulk Production" },
                { step: "06", title: "Packaging & Dispatch" }
              ].map((item, i) => (
                <RevealOnScroll key={i} className="text-center group" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="w-20 h-20 rounded-full bg-white border-4 border-slate-50 flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:border-teal-500 transition-all duration-500">
                    <span className="text-2xl font-black text-teal-600">{item.step}</span>
                  </div>
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-tighter leading-tight">{item.title}</h4>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section: Certifications */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <RevealOnScroll className="mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">Quality & Safety <span className="text-teal-600">Certifications</span></h2>
            <p className="text-slate-600 font-bold uppercase text-[10px] tracking-[0.3em]">Manufactured under strict quality and safety standards</p>
          </RevealOnScroll>
          <div className="flex flex-wrap justify-center items-center gap-16 opacity-60 hover:opacity-100 transition-opacity">
            {["ISO", "GMP", "FDA"].map((cert, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-xl border border-slate-100 group-hover:border-teal-500 transition-all transform group-hover:scale-110 mb-4">
                  <ShieldCheck className="w-12 h-12 text-slate-300 group-hover:text-teal-600" />
                </div>
                <p className="text-slate-900 font-black text-xs tracking-[0.4em]">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Clients / Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <RevealOnScroll className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              Client <span className="text-teal-600">Success Stories</span>
            </h2>
            <p className="text-slate-600 text-lg font-bold">Trusted by emerging and established brands across India.</p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <RevealOnScroll direction="left" className="p-12 bg-slate-50 rounded-[48px] relative overflow-hidden group border border-slate-100">
              <Star className="absolute top-10 right-10 w-12 h-12 text-teal-100 group-hover:rotate-12 transition-transform" />
              <p className="text-2xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
                “Midflora helped us launch our skincare brand in just 45 days. Their R&D support is exceptional!”
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center text-white font-black">S</div>
                <div>
                  <p className="text-slate-900 font-black text-sm uppercase tracking-widest leading-none">Skincare Labs</p>
                  <p className="text-slate-500 text-[10px] font-bold uppercase mt-1">Founder, Delhi</p>
                </div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll direction="right" className="p-12 bg-slate-950 text-white rounded-[48px] relative overflow-hidden group">
              <Sparkles className="absolute top-10 right-10 w-12 h-12 text-white/5 group-hover:-rotate-12 transition-transform" />
              <p className="text-2xl font-black mb-8 leading-tight tracking-tight">
                “The quality of formulations and the professional branding support made our launch seamless.”
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-slate-950 font-black">H</div>
                <div>
                  <p className="text-white font-black text-sm uppercase tracking-widest leading-none">Herbal Roots</p>
                  <p className="text-slate-400 text-[10px] font-bold uppercase mt-1">Director, Mumbai</p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Section: Call to Action (Contact Form) */}
      <section id="contact" className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.1),transparent_70%)]"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <RevealOnScroll direction="left" className="space-y-10">
              <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[1]">
                Launch Your <br />
                <span className="text-teal-400 italic font-medium">Cosmetic Brand</span> <br />
                Today
              </h2>
              <p className="text-slate-400 text-xl font-bold max-w-lg leading-relaxed">
                Connect with our experts to discuss your requirements and get a customized pricing plan.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <button className="px-12 py-5 bg-teal-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all shadow-[0_20px_50px_-15px_rgba(20,184,166,0.4)]">
                  Request Pricing
                </button>
                <button className="px-12 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all">
                  Talk to Expert
                </button>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right" className="bg-white p-12 rounded-[64px] shadow-2xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full px-8 py-5 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:border-teal-500 font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="w-full px-8 py-5 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:border-teal-500 font-bold" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Product Category</label>
                  <select className="w-full px-8 py-5 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:border-teal-500 font-bold appearance-none">
                    <option>Skincare</option>
                    <option>Haircare</option>
                    <option>Herbal Products</option>
                    <option>Men's Grooming</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Message</label>
                  <textarea placeholder="Describe your brand vision..." rows={4} className="w-full px-8 py-5 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:border-teal-500 font-bold"></textarea>
                </div>
                <button type="submit" className="w-full py-6 bg-slate-950 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.3em] hover:bg-teal-600 transition-all shadow-2xl">
                  Submit Requirement
                </button>
              </form>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}
