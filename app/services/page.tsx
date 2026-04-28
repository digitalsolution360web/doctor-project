"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Microscope, 
  FlaskConical, 
  ShieldCheck, 
  Zap, 
  Trophy, 
  Globe, 
  ChevronRight, 
  ArrowRight, 
  Beaker, 
  ClipboardCheck, 
  Truck, 
  Dna,
  Settings,
  Package,
  Layers,
  Sparkles,
  TrendingUp,
  Palette
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
      desc: "Start your own cosmetic brand without owning a factory. We provide end-to-end solutions to help you go from concept to market quickly.",
      image: "/9.webp",
      features: [
        { icon: FlaskConical, text: "Ready formulations" },
        { icon: Palette, text: "Custom branding" },
        { icon: Package, text: "Packaging support" }
      ],
      color: "teal"
    },
    {
      id: "custom-formulation",
      title: "Custom Formulation",
      subtitle: "Unique & Exclusive Recipes",
      desc: "Unique formulations tailored to your brand vision. Our R&D team works closely with you to create products that stand out in the competitive market.",
      image: "/3.webp",
      features: [
        { icon: Beaker, text: "Active ingredients" },
        { icon: TrendingUp, text: "Trend-based products (Niacinamide, Kojic Acid, etc.)" },
        { icon: ShieldCheck, text: "Clinical validation" }
      ],
      color: "emerald"
    },
    {
      id: "contract-manufacturing",
      title: "Contract Manufacturing",
      subtitle: "Scalable Production Excellence",
      desc: "Large-scale production with consistent quality. Leverage our state-of-the-art facility for high-volume manufacturing needs with precision.",
      image: "/6.webp",
      features: [
        { icon: Settings, text: "Mass production" },
        { icon: ClipboardCheck, text: "Quality assurance" },
        { icon: Truck, text: "Global supply chain" }
      ],
      color: "blue"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center pt-24 overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/banner.webp" 
            alt="Manufacturing Services" 
            fill 
            className="object-cover opacity-30 object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <RevealOnScroll className="max-w-3xl space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase leading-none">
              Manufacturing <span className="text-teal-400">Services</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl font-bold leading-relaxed">
              End-to-end cosmetic manufacturing solutions designed for brand growth and market excellence.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-32">
            {services.map((service, index) => {
              const PrimaryIcon = service.features[0].icon;
              return (
              <div 
                key={service.id} 
                className={`flex flex-col lg:flex-row items-center gap-16 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Visual */}
                <RevealOnScroll direction={index % 2 === 0 ? "left" : "right"} className="flex-1 w-full">
                  <div className="relative aspect-[4/3] rounded-[60px] overflow-hidden shadow-2xl group border border-slate-100">
                    <Image 
                      src={service.image} 
                      alt={service.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                    <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl flex items-center justify-center">
                      <PrimaryIcon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </RevealOnScroll>

                {/* Content */}
                <RevealOnScroll direction={index % 2 === 0 ? "right" : "left"} className="flex-1 space-y-8">
                  <div className="space-y-4">
                    <p className="text-teal-600 font-black text-xs uppercase tracking-[0.4em]">{service.subtitle}</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tighter uppercase leading-none">{service.title}</h2>
                    <p className="text-slate-700 text-xl font-bold leading-relaxed">{service.desc}</p>
                  </div>

                  <div className="space-y-4">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center space-x-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-teal-200 hover:bg-white hover:shadow-xl transition-all duration-500 group">
                        <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center group-hover:bg-teal-600 transition-colors">
                          <feature.icon className="w-5 h-5 text-teal-600 group-hover:text-white" />
                        </div>
                        <span className="text-slate-800 font-black text-sm uppercase tracking-tight">{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Link href="/#contact" className="inline-flex items-center space-x-4 px-10 py-5 bg-slate-950 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-teal-600 transition-all shadow-2xl group">
                      <span>Start Your Project</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                </RevealOnScroll>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4 text-center">
          <RevealOnScroll className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tighter uppercase leading-none">
              Ready to Build Your <span className="text-teal-600">Dream Brand?</span>
            </h2>
            <p className="text-slate-600 text-xl font-bold">
              Connect with our experts today for a free consultation and customized quote.
            </p>
            <div className="pt-4">
              <Link href="/#contact" className="px-12 py-6 bg-teal-600 text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-slate-950 transition-all shadow-2xl hover:-translate-y-2 inline-block">
                Request a Free Quote
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}


