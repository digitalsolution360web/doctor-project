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
      description: "Start your own cosmetic brand without owning a factory. We provide a complete turnkey solution from concept to market-ready products.",
      features: ["Ready formulations", "Custom branding", "Packaging support"],
      image: "/depilation.webp",
      icon: Package
    },
    {
      id: "custom-formulation",
      title: "Custom Formulation",
      subtitle: "Unique & Exclusive Recipes",
      description: "Unique formulations tailored to your brand vision. Our R&D team develops exclusive recipes using high-performance active ingredients.",
      features: ["Active ingredients", "Trend-based products (Niacinamide, Kojic Acid, etc.)", "Stability testing"],
      image: "/3.webp",
      icon: FlaskConical
    },
    {
      id: "contract-manufacturing",
      title: "Contract Manufacturing",
      subtitle: "Scalable Production Excellence",
      description: "Large-scale production with consistent quality. We offer flexible manufacturing capacities to grow with your brand.",
      features: ["Bulk production", "High-speed filling", "Quality assurance & compliance"],
      image: "/6.webp",
      icon: Settings
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
      <section className="py-12 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {services.map((service, index) => (
              <RevealOnScroll key={service.id} direction="up" className="flex flex-col h-full bg-white rounded-[40px] border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.05)] overflow-hidden hover:shadow-[0_40px_100px_rgba(0,0,0,0.1)] transition-all duration-700 group">
                {/* Visual */}
                <div className="relative aspect-[1.3/1] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60"></div>

                  {/* Floating Icon */}
                  <div className="absolute bottom-6 left-6 w-14 h-14 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl flex items-center justify-center text-white">
                    <service.icon className="w-7 h-7" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 flex flex-col flex-1 space-y-8">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-teal-600 font-black text-[10px] uppercase tracking-[0.3em]">{service.subtitle}</p>
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight tracking-tight group-hover:text-teal-600 transition-colors">
                        {service.title}
                      </h2>
                    </div>
                    <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Feature List */}
                  <div className="space-y-4 flex-grow">
                    <p className="text-slate-900 font-bold text-[10px] uppercase tracking-[0.1em]">Key Features:</p>
                    <div className="grid gap-3">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center space-x-3 group/item">
                          <div className="w-1.5 h-1.5 rounded-full bg-teal-500 group-hover/item:scale-150 transition-transform"></div>
                          <span className="text-slate-600 text-sm font-bold tracking-tight">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6">
                    <Link href="/#contact" className="w-full inline-flex items-center justify-center space-x-3 px-8 py-5 bg-slate-950 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-teal-600 transition-all shadow-xl group">
                      <span>Start Your Project</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}






