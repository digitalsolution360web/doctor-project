"use client";

import React, { useRef, useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import Link from "next/link";
import './blog.css';
import { Calendar, User, ArrowLeft, ArrowRight, Share2, ChevronRight, Bookmark } from "lucide-react";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
}
interface Blog {
  h1: string;
  slug: string;
  description: string;
  excerpt: string;
  image: string;
  created_at: string;
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children, className = "", direction = "up" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);
  const animationClass = isVisible
    ? direction === "left" ? "animate-reveal-left" : direction === "right" ? "animate-reveal-right" : "animate-fade-up"
    : "opacity-0";
  return <div ref={ref} className={`${className} ${animationClass}`}>{children}</div>;
};


export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (slug) {
      fetchBlogDetail();
      fetchAllBlogs();
    }
  }, [slug]);

  const fetchBlogDetail = async () => {
    setLoading(true);
    setError(false);

    try {
      const res = await fetch(`/api/frontend/blogs/${slug}`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch blog');
      }

      const result = await res.json();
      setBlog(result.data);
      
    } catch (err) {
      console.error('Error fetching blog:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllBlogs = async () => {
    try {
      const res = await fetch('/api/frontend/blogs?page=1&limit=8');
      const result = await res.json();
      setAllBlogs(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      console.error('Error fetching all blogs:', err);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };


  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white pt-20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !blog) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white pt-20">
        <div className="text-center max-w-md px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Article not found
          </h2>
          <p className="text-slate-600 mb-6">
            We couldn&apos;t find the blog post you&apos;re looking for.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-full font-semibold hover:bg-teal-700 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div className="flex flex-col min-h-screen bg-white pt-20">

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-transparent">
        <div className="h-full bg-gradient-to-r from-teal-500 to-teal-400 transition-all duration-150 ease-out shadow-[0_0_10px_rgba(20,184,166,0.5)]" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img src={blog.image} alt={blog.h1} sizes="100vw" className="object-cover opacity-30 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 pb-16 pt-20">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-10">
            <Link href="/" className="hover:text-teal-400 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/blog" className="hover:text-teal-400 transition-colors">Blog</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-teal-400">{blog.h1}</span>
          </div>

          <RevealOnScroll className="max-w-4xl space-y-8">
           
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white leading-[1.05]">
              {blog.h1}
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed font-medium">
              {blog.excerpt}
            </p>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-8 pt-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
                  <User className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold">Midflora Herbal</p>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Author</p>
                </div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex items-center gap-6 text-slate-400 text-xs font-bold uppercase tracking-widest">
                <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-2 text-teal-400" />{formatDate(blog.created_at)}</span>
                
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Article Body */}
      <section className="pt-10 pb-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-16">

            {/* Main Content */}
            <article className="flex-[3]">
            
             

              {/* Article Sections */}
              <div
  className="
    description-content
    w-full
    max-w-full
    min-w-0
    overflow-hidden
    break-words
    [overflow-wrap:anywhere]
    [&_img]:max-w-full
    [&_img]:h-auto
    [&_iframe]:max-w-full
    [&_iframe]:w-full
    [&_video]:max-w-full
    [&_table]:max-w-full
    [&_table]:overflow-x-auto
    [&_pre]:max-w-full
    [&_pre]:overflow-x-auto
  "
>
  <div
    dangerouslySetInnerHTML={{
      __html: blog.description.replace(/&nbsp;/g, ' ')
    }}
  />
</div>

              {/* Author Card */}
              <RevealOnScroll className="mt-20">
                <div className="bg-gradient-to-br from-slate-950 to-slate-900 rounded-[40px] p-10 md:p-12 flex flex-col sm:flex-row items-start sm:items-center gap-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-60 h-60 bg-teal-500/5 rounded-full blur-[80px]" />
                  <div className="w-20 h-20 rounded-2xl bg-teal-500/20 border-2 border-teal-500/30 flex items-center justify-center shrink-0 relative z-10">
                    <User className="w-10 h-10 text-teal-400" />
                  </div>
                  <div className="flex-1 relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-500 mb-2">Written By</p>
                    <p className="text-xl font-bold text-white mb-2">Midflora Herbal</p>
                    <p className="text-slate-400 leading-relaxed">
                      Our in-house R&D team at Midflora Herbal — experienced cosmetic chemists, formulation scientists, and brand strategists with decades of industry expertise.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>

              {/* Tags + Share Row */}
              <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tags:</span>
                  {["Cosmetic", "Manufacturing", "Brand"].map((t, i) => (
                    <span key={i} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-xs font-bold text-slate-600 hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200 transition-all cursor-pointer">{t}</span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => navigator.share?.({ title: blog.h1, url: window.location.href })} className="flex items-center space-x-2 px-5 py-2.5 bg-slate-50 rounded-full text-slate-500 hover:bg-teal-50 hover:text-teal-600 transition-all text-xs font-black uppercase tracking-widest border border-slate-100">
                    <Share2 className="w-3.5 h-3.5" /><span>Share</span>
                  </button>
                  <button className="flex items-center space-x-2 px-5 py-2.5 bg-slate-50 rounded-full text-slate-500 hover:bg-teal-50 hover:text-teal-600 transition-all text-xs font-black uppercase tracking-widest border border-slate-100">
                    <Bookmark className="w-3.5 h-3.5" /><span>Save</span>
                  </button>
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-10 flex items-center justify-between">
                <Link href="/blog" className="flex items-center space-x-3 px-8 py-4 bg-slate-950 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-teal-600 transition-all group">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span>All Articles</span>
                </Link>
              </div>
            </article>

            {/* Sidebar */}
           <aside className="flex-1 space-y-8 lg:max-w-xs xl:max-w-sm min-w-0">



              {/* Related Posts */}
              <RevealOnScroll direction="right">
                <div className="space-y-5">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Related Articles</h4>
                  {allBlogs.map((rel, i) => (
                    <Link key={i} href={`/${rel.slug}`} className="flex items-start space-x-4 group p-3 rounded-2xl hover:bg-slate-50 transition-all">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-100 flex-shrink-0">
  <img src={rel.image} alt={rel.h1} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
</div>
                      <div className="flex-1 min-w-0">
                       
                        <p className="text-sm font-bold text-slate-900 group-hover:text-teal-600 transition-colors leading-tight line-clamp-2">{rel.h1}</p>
                        <p className="text-[10px] text-slate-400 font-bold mt-1.5 uppercase tracking-widest">{formatDate(rel.created_at)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </RevealOnScroll>
            </aside>

          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(20,184,166,0.08),transparent_60%)]" />
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <RevealOnScroll className="space-y-8 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Explore More <span className="text-teal-400">Insights.</span>
            </h2>
            <p className="text-slate-400 text-lg font-medium">Stay updated with the latest trends in cosmetic manufacturing, ingredients, and brand building.</p>
            <Link href="/blog" className="inline-flex items-center space-x-3 px-10 py-5 bg-teal-600 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all group">
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </RevealOnScroll>
        </div>
      </section>

    </div>
  );
}
