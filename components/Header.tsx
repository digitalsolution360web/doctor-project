"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X, Phone, Mail, MapPin } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Categories", href: "/categories" },
    { name: "Infrastructure", href: "/infrastructure" },
    { name: "R&D Lab", href: "/lab" },
    { name: "Certifications", href: "/certifications" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className={`hidden lg:block bg-slate-950 text-white transition-all duration-500 ${scrolled ? "h-0 opacity-0 overflow-hidden" : "py-3"}`}>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between text-[13px] font-bold tracking-widest">
          <div className="flex items-center space-x-10">
            <a href="tel:+918826862154" className="flex items-center hover:text-teal-400 transition-all opacity-90 hover:opacity-100 group">
              <div className="w-6 h-6 rounded-full bg-teal-500/10 flex items-center justify-center mr-2 group-hover:bg-teal-500 transition-colors">
                <Phone className="w-3 h-3 text-teal-400 group-hover:text-white" />
              </div>
              +91-8826862154
            </a>
            <a href="mailto:info@midfloraherbal.com" className="flex items-center hover:text-teal-400 transition-all opacity-90 hover:opacity-100 group">
              <div className="w-6 h-6 rounded-full bg-teal-500/10 flex items-center justify-center mr-2 group-hover:bg-teal-500 transition-colors">
                <Mail className="w-3 h-3 text-teal-400 group-hover:text-white" />
              </div>
              info@midfloraherbal.com
            </a>
          </div>
          <div className="flex items-center opacity-90">
            <MapPin className="w-3 h-3 mr-2 text-teal-400" />
            Noida, Uttar Pradesh
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`fixed left-0 w-full z-50 transition-all duration-700 ${scrolled
          ? "top-0 bg-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] py-5"
          : "top-4 lg:top-12 bg-transparent py-0"
          }`}
      >
        <div className={`container mx-auto px-4 md:px-6 transition-all duration-700 ${!scrolled ? "bg-white backdrop-blur-xl rounded-2xl border border-white/10 py-3 shadow-2xl w-[calc(100%-2rem)] lg:w-full" : ""}`}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="relative h-14 w-56 transition-transform group-hover:scale-105 duration-500">
                <Image
                  src="/logo.webp"
                  alt="Midflora Herbal Logo"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, 224px"
                />
              </div>
            </Link>

            <div className="hidden lg:flex items-center space-x-8">
              {/* Desktop Nav */}
              <nav className="flex items-center space-x-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-3 font-bold text-[15px] tracking-normal whitespace-nowrap transition-all relative group text-slate-700 hover:text-teal-600`}
                  >
                    {link.name}
                    <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
                  </Link>
                ))}
              </nav>

              {/* Actions */}
              <div className="flex items-center space-x-4 border-l border-slate-200 pl-6">
                <Link
                  href="/quote"
                  className="px-8 py-3 font-semibold text-[13px] tracking-wide rounded-full transition-all duration-500 hover:-translate-y-1 active:scale-95 bg-teal-600 text-white shadow-[0_10px_30px_-10px_rgba(20,184,166,0.5)] hover:bg-slate-950 hover:shadow-slate-900/20"
                >
                  Enquire Now
                </Link>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 rounded-xl transition-all text-slate-900 bg-slate-100 hover:bg-slate-200"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        <div
          className={`lg:hidden fixed inset-0 top-0 bg-white z-[60] transition-all duration-700 transform ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            }`}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 flex items-center justify-between border-b border-slate-50">
              <div className="relative h-10 w-40">
                <Image src="/logo.webp" alt="Logo" fill className="object-contain" sizes="(max-width: 768px) 160px, 160px" />
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 bg-slate-100 rounded-xl text-slate-900">
                <X className="w-7 h-7" />
              </button>
            </div>
            <nav className="flex flex-col p-8 space-y-2 overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-black text-slate-900 py-4 flex items-center justify-between tracking-tighter border-b border-slate-50 last:border-0"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                  <ChevronDown className="w-6 h-6 -rotate-90 text-teal-500" />
                </Link>
              ))}
              <div className="pt-10 space-y-6">
                <Link
                  href="/quote"
                  className="w-full py-5 text-center bg-teal-600 text-white rounded-2xl font-black text-base tracking-widest block"
                  onClick={() => setIsOpen(false)}
                >
                  Start Consultation
                </Link>
                <div className="grid grid-cols-1 gap-4 pt-6">
                  <p className="flex items-center text-xs font-bold tracking-widest text-slate-500 bg-slate-50 p-4 rounded-xl">
                    <Phone className="w-4 h-4 mr-3 text-teal-500" /> +91-8826862154
                  </p>
                  <p className="flex items-center text-xs font-bold tracking-widest text-slate-500 bg-slate-50 p-4 rounded-xl">
                    <Mail className="w-4 h-4 mr-3 text-teal-500" /> info@midfloraherbal.com
                  </p>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;


