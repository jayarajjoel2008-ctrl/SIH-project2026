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
  Globe
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
    accent: "text-[#00B4D8]",
    badgeBg: "bg-cyan-500/15 border-cyan-400/30",
  },
  {
    icon: Globe,
    title: "Multilingual NLP & Dialects",
    desc: "Understands trauma narratives across 12+ regional Indian languages and local vernaculars with high semantic accuracy.",
    accent: "text-[#FFA217]",
    badgeBg: "bg-amber-500/15 border-amber-400/30",
  },
  {
    icon: Activity,
    title: "Standardized SVI Matrix",
    desc: "Computes a clinically verified 0–100 Stress Vulnerability Index categorizing risk into Low, Moderate, High, and Critical.",
    accent: "text-[#00B4D8]",
    badgeBg: "bg-cyan-500/15 border-cyan-400/30",
  },
  {
    icon: Lock,
    title: "Confidential & Anonymous",
    desc: "Encrypted end-to-end with zero unauthorized disclosure. Complainants retain full ownership of their personal data.",
    accent: "text-emerald-400",
    badgeBg: "bg-emerald-500/15 border-emerald-400/30",
  },
  {
    icon: Zap,
    title: "Emergency Dispatch Routing",
    desc: "Critical risk classifications automatically generate legal aid, medical assistance, and emergency protection escalations.",
    accent: "text-[#FFA217]",
    badgeBg: "bg-amber-500/15 border-amber-400/30",
  },
  {
    icon: Bot,
    title: "24/7 AI Companion & Triage",
    desc: "Empathetic conversational AI trained in trauma de-escalation, immediate grounding techniques, and helpline access.",
    accent: "text-[#00B4D8]",
    badgeBg: "bg-cyan-500/15 border-cyan-400/30",
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
    <div className="min-h-screen bg-[#0A1118] text-slate-200 font-sans selection:bg-[#FFA217] selection:text-slate-950">
      <SiteNav />
      <Chatbot />
      <EmergencyModal isOpen={emergencyOpen} onClose={() => setEmergencyOpen(false)} />

      {/* ================= HERO SECTION (Dark Luxury Night & Glowing Smart Dial) ================= */}
      <section className="relative bg-gradient-to-b from-[#0A1118] via-[#0B131E] to-[#0D1826] text-white pt-12 pb-20 overflow-hidden border-b border-white/10">
        {/* Soft Ambient Night-Lighting Glows */}
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#00A3FF]/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-[#FFA217]/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Heading, Eyebrow & Action Pills */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-cyan-500/15 border border-cyan-400/30 text-[#00B4D8] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#00B4D8]" /> AI-Powered Trauma & Stress Assessment
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
                Empowering Voice. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] via-[#38BDF8] to-[#FFA217]">
                  Assessing Trauma.
                </span> <br />
                Protecting Dignity.
              </h1>

              <p className="text-slate-300 text-base sm:text-lg font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                An intelligent AI screening system supporting the National Helpline Against Atrocities (14566) with objective stress vulnerability assessment, voice analytics, and immediate triage recommendations.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/assessment"
                  className="bg-[#00B4D8] hover:bg-[#0096C7] text-white font-extrabold px-8 py-3.5 rounded-full shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95 text-sm cursor-pointer flex items-center gap-2"
                >
                  <span>Start Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={openChatbot}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-7 py-3.5 rounded-full transition-all hover:scale-105 active:scale-95 text-sm cursor-pointer flex items-center gap-2"
                >
                  <Bot className="w-4 h-4 text-[#00B4D8]" />
                  <span>Talk to AI Companion</span>
                </button>

                <Link
                  to="/breathe"
                  className="bg-transparent hover:bg-white/5 text-slate-300 hover:text-white font-semibold px-4 py-3.5 rounded-full text-sm transition flex items-center gap-1.5"
                >
                  <span>🫁 2-Minute Reset</span>
                </Link>
              </div>
            </div>

            {/* Right Column: High-Tech Smart Circular Dial Device Display */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-[#00A3FF]/20 blur-3xl pointer-events-none" />

              <div className="relative w-72 h-72 sm:w-88 sm:h-88 rounded-full bg-gradient-to-b from-[#142334] to-[#09111A] p-4 sm:p-5 shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-cyan-400/40 flex items-center justify-center">
                <div className="absolute inset-2 sm:inset-3 rounded-full border-2 border-[#00B4D8] shadow-[0_0_30px_rgba(0,180,216,0.6)] animate-pulse" />

                <div
                  className="w-full h-full rounded-full flex flex-col items-center justify-center relative p-6 select-none"
                  style={{
                    background: "radial-gradient(circle at 50% 50%, #070D14 45%, #2A1504 75%, #FFA217 98%)",
                    boxShadow: "inset 0 0 35px rgba(255, 162, 23, 0.7)"
                  }}
                >
                  <svg className="absolute inset-0 w-full h-full p-2.5 overflow-visible" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="92" fill="none" stroke="#FFA217" strokeWidth="2" strokeDasharray="3 4" opacity="0.8" />
                    <circle cx="100" cy="100" r="82" fill="none" stroke="#00B4D8" strokeWidth="1.5" strokeDasharray="2 3" opacity="0.6" />
                  </svg>

                  <div className="relative z-10 text-center flex flex-col items-center justify-center">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#00B4D8] uppercase tracking-wider mb-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00B4D8] animate-ping" /> SVI Score Matrix
                    </div>

                    <span className="text-5xl sm:text-6xl font-black text-white tracking-tight drop-shadow-[0_2px_12px_rgba(255,255,255,0.4)]">
                      125
                    </span>

                    <span className="text-xs font-bold text-[#FFA217] mt-1 bg-amber-500/20 px-3 py-0.5 rounded-full border border-amber-400/30">
                      Optimal Stability
                    </span>

                    <div className="flex items-center gap-4 text-slate-400 text-xs mt-3 pt-2 border-t border-white/10">
                      <Zap className="w-4 h-4 text-[#FFA217]" />
                      <Activity className="w-4 h-4 text-[#00B4D8]" />
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* 3 Metric Pills Strip */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/10">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 backdrop-blur">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-[#00B4D8] flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-black text-white">50,000+</p>
                <p className="text-xs text-slate-400 font-medium">Screened & Triaged Cases</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 backdrop-blur">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 text-[#FFA217] flex items-center justify-center font-bold">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-black text-white">98% Accuracy</p>
                <p className="text-xs text-slate-400 font-medium">Objective SVI Biomarkers</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 backdrop-blur">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-black text-white">24/7 Helpline</p>
                <p className="text-xs text-slate-400 font-medium">NHAA 14566 Linkage</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= NHAA 14566 INTEGRATION SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4 text-left">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFA217] bg-amber-500/15 px-3.5 py-1.5 rounded-full border border-amber-400/30">
              <ShieldCheck className="w-3.5 h-3.5" /> Official Helpline Integration
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Integrated with National Helpline Against Atrocities (14566)
            </h2>

            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              MindPluze works alongside the National Helpline Against Atrocities (NHAA 14566) to provide comprehensive support — legal aid coordination through NHAA, and real-time trauma assessment, crisis de-escalation, and psychiatric triage through this intelligent system.
            </p>

            <div className="pt-3 flex flex-wrap gap-4">
              <a
                href="https://socialjustice.gov.in/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00B4D8] hover:underline"
              >
                Visit NHAA Official Portal →
              </a>
              <a
                href="tel:14566"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFA217] hover:underline"
              >
                <Phone className="w-4 h-4" /> Dial 14566 Direct
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white text-slate-900 rounded-3xl p-7 sm:p-8 shadow-2xl border border-slate-100">
            <p className="text-base font-black text-[#0A1118] mb-4">How MindPluze Protects & Supports</p>
            <ul className="space-y-3.5">
              {[
                "Objective clinical trauma assessment for caste-based atrocity complainants",
                "Instant Stress Vulnerability Index (SVI 0-100) scoring & risk triage",
                "Automated recommendation routing: Medical, Legal Aid, Police, Counselling",
                "24/7 Multilingual AI companion for real-time de-escalation and emergency triage"
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#00B4D8] shrink-0 mt-0.5" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* ================= FEATURES SECTION (Core Capabilities / Why Choose MindPluze) ================= */}
      <section id="features" className="py-20 sm:py-24 bg-[#080E15] border-y border-white/10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00B4D8] bg-cyan-500/15 px-3.5 py-1.5 rounded-full border border-cyan-400/30">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 tracking-tight">
              Why Choose MindPluze
            </h2>
            <p className="text-slate-400 mt-2 text-sm sm:text-base">
              Cutting-edge AI combined with ethical, trauma-informed clinical care standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="bg-white text-slate-900 rounded-3xl p-7 shadow-xl border border-slate-100 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center ${f.accent} mb-5`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-black text-[#0A1118]">{f.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">{f.desc}</p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] font-bold text-[#00B4D8]">
                    ● Standard Feature
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= HOW IT WORKS SECTION (Original 4-Step Process) ================= */}
      <section id="how-it-works" className="py-20 sm:py-24 bg-[#0A1118] scroll-mt-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FFA217] bg-amber-500/15 px-3.5 py-1.5 rounded-full border border-amber-400/30">
              Workflow Process
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mt-3">
              How It Works
            </h2>
            <p className="text-slate-400 mt-2 text-sm sm:text-base">
              Getting help is simple, confidential, and straightforward
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative items-start">
            {steps.map((s, idx) => (
              <div key={s.n} className="relative text-center flex flex-col items-center group">
                {/* Connecting arrow for desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-10 left-[calc(50%+2.8rem)] right-[calc(-50%+2.8rem)] items-center justify-center pointer-events-none z-10">
                    <span className="text-[#00B4D8] text-xl font-bold opacity-60">→</span>
                  </div>
                )}

                {/* Step Circle: Dark with Amber/Cyan Highlight */}
                <div className="w-20 h-20 rounded-full bg-[#111A24] text-[#FFA217] border-2 border-[#FFA217] font-black text-2xl flex items-center justify-center shadow-xl shadow-black/50 mb-5 group-hover:scale-105 transition-transform duration-200">
                  {s.n}
                </div>

                <h3 className="text-lg font-black text-white mb-1.5">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xs px-2">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= TWO-MINUTE RESET / BREATHE SECTION ================= */}
      <BreatheSection />

      {/* ================= EMERGENCY CTA BAND ================= */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="rounded-3xl bg-gradient-to-r from-[#1E1114] to-[#120D12] border border-rose-500/30 p-8 sm:p-12 text-white text-center shadow-2xl">
          <div className="w-14 h-14 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">We're Here to Help</h2>
          <p className="mt-2 text-slate-300 max-w-xl mx-auto text-sm sm:text-base">
            If you or someone you know is in immediate distress or facing threats, reach out right now. You are not alone.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3.5">
            {[
              ["NHAA Helpline", "14566"],
              ["Police Control Room", "100"],
              ["Medical Ambulance", "108"],
              ["Tele-MANAS", "14416"],
            ].map(([l, n]) => (
              <a
                key={n}
                href={`tel:${n}`}
                className="inline-flex items-center gap-2 bg-[#0A1118] hover:bg-black border border-white/20 text-white font-bold px-6 py-3 rounded-full transition shadow-md text-xs sm:text-sm cursor-pointer"
              >
                📞 {l}: <span className="text-[#FFA217] font-black">{n}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 bg-[#060B10] text-slate-500 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full bg-[#FFA217] flex items-center justify-center text-slate-950 font-bold">
              <Brain className="w-4 h-4" />
            </div>
            <span className="font-black text-sm text-white">MindPluze</span>
          </div>
          <p className="text-slate-400 font-medium">AI-Based Real-Time Stress & Trauma Assessment Module · NHAA 14566</p>
          <p className="text-xs text-slate-500 mt-2">© {new Date().getFullYear()} National Helpline Against Atrocities. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}