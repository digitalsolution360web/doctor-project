"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  ArrowRight
} from "lucide-react";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children, className = "", direction = "up" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const animationClass = isVisible
    ? direction === "left" ? "animate-reveal-left"
      : direction === "right" ? "animate-reveal-right"
        : "animate-fade-up"
    : "opacity-0";

  return (
    <div ref={ref} className={`${className} ${animationClass}`}>
      {children}
    </div>
  );
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    product_type: "Skincare (Serums, Face Wash)",
    qty: "",
    message: "",
  });

  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
  }>({});

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors: {
      name?: string;
      phone?: string;
    } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10 digit mobile number";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      alert("Form submitted successfully");

      setFormData({
        name: "",
        company: "",
        phone: "",
        email: "",
        product_type: "Skincare (Serums, Face Wash)",
        qty: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to submit form");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/banner1.webp"
            alt="Contact Us"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <RevealOnScroll className="max-w-3xl space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase leading-none">
              Contact <span className="text-teal-400">Us.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl font-bold leading-relaxed">
              Ready to start your brand? Fill out the form below and our experts will get back to you within 24 hours.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-16">

            {/* Form Section */}
            <div className="flex-[1.5]">
              <RevealOnScroll className="bg-white rounded-[48px] p-8 md:p-16 shadow-2xl border border-slate-100">
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">
                        Full Name *
                      </label>

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="w-full px-8 py-5 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:border-teal-500 font-bold"
                      />

                      {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name}</p>
                      )}
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Brand Name</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Brand / Company"
                        className="w-full px-8 py-5 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:border-teal-500 font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">
                        Phone Number *
                      </label>

                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="9876543210"
                        maxLength={10}
                        className="w-full px-8 py-5 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:border-teal-500 font-bold"
                      />

                      {errors.phone && (
                        <p className="text-red-500 text-sm">{errors.phone}</p>
                      )}
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@email.com"
                        className="w-full px-8 py-5 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:border-teal-500 font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Product Type</label>
                      <select
                        name="product_type"
                        value={formData.product_type}
                        onChange={handleChange}
                        className="w-full px-8 py-5 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:border-teal-500 font-bold appearance-none"
                      >
                        <option>Skincare (Serums, Face Wash)</option>
                        <option>Haircare (Oils, Shampoos)</option>
                        <option>Herbal Products</option>
                        <option>Men's Grooming</option>
                        <option>Bath & Body</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Quantity Required</label>
                      <input
                        type="number"
                        name="qty"
                        value={formData.qty}
                        onChange={handleChange}
                        placeholder="Expected MOQ"
                        className="w-full px-8 py-5 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:border-teal-500 font-bold"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Message / Brand Vision</label>
                    <textarea
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your product requirements..."
                      className="w-full px-8 py-5 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:border-teal-500 font-bold resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-6 bg-slate-950 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.3em] hover:bg-teal-600 transition-all shadow-2xl flex items-center justify-center space-x-3 disabled:opacity-50"
                  >
                    <span>
                      {loading ? "Submitting..." : "Submit Requirement"}
                    </span>

                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </RevealOnScroll>
            </div>

            {/* Contact Info Sidebar */}
            <div className="flex-1 space-y-10">
              <RevealOnScroll className="bg-slate-900 rounded-[48px] p-10 text-white space-y-12">
                <h3 className="text-2xl font-semibold uppercase tracking-tighter">Contact <span className="text-teal-400">Details.</span></h3>

                <div className="space-y-8">
                  <div className="flex items-start space-x-6 group cursor-pointer">
                    <div className="w-12 h-12 bg-teal-500/10 border border-teal-500/20 rounded-2xl flex items-center justify-center text-teal-400 group-hover:bg-teal-600 group-hover:text-white transition-all">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Call Us</p>
                      <p className="font-bold text-lg">+91-789528 0742</p>
                      {/* <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Call Us</p> */}
                      <p className="font-bold text-lg">+91-81307 08357</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6 group cursor-pointer">
                    <div className="w-12 h-12 bg-teal-500/10 border border-teal-500/20 rounded-2xl flex items-center justify-center text-teal-400 group-hover:bg-teal-600 group-hover:text-white transition-all">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Email Us</p>
                      <p className="font-bold text-lg">midfloraherbal@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6 group cursor-pointer">
                    <div className="w-12 h-12 bg-teal-500/10 border border-teal-500/20 rounded-2xl flex items-center justify-center text-teal-400 group-hover:bg-teal-600 group-hover:text-white transition-all">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Visit Factory</p>
                      <p className="font-bold text-lg leading-tight">Plot No. 517, Udyog Kendra 2,<br />Ecotech III, Greater Noida,<br />UP 201306</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6 group cursor-pointer">
                    <div className="w-12 h-12 bg-teal-500/10 border border-teal-500/20 rounded-2xl flex items-center justify-center text-teal-400 group-hover:bg-teal-600 group-hover:text-white transition-all">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Working Hours</p>
                      <p className="font-bold text-lg">10:00 – 05:30</p>
                      <p className="text-slate-400 text-sm font-bold">Mon – Sat Working</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10 space-y-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Support</p>
                  <Link href="https://wa.me/918826862154" className="flex items-center justify-between p-6 bg-teal-600 rounded-[32px] group hover:bg-white hover:text-slate-950 transition-all">
                    <div className="flex items-center space-x-4">
                      <MessageSquare className="w-6 h-6" />
                      <span className="font-black uppercase tracking-widest text-sm">WhatsApp Chat</span>
                    </div>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </RevealOnScroll>

              <RevealOnScroll direction="up" className="bg-teal-600 rounded-[40px] p-10 flex items-center space-x-6 text-white">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="font-black uppercase tracking-tight">Factory Location</p>
                  <p className="text-teal-100 font-bold text-sm">Greater Noida, Uttar Pradesh</p>
                </div>
              </RevealOnScroll>
            </div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-10">

            <RevealOnScroll className="relative h-[500px] w-full rounded-[20px] overflow-hidden border border-white border-5 shadow-2xl ">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.240179168982!2d77.4665237!3d28.532499699999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce9b9d3be8473%3A0x22037284f6ce882!2sMidFlora%20Herbal%20LLP!5e0!3m2!1sen!2sin!4v1781162831376!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>

              {/* Optional: Add a subtle overlay or info card on hover if needed, 
                  but usually users just want to interact with the map. 
                  Adding a small floating badge can look premium. */}
              <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/20 hidden md:block group-hover:translate-y-[-10px] transition-transform duration-500">
                <p className="text-[10px] font-black uppercase tracking-widest text-teal-600 mb-1">Our Location</p>
                <h4 className="font-bold text-slate-900">MidFlora Herbal LLP</h4>
                <p className="text-slate-500 text-xs font-bold mt-1">Udyog Kendra 2, Ecotech III,<br />Greater Noida, UP</p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}
