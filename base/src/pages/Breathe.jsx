import React from "react";
import SiteNav from "@/components/SiteNav";
import Chatbot from "@/components/Chatbot";
import BreatheSection from "@/components/BreatheSection";
import { ShieldCheck, Heart, Phone } from "lucide-react";

export default function Breathe() {
  return (
    <div className="min-h-screen bg-[#EEF2F8] text-[#1E1B4B] flex flex-col justify-between font-sans selection:bg-[#4E36E2] selection:text-white">
      <SiteNav />
      <Chatbot />

      <main className="flex-1 flex flex-col justify-center">
        <BreatheSection />

        {/* Supporting Grounding Benefit Cards */}
        <div className="max-w-5xl mx-auto px-4 py-14">
          <div className="text-center mb-10">
            <h3 className="text-xl sm:text-2xl font-black text-[#1E1B4B]">Clinical Grounding & Vagal Toning</h3>
            <p className="text-xs sm:text-sm text-[#8E95B2] font-semibold mt-1">Evidence-based physiological benefits of 4-7-8 somatic regulation</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white text-[#1E1B4B] rounded-3xl p-7 shadow-soft border border-white/80 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#4E36E2] flex items-center justify-center mb-4 shadow-sm">
                  <Heart className="w-6 h-6" />
                </div>
                <h4 className="font-black text-[#1E1B4B] text-base">Regulate Nervous System</h4>
                <p className="text-xs text-[#8E95B2] mt-2 leading-relaxed font-medium">
                  Paced breathing activates the vagus nerve, reducing adrenaline and cortisol surges in under 120 seconds.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-bold text-[#4E36E2]">
                ● Clinical Grounding
              </div>
            </div>

            <div className="bg-white text-[#1E1B4B] rounded-3xl p-7 shadow-soft border border-white/80 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 shadow-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-black text-[#1E1B4B] text-base">Safe & Anonymous</h4>
                <p className="text-xs text-[#8E95B2] mt-2 leading-relaxed font-medium">
                  Zero biometric audio is saved during this exercise. Repeat cycles until somatic calmness is achieved.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-bold text-emerald-600">
                ● 100% Confidential
              </div>
            </div>

            <div className="bg-white text-[#1E1B4B] rounded-3xl p-7 shadow-soft border border-white/80 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#FF8C68] flex items-center justify-center mb-4 shadow-sm">
                  <Phone className="w-6 h-6" />
                </div>
                <h4 className="font-black text-[#1E1B4B] text-base">24/7 Helpline Desk</h4>
                <p className="text-xs text-[#8E95B2] mt-2 leading-relaxed font-medium">
                  If panic symptoms persist or safety is compromised, immediately connect with National Helpline 14566.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-bold text-[#FF8C68]">
                ● Toll-Free 14566
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200/70 bg-white text-[#8E95B2] py-6 text-center text-xs">
        <p className="font-bold text-[#1E1B4B]">MindPluze · Trauma De-escalation & Somatic Reset Module</p>
        <p className="mt-1">In statutory partnership with National Helpline Against Atrocities (14566)</p>
      </footer>
    </div>
  );
}
