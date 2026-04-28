"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  BookOpen, 
  ChevronRight, 
  Calendar, 
  User, 
  ArrowRight,
  Search,
  Tag
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

export default function BlogPage() {
  const posts = [
    {
      title: "How to Start a Cosmetic Brand in India",
      excerpt: "A step-by-step roadmap for entrepreneurs looking to launch a successful skincare or haircare brand. Learn about legal requirements, formulations, and choosing the right manufacturing partner.",
      image: "/8.webp",
      date: "April 20, 2026",
      category: "Business Guide"
    },
    {
      title: "Top Trending Skincare Ingredients for 2026",
      excerpt: "Discover the high-demand ingredients driving consumer interest this year. From Niacinamide and Kojic Acid to Botanical Extracts, learn what formulations are winning the market.",
      image: "/3.webp",
      date: "April 15, 2026",
      category: "Ingredients"
    },
    {
      title: "Private Label vs Custom Manufacturing",
      excerpt: "Not sure which path to choose? We break down the pros and cons of Private Labeling for speed-to-market versus Custom Formulations for unique brand exclusivity.",
      image: "/9.webp",
      date: "April 10, 2026",
      category: "Manufacturing"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/banner.webp" 
            alt="Blog & Resources" 
            fill 
            sizes="100vw"
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/60 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <RevealOnScroll className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase leading-none">
              Insights & <span className="text-teal-400">Trends.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-bold leading-relaxed">
              Expert advice on manufacturing, brand growth, and the future of cosmetic science.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Featured Posts Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.map((post, i) => (
              <RevealOnScroll key={i} className="group cursor-pointer">
                <div className="relative aspect-[16/10] rounded-[40px] overflow-hidden mb-8 shadow-2xl border border-slate-100">
                  <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute top-6 left-6 px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full">
                     <span className="text-white font-black text-[10px] uppercase tracking-widest">{post.category}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
                    <span className="flex items-center"><Calendar className="w-3 h-3 mr-2" /> {post.date}</span>
                    <span className="flex items-center"><User className="w-3 h-3 mr-2" /> Expert R&D Team</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 tracking-tight leading-tight group-hover:text-teal-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 font-bold leading-relaxed">{post.excerpt}</p>
                  
                  <div className="pt-4">
                    <button className="flex items-center space-x-3 text-slate-950 font-black text-xs uppercase tracking-[0.2em] group/btn">
                      <span>Read Full Article</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-teal-600 rounded-[60px] p-12 md:p-24 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]"></div>
            <RevealOnScroll className="max-w-2xl mx-auto space-y-10 relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase leading-none">
                Subscribe to <br /> <span className="text-teal-100">Industry News.</span>
              </h2>
              <p className="text-teal-50 text-xl font-bold opacity-90">
                Get the latest cosmetic trends and manufacturing insights delivered to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-4">
                <input type="email" placeholder="Enter your email" className="flex-1 px-8 py-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder:text-white/60 focus:outline-none focus:bg-white focus:text-slate-900 transition-all font-bold" />
                <button className="px-10 py-5 bg-white text-teal-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-2xl">
                  Join Newsletter
                </button>
              </form>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}
