"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Send, 
  CheckCircle2, 
  User, 
  Mail, 
  Phone, 
  Building2, 
  MessageSquare,
  Package,
  Layers,
  ArrowRight,
  ShieldCheck
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

export default function QuotePage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-20 px-4">
        <RevealOnScroll className="max-w-xl w-full text-center space-y-8 p-12 bg-slate-50 rounded-[48px] border border-slate-100 shadow-2xl">
          <div className="w-24 h-24 bg-teal-600 rounded-full flex items-center justify-center mx-auto shadow-xl">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase">Inquiry Received</h1>
          <p className="text-slate-600 text-lg font-bold">
            Thank you for reaching out. Our technical team will analyze your requirements and contact you within 24 business hours.
          </p>
          <Link href="/" className="inline-block px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-teal-600 transition-all">
            Return to Home
          </Link>
        </RevealOnScroll>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white pt-20">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-teal-50 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute top-1/2 -right-48 w-[600px] h-[600px] bg-slate-50 rounded-full blur-[160px] opacity-40"></div>
      </div>

      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-20">
            {/* Left Content */}
            <RevealOnScroll direction="left" className="flex-1 space-y-10">
              <div className="inline-flex items-center px-4 py-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-700 font-black text-xs uppercase tracking-widest">
                Manufacturing Inquiry
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-none tracking-tighter uppercase">
                Get a <span className="text-teal-600">Technical</span> <br />
                Proposal.
              </h1>
              <p className="text-xl text-slate-700 font-bold leading-relaxed max-w-lg">
                Fill out the form to request a detailed manufacturing quote, MOQ analysis, and technical feasibility report.
              </p>

              <div className="space-y-8 pt-6">
                {[
                  { icon: ShieldCheck, title: "Confidentiality Guaranteed", desc: "All formulation data is protected under NDA." },
                  { icon: Package, title: "MOQ Flexibility", desc: "Solutions for both pilot batches and large-scale runs." },
                  { icon: Layers, title: "End-to-End Support", desc: "From lab testing to final packaging design." }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-5">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-slate-100 shrink-0">
                      <item.icon className="w-6 h-6 text-teal-600" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">{item.title}</h4>
                      <p className="text-slate-500 font-bold text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            {/* Quote Form */}
            <RevealOnScroll direction="right" className="flex-1">
              <div className="bg-white rounded-[48px] p-8 md:p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                          required
                          type="text" 
                          placeholder="John Doe"
                          className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-bold text-slate-900 placeholder:text-slate-300"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                          required
                          type="email" 
                          placeholder="john@company.com"
                          className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-bold text-slate-900 placeholder:text-slate-300"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                          required
                          type="tel" 
                          placeholder="+91-0000000000"
                          className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-bold text-slate-900 placeholder:text-slate-300"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Company Name</label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                          type="text" 
                          placeholder="HealthCare Ltd."
                          className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-bold text-slate-900 placeholder:text-slate-300"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Interested Product Segment</label>
                    <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-bold text-slate-900 appearance-none">
                      <option>Pharmaceutical Formulations</option>
                      <option>Herbal & Ayurvedic</option>
                      <option>Nutraceuticals</option>
                      <option>Cosmeceuticals</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Message / Technical Requirements</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-5 w-4 h-4 text-slate-400" />
                      <textarea 
                        rows={4}
                        placeholder="Describe your formulation, required dosage form, and estimated monthly volume..."
                        className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-bold text-slate-900 placeholder:text-slate-300 resize-none"
                      ></textarea>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-5 bg-teal-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-slate-900 transition-all shadow-xl hover:-translate-y-1 active:scale-95 flex items-center justify-center space-x-3 group"
                  >
                    <span>Submit Inquiry</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">
            Average Response Time: <span className="text-teal-600">Less than 24 Hours</span>
          </p>
        </div>
      </section>
    </div>
  );
}
