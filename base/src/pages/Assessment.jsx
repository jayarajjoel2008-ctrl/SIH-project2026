import React, { useState, useRef } from "react";
import { Mic, Loader2, ShieldCheck, AlertTriangle, ArrowRight, RotateCcw, Square, CheckCircle2, HeartPulse, Scale, Stethoscope, ShieldAlert, Phone, FileText } from "lucide-react";
import { base44 } from "@/api/base44Client";
import SiteNav from "@/components/SiteNav";
import Chatbot from "@/components/Chatbot";

const LANGUAGES = ["English", "हिंदी (Hindi)", "తెలుగు (Telugu)", "தமிழ் (Tamil)", "ಕನ್ನಡ (Kannada)", "मराठी (Marathi)", "বাংলা (Bengali)", "ગુજરાતી (Gujarati)", "ਪੰਜਾਬੀ (Punjabi)"];
const CONCERNS = ["Work", "Stress", "Anxiety", "Past trauma", "Depression", "Relationship issues", "Other"];

const riskStyles = {
  Low: { color: "#0E9F9A", bg: "bg-[#D9F6EF]", text: "text-[#0E9F9A]", label: "Low Risk" },
  Moderate: { color: "#D9A600", bg: "bg-[#FFF0C2]", text: "text-[#9A7000]", label: "Moderate Risk" },
  High: { color: "#E8786D", bg: "bg-[#FCE1E0]", text: "text-[#C4453D]", label: "High Risk" },
  Critical: { color: "#C4453D", bg: "bg-[#FCE1E0]", text: "text-[#9A2A22]", label: "Critical Risk" },
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
    } catch (e) {
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
    } catch (e) {
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
    <div className="min-h-screen bg-gradient-to-b from-white to-[#E8F3FC]">
      <SiteNav />
      <Chatbot />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#081C35]">Stress & Trauma Assessment</h1>
          <p className="text-slate-500 mt-2">AI-enabled real-time psychological assessment for NHAA 14566 complainants.</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {["Consent", "Details", "Input", "Results"].map((s, i) => (
            <React.Fragment key={s}>
              <div className={`flex items-center gap-1.5 text-sm ${step >= i + 1 || (step === 5 && i === 3) ? "text-[#0E9F9A] font-semibold" : "text-slate-400"}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= i + 1 || (step === 5 && i === 3) ? "bg-[#0E9F9A] text-white" : "bg-slate-200"}`}>{i + 1}</span>
                {s}
              </div>
              {i < 3 && <div className={`w-8 h-0.5 ${step > i + 1 ? "bg-[#0E9F9A]" : "bg-slate-200"}`} />}
            </React.Fragment>
          ))}
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" /> {error}
          </div>
        )}

        {/* STEP 1: Consent */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-6 h-6 text-[#0E9F9A]" />
              <h2 className="text-xl font-semibold text-[#081C35]">Informed Consent</h2>
            </div>
            <div className="space-y-3 text-sm text-slate-600">
              <p>This module uses AI (NLP, speech analytics and Emotion AI) to assess stress, trauma and vulnerability from your voice or text. Your responses are analyzed to generate a Stress Vulnerability Index and support recommendations.</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#0E9F9A] mt-0.5 shrink-0" /> Your data is kept confidential and stored securely.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#0E9F9A] mt-0.5 shrink-0" /> Participation is voluntary. You may decline or stop anytime.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#0E9F9A] mt-0.5 shrink-0" /> This is a screening tool, not a medical diagnosis.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#0E9F9A] mt-0.5 shrink-0" /> Ethical AI standards are maintained throughout.</li>
              </ul>
            </div>
            <label className="mt-5 flex items-start gap-2.5 cursor-pointer bg-[#E8F3FC] rounded-xl p-4">
              <input type="checkbox" checked={form.consent_given} onChange={(e) => update("consent_given", e.target.checked)} className="mt-0.5 w-5 h-5 accent-[#0E9F9A]" />
              <span className="text-sm text-slate-700">I have read and understood the above. I give informed consent for AI-based analysis of my responses.</span>
            </label>
            <button
              disabled={!form.consent_given}
              onClick={() => setStep(2)}
              className="mt-5 w-full bg-[#0E9F9A] hover:bg-[#081C35] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: Details */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-[#081C35] mb-5">Complainant Details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full Name (optional)"><input value={form.full_name} onChange={(e) => update("full_name", e.target.value)} className="input" placeholder="Name" /></Field>
              <Field label="Age"><input type="number" value={form.age} onChange={(e) => update("age", e.target.value)} className="input" placeholder="Age" /></Field>
              <Field label="Gender">
                <select value={form.gender} onChange={(e) => update("gender", e.target.value)} className="input">
                  <option value="">Select</option><option>Male</option><option>Female</option><option>Other</option><option>Prefer not to say</option>
                </select>
              </Field>
              <Field label="Phone (optional)"><input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="input" placeholder="Phone" /></Field>
              <Field label="Language / Dialect">
                <select value={form.language} onChange={(e) => update("language", e.target.value)} className="input">
                  {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
                </select>
              </Field>
              <Field label="Primary Concern">
                <select value={form.primary_concern} onChange={(e) => update("primary_concern", e.target.value)} className="input">
                  <option value="">Select</option>{CONCERNS.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>
            </div>
            <div className="mt-6">
              <label className="text-sm font-medium text-slate-700">Self-reported stress level: <span className="font-bold text-[#0E9F9A]">{form.self_reported_stress}/10</span></label>
              <input type="range" min={1} max={10} value={form.self_reported_stress} onChange={(e) => update("self_reported_stress", Number(e.target.value))} className="w-full mt-2 accent-[#0E9F9A]" />
              <div className="flex justify-between text-xs text-slate-400"><span>Low (1)</span><span>High (10)</span></div>
            </div>
            <div className="mt-6">
              <label className="text-sm font-medium text-slate-700 mb-2 block">Input Method</label>
              <div className="grid grid-cols-2 gap-3">
                {[["Text", "Type your experience"], ["Voice", "Speak your experience"]].map(([m, d]) => (
                  <button key={m} onClick={() => update("input_mode", m)} className={`p-4 rounded-xl border-2 text-left transition ${form.input_mode === m ? "border-[#0E9F9A] bg-[#0E9F9A]/5" : "border-slate-200 hover:border-slate-300"}`}>
                    <div className="flex items-center gap-2 font-semibold text-slate-700">{m === "Voice" ? <Mic className="w-4 h-4" /> : <FileText className="w-4 h-4" />} {m}</div>
                    <p className="text-xs text-slate-500 mt-1">{d}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setStep(1)} className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50">Back</button>
              <button onClick={() => setStep(3)} className="flex-1 bg-[#0E9F9A] hover:bg-[#081C35] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Input */}
        {step === 3 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-[#081C35] mb-1">{form.input_mode === "Voice" ? "Voice Assessment" : "Text Assessment"}</h2>
            <p className="text-sm text-slate-500 mb-5">Express your experience in {form.language}. Speak or type freely — there is no right or wrong.</p>

            {form.input_mode === "Voice" ? (
              <div className="text-center py-6">
                <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${recording ? "bg-red-50 animate-pulse" : "bg-[#0E9F9A]/10"}`}>
                  <Mic className={`w-10 h-10 ${recording ? "text-red-500" : "text-[#0E9F9A]"}`} />
                </div>
                <p className="mt-4 text-sm font-medium text-slate-600">
                  {recording ? "Listening... speak now" : transcribing ? "Transcribing your speech..." : "Press to start recording"}
                </p>
                {!recording && !transcribing && (
                  <button onClick={startRecording} className="mt-4 bg-[#0E9F9A] hover:bg-[#081C35] text-white font-semibold px-6 py-2.5 rounded-xl inline-flex items-center gap-2 transition">
                    <Mic className="w-4 h-4" /> Start Recording
                  </button>
                )}
                {recording && (
                  <button onClick={stopRecording} className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2.5 rounded-xl inline-flex items-center gap-2 transition">
                    <Square className="w-4 h-4" /> Stop Recording
                  </button>
                )}
                {transcribing && <Loader2 className="w-5 h-5 text-[#0E9F9A] animate-spin mx-auto mt-4" />}
              </div>
            ) : null}

            {narrative && (
              <div className="mt-5">
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Transcribed / Typed Narrative</label>
                <textarea value={narrative} onChange={(e) => setNarrative(e.target.value)} rows={6} className="input resize-none" placeholder="Your narrative appears here — you can edit it." />
                <p className="text-xs text-slate-400 mt-1">{narrative.trim().split(/\s+/).filter(Boolean).length} words detected</p>
              </div>
            )}

            {form.input_mode === "Text" && (
              <div className="mt-5">
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Describe your experience and how you have been feeling</label>
                <textarea value={narrative} onChange={(e) => setNarrative(e.target.value)} rows={6} className="input resize-none" placeholder="Share what happened and how you are feeling..." />
                <p className="text-xs text-slate-400 mt-1">{narrative.trim().split(/\s+/).filter(Boolean).length} words</p>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button onClick={() => setStep(2)} className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50">Back</button>
              <button onClick={runAnalysis} disabled={!narrative.trim()} className="flex-1 bg-[#0E9F9A] hover:bg-[#081C35] disabled:opacity-40 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition">
                Analyze with AI <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Analyzing */}
        {step === 4 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-10 text-center">
            <Loader2 className="w-12 h-12 text-[#0E9F9A] animate-spin mx-auto" />
            <h2 className="mt-4 text-xl font-semibold text-[#081C35]">Analyzing your responses...</h2>
            <p className="text-sm text-slate-500 mt-2">AI is assessing stress, trauma and vulnerability indicators using NLP and speech analytics.</p>
          </div>
        )}

        {/* STEP 5: Results */}
        {step === 5 && result && (
          <ResultsView result={result} savedId={savedId} form={form} onReset={reset} />
        )}
      </div>

      <style>{`.input{width:100%;padding:0.625rem 0.75rem;border:1px solid #e2e8f0;border-radius:0.6rem;font-size:0.875rem;outline:none}.input:focus{box-shadow:0 0 0 2px rgba(14,159,154,.25);border-color:#0E9F9A}`}</style>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700 mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}

function ResultsView({ result, savedId, form, onReset }) {
  const { svi_score, risk_category, detected_indicators, recommendations, summary, voice_features } = result;
  const rs = riskStyles[risk_category] || riskStyles.Moderate;
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (svi_score / 100) * circumference;

  return (
    <div className="space-y-5">
      {/* Success banner */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-[#0E9F9A]/10 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-7 h-7 text-[#0E9F9A]" />
        </div>
        <h2 className="mt-3 text-xl font-semibold text-[#081C35]">Assessment Complete</h2>
        <p className="text-sm text-slate-500 mt-1">AI analysis complete. A counselor will follow up based on your risk level.</p>
        {savedId && <p className="mt-2 text-xs text-slate-400">Reference ID saved to dashboard.</p>}
      </div>

      {/* SVI Gauge */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Stress Vulnerability Index</h3>
        <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
          <div className="relative w-44 h-44">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="70" fill="none" stroke="#e2e8f0" strokeWidth="12" />
              <circle cx="80" cy="80" r="70" fill="none" stroke={rs.color} strokeWidth="12" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-[#081C35]">{svi_score}</span>
              <span className="text-xs text-slate-400">out of 100</span>
            </div>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold ${rs.bg} ${rs.text}`}>
              <AlertTriangle className="w-4 h-4" /> {rs.label}
            </span>
            <p className="text-sm text-slate-600 mt-3">
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
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Clinical Summary</h3>
          <p className="text-sm text-slate-700 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Detected indicators */}
      {detected_indicators?.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Detected Indicators</h3>
          <div className="flex flex-wrap gap-2">
            {detected_indicators.map((ind) => (
              <span key={ind} className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-sm font-medium border border-red-100">{ind}</span>
            ))}
          </div>
        </div>
      )}

      {/* Voice features */}
      {voice_features && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Voice Analytics</h3>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            {Object.entries(voice_features).filter(([, v]) => v).map(([k, v]) => (
              <div key={k} className="flex justify-between bg-slate-50 rounded-lg px-3 py-2">
                <span className="text-slate-500 capitalize">{k.replace(/_/g, " ")}</span>
                <span className="font-medium text-slate-700">{String(v)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {recommendations?.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Recommended Support</h3>
          <div className="space-y-2.5">
            {recommendations.map((r) => {
              const Icon = recIcons[String(r).toLowerCase().trim()] || CheckCircle2;
              return (
                <div key={r} className="flex items-center gap-3 bg-[#E8F3FC] rounded-xl px-4 py-3">
                  <div className="w-9 h-9 rounded-lg bg-[#0E9F9A]/10 flex items-center justify-center"><Icon className="w-5 h-5 text-[#0E9F9A]" /></div>
                  <span className="text-sm font-medium text-slate-700 capitalize">{r}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Emergency banner for critical */}
      {risk_category === "Critical" && (
        <div className="rounded-2xl bg-[#FCE1E0] p-5 text-[#081C35]">
          <div className="flex items-center gap-2 font-semibold"><AlertTriangle className="w-5 h-5" /> Immediate Support Available</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {[["NHAA", "14566"], ["Police", "100"], ["Medical", "108"]].map(([l, n]) => (
              <a key={n} href={`tel:${n}`} className="bg-[#081C35] text-white font-semibold px-4 py-2 rounded-lg text-sm">{l}: {n}</a>
            ))}
          </div>
        </div>
      )}

      <button onClick={onReset} className="w-full bg-white border-2 border-[#0E9F9A] text-[#081C35] font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#0E9F9A]/5 transition">
        <RotateCcw className="w-4 h-4" /> New Assessment
      </button>
    </div>
  );
}