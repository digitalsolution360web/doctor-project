"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ChevronRight, Globe, Shield, Star, Award } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#05080f] text-white pt-24 pb-12 relative overflow-hidden">
      {/* Premium Gradient Overlays */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-600/5 rounded-full blur-[120px] -translate-x-1/4 translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          {/* Brand & Mission */}
          <div className="lg:col-span-4 space-y-10">
            <Link href="/" className="inline-block group">
              <div className="relative h-16 w-64 transition-all duration-700 transform group-hover:scale-105 bg-white p-4 rounded-2xl shadow-[0_20px_50px_-15px_rgba(20,184,166,0.3)]">
                <Image
                  src="/logo.webp"
                  alt="Midflora Herbal"
                  fill
                  className="object-contain px-2"
                  sizes="(max-width: 768px) 256px, 256px"
                />
              </div>
            </Link>
            <p className="text-slate-400 leading-relaxed text-lg font-medium max-w-sm">
              India's trusted third-party cosmetic manufacturer. Premium herbal & dermatologically tested products delivered from concept to market.
            </p>
            <div className="flex items-center space-x-4">
              {[
                { icon: FaFacebook, href: "#", color: "hover:bg-[#1877F2]" },
                { icon: FaInstagram, href: "#", color: "hover:bg-[#E4405F]" },
                { icon: FaLinkedin, href: "#", color: "hover:bg-[#0A66C2]" },
                { icon: FaTwitter, href: "#", color: "hover:bg-[#1DA1F2]" }
              ].map((social, i) => (
                <Link 
                  key={i} 
                  href={social.href} 
                  className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 ${social.color} hover:-translate-y-2 group shadow-2xl overflow-hidden relative`}
                >
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <social.icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors relative z-10" />
                </Link>
              ))}
            </div>
          </div>

          {/* Corporate Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-black mb-12 uppercase tracking-[0.4em] text-teal-500 flex items-center">
              <div className="w-2 h-2 rounded-full bg-teal-500 mr-4"></div>
              Corporate
            </h4>
            <ul className="space-y-5">
              {[
                { name: "Home", href: "/" },
                { name: "Manufacturing", href: "/services" },
                { name: "Research Lab", href: "/lab" },
                { name: "Infrastructure", href: "/infrastructure" },
                { name: "Certifications", href: "/certifications" },
                { name: "Our Blog", href: "/blog" },
                { name: "Contact Center", href: "/quote" }
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-slate-400 hover:text-white transition-all flex items-center group text-xs font-bold uppercase tracking-[0.15em]">
                    <span className="w-0 group-hover:w-5 h-px bg-teal-500 mr-0 group-hover:mr-3 transition-all duration-500"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-5">
            <h4 className="text-xs font-black mb-12 uppercase tracking-[0.4em] text-teal-500 flex items-center">
              <div className="w-2 h-2 rounded-full bg-teal-500 mr-4"></div>
              Global Headquarters
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="space-y-8">
                <div className="flex items-start space-x-5 group">
                  <div className="mt-1 w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center shrink-0 border border-teal-500/20 group-hover:bg-teal-500 transition-all duration-700">
                    <MapPin className="w-5 h-5 text-teal-500 group-hover:text-white" />
                  </div>
                  <p className="text-slate-300 text-sm font-bold leading-relaxed">
                    G-56, Sector-6, Noida,<br />
                    UP, India 201301
                  </p>
                </div>
                <div className="flex items-start space-x-5 group">
                  <div className="mt-1 w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center shrink-0 border border-teal-500/20 group-hover:bg-teal-500 transition-all duration-700">
                    <Phone className="w-5 h-5 text-teal-500 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-teal-400 font-black text-xl tracking-tighter group-hover:text-teal-300 transition-colors">+91-8826862154</p>
                    <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mt-1">24/7 Priority Support</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-start space-x-5 group">
                  <div className="mt-1 w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center shrink-0 border border-teal-500/20 group-hover:bg-teal-500 transition-all duration-700">
                    <Mail className="w-5 h-5 text-teal-500 group-hover:text-white" />
                  </div>
                  <p className="text-slate-300 text-sm font-bold truncate">info@midfloraherbal.com</p>
                </div>
                <div className="flex items-start space-x-5 group">
                  <div className="mt-1 w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center shrink-0 border border-teal-500/20 group-hover:bg-teal-500 transition-all duration-700">
                    <Clock className="w-5 h-5 text-teal-500 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-slate-300 text-sm font-bold">10:00 - 05:30</p>
                    <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mt-1">Mon - Sat Working</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
          <div className="flex items-center space-x-3 group">
            <Shield className="w-5 h-5 text-teal-500/40 group-hover:text-teal-500 transition-colors" />
            <p>© {new Date().getFullYear()} Midflora Herbal. Premium Cosmetic Manufacturing.</p>
          </div>
          <div className="flex items-center space-x-10">
            <Link href="#" className="hover:text-teal-400 transition-colors flex items-center">
              <Star className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



