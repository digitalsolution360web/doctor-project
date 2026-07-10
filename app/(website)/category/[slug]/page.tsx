"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Grid2X2 } from "lucide-react";

interface Category {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  paragraph: string | null;
  meta_title: string | null;
  meta_description: string | null;
  status: string;
  product_count?: number; // Added for sidebar
}

interface Product {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  moq: string | null;
  packaging_size: string | null;
  packaging_type: string | null;
  customized_formulations: boolean;
  private_labeling: boolean;
  turnkey_solutions: boolean;
  ingredients: string | null;
  short_description: string | null;
  status: string;
}

interface CategoryResponse {
  category: Category;
  products: Product[];
  total: number;
  featured: number;
  allCategories: Category[];
}

export default function CategoryFilterPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;

  const [categoryData, setCategoryData] = useState<CategoryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // State for sidebar categories
  const [sidebarCategories, setSidebarCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategoryData();
  }, [slug]);

  const fetchCategoryData = async () => {
    setLoading(true);
    setError(false);

    try {
      const res = await fetch(`/api/frontend/categories/${slug}`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch category data');
      }

      const result = await res.json();

      setCategoryData(result.data);
      
      // Build sidebar categories with counts
      if (result.data.allCategories) {
        // Add "All Products" option with total count
        const allProducts = {
          id: 0,
          name: "All Products",
          slug: "all-products",
          product_count: result.data.total,
        };
        
        // Format categories with active state
        const categoriesWithActive = result.data.allCategories.map((cat: Category) => ({
          ...cat,
          active: cat.slug === slug
        }));
        
        setSidebarCategories([allProducts, ...categoriesWithActive]);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const categoryTitle = categoryData?.category?.name 
    ? categoryData.category.name
    : slug
      ? slug.split("-").map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
      : "Skin Care";

  // Loading state
  if (loading) {
    return (
      <div className="bg-white min-h-screen font-sans">
        <div className="relative pt-32 pb-20 bg-slate-50 border-b border-slate-100">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl">
              <div className="h-6 w-32 bg-slate-200 rounded animate-pulse mb-4"></div>
              <div className="h-12 w-64 bg-slate-200 rounded animate-pulse mb-4"></div>
              <div className="h-6 w-96 bg-slate-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse">
                <div className="aspect-square bg-slate-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !categoryData) {
    return (
      <div className="bg-white min-h-screen font-sans flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Category Not Found</h2>
          <p className="text-slate-500">The category you're looking for doesn't exist.</p>
          <Link href="/" className="inline-block mt-4 text-teal-600 font-semibold hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const { category, products, total } = categoryData;

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* Category Banner */}
      <div className="relative pt-32 pb-20 bg-slate-50 border-b border-slate-100 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-teal-50/50 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-4">
              Premium Formulations
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {category.name}
            </h1>
            {category.paragraph && (
              <p className="text-slate-500 text-base md:text-lg font-medium max-w-xl leading-relaxed">
                {category.paragraph}
              </p>
            )}
            {!category.paragraph && (
              <p className="text-slate-500 text-base md:text-lg font-medium max-w-xl leading-relaxed">
                Explore our extensive range of high-performance {category.name.toLowerCase()} formulations available for third-party manufacturing and private labeling.
              </p>
            )}
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
                {sidebarCategories.map((cat) => {
                  // Determine if this category is active
                  const isActive = cat.slug === slug || (cat.slug === "all-products" && slug === "all-products");
                  
                  return (
                    <li key={cat.id}>
                      <Link
                        href={`/category/${cat.slug}`}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 ${
                          isActive
                            ? 'bg-teal-50 text-teal-700 font-bold'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-teal-600 font-medium'
                        }`}
                      >
                        <span className="text-[14px]">{cat.name}</span>
                        {cat.product_count !== undefined && cat.product_count > 0 && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isActive ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-400'
                          }`}>
                            {cat.product_count}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Product Grid Area */}
          <div className="flex-1">

            {/* Toolbar/Filters Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
              <p className="text-sm font-bold text-slate-500">
                Showing <span className="text-slate-900">{products.length}</span> results
              </p>
            </div>

            {/* Grid */}
            {products.length === 0 ? (
              <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-slate-500 font-medium">No products found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                {products.map((product) => (
                  <Link
                    href={`/product/${product.slug}`}
                    key={product.id}
                    className="group flex flex-col h-full bg-white rounded-2xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:border-teal-100 transition-all duration-500 overflow-hidden"
                  >
                    {/* Image Section */}
                    <div className="relative aspect-square bg-slate-50 overflow-hidden">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="object-cover group-hover:scale-105 transition-transform duration-[1500ms] ease-out"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
                          No Image
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>

                      {/* Tags */}
                      {/* <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {product.private_labeling && (
                          <span className="bg-white/90 backdrop-blur-sm text-blue-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                            Private Label
                          </span>
                        )}
                        {product.turnkey_solutions && (
                          <span className="bg-white/90 backdrop-blur-sm text-teal-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                            Turnkey
                          </span>
                        )}
                      </div> */}
                    </div>

                    {/* Content Section */}
                    <div className="p-4 flex-1 flex flex-col">
                      <h4 className="text-[16px] font-bold text-slate-900 leading-snug group-hover:text-teal-600 transition-colors line-clamp-2 mb-2">
                        {product.name}
                      </h4>
                      
                      
                    </div>

                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}