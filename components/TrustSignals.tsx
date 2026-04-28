"use client";

import React from "react";
import { ShieldCheck, Award, FlaskConical, MapPin } from "lucide-react";

const signals = [
  {
    icon: ShieldCheck,
    title: "ISO Certified",
    desc: "Quality Management System Standards",
    value: "ISO 9001:2015"
  },
  {
    icon: Award,
    title: "GMP Certified",
    desc: "Good Manufacturing Practices Approved",
    value: "WHO-GMP"
  },
  {
    icon: FlaskConical,
    title: "1000+ Formulations",
    desc: "Extensive R&D Formulation Library",
    value: "Ready Assets"
  },
  {
    icon: MapPin,
    title: "PAN India Supply",
    desc: "Seamless Distribution Nationwide",
    value: "32+ States"
  }
];

const TrustSignals = () => {
  return (
    <section className="relative z-20 -mt-10 lg:-mt-14 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-slate-900 border border-white/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] rounded-[40px] p-2 lg:p-3 backdrop-blur-3xl overflow-hidden group">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/5 relative z-10">
            {signals.map((item, i) => (
              <div key={i} className="p-6 lg:p-8 flex flex-col items-center text-center group/item hover:bg-white/5 transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/10 flex items-center justify-center mb-5 border border-teal-500/20 group-hover/item:bg-teal-500 group-hover/item:border-teal-500 transition-all duration-500 group-hover/item:scale-110 group-hover/item:shadow-[0_0_30px_rgba(20,184,166,0.3)]">
                  <item.icon className="w-7 h-7 text-teal-400 group-hover/item:text-slate-950 transition-colors" />
                </div>
                
                <div className="space-y-1.5">
                  <span className="text-[9px] font-black text-teal-500 tracking-[0.3em] uppercase block">{item.value}</span>
                  <h4 className="text-base font-semibold text-white tracking-tight group-hover/item:text-teal-400 transition-colors">{item.title}</h4>
                  <p className="text-slate-500 text-[11px] font-bold leading-tight group-hover/item:text-slate-400 transition-colors">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
