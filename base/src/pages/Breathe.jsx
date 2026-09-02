import React from "react";
import SiteNav from "@/components/SiteNav";
import Chatbot from "@/components/Chatbot";
import BreatheSection from "@/components/BreatheSection";
import { ShieldCheck, Heart, Phone } from "lucide-react";

export default function Breathe() {
  return (
    <div className="min-h-screen bg-[#F4F9FD] flex flex-col justify-between">
      <SiteNav />
      <Chatbot />

      <main className="flex-1 flex flex-col justify-center">
        <BreatheSection />

        {/* Supporting grounding tips below */}
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#584CE4] flex items-center justify-center mb-3">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Regulate Nervous System</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Paced breathing activates the vagus nerve and lowers acute adrenaline response in under 2 minutes.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Safe & Private</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                No data is recorded. Take as many cycles as you need until you feel calm and grounded.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Immediate Support</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                If breathing feels overwhelming or you are in active distress, dial 14566 (NHAA) 24/7.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <p className="font-semibold text-slate-800">MindCare AI · Two-Minute Reset Module</p>
        <p className="mt-1">In partnership with National Helpline Against Atrocities (14566)</p>
      </footer>
    </div>
  );
}
