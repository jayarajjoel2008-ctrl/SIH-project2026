import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Brain, Bot, ShieldCheck, Zap, Phone, AlertCircle, Stethoscope, ArrowRight, Activity, Lock, HeartHandshake } from "lucide-react";
import SiteNav from "@/components/SiteNav";
import Chatbot from "@/components/Chatbot";
import EmergencyModal from "@/components/EmergencyModal";
import BreatheSection from "@/components/BreatheSection";

const executiveSummary = [
  { step: "01", title: "AI Speech & NLP Triage", desc: "Real-time acoustic biomarker and narrative semantic analysis.", color: "from-[#4E36E2] to-[#3C28B6]" },
  { step: "02", title: "Multilingual Inclusivity", desc: "Covers 12+ regional Indian dialects for accessible reporting.", color: "from-[#6C5CE7] to-[#FFA07A]" },
  { step: "03", title: "SVI Risk Categorization", desc: "Instant clinical scoring (0-100) into Low, Moderate, High & Critical.", color: "from-[#2A236E] to-[#1E1B4B]" },
  { step: "04", title: "NHAA 14566 Integration", desc: "Automated routing to legal aid, police dispatch, and medical care.", color: "from-[#1E1B4B] to-[#141238]" },
];

const features = [
  { step: "01", title: "Acoustic Biomarkers", desc: "Speech rhythm, pitch variations, micro-tremors, and voice stress detection.", icon: Activity },
  { step: "02", title: "Trauma-Informed NLP", desc: "Detects intimidation, fear, suicidal ideation, and acute social distress.", icon: Brain },
  { step: "03", title: "Standardized SVI Matrix", desc: "Objective 0-100 index for fast clinical triage and priority routing.", icon: Zap },
  { step: "04", title: "End-to-End Encryption", desc: "Zero-knowledge encryption maintaining strict victim confidentiality.", icon: Lock },
  { step: "05", title: "Auto-Support Routing", desc: "Direct legal aid, police protection, medical help, and psychological care.", icon: HeartHandshake },
  { step: "06", title: "24/7 AI Companion", desc: "Instant compassionate conversational grounding and crisis de-escalation.", icon: Bot },
];

const steps = [
  {
    n: "01",
    title: "Informed Consent",
    desc: "Victims grant secure, voluntary consent with full anonymity controls.",
    badge: "Step 1"
  },
  {
    n: "02",
    title: "Voice / Text Input",
    desc: "Complainants speak or type their narrative in their native dialect.",
    badge: "Step 2"
  },
  {
    n: "03",
    title: "SVI Clinical Analysis",
    desc: "AI engine calculates Stress Vulnerability Index and detects indicators.",
    badge: "Step 3"
  },
  {
    n: "04",
    title: "Support Dispatch",
    desc: "Direct coordination with NHAA 14566, police, doctors, or counsellors.",
    badge: "Step 4"
  }
];

export default function Home() {
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  const openChatbot = () => {
    window.dispatchEvent(new CustomEvent("open-chatbot"));
  };

  return (
    <div className="min-h-screen bg-[#EEF2F8]">
      <SiteNav />
      <Chatbot />
      <EmergencyModal isOpen={emergencyOpen} onClose={() => setEmergencyOpen(false)} />

      {/* Hero Section (Deep Indigo #1E1B4B + Royal Purple #4E36E2 & Peach #FFA07A) */}
      <section className="bg-[#1E1B4B] text-white py-16 sm:py-24 relative overflow-hidden">
        {/* Subtle geometric slide background grid */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#4E36E2_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#4E36E2]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#FFA07A]/15 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
          {/* Left Column: Headline, Subtitle, CTA buttons, Stats */}
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 bg-[#4E36E2]/25 border border-[#4E36E2]/40 text-[#FFA07A] px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#FFA07A] animate-pulse" /> MindPluze · NHAA 14566 Official Module
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
              <span className="text-[#FFA07A]">AI-Powered Trauma Support</span> for NHAA Victims
            </h1>

            <p className="text-slate-200 text-lg sm:text-xl font-normal leading-relaxed max-w-xl">
              Immediate psychological assessment and crisis intervention for victims of caste-based atrocities. In partnership with National Helpline Against Atrocities (14566).
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/assessment"
                className="inline-flex items-center gap-2.5 bg-[#4E36E2] hover:bg-[#3C28B6] text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-purple-950/40 transition-all hover:scale-[1.02] text-base"
              >
                <Stethoscope className="w-5 h-5" /> Start Assessment
              </Link>

              <button
                onClick={openChatbot}
                className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-7 py-3.5 rounded-xl transition-all hover:scale-[1.02] text-base shadow-sm cursor-pointer backdrop-blur"
              >
                <Bot className="w-5 h-5 text-[#FFA07A]" /> Talk to AI
              </button>
            </div>

            {/* Infographic Metric Pills */}
            <div className="pt-6 grid grid-cols-3 gap-4 max-w-lg border-t border-slate-700/80">
              <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl text-center">
                <p className="text-2xl sm:text-3xl font-black text-[#FFA07A]">50K+</p>
                <p className="text-[11px] sm:text-xs font-semibold text-slate-300 mt-0.5 uppercase tracking-wide">Screenings</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl text-center">
                <p className="text-2xl sm:text-3xl font-black text-[#FFA07A]">98%</p>
                <p className="text-[11px] sm:text-xs font-semibold text-slate-300 mt-0.5 uppercase tracking-wide">Accuracy</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl text-center">
                <p className="text-2xl sm:text-3xl font-black text-[#FFA07A]">24/7</p>
                <p className="text-[11px] sm:text-xs font-semibold text-slate-300 mt-0.5 uppercase tracking-wide">Active Help</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Slide-Style Infographic Overlays */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/15 bg-[#1E1B4B]">
              <img
                src="/hero-doctor.jpg"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80";
                }}
                alt="Medical professional with smartphone supporting trauma victims"
                className="w-full h-[380px] sm:h-[450px] lg:h-[480px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B4B]/80 via-transparent to-transparent" />
            </div>

            {/* Top-Left Floating Badge: Normal wellness (Peach #FFF0EB) */}
            <div className="absolute top-5 left-5 sm:-left-4 bg-[#FFF0EB] border border-[#FFA07A]/40 rounded-2xl shadow-xl px-4 py-2.5 flex items-center gap-2.5 animate-in fade-in slide-in-from-top-3">
              <div className="w-8 h-8 rounded-xl bg-white text-[#4E36E2] flex items-center justify-center shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#1E1B4B]">100% Confidential</p>
                <p className="text-[10px] text-slate-600">Zero-Identity Leakage</p>
              </div>
            </div>

            {/* Bottom-Right Floating Badge: Attention needed (Soft Coral #FFE8DF) */}
            <div className="absolute bottom-6 right-5 sm:-right-4 bg-[#FFE8DF] border border-[#FF8C68]/40 rounded-2xl shadow-xl px-4 py-2.5 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-3">
              <div className="w-8 h-8 rounded-xl bg-white text-[#EA580C] flex items-center justify-center shadow-xs">
                <Zap className="w-5 h-5 fill-[#EA580C]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#1E1B4B]">Instant SVI Results</p>
                <p className="text-[10px] text-slate-600">Automated Triage Score</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXECUTIVE SUMMARY / HIGHLIGHTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {executiveSummary.map((item) => (
            <div
              key={item.step}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-md hover:shadow-xl hover:border-[#4E36E2]/40 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-[#F4F6FB] text-[#1E1B4B] font-mono">
                    {item.step}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#4E36E2]" />
                </div>
                <h4 className="font-extrabold text-[#1E1B4B] text-base leading-snug">{item.title}</h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-[#4E36E2]">
                <span>NHAA Standard</span>
                <span>✓ Verified</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BUSINESS PROCESS TIMELINE SECTION */}
      <section id="how-it-works" className="py-20 sm:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4E36E2] bg-purple-50 px-3.5 py-1.5 rounded-full border border-[#4E36E2]/20">
              Structured Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E1B4B] tracking-tight mt-3">
              Assessment Process Flow
            </h2>
            <p className="text-slate-600 mt-3 text-base sm:text-lg">
              Four streamlined clinical stages from intake to emergency intervention.
            </p>
          </div>

          {/* Connected Infographic Step Flow */}
          <div className="relative">
            {/* Desktop Connector Line */}
            <div className="hidden lg:block absolute top-10 left-12 right-12 h-1 bg-gradient-to-r from-[#4E36E2] via-[#FFA07A] to-[#1E1B4B] rounded-full z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {steps.map((s) => (
                <div
                  key={s.n}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center"
                >
                  {/* Step Node Circle */}
                  <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-[#1E1B4B] text-[#FFA07A] border-4 border-white shadow-xl flex items-center justify-center font-black text-2xl mb-5">
                    {s.n}
                  </div>

                  <span className="text-[11px] font-bold text-[#4E36E2] uppercase tracking-wider bg-[#F4F6FB] px-3 py-1 rounded-full mb-2">
                    {s.badge}
                  </span>

                  <h3 className="text-lg font-extrabold text-[#1E1B4B] mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES */}
      <section id="features" className="bg-[#F4F6FB] py-20 border-y border-slate-200/60 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4E36E2] bg-purple-50 px-3.5 py-1.5 rounded-full border border-[#4E36E2]/20">
              System Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1B4B] mt-3">
              Clinical & Psychological Capabilities
            </h2>
            <p className="text-slate-600 mt-3 text-base sm:text-lg">
              Combining ethical AI diagnostics with rapid crisis response protocols.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#4E36E2]/40 transition-all duration-200 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-[#F4F6FB] text-[#4E36E2] flex items-center justify-center group-hover:bg-[#1E1B4B] group-hover:text-[#FFA07A] transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-400">
                        {f.step}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#1E1B4B] group-hover:text-[#4E36E2] transition-colors">
                      {f.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-slate-500">
                    <span className="text-[#4E36E2]">● Clinical Module Active</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* NHAA INTEGRATION & SUCCESS FACTORS */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="bg-[#1E1B4B] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#4E36E2]/15 rounded-full blur-2xl pointer-events-none" />

          <div className="grid md:grid-cols-2 gap-10 items-center relative z-10">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFA07A] bg-[#4E36E2]/25 px-3.5 py-1.5 rounded-full mb-4 border border-[#4E36E2]/35 uppercase">
                <ShieldCheck className="w-3.5 h-3.5" /> Official Government Integration
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Integrated with National Helpline Against Atrocities (14566)
              </h2>
              <p className="mt-4 text-slate-300 leading-relaxed text-sm sm:text-base">
                MindPluze operates seamlessly alongside the Ministry of Social Justice & Empowerment's NHAA 14566 framework — ensuring immediate psychiatric triage and swift legal aid routing.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href="https://socialjustice.gov.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#4E36E2] hover:bg-[#3C28B6] text-white font-bold px-5 py-3 rounded-xl transition text-sm shadow"
                >
                  Visit NHAA Official Portal <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="tel:14566"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3 rounded-xl transition text-sm border border-white/20"
                >
                  <Phone className="w-4 h-4 text-[#FFA07A]" /> Dial 14566 Direct
                </a>
              </div>
            </div>

            {/* Infographic Success Matrix Cards */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="bg-white/10 border border-white/15 p-5 rounded-2xl">
                <p className="text-2xl font-black text-[#FFA07A]">100%</p>
                <p className="text-xs font-semibold text-slate-200 mt-1">Victim Data Privacy</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Encrypted at rest</p>
              </div>
              <div className="bg-white/10 border border-white/15 p-5 rounded-2xl">
                <p className="text-2xl font-black text-[#FFA07A]">&lt; 30s</p>
                <p className="text-xs font-semibold text-slate-200 mt-1">Assessment Time</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Real-time inference</p>
              </div>
              <div className="bg-white/10 border border-white/15 p-5 rounded-2xl">
                <p className="text-2xl font-black text-[#FFA07A]">12+</p>
                <p className="text-xs font-semibold text-slate-200 mt-1">Indian Languages</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Native speech engines</p>
              </div>
              <div className="bg-white/10 border border-white/15 p-5 rounded-2xl">
                <p className="text-2xl font-black text-[#FFA07A]">24/7</p>
                <p className="text-xs font-semibold text-slate-200 mt-1">Helpline Linkage</p>
                <p className="text-[11px] text-slate-400 mt-0.5">NHAA & 100/108</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TWO-MINUTE RESET / BREATHE SECTION */}
      <BreatheSection />

      {/* EMERGENCY CRISIS SUPPORT */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="rounded-3xl bg-[#FFE8DF] border border-[#FF8C68]/30 p-8 sm:p-12 text-[#1E1B4B] text-center shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-white text-[#EA580C] flex items-center justify-center mx-auto mb-4 shadow-xs">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B4B]">Emergency Support Helplines</h2>
          <p className="mt-2 text-slate-700 max-w-xl mx-auto text-sm sm:text-base">
            If you or someone around you is in immediate danger or facing acute psychological distress, connect with emergency services immediately.
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
                className="inline-flex items-center gap-2 bg-[#1E1B4B] hover:bg-[#2A236E] text-white font-bold px-6 py-3 rounded-xl transition shadow-md text-sm"
              >
                📞 {l}: <span className="text-[#FFA07A] font-extrabold">{n}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-10 text-center text-sm text-slate-500">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-[#1E1B4B] flex items-center justify-center text-[#FFA07A]">
              <Brain className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-[#1E1B4B]">MindPluze</span>
          </div>
          <p className="text-slate-600 font-medium">AI-Based Real-Time Stress & Trauma Assessment Module · NHAA 14566</p>
          <p className="text-xs text-slate-400 mt-2">© {new Date().getFullYear()} National Helpline Against Atrocities. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}