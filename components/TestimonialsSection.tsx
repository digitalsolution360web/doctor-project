"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

const testimonials = [
  {
    name: "Aman Sharma",
    role: "Founder, Glow & Co",
    content: "The quality of formulations and the speed of manufacturing is simply unmatched. They helped us scale our brand from 100 to 10,000 units seamlessly.",
    rating: 5,
    initials: "AS",
    color: "bg-teal-500"
  },
  {
    name: "Priya Verma",
    role: "CEO, Nature's Best",
    content: "Their R&D team is incredibly knowledgeable. They took our concept and turned it into a market-ready product that our customers absolutely love.",
    rating: 5,
    initials: "PV",
    color: "bg-teal-600"
  },
  {
    name: "Rahul Mehra",
    role: "Director, Skin Science",
    content: "Professional, reliable, and transparent. The private labeling process was smooth, and the packaging support was top-notch.",
    rating: 5,
    initials: "RM",
    color: "bg-slate-900"
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="py-16 bg-[#fafafa] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 opacity-40"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-600 font-bold text-xs tracking-widest mb-4">
            <Star className="w-3.5 h-3.5 mr-2 fill-teal-600" />
            Client Success Stories
          </div>
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Trusted By The <span className="text-teal-600">Industry Leaders</span>
          </h3>
        </div>

        <div className="max-w-5xl mx-auto relative group">
          {/* Main Slider Content */}
          <div className="relative overflow-hidden rounded-[50px] bg-white border border-slate-100 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.1)]">
            <div 
              className="flex transition-transform duration-1000 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div key={i} className="w-full shrink-0 p-8 lg:p-16">
                  <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Left Side: Avatar & Info */}
                    <div className="lg:w-1/3 flex flex-col items-center text-center">
                      <div className={`w-24 h-24 lg:w-32 lg:h-32 rounded-[32px] ${t.color} flex items-center justify-center text-white font-black text-3xl lg:text-4xl shadow-2xl mb-6 transform group-hover:scale-105 transition-transform duration-500`}>
                        {t.initials}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-slate-900 font-black text-xl lg:text-2xl tracking-tight">{t.name}</p>
                        <CheckCircle2 className="w-5 h-5 text-teal-500" />
                      </div>
                      <p className="text-slate-500 font-bold tracking-tight uppercase text-xs">{t.role}</p>
                    </div>

                    {/* Right Side: Quote */}
                    <div className="lg:w-2/3 relative">
                      <Quote className="absolute -top-10 -left-6 w-20 h-20 text-teal-50 opacity-10" />
                      <div className="flex gap-1 mb-6">
                        {[...Array(t.rating)].map((_, idx) => (
                          <Star key={idx} className="w-5 h-5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-slate-600 text-xl lg:text-2xl leading-relaxed font-medium italic relative z-10">
                        "{t.content}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 transition-all duration-500 rounded-full ${
                    currentIndex === i ? "w-8 bg-teal-600" : "w-2 bg-slate-200"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 -left-6 -translate-y-1/2 w-14 h-14 bg-white rounded-2xl shadow-xl border border-slate-100 flex items-center justify-center text-slate-900 hover:bg-teal-600 hover:text-white transition-all transform hover:scale-110 active:scale-95 hidden lg:flex"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 -right-6 -translate-y-1/2 w-14 h-14 bg-white rounded-2xl shadow-xl border border-slate-100 flex items-center justify-center text-slate-900 hover:bg-teal-600 hover:text-white transition-all transform hover:scale-110 active:scale-95 hidden lg:flex"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
