"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Droplets,
  FlaskConical,
  Package,
  Info,
  Phone,
  ShieldCheck,
  Zap,
  Globe
} from "lucide-react";
import QuotePopup from "@/components/QuotePopup";

export default function ProductDetails() {
  const [isQuotePopupOpen, setIsQuotePopupOpen] = useState(false);

  const product = {
    title: "Aloe-Based Hair Cream Third-Party Manufacturer",
    mainImage: "/cate6.webp", // Using existing image for placeholder
    specs: [
      { label: "MOQ", value: "3000 Units" },
      { label: "Packaging Size", value: "As per brand recommendation" },
      { label: "Packaging Type", value: "Jar or Tube" },
      { label: "Customized Formulations", value: "Available" },
      { label: "Private Labeling", value: "Available" },
      { label: "Turnkey Solutions", value: "Available" },
      { label: "Benefits", value: "Hydrates deeply, tames frizz, improves hair texture" },
    ],
    detailedDescription: "Experience the gentle yet effective power of Aloe Vera with Midflora Herbal's Aloe-Based Hair Cream. Designed to offer daily hydration and softness, this cream nourishes both scalp and strands while smoothing away dryness and dullness. Ideal for brands focused on natural haircare solutions, it's infused with Aloe Vera Extract, Coconut Oil, Shea Butter, and Pro-Vitamin B5—all working in harmony to leave the hair glossy, frizz-free, and more manageable.",
    extraInfo: "Its lightweight yet rich texture makes it suitable for leave-in conditioning, styling prep, or overnight hydration, especially for customers looking for chemical-free daily hair nourishment. The formula can be fully tailored to your vision—whether you want to add biotin, keratin, coconut milk, or build a curly-hair or Ayurvedic variant.",
    callToAction: "Want to launch a nourishing, aloe-powered hair cream under your brand? Partner with Midflora Herbal and let's co-create a high-performance formula that your customers will love—naturally.",
    ingredients: [
      { name: "Aloe Vera Extract", img: "/cate2.webp" },
      { name: "Coconut Oil", img: "/cate10.webp" },
      { name: "Shea Butter", img: "/cate12.webp" },
    ],
    relatedProducts: [
      { title: "Hair Tonic Manufacturer", category: "Hair Care", img: "/cate1.webp" },
      { title: "Anti-Greying Oil Manufacturer", category: "Personal Care", img: "/cate8.webp" },
      { title: "Hair Growth Oil Manufacturer", category: "Natural Oils", img: "/cate.webp" }
    ]
  };

  return (
    <div className="bg-white min-h-screen pt-32 pb-0">
      {/* Product Hero Section */}
      <section className="container mx-auto px-4 md:px-6 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 relative group">
             <div className="aspect-[4/5] bg-white rounded-3xl border border-teal-800/30 flex items-center justify-center p-2 overflow-hidden relative shadow-sm">
                <img
                  src={product.mainImage}
                  alt={product.title}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                />
                <button className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-400 hover:text-teal-600 transition-colors">
                  <Package className="w-5 h-5" />
                </button>
             </div>
          </div>

          {/* Right: Product Basic Details */}
          <div className="lg:col-span-7 flex flex-col">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-8 tracking-tight">
              {product.title}
            </h1>

            <button
              onClick={() => setIsQuotePopupOpen(true)}
              className="w-fit px-10 py-4 bg-teal-800 text-white rounded-xl font-bold text-base tracking-wide hover:bg-slate-900 transition-all mb-10 shadow-lg shadow-teal-900/10"
            >
              Get a Quote
            </button>

            {/* Specifications Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {product.specs.map((spec, i) => (
                    <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 text-sm font-black text-slate-900 w-1/3 uppercase tracking-wider">{spec.label}</td>
                      <td className="py-4 px-6 text-sm font-medium text-slate-600">: {spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Text Section */}
      <section className="bg-slate-50/50 py-12 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-8 bg-teal-600 rounded-full"></div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Product Details</h2>
            </div>
            
            <div className="space-y-8 text-lg leading-relaxed text-slate-700 font-medium">
              <p>{product.detailedDescription}</p>
              <p>{product.extraInfo}</p>
              <p className="italic text-teal-800 font-bold">{product.callToAction}</p>
            </div>

            {/* Turnkey Solution Section */}
            <div className="mt-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-8 bg-[#A3E635] rounded-full"></div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Turnkey Solution — Hassle-Free Product Launch</h2>
              </div>
              <p className="text-lg leading-relaxed text-slate-700 font-medium">
                From raw material sourcing to high-volume production, <span className="font-bold text-slate-950">Midflora Herbal</span> offers a fully integrated <span className="font-bold text-slate-950">turnkey solution</span> for your haircare brand. Whether you're targeting <span className="font-bold text-slate-950">salon-grade treatments</span> or <span className="font-bold text-slate-950">everyday essentials</span>, our R&D team will develop a formula that fits your promise—and we'll handle <span className="font-bold text-slate-950">formulation, testing, packaging, and compliance</span> under certified facilities.
              </p>
              <p className="mt-6 text-lg font-bold text-slate-900">Let's create a standout formulation that strengthens your brand's presence in the natural hair care market.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients Showcase */}
      <section className="py-12 bg-teal-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h3 className="text-xs font-black tracking-[0.4em] uppercase text-teal-400 mb-10">Key Ingredients Kit</h3>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {product.ingredients.map((ing, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl border-2 border-teal-500/30 p-1.5 mb-6 group-hover:border-teal-400 transition-all duration-500 relative bg-white/5">
                   <div className="w-full h-full rounded-[0.85rem] overflow-hidden relative shadow-2xl bg-white flex items-center justify-center">
                      <img 
                        src={ing.img} 
                        alt={ing.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                   </div>
                   <div className="absolute -bottom-3 -right-3 bg-teal-500 w-12 h-12 rounded-xl flex items-center justify-center border-4 border-teal-900 shadow-lg transform group-hover:-translate-y-1 transition-transform duration-500">
                      <Droplets className="w-5 h-5 text-white" />
                   </div>
                </div>
                <span className="text-sm font-black tracking-widest uppercase">{ing.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12 bg-slate-50/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h3 className="text-teal-600 font-black text-[10px] tracking-[0.4em] uppercase mb-4">Recommended For You</h3>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Related <span className="text-slate-400">Products</span></h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {product.relatedProducts.map((p, i) => (
              <div key={i} className="group cursor-pointer flex flex-col">
                <div className="aspect-[4/5] bg-white rounded-lg border border-teal-800/30 flex items-center justify-center p-0 mb-6 transition-all duration-700 group-hover:border-teal-500 group-hover:shadow-[0_20px_50px_-15px_rgba(20,184,166,0.15)] overflow-hidden relative">
                  {/* Subtle inner glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>
                  
                  <img 
                    src={p.img} 
                    alt={p.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                </div>
                <div className="text-center px-4">
                  <h4 className="text-[13px] font-black text-slate-900 uppercase tracking-widest leading-tight group-hover:text-teal-600 transition-colors duration-300 mb-1">{p.title}</h4>
                  <div className="w-10 h-0.5 bg-teal-500/20 mx-auto group-hover:w-20 group-hover:bg-teal-500 transition-all duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Contact Form Section */}
      <section className="relative py-12 overflow-hidden bg-teal-50">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05]"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 md:p-10 border border-teal-100 shadow-[0_15px_60px_-15px_rgba(20,184,166,0.3)] relative overflow-hidden">
            {/* Subtle decorations */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-teal-100/50 rounded-full blur-[80px]"></div>
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-green-100/50 rounded-full blur-[80px]"></div>

            <div className="text-center mb-8 relative z-10">
              <h3 className="text-teal-600 font-bold text-xs tracking-widest uppercase mb-2">Partner With Us</h3>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight mb-4">Contact Us For <br className="hidden md:block" /><span className="text-teal-600">Third Party Manufacturing</span></h2>
              <p className="text-slate-500 text-sm max-w-xl mx-auto">Have questions? Our expert team is ready to assist you. Kindly share your details, and our experts will get in touch to understand your requirements.</p>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
              <input type="text" placeholder="First Name*" className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none font-medium" required />
              <input type="text" placeholder="Last Name*" className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none font-medium" required />
              <input type="email" placeholder="Email*" className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none font-medium" required />
              <input type="tel" placeholder="Phone*" className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none font-medium" required />
              <input type="text" placeholder="Company" className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none font-medium col-span-1 md:col-span-2" />
              
              <div className="grid grid-cols-2 gap-4 col-span-1 md:col-span-2">
                <div className="relative">
                  <select className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none appearance-none cursor-pointer">
                    <option value="" disabled selected className="text-slate-600">Select Product</option>
                    <option value="Hair Cream">Hair Cream</option>
                    <option value="Face Wash">Face Wash</option>
                    <option value="Serum">Serum</option>
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-600">
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </div>
                </div>
                <div className="relative">
                  <select className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none appearance-none cursor-pointer">
                    <option value="" disabled selected className="text-slate-600">Select Category</option>
                    <option value="Skincare">Skincare</option>
                    <option value="Haircare">Haircare</option>
                    <option value="Wellness">Wellness</option>
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-600">
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </div>
                </div>
              </div>

              <textarea placeholder="Enquiry" rows={3} className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-600 font-medium focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none col-span-1 md:col-span-2 resize-none"></textarea>
              
              <div className="col-span-1 md:col-span-2 text-center mt-2">
                <button type="submit" className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm tracking-wider rounded-lg transition-all shadow-lg hover:shadow-teal-500/25 active:scale-95 w-full md:w-auto">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <QuotePopup
        isOpen={isQuotePopupOpen}
        onClose={() => setIsQuotePopupOpen(false)}
        productName={product.title}
      />
    </div>
  );
}
