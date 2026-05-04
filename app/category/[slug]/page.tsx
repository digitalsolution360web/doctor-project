"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Grid2X2, ArrowRight } from "lucide-react";

export default function CategoryFilterPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;

  const categoryTitle = slug
    ? slug.split("-").map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
    : "Skin Care";

  // Mock data for categories in sidebar
  const sidebarCategories = [
    { name: "All Products", count: 14, active: slug === "all-products" || !slug },
    { name: "Skin Care", count: 3, active: slug === "skin-care" },
    { name: "Body Care", count: 3, active: slug === "body-care" },
    { name: "Face Makeup", count: 1, active: slug === "face-makeup" },
    { name: "Lip Care", count: 5, active: slug === "lip-care" },
    { name: "Mother & Baby Care", count: 2, active: slug === "mother-baby-care" },
    { name: "Derma Care", count: 2, active: slug === "derma-care" },
  ];

  // Mock data for products styled for B2B cosmetics
  const products = [
    {
      id: 1,
      title: "Aloe-Based Hair Cream Formulation",
      image: "/cate6.webp",
      moq: "3000 Units",
      category: "Hair Care",
      features: "Sulfate-Free • Paraben-Free"
    },
    {
      id: 2,
      title: "Skin Hydrating Serum Manufacturer",
      image: "/9.webp",
      moq: "5000 Units",
      category: "Skin Care",
      features: "Hyaluronic Acid • Vitamin C"
    },
    {
      id: 3,
      title: "Charcoal Face Wash Turnkey Solution",
      image: "/cate10.webp",
      moq: "2500 Units",
      category: "Face Care",
      features: "Deep Cleansing • Anti-Acne"
    },
    {
      id: 4,
      title: "Organic Lip Balm Private Label",
      image: "/lip.webp",
      moq: "10000 Units",
      category: "Lip Care",
      features: "Beeswax • Essential Oils"
    },
    {
      id: 5,
      title: "Vitamin C Brightening Face Wash",
      image: "/cate3.webp",
      moq: "5000 Units",
      category: "Face Care",
      features: "Radiance • Gentle Formulation"
    },
    {
      id: 6,
      title: "Herbal Anti-Hairfall Oil",
      image: "/cate4.webp",
      moq: "3000 Units",
      category: "Ayurvedic",
      features: "Cold-Pressed • Traditional Recipe"
    }
  ];

  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* Category Banner */}
      <div className="relative pt-32 pb-20 bg-slate-50 border-b border-slate-100 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-teal-50/50 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-4">
              Premium Formulations
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {categoryTitle}
            </h1>
            <p className="text-slate-500 text-base md:text-lg font-medium max-w-xl leading-relaxed">
              Explore our extensive range of high-performance {categoryTitle.toLowerCase()} formulations available for third-party manufacturing and private labeling.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar */}
          <div className="w-full lg:w-[280px] flex-shrink-0">
            <div className="sticky top-28 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-xs font-black text-slate-900 flex items-center gap-2 uppercase tracking-widest">
                  <Grid2X2 className="w-4 h-4 text-teal-600" /> Categories
                </h3>
              </div>
              
              <ul className="p-3 space-y-1">
                {sidebarCategories.map((cat, idx) => (
                  <li key={idx}>
                    <Link 
                      href={`/category/${cat.name.toLowerCase().replace(/ /g, "-").replace(/&/g, "and")}`}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 ${
                        cat.active 
                          ? 'bg-teal-50 text-teal-700 font-bold' 
                          : 'text-slate-600 hover:bg-slate-50 hover:text-teal-600 font-medium'
                      }`}
                    >
                      <span className="text-[14px]">{cat.name}</span>
                      {cat.count > 0 && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          cat.active ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-400'
                        }`}>
                          {cat.count}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Product Grid Area */}
          <div className="flex-1">
            
            {/* Toolbar/Filters Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
              <p className="text-sm font-bold text-slate-500">
                Showing <span className="text-slate-900">all</span> results
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {products.map((product) => (
                <Link 
                  href={`/product/${product.title.toLowerCase().replace(/ /g, "-")}`} 
                  key={product.id} 
                  className="group flex flex-col h-full bg-white rounded-2xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:border-teal-100 transition-all duration-500 overflow-hidden"
                >
                  
                  {/* Image Section */}
                  <div className="relative aspect-[4/5] bg-slate-50 overflow-hidden">
                    <Image 
                      src={product.image} 
                      alt={product.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-[1500ms] ease-out"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                    
                    {/* Category Tag */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-col flex-1 p-5 lg:p-6">
                    <h4 className="text-[16px] font-bold text-slate-900 leading-snug mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                      {product.title}
                    </h4>
                    
                    <div className="space-y-2 mt-auto mb-6">
                      <div className="flex items-center gap-2 text-[13px] text-slate-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                        <span className="font-semibold text-slate-700">MOQ:</span> {product.moq}
                      </div>
                      <div className="flex items-center gap-2 text-[13px] text-slate-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                        {product.features}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 group-hover:border-teal-100 transition-colors">
                      <span className="text-[13px] font-bold text-teal-600">View Details</span>
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white text-slate-400 transition-all duration-300">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                </Link>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
