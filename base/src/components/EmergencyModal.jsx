import React from "react";
import { X, ShieldAlert, AlertTriangle } from "lucide-react";

export default function EmergencyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const helplines = [
    { name: "NHAA 24/7 Atrocities Helpline", num: "14566", desc: "Toll-free National Helpline Against Caste Atrocities" },
    { name: "Police Emergency Control Room", num: "100", desc: "Immediate police dispatch and emergency response" },
    { name: "National Emergency Ambulance", num: "108", desc: "Free emergency medical ambulance services" },
    { name: "Tele-MANAS Mental Health Helpline", num: "14416", desc: "24/7 Government psychological crisis intervention" },
    { name: "AASRA Suicide & Crisis Prevention", num: "9820466726", desc: "Confidential emotional support & active crisis relief" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-[32px] p-6 sm:p-8 shadow-soft-lg border border-slate-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-50 transition cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-full bg-orange-50 text-[#FF8C68] flex items-center justify-center shadow-xs">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-[#1E1B4B]">Emergency Crisis Support</h3>
            <p className="text-xs text-[#FF8C68] font-bold flex items-center gap-1 mt-0.5">
              <AlertTriangle className="w-3.5 h-3.5" /> 24/7 Toll-Free Immediate Helplines
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#8E95B2] font-medium mb-6 leading-relaxed">
          If you or someone around you is in immediate physical danger, experiencing severe threats, or in acute psychological distress, please connect directly below:
        </p>

        <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
          {helplines.map((h) => (
            <a
              key={h.num}
              href={`tel:${h.num.replace(/\s+/g, '')}`}
              className="flex items-center justify-between p-4 rounded-2xl border border-slate-200/80 hover:border-[#4E36E2] hover:shadow-soft transition group bg-[#F4F6FB] hover:bg-white"
            >
              <div>
                <p className="font-black text-[#1E1B4B] group-hover:text-[#4E36E2] transition text-sm">{h.name}</p>
                <p className="text-xs text-[#8E95B2] font-semibold mt-0.5">{h.desc}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xs text-rose-600 bg-rose-50 px-3.5 py-1.5 rounded-full group-hover:bg-[#4E36E2] group-hover:text-white transition shadow-xs">
                  📞 {h.num}
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-[#8E95B2] font-semibold">
          In partnership with Ministry of Social Justice & Empowerment, Govt. of India
        </div>
      </div>
    </div>
  );
}
