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
      className={`transition-all duration-700 ease-out ${className} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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

const categoriesData = [
  { title: "Skin Care", image: "/skin_new.png" },
  { title: "Hair Care", image: "/haircare_new.png" },
  { title: "Advance / Clinical Skin Care", image: "/skin.webp" },
  { title: "Sun Care", image: "/cate4.webp" },
  { title: "Intimate Care Hygiene", image: "/cate5.webp" },
  { title: "Men’s Care", image: "/cate6.webp" },
  { title: "Body Care", image: "/bodycare.webp" },
  { title: "Dental Care", image: "/Dental-Care.webp" },
  { title: "Handmade Soaps (Melt & Pour)", image: "/Handmade-Soaps.webp" },
  { title: "Bath Amenities", image: "/Bath-Amenities.webp" },
  { title: "Baby & Mother Care", image: "/babycare.webp" },
  { title: "Oral & Dental Care", image: "/Oral-Dental-Care.webp" },
  { title: "Derma Care", image: "/Derma-Care.webp" },
  { title: "Depilatory Range", image: "/depilation.webp" }
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16 font-sans selection:bg-teal-500/30">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 px-4">
        <RevealOnScroll>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-6">
            Product Categories
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter">
            Our Specialist <span className="text-teal-600">Range</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            High-performance formulations across all major cosmetic and wellness segments.
          </p>
        </RevealOnScroll>
      </div>

      {/* Categories Grid */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categoriesData.map((category, idx) => (
            <RevealOnScroll key={idx} delay={idx * 100}>
              <Link
                href={`/category/${category.title.toLowerCase().replace(/ /g, "-")}`}
                className="flex flex-col h-full bg-white rounded-[32px] border border-slate-200 shadow-[0_15px_40px_rgba(0,0,0,0.08)] overflow-hidden hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)] transition-all duration-500 group"
              >
                {/* Header Bar */}
                <div className="bg-white py-5 px-4 text-center border-b border-slate-100">
                  <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-widest group-hover:text-teal-600 transition-colors">
                    {category.title}
                  </h3>
                </div>

                {/* Image Body */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Card remains clickable via Link wrapper */}
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
}


