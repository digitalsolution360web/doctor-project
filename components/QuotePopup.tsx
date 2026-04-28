import React, { useEffect } from 'react';
import { X, Send, User, Mail, Phone, Building, FileText } from 'lucide-react';

interface QuotePopupProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

const QuotePopup: React.FC<QuotePopupProps> = ({ isOpen, onClose, productName }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-xl bg-white rounded-[20px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        <div className="p-8 sm:p-12 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 pr-12 leading-tight tracking-tight">
            {productName ? `Quote for ${productName}` : 'Get a Custom Quote'}
          </h2>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 outline-none transition-all text-sm font-medium text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Company</label>
                <div className="relative">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Your Company"
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 outline-none transition-all text-sm font-medium text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 outline-none transition-all text-sm font-medium text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 outline-none transition-all text-sm font-medium text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Requirements</label>
              <div className="relative">
                <FileText className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                <textarea
                  rows={3}
                  placeholder="Tell us about your estimated quantity, formulation needs, etc."
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 outline-none transition-all text-sm font-medium text-slate-900 placeholder:text-slate-400 resize-none"
                ></textarea>
              </div>
            </div>

            <button className="w-full py-4.5 bg-teal-600 text-white rounded-2xl font-black text-sm tracking-widest hover:bg-slate-950 transition-all shadow-xl shadow-teal-600/20 flex items-center justify-center group mt-4 uppercase">
              Submit Request
              <Send className="ml-3 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuotePopup;
