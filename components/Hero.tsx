"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Award, FlaskConical } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden bg-white">
      {/* Background Image - 100% Sharp & Centered */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/banner.webp"
          alt="Laboratory Banner"
          fill
          className="object-cover object-[center_20%]"
          priority
        />
        {/* Minimal gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Left Side Content - Animates from Left */}
        <div className="max-w-3xl animate-reveal-left">
          <div className="inline-flex items-center px-4 py-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-700 font-black text-xs uppercase tracking-widest mb-8">
            <span className="relative flex h-2.5 w-2.5 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
            </span>
            ISO 9001:2015 & GMP CERTIFIED
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter uppercase">
            Innovating <br />
            <span className="text-teal-600">The Future</span> <br />
            Of Health.
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-700 mb-12 max-w-2xl font-bold leading-relaxed">
            Dr Expert Formulation Pvt Ltd is India's premier pharmaceutical manufacturing hub, delivering excellence through science.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 mb-16">
            <Link
              href="/services"
              className="px-12 py-5 bg-teal-600 text-white rounded-2xl font-black text-sm flex items-center justify-center hover:bg-slate-950 transition-all shadow-[0_20px_50px_-15px_rgba(20,184,166,0.4)] hover:-translate-y-1 uppercase tracking-widest"
            >
              Our Expertise
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/quote"
              className="px-12 py-5 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl font-black text-sm flex items-center justify-center hover:bg-slate-50 transition-all hover:-translate-y-1 uppercase tracking-widest"
            >
              Inquire Now
            </Link>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 py-10 border-t border-slate-900/5">
            {[
              { icon: ShieldCheck, title: "Quality", desc: "GMP CERTIFIED" },
              { icon: Award, title: "Certified", desc: "ISO 9001:2015" },
              { icon: FlaskConical, title: "Research", desc: "ADVANCED R&D" }
            ].map((prop, i) => (
              <div key={i} className="flex items-center space-x-4 group">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/5 flex items-center justify-center group-hover:bg-teal-600 transition-all duration-500">
                  <prop.icon className="text-teal-600 group-hover:text-white w-7 h-7" />
                </div>
                <div>
                  <p className="text-slate-900 font-black text-sm uppercase tracking-tight leading-none">{prop.title}</p>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-2">{prop.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;










