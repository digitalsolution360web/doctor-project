"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowLeft, ArrowRight, Tag, Clock, Share2, BookOpen, ChevronRight, Bookmark, Eye } from "lucide-react";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
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

const allPosts = [
  {
    slug: "Product-details-1",
    title: "How To Start A Cosmetic Brand In India",
    excerpt: "A step-by-step roadmap for entrepreneurs looking to launch a successful skincare or haircare brand. Learn about legal requirements, formulations, and choosing the right manufacturing partner.",
    image: "/8.webp",
    date: "April 20, 2026",
    readTime: "8 min read",
    views: "2.4K",
    category: "Business Guide",
    author: "Expert R&D Team",
    content: [
      { heading: "Introduction", body: "India's cosmetic market is one of the fastest-growing in the world, projected to exceed $20 billion by 2027. With rising consumer awareness, the demand for quality skincare, haircare, and personal care products has never been higher. Whether you are an entrepreneur with a concept or an existing brand looking to scale, starting a cosmetic brand in India is both exciting and rewarding." },
      { heading: "Step 1 — Market Research & Brand Positioning", body: "Before diving into formulation, understand your target audience. Who are they? What problems does your product solve? Study competitors, identify gaps, and define your unique value proposition. A well-positioned brand speaks directly to its audience — whether that's luxury, ayurvedic, dermatologist-approved, or budget-friendly." },
      { heading: "Step 2 — Legal Requirements & Licensing", body: "In India, cosmetic manufacturing is regulated by the CDSCO (Central Drugs Standard Control Organization) under the Drugs and Cosmetics Act, 1940. You will need a manufacturing license (Form 32), GST registration, and compliance with BIS standards for specific categories. Choosing a licensed third-party manufacturer like Midflora Herbal ensures all regulatory requirements are already in place." },
      { heading: "Step 3 — Formulation & Product Development", body: "Work with experienced formulation scientists to develop your product. Key considerations include active ingredient selection, stability testing, dermatological testing, and shelf-life analysis. At Midflora Herbal, our R&D lab houses over 200+ ready-to-customize formulations, allowing faster time-to-market without compromising quality." },
      { heading: "Step 4 — Packaging & Branding", body: "Your packaging is your silent salesperson. Invest in premium packaging that reflects your brand's identity. Choose materials that are sustainable, functional, and eye-catching. Ensure all mandatory label requirements are met — including ingredient list (INCI names), batch number, manufacturing date, and net content." },
      { heading: "Step 5 — Manufacturing Partnership", body: "Partnering with the right third-party manufacturer is the cornerstone of your brand's success. Look for a GMP-certified facility with ISO certifications, a strong R&D team, proven track record, and flexible MOQs. Midflora Herbal offers end-to-end private label and custom formulation services, supporting brands from concept to finished product." },
      { heading: "Step 6 — Distribution & Marketing", body: "Plan your go-to-market strategy early. Decide whether you'll sell D2C (direct-to-consumer) via your own website, on marketplaces like Amazon & Nykaa, or through retail distribution. Build a strong digital presence — social media, influencer collaborations, and content marketing are critical for cosmetic brand growth." },
      { heading: "Conclusion", body: "Starting a cosmetic brand in India requires careful planning, the right manufacturing partner, and a clear brand vision. With India's growing middle class and increasing beauty consciousness, the opportunity is immense. Midflora Herbal is here to partner with you at every step — from ideation to shelf." }
    ]
  },
  {
    slug: "Product-details-2",
    title: "Top Trending Skincare Ingredients For 2026",
    excerpt: "Discover the high-demand ingredients driving consumer interest this year. From Niacinamide and Kojic Acid to Botanical Extracts, learn what formulations are winning the market.",
    image: "/banner1.webp",
    date: "April 15, 2026",
    readTime: "6 min read",
    views: "1.8K",
    category: "Ingredients",
    author: "Expert R&D Team",
    content: [
      { heading: "Introduction", body: "The skincare industry evolves rapidly, with new ingredients capturing consumer attention each year. In 2026, several hero ingredients are leading the charge — backed by clinical research, consumer demand, and influencer momentum. Here's a definitive guide to the top trending skincare ingredients your formulations should consider." },
      { heading: "1. Niacinamide (Vitamin B3)", body: "Niacinamide continues its reign as one of the most sought-after skincare actives. Clinically proven to brighten skin tone, minimize pores, strengthen the skin barrier, and reduce hyperpigmentation, it pairs well with virtually every other active. At concentrations of 2-10%, it delivers visible results across all skin types." },
      { heading: "2. Kojic Acid", body: "Kojic acid, derived from fungi, is a powerful skin-brightening agent. It inhibits melanin production, making it highly effective for dark spot correction and even skin tone. Often combined with Vitamin C for a synergistic whitening effect, it's a must-have in lightening serums and creams." },
      { heading: "3. Bakuchiol — The Natural Retinol Alternative", body: "As clean beauty continues to grow, Bakuchiol has emerged as the plant-based alternative to retinol. Derived from the Psoralea corylifolia plant, it delivers retinol-like results (collagen boost, fine line reduction, skin renewal) without the irritation, making it safe for sensitive skin and during pregnancy." },
      { heading: "4. Peptides", body: "Signal peptides, carrier peptides, and neurotransmitter-inhibiting peptides are dominating anti-aging formulations. They help stimulate collagen production, firm the skin, and reduce the appearance of wrinkles. Brands that incorporate multi-peptide complexes are seeing strong consumer loyalty." },
      { heading: "5. Botanical Extracts — Turmeric, Ashwagandha, Saffron", body: "India's rich botanical heritage is gaining global recognition. Turmeric (curcumin) for its anti-inflammatory and brightening properties, Ashwagandha for adaptogenic stress-relief benefits in skin, and Saffron for premium skin luminosity — these ingredients resonate with both ayurvedic and modern consumers." },
      { heading: "Conclusion", body: "Formulating with trending, clinically-backed ingredients positions your brand at the forefront of consumer demand. At Midflora Herbal, our R&D team stays ahead of global ingredient trends, ensuring your formulations are both efficacious and market-relevant." }
    ]
  },
  {
    slug: "Product-details-3",
    title: "Private Label Vs Custom Manufacturing",
    excerpt: "Not sure which path to choose? We break down the pros and cons of Private Labeling for speed-to-market versus Custom Formulations for unique brand exclusivity.",
    image: "/banner1.webp",
    date: "April 10, 2026",
    readTime: "7 min read",
    views: "3.1K",
    category: "Manufacturing",
    author: "Expert R&D Team",
    content: [
      { heading: "Introduction", body: "When launching a cosmetic brand, one of the first strategic decisions is whether to go for Private Label manufacturing or Custom Formulation manufacturing. Both approaches have distinct advantages and trade-offs. Understanding them helps you make the right choice for your brand's vision, budget, and timeline." },
      { heading: "What is Private Label Manufacturing?", body: "Private labeling involves selecting from a manufacturer's pre-existing, proven formulations and applying your own brand's packaging and label. The product is already developed and tested — you simply customize the fragrance, color, or packaging and brand it as your own. This is the fastest and most cost-effective way to enter the market." },
      { heading: "Pros of Private Label", body: "Lower MOQs (Minimum Order Quantities), faster time-to-market (sometimes as quick as 30 days), lower R&D costs, proven formulations with existing stability data, and access to a wide product portfolio. Ideal for startups and brands testing the market with limited budgets." },
      { heading: "What is Custom Formulation Manufacturing?", body: "Custom formulation means developing a completely unique product from scratch, tailored specifically to your brand's requirements. You work with formulation scientists to select actives, base, texture, fragrance, and claims. The result is a 100% exclusive product that no one else can replicate." },
      { heading: "Pros of Custom Formulation", body: "Complete product exclusivity, ability to file patents, superior brand differentiation, specific active ingredient concentrations, and the ability to create truly innovative products that stand out on shelves. Ideal for established brands seeking to build proprietary formulations." },
      { heading: "Key Differences at a Glance", body: "Private Label: Faster (30–60 days), lower cost, proven formula, limited exclusivity. Custom Manufacturing: Longer (90–180 days), higher R&D investment, fully exclusive, stronger brand equity. Both paths deliver premium quality when partnering with a certified manufacturer like Midflora Herbal." },
      { heading: "Which is Right for You?", body: "If you're launching quickly with a tight budget, Private Label is your best bet. If you're building a legacy brand with unique, patented products, Custom Formulation is the way to go. Midflora Herbal offers both paths with complete end-to-end support — from ideation to finished product." }
    ]
  }
];

interface PageProps { params: Promise<{ slug: string }>; }

export default function BlogDetailPage({ params }: PageProps) {
  const { slug } = React.use(params);
  const post = allPosts.find(p => p.slug === slug) ?? allPosts[0];
  const related = allPosts.filter(p => p.slug !== post.slug);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white pt-20">

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-transparent">
        <div className="h-full bg-gradient-to-r from-teal-500 to-teal-400 transition-all duration-150 ease-out shadow-[0_0_10px_rgba(20,184,166,0.5)]" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <Image src={post.image} alt={post.title} fill sizes="100vw" className="object-cover opacity-30 scale-105" priority />
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
            <span className="text-teal-400">{post.category}</span>
          </div>

          <RevealOnScroll className="max-w-4xl space-y-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-5 py-2 bg-teal-600 rounded-full text-white text-[10px] font-black uppercase tracking-widest">
                <Tag className="w-3 h-3 mr-2" />{post.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white leading-[1.05]">
              {post.title}
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed font-medium">
              {post.excerpt}
            </p>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-8 pt-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
                  <User className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold">{post.author}</p>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Author</p>
                </div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex items-center gap-6 text-slate-400 text-xs font-bold uppercase tracking-widest">
                <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-2 text-teal-400" />{post.date}</span>
                <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-2 text-teal-400" />{post.readTime}</span>
                <span className="flex items-center"><Eye className="w-3.5 h-3.5 mr-2 text-teal-400" />{post.views} Views</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-16">

            {/* Main Content */}
            <article className="flex-[3] w-full">
              {/* Styled Intro Quote */}
              <RevealOnScroll>
                <div className="relative pl-6 border-l-4 border-teal-500 mb-12 py-1">
                  <p className="text-xl md:text-2xl text-slate-700 font-semibold leading-relaxed italic">
                    {post.excerpt}
                  </p>
                </div>
              </RevealOnScroll>

              {/* Article Sections */}
              <div className="space-y-16">
                {post.content.map((section, i) => (
                  <RevealOnScroll key={i}>
                    <div id={`section-${i}`} className="group">
                      <div className="space-y-4">
                        {/* Heading */}
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black text-teal-600 uppercase tracking-[0.3em]">Section {String(i + 1).padStart(2, '0')}</span>
                          <div className="h-px flex-1 bg-slate-100 group-hover:bg-teal-600/20 transition-all duration-700" />
                        </div>
                        
                        <h2 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight group-hover:text-teal-600 transition-colors">
                          {section.heading}
                        </h2>
                        
                        <p className="text-slate-600 leading-[1.9] text-lg">
                          {section.body}
                        </p>
                      </div>
                    </div>
                  </RevealOnScroll>
                ))}
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
                    <p className="text-xl font-bold text-white mb-2">{post.author}</p>
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
                  <button onClick={() => navigator.share?.({ title: post.title, url: window.location.href })} className="flex items-center space-x-2 px-5 py-2.5 bg-slate-50 rounded-full text-slate-500 hover:bg-teal-50 hover:text-teal-600 transition-all text-xs font-black uppercase tracking-widest border border-slate-100">
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
            <aside className="flex-1 space-y-8 lg:max-w-xs xl:max-w-sm">

              {/* Table of Contents */}
              <RevealOnScroll direction="right">
                <div className="bg-slate-50 rounded-[32px] p-8 border border-slate-100 sticky top-24">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center">
                    <BookOpen className="w-3.5 h-3.5 mr-2 text-teal-500" />Table of Contents
                  </h4>
                  <nav className="space-y-1">
                    {post.content.map((section, i) => (
                      <a key={i} href={`#section-${i}`} className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:bg-white hover:text-teal-600 hover:shadow-sm transition-all group">
                        <span className="text-[10px] font-black text-slate-300 group-hover:text-teal-500 mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                        <span className="leading-tight line-clamp-2">{section.heading}</span>
                      </a>
                    ))}
                  </nav>
                </div>
              </RevealOnScroll>

              {/* CTA Card */}
              <RevealOnScroll direction="right">
                <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-[32px] p-8 text-white space-y-6 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold tracking-tight leading-tight">Ready to Launch Your Brand?</h3>
                    <p className="text-teal-100 mt-3 text-sm leading-relaxed">
                      Get a free consultation with our experts today.
                    </p>
                  </div>
                  <Link href="/contact" className="flex items-center justify-between w-full px-6 py-4 bg-white text-teal-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-950 hover:text-white transition-all group relative z-10">
                    <span>Get Free Quote</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </RevealOnScroll>

              {/* Related Posts */}
              <RevealOnScroll direction="right">
                <div className="space-y-5">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Related Articles</h4>
                  {related.map((rel, i) => (
                    <Link key={i} href={`/blog/${rel.slug}`} className="flex items-start space-x-4 group p-3 rounded-2xl hover:bg-slate-50 transition-all">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                        <Image src={rel.image} alt={rel.title} fill sizes="80px" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-widest text-teal-600 mb-1">{rel.category}</p>
                        <p className="text-sm font-bold text-slate-900 group-hover:text-teal-600 transition-colors leading-tight line-clamp-2">{rel.title}</p>
                        <p className="text-[10px] text-slate-400 font-bold mt-1.5 uppercase tracking-widest">{rel.date}</p>
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
