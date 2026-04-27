"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
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
  }, [delay]);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-700 ease-out ${className} ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
};

interface CategoryCard {
  title: string;
  description?: string;
  count?: number;
  image?: string;
}

interface CategorySection {
  title: string;
  description: string;
  cards: CategoryCard[];
  buttonText: string;
  isProductSection?: boolean;
}

const categoriesData: CategorySection[] = [
  {
    title: "Skincare",
    description: "Premium skincare formulations including serums, creams, gels, and face washes designed for various skin types and concerns.",
    cards: [
      { title: "Skin Care Range", description: "Premium formulations for comprehensive skin care solutions", count: 43, image: "/cate.webp" },
      { title: "Anti Aging", description: "Advanced formulations to combat signs of aging", count: 18, image: "/cate1.webp" },
      { title: "Body Butter", description: "Rich, nourishing body butters for deep hydration", count: 8, image: "/cate2.webp" },
      { title: "Facial Care", description: "Specialized facial treatments and serums", count: 31, image: "/cate3.webp" },
      { title: "Makeup & Beauty Care", description: "Premium Makeup & Beauty Care products for professional and retail use", count: 37, image: "/cate4.webp" },
      { title: "Foot Care", description: "Premium Foot Care products for professional and retail use", count: 7, image: "/cate5.webp" },
    ],
    buttonText: "View All Skincare"
  },
  {
    title: "Haircare",
    description: "Professional haircare products including shampoos, conditioners, hair oils, and treatment serums for healthy, beautiful hair.",
    cards: [
      { title: "Hair Care Range", description: "Professional hair care products for all hair types", count: 38 },
      { title: "Shampoo", description: "Cleansing shampoos for healthy hair", count: 31, image: "/cate6.webp" },
      { title: "Conditioner", description: "Nourishing conditioners for smooth, manageable hair", count: 21 },
      { title: "Hair Serum", description: "Intensive hair serums for repair and shine", count: 8 },
    ],
    buttonText: "View All Haircare"
  },
  {
    title: "Personal Care",
    description: "Essential personal care products including deodorants, intimate care, and daily hygiene solutions.",
    cards: [
      { title: "Lip Care", description: "Nourishing lip balms and treatments", count: 8, image: "/cate7.webp" },
      { title: "Intimate Care", description: "Premium Intimate Care products for professional and retail use", count: 14 },
      { title: "Oral Care", description: "Premium Oral Care products for professional and retail use", count: 16 },
      { title: "Hygiene", description: "Premium Hygiene products for professional and retail use", count: 28 },
    ],
    buttonText: "View All Personal Care"
  },
  {
    title: "Men's Grooming",
    description: "Specialized grooming products for men including beard oils, shaving care, face washes, and styling products.",
    isProductSection: true,
    cards: [
      { title: "Beard Balm", image: "/cate8.webp" },
      { title: "Beard Cream", image: "/cate9.webp" },
      { title: "Beard Oil", image: "/cate10.webp" },
    ],
    buttonText: "View All Men's Grooming"
  },
  {
    title: "Baby Care",
    description: "Premium Baby Care products for professional and retail use",
    isProductSection: true,
    cards: [
      { title: "Anti Itch Baby Lotion", image: "/cate11.webp" },
      { title: "Baby Balm", image: "/cate12.webp" },
      { title: "Baby Barrier Cream", image: "/cate13.webp" },
    ],
    buttonText: "View All Baby Care"
  }
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24 font-sans selection:bg-teal-500/30 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-teal-50/50 to-transparent pointer-events-none"></div>
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-teal-100/40 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20 px-4 relative z-10">
        <RevealOnScroll>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-6">
            Our Portfolio
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-400">Categories</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Explore our specialized categories for private label and contract manufacturing
          </p>
        </RevealOnScroll>
      </div>

      <div className="w-full max-w-7xl mx-auto h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-24"></div>

      {/* Categories Sections */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-24">
        {categoriesData.map((section: CategorySection, sectionIdx) => (
          <section key={sectionIdx} className="w-full">
            <RevealOnScroll>
              <div className="mb-12 max-w-4xl relative">
                <div className="absolute -left-6 top-1 w-1.5 h-8 bg-teal-500 rounded-r-md hidden md:block"></div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">{section.title}</h2>
                <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-3xl">{section.description}</p>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.cards.map((card: CategoryCard, cardIdx) => (
                <RevealOnScroll key={cardIdx} delay={cardIdx * 100}>
                  {section.isProductSection ? (
                    <div className="bg-white rounded-[24px] border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden group hover:shadow-[0_20px_40px_rgb(20,184,166,0.08)] hover:border-teal-100 transition-all duration-500 flex flex-col h-full cursor-pointer relative top-0 hover:-top-2">
                      <div className="p-8 flex-1 flex items-center justify-center bg-white">
                        {card.image ? (
                          <div className="relative w-full aspect-square max-w-[220px] mx-auto">
                            <Image 
                              src={card.image} 
                              alt={card.title} 
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out" 
                            />
                          </div>
                        ) : (
                          <div className="w-full aspect-square max-w-[220px] mx-auto bg-slate-50 rounded-2xl"></div>
                        )}
                      </div>
                      <div className="p-6 bg-white flex flex-col mt-auto">
                        <h3 className="text-sm font-bold text-slate-900">{card.title}</h3>
                        <div className="w-full h-px bg-slate-100 my-4"></div>
                        <span className="inline-flex items-center text-xs font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                          View Details <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-[24px] border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] p-6 flex flex-col h-full hover:shadow-[0_20px_40px_rgb(20,184,166,0.08)] hover:border-teal-100 transition-all duration-500 group cursor-pointer relative top-0 hover:-top-2">
                      {card.image && (
                        <div className="relative w-full aspect-[4/3] rounded-[16px] overflow-hidden mb-6 bg-slate-50">
                          <Image 
                            src={card.image} 
                            alt={card.title} 
                            fill 
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" 
                          />
                        </div>
                      )}
                      
                      <div className={`flex-1 flex flex-col ${!card.image ? 'pt-4' : ''}`}>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">{card.title}</h3>
                        {card.description && (
                          <p className="text-slate-500 text-sm mb-6 leading-relaxed flex-1">{card.description}</p>
                        )}
                        
                        <div className="mt-auto pt-4 flex flex-col gap-3">
                          {card.count !== undefined && (
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              {card.count} PRODUCTS AVAILABLE
                            </p>
                          )}
                          <span className="inline-flex items-center text-xs font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                            Explore Collection <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </RevealOnScroll>
              ))}
            </div>
            
            <RevealOnScroll delay={200}>
              <div className="mt-16 flex justify-center">
                <Link 
                  href="#" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-slate-900 rounded-full text-sm font-bold text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300 hover:shadow-[0_10px_20px_rgb(0,0,0,0.1)] group/btn"
                >
                  {section.buttonText} <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </RevealOnScroll>
          </section>
        ))}
      </div>
    </div>
  );
}
