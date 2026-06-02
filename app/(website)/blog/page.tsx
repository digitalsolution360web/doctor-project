"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  User,
  ArrowRight
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
      slug: "Product-details-1",
      title: "How to Start a Cosmetic Brand in India",
      excerpt: "A step-by-step roadmap for entrepreneurs looking to launch a successful skincare or haircare brand. Learn about legal requirements, formulations, and choosing the right manufacturing partner.",
      image: "/contract.webp",
      date: "April 20, 2026",
      category: "Business Guide"
    },
    {
      slug: "Product-details-2",
      title: "Top Trending Skincare Ingredients for 2026",
      excerpt: "Discover the high-demand ingredients driving consumer interest this year. From Niacinamide and Kojic Acid to Botanical Extracts, learn what formulations are winning the market.",
      image: "/manufac.webp",
      date: "April 15, 2026",
      category: "Ingredients"
    },
    {
      slug: "Product-details-3",
      title: "Private Label vs Custom Manufacturing",
      excerpt: "Not sure which path to choose? We break down the pros and cons of Private Labeling for speed-to-market versus Custom Formulations for unique brand exclusivity.",
      image: "/custom.webp",
      date: "April 10, 2026",
      category: "Manufacturing"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/blog.webp"
            alt="Blog & Resources"
            fill
            sizes="100vw"
            className="object-cover opacity-40 shadow-inner"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <RevealOnScroll className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
              Blog & <span className="text-teal-400">Resources.</span>
            </h1>
            <div className="w-24 h-1.5 bg-teal-500 mx-auto rounded-full"></div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Blog Intro Content Section - NEW */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <RevealOnScroll className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-[1.1]">
                  Insights, Trends & <br />
                  <span className="text-teal-600">Cosmetic Innovation.</span>
                </h2>
                <div className="w-20 h-1 bg-teal-600"></div>
              </div>
              <p className="text-lg md:text-xl text-slate-600 font-bold leading-relaxed max-w-xl">
                Stay updated with the latest cosmetic trends, hero ingredients, formulation innovations, and industry insights through our expert blogs.
              </p>
              
              <div className="pt-4">
                <Link href="/#contact" className="px-8 py-4 bg-slate-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-teal-600 transition-all shadow-xl inline-block">
                  Consult With Our R&D Team
                </Link>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right" className="bg-slate-50 p-10 md:p-14 rounded-[48px] border border-slate-100 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-teal-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
               
               <h3 className="text-xl font-black uppercase tracking-[0.2em] text-slate-900 mb-8 border-b border-slate-200 pb-4 flex items-center">
                  <span className="w-8 h-[2px] bg-teal-600 mr-4"></span>
                  What We Cover
               </h3>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                  {[
                    "Trending cosmetic ingredients",
                    "Product formulation guides",
                    "Market trends",
                    "Skincare science",
                    "Packaging innovations",
                    "Manufacturing insights",
                    "Private label business tips"
                  ].map((topic, i) => (
                    <div key={i} className="flex items-center space-x-4 group/item">
                      <div className="w-2 h-2 bg-teal-500 rounded-full group-hover/item:scale-150 transition-transform shadow-[0_0_10px_rgba(20,184,166,0.5)]"></div>
                      <span className="text-slate-700 font-bold text-sm tracking-tight">{topic}</span>
                    </div>
                  ))}
               </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Featured Posts Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {posts.map((post, i) => (
              <RevealOnScroll key={i} className="group cursor-pointer h-full flex flex-col">
                <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                  <div className="relative aspect-[16/10] rounded-[32px] md:rounded-[40px] overflow-hidden mb-6 md:mb-8 shadow-2xl border border-slate-100 shrink-0">
                    <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute top-4 left-4 md:top-6 md:left-6 px-3 py-1.5 md:px-4 md:py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full">
                      <span className="text-white font-black text-[8px] md:text-[10px] uppercase tracking-widest">{post.category}</span>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 space-y-3 md:space-y-4">
                    <div className="flex items-center space-x-4 text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                      <span className="flex items-center"><Calendar className="w-3 h-3 mr-1 md:mr-2" /> {post.date}</span>
                      <span className="flex items-center"><User className="w-3 h-3 mr-1 md:mr-2" /> Expert R&D Team</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-slate-900 tracking-tight leading-tight group-hover:text-teal-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 font-medium text-sm md:text-base leading-relaxed line-clamp-3">{post.excerpt}</p>

                    <div className="pt-2 md:pt-4 mt-auto">
                      <span className="flex items-center space-x-3 text-slate-950 font-black text-[10px] md:text-xs uppercase tracking-[0.2em] group/btn">
                        <span>Read Full Article</span>
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-2 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-teal-600 rounded-[40px] md:rounded-[60px] p-8 md:p-16 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]"></div>
            <RevealOnScroll className="max-w-2xl mx-auto space-y-8 md:space-y-10 relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tighter uppercase leading-[1.1]">
                Subscribe to <br /> <span className="text-teal-100">Industry News.</span>
              </h2>
              <p className="text-teal-50 text-base md:text-xl font-medium opacity-90">
                Get the latest cosmetic trends and manufacturing insights delivered to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-4">
                <input type="email" placeholder="Enter your email" className="flex-1 px-6 py-4 md:px-8 md:py-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder:text-white/60 focus:outline-none focus:bg-white focus:text-slate-900 transition-all font-bold" />
                <button className="px-8 py-4 md:px-10 md:py-5 bg-white text-teal-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-2xl">
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
