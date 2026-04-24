"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Award, FlaskConical, CheckCircle } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
      {/* Background Image with Subtle Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/banner.webp"
          alt="Cosmetic Manufacturing"
          fill
          className="object-cover object-center scale-105"
          priority
        />
        {/* Softer, more premium gradient for better image visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/40 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl animate-reveal-left">
          {/* Trust Signals Badges */}
          <div className="flex flex-wrap gap-3 mb-8">
            {["ISO Certified", "GMP Certified", "1000+ Formulations", "PAN India Supply"].map((signal, i) => (
              <div key={i} className="inline-flex items-center px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 font-bold text-[10px] uppercase tracking-widest">
                <CheckCircle className="w-3 h-3 mr-2" />
                {signal}
              </div>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter uppercase">
            India’s Trusted <br />
            <span className="text-teal-600">Third-Party</span> <br />
            Cosmetic Manufacturer
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-700 mb-12 max-w-2xl font-bold leading-relaxed">
            Premium Herbal & Dermatologically Tested Products – From Concept to Market
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5">
            <Link
              href="#contact"
              className="px-12 py-5 bg-teal-600 text-white rounded-2xl font-black text-sm flex items-center justify-center hover:bg-slate-950 transition-all shadow-[0_20px_50px_-15px_rgba(20,184,166,0.4)] hover:-translate-y-1 uppercase tracking-widest"
            >
              Get Free Quote
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="#services"
              className="px-12 py-5 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl font-black text-sm flex items-center justify-center hover:bg-slate-50 transition-all hover:-translate-y-1 uppercase tracking-widest"
            >
              Start Your Brand
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;











