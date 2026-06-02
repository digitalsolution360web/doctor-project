"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  CheckCircle,
  Globe,
  ChevronRight,
  Trophy,
  ClipboardCheck,
  FileCheck,
  Medal,
  CheckCircle2
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

export default function CertificationsPage() {
  const certs = [
    {
      title: "ISO 22716:2007",
      body: "Cosmetic GMP Standard",
      desc: "The premier international standard for Good Manufacturing Practices (GMP) specifically for the cosmetics industry. It provides guidance for production, control, storage, and shipment, ensuring that Midflora products are manufactured to the highest safety and quality benchmarks.",
      icon: Award
    },
    {
      title: "WHO-GMP Certified",
      body: "Good Manufacturing Practices",
      desc: "Our production facility strictly adheres to WHO-GMP guidelines. This certification ensures that our products are consistently produced and controlled according to quality standards appropriate for their intended use and as required by the regulatory authorities.",
      icon: ShieldCheck
    },
    {
      title: "ISO 9001:2015",
      body: "Quality Management System",
      desc: "This certification demonstrates our ability to consistently provide products and services that meet customer and applicable statutory and regulatory requirements. It focuses on enhancing customer satisfaction through effective application of the system.",
      icon: Medal
    },
    {
      title: "Dermatologically Tested",
      body: "Consumer Safety Excellence",
      desc: "Every formulation we develop undergoes rigorous clinical testing and dermatological evaluation. We ensure that our products are non-irritating, safe for skin, and meet the highest international safety standards for consumer health.",
      icon: CheckCircle2
    },
    {
      title: "HALAL Certified",
      body: "Ethical Manufacturing Standards",
      desc: "We maintain compliance with Halal standards, ensuring that our raw materials, ingredients, and entire manufacturing process are ethically sourced and religiously compliant, opening your brand to a global audience.",
      icon: Globe
    },
    {
      title: "FDA Compliant",
      body: "Strict Regulatory Adherence",
      desc: "Midflora Herbal maintains strict compliance with FDA guidelines for cosmetic manufacturing. From labeling requirements to ingredient safety, we ensure your products are fully compliant with the latest global regulatory frameworks.",
      icon: FileCheck
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white pt-20">

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/certification.webp"
            alt="Factory Infrastructure"
            fill
            sizes="100vw"
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <RevealOnScroll className="space-y-6 md:space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 font-black text-[10px] md:text-xs uppercase tracking-[0.2em] mb-4">
                Quality & Compliance
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter uppercase">
                Certifications.
              </h1>
              <h2 className="text-xl md:text-3xl font-bold text-teal-400 tracking-tight leading-tight">
                Commitment to Quality <br className="hidden md:block" /> & Compliance
              </h2>
              <p className="text-base md:text-xl text-slate-300 max-w-xl font-bold leading-relaxed">
                We follow strict manufacturing protocols and quality practices to ensure reliable and safe cosmetic manufacturing.
              </p>
            </RevealOnScroll>

            <RevealOnScroll direction="right" className="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-[48px]">
               <h3 className="text-lg font-black uppercase tracking-widest text-white mb-8 flex items-center">
                  <span className="w-8 h-[2px] bg-teal-500 mr-4"></span>
                  Our Quality Focus
               </h3>
               <div className="grid grid-cols-1 gap-5">
                  {[
                    "Hygiene & safety",
                    "Quality assurance",
                    "Process consistency",
                    "Product reliability",
                    "Ethical manufacturing practices"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <div className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center border border-teal-500/30">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                      </div>
                      <span className="text-slate-200 font-bold text-sm md:text-base tracking-tight">{item}</span>
                    </div>
                  ))}
               </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Main Certs Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {certs.map((cert, i) => (
              <RevealOnScroll key={i} className="h-full">
                <div className="p-6 md:p-10 bg-white border border-slate-100 rounded-[32px] md:rounded-[40px] shadow-sm hover:shadow-2xl transition-all duration-700 group relative overflow-hidden h-full flex flex-col">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-1000"></div>

                  <div className="relative z-10 flex-1">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-50 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:bg-teal-600 transition-all shadow-sm">
                      <cert.icon className="w-6 h-6 md:w-8 md:h-8 text-teal-600 group-hover:text-white" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-slate-900 uppercase tracking-tight mb-2">{cert.title}</h3>
                    <p className="text-teal-600 font-black text-[10px] md:text-xs uppercase tracking-[0.2em] mb-4 md:mb-6">{cert.body}</p>
                    <p className="text-slate-600 text-sm md:text-lg font-medium leading-relaxed">{cert.desc}</p>
                  </div>

                  <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-slate-50 flex items-center justify-between group-hover:border-teal-100 transition-colors relative z-10">
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Global Compliance</span>
                    <Medal className="w-4 h-4 md:w-5 md:h-5 text-slate-200 group-hover:text-teal-500 transition-colors" />
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-10 md:py-16 bg-slate-100 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-10 md:gap-14">
            <RevealOnScroll className="max-w-2xl">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight uppercase text-center mb-0">
                Manufactured under strict<br className="hidden md:block" />quality and safety standards.
              </h3>
            </RevealOnScroll>
            <RevealOnScroll className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {[
                { name: "ISO", logo: "https://thegreatherbal.com/wp-content/uploads/2025/04/organic-logo-18-4.jpg" },
                { name: "ISO", logo: "https://thegreatherbal.com/wp-content/uploads/2025/04/kosher.webp" },
                { name: "ISO", logo: "https://thegreatherbal.com/wp-content/uploads/2025/04/ISO_14001_Logo.webp" },
                { name: "ISO", logo: "https://thegreatherbal.com/wp-content/uploads/2025/04/iso-9001_2015.jpg" },
                { name: "ISO", logo: "https://thegreatherbal.com/wp-content/uploads/2025/04/glp-18-4.jpg" },
                { name: "ISO", logo: "https://thegreatherbal.com/wp-content/uploads/2024/12/CrueltyFree.png" },
                { name: "ISO", logo: "https://thegreatherbal.com/wp-content/uploads/2025/04/18-4-vegan-org.jpg" },
                { name: "ISO", logo: "https://thegreatherbal.com/wp-content/uploads/2025/04/fda-18-4.jpg" },
                { name: "ISO", logo: "https://thegreatherbal.com/wp-content/uploads/2025/04/22716-2007-18-4.png" }
              ].map((cert, i) => (
                <div key={i} className="flex items-center group cursor-default">
                  <div className="w-28 h-28 md:w-40 md:h-40 rounded-full bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-all duration-500 group-hover:shadow-[0_20px_40px_-15px_rgba(20,184,166,0.2)] overflow-hidden p-3 md:p-4">
                    <img
                      src={cert.logo}
                      alt={cert.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              ))}
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.1),transparent_70%)]"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <RevealOnScroll className="max-w-3xl mx-auto space-y-8 md:space-y-10">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tighter uppercase leading-[1.1]">
              Safety is <span className="text-teal-400">Non-Negotiable.</span>
            </h2>
            <p className="text-slate-400 text-base md:text-xl font-medium leading-relaxed">
              Every batch undergoes rigorous quality checks before it leaves our facility. We prioritize consumer safety above all else.
            </p>
            <div className="pt-4">
              <Link href="/infrastructure" className="px-8 py-4 md:px-10 md:py-5 bg-teal-600 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all inline-block shadow-2xl">
                Explore Our Infrastructure
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
