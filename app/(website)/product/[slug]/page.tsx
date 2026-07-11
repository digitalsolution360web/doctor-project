"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
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

interface Product {
  id: number;
  category_id: number;
  name: string;
  h1_title: string | null;
  slug: string;
  image: string;
  moq: string;
  packaging_size: string;
  packaging_type: string;
  customized_formulations: string;
  private_labeling: string;
  turnkey_solutions: string;
  benefits: string;
  description: string;
  ingredients: string | null;
  meta_title: string;
  meta_description: string;
  status: string;
  created_at: string;
  updated_at: string;
}
interface StaticProduct {
  ingredients: ProductIngredient[];
}
interface RelatedProduct {
  name: string;
  image: string | null;
  slug: string;
}

interface ProductResponse {
  product: Product;
  relatedProducts: RelatedProduct[];
}
interface ProductIngredient {
  name: string;
  img: string;
}

// Map API data to component structure
const mapProductData = (data: ProductResponse) => {
  const { product, relatedProducts } = data;
  
  // Parse description HTML and extract text content
  const descriptionText = product.description ? product.description.replace(/<[^>]*>/g, '') : '';
  
  // Build specs from product data
  const specs = [
    { label: "MOQ", value: product.moq || "N/A" },
    { label: "Packaging Size", value: product.packaging_size || "N/A" },
    { label: "Packaging Type", value: product.packaging_type || "N/A" },
  ];

  // Add services if available
  if (product.customized_formulations === "1") {
    specs.push({ label: "Customized Formulations", value: "Available" });
  }
  if (product.private_labeling === "1") {
    specs.push({ label: "Private Labeling", value: "Available" });
  }
  if (product.turnkey_solutions === "1") {
    specs.push({ label: "Turnkey Solutions", value: "Available" });
  }
  specs.push({label:"Benefits", value:product.benefits || "N/A"});

  return {
    name: product.name,
    h1_title: product.h1_title || product.name,
    image: product.image || '/placeholder.png',
    moq: product.moq,
    packaging_size: product.packaging_size,
    packaging_type: product.packaging_type,
    customized_formulations: product.customized_formulations,
    private_labeling: product.private_labeling,
    turnkey_solutions: product.turnkey_solutions,
    benefits:product.benefits,
    description: product.description,
    descriptionText: descriptionText,
    specs: specs,
    meta_title: product.meta_title,
    meta_description: product.meta_description,
    ingredients: product.ingredients ? product.ingredients.split(',').map(i => i.trim()) : [],
    relatedProducts: relatedProducts || [],
    // For UI display
    title: product.name,
    detailedDescription: descriptionText || `Experience premium quality with our ${product.name}.`,
    extraInfo: `Our ${product.name} is manufactured under strict quality control standards, ensuring consistent performance and safety for your customers.`,
    callToAction: `Partner with us to bring your brand vision to life with our premium ${product.name}.`,
    // Convert related products to the format expected by the UI
    relatedProductsForUI: (relatedProducts || []).map((rp: RelatedProduct) => ({
      title: rp.name,
      img: rp.image || '/placeholder.png',
      slug: rp.slug
    }))
  };
};

const allProducts: Record<string, StaticProduct> = {
  "aloe-based-hair-cream-formulation": {
    ingredients: [
      { name: "Aloe Vera Extract", img: "/categories/cate2.webp" },
      { name: "Coconut Oil", img: "/categories/cate10.webp" },
      { name: "Shea Butter", img: "/categories/cate12.webp" },
    ]
  },
  "organic-lip-balm-private-label": {
    ingredients: [
      { name: "Beeswax", img: "/categories/cate13.webp" },
      { name: "Essential Oils", img: "/categories/cate11.webp" },
      { name: "Cocoa Butter", img: "/categories/cate12.webp" },
    ]
  },
  "skin-hydrating-serum-manufacturer": {
    ingredients: [
      { name: "Hyaluronic Acid", img: "/categories/cate9.webp" },
      { name: "Vitamin C", img: "/categories/cate8.webp" },
      { name: "Green Tea Extract", img: "/categories/cate7.webp" },
    ]
  },
  "vitamin-c-brightening-face-wash": {
   
    ingredients: [{ name: "Vitamin C", img: "/categories/cate8.webp" }]
   
  },
  "herbal-anti-hairfall-oil": {
    ingredients: [{ name: "Herbal Extracts", img: "/categories/cate.webp" }]
  }
};

const detailedDescription = "Experience the gentle yet effective power of Aloe Vera with Midflora Herbal's Aloe-Based Hair Cream. Designed to offer daily hydration and softness, this cream nourishes both scalp and strands while smoothing away dryness and dullness. Ideal for brands focused on natural haircare solutions, it's infused with Aloe Vera Extract, Coconut Oil, Shea Butter, and Pro-Vitamin B5—all working in harmony to leave the hair glossy, frizz-free, and more manageable.";

const callToAction = "Want to launch a nourishing, aloe-powered hair cream under your brand? Partner with Midflora Herbal and let's co-create a high-performance formula that your customers will love—naturally.";

const extraInfo =  "Its lightweight yet rich texture makes it suitable for leave-in conditioning, styling prep, or overnight hydration, especially for customers looking for chemical-free daily hair nourishment. The formula can be fully tailored to your vision—whether you want to add biotin, keratin, coconut milk, or build a curly-hair or Ayurvedic variant.";

export default function ProductDetails() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const [isQuotePopupOpen, setIsQuotePopupOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [productData, setProductData] = useState<any | null>(null);
  const staticproduct: StaticProduct = allProducts[slug] || allProducts["aloe-based-hair-cream-formulation"];

  useEffect(() => {
    fetchProductData();
  }, [slug]);

  const fetchProductData = async () => {
    setLoading(true);
    setError(false);

    try {
      const res = await fetch(`/api/frontend/products/${slug}`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch product data');
      }

      const result = await res.json();
      
      if (result.success && result.data) {
        const mappedData = mapProductData(result.data);
        setProductData(mappedData);
      } else {
        throw new Error('Invalid product data');
      }
      
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-white min-h-screen pt-32">
        <div className="container mx-auto px-4 md:px-8 py-20">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-slate-500">Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !productData) {
    return (
      <div className="bg-white min-h-screen pt-32">
        <div className="container mx-auto px-4 md:px-8 py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Product Not Found</h2>
            <p className="text-slate-500">The product you're looking for doesn't exist or has been removed.</p>
            <Link 
              href="/category/all-products"
              className="inline-block mt-6 px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-bold"
            >
              View All Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const product = productData;

  return (
    <div className="bg-white min-h-screen pt-32 pb-0">

      {/* Product Hero Section */}
      <section className="container mx-auto px-4 md:px-8 mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left: Product Image */}
          <div className="lg:col-span-5">
            <div className="relative aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover rounded-[1.5rem] w-full h-full"
              />
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:col-span-7 flex flex-col gap-6 md:pl-10">
            {/* Title + CTA */}
            <div className="flex flex-col gap-5">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                {product.h1_title}
              </h1>
              
              <div className="flex">
                <button
                  onClick={() => setIsQuotePopupOpen(true)}
                  className="px-6 py-2.5 bg-[#00665c] text-white rounded-md font-bold text-sm tracking-wide hover:bg-teal-900 transition-all"
                >
                  Get a Quote
                </button>
              </div>
            </div>

            {/* Product Specifications List */}
            <div className="flex flex-col mt-4 border-t border-slate-200">
              {product.specs.map((spec: any, i: number) => (
                <div key={i} className="grid grid-cols-[160px_1fr] md:grid-cols-[220px_1fr] py-3 border-b border-slate-200 items-start">
                  <span className="font-bold text-slate-900 text-[14px] md:text-[15px]">{spec.label}</span>
                  <span className="text-slate-800 text-[14px] md:text-[15px] font-medium flex gap-2">
                    <span className="text-slate-900">:</span>
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* Divider */}
      <div className="container mx-auto px-4 md:px-8">
        <hr className="border-gray-100" />
      </div>
      {/* Product Details & Turnkey Solution Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* Left Column: Product Details */}
            <div className="flex flex-col">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-teal-600 rounded-full"></span>
                Product Details
              </h2>
              
              <div className="space-y-6 text-[15px] md:text-[16px] leading-[1.8] text-gray-600 font-medium">
                <p className="bg-slate-50 p-6 rounded-2xl border-l-4 border-teal-600/30">
                  {detailedDescription}
                </p>
                <p>{extraInfo}</p>
                <p className="text-teal-700 font-bold italic border-t border-teal-50 pt-4">
                  {callToAction}
                </p>
              </div>
            </div>

            {/* Right Column: Turnkey Solution */}
            <div className="flex flex-col lg:mt-0">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-teal-600 rounded-full"></span>
                Turnkey Solutions
              </h2>

              <div className="bg-teal-50/50 p-8 rounded-[2.5rem] border border-teal-100 shadow-sm">
                <p className="text-[15px] md:text-[16px] leading-[1.8] text-gray-600 font-medium">
                  From raw material sourcing to high-volume production, <span className="font-extrabold text-slate-900 underline decoration-teal-500/30 decoration-4 underline-offset-2">Midflora Herbal</span> offers a fully integrated <span className="font-extrabold text-slate-900">turnkey solution</span> for your haircare brand.
                </p>
                <p className="mt-6 text-[15px] md:text-[16px] leading-[1.8] text-gray-600 font-medium">
                  Whether you&apos;re targeting <span className="font-bold text-slate-900">salon-grade treatments</span> or <span className="font-bold text-slate-900">everyday essentials</span>, our R&D team will handle <span className="font-bold text-teal-700">formulation, testing, packaging, and compliance</span> under certified facilities.
                </p>
                <div className="mt-8 pt-6 border-t border-teal-100">
                  <p className="text-base font-black text-slate-900 tracking-tight">
                    Let&apos;s create a standout formulation that strengthens your brand&apos;s presence in the market.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
{/* <div dangerouslySetInnerHTML={{ __html: product.description }} /> */}

      {/* Divider */}
      <div className="container mx-auto px-4 md:px-8">
        <hr className="border-gray-100" />
      </div>

        {/* Key Ingredients Slider - Full Width Marquee */}
      <section className="py-6 md:py-10 bg-slate-50 overflow-hidden relative w-full">
        <div className="container mx-auto px-4 md:px-8 mb-6 md:mb-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[9px] font-black tracking-[0.4em] uppercase text-teal-600 mb-3 justify-center flex items-center gap-3">
              <span className="w-8 h-px bg-teal-600"></span>
              Natural Ingredients
              <span className="w-8 h-px bg-teal-600"></span>
            </p>
            <h2 className="text-2xl md:text-4xl font-[1000] text-slate-900 tracking-tighter leading-tight">
              Premium <span className="text-slate-400 font-semibold italic">Ingredients.</span>
            </h2>
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          {/* Marquee Wrapper */}
          <div className="flex gap-6 md:gap-8 animate-marquee whitespace-nowrap hover:[animation-play-state:paused] w-max">
            {[...staticproduct.ingredients, ...staticproduct.ingredients, ...staticproduct.ingredients, ...staticproduct.ingredients].map((ing: ProductIngredient, i: number) => (
              <div key={i} className="flex-none w-[260px] md:w-[350px] flex flex-col gap-4 group/item">
                <div className="relative aspect-square rounded-[20px] overflow-hidden bg-white border border-slate-100 shadow-xl group-hover/item:shadow-teal-600/20 transition-all duration-500">
                  <Image
                    src={ing.img}
                    alt={ing.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0  transition-opacity duration-700 flex flex-col justify-end p-8">
                    <span className="text-xl md:text-2xl font-black text-white tracking-tight uppercase leading-none">{ing.name}</span>
                    <p className="text-teal-400 text-[8px] font-black uppercase tracking-[0.3em] mt-2">Organic Extract</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx global>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            animation: marquee 50s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
          /* Hide scrollbar for Chrome, Safari and Opera */
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          /* Hide scrollbar for IE, Edge and Firefox */
          .no-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
          body {
            overflow-x: hidden;
          }
        `}</style>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-4 md:px-8">
        <hr className="border-gray-100" />
      </div>

      {/* Related Products */}
      {product.relatedProductsForUI && product.relatedProductsForUI.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="ml-70 mb-12">
            <p className="text-[10px] font-black tracking-widest uppercase text-teal-600 mb-2">Recommended For You</p>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Related Products</h2>
          </div>

            <div className="flex flex-wrap justify-center gap-8 md:gap-10">
              {product.relatedProductsForUI.map((p: any, i: number) => (
                <Link href={`/product/${p.slug}`} key={i} className="group cursor-pointer flex flex-col items-center w-full sm:w-[280px]">
                  <div className="relative aspect-square w-full bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden mb-5 group-hover:border-teal-400 group-hover:shadow-xl transition-all duration-500">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <h4 className="text-sm md:text-base font-black text-slate-900 text-center group-hover:text-teal-600 transition-colors duration-300 px-2">
                    {p.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Divider */}
      <div className="container mx-auto px-4 md:px-8">
        <hr className="border-gray-100" />
      </div>

      {/* Enquiry Form Section - With Background */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/categories/ayurvedic.webp"
            alt="Natural Ingredients Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/75"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-md rounded-3xl p-6 md:p-12 border border-white/10 shadow-2xl">

            <div className="text-center mb-10">
              <p className="text-[10px] font-black tracking-[0.4em] uppercase text-teal-400 mb-4">Partner With Us</p>
              <h2 className="text-2xl md:text-4xl font-black text-white mb-4 tracking-tight">
                Request a Custom Quote
              </h2>
              <p className="text-sm text-slate-400 max-w-md mx-auto font-medium">
                Our expert team is ready to discuss your brand&apos;s specific requirements and provide a tailored manufacturing plan.
              </p>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input type="text" placeholder="First Name*" className="w-full px-6 py-4 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none" required />
              <input type="text" placeholder="Last Name*" className="w-full px-6 py-4 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none" required />
              <input type="email" placeholder="Email Address*" className="w-full px-6 py-4 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none" required />
              <input type="tel" placeholder="Phone Number*" className="w-full px-6 py-4 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none" required />

              <div className="relative col-span-1 md:col-span-2">
                <select defaultValue="" className="w-full px-6 py-4 text-sm bg-white/5 border border-white/10 rounded-xl text-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none appearance-none cursor-pointer">
                  <option value="" disabled>Select Product Category</option>
                  <option value="Skincare">Skincare</option>
                  <option value="Haircare">Haircare</option>
                  <option value="Bath & Body">Bath & Body</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500">
                  <ChevronRight className="w-4 h-4 rotate-90" />
                </div>
              </div>

              <textarea placeholder="Tell us about your project requirements..." rows={4} className="w-full px-6 py-4 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none col-span-1 md:col-span-2 resize-none"></textarea>

              <div className="col-span-1 md:col-span-2 text-center mt-4">
                <button type="submit" className="px-10 py-5 bg-teal-600 hover:bg-teal-500 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all w-full shadow-xl shadow-teal-600/20">
                  Submit Requirement
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
