import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2, AlertTriangle, CheckCircle2, HeartPulse, Scale, Stethoscope, ShieldAlert, ShieldCheck, Phone, Download } from "lucide-react";
import { base44 } from "@/api/base44Client";
import SiteNav from "@/components/SiteNav";
import Chatbot from "@/components/Chatbot";

const RISK_COLORS = { Low: "#0E9F9A", Moderate: "#D9A600", High: "#E8786D", Critical: "#C4453D" };
const recIcons = {
  counselling: HeartPulse, "legal aid": Scale, "medical assistance": Stethoscope,
  "police intervention": ShieldAlert, "witness protection": ShieldCheck, "emergency support": Phone,
};

export default function AssessmentDetail() {
  const { id } = useParams();
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await base44.entities.Assessment.get(id);
        setAssessment(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#0E9F9A] animate-spin" />
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-[#E8F3FC]">
        <SiteNav />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <p className="text-slate-500">Assessment not found.</p>
          <Link to="/dashboard" className="mt-4 inline-flex items-center gap-2 text-[#0E9F9A] font-semibold hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const rs = RISK_COLORS[assessment.risk_category] || "#D9A600";
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - ((assessment.svi_score || 0) / 100) * circumference;

  const downloadReport = () => {
    const a = assessment;
    const lines = [
      "MindPluze - Stress & Trauma Assessment Report",
      "NHAA 14566 - National Helpline Against Atrocities",
      "================================================",
      `Reference ID: ${a.reference_id}`,
      `Date: ${a.created_date ? new Date(a.created_date).toLocaleString() : "—"}`,
      "",
      `Name: ${a.full_name || "—"}`,
      `Age: ${a.age || "—"}`,
      `Gender: ${a.gender || "—"}`,
      `Phone: ${a.phone || "—"}`,
      `Language: ${a.language}`,
      `Input Mode: ${a.input_mode}`,
      `Primary Concern: ${a.primary_concern || "—"}`,
      `Self-reported Stress: ${a.self_reported_stress}/10`,
      "",
      `Stress Vulnerability Index (SVI): ${a.svi_score}/100`,
      `Risk Category: ${a.risk_category}`,
      "",
      "Detected Indicators:",
      ...(a.detected_indicators?.length ? a.detected_indicators.map((i) => `  - ${i}`) : ["  - None"]),
      "",
      "Voice Analytics:",
      ...(a.voice_features ? Object.entries(a.voice_features).filter(([, v]) => v).map(([k, v]) => `  ${k.replace(/_/g, " ")}: ${v}`) : ["  - Not available"]),
      "",
      "Recommended Support:",
      ...(a.recommendations?.length ? a.recommendations.map((r) => `  - ${r}`) : ["  - None"]),
      "",
      "Clinical Summary:",
      a.summary || "—",
      "",
      "================================================",
      "This is a screening tool and not a medical diagnosis.",
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `MindPluze_${a.reference_id}_report.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#E8F3FC]">
      <SiteNav />
      <Chatbot />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E9F9A] hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <button onClick={downloadReport} className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#0E9F9A] hover:bg-[#081C35] px-4 py-2 rounded-lg transition">
            <Download className="w-4 h-4" /> Download Report
          </button>
        </div>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide">Reference</p>
              <p className="font-mono text-sm text-slate-600">{assessment.reference_id}</p>
            </div>
            <span className="px-3 py-1.5 rounded-full text-sm font-bold" style={{ background: `${rs}15`, color: rs }}>
              {assessment.risk_category} Risk
            </span>
          </div>
          <h1 className="mt-3 text-xl font-bold text-[#081C35]">{assessment.full_name || "Anonymous Complainant"}</h1>
          <p className="text-sm text-slate-500">{assessment.primary_concern || "No primary concern specified"} · {assessment.language}</p>
        </div>

        {/* SVI Gauge */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mt-5">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Stress Vulnerability Index</h3>
          <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="70" fill="none" stroke="#e2e8f0" strokeWidth="12" />
                <circle cx="80" cy="80" r="70" fill="none" stroke={rs} strokeWidth="12" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-[#081C35]">{assessment.svi_score}</span>
                <span className="text-xs text-slate-400">/ 100</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-600">Self-reported stress: <span className="font-semibold text-[#081C35]">{assessment.self_reported_stress}/10</span></p>
              <p className="text-sm text-slate-600 mt-1">Input mode: <span className="font-medium">{assessment.input_mode}</span></p>
              <p className="text-sm text-slate-600 mt-1">Date: <span className="font-medium">{assessment.created_date ? new Date(assessment.created_date).toLocaleString() : "—"}</span></p>
            </div>
          </div>
        </div>

        {/* Summary */}
        {assessment.summary && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mt-5">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Clinical Summary</h3>
            <p className="text-sm text-slate-700 leading-relaxed">{assessment.summary}</p>
          </div>
        )}

        {/* Indicators */}
        {assessment.detected_indicators?.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mt-5">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Detected Indicators</h3>
            <div className="flex flex-wrap gap-2">
              {assessment.detected_indicators.map((ind) => (
                <span key={ind} className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-sm font-medium border border-red-100">{ind}</span>
              ))}
            </div>
          </div>
        )}

        {/* Voice features */}
        {assessment.voice_features && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mt-5">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Voice Analytics</h3>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              {Object.entries(assessment.voice_features).filter(([, v]) => v).map(([k, v]) => (
                <div key={k} className="flex justify-between bg-slate-50 rounded-lg px-3 py-2">
                  <span className="text-slate-500 capitalize">{k.replace(/_/g, " ")}</span>
                  <span className="font-medium text-slate-700 text-right">{String(v)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {assessment.recommendations?.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mt-5">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Recommended Support</h3>
            <div className="space-y-2.5">
              {assessment.recommendations.map((r) => {
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

        {/* Narrative */}
        {assessment.narrative && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mt-5">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Complainant Narrative</h3>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{assessment.narrative}</p>
          </div>
        )}

        {/* Emergency for critical */}
        {assessment.risk_category === "Critical" && (
          <div className="rounded-2xl bg-[#FCE1E0] p-5 text-[#081C35] mt-5">
            <div className="flex items-center gap-2 font-semibold"><AlertTriangle className="w-5 h-5" /> Immediate Support Available</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {[["NHAA", "14566"], ["Police", "100"], ["Medical", "108"]].map(([l, n]) => (
                <a key={n} href={`tel:${n}`} className="bg-[#081C35] text-white font-semibold px-4 py-2 rounded-lg text-sm">{l}: {n}</a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}