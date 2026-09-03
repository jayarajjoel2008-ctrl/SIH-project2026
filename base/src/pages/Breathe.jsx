import React from "react";
import SiteNav from "@/components/SiteNav";
import Chatbot from "@/components/Chatbot";
import BreatheSection from "@/components/BreatheSection";
import { ShieldCheck, Heart, Phone } from "lucide-react";

export default function Breathe() {
  return (
    <div className="min-h-screen bg-[#EEF2F8] text-[#1E1B4B] flex flex-col justify-between">
      <SiteNav />
      <Chatbot />

      <main className="flex-1 flex flex-col justify-center py-6">
        <BreatheSection />

        {/* Supporting grounding tips below */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-[28px] p-7 border border-slate-100 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-full bg-purple-50 text-[#4E36E2] flex items-center justify-center mb-4 shadow-sm">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-black text-[#1E1B4B] text-base">Regulate Nervous System</h3>
              <p className="text-xs text-[#8E95B2] font-medium mt-2 leading-relaxed">
                Paced breathing activates the vagus nerve and lowers acute adrenaline response in under 2 minutes.
              </p>
            </div>

            <div className="bg-white rounded-[28px] p-7 border border-slate-100 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-full bg-orange-50 text-[#FF8C68] flex items-center justify-center mb-4 shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-black text-[#1E1B4B] text-base">Safe & Private</h3>
              <p className="text-xs text-[#8E95B2] font-medium mt-2 leading-relaxed">
                No data is recorded. Take as many cycles as you need until you feel calm and grounded.
              </p>
            </div>

            <div className="bg-white rounded-[28px] p-7 border border-slate-100 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#F4F6FB] text-[#4E36E2] flex items-center justify-center mb-4 shadow-sm">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-black text-[#1E1B4B] text-base">Immediate Support</h3>
              <p className="text-xs text-[#8E95B2] font-medium mt-2 leading-relaxed">
                If breathing feels overwhelming or you are in active distress, dial 14566 (NHAA) 24/7.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200/80 bg-white/80 backdrop-blur py-6 text-center text-xs text-[#8E95B2]">
        <p className="font-black text-[#1E1B4B]">MindPluze · Two-Minute Reset Module</p>
        <p className="mt-1">In partnership with National Helpline Against Atrocities (14566)</p>
      </footer>
    </div>
  );
}
