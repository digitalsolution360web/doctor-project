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
    title: "Herbal Range", 
    items: "Natural Formulations", 
    icon: Sprout, 
    img: "/7.webp"
  },
  { 
    title: "Men’s Grooming", 
    items: "Beard Oils, Face Wash", 
    icon: Users, 
    img: "/10.webp"
  },
  { 
    title: "Color Cosmetics", 
    items: "Lipsticks, Foundations", 
    icon: Palette, 
    img: "/8.webp"
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
    <section id="categories" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 px-4">
          <div className="max-w-2xl">
            <h3 className="text-4xl md:text-[56px] font-black text-slate-900 tracking-tight leading-tight mb-4">
              Premium Product <br />
              <span className="text-teal-600">Categories</span>
            </h3>
            <p className="text-slate-500 text-lg font-medium">Explore our specialized range of cosmetic formulations.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                canScrollLeft 
                ? "bg-white border-slate-200 text-slate-900 hover:bg-teal-600 hover:text-white shadow-lg" 
                : "bg-slate-50 text-slate-300 cursor-not-allowed"
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                canScrollRight 
                ? "bg-white border-slate-200 text-slate-900 hover:bg-teal-600 hover:text-white shadow-lg" 
                : "bg-slate-50 text-slate-300 cursor-not-allowed"
              }`}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Professional Category Slider */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 pb-16 no-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((cat, i) => (
            <div 
              key={i} 
              className="group relative min-w-[300px] md:min-w-[380px] shrink-0 snap-start"
            >
              {/* Category Image */}
              <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden shadow-xl z-0">
                <Image 
                  src={cat.img} 
                  alt={cat.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>

              {/* Overlapping Icon */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[140px] w-16 h-16 rounded-2xl bg-white shadow-2xl flex items-center justify-center z-20 group-hover:-translate-y-2 transition-transform duration-500">
                <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center text-white group-hover:bg-teal-600 transition-colors">
                  <cat.icon className="w-6 h-6" />
                </div>
              </div>

              {/* Category Details */}
              <div className="mt-[-60px] relative z-10 bg-white rounded-[40px] p-8 pt-16 text-center border border-slate-50 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.1)] transition-all mx-4">
                <h4 className="text-2xl font-black text-slate-900 mb-2">{cat.title}</h4>
                <p className="text-slate-500 text-sm font-bold mb-8">{cat.items}</p>
                <Link 
                  href={`/category/${cat.title.toLowerCase()}`}
                  className="inline-flex items-center text-xs font-black text-teal-600 tracking-widest group/link"
                >
                  Read More 
                  <span className="mx-3 w-10 h-[2px] bg-teal-600 group-hover/link:w-14 transition-all"></span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
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
