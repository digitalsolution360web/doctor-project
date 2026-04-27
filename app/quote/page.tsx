"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  ChevronRight, 
  MessageSquare,
  Clock,
  ArrowRight
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

export default function QuotePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/banner.webp" 
            alt="Contact Us" 
            fill 
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <RevealOnScroll className="max-w-3xl space-y-6">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
              Get A <span className="text-teal-400">Quote.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl font-bold leading-relaxed">
              Ready to start your brand? Fill out the form below and our experts will get back to you within 24 hours.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Form Section */}
            <div className="flex-[1.5]">
              <RevealOnScroll className="bg-white rounded-[48px] p-8 md:p-16 shadow-2xl border border-slate-100">
                <form className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Full Name</label>
                      <input type="text" placeholder="Your Name" className="w-full px-8 py-5 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:border-teal-500 font-bold" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Brand Name</label>
                      <input type="text" placeholder="Your Brand / Company" className="w-full px-8 py-5 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:border-teal-500 font-bold" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Phone Number</label>
                      <input type="tel" placeholder="+91" className="w-full px-8 py-5 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:border-teal-500 font-bold" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Email Address</label>
                      <input type="email" placeholder="example@email.com" className="w-full px-8 py-5 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:border-teal-500 font-bold" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Product Type</label>
                      <select className="w-full px-8 py-5 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:border-teal-500 font-bold appearance-none">
                        <option>Skincare (Serums, Face Wash)</option>
                        <option>Haircare (Oils, Shampoos)</option>
                        <option>Herbal Products</option>
                        <option>Men's Grooming</option>
                        <option>Bath & Body</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Quantity Required</label>
                      <input type="number" placeholder="Expected MOQ" className="w-full px-8 py-5 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:border-teal-500 font-bold" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Message / Brand Vision</label>
                    <textarea rows={5} placeholder="Tell us about your product requirements..." className="w-full px-8 py-5 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:border-teal-500 font-bold resize-none"></textarea>
                  </div>

                  <button className="w-full py-6 bg-slate-950 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.3em] hover:bg-teal-600 transition-all shadow-2xl flex items-center justify-center space-x-3">
                    <span>Submit Requirement</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </RevealOnScroll>
            </div>

            {/* Contact Info Sidebar */}
            <div className="flex-1 space-y-10">
              <RevealOnScroll className="bg-slate-900 rounded-[48px] p-10 text-white space-y-12">
                <h3 className="text-3xl font-black uppercase tracking-tighter">Contact <span className="text-teal-400">Details.</span></h3>
                
                <div className="space-y-8">
                   <div className="flex items-start space-x-6 group cursor-pointer">
                      <div className="w-12 h-12 bg-teal-500/10 border border-teal-500/20 rounded-2xl flex items-center justify-center text-teal-400 group-hover:bg-teal-600 group-hover:text-white transition-all">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Call Us</p>
                        <p className="font-bold text-lg">+91-8826862154</p>
                      </div>
                   </div>

                   <div className="flex items-start space-x-6 group cursor-pointer">
                      <div className="w-12 h-12 bg-teal-500/10 border border-teal-500/20 rounded-2xl flex items-center justify-center text-teal-400 group-hover:bg-teal-600 group-hover:text-white transition-all">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Email Us</p>
                        <p className="font-bold text-lg">sales@drexpert.com</p>
                      </div>
                   </div>

                   <div className="flex items-start space-x-6 group cursor-pointer">
                      <div className="w-12 h-12 bg-teal-500/10 border border-teal-500/20 rounded-2xl flex items-center justify-center text-teal-400 group-hover:bg-teal-600 group-hover:text-white transition-all">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Visit Factory</p>
                        <p className="font-bold text-lg leading-tight">Noida, Uttar Pradesh, <br />India</p>
                      </div>
                   </div>
                </div>

                <div className="pt-8 border-t border-white/10 space-y-6">
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Support</p>
                   <Link href="https://wa.me/918826862154" className="flex items-center justify-between p-6 bg-teal-600 rounded-[32px] group hover:bg-white hover:text-slate-950 transition-all">
                      <div className="flex items-center space-x-4">
                        <MessageSquare className="w-6 h-6" />
                        <span className="font-black uppercase tracking-widest text-sm">WhatsApp Chat</span>
                      </div>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                   </Link>
                </div>
              </RevealOnScroll>

              <RevealOnScroll direction="up" className="bg-white rounded-[40px] p-10 border border-slate-100 flex items-center space-x-6">
                 <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center text-teal-600">
                    <Clock className="w-8 h-8" />
                 </div>
                 <div>
                    <p className="font-black text-slate-900 uppercase tracking-tight">Business Hours</p>
                    <p className="text-slate-500 font-bold text-sm uppercase">Mon - Sat: 9:00 AM - 6:00 PM</p>
                 </div>
              </RevealOnScroll>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
