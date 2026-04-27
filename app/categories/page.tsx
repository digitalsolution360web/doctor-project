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
  benefits?: string[];
  ingredients?: string[];
  moq?: string;
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
      { 
        title: "Advanced Face Serums", 
        description: "High-performance serums with rapid absorption.", 
        image: "/cate.webp",
        benefits: ["Deep Hydration", "Brightening", "Anti-Aging"],
        ingredients: ["Niacinamide", "Hyaluronic Acid", "Vitamin C"],
        moq: "500 Units"
      },
      { 
        title: "Herbal Face Wash", 
        description: "Gentle cleansing with botanical extracts.", 
        image: "/cate3.webp",
        benefits: ["pH Balanced", "Deep Cleansing", "Non-Drying"],
        ingredients: ["Aloe Vera", "Neem", "Tea Tree Oil"],
        moq: "1000 Units"
      },
      { 
        title: "Moisturizing Creams", 
        description: "Rich textures for all-day skin nourishment.", 
        image: "/cate1.webp",
        benefits: ["24h Moisture", "Barrier Repair", "Skin Softening"],
        ingredients: ["Ceramides", "Shea Butter", "Kojic Acid"],
        moq: "500 Units"
      },
    ],
    buttonText: "View All Skincare"
  },
  {
    title: "Haircare",
    description: "Professional haircare products including shampoos, conditioners, hair oils, and treatment serums for healthy, beautiful hair.",
    cards: [
      { 
        title: "Onion Hair Oil", 
        description: "Natural hair growth and strength formula.", 
        image: "/cate6.webp",
        benefits: ["Hair Growth", "Dandruff Control", "Root Strength"],
        ingredients: ["Red Onion Oil", "Bhringraj", "Black Seed"],
        moq: "1000 Units"
      },
      { 
        title: "Biotin Shampoo", 
        description: "Volumizing treatment for thinning hair.", 
        image: "/cate2.webp",
        benefits: ["Volume Boost", "Scalp Health", "Shine Enhancement"],
        ingredients: ["Biotin", "Argan Oil", "Keratin"],
        moq: "1000 Units"
      },
    ],
    buttonText: "View All Haircare"
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.cards.map((card: CategoryCard, cardIdx) => (
                <RevealOnScroll key={cardIdx} delay={cardIdx * 100}>
                  <Link 
                    href={`/product/${card.title.toLowerCase().replace(/ /g, "-")}`}
                    className="bg-white rounded-[48px] border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.02)] p-8 flex flex-col h-full hover:shadow-[0_30px_60px_rgb(20,184,166,0.1)] hover:border-teal-100 transition-all duration-700 group cursor-pointer relative top-0 hover:-top-3 block"
                  >
                        {card.image && (
                          <div className="relative w-full aspect-square rounded-[32px] overflow-hidden mb-8 bg-slate-50 flex items-center justify-center p-8">
                            <Image 
                              src={card.image} 
                              alt={card.title} 
                              fill 
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-contain group-hover:scale-110 transition-transform duration-1000 ease-out mix-blend-multiply" 
                            />
                          </div>
                        )}
                    
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-teal-600 transition-colors tracking-tight uppercase leading-none">{card.title}</h3>
                      <p className="text-slate-500 text-sm mb-8 leading-relaxed font-bold">{card.description}</p>
                      
                      {/* Benefits & Ingredients */}
                      <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="space-y-3">
                          <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest">Benefits</p>
                          <ul className="space-y-1">
                            {card.benefits?.map((benefit, i) => (
                              <li key={i} className="text-[11px] font-bold text-slate-700 flex items-center">
                                <div className="w-1 h-1 bg-teal-400 rounded-full mr-2"></div>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest">Ingredients</p>
                          <ul className="space-y-1">
                            {card.ingredients?.map((ing, i) => (
                              <li key={i} className="text-[11px] font-bold text-slate-700 flex items-center">
                                <div className="w-1 h-1 bg-teal-400 rounded-full mr-2"></div>
                                {ing}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* MOQ Info */}
                      <div className="p-4 bg-slate-50 rounded-2xl mb-8 flex items-center justify-between border border-slate-100">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Minimum Order</span>
                        <span className="text-xs font-black text-slate-900">{card.moq}</span>
                      </div>
                      
                      <div className="mt-auto">
                        <div 
                          className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center group-hover:bg-teal-600 transition-all shadow-xl"
                        >
                          Customize This Product
                          <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
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
