"use client";

import React, { useState } from "react";
import { X, Send, MessageSquare } from "lucide-react";

interface EnquiryPopupProps {
  onClose: () => void;
}

const EnquiryPopup = ({ onClose }: EnquiryPopupProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    product: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2500);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg bg-[#0b1220] border border-teal-500/20 rounded-3xl shadow-[0_0_80px_-20px_rgba(20,184,166,0.4)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "popupIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards" }}
      >
        {/* Top gradient bar */}
        <div className="h-1 w-full bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-600" />

        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-white/5">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-300 group"
          >
            <X className="w-4 h-4 text-slate-400 group-hover:text-red-400" />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white tracking-tight">Quick Enquiry</h3>
              <p className="text-slate-400 text-sm">We&apos;ll get back to you within 24 hours</p>
            </div>
          </div>
        </div>

        {/* Form / Success */}
        <div className="px-6 py-4">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center">
                <Send className="w-7 h-7 text-teal-400" />
              </div>
              <h4 className="text-lg font-black text-white">Enquiry Sent!</h4>
              <p className="text-slate-400 text-sm max-w-xs">
                Thank you for reaching out. Our team will contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black tracking-widest text-teal-500 uppercase">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:bg-teal-500/5 transition-all duration-300"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black tracking-widest text-teal-500 uppercase">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:bg-teal-500/5 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black tracking-widest text-teal-500 uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:bg-teal-500/5 transition-all duration-300"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black tracking-widest text-teal-500 uppercase">
                  Product / Service Interest
                </label>
                <select
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-teal-500/50 focus:bg-teal-500/5 transition-all duration-300"
                  style={{ colorScheme: "dark" }}
                >
                  <option value="" className="bg-[#0b1220]">Select a category...</option>
                  <option value="skincare" className="bg-[#0b1220]">Skincare Products</option>
                  <option value="haircare" className="bg-[#0b1220]">Haircare Products</option>
                  <option value="herbal" className="bg-[#0b1220]">Herbal Formulations</option>
                  <option value="private-label" className="bg-[#0b1220]">Private Label Manufacturing</option>
                  <option value="other" className="bg-[#0b1220]">Other</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black tracking-widest text-teal-500 uppercase">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Tell us about your requirements..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:bg-teal-500/5 transition-all duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-black text-sm tracking-widest py-4 rounded-xl transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(20,184,166,0.6)] hover:-translate-y-0.5 flex items-center justify-center gap-3"
              >
                <Send className="w-4 h-4" />
                SEND ENQUIRY
              </button>
            </form>
          )}
        </div>

        {/* Decorative glow */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
      </div>

      <style jsx global>{`
        @keyframes popupIn {
          from {
            opacity: 0;
            transform: scale(0.85) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default EnquiryPopup;
