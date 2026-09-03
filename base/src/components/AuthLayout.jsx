import React from "react";

export default function AuthLayout({ icon: Icon, title, subtitle = undefined, footer = undefined, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EEF2F8] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#4E36E2] text-white mb-4 shadow-md shadow-purple-900/20">
            <Icon className="w-7 h-7 text-white" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-[#1E1B4B]">{title}</h1>
          {subtitle && <p className="text-slate-500 text-sm mt-1.5">{subtitle}</p>}
        </div>
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/70 p-8">
          {children}
        </div>
        {footer && (
          <p className="text-center text-sm text-slate-500 mt-6">{footer}</p>
        )}
      </div>
    </div>
  );
}
