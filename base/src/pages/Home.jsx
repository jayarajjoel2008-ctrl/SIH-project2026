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
    <div className="min-h-screen bg-gradient-to-b from-white via-[#F8FAFC] to-[#EEF2F6]">
      <SiteNav />
      <Chatbot />
      <EmergencyModal isOpen={emergencyOpen} onClose={() => setEmergencyOpen(false)} />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 pt-10 pb-16 sm:pt-16 sm:pb-24 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column: Headline, Subtitle, CTA buttons, Stats */}
        <div className="space-y-7">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#584CE4] tracking-tight leading-[1.12]">
            AI-Powered Trauma Support for NHAA Victims
          </h1>

          <p className="text-slate-600 text-lg sm:text-xl font-normal leading-relaxed max-w-xl">
            Immediate psychological assessment and crisis intervention for victims of caste-based atrocities. In partnership with National Helpline Against Atrocities (14566).
          </p>

          {/* Action Buttons matching screenshot */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/assessment"
              className="inline-flex items-center gap-2.5 bg-[#584CE4] hover:bg-[#473BC7] text-white font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02] text-base"
            >
              <Stethoscope className="w-5 h-5" /> Start Assessment
            </Link>

            <button
              onClick={openChatbot}
              className="inline-flex items-center gap-2.5 bg-white border-2 border-[#584CE4] text-[#584CE4] hover:bg-indigo-50/60 font-semibold px-7 py-3.5 rounded-full transition-all hover:scale-[1.02] text-base shadow-sm cursor-pointer"
            >
              <Bot className="w-5 h-5" /> Talk to AI
            </button>
          </div>

          {/* Stats Row matching screenshot */}
          <div className="pt-6 grid grid-cols-3 gap-6 sm:gap-10 max-w-lg border-t border-slate-100">
            <div>
              <p className="text-3xl sm:text-4xl font-black text-[#584CE4]">50K+</p>
              <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Assessments Done</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-[#584CE4]">98%</p>
              <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Accuracy Rate</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-[#584CE4]">24/7</p>
              <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Available Support</p>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual with Badges */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-100/70 border border-slate-100 bg-white">
            <img
              src="/hero-doctor.jpg"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80";
              }}
              alt="Medical professional with smartphone supporting trauma victims"
              className="w-full h-[380px] sm:h-[450px] lg:h-[480px] object-cover object-center"
            />
          </div>

          {/* Top-Left Floating Badge: 100% Confidential */}
          <div className="absolute top-5 left-5 sm:-left-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl shadow-slate-200/60 px-4 py-2.5 flex items-center gap-2.5 border border-slate-100/80 animate-in fade-in slide-in-from-top-3">
            <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-800">100% Confidential</span>
          </div>

          {/* Bottom-Right Floating Badge: Instant Results */}
          <div className="absolute bottom-6 right-5 sm:-right-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl shadow-slate-200/60 px-4 py-2.5 flex items-center gap-2.5 border border-slate-100/80 animate-in fade-in slide-in-from-bottom-3">
            <div className="w-7 h-7 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
              <Zap className="w-5 h-5 fill-amber-500" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-800">Instant Results</span>
          </div>
        </div>
      </section>

      {/* Floating Red SOS Button */}
      <button
        onClick={() => setEmergencyOpen(true)}
        className="fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full bg-[#EF4444] text-white shadow-2xl shadow-red-300 flex items-center justify-center font-black text-2xl hover:scale-110 active:scale-95 transition cursor-pointer"
        aria-label="Emergency Immediate Helplines"
        title="24/7 Emergency Helplines"
      >
        !
      </button>

      {/* NHAA integration band */}
      <section className="bg-white border-y border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#584CE4] bg-[#584CE4]/10 px-3 py-1 rounded-full mb-3">
              <ShieldCheck className="w-3.5 h-3.5" /> Official Helpline Integration
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Integrated with National Helpline Against Atrocities (14566)
            </h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              MindCare AI works alongside the National Helpline Against Atrocities (NHAA 14566) to provide comprehensive support — legal aid coordination through NHAA, and real-time trauma assessment, crisis de-escalation, and psychiatric triage through this intelligent system.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="https://socialjustice.gov.in/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#584CE4] hover:underline"
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
          <div className="bg-indigo-50/50 border border-indigo-100/60 rounded-3xl p-6 sm:p-8">
            <p className="text-base font-bold text-[#3A338F] mb-4">How MindCare AI Protects & Supports</p>
            <ul className="space-y-3.5">
              {[
                "Objective clinical trauma assessment for caste-based atrocity complainants",
                "Instant Stress Vulnerability Index (SVI 0-100) scoring & risk triage",
                "Automated recommendation routing: Medical, Legal Aid, Police, Counselling",
                "24/7 Multilingual AI companion for real-time de-escalation and emergency triage"
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-[#584CE4] shrink-0 mt-0.5" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 py-20 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#584CE4] bg-indigo-50 px-3 py-1 rounded-full">
            Core Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
            Why Choose MindCare AI
          </h2>
          <p className="text-slate-500 mt-3 text-base sm:text-lg">
            Cutting-edge AI combined with ethical, trauma-informed clinical care standards.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-3xl p-7 border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#584CE4] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{f.title}</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section matching screenshot */}
      <section id="how-it-works" className="bg-white py-20 sm:py-24 scroll-mt-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#584CE4] tracking-tight">
              How It Works
            </h2>
            <p className="text-slate-500 mt-3 text-base sm:text-lg">
              Getting help is simple and straightforward
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-4 relative items-start">
            {steps.map((s, idx) => (
              <div key={s.n} className="relative text-center flex flex-col items-center group">
                {/* Connecting arrow between circles for desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-10 left-[calc(50%+3.2rem)] right-[calc(-50%+3.2rem)] items-center justify-center pointer-events-none z-10">
                    <span className="text-[#584CE4] text-2xl font-bold opacity-60">→</span>
                  </div>
                )}

                {/* Step circle */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#584CE4] text-white font-bold text-2xl sm:text-3xl flex items-center justify-center shadow-xl shadow-indigo-200 mb-6 group-hover:scale-105 transition-transform duration-200">
                  {s.n}
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-xs px-2">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two-Minute Reset / Breathe Section matching screenshot */}
      <BreatheSection />

      {/* Emergency CTA Band */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="rounded-3xl bg-[#FFF5F5] border border-red-100 p-8 sm:p-12 text-slate-900 text-center shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">We're Here to Help</h2>
          <p className="mt-2 text-slate-600 max-w-xl mx-auto text-base">
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
                className="inline-flex items-center gap-2 bg-[#1E1B4B] hover:bg-[#312E81] text-white font-bold px-6 py-3 rounded-full transition shadow-md"
              >
                📞 {l}: <span className="text-indigo-300">{n}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-10 text-center text-sm text-slate-500">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-[#584CE4] flex items-center justify-center text-white">
              <Brain className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-[#1E1B4B]">MindCare AI</span>
          </div>
          <p className="text-slate-600 font-medium">AI-Based Real-Time Stress & Trauma Assessment Module · NHAA 14566</p>
          <p className="text-xs text-slate-400 mt-2">© {new Date().getFullYear()} National Helpline Against Atrocities. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}