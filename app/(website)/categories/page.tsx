"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";


interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  className = "",
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch(`/api/frontend/categories`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const result = await res.json();
        setCategories(result.data || []);
      } catch (error) {
        console.error("Category Error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Loading Categories...
      </div>
    );
  }

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
            High-performance formulations across all major cosmetic and wellness
            segments.
          </p>
        </RevealOnScroll>
      </div>

      {/* Categories */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {categories.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No categories found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {categories.map((category, idx) => (
              <RevealOnScroll key={category.id} delay={idx * 100}>
                <Link
                  href={`/category/${category.slug}`}
                  className="flex flex-col h-full bg-white rounded-[32px] border border-slate-200 shadow-[0_15px_40px_rgba(0,0,0,0.08)] overflow-hidden hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)] transition-all duration-500 group"
                >
                  {/* Title */}
                  <div className="bg-white/80 backdrop-blur-md py-5 px-4 text-center border-b border-slate-100 group-hover:bg-teal-50 transition-colors">
                    <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-widest group-hover:text-teal-600">
                      {category.name}
                    </h3>
                  </div>

                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      sizes="(max-width:768px) 100vw, 400px"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}