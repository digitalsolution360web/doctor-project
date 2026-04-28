"use client";

import React, { useState } from "react";
import { Plus, Minus, HelpCircle, ArrowRight, MessageSquare } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "What is your Minimum Order Quantity (Moq)?",
    answer: "Our Moq depends on the product category, but we are known for offering some of the lowest Moqs in the industry to help startups grow and scale effectively without massive upfront costs."
  },
  {
    question: "Do you provide customized formulations?",
    answer: "Yes, our expert R&d team specializes in developing unique, high-performance formulations tailored to your specific brand requirements and market trends."
  },
  {
    question: "How long does the manufacturing process take?",
    answer: "Typically, the process takes 30-45 days from formulation approval to final dispatch, depending on order size and complexity. We prioritize speed without compromising quality."
  },
  {
    question: "Are your products certified?",
    answer: "Yes, all our products are manufactured in Iso, Gmp, and Fda compliant facilities to ensure the highest quality and safety standards for your customers."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-8 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Side: Header */}
          <div className="lg:w-1/3">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-600 font-bold text-xs tracking-widest mb-4">
              <HelpCircle className="w-3.5 h-3.5 mr-2" />
              Information Hub
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
              Common <span className="text-teal-600">Questions</span>
            </h3>
            <p className="text-slate-500 text-base font-medium leading-relaxed mb-8">
              Everything you need to know about our process and services.
            </p>
            
            <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Need more help?</p>
                  <p className="text-slate-500 text-xs">Our team is available 24/7.</p>
                </div>
              </div>
              <Link 
                href="/quote"
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs tracking-widest flex items-center justify-center hover:bg-teal-600 transition-all group uppercase"
              >
                Contact Us
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Side: Accordion */}
          <div className="lg:w-2/3 space-y-4 w-full">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className={`group border rounded-[24px] transition-all duration-500 ${
                  openIndex === i 
                  ? "bg-white border-teal-100 shadow-xl shadow-teal-500/5" 
                  : "bg-white border-slate-100 hover:border-slate-200"
                }`}
              >
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className={`w-full px-5 py-4 flex items-center justify-between text-left transition-all duration-500 ${
                    openIndex === i ? "border-l-4 border-teal-600 pl-4" : ""
                  }`}
                >
                  <span className={`text-lg font-bold tracking-tight transition-colors duration-300 ${
                    openIndex === i ? "text-teal-600" : "text-slate-900"
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-500 shrink-0 ${
                    openIndex === i ? "bg-teal-600 text-white rotate-180" : "bg-slate-100 text-slate-400"
                  }`}>
                    {openIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                
                <div 
                  className={`transition-all duration-500 ease-in-out px-6 overflow-hidden ${
                    openIndex === i ? "max-h-60 pb-6 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-slate-500 text-base font-medium leading-relaxed">
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
