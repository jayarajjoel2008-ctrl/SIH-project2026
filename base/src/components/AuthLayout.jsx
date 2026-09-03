import React from "react";
import { Link } from "react-router-dom";
import { Brain } from "lucide-react";

export default function AuthLayout({ icon: Icon, title, subtitle = undefined, footer = undefined, children }) {
  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-[#EEF2F8] text-[#1E1B4B] px-4 py-8 font-sans selection:bg-[#4E36E2] selection:text-white relative overflow-hidden">
      {/* Soft Background Halos */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Top Brand Link */}
      <Link to="/home" className="flex items-center gap-3 z-10 mb-4 group">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FFA07A] via-[#FF8C68] to-[#4E36E2] flex items-center justify-center text-white shadow-soft-purple group-hover:scale-105 transition">
          <Brain className="w-5 h-5" />
        </div>
        <span className="font-black text-xl text-[#1E1B4B] tracking-tight">MindPluze</span>
      </Link>

      <div className="w-full max-w-md z-10 my-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FFA07A] via-[#FF8C68] to-[#4E36E2] text-white shadow-soft-purple mb-3">
            <Icon className="w-6 h-6" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-[#1E1B4B]">{title}</h1>
          {subtitle && <p className="text-xs text-[#8E95B2] font-semibold mt-1">{subtitle}</p>}
        </div>

        <div className="bg-white rounded-3xl shadow-soft-lg border border-white/80 p-7 sm:p-8">
          {children}
        </div>

        {footer && (
          <p className="text-center text-xs text-[#8E95B2] font-semibold mt-6">{footer}</p>
        )}
      </div>

      <div className="text-center text-[11px] text-[#8E95B2] font-semibold z-10 mt-6">
        Protected under National Helpline Against Atrocities (14566)
      </div>
    </div>
  );
}
