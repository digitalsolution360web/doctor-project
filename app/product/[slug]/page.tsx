"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronRight, 
  Star, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  MessageSquare, 
  ArrowRight,
  Droplets,
  FlaskConical,
  Package,
  Heart,
  Share2,
  Info
} from "lucide-react";

export default function ProductDetails() {
  const [activeTab, setActiveTab] = useState("description");

  const product = {
    title: "Rosemary & Peppermint Stimulating Hair Oil",
    category: "Natural Oils",
    breadcrumbs: ["Home", "Personal Care", "Men's Grooming", "Hair Care Range", "Home Care", "Natural Oils"],
    price: "88.00",
    badge: "Fast Selling Essentials",
    shortDesc: "A refreshing hair oil blend that energizes the scalp and nourishes hair roots.",
    mainImage: "/cate6.webp",
    features: [
      { name: "Private Label", available: true },
      { name: "Custom Formula", available: true }
    ],
    detailedDescription: "This stimulating hair oil combines rosemary and peppermint oils to help invigorate the scalp and support healthier hair. The nourishing oil base helps improve hair softness and shine while offering a refreshing scalp experience. Suitable for regular oiling routines.",
    ingredients: ["Rosemary Oil", "Peppermint Oil", "Carrier Oils", "Vitamin E"],
    benefits: [
      "Energizes and refreshes scalp",
      "Nourishes hair roots",
      "Improves hair softness",
      "Adds natural shine",
      "Stimulates blood circulation"
    ],
    howToUse: "Apply a small amount to scalp and hair, massage gently with fingertips for 5-10 minutes. Leave on for at least 30 minutes or overnight before washing with a mild shampoo.",
    whyChooseUs: [
      "Private Label Manufacturing",
      "Custom Formulation Available",
      "Quality Assured Products",
      "Expert Formulation Team",
      "GMP Compliant Facility"
    ],
    relatedProducts: [
      { title: "Aloe Vera Shampoo", category: "Hair Care", img: "/cate2.webp" },
      { title: "Beard Shampoo", category: "Grooming", img: "/cate8.webp" },
      { title: "Sidemont Complex Shampoo", category: "Hair Care", img: "/cate1.webp" },
      { title: "Biotin & Complex Shampoo", category: "Hair Care", img: "/cate.webp" }
    ]
  };

  return (
    <div className="bg-white min-h-screen pt-28 pb-20">
      {/* Breadcrumbs & Back Button */}
      <div className="container mx-auto px-4 md:px-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <nav className="flex items-center space-x-3 text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
            {product.breadcrumbs.map((crumb, i) => (
              <React.Fragment key={i}>
                <Link href="#" className="hover:text-teal-600 transition-colors">
                  {crumb}
                </Link>
                {i < product.breadcrumbs.length - 1 && <span className="text-slate-300 font-normal">|</span>}
              </React.Fragment>
            ))}
          </nav>
          
          <button 
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 text-slate-900 font-black text-[10px] uppercase tracking-widest group w-fit"
          >
            <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            </div>
            <span>Back to Products</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Product Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square rounded-[40px] overflow-hidden bg-slate-50 border border-slate-100 group">
              <Image 
                src={product.mainImage} 
                alt={product.title} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain p-12 transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
                priority
              />
              <div className="absolute top-6 right-6 space-y-3">
                <button className="w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md shadow-xl flex items-center justify-center text-slate-900 hover:bg-teal-600 hover:text-white transition-all">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md shadow-xl flex items-center justify-center text-slate-900 hover:bg-teal-600 hover:text-white transition-all">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#A3E635]/10 border border-[#A3E635]/20 text-slate-800 font-bold text-[10px] tracking-[0.2em] uppercase mb-6 w-fit">
              <Star className="w-3.5 h-3.5 mr-2 fill-[#A3E635] text-[#A3E635]" />
              {product.badge}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-[1.1] mb-6 tracking-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <p className="text-3xl font-black text-slate-900">₹{product.price}</p>
              <span className="text-slate-400 font-medium text-sm">/ per unit (Starting price)</span>
            </div>

            <p className="text-slate-500 text-lg leading-relaxed font-medium mb-10 max-w-xl">
              {product.shortDesc}
            </p>

            {/* Feature Availability */}
            <div className="grid grid-cols-2 gap-6 mb-12 p-6 rounded-3xl bg-slate-50 border border-slate-100">
              {product.features.map((feature, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">{feature.name}</span>
                  <div className="flex items-center gap-2 text-teal-600 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    Available
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <button className="flex-1 py-5 bg-slate-950 text-white rounded-2xl font-black text-sm tracking-widest hover:bg-teal-600 transition-all shadow-xl shadow-slate-950/10 flex items-center justify-center group">
                Get a Quote
                <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex-1 py-5 bg-white text-slate-950 border-2 border-slate-950 rounded-2xl font-black text-sm tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center">
                Contact For Customization
              </button>
            </div>

            <p className="mt-6 text-slate-400 text-xs text-center font-medium">Contact us for bulk pricing and customization options</p>
          </div>
        </div>

        {/* Content Tabs/Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-8">
            
            {/* Detailed Cards Instead of Tabs for modern feel (Matches Screenshot better) */}
            
            {/* Description */}
            <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.05)]">
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
                  <Info className="w-5 h-5" />
                </div>
                Product Description
              </h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                {product.detailedDescription}
              </p>
            </div>

            {/* Key Ingredients */}
            <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.05)]">
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
                  <FlaskConical className="w-5 h-5" />
                </div>
                Key Ingredients
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.ingredients.map((ing, i) => (
                  <span key={i} className="px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-slate-700 font-bold text-sm">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.05)]">
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
                  <Droplets className="w-5 h-5" />
                </div>
                Benefits
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-600 mt-1 shrink-0" />
                    <span className="text-slate-600 font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* How to Use */}
            <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.05)]">
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
                  <Clock className="w-5 h-5" />
                </div>
                How to Use
              </h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                {product.howToUse}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Why Choose Us */}
            <div className="bg-slate-950 p-10 rounded-[40px] text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <h3 className="text-xl font-black mb-8 relative z-10">Why Choose Us</h3>
              <ul className="space-y-5 relative z-10">
                {product.whyChooseUs.map((item, i) => (
                  <li key={i} className="flex items-center gap-4 group">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-all">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Need Help? */}
            <div className="bg-teal-600 p-10 rounded-[40px] text-white text-center">
              <div className="w-16 h-16 rounded-3xl bg-white/10 flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black mb-4">Need Help?</h3>
              <p className="text-teal-50 font-medium mb-8 text-sm leading-relaxed">
                Our expert team is ready to assist you with your custom manufacturing requirements.
              </p>
              <Link 
                href="/quote"
                className="block w-full py-5 bg-white text-teal-700 rounded-2xl font-black text-sm tracking-widest hover:bg-slate-950 hover:text-white transition-all shadow-xl shadow-teal-700/20"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-xs font-black text-teal-600 tracking-[0.3em] uppercase mb-4">Recommended</h2>
              <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Related <span className="text-slate-400">Products</span></h3>
            </div>
            <Link href="/categories" className="px-8 py-3 bg-slate-50 hover:bg-slate-100 text-slate-900 rounded-xl font-bold text-sm transition-all border border-slate-100">
              View All Products
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {product.relatedProducts.map((p, i) => (
              <Link key={i} href="#" className="group">
                <div className="relative aspect-[3/4] rounded-[32px] overflow-hidden bg-slate-50 border border-slate-100 mb-6 flex items-center justify-center p-8">
                  {/* Subtle background circle like in some premium shops */}
                  <div className="absolute w-[80%] h-[80%] bg-teal-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative h-full w-full">
                    <Image 
                      src={p.img} 
                      alt={p.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 20vw"
                      className="object-contain transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="px-2 text-center md:text-left">
                  <h4 className="text-sm font-black text-slate-900 tracking-tight group-hover:text-teal-600 transition-colors uppercase leading-tight mb-1">{p.title}</h4>
                  <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">{p.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
