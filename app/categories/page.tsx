"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles,
  Droplets,
  Leaf,
  Wind,
  ShieldCheck,
  PackageCheck,
  FlaskConical,
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

export default function CategoriesPage() {
  const products = [
    {
      id: "skincare-serum",
      category: "Skincare",
      title: "Advanced Niacinamide & Zinc Serum",
      image: "/9.webp",
      benefits: ["Controls sebum production", "Reduces blemishes and redness", "Improves skin barrier function"],
      ingredients: "10% Niacinamide, 1% Zinc PCA, Hyaluronic Acid",
      moq: "5,000 Units",
      icon: Droplets
    },
    {
      id: "haircare-oil",
      category: "Haircare",
      title: "Ayurvedic Hair Regrowth Oil",
      image: "/3.webp",
      benefits: ["Stimulates hair follicles", "Reduces hair fall", "Deeply nourishes scalp"],
      ingredients: "Bhringraj, Amla, Brahmi, Cold-pressed Coconut Oil",
      moq: "10,000 Units",
      icon: Sparkles
    },
    {
      id: "body-lotion",
      category: "Bath & Body",
      title: "Deep Moisture Shea Body Lotion",
      image: "/6.webp",
      benefits: ["24-hour intense hydration", "Non-greasy quick absorption", "Restores dry and flaky skin"],
      ingredients: "Raw Shea Butter, Vitamin E, Almond Oil",
      moq: "5,000 Units",
      icon: Wind
    },
    {
      id: "herbal-face-wash",
      category: "Herbal Products",
      title: "Neem & Tulsi Purifying Face Wash",
      image: "/7.webp",
      benefits: ["Deep cleanses pores", "Prevents acne and pimples", "Maintains skin pH balance"],
      ingredients: "Neem Extract, Tulsi, Aloe Vera",
      moq: "10,000 Units",
      icon: Leaf
    },
    {
      id: "mens-beard",
      category: "Men's Grooming",
      title: "Premium Beard Growth Oil",
      image: "/10.webp",
      benefits: ["Promotes thicker beard growth", "Softens coarse hair", "Prevents beard itch"],
      ingredients: "Argan Oil, Jojoba Oil, Cedarwood Essential Oil",
      moq: "5,000 Units",
      icon: PackageCheck
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/banner.webp" 
            alt="Product Categories" 
            fill 
            className="object-cover opacity-30 object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <RevealOnScroll className="max-w-3xl space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 font-black text-xs uppercase tracking-widest mb-4">
              Premium Product Formulations
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
              Explore Our <br /><span className="text-teal-400">Categories</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl font-bold leading-relaxed">
              Discover our extensive range of high-quality, dermatologically tested cosmetic and herbal formulations ready for your brand.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Product List Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-16">
            {products.map((product, index) => {
              const isEven = index % 2 === 0;
              return (
              <RevealOnScroll key={product.id} direction={isEven ? "left" : "right"}>
                <div className={`bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(20,184,166,0.1)] hover:-translate-y-2 transition-all duration-500 group flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  
                  {/* Image & Category Banner */}
                  <div className="lg:w-2/5 relative aspect-square lg:aspect-auto min-h-[300px] lg:min-h-[500px]">
                    <Image 
                      src={product.image} 
                      alt={product.title} 
                      fill 
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                    <div className={`absolute top-6 ${isEven ? 'left-6' : 'right-6'} px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center space-x-2`}>
                      <product.icon className="w-4 h-4 text-white" />
                      <span className="text-white font-black text-[10px] uppercase tracking-widest">{product.category}</span>
                    </div>
                  </div>

                  {/* Content Details */}
                  <div className="lg:w-3/5 p-8 md:p-14 flex flex-col justify-between space-y-8 relative overflow-hidden">
                    <div className={`absolute top-0 ${isEven ? 'right-0 translate-x-1/3' : 'left-0 -translate-x-1/3'} -translate-y-1/3 w-64 h-64 bg-teal-50 rounded-full blur-3xl opacity-60 pointer-events-none`}></div>
                    
                    <div className="relative z-10">
                      <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter mb-8 leading-tight group-hover:text-teal-700 transition-colors">{product.title}</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Benefits */}
                        <div className="space-y-4">
                          <h4 className="text-teal-600 font-black text-xs uppercase tracking-widest flex items-center">
                            <Sparkles className="w-4 h-4 mr-2" /> Key Benefits
                          </h4>
                          <ul className="space-y-4">
                            {product.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-start">
                                <div className="mt-0.5 bg-teal-50 p-1 rounded-full mr-3 shrink-0">
                                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                                </div>
                                <span className="text-slate-700 font-bold text-sm leading-snug">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Ingredients & MOQ */}
                        <div className="space-y-8">
                          <div className="space-y-3">
                            <h4 className="text-teal-600 font-black text-xs uppercase tracking-widest flex items-center">
                              <FlaskConical className="w-4 h-4 mr-2" /> Highlighted Ingredients
                            </h4>
                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 group-hover:border-teal-100 transition-colors">
                              <p className="text-slate-700 font-bold text-sm leading-relaxed">
                                {product.ingredients}
                              </p>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <h4 className="text-teal-600 font-black text-xs uppercase tracking-widest flex items-center">
                              <ShieldCheck className="w-4 h-4 mr-2" /> Minimum Order
                            </h4>
                            <div className="inline-flex items-center bg-teal-500/10 text-teal-700 font-black text-sm px-5 py-3 rounded-xl border border-teal-500/20 uppercase tracking-widest">
                              <PackageCheck className="w-4 h-4 mr-2" /> {product.moq}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-8 mt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                      <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em]">
                        Ready for private label & custom packaging
                      </p>
                      <Link 
                        href={`/quote`} 
                        className="w-full sm:w-auto flex items-center justify-center space-x-3 px-8 py-5 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-[20px] font-black text-xs uppercase tracking-widest shadow-[0_10px_20px_-10px_rgba(20,184,166,0.6)] hover:shadow-[0_15px_30px_-10px_rgba(20,184,166,0.8)] hover:-translate-y-1 transition-all group/btn"
                      >
                        <span>Customize This Product</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                      </Link>
                    </div>

                  </div>
                </div>
              </RevealOnScroll>
            )})}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <RevealOnScroll className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">
              Didn't Find What You're <span className="text-teal-100">Looking For?</span>
            </h2>
            <p className="text-teal-50 text-xl font-bold opacity-90">
              Our R&D team can formulate completely new products based on your specific requirements.
            </p>
            <div className="pt-4">
              <Link href="/#contact" className="px-12 py-6 bg-white text-teal-700 rounded-3xl font-black text-sm uppercase tracking-widest hover:shadow-2xl transition-all inline-block hover:-translate-y-1">
                Request Custom Formulation
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
