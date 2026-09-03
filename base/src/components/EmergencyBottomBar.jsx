import React from "react";
import { Phone, ShieldAlert } from "lucide-react";

export default function EmergencyBottomBar() {
  return (
    <div className="bg-[#1E1B4B] text-white text-xs font-bold py-2 shadow-sm border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
        <span className="flex items-center gap-1.5 text-orange-300">
          <ShieldAlert className="w-3.5 h-3.5 text-[#FF8C68]" />
          <span>24/7 Emergency Helplines:</span>
        </span>
        <a href="tel:14566" className="hover:text-orange-300 transition flex items-center gap-1">
          <Phone className="w-3 h-3 text-[#FFA07A]" /> 14566 (NHAA)
        </a>
        <span className="opacity-40">|</span>
        <a href="tel:100" className="hover:text-orange-300 transition">
          Police: 100
        </a>
        <span className="opacity-40">|</span>
        <a href="tel:108" className="hover:text-orange-300 transition">
          Medical: 108
        </a>
      </div>
    </div>
  );
}
