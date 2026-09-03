import React, { useState, useRef } from "react";
import { Mic, Loader2, ShieldCheck, AlertTriangle, ArrowRight, RotateCcw, Square, CheckCircle2, HeartPulse, Scale, Stethoscope, ShieldAlert, Phone, FileText } from "lucide-react";
import { base44 } from "@/api/base44Client";
import SiteNav from "@/components/SiteNav";
import Chatbot from "@/components/Chatbot";

const LANGUAGES = ["English", "हिंदी (Hindi)", "తెలుగు (Telugu)", "தமிழ் (Tamil)", "ಕನ್ನಡ (Kannada)", "मराठी (Marathi)", "বাংলা (Bengali)", "ગુજરાતી (Gujarati)", "ਪੰਜਾਬੀ (Punjabi)"];
const CONCERNS = ["Work", "Stress", "Anxiety", "Past trauma", "Depression", "Relationship issues", "Other"];

const riskStyles = {
  Low: { color: "#4E36E2", bg: "bg-purple-50", text: "text-[#4E36E2]", label: "Low Risk" },
  Moderate: { color: "#FFA07A", bg: "bg-orange-50", text: "text-[#EA580C]", label: "Moderate Risk" },
  High: { color: "#FF8C68", bg: "bg-rose-50", text: "text-rose-600", label: "High Risk" },
  Critical: { color: "#EF4444", bg: "bg-red-50", text: "text-red-700", label: "Critical Risk" },
};

const recIcons = {
  counselling: HeartPulse, "legal aid": Scale, "medical assistance": Stethoscope,
  "police intervention": ShieldAlert, "witness protection": ShieldCheck, "emergency support": Phone,
};

export default function Assessment() {
  const [step, setStep] = useState(1); // 1=consent, 2=info, 3=input, 4=analyzing, 5=results
  const [form, setForm] = useState({ full_name: "", age: "", gender: "", phone: "", language: "English", primary_concern: "", self_reported_stress: 5, input_mode: "Text", consent_given: false });
  const [narrative, setNarrative] = useState("");
  const [recording, setRecording] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [result, setResult] = useState(null);
  const [savedId, setSavedId] = useState(null);
  const [error, setError] = useState("");
  const mediaRef = useRef(null);
  const chunksRef = useRef([]);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  // Voice recording
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
      setError("Microphone access denied. Please use text input instead.");
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
      if (!text) setError("No speech detected. Please try again or type your concerns.");
    } catch {
      setError("Could not transcribe audio. Please type your concerns instead.");
    } finally {
      setTranscribing(false);
    }
  };

  const runAnalysis = async () => {
    if (!narrative.trim()) {
      setError("Please provide a narrative before analysis.");
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
      // Save assessment
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
    setStep(1); setForm({ full_name: "", age: "", gender: "", phone: "", language: "English", primary_concern: "", self_reported_stress: 5, input_mode: "Text", consent_given: false });
    setNarrative(""); setResult(null); setSavedId(null); setError("");
  };

  return (
    <div className="min-h-screen bg-[#EEF2F8] text-[#1E1B4B]">
      <SiteNav />
      <Chatbot />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200/80 text-[#4E36E2] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 shadow-soft">
            <span className="w-2 h-2 rounded-full bg-[#4E36E2] animate-pulse" />
            NHAA 14566 Clinical Screening Engine
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E1B4B] tracking-tight">
            Stress & Trauma Assessment
          </h1>
          <p className="text-[#8E95B2] mt-2 text-sm sm:text-base font-medium max-w-xl mx-auto">
            AI-enabled real-time psychological assessment and objective vulnerability screening.
          </p>
        </div>

        {/* Soft-UI Stepper Card */}
        <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-slate-100 shadow-soft mb-8">
          <div className="grid grid-cols-4 gap-2 relative">
            {[
              { n: "01", name: "Consent", id: 1 },
              { n: "02", name: "Details", id: 2 },
              { n: "03", name: "Input", id: 3 },
              { n: "04", name: "Results", id: 5 }
            ].map((s) => {
              const isCurrent = (step === s.id) || (step === 4 && s.id === 3);
              const isDone = (step > s.id) || (step === 5 && s.id < 5);
              return (
                <div key={s.n} className="flex flex-col items-center text-center relative z-10">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-black text-sm transition-all duration-300 shadow-soft mb-2.5 ${
                      isDone
                        ? "bg-[#4E36E2] text-white shadow-soft-purple"
                        : isCurrent
                        ? "bg-gradient-to-tr from-[#FF8C68] to-[#4E36E2] text-white ring-4 ring-[#4E36E2]/20 shadow-soft-purple"
                        : "bg-[#F4F6FB] text-[#8E95B2] border border-slate-200/60"
                    }`}
                  >
                    {isDone ? "✓" : s.n}
                  </div>
                  <span
                    className={`text-xs font-bold transition-colors ${
                      isCurrent ? "text-[#4E36E2] font-black" : isDone ? "text-[#1E1B4B]" : "text-[#8E95B2]"
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
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl px-5 py-4 flex items-center gap-3 font-semibold">
            <AlertTriangle className="w-5 h-5 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        {/* STEP 1: Consent */}
        {step === 1 && (
          <div className="bg-white rounded-[32px] shadow-soft-lg border border-slate-100 p-7 sm:p-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-purple-50 text-[#4E36E2] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[#4E36E2]" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#1E1B4B]">Informed Consent</h2>
                <p className="text-xs text-[#8E95B2] font-semibold">Confidential & Voluntary AI Assessment</p>
              </div>
            </div>
            <div className="space-y-3.5 text-sm text-slate-600 font-medium">
              <p className="leading-relaxed">This module uses AI (NLP, speech analytics and Emotion AI) to assess stress, trauma and vulnerability from your voice or text. Your responses are analyzed to generate a Stress Vulnerability Index and support recommendations.</p>
              <ul className="space-y-2.5 pt-2">
                <li className="flex items-start gap-2.5"><CheckCircle2 className="w-5 h-5 text-[#4E36E2] shrink-0" /> Your data is kept confidential, encrypted, and stored securely.</li>
                <li className="flex items-start gap-2.5"><CheckCircle2 className="w-5 h-5 text-[#4E36E2] shrink-0" /> Participation is voluntary. You may decline or stop anytime.</li>
                <li className="flex items-start gap-2.5"><CheckCircle2 className="w-5 h-5 text-[#4E36E2] shrink-0" /> This is a screening tool, not a medical diagnosis.</li>
                <li className="flex items-start gap-2.5"><CheckCircle2 className="w-5 h-5 text-[#4E36E2] shrink-0" /> Ethical AI standards are maintained throughout.</li>
              </ul>
            </div>
            <label className="mt-6 flex items-start gap-3 cursor-pointer bg-[#F4F6FB] rounded-2xl p-4 sm:p-5 border border-slate-200/70">
              <input type="checkbox" checked={form.consent_given} onChange={(e) => update("consent_given", e.target.checked)} className="mt-1 w-5 h-5 accent-[#4E36E2]" />
              <span className="text-xs sm:text-sm text-[#1E1B4B] font-semibold">I have read and understood the above. I give informed consent for AI-based analysis of my responses.</span>
            </label>
            <button
              disabled={!form.consent_given}
              onClick={() => setStep(2)}
              className="mt-6 w-full bg-[#4E36E2] hover:bg-[#3C28B6] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 transition shadow-soft-purple text-base cursor-pointer"
            >
              Continue <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* STEP 2: Details */}
        {step === 2 && (
          <div className="bg-white rounded-[32px] shadow-soft-lg border border-slate-100 p-7 sm:p-10">
            <h2 className="text-xl sm:text-2xl font-black text-[#1E1B4B] mb-6">Complainant Details</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Full Name (optional)"><input value={form.full_name} onChange={(e) => update("full_name", e.target.value)} className="soft-input" placeholder="Name" /></Field>
              <Field label="Age"><input type="number" value={form.age} onChange={(e) => update("age", e.target.value)} className="soft-input" placeholder="Age" /></Field>
              <Field label="Gender">
                <select value={form.gender} onChange={(e) => update("gender", e.target.value)} className="soft-input">
                  <option value="">Select</option><option>Male</option><option>Female</option><option>Other</option><option>Prefer not to say</option>
                </select>
              </Field>
              <Field label="Phone (optional)"><input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="soft-input" placeholder="Phone" /></Field>
              <Field label="Language / Dialect">
                <select value={form.language} onChange={(e) => update("language", e.target.value)} className="soft-input">
                  {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
                </select>
              </Field>
              <Field label="Primary Concern">
                <select value={form.primary_concern} onChange={(e) => update("primary_concern", e.target.value)} className="soft-input">
                  <option value="">Select</option>{CONCERNS.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>
            </div>
            <div className="mt-6 bg-[#F4F6FB] p-5 rounded-2xl border border-slate-200/60">
              <label className="text-sm font-bold text-[#1E1B4B]">Self-reported stress level: <span className="font-black text-[#4E36E2] text-base ml-1">{form.self_reported_stress}/10</span></label>
              <input type="range" min={1} max={10} value={form.self_reported_stress} onChange={(e) => update("self_reported_stress", Number(e.target.value))} className="w-full mt-3 accent-[#4E36E2]" />
              <div className="flex justify-between text-xs text-[#8E95B2] font-semibold mt-1"><span>Low (1)</span><span>High (10)</span></div>
            </div>
            <div className="mt-6">
              <label className="text-sm font-bold text-[#1E1B4B] mb-2.5 block">Input Method</label>
              <div className="grid grid-cols-2 gap-4">
                {[["Text", "Type your experience"], ["Voice", "Speak your experience"]].map(([m, d]) => (
                  <button key={m} onClick={() => update("input_mode", m)} className={`p-5 rounded-2xl border-2 text-left transition cursor-pointer ${form.input_mode === m ? "border-[#4E36E2] bg-purple-50/50 shadow-soft" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                    <div className="flex items-center gap-2 font-bold text-[#1E1B4B]">{m === "Voice" ? <Mic className="w-5 h-5 text-[#FF8C68]" /> : <FileText className="w-5 h-5 text-[#4E36E2]" />} {m}</div>
                    <p className="text-xs text-[#8E95B2] font-medium mt-1">{d}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-7 flex gap-3">
              <button onClick={() => setStep(1)} className="px-6 py-3.5 rounded-full border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 cursor-pointer">Back</button>
              <button onClick={() => setStep(3)} className="flex-1 bg-[#4E36E2] hover:bg-[#3C28B6] text-white font-bold py-3.5 rounded-full flex items-center justify-center gap-2 transition shadow-soft-purple cursor-pointer">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Input */}
        {step === 3 && (
          <div className="bg-white rounded-[32px] shadow-soft-lg border border-slate-100 p-7 sm:p-10">
            <h2 className="text-xl sm:text-2xl font-black text-[#1E1B4B] mb-1">{form.input_mode === "Voice" ? "Voice Assessment" : "Text Assessment"}</h2>
            <p className="text-sm text-[#8E95B2] font-medium mb-6">Express your experience in {form.language}. Speak or type freely — there is no right or wrong.</p>

            {form.input_mode === "Voice" ? (
              <div className="text-center py-8 bg-[#F4F6FB] rounded-3xl border border-slate-200/60 p-6">
                <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center shadow-soft transition-transform ${recording ? "bg-red-50 animate-pulse scale-110" : "bg-white"}`}>
                  <Mic className={`w-10 h-10 ${recording ? "text-red-500" : "text-[#4E36E2]"}`} />
                </div>
                <p className="mt-4 text-sm font-bold text-[#1E1B4B]">
                  {recording ? "Listening... speak now" : transcribing ? "Transcribing your speech..." : "Press to start recording"}
                </p>
                {!recording && !transcribing && (
                  <button onClick={startRecording} className="mt-4 bg-[#4E36E2] hover:bg-[#3C28B6] text-white font-bold px-7 py-3 rounded-full inline-flex items-center gap-2 transition shadow-soft-purple cursor-pointer">
                    <Mic className="w-4 h-4" /> Start Recording
                  </button>
                )}
                {recording && (
                  <button onClick={stopRecording} className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold px-7 py-3 rounded-full inline-flex items-center gap-2 transition shadow-md cursor-pointer">
                    <Square className="w-4 h-4" /> Stop Recording
                  </button>
                )}
                {transcribing && <Loader2 className="w-6 h-6 text-[#4E36E2] animate-spin mx-auto mt-4" />}
              </div>
            ) : null}

            {narrative && (
              <div className="mt-6">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1E1B4B] mb-2 block">Transcribed / Typed Narrative</label>
                <textarea value={narrative} onChange={(e) => setNarrative(e.target.value)} rows={6} className="soft-input resize-none" placeholder="Your narrative appears here — you can edit it." />
                <p className="text-xs text-[#8E95B2] font-semibold mt-1">{narrative.trim().split(/\s+/).filter(Boolean).length} words detected</p>
              </div>
            )}

            {form.input_mode === "Text" && (
              <div className="mt-6">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1E1B4B] mb-2 block">Describe your experience and how you have been feeling</label>
                <textarea value={narrative} onChange={(e) => setNarrative(e.target.value)} rows={6} className="soft-input resize-none" placeholder="Share what happened and how you are feeling..." />
                <p className="text-xs text-[#8E95B2] font-semibold mt-1">{narrative.trim().split(/\s+/).filter(Boolean).length} words</p>
              </div>
            )}

            <div className="mt-7 flex gap-3">
              <button onClick={() => setStep(2)} className="px-6 py-3.5 rounded-full border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 cursor-pointer">Back</button>
              <button onClick={runAnalysis} disabled={!narrative.trim()} className="flex-1 bg-[#4E36E2] hover:bg-[#3C28B6] disabled:opacity-40 text-white font-bold py-3.5 rounded-full flex items-center justify-center gap-2 transition shadow-soft-purple cursor-pointer">
                Analyze with AI <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Analyzing */}
        {step === 4 && (
          <div className="bg-white rounded-[32px] shadow-soft-lg border border-slate-100 p-12 text-center">
            <Loader2 className="w-14 h-14 text-[#4E36E2] animate-spin mx-auto" />
            <h2 className="mt-5 text-2xl font-black text-[#1E1B4B]">Analyzing your responses...</h2>
            <p className="text-sm text-[#8E95B2] font-medium mt-2 max-w-md mx-auto">AI is assessing stress, trauma and vulnerability indicators using NLP and acoustic speech analytics.</p>
          </div>
        )}

        {/* STEP 5: Results */}
        {step === 5 && result && (
          <ResultsView result={result} savedId={savedId} onReset={reset} />
        )}
      </div>

      <style>{`.soft-input{width:100%;padding:0.75rem 1rem;border:1px solid #e2e8f0;border-radius:1rem;background:#F4F6FB;font-size:0.875rem;font-weight:500;outline:none;color:#1E1B4B}.soft-input:focus{box-shadow:0 0 0 3px rgba(78,54,226,.15);border-color:#4E36E2}`}</style>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-wider text-[#1E1B4B] mb-2 block">{label}</label>
      {children}
    </div>
  );
}

function ResultsView({ result, savedId, onReset }) {
  const { svi_score, risk_category, detected_indicators, recommendations, summary, voice_features } = result;
  const rs = riskStyles[risk_category] || riskStyles.Moderate;
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (svi_score / 100) * circumference;

  return (
    <div className="space-y-6">
      {/* Success banner */}
      <div className="bg-white rounded-[32px] shadow-soft border border-slate-100 p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-8 h-8 text-[#4E36E2]" />
        </div>
        <h2 className="mt-4 text-2xl font-black text-[#1E1B4B]">Assessment Complete</h2>
        <p className="text-sm text-[#8E95B2] font-medium mt-1">AI analysis complete. A counselor will follow up based on your risk level.</p>
        {savedId && <p className="mt-2 text-xs font-mono font-bold text-[#4E36E2]">Reference ID saved to database: {savedId}</p>}
      </div>

      {/* SVI Gauge */}
      <div className="bg-white rounded-[32px] shadow-soft border border-slate-100 p-8">
        <h3 className="text-xs font-bold text-[#8E95B2] uppercase tracking-wider">Stress Vulnerability Index</h3>
        <div className="flex flex-col sm:flex-row items-center gap-8 mt-6">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="70" fill="none" stroke="#F4F6FB" strokeWidth="14" />
              <circle cx="80" cy="80" r="70" fill="none" stroke={rs.color} strokeWidth="14" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-[#1E1B4B]">{svi_score}</span>
              <span className="text-xs text-[#8E95B2] font-bold">out of 100</span>
            </div>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <span className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-black shadow-xs ${rs.bg} ${rs.text}`}>
              <AlertTriangle className="w-4 h-4" /> {rs.label}
            </span>
            <p className="text-sm text-slate-600 font-medium mt-3 leading-relaxed">
              {risk_category === "Critical" && "Immediate escalation triggered. Emergency support is being notified."}
              {risk_category === "High" && "High vulnerability detected. Priority counselling and support recommended."}
              {risk_category === "Moderate" && "Moderate stress detected. Counselling and follow-up recommended."}
              {risk_category === "Low" && "Low stress levels detected. Continued support and monitoring recommended."}
            </p>
          </div>
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="bg-white rounded-[32px] shadow-soft border border-slate-100 p-8">
          <h3 className="text-xs font-bold text-[#8E95B2] uppercase tracking-wider mb-2">Clinical Summary</h3>
          <p className="text-sm text-slate-700 font-medium leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Detected indicators */}
      {detected_indicators?.length > 0 && (
        <div className="bg-white rounded-[32px] shadow-soft border border-slate-100 p-8">
          <h3 className="text-xs font-bold text-[#8E95B2] uppercase tracking-wider mb-3">Detected Indicators</h3>
          <div className="flex flex-wrap gap-2.5">
            {detected_indicators.map((ind) => (
              <span key={ind} className="px-4 py-2 rounded-full bg-rose-50 text-rose-600 text-xs font-bold border border-rose-100">{ind}</span>
            ))}
          </div>
        </div>
      )}

      {/* Voice features */}
      {voice_features && (
        <div className="bg-white rounded-[32px] shadow-soft border border-slate-100 p-8">
          <h3 className="text-xs font-bold text-[#8E95B2] uppercase tracking-wider mb-4">Voice Analytics</h3>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            {Object.entries(voice_features).filter(([, v]) => v).map(([k, v]) => (
              <div key={k} className="flex justify-between bg-[#F4F6FB] rounded-2xl px-4 py-3 border border-slate-200/50">
                <span className="text-[#8E95B2] capitalize font-medium">{k.replace(/_/g, " ")}</span>
                <span className="font-bold text-[#1E1B4B]">{String(v)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {recommendations?.length > 0 && (
        <div className="bg-white rounded-[32px] shadow-soft border border-slate-100 p-8">
          <h3 className="text-xs font-bold text-[#8E95B2] uppercase tracking-wider mb-3">Recommended Support</h3>
          <div className="space-y-3">
            {recommendations.map((r) => {
              const Icon = recIcons[String(r).toLowerCase().trim()] || CheckCircle2;
              return (
                <div key={r} className="flex items-center gap-3 bg-[#F4F6FB] rounded-2xl px-5 py-3.5 border border-slate-200/60">
                  <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shadow-xs"><Icon className="w-5 h-5 text-[#4E36E2]" /></div>
                  <span className="text-sm font-bold text-[#1E1B4B] capitalize">{r}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Emergency banner for critical */}
      {risk_category === "Critical" && (
        <div className="rounded-[32px] bg-rose-50 border border-rose-100 p-8 text-[#1E1B4B]">
          <div className="flex items-center gap-2 font-black text-rose-600"><AlertTriangle className="w-5 h-5" /> Immediate Support Available</div>
          <div className="mt-4 flex flex-wrap gap-3">
            {[["NHAA", "14566"], ["Police", "100"], ["Medical", "108"]].map(([l, n]) => (
              <a key={n} href={`tel:${n}`} className="bg-rose-600 text-white font-bold px-5 py-2.5 rounded-full text-xs shadow-sm">{l}: {n}</a>
            ))}
          </div>
        </div>
      )}

      <button onClick={onReset} className="w-full bg-[#4E36E2] hover:bg-[#3C28B6] text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 shadow-soft-purple transition cursor-pointer text-base">
        <RotateCcw className="w-5 h-5" /> New Assessment
      </button>
    </div>
  );
}