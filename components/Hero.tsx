"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, FlaskConical, FileText } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center pt-20 overflow-hidden bg-slate-950">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/banner1.webp"
          alt="Cosmetic Manufacturing"
          fill
          sizes="100vw"
          className="object-cover object-center md:object-right"
          priority
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-950/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 w-full">
        <div className="max-w-4xl animate-reveal-left mt-10 md:mt-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 tracking-tight">
            India’s <span className="text-[#A3E635]">1st</span> Doctor-Led Ai <br className="hidden md:block" />
            Cosmetic Manufacturers
          </h1>

          <p className="text-lg md:text-xl text-[#A3E635] mb-8 font-semibold tracking-wide">
            Trusted by 100+ D2C & FMCG Brands Globally
          </p>

          {/* Trust Signals Badges */}
          <div className="flex flex-wrap gap-4 mb-10">
            {["Low Moq", "Free Sampling", "R&d Driven"].map((signal, i) => (
              <div key={i} className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white font-bold text-[11px] md:text-xs tracking-widest backdrop-blur-md">
                <CheckCircle className="w-4 h-4 mr-2 text-[#A3E635]" />
                {signal}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-5">
            <Link
              href="#formulator"
              className="px-8 py-4 bg-white text-slate-950 rounded-xl font-bold text-sm flex items-center justify-center hover:bg-slate-200 transition-all shadow-[0_0_30_rgba(255,255,255,0.15)] hover:-translate-y-1"
            >
              <FlaskConical className="mr-3 w-5 h-5" />
              Free Ai Formulator
            </Link>
            <Link
              href="#estimate"
              className="px-8 py-4 bg-white text-slate-950 rounded-xl font-bold text-sm flex items-center justify-center hover:bg-slate-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:-translate-y-1"
            >
              <FileText className="mr-3 w-5 h-5" />
              Request Estimate
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;













