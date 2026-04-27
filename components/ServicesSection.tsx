"use client";

import React from "react";
import { 
  Microscope, 
  ShieldCheck, 
  Settings, 
  Palette
} from "lucide-react";

const services = [
  { 
    icon: Microscope, 
    title: "Custom Formulation", 
    desc: "Unique formulations tailored to your brand's specific needs and market trends."
  },
  { 
    icon: ShieldCheck, 
    title: "Private Labeling", 
    desc: "Ready-to-market products with your branding and customized packaging."
  },
  { 
    icon: Settings, 
    title: "Bulk Manufacturing", 
    desc: "High-capacity production facilities to handle orders of any scale efficiently."
  },
  { 
    icon: Palette, 
    title: "Packaging & Branding Support", 
    desc: "End-to-end design and regulatory support for a standout brand identity."
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-white relative">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-[40px] md:text-[56px] font-black text-slate-900 leading-tight mb-4">
          End-To-End Cosmetic <br className="hidden md:block" />
          <span className="text-teal-600">Manufacturing Solutions</span>
        </h2>
        <p className="text-slate-600 text-lg font-medium mb-16 max-w-3xl mx-auto">
          Comprehensive services to bring your brand from concept to market reality.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <div key={i} className="bg-white p-12 rounded-[40px] border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 text-left">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center mb-8">
                <service.icon className="w-7 h-7 text-teal-600" />
              </div>
              <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{service.title}</h4>
              <p className="text-slate-500 text-base leading-relaxed font-medium">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
