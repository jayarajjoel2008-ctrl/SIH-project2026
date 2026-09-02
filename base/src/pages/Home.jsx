import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Brain, Bot, ShieldCheck, Zap, CheckCircle2, Phone, AlertCircle, Stethoscope } from "lucide-react";
import SiteNav from "@/components/SiteNav";
import Chatbot from "@/components/Chatbot";
import EmergencyModal from "@/components/EmergencyModal";
import BreatheSection from "@/components/BreatheSection";

const features = [
  { title: "AI-Powered Assessment", desc: "NLP, speech analytics and Emotion AI analyze voice patterns, pauses, pitch and narrative to assess stress and trauma in real time." },
  { title: "Stress Vulnerability Index", desc: "Generates a standardized SVI score (0-100) and categorizes victims into Low, Moderate, High and Critical risk." },
  { title: "Multilingual & Inclusive", desc: "Supports major Indian languages and dialects so victims can express themselves in their own tongue." },
  { title: "Trauma-Informed Detection", desc: "Detects indicators of trauma, fear, depression, suicidal ideation, intimidation and social isolation." },
  { title: "Auto-Recommended Support", desc: "Recommends counselling, legal aid, medical assistance, police intervention, witness protection or emergency support." },
  { title: "Private & Ethical", desc: "Informed consent, confidentiality and ethical AI standards maintained throughout every interaction." },
];

const steps = [
  {
    n: "1",
    title: "Create Account",
    desc: "Sign up securely with your email. Your information is encrypted and protected."
  },
  {
    n: "2",
    title: "Take Assessment",
    desc: "Complete our AI-powered stress and trauma assessment questionnaire."
  },
  {
    n: "3",
    title: "Get Results",
    desc: "Receive instant analysis and personalized recommendations."
  },
  {
    n: "4",
    title: "Connect & Heal",
    desc: "Get connected with professional counselors through NHAA network."
  }
];

export default function Home() {
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  const openChatbot = () => {
    window.dispatchEvent(new CustomEvent("open-chatbot"));
  };

  return (
    <div className="min-h-screen bg-white">
      <SiteNav />
      <Chatbot />
      <EmergencyModal isOpen={emergencyOpen} onClose={() => setEmergencyOpen(false)} />

      {/* Hero Section (Title slide: Deep navy #081C35 + white text + teal highlight #0E9F9A) */}
      <section className="bg-[#081C35] text-white py-14 sm:py-20 lg:py-24 relative overflow-hidden">
        {/* Subtle ambient teal background glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#0E9F9A]/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#0E9F9A]/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
          {/* Left Column: Headline, Subtitle, CTA buttons, Stats */}
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 bg-[#0E9F9A]/20 border border-[#0E9F9A]/30 text-[#0E9F9A] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-[#0E9F9A] animate-pulse" /> MindPluze
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
              <span className="text-[#0E9F9A]">AI-Powered Trauma Support</span> for NHAA Victims
            </h1>

            <p className="text-slate-200 text-lg sm:text-xl font-normal leading-relaxed max-w-xl">
              Immediate psychological assessment and crisis intervention for victims of caste-based atrocities. In partnership with National Helpline Against Atrocities (14566).
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/assessment"
                className="inline-flex items-center gap-2.5 bg-[#0E9F9A] hover:bg-[#0C8783] text-white font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-teal-950/40 transition-all hover:scale-[1.02] text-base"
              >
                <Stethoscope className="w-5 h-5" /> Start Assessment
              </Link>

              <button
                onClick={openChatbot}
                className="inline-flex items-center gap-2.5 bg-transparent border-2 border-[#0E9F9A] text-[#0E9F9A] hover:bg-[#0E9F9A]/10 font-semibold px-7 py-3.5 rounded-full transition-all hover:scale-[1.02] text-base shadow-sm cursor-pointer"
              >
                <Bot className="w-5 h-5" /> Talk to AI
              </button>
            </div>

            {/* Stats Row */}
            <div className="pt-6 grid grid-cols-3 gap-6 sm:gap-10 max-w-lg border-t border-slate-700/80">
              <div>
                <p className="text-3xl sm:text-4xl font-black text-[#0E9F9A]">50K+</p>
                <p className="text-xs sm:text-sm font-medium text-slate-300 mt-1">Assessments Done</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-black text-[#0E9F9A]">98%</p>
                <p className="text-xs sm:text-sm font-medium text-slate-300 mt-1">Accuracy Rate</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-black text-[#0E9F9A]">24/7</p>
                <p className="text-xs sm:text-sm font-medium text-slate-300 mt-1">Available Support</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Normal Wellness & Attention Badges */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-white/10 bg-[#081C35]">
              <img
                src="/hero-doctor.jpg"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80";
                }}
                alt="Medical professional with smartphone supporting trauma victims"
                className="w-full h-[380px] sm:h-[450px] lg:h-[480px] object-cover object-center"
              />
            </div>

            {/* Top-Left Floating Badge: Normal wellness (Mint #D9F6EF) */}
            <div className="absolute top-5 left-5 sm:-left-3 bg-[#D9F6EF] border border-[#0E9F9A]/30 rounded-2xl shadow-xl px-4 py-2.5 flex items-center gap-2.5 animate-in fade-in slide-in-from-top-3">
              <div className="w-7 h-7 rounded-xl bg-white text-[#0E9F9A] flex items-center justify-center shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#081C35]">100% Confidential</span>
            </div>

            {/* Bottom-Right Floating Badge: Attention needed (Amber #FFF0C2) */}
            <div className="absolute bottom-6 right-5 sm:-right-3 bg-[#FFF0C2] border border-[#D9A600]/30 rounded-2xl shadow-xl px-4 py-2.5 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-3">
              <div className="w-7 h-7 rounded-xl bg-white text-[#9A7000] flex items-center justify-center shadow-xs">
                <Zap className="w-5 h-5 fill-[#9A7000]" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#081C35]">Instant Results</span>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Red SOS Button (Urgent welfare support) */}
      <button
        onClick={() => setEmergencyOpen(true)}
        className="fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full bg-[#C4453D] text-white shadow-2xl shadow-red-950/40 flex items-center justify-center font-black text-2xl hover:scale-110 active:scale-95 transition cursor-pointer"
        aria-label="Emergency Immediate Helplines"
        title="24/7 Emergency Helplines"
      >
        !
      </button>

      {/* NHAA integration band (Content slide: Soft blue #E8F3FC background) */}
      <section className="bg-[#E8F3FC] border-y border-slate-200/60 py-14">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E9F9A] bg-[#D9F6EF] px-3.5 py-1.5 rounded-full mb-3 border border-[#0E9F9A]/20">
              <ShieldCheck className="w-3.5 h-3.5" /> Official Helpline Integration
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#081C35]">
              Integrated with National Helpline Against Atrocities (14566)
            </h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              MindPluze works alongside the National Helpline Against Atrocities (NHAA 14566) to provide comprehensive support — legal aid coordination through NHAA, and real-time trauma assessment, crisis de-escalation, and psychiatric triage through this intelligent system.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="https://socialjustice.gov.in/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0E9F9A] hover:underline"
              >
                Visit NHAA Official Portal →
              </a>
              <a
                href="tel:14566"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#FF5722] hover:underline"
              >
                <Phone className="w-4 h-4" /> Dial 14566 Direct
              </a>
            </div>
          </div>
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
            <p className="text-base font-bold text-[#081C35] mb-4">How MindPluze Protects & Supports</p>
            <ul className="space-y-3.5">
              {[
                "Objective clinical trauma assessment for caste-based atrocity complainants",
                "Instant Stress Vulnerability Index (SVI 0-100) scoring & risk triage",
                "Automated recommendation routing: Medical, Legal Aid, Police, Counselling",
                "24/7 Multilingual AI companion for real-time de-escalation and emergency triage"
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-[#0E9F9A] shrink-0 mt-0.5" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Features Section (Content slide: Navy headings + white cards) */}
      <section id="features" className="max-w-7xl mx-auto px-4 py-20 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0E9F9A] bg-[#D9F6EF] px-3.5 py-1.5 rounded-full border border-[#0E9F9A]/20">
            Core Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#081C35] mt-3">
            Why Choose MindPluze
          </h2>
          <p className="text-slate-500 mt-3 text-base sm:text-lg">
            Cutting-edge AI combined with ethical, trauma-informed clinical care standards.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#0E9F9A]/40 transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#E8F3FC] text-[#0E9F9A] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#081C35]">{f.title}</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-[#E8F3FC]/50 py-20 sm:py-24 scroll-mt-20 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#081C35] tracking-tight">
              How It Works
            </h2>
            <p className="text-slate-600 mt-3 text-base sm:text-lg">
              Getting help is simple and straightforward
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-4 relative items-start">
            {steps.map((s, idx) => (
              <div key={s.n} className="relative text-center flex flex-col items-center group">
                {/* Connecting arrow between circles for desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-10 left-[calc(50%+3.2rem)] right-[calc(-50%+3.2rem)] items-center justify-center pointer-events-none z-10">
                    <span className="text-[#0E9F9A] text-2xl font-bold opacity-80">→</span>
                  </div>
                )}

                {/* Step circle: Navy with Teal highlight */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#081C35] text-[#0E9F9A] border-2 border-[#0E9F9A] font-bold text-2xl sm:text-3xl flex items-center justify-center shadow-xl shadow-slate-300 mb-6 group-hover:scale-105 transition-transform duration-200">
                  {s.n}
                </div>

                <h3 className="text-xl font-extrabold text-[#081C35] mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-xs px-2">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two-Minute Reset / Breathe Section */}
      <BreatheSection />

      {/* Emergency CTA Band (Urgent welfare support: Soft red #FCE1E0) */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="rounded-3xl bg-[#FCE1E0] border border-[#C4453D]/30 p-8 sm:p-12 text-[#081C35] text-center shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-white text-[#C4453D] flex items-center justify-center mx-auto mb-4 shadow-xs">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#081C35]">We're Here to Help</h2>
          <p className="mt-2 text-slate-700 max-w-xl mx-auto text-base">
            If you or someone you know is in immediate distress or facing threats, reach out right now. You are not alone.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {[
              ["NHAA Helpline", "14566"],
              ["Police Control Room", "100"],
              ["Medical Ambulance", "108"],
              ["Tele-MANAS", "14416"],
            ].map(([l, n]) => (
              <a
                key={n}
                href={`tel:${n}`}
                className="inline-flex items-center gap-2 bg-[#081C35] hover:bg-[#0D2B52] text-white font-bold px-6 py-3 rounded-full transition shadow-md"
              >
                📞 {l}: <span className="text-[#0E9F9A] font-extrabold">{n}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-10 text-center text-sm text-slate-500">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-[#081C35] flex items-center justify-center text-[#0E9F9A]">
              <Brain className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-[#081C35]">MindPluze</span>
          </div>
          <p className="text-slate-600 font-medium">AI-Based Real-Time Stress & Trauma Assessment Module · NHAA 14566</p>
          <p className="text-xs text-slate-400 mt-2">© {new Date().getFullYear()} National Helpline Against Atrocities. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}