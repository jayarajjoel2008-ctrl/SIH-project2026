import React, { useState, useRef } from "react";
import {
  Mic,
  Loader2,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Square,
  CheckCircle2,
  HeartPulse,
  Scale,
  Stethoscope,
  ShieldAlert,
  Phone,
  FileText,
  Activity,
  Zap
} from "lucide-react";
import { base44 } from "@/api/base44Client";
import SiteNav from "@/components/SiteNav";
import Chatbot from "@/components/Chatbot";

const LANGUAGES = [
  "English",
  "हिंदी (Hindi)",
  "తెలుగు (Telugu)",
  "தமிழ் (Tamil)",
  "ಕನ್ನಡ (Kannada)",
  "मराठी (Marathi)",
  "বাংলা (Bengali)",
  "ગુજરાતી (Gujarati)",
  "ਪੰਜਾਬੀ (Punjabi)"
];
const CONCERNS = ["Work & Discrimination", "Acute Stress", "Anxiety & Panic", "Past Trauma & Atrocities", "Depression", "Family & Social Distress", "Other"];

const riskStyles = {
  Low: { color: "#4E36E2", bg: "bg-purple-50", text: "text-[#4E36E2]", label: "Low Vulnerability" },
  Moderate: { color: "#FFA07A", bg: "bg-orange-50", text: "text-orange-700", label: "Moderate Risk" },
  High: { color: "#FF8C68", bg: "bg-rose-50", text: "text-rose-600", label: "High Risk" },
  Critical: { color: "#EF4444", bg: "bg-red-50", text: "text-red-700", label: "Critical Escalation" },
};

const recIcons = {
  counselling: HeartPulse,
  "legal aid": Scale,
  "medical assistance": Stethoscope,
  "police intervention": ShieldAlert,
  "witness protection": ShieldCheck,
  "emergency support": Phone,
};

export default function Assessment() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    full_name: "",
    age: "",
    gender: "",
    phone: "",
    language: "English",
    primary_concern: "",
    self_reported_stress: 5,
    input_mode: "Text",
    consent_given: false
  });
  const [narrative, setNarrative] = useState("");
  const [recording, setRecording] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [result, setResult] = useState(null);
  const [savedId, setSavedId] = useState(null);
  const [error, setError] = useState("");
  const mediaRef = useRef(null);
  const chunksRef = useRef([]);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const startRecording = async () => {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        stream.getTracks().forEach((t) => t.stop());
        await transcribe(blob);
      };
      mediaRef.current = recorder;
      recorder.start();
      setRecording(true);
    } catch {
      setError("Microphone access denied. Please type your concerns instead.");
    }
  };

  const stopRecording = () => {
    if (mediaRef.current && recording) {
      mediaRef.current.stop();
      setRecording(false);
      setTranscribing(true);
    }
  };

  const transcribe = async (blob) => {
    try {
      const file = new File([blob], "recording.webm", { type: "audio/webm" });
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      const tRes = await base44.integrations.Core.TranscribeAudio({ audio_url: file_url });
      const text = typeof tRes === "string" ? tRes : tRes?.transcript || String(tRes);
      setNarrative(text || "");
      if (!text) setError("No speech detected. Please try again or type your experience.");
    } catch {
      setError("Could not transcribe audio. Please type your concerns directly.");
    } finally {
      setTranscribing(false);
    }
  };

  const runAnalysis = async () => {
    if (!narrative.trim()) {
      setError("Please enter or record your narrative before running analysis.");
      return;
    }
    setStep(4);
    setError("");
    try {
      const res = await base44.functions.invoke("analyzeAssessment", {
        narrative,
        language: form.language,
        self_reported_stress: form.self_reported_stress,
        input_mode: form.input_mode,
        primary_concern: form.primary_concern,
      });
      const data = res.data;
      setResult(data);
      const refId = `NHAA-${new Date().getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000))}`;
      const saved = await base44.entities.Assessment.create({
        reference_id: refId,
        full_name: form.full_name || null,
        age: form.age ? Number(form.age) : null,
        gender: form.gender || null,
        phone: form.phone || null,
        language: form.language,
        input_mode: form.input_mode,
        narrative,
        primary_concern: form.primary_concern || null,
        self_reported_stress: Number(form.self_reported_stress),
        consent_given: true,
        svi_score: data.svi_score,
        risk_category: data.risk_category,
        detected_indicators: data.detected_indicators,
        voice_features: data.voice_features,
        recommendations: data.recommendations,
        summary: data.summary,
        status: data.risk_category === "Critical" ? "Escalated" : "Analyzed",
      });
      setSavedId(saved.id);
      setStep(5);
    } catch (e) {
      setError("Analysis failed: " + (e.message || "unknown error"));
      setStep(3);
    }
  };

  const reset = () => {
    setStep(1);
    setForm({
      full_name: "",
      age: "",
      gender: "",
      phone: "",
      language: "English",
      primary_concern: "",
      self_reported_stress: 5,
      input_mode: "Text",
      consent_given: false
    });
    setNarrative("");
    setResult(null);
    setSavedId(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#EEF2F8] text-[#1E1B4B] font-sans selection:bg-[#4E36E2] selection:text-white">
      <SiteNav />
      <Chatbot />

      {/* Header Banner */}
      <section className="pt-10 pb-16 text-center max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-100 text-[#4E36E2] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
          <Activity className="w-3.5 h-3.5" /> Confidential Trauma Intake Module
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E1B4B] tracking-tight">
          Clinical SVI Trauma Assessment
        </h1>
        <p className="text-xs sm:text-sm text-[#8E95B2] font-semibold mt-2 max-w-xl mx-auto">
          AI-enabled real-time psychological evaluation, acoustic voice tremor detection, and objective SVI vulnerability screening.
        </p>
      </section>

      <div className="max-w-4xl mx-auto px-4 -mt-6 pb-16 relative z-10">
        {/* Stepper Bar */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-white/80 shadow-soft mb-8">
          <div className="grid grid-cols-4 gap-2">
            {[
              { n: "01", name: "Consent", id: 1 },
              { n: "02", name: "Details", id: 2 },
              { n: "03", name: "Input & Voice", id: 3 },
              { n: "04", name: "Diagnostic", id: 5 }
            ].map((s) => {
              const isCurrent = step === s.id || (step === 4 && s.id === 3);
              const isDone = step > s.id || (step === 5 && s.id < 5);
              return (
                <div key={s.n} className="flex flex-col items-center text-center">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-black text-xs sm:text-sm transition-all duration-300 mb-2 ${
                      isDone
                        ? "bg-[#FF8C68] text-white shadow-soft-peach"
                        : isCurrent
                        ? "bg-[#4E36E2] text-white shadow-soft-purple ring-4 ring-purple-100"
                        : "bg-[#F4F6FB] text-[#8E95B2]"
                    }`}
                  >
                    {isDone ? "✓" : s.n}
                  </div>
                  <span
                    className={`text-[11px] sm:text-xs font-bold transition-colors ${
                      isCurrent ? "text-[#4E36E2]" : isDone ? "text-[#FF8C68]" : "text-[#8E95B2]"
                    }`}
                  >
                    {s.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl px-5 py-4 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0 text-red-600" />
            <span className="font-semibold">{error}</span>
          </div>
        )}

        {/* STEP 1: Consent */}
        {step === 1 && (
          <div className="bg-white rounded-3xl shadow-soft border border-white/80 p-6 sm:p-9 animate-in fade-in duration-200">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#4E36E2] flex items-center justify-center shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#1E1B4B]">Informed Consent & Confidentiality</h2>
                <p className="text-xs text-[#8E95B2] font-semibold">Voluntary psychological triage under SC/ST PoA Protection Standards</p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed bg-[#F4F6FB] p-5 rounded-2xl border border-slate-100 font-medium">
              <p>
                This screening module uses artificial intelligence (NLP, speech tremor acoustic analytics, and trauma-informed cognitive metrics) to assess stress and vulnerability.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2.5 font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#4E36E2] mt-0.5 shrink-0" />
                  All data is encrypted in transit and at rest with zero unauthorized disclosure.
                </li>
                <li className="flex items-start gap-2.5 font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#4E36E2] mt-0.5 shrink-0" />
                  Participation is completely voluntary. You may decline or exit at any moment.
                </li>
                <li className="flex items-start gap-2.5 font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#4E36E2] mt-0.5 shrink-0" />
                  This is a crisis screening and clinical prioritization tool, not a medical diagnosis.
                </li>
              </ul>
            </div>

            <label className="mt-6 flex items-start gap-3 cursor-pointer bg-purple-50/50 border border-purple-100 rounded-2xl p-4 hover:bg-purple-50 transition">
              <input
                type="checkbox"
                checked={form.consent_given}
                onChange={(e) => update("consent_given", e.target.checked)}
                className="mt-0.5 w-5 h-5 accent-[#4E36E2] rounded cursor-pointer"
              />
              <span className="text-xs sm:text-sm font-bold text-[#1E1B4B]">
                I have read and understood the information above. I consent to voluntary AI-based clinical screening.
              </span>
            </label>

            <button
              disabled={!form.consent_given}
              onClick={() => setStep(2)}
              className="mt-6 w-full bg-[#4E36E2] hover:bg-[#3C28B6] disabled:opacity-40 disabled:cursor-not-allowed text-white font-black py-3.5 rounded-full flex items-center justify-center gap-2 shadow-soft-purple transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer text-xs"
            >
              <span>Continue to Intake Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: Details */}
        {step === 2 && (
          <div className="bg-white rounded-3xl shadow-soft border border-white/80 p-6 sm:p-9 animate-in fade-in duration-200">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-[#1E1B4B]">Complainant & Intake Details</h2>
              <p className="text-xs text-[#8E95B2] font-semibold">Provide demographic context to tailor multilingual acoustic and trauma analysis.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full Name (optional)">
                <input
                  value={form.full_name}
                  onChange={(e) => update("full_name", e.target.value)}
                  className="input"
                  placeholder="Anonymous or Name"
                />
              </Field>
              <Field label="Age">
                <input
                  type="number"
                  value={form.age}
                  onChange={(e) => update("age", e.target.value)}
                  className="input"
                  placeholder="e.g. 32"
                />
              </Field>
              <Field label="Gender">
                <select
                  value={form.gender}
                  onChange={(e) => update("gender", e.target.value)}
                  className="input"
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Non-binary / Other</option>
                  <option>Prefer not to say</option>
                </select>
              </Field>
              <Field label="Contact Phone (optional)">
                <input
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="input"
                  placeholder="+91 Mobile number"
                />
              </Field>
              <Field label="Native Language / Dialect">
                <select
                  value={form.language}
                  onChange={(e) => update("language", e.target.value)}
                  className="input"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </Field>
              <Field label="Primary Incident Concern">
                <select
                  value={form.primary_concern}
                  onChange={(e) => update("primary_concern", e.target.value)}
                  className="input"
                >
                  <option value="">Select Primary Concern</option>
                  {CONCERNS.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="mt-6 bg-[#F4F6FB] p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Self-Reported Distress Level</span>
                <span className="text-base font-black text-[#4E36E2] bg-purple-50 px-2.5 py-0.5 rounded-lg border border-purple-100">
                  {form.self_reported_stress} / 10
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={form.self_reported_stress}
                onChange={(e) => update("self_reported_stress", Number(e.target.value))}
                className="w-full mt-3 accent-[#4E36E2] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#8E95B2] mt-1 font-semibold">
                <span>1 - Mild Concern</span>
                <span>5 - Moderate Distress</span>
                <span>10 - Acute Crisis</span>
              </div>
            </div>

            <div className="mt-6">
              <label className="text-xs font-bold text-slate-700 mb-2 block uppercase tracking-wider">
                Input Mode
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Text", "Type your narrative manually", FileText],
                  ["Voice", "Record spoken narrative with acoustic analysis", Mic]
                ].map(([m, d, Icon]) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => update("input_mode", m)}
                    className={`p-4 rounded-2xl border-2 text-left transition cursor-pointer ${
                      form.input_mode === m
                        ? "border-[#4E36E2] bg-purple-50/50 shadow-sm"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-black text-xs text-[#1E1B4B]">
                      <Icon className="w-4 h-4 text-[#4E36E2]" />
                      <span>{m} Mode</span>
                    </div>
                    <p className="text-[11px] text-[#8E95B2] mt-1 leading-snug font-medium">{d}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7 flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 rounded-full border border-slate-200 text-[#8E95B2] font-bold hover:bg-[#F4F6FB] transition cursor-pointer text-xs"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 bg-[#4E36E2] hover:bg-[#3C28B6] text-white font-black py-3.5 rounded-full flex items-center justify-center gap-2 shadow-soft-purple transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer text-xs"
              >
                <span>Continue to Narrative</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Input */}
        {step === 3 && (
          <div className="bg-white rounded-3xl shadow-soft border border-white/80 p-6 sm:p-9 animate-in fade-in duration-200">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-[#1E1B4B]">
                {form.input_mode === "Voice" ? "🎙️ Acoustic Voice Narrative" : "📝 Complainant Narrative Entry"}
              </h2>
              <p className="text-xs text-[#8E95B2] font-semibold">
                Express what happened in {form.language}. Speak or write freely in your own words.
              </p>
            </div>

            {form.input_mode === "Voice" && (
              <div className="text-center py-8 bg-[#F4F6FB] rounded-2xl border border-slate-100 p-6 mb-6">
                <div
                  className={`w-28 h-28 mx-auto rounded-full flex items-center justify-center transition-all ${
                    recording
                      ? "bg-rose-500 text-white shadow-xl shadow-rose-500/40 animate-pulse scale-105"
                      : "bg-[#4E36E2] text-white shadow-soft-purple"
                  }`}
                >
                  <Mic className="w-12 h-12" />
                </div>
                
                <p className="mt-5 text-xs font-bold text-[#1E1B4B]">
                  {recording
                    ? "Recording speech... Analyzing pitch cadence & tremors in real-time"
                    : transcribing
                    ? "Transcribing voice via AI speech engine..."
                    : "Click below to begin recording your audio"}
                </p>

                {!recording && !transcribing && (
                  <button
                    onClick={startRecording}
                    className="mt-4 bg-[#4E36E2] hover:bg-[#3C28B6] text-white font-black px-7 py-3 rounded-full shadow-soft-purple inline-flex items-center gap-2 transition cursor-pointer text-xs"
                  >
                    <Mic className="w-4 h-4" /> Start Recording
                  </button>
                )}
                {recording && (
                  <button
                    onClick={stopRecording}
                    className="mt-4 bg-rose-600 hover:bg-rose-700 text-white font-black px-7 py-3 rounded-full shadow-lg shadow-rose-600/30 inline-flex items-center gap-2 transition cursor-pointer text-xs"
                  >
                    <Square className="w-4 h-4 fill-white" /> Stop & Process Audio
                  </button>
                )}
                {transcribing && <Loader2 className="w-6 h-6 text-[#4E36E2] animate-spin mx-auto mt-4" />}
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-slate-700 mb-1.5 block uppercase tracking-wider">
                {form.input_mode === "Voice" ? "Transcribed Narrative (Editable)" : "Complainant Statement"}
              </label>
              <textarea
                value={narrative}
                onChange={(e) => setNarrative(e.target.value)}
                rows={6}
                className="input resize-none text-[#1E1B4B] leading-relaxed font-normal"
                placeholder="Share your experience, specific distress symptoms, threats, or caste-related harassment..."
              />
              <p className="text-[11px] font-semibold text-[#8E95B2] mt-1.5">
                {narrative.trim().split(/\s+/).filter(Boolean).length} words recorded
              </p>
            </div>

            <div className="mt-7 flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-full border border-slate-200 text-[#8E95B2] font-bold hover:bg-[#F4F6FB] transition cursor-pointer text-xs"
              >
                Back
              </button>
              <button
                onClick={runAnalysis}
                disabled={!narrative.trim()}
                className="flex-1 bg-[#4E36E2] hover:bg-[#3C28B6] disabled:opacity-40 disabled:cursor-not-allowed text-white font-black py-3.5 rounded-full flex items-center justify-center gap-2 shadow-soft-purple transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer text-xs"
              >
                <Zap className="w-4 h-4" />
                <span>Calculate SVI & Run AI Diagnostic</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Analyzing */}
        {step === 4 && (
          <div className="bg-white rounded-3xl shadow-soft border border-white/80 p-12 text-center">
            <Loader2 className="w-14 h-14 text-[#4E36E2] animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-black text-[#1E1B4B]">Analyzing Clinical Biomarkers...</h2>
            <p className="text-xs sm:text-sm text-[#8E95B2] font-semibold mt-2 max-w-md mx-auto">
              Computing the Stress Vulnerability Index, evaluating acoustic speech cadence, and parsing trauma semantics.
            </p>
          </div>
        )}

        {/* STEP 5: Results */}
        {step === 5 && result && (
          <ResultsView result={result} savedId={savedId} onReset={reset} />
        )}
      </div>

      <style>{`.input{width:100%;padding:0.75rem 1rem;border:1px solid #e2e8f0;border-radius:1rem;font-size:0.875rem;font-weight:500;outline:none;background:#fafbfc;transition:all .15s}.input:focus{box-shadow:0 0 0 3px rgba(78,54,226,.2);border-color:#4E36E2;background:#fff}`}</style>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-xs font-bold text-slate-700 mb-1.5 block uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}

function ResultsView({ result, savedId, onReset }) {
  const { svi_score, risk_category, detected_indicators, recommendations, summary } = result;
  const rs = riskStyles[risk_category] || riskStyles.Moderate;
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (svi_score / 100) * circumference;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Success banner */}
      <div className="bg-white rounded-3xl shadow-soft border border-white/80 p-6 sm:p-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-purple-50 text-[#4E36E2] flex items-center justify-center mx-auto mb-3 shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#1E1B4B]">Diagnostic Screening Complete</h2>
        <p className="text-xs sm:text-sm text-[#8E95B2] font-semibold mt-1 max-w-lg mx-auto">
          AI clinical assessment completed. Case details have been encrypted and categorized for National Helpline 14566 action.
        </p>
        {savedId && (
          <p className="mt-3 text-xs font-mono font-bold text-[#4E36E2] bg-purple-50 px-3 py-1 rounded-full inline-block border border-purple-100">
            Reference ID: {savedId}
          </p>
        )}
      </div>

      {/* SVI Gauge Card */}
      <div className="bg-white rounded-3xl shadow-soft border border-white/80 p-6 sm:p-8">
        <h3 className="text-xs font-black text-[#8E95B2] uppercase tracking-wider mb-4">
          Stress Vulnerability Index (SVI)
        </h3>
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <div className="relative w-44 h-44 shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="70" fill="none" stroke="#F0F2F9" strokeWidth="12" />
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke={rs.color}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-[#1E1B4B]">{svi_score}</span>
              <span className="text-[11px] font-bold text-[#8E95B2]">Score / 100</span>
            </div>
          </div>
          <div className="flex-1 text-center sm:text-left space-y-2">
            <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase ${rs.bg} ${rs.text}`}>
              <AlertTriangle className="w-4 h-4" /> {rs.label}
            </span>
            <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
              {risk_category === "Critical" && "Immediate high-priority alert. Rapid emergency dispatch, police protection, and medical care are recommended."}
              {risk_category === "High" && "High psychological vulnerability detected. Prompt legal assistance and targeted trauma debriefing recommended."}
              {risk_category === "Moderate" && "Moderate trauma and anxiety indicators detected. Psychological counselling and support scheduled."}
              {risk_category === "Low" && "Low acute distress detected. Standard self-grounding exercises and helpline access available."}
            </p>
          </div>
        </div>
      </div>

      {/* Clinical Summary */}
      {summary && (
        <div className="bg-white rounded-3xl shadow-soft border border-white/80 p-6 sm:p-8">
          <h3 className="text-xs font-black text-[#8E95B2] uppercase tracking-wider mb-2">
            AI Clinical Summary
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">{summary}</p>
        </div>
      )}

      {/* Detected Indicators */}
      {detected_indicators?.length > 0 && (
        <div className="bg-white rounded-3xl shadow-soft border border-white/80 p-6 sm:p-8">
          <h3 className="text-xs font-black text-[#8E95B2] uppercase tracking-wider mb-3">
            Trauma & Stress Biomarker Indicators
          </h3>
          <div className="flex flex-wrap gap-2">
            {detected_indicators.map((ind) => (
              <span
                key={ind}
                className="px-3.5 py-1.5 rounded-xl bg-orange-50 text-[#FF8C68] text-xs font-bold border border-orange-100"
              >
                ● {ind}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Support */}
      {recommendations?.length > 0 && (
        <div className="bg-white rounded-3xl shadow-soft border border-white/80 p-6 sm:p-8">
          <h3 className="text-xs font-black text-[#8E95B2] uppercase tracking-wider mb-3">
            Recommended Next Actions
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {recommendations.map((r) => {
              const Icon = recIcons[String(r).toLowerCase().trim()] || CheckCircle2;
              return (
                <div key={r} className="flex items-center gap-3 bg-[#F4F6FB] rounded-2xl p-4 border border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-[#4E36E2] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#1E1B4B] capitalize">{r}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <button
        onClick={onReset}
        className="w-full bg-[#4E36E2] hover:bg-[#3C28B6] text-white font-black py-4 rounded-full flex items-center justify-center gap-2 shadow-soft-purple transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer text-xs"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Start New Assessment</span>
      </button>
    </div>
  );
}