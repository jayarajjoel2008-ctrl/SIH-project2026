import React from "react";
import SiteNav from "@/components/SiteNav";
import Chatbot from "@/components/Chatbot";
import BreatheSection from "@/components/BreatheSection";
import { ShieldCheck, Heart, Phone } from "lucide-react";

export default function Breathe() {
  return (
    <div className="min-h-screen bg-[#0A1118] text-slate-200 flex flex-col justify-between font-sans selection:bg-[#FFA217] selection:text-slate-950">
      <SiteNav />
      <Chatbot />

      <main className="flex-1 flex flex-col justify-center">
        <BreatheSection />

        {/* Supporting Grounding Benefit Cards */}
        <div className="max-w-5xl mx-auto px-4 py-14">
          <div className="text-center mb-10">
            <h3 className="text-xl sm:text-2xl font-black text-white">Clinical Grounding & Vagal Toning</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">Evidence-based physiological benefits of 4-7-8 somatic regulation</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white text-slate-900 rounded-3xl p-7 shadow-xl border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-[#00B4D8] flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6" />
                </div>
                <h4 className="font-black text-[#0A1118] text-base">Regulate Nervous System</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Paced breathing activates the vagus nerve, reducing adrenaline and cortisol surges in under 120 seconds.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-bold text-[#00B4D8]">
                ● Clinical Grounding
              </div>
            </div>

            <div className="bg-white text-slate-900 rounded-3xl p-7 shadow-xl border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-black text-[#0A1118] text-base">Safe & Anonymous</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Zero biometric audio is saved during this exercise. Repeat cycles until somatic calmness is achieved.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-bold text-emerald-600">
                ● 100% Confidential
              </div>
            </div>

            <div className="bg-white text-slate-900 rounded-3xl p-7 shadow-xl border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#FFA217] flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6" />
                </div>
                <h4 className="font-black text-[#0A1118] text-base">24/7 Helpline Desk</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  If panic symptoms persist or safety is compromised, immediately connect with National Helpline 14566.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-bold text-[#FFA217]">
                ● Toll-Free 14566
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 bg-[#060B10] text-slate-500 py-6 text-center text-xs">
        <p className="font-bold text-slate-300">MindPluze · Trauma De-escalation & Somatic Reset Module</p>
        <p className="mt-1">In statutory partnership with National Helpline Against Atrocities (14566)</p>
      </footer>
    </div>
  );
}
