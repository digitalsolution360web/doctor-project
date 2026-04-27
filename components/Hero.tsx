"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, FlaskConical, FileText } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90svh] flex items-center pt-14 overflow-hidden bg-slate-950">
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
        <div className="max-w-4xl animate-reveal-left mt-6 md:mt-0">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-3 tracking-tight">
            India’s Trusted Third-Party <br className="hidden md:block" />
            <span className="text-[#A3E635]">Cosmetic Manufacturer</span>
          </h1>

          <p className="text-lg md:text-2xl text-slate-200 mb-8 font-medium tracking-wide max-w-3xl leading-snug">
            Premium Herbal & Dermatologically Tested Products – <br className="md:hidden" />
            <span className="text-[#A3E635]">From Concept to Market</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <Link
              href="#contact"
              className="px-10 py-5 bg-[#A3E635] text-slate-950 rounded-2xl font-black text-sm tracking-widest flex items-center justify-center hover:bg-white transition-all shadow-[0_10px_40px_-10px_rgba(163,230,53,0.5)] hover:-translate-y-1"
            >
              Get Free Quote
            </Link>
            <Link
              href="#categories"
              className="px-10 py-5 bg-white text-slate-950 rounded-2xl font-black text-sm tracking-widest flex items-center justify-center hover:bg-slate-200 transition-all shadow-xl hover:-translate-y-1"
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













