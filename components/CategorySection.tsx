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
    title: "Skincare", 
    items: "Serums, Creams, Face Wash", 
    icon: Droplets, 
    img: "/2.webp"
  },
  { 
    title: "Haircare", 
    items: "Oils, Shampoo, Masks", 
    icon: Sparkles, 
    img: "/3.webp"
  },
  { 
    title: "Bath & Body", 
    items: "Soaps, Shower Gel", 
    icon: Wind, 
    img: "/6.webp"
  },
  { 
    title: "Herbal Products", 
    items: "Natural Formulations", 
    icon: Sprout, 
    img: "/7.webp"
  },
  { 
    title: "Men’s Grooming", 
    items: "Beard Oils, Face Wash", 
    icon: Users, 
    img: "/10.webp"
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
    <section id="categories" className="py-16 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold text-teal-600 tracking-[0.3em] uppercase mb-4">Our Expertise</h2>
            <h3 className="text-4xl md:text-[52px] font-bold text-slate-900 tracking-tight leading-tight">
              Premium Product <br className="hidden md:block" />
              <span className="text-slate-400 font-semibold">Categories</span>
            </h3>
          </div>

          {/* Professional Category Slider */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-8 pb-10 no-scrollbar snap-x snap-mandatory px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((cat, i) => (
              <div 
                key={i} 
                className="group relative min-w-[300px] md:min-w-[380px] shrink-0 snap-start bg-white rounded-[48px] shadow-[0_15px_60px_-20px_rgba(0,0,0,0.05)] overflow-hidden border border-slate-100 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(20,184,166,0.15)] hover:border-teal-100 mb-10 cursor-pointer"
              >
                {/* Image Container (Top) */}
                <div className="relative h-[280px] overflow-hidden">
                  <Image 
                    src={cat.img} 
                    alt={cat.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-700"></div>
                  
                  {/* Category Title Overlay */}
                  <div className="absolute top-8 left-8">
                     <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                        <cat.icon className="w-6 h-6" />
                     </div>
                  </div>
                </div>

                {/* Category Details */}
                <div className="px-10 pt-10 pb-12">
                  <h4 className="text-2xl font-semibold text-slate-900 mb-2 tracking-tight group-hover:text-teal-600 transition-colors uppercase leading-none">
                    {cat.title}
                  </h4>
                  <p className="text-slate-500 text-[11px] font-medium uppercase tracking-[0.2em] mb-8 opacity-60">
                    {cat.items}
                  </p>
                  
                  <Link 
                    href={`/category/${cat.title.toLowerCase()}`}
                    className="w-full py-5 bg-slate-950 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center group-hover:bg-teal-600 transition-all shadow-xl shadow-slate-900/10"
                  >
                    View Range 
                    <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows at Bottom Center */}
          <div className="flex flex-col items-center justify-center gap-8 mt-12">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => scroll("left")}
                className="w-14 h-14 rounded-2xl bg-white border border-slate-200 text-slate-900 flex items-center justify-center transition-all hover:bg-slate-950 hover:text-white shadow-lg active:scale-95"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={() => scroll("right")}
                className="w-14 h-14 rounded-2xl bg-white border border-slate-200 text-slate-900 flex items-center justify-center transition-all hover:bg-slate-950 hover:text-white shadow-lg active:scale-95"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>

            <Link 
              href="/categories"
              className="px-10 py-4 bg-teal-600 text-white rounded-full font-black text-sm tracking-widest hover:bg-slate-950 transition-all shadow-xl shadow-teal-600/20 uppercase"
            >
              View All Products
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
