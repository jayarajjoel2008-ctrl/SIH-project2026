import React from "react";

export default function EmergencyBottomBar() {
  return (
    <div className="bg-[#FF5722] text-white text-xs sm:text-sm font-semibold tracking-wide py-2 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
        <a href="tel:14566" className="underline underline-offset-2 hover:opacity-90 font-bold">
          14566 (NHAA)
        </a>
        <span className="opacity-75 font-normal">|</span>
        <a href="tel:100" className="underline underline-offset-2 hover:opacity-90 font-bold">
          Police: 100
        </a>
        <span className="opacity-75 font-normal">|</span>
        <a href="tel:108" className="underline underline-offset-2 hover:opacity-90 font-bold">
          Medical: 108
        </a>
      </div>
    </div>
  );
}
