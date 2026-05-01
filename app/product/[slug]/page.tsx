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
    mainImage: "/cate6.webp",
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
      <section className="container mx-auto px-4 md:px-8 mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left: Product Image */}
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-center overflow-hidden">
              <img
                src={product.mainImage}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
              {product.title}
            </h1>

            <button
              onClick={() => setIsQuotePopupOpen(true)}
              className="w-fit px-8 py-3 bg-teal-700 text-white rounded-lg font-bold text-sm hover:bg-teal-800 transition-all"
            >
              Get a Quote
            </button>

            {/* Specifications Table */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {product.specs.map((spec, i) => (
                    <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-5 text-sm font-bold text-gray-900 w-1/3">{spec.label}</td>
                      <td className="py-3 px-5 text-sm text-gray-600">: {spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-4 md:px-8">
        <hr className="border-gray-100" />
      </div>

      {/* Product Details Text Section */}
      <section className="py-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl">

            <h2 className="text-xl font-bold text-gray-900 mb-1 border-l-4 border-teal-600 pl-3">
              Product Details
            </h2>
            <div className="w-16 h-0.5 bg-teal-100 mb-6 ml-7"></div>

            <div className="space-y-5 text-base leading-relaxed text-gray-600">
              <p>{product.detailedDescription}</p>
              <p>{product.extraInfo}</p>
              <p className="text-teal-700 font-bold italic">{product.callToAction}</p>
            </div>

            {/* Turnkey Solution */}
            <div className="mt-10">
              <h2 className="text-xl font-bold text-gray-900 mb-1 border-l-4 border-teal-600 pl-3">
                Turnkey Solution — Hassle-Free Product Launch
              </h2>
              <div className="w-16 h-0.5 bg-teal-100 mb-6 ml-7"></div>

              <p className="text-base leading-relaxed text-gray-600">
                From raw material sourcing to high-volume production, <span className="font-bold text-gray-900">Midflora Herbal</span> offers a fully integrated <span className="font-bold text-gray-900">turnkey solution</span> for your haircare brand. Whether you're targeting <span className="font-bold text-gray-900">salon-grade treatments</span> or <span className="font-bold text-gray-900">everyday essentials</span>, our R&D team will develop a formula that fits your promise—and we'll handle <span className="font-bold text-gray-900">formulation, testing, packaging, and compliance</span> under certified facilities.
              </p>
              <p className="mt-4 text-base font-bold text-gray-900">
                Let's create a standout formulation that strengthens your brand's presence in the natural hair care market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-4 md:px-8">
        <hr className="border-gray-100" />
      </div>

      {/* Key Ingredients */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-8">
            <p className="text-xs font-bold tracking-widest uppercase text-teal-600 mb-2">Natural Ingredients</p>
            <h2 className="text-xl font-bold text-gray-900">Key Ingredients Kit</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-14">
            {product.ingredients.map((ing, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="w-36 h-36 md:w-44 md:h-44 rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm">
                  <img
                    src={ing.img}
                    alt={ing.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-bold text-gray-900 text-center">{ing.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-4 md:px-8">
        <hr className="border-gray-100" />
      </div>

      {/* Related Products */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-8">
            <p className="text-xs font-bold tracking-widest uppercase text-teal-600 mb-2">Recommended For You</p>
            <h2 className="text-xl font-bold text-gray-900">Related Products</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {product.relatedProducts.map((p, i) => (
              <div key={i} className="group cursor-pointer flex flex-col items-center">
                <div className="aspect-[4/5] w-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden mb-4 group-hover:border-teal-300 transition-all duration-300">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h4 className="text-sm font-bold text-gray-900 text-center group-hover:text-teal-600 transition-colors duration-300">
                  {p.title}
                </h4>
                <span className="text-xs text-gray-400 mt-1">{p.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-4 md:px-8">
        <hr className="border-gray-100" />
      </div>

      {/* Enquiry Form Section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 md:p-10 border border-gray-200 shadow-sm">

            <div className="text-center mb-8">
              <p className="text-xs font-bold tracking-widest uppercase text-teal-600 mb-2">Partner With Us</p>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Contact Us For Third Party Manufacturing
              </h2>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Have questions? Our expert team is ready to assist you. Kindly share your details, and our experts will get in touch to understand your requirements.
              </p>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="First Name*" className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none" required />
              <input type="text" placeholder="Last Name*" className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none" required />
              <input type="email" placeholder="Email*" className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none" required />
              <input type="tel" placeholder="Phone*" className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none" required />
              <input type="text" placeholder="Company" className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none col-span-1 md:col-span-2" />

              <div className="grid grid-cols-2 gap-4 col-span-1 md:col-span-2">
                <div className="relative">
                  <select className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none appearance-none cursor-pointer">
                    <option value="" disabled selected className="text-gray-400">Select Product</option>
                    <option value="Hair Cream">Hair Cream</option>
                    <option value="Face Wash">Face Wash</option>
                    <option value="Serum">Serum</option>
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </div>
                </div>
                <div className="relative">
                  <select className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none appearance-none cursor-pointer">
                    <option value="" disabled selected className="text-gray-400">Select Category</option>
                    <option value="Skincare">Skincare</option>
                    <option value="Haircare">Haircare</option>
                    <option value="Wellness">Wellness</option>
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </div>
                </div>
              </div>

              <textarea placeholder="Enquiry" rows={3} className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none col-span-1 md:col-span-2 resize-none"></textarea>

              <div className="col-span-1 md:col-span-2 text-center mt-2">
                <button type="submit" className="px-8 py-3 bg-teal-700 hover:bg-teal-800 text-white font-medium text-sm rounded-lg transition-all w-full md:w-auto">
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
