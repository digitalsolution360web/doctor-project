"use client";

import React from "react";
import { 
  Microscope, 
  ShieldCheck, 
  Settings, 
  Palette,
  ArrowRight
} from "lucide-react";

const services = [
  { 
    icon: Microscope, 
    title: "Custom Formulation", 
    desc: "Unique formulations tailored to your brand vision with trend-based active ingredients."
  },
  { 
    icon: ShieldCheck, 
    title: "Private Label Manufacturing", 
    desc: "Start your own cosmetic brand without owning a factory. We handle everything from concept to market."
  },
  { 
    icon: Settings, 
    title: "Contract Manufacturing", 
    desc: "Large-scale production with consistent quality using our state-of-the-art facilities."
  },
  { 
    icon: Palette, 
    title: "Packaging & Branding Support", 
    desc: "Professional design and regulatory support to give your brand a standout international identity."
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl text-left">
            <h2 className="text-xs font-black text-teal-600 tracking-[0.3em] uppercase mb-4">Our Expertise</h2>
            <h3 className="text-4xl md:text-[56px] font-black text-slate-900 leading-[1.1] tracking-tighter">
              End-to-End Manufacturing <br />
              <span className="text-slate-400">Solutions.</span>
            </h3>
          </div>
          <p className="text-slate-500 text-lg font-bold max-w-md text-left lg:text-right leading-relaxed mb-2">
            Comprehensive services to transform your cosmetic vision into a market-leading reality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <div key={i} className="group relative bg-white p-10 rounded-[48px] border border-slate-100 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(20,184,166,0.15)] hover:border-teal-100 transition-all duration-700 hover:-translate-y-3 text-left overflow-hidden cursor-pointer">
              {/* Subtle background icon */}
              <service.icon className="absolute -right-6 -bottom-6 w-32 h-32 text-slate-50 group-hover:text-teal-50/50 transition-colors duration-700 -rotate-12" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-[24px] bg-slate-50 border border-slate-100 flex items-center justify-center mb-8 group-hover:bg-teal-600 group-hover:border-teal-600 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_10px_30px_-10px_rgba(20,184,166,0.5)]">
                  <service.icon className="w-8 h-8 text-slate-900 group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-teal-600 transition-colors uppercase leading-none">{service.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed font-bold opacity-80 group-hover:opacity-100 transition-opacity">{service.desc}</p>
              </div>

              {/* Action indicator */}
              <div className="mt-8 flex items-center text-[10px] font-black text-teal-600 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                Explore Service <ArrowRight className="ml-2 w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
