"use client";

import React, { useState } from "react";
import { Plus, Minus, HelpCircle, ArrowRight, MessageSquare } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "Do you provide third-party cosmetic manufacturing?",
    answer: "Yes, we provide complete third-party and private label cosmetic manufacturing solutions across multiple product categories."
  },
  {
    question: "Can you create custom formulations?",
    answer: "Absolutely. Our R&D team specializes in customized formulations based on your brand requirements and target market."
  },
  {
    question: "What is your manufacturing capacity?",
    answer: "Our facility has a monthly manufacturing capacity of over 180 tons with advanced automated filling systems."
  },
  {
    question: "Is your manufacturing facility hygienic?",
    answer: "Yes. Our infrastructure is based on a clean-room manufacturing concept ensuring hygienic and contamination-free production."
  },
  {
    question: "Do you support startup cosmetic brands?",
    answer: "Yes, we work with startups, emerging brands, and established companies by offering flexible manufacturing solutions."
  },
  {
    question: "Which cosmetic categories do you manufacture?",
    answer: "We manufacture skincare, haircare, body care, baby care, men’s grooming, derma cosmetics, sunscreens, intimate hygiene products, dental care, and more."
  },
  {
    question: "Do you provide packaging support?",
    answer: "Yes, we assist with packaging selection, filling, labeling, and complete product presentation support."
  },
  {
    question: "Why choose MIDFLORA HERBAL LLP?",
    answer: "Because we combine advanced manufacturing infrastructure, strong R&D capabilities, hygienic production standards, and scalable capacities to help brands build successful cosmetic products."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-8 bg-white flex justify-center relative overflow-hidden font-sans">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center">
          {/* Header */}
          <div className="w-full text-center mb-10">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-600 font-bold text-[10px] md:text-xs tracking-widest mb-3 md:mb-4">
              <HelpCircle className="w-3 md:w-3.5 h-3 md:h-3.5 mr-2" />
              Information Hub
            </div>
            <h3 className="text-2xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-[1.1] mb-3 md:mb-4">
              Frequently <br className="hidden md:block" />
              <span className="text-teal-600">Asked Questions</span>
            </h3>
          </div>

          {/* Accordion */}
          <div className="max-w-4xl w-full space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`group border rounded-[24px] transition-all duration-500 ${openIndex === i
                  ? "bg-white border-teal-100 shadow-xl shadow-teal-500/5"
                  : "bg-white border-slate-100 hover:border-slate-200"
                  }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className={`w-full px-4 md:px-6 py-4 md:py-6 flex items-center justify-between text-left transition-all duration-500 ${openIndex === i ? "border-l-4 border-teal-600 pl-3 md:pl-5" : ""
                    }`}
                >
                  <span className={`text-base md:text-xl font-extrabold tracking-tight transition-colors duration-300 ${openIndex === i ? "text-teal-600" : "text-slate-900"
                    }`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all duration-500 shrink-0 ${openIndex === i ? "bg-teal-600 text-white rotate-180" : "bg-slate-50 text-slate-400"
                    }`}>
                    {openIndex === i ? <Minus className="w-4 h-4 md:w-5 md:h-5" /> : <Plus className="w-4 h-4 md:w-5 md:h-5" />}
                  </div>
                </button>

                <div
                  className={`transition-all duration-500 ease-in-out px-4 md:px-8 overflow-hidden ${openIndex === i ? "max-h-[500px] pb-6 md:pb-8 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                  <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
