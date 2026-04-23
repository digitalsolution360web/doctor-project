"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X, Phone, Mail, MapPin, Search, Globe } from "lucide-react";

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
    { name: "Textures", href: "/textures" },
    { name: "Our Lab", href: "/lab" },
    { name: "Certifications", href: "/certifications" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className={`hidden lg:block bg-slate-950 text-white transition-all duration-500 ${scrolled ? "h-0 opacity-0 overflow-hidden" : "py-2.5"}`}>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between text-xs font-bold uppercase tracking-widest">
          <div className="flex items-center space-x-10">
            <a href="tel:+918826862154" className="flex items-center hover:text-teal-400 transition-all opacity-90 hover:opacity-100 group">
              <div className="w-6 h-6 rounded-full bg-teal-500/10 flex items-center justify-center mr-2 group-hover:bg-teal-500 transition-colors">
                <Phone className="w-3 h-3 text-teal-400 group-hover:text-white" />
              </div>
              +91-8826862154
            </a>
            <a href="mailto:sales@drexpertformulation.com" className="flex items-center hover:text-teal-400 transition-all opacity-90 hover:opacity-100 group">
              <div className="w-6 h-6 rounded-full bg-teal-500/10 flex items-center justify-center mr-2 group-hover:bg-teal-500 transition-colors">
                <Mail className="w-3 h-3 text-teal-400 group-hover:text-white" />
              </div>
              sales@drexpertformulation.com
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
          : "top-0 lg:top-12 bg-transparent py-6 lg:py-0"
          }`}
      >
        <div className={`container mx-auto px-4 md:px-6 transition-all duration-700 ${!scrolled && "lg:bg-white lg:backdrop-blur-xl lg:rounded-2xl lg:border lg:border-white/10 lg:py-3 shadow-2xl"}`}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="relative h-14 w-56 transition-transform group-hover:scale-105 duration-500">
                <Image
                  src="/logo.webp"
                  alt="Dr Expert Formulation Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-6 py-3 font-black text-[15px] uppercase tracking-tighter transition-all relative group ${scrolled ? "text-slate-950" : "text-black"
                    }`}
                >
                  {link.name}
                  <span className="absolute bottom-1 left-6 right-6 h-0.5 bg-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden lg:flex items-center space-x-5">
              <button className={`p-2 transition-colors ${scrolled ? "text-slate-900" : "text-white opacity-80 hover:opacity-100"}`}>
                <Search className="w-5 h-5" />
              </button>
              <Link
                href="/quote"
                className="px-8 py-3 bg-teal-600 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-slate-950 transition-all duration-500 shadow-xl hover:-translate-y-1 active:scale-95"
              >
                Get a Quote
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className={`lg:hidden p-2 rounded-xl transition-all ${scrolled || isOpen ? "text-slate-900 bg-slate-100" : "text-white bg-white/10 backdrop-blur-md"
                }`}
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
                <Image src="/logo.webp" alt="Logo" fill className="object-contain" />
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
                  className="text-2xl font-black text-slate-900 py-4 flex items-center justify-between uppercase tracking-tighter border-b border-slate-50 last:border-0"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                  <ChevronDown className="w-6 h-6 -rotate-90 text-teal-500" />
                </Link>
              ))}
              <div className="pt-10 space-y-6">
                <Link
                  href="/quote"
                  className="w-full py-5 text-center bg-teal-600 text-white rounded-2xl font-black text-base uppercase tracking-widest shadow-2xl block"
                  onClick={() => setIsOpen(false)}
                >
                  Start Consultation
                </Link>
                <div className="grid grid-cols-1 gap-4 pt-6">
                  <p className="flex items-center text-xs font-bold uppercase tracking-widest text-slate-500 bg-slate-50 p-4 rounded-xl">
                    <Phone className="w-4 h-4 mr-3 text-teal-500" /> +91-8826862154
                  </p>
                  <p className="flex items-center text-xs font-bold uppercase tracking-widest text-slate-500 bg-slate-50 p-4 rounded-xl">
                    <Mail className="w-4 h-4 mr-3 text-teal-500" /> sales@drexpert.com
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


