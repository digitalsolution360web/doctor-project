import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <Link
      href="https://wa.me/1234567890" // Replace with your actual WhatsApp number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-full shadow-lg hover:bg-[#1ebd5a] transition-all duration-300 ease-in-out group animate-bounce hover:animate-none"
    >
      <div className="flex items-center justify-center bg-white/20 p-1 rounded-full group-hover:bg-white/30 transition-colors">
        <FaWhatsapp className="w-6 h-6 text-white" />
      </div>
      <span className="font-semibold text-sm md:text-base tracking-wide whitespace-nowrap">
        How can I help you?
      </span>
    </Link>
  );
}
