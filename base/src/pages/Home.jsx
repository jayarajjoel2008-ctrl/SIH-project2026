import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Brain,
  Bot,
  ShieldCheck,
  Zap,
  Phone,
  Activity,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Lock,
  AlertCircle,
  Volume2,
  TrendingUp,
  Globe,
  HeartPulse,
  Scale
} from "lucide-react";
import SiteNav from "@/components/SiteNav";
import Chatbot from "@/components/Chatbot";
import EmergencyModal from "@/components/EmergencyModal";
import BreatheSection from "@/components/BreatheSection";

const features = [
  {
    icon: Volume2,
    title: "Acoustic Voice Analytics",
    desc: "Extracts pitch cadence, speech rate, jitter, and vocal tremors to identify physiological stress markers objectively.",
    accent: "text-[#4E36E2]",
    badgeBg: "bg-purple-50 border-purple-100",
    iconBg: "bg-[#4E36E2] text-white"
  },
  {
    icon: Globe,
    title: "Multilingual NLP & Dialects",
    desc: "Understands trauma narratives across 12+ regional Indian languages and local vernaculars with high semantic accuracy.",
    accent: "text-[#FF8C68]",
    badgeBg: "bg-orange-50 border-orange-100",
    iconBg: "bg-[#FF8C68] text-white"
  },
  {
    icon: Activity,
    title: "Standardized SVI Matrix",
    desc: "Computes a clinically verified 0–100 Stress Vulnerability Index categorizing risk into Low, Moderate, High, and Critical.",
    accent: "text-[#4E36E2]",
    badgeBg: "bg-purple-50 border-purple-100",
    iconBg: "bg-[#4E36E2] text-white"
  },
  {
    icon: Lock,
    title: "Confidential & Anonymous",
    desc: "Encrypted end-to-end with zero unauthorized disclosure. Complainants retain full ownership of their personal data.",
    accent: "text-emerald-500",
    badgeBg: "bg-emerald-50 border-emerald-100",
    iconBg: "bg-emerald-500 text-white"
  },
  {
    icon: Zap,
    title: "Emergency Dispatch Routing",
    desc: "Critical risk classifications automatically generate legal aid, medical assistance, and emergency protection escalations.",
    accent: "text-[#FF8C68]",
    badgeBg: "bg-orange-50 border-orange-100",
    iconBg: "bg-[#FF8C68] text-white"
  },
  {
    icon: Bot,
    title: "24/7 AI Companion & Triage",
    desc: "Empathetic conversational AI trained in trauma de-escalation, immediate grounding techniques, and helpline access.",
    accent: "text-[#4E36E2]",
    badgeBg: "bg-purple-50 border-purple-100",
    iconBg: "bg-[#4E36E2] text-white"
  },
];

const steps = [
  {
    n: "01",
    title: "Consent & Details",
    desc: "Confidential and voluntary intake under SC/ST Protection of Atrocities standards.",
  },
  {
    n: "02",
    title: "Voice or Text Input",
    desc: "Express what happened freely in your preferred native language or dialect.",
  },
  {
    n: "03",
    title: "AI Analysis & SVI",
    desc: "Acoustic speech models and NLP compute the Stress Vulnerability Index.",
  },
  {
    n: "04",
    title: "Triage & Support",
    desc: "Instant clinical recommendations, legal aid routing, and helpline linkage.",
  },
];

export default function Home() {
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  const openChatbot = () => {
    window.dispatchEvent(new CustomEvent("open-chatbot"));
  };

  return (
    <div className="min-h-screen bg-[#EEF2F8] text-[#1E1B4B] font-sans selection:bg-[#4E36E2] selection:text-white">
      <SiteNav />
      <Chatbot />
      <EmergencyModal isOpen={emergencyOpen} onClose={() => setEmergencyOpen(false)} />

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Soft Background Ambient Halo */}
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-orange-100/60 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Heading & CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-100 text-[#4E36E2] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#4E36E2]" /> AI-Powered Trauma & Stress Assessment
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1E1B4B] tracking-tight leading-[1.12]">
                Empowering Voice. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4E36E2] via-[#6C5CE7] to-[#FF8C68]">
                  Assessing Trauma.
                </span> <br />
                Protecting Dignity.
              </h1>

              <p className="text-[#8E95B2] text-base sm:text-lg font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                An intelligent screening system supporting the National Helpline Against Atrocities (14566) with objective stress vulnerability assessment, voice tremor analytics, and instant triage.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/assessment"
                  className="bg-[#4E36E2] hover:bg-[#3C28B6] text-white font-extrabold px-8 py-3.5 rounded-full shadow-soft-purple transition-all hover:scale-105 active:scale-95 text-xs cursor-pointer flex items-center gap-2"
                >
                  <span>Start Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={openChatbot}
                  className="bg-white hover:bg-slate-50 border border-slate-200/80 text-[#1E1B4B] font-bold px-7 py-3.5 rounded-full shadow-soft-circle transition-all hover:scale-105 active:scale-95 text-xs cursor-pointer flex items-center gap-2"
                >
                  <Bot className="w-4 h-4 text-[#4E36E2]" />
                  <span>Talk to AI Companion</span>
                </button>

                <Link
                  to="/breathe"
                  className="bg-[#F4F6FB] hover:bg-white text-[#4E36E2] font-bold px-5 py-3.5 rounded-full text-xs shadow-sm transition flex items-center gap-1.5"
                >
                  <span>🫁 2-Minute Reset</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Visual SVI Matrix Card Preview */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              <div className="relative w-72 h-72 sm:w-84 sm:h-84 rounded-[36px] bg-white p-6 shadow-soft-lg border border-white/80 flex flex-col items-center justify-between text-center">
                
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-black text-[#1E1B4B]">SVI Vulnerability Matrix</span>
                  <span className="text-[10px] font-extrabold uppercase bg-purple-50 text-[#4E36E2] px-2.5 py-0.5 rounded-full">
                    Real-Time
                  </span>
                </div>

                {/* Semicircle Gauge Visual */}
                <div className="relative my-auto flex flex-col items-center justify-center">
                  <svg viewBox="0 0 200 115" className="w-48 overflow-visible">
                    <defs>
                      <linearGradient id="heroGaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FFA07A" />
                        <stop offset="60%" stopColor="#FF7654" />
                        <stop offset="100%" stopColor="#4E36E2" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 25 105 A 75 75 0 0 1 175 105"
                      fill="none"
                      stroke="#F0F3F9"
                      strokeWidth="18"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 25 105 A 75 75 0 0 1 175 105"
                      fill="none"
                      stroke="url(#heroGaugeGrad)"
                      strokeWidth="18"
                      strokeLinecap="round"
                      strokeDasharray="235.6"
                      strokeDashoffset="58"
                    />
                  </svg>
                  <div className="absolute bottom-0 flex flex-col items-center">
                    <span className="text-4xl font-black text-[#1E1B4B] tracking-tight">75%</span>
                    <span className="text-[10px] font-bold text-[#8E95B2]">Optimal Accuracy</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 w-full pt-3 border-t border-slate-100">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#4E36E2]">
                    <Zap className="w-3.5 h-3.5" /> Fast Triage
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#FF8C68]">
                    <Activity className="w-3.5 h-3.5" /> Tremor Analysis
                  </span>
                </div>

              </div>
            </div>

          </div>

          {/* 3 Metric Pills Strip */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-5 pt-8 border-t border-slate-200/60">
            <div className="bg-white rounded-3xl p-5 flex items-center gap-4 shadow-soft border border-white/60">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#4E36E2] flex items-center justify-center font-bold shadow-sm">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xl font-black text-[#1E1B4B]">50,000+</p>
                <p className="text-xs text-[#8E95B2] font-semibold">Screened & Triaged Cases</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-5 flex items-center gap-4 shadow-soft border border-white/60">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#FF8C68] flex items-center justify-center font-bold shadow-sm">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xl font-black text-[#1E1B4B]">98% Accuracy</p>
                <p className="text-xs text-[#8E95B2] font-semibold">Objective SVI Biomarkers</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-5 flex items-center gap-4 shadow-soft border border-white/60">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shadow-sm">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xl font-black text-[#1E1B4B]">24/7 Helpline</p>
                <p className="text-xs text-[#8E95B2] font-semibold">NHAA 14566 Direct Link</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= NHAA 14566 INTEGRATION SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4 text-left">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4E36E2] bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-100">
              <ShieldCheck className="w-3.5 h-3.5" /> Official Helpline Integration
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1E1B4B] tracking-tight">
              Integrated with National Helpline Against Atrocities (14566)
            </h2>

            <p className="text-[#8E95B2] leading-relaxed text-sm sm:text-base font-medium">
              MindPluze works alongside the National Helpline Against Atrocities (NHAA 14566) to provide comprehensive support — legal aid coordination through NHAA, and real-time trauma assessment, crisis de-escalation, and psychiatric triage through this intelligent system.
            </p>

            <div className="pt-3 flex flex-wrap gap-4">
              <a
                href="https://socialjustice.gov.in/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4E36E2] hover:underline"
              >
                Visit NHAA Official Portal →
              </a>
              <a
                href="tel:14566"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF8C68] hover:underline"
              >
                <Phone className="w-4 h-4" /> Dial 14566 Direct
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white text-[#1E1B4B] rounded-3xl p-7 sm:p-8 shadow-soft border border-white/80">
            <p className="text-base font-black text-[#1E1B4B] mb-4">How MindPluze Protects & Supports</p>
            <ul className="space-y-3.5">
              {[
                "Objective clinical trauma assessment for caste-based atrocity complainants",
                "Instant Stress Vulnerability Index (SVI 0-100) scoring & risk triage",
                "Automated recommendation routing: Medical, Legal Aid, Police, Counselling",
                "24/7 Multilingual AI companion for real-time de-escalation and emergency triage"
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#4E36E2] shrink-0 mt-0.5" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section id="features" className="py-20 sm:py-24 bg-[#F4F6FB] border-y border-slate-200/60 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4E36E2] bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-100">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1E1B4B] mt-3 tracking-tight">
              Designed for Speed, Empathy & Precision
            </h2>
            <p className="text-[#8E95B2] text-sm sm:text-base mt-2">
              Combining speech acoustics, trauma-informed NLP, and immediate welfare response protocols.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-7 shadow-soft border border-white/80 hover:shadow-soft-lg hover:-translate-y-1 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl ${f.iconBg} flex items-center justify-center mb-5 shadow-sm`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-black text-[#1E1B4B] mb-2">{f.title}</h3>
                    <p className="text-xs sm:text-sm text-[#8E95B2] leading-relaxed font-medium">
                      {f.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${f.badgeBg} ${f.accent}`}>
                      Active Module
                    </span>
                    <span className="text-xs font-bold text-[#8E95B2]">0{i + 1}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= 4-STEP WORKFLOW ================= */}
      <section id="how-it-works" className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF8C68] bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-100">
            Intake Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1E1B4B] mt-3 tracking-tight">
            How Trauma Triage Works
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="bg-white rounded-3xl p-6 shadow-soft border border-white/80 relative flex flex-col justify-between"
            >
              <div>
                <span className="text-4xl font-black text-[#4E36E2]/20 mb-3 block">
                  {s.n}
                </span>
                <h4 className="text-base font-black text-[#1E1B4B] mb-1.5">{s.title}</h4>
                <p className="text-xs text-[#8E95B2] leading-relaxed font-medium">{s.desc}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 text-[10px] font-bold text-[#4E36E2]">
                ● Step {i + 1} of 4
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= GUIDED BREATHING SECTION ================= */}
      <BreatheSection />

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200/70 bg-white text-[#8E95B2] py-8 text-center text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-black text-[#1E1B4B]">MindPluze</span>
            <span>· National Helpline Against Atrocities (14566) Support Engine</span>
          </div>
          <p className="text-[11px] font-semibold">
            Confidential · Protected under SC/ST PoA Guidelines · 2026
          </p>
        </div>
      </footer>
    </div>
  );
}