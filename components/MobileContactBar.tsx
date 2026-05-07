"use client";

import React from "react";
import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const MobileContactBar = () => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full z-[100] shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
      <div className="flex items-stretch h-15 bg-white">
        {/* Support Button */}
        <Link
          href="/contact"
          className="flex-[2] bg-teal-600 text-white flex items-center justify-center font-bold text-sm tracking-wide active:bg-teal-700 transition-colors"
        >
          Enquiry Now
        </Link>

        {/* WhatsApp Icon */}
        <a
          href="https://wa.me/918130708357"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center border-l border-slate-100 active:bg-slate-50 transition-colors"
        >
          <FaWhatsapp className="w-6 h-6 text-[#25D366]" />
        </a>

        {/* Phone Icon */}
        <a
          href="tel:+918130708357"
          className="flex-1 flex items-center justify-center border-l border-slate-100 active:bg-slate-50 transition-colors"
        >
          <Phone className="w-5 h-5 text-teal-600" />
        </a>
      </div>
    </div>
  );
};

export default MobileContactBar;
