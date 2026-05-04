"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FlaskConical,
  ShieldCheck,
  ArrowRight,
  Beaker,
  ClipboardCheck,
  Truck,
  Settings,
  Package,
  TrendingUp,
  Palette,
  ChevronRight
} from "lucide-react";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  style?: React.CSSProperties;
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children, className = "", direction = "up", style }) => {
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
    <div ref={ref} className={`${className} ${animationClass}`} style={style}>
      {children}
    </div>
  );
};

export default function ServicesPage() {
  const services = [
    {
      id: "private-label",
      title: "Private Label Manufacturing",
      subtitle: "Launch Your Brand Effortlessly",
      image: "/9.webp",
      color: "teal"
    },
    {
      id: "custom-formulation",
      title: "Custom Formulation",
      subtitle: "Unique & Exclusive Recipes",
      image: "/3.webp",
      color: "emerald"
    },
    {
      id: "contract-manufacturing",
      title: "Contract Manufacturing",
      subtitle: "Scalable Production Excellence",
      image: "/6.webp",
      color: "blue"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero / Banner Section */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center pt-20 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <Image
            src="/banner1.webp"
            alt="Manufacturing Services"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <RevealOnScroll className="max-w-3xl space-y-4">
            <div className="flex items-center space-x-2 text-teal-400 font-bold text-xs uppercase tracking-widest">
              <span>Home</span>
              <ChevronRight className="w-3 h-3" />
              <span>Services</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-tight">
              Our Manufacturing <span className="text-teal-400">Services</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
              Premium end-to-end solutions for high-performance cosmetic brands.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => {
              return (
                <RevealOnScroll key={service.id} direction="up" className="flex flex-col h-full bg-white rounded-[32px] border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)] overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 group">
                  {/* Visual */}
                  <div className="relative aspect-[1.3/1] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-7 flex flex-col flex-1 space-y-6 justify-between">
                    <div className="space-y-2">
                      <p className="text-teal-600 font-bold text-[10px] uppercase tracking-[0.2em]">{service.subtitle}</p>
                      <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight group-hover:text-teal-600 transition-colors">{service.title}</h2>
                    </div>

                    <div className="pt-2">
                      <Link href="/#contact" className="w-full inline-flex items-center justify-center space-x-3 px-6 py-4 bg-slate-950 text-white rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-teal-600 transition-all shadow-lg group">
                        <span>Start Your Project</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}






