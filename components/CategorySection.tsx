"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Droplets,
  Sparkles,
  Wind,
  Palette,
  Sprout,
  Users
} from "lucide-react";

interface Category {
  title: string;
  items: string;
  icon: any;
  img: string;
}

const categories: Category[] = [
  {
    title: "Skin Care",
    items: "Face Serums, Moisturizers, Cleansers",
    icon: Droplets,
    img: "/skin_new.png"
  },
  {
    title: "Hair Care",
    items: "Shampoos, Conditioners, Hair Oils",
    icon: Sparkles,
    img: "/haircare_new.png"
  },
  {
    title: "Body Care",
    items: "Body Lotions, Body Wash, Scrubs",
    icon: Sparkles,
    img: "/bodycare.webp"
  },
  {
    title: "Face Makeup",
    items: "Foundations, Primers, Setting Sprays",
    icon: Wind,
    img: "/facemakup.webp"
  },
  {
    title: "Lip Care",
    items: "Lip Balms, Lip Scrubs, Lip Masks",
    icon: Palette,
    img: "/lipp.webp"
  },
  {
    title: "Mother & Baby Care",
    items: "Baby Oils, Stretch Mark Creams, Gentle Washes",
    icon: Sprout,
    img: "/babycare.webp"
  },
  {
    title: "Ayurvedic",
    items: "Herbal Oils, Ubtans, Natural Pastes",
    icon: Sprout,
    img: "/ayurvedic_new.png"
  },
  {
    title: "Derma Care",
    items: "Clinical Serums, Sunscreen SPF 50, Acne Treatments",
    icon: Droplets,
    img: "/skin_new.png"
  }
];

const CategorySection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Automatic sliding effect
  useEffect(() => {
    const timer = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: clientWidth / 3, behavior: "smooth" });
        }
      }
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const current = scrollRef.current;
    if (current) {
      current.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
      checkScroll();
    }
    return () => {
      if (current) {
        current.removeEventListener("scroll", checkScroll);
      }
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth > 768 ? clientWidth / 3 : clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="categories" className="py-8 lg:py-16 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-[10px] md:text-xs font-bold text-teal-600 tracking-[0.3em] uppercase mb-3 md:mb-4">Product Categories</h2>
          <h3 className="text-2xl md:text-[52px] font-bold text-slate-900 tracking-tight leading-tight">
            Premium Product <br className="hidden md:block" />
            <span className="text-slate-400 font-semibold">Categories</span>
          </h3>
        </div>

        {/* Premium Category Slider */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-12 no-scrollbar snap-x snap-mandatory px-4 md:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((cat, i) => (
            <div
              key={i}
              className="flex-none w-[280px] md:w-[320px] snap-start group relative bg-white rounded-[24px] shadow-[0_15px_40px_-20px_rgba(0,0,0,0.05)] overflow-hidden border border-slate-100 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(20,184,166,0.15)] hover:border-teal-100 cursor-pointer flex flex-col h-full"
            >
              {/* Image Container (Top) */}
              <div className="relative h-[240px] md:h-[280px] overflow-hidden">
                <Image
                  src={cat.img}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-700"></div>

                {/* Category Icon Overlay */}
                <div className="absolute top-6 left-6">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                    <cat.icon className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Category Details */}
              <div className="p-5 flex flex-col flex-grow">
                <h4 className="text-xl font-bold text-slate-900 mb-2 tracking-tight group-hover:text-teal-600 transition-colors uppercase leading-none">
                  {cat.title}
                </h4>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.15em] mb-6 opacity-80 leading-snug min-h-[2.5rem]">
                  {cat.items}
                </p>

                <Link
                  href={`/category/${cat.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="mt-auto w-full py-4 bg-slate-950 text-white rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center group-hover:bg-teal-600 transition-all shadow-lg"
                >
                  Explore Range
                  <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation and View All */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-slate-900 flex items-center justify-center transition-all hover:bg-slate-950 hover:text-white shadow-lg active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-slate-900 flex items-center justify-center transition-all hover:bg-slate-950 hover:text-white shadow-lg active:scale-95"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <Link
            href="/categories"
            className="group px-10 py-4 bg-white border border-slate-200 text-slate-900 rounded-full font-black text-sm tracking-widest hover:bg-slate-950 hover:text-white transition-all shadow-xl flex items-center gap-3"
          >
            View All Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <style jsx global>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
    </section>
  );
};

export default CategorySection;
