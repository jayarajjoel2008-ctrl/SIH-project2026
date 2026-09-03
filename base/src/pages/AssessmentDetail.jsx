import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2, AlertTriangle, CheckCircle2, HeartPulse, Scale, Stethoscope, ShieldAlert, ShieldCheck, Phone, Download } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import SiteNav from "@/components/SiteNav";
import Chatbot from "@/components/Chatbot";

const RISK_COLORS = { Low: "#4E36E2", Moderate: "#FFA07A", High: "#FF8C68", Critical: "#EF4444" };
const recIcons = {
  counselling: HeartPulse, "legal aid": Scale, "medical assistance": Stethoscope,
  "police intervention": ShieldAlert, "witness protection": ShieldCheck, "emergency support": Phone,
};

export default function AssessmentDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);

  const backUrl = user?.role === "admin" ? "/dashboard" : "/home";
  const backText = user?.role === "admin" ? "Back to Dashboard" : "Back to Home";

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
      <div className="min-h-screen flex items-center justify-center bg-[#EEF2F8]">
        <Loader2 className="w-8 h-8 text-[#4E36E2] animate-spin" />
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="min-h-screen bg-[#EEF2F8]">
        <SiteNav />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <p className="text-[#8E95B2] font-semibold">Assessment not found.</p>
          <Link to={backUrl} className="mt-4 inline-flex items-center gap-2 text-[#4E36E2] font-bold hover:underline">
            <ArrowLeft className="w-4 h-4" /> {backText}
          </Link>
        </div>
      </div>
    );
  }

  const rs = RISK_COLORS[assessment.risk_category] || "#FFA07A";
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
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#EEF2F8] text-[#1E1B4B] font-sans">
      <SiteNav />
      <Chatbot />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link to={backUrl} className="inline-flex items-center gap-2 text-xs font-bold text-[#4E36E2] hover:underline">
            <ArrowLeft className="w-4 h-4" /> {backText}
          </Link>
          <button
            onClick={downloadReport}
            className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#4E36E2] hover:bg-[#3C28B6] px-5 py-2.5 rounded-full shadow-soft-purple transition"
          >
            <Download className="w-4 h-4" /> Download Report
          </button>
        </div>

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-soft border border-white/80 p-6 sm:p-8">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-xs font-bold text-[#8E95B2] uppercase tracking-wide">Case Reference</p>
              <p className="font-mono text-sm font-black text-[#1E1B4B]">{assessment.reference_id}</p>
            </div>
            <span
              className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider"
              style={{ background: `${rs}15`, color: rs }}
            >
              {assessment.risk_category} Risk
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-black text-[#1E1B4B]">{assessment.full_name || "Anonymous Complainant"}</h1>
          <p className="text-xs font-semibold text-[#8E95B2] mt-1">{assessment.primary_concern || "No primary concern specified"} · {assessment.language}</p>
        </div>

        {/* SVI Gauge */}
        <div className="bg-white rounded-3xl shadow-soft border border-white/80 p-6 sm:p-8 mt-5">
          <h3 className="text-xs font-black text-[#8E95B2] uppercase tracking-wide">Stress Vulnerability Index</h3>
          <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
            <div className="relative w-40 h-40 shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="70" fill="none" stroke="#F0F2F9" strokeWidth="12" />
                <circle cx="80" cy="80" r="70" fill="none" stroke={rs} strokeWidth="12" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-[#1E1B4B]">{assessment.svi_score}</span>
                <span className="text-xs font-bold text-[#8E95B2]">/ 100</span>
              </div>
            </div>
            <div className="flex-1 space-y-1.5 text-xs font-semibold text-slate-700">
              <p>Self-reported stress: <span className="font-black text-[#4E36E2]">{assessment.self_reported_stress}/10</span></p>
              <p>Input mode: <span className="font-bold text-[#1E1B4B]">{assessment.input_mode}</span></p>
              <p>Date: <span className="text-[#8E95B2]">{assessment.created_date ? new Date(assessment.created_date).toLocaleString() : "—"}</span></p>
            </div>
          </div>
        </div>

        {/* Summary */}
        {assessment.summary && (
          <div className="bg-white rounded-3xl shadow-soft border border-white/80 p-6 sm:p-8 mt-5">
            <h3 className="text-xs font-black text-[#8E95B2] uppercase tracking-wide mb-2">Clinical Summary</h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">{assessment.summary}</p>
          </div>
        )}

        {/* Indicators */}
        {assessment.detected_indicators?.length > 0 && (
          <div className="bg-white rounded-3xl shadow-soft border border-white/80 p-6 sm:p-8 mt-5">
            <h3 className="text-xs font-black text-[#8E95B2] uppercase tracking-wide mb-3">Detected Indicators</h3>
            <div className="flex flex-wrap gap-2">
              {assessment.detected_indicators.map((ind) => (
                <span key={ind} className="px-3 py-1.5 rounded-xl bg-orange-50 text-[#FF8C68] text-xs font-bold border border-orange-100">{ind}</span>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {assessment.recommendations?.length > 0 && (
          <div className="bg-white rounded-3xl shadow-soft border border-white/80 p-6 sm:p-8 mt-5">
            <h3 className="text-xs font-black text-[#8E95B2] uppercase tracking-wide mb-3">Recommended Support</h3>
            <div className="space-y-2.5">
              {assessment.recommendations.map((r) => {
                const Icon = recIcons[String(r).toLowerCase().trim()] || CheckCircle2;
                return (
                  <div key={r} className="flex items-center gap-3 bg-[#F4F6FB] rounded-2xl px-4 py-3 border border-slate-100">
                    <div className="w-9 h-9 rounded-full bg-[#4E36E2] text-white flex items-center justify-center shrink-0 shadow-sm"><Icon className="w-4 h-4" /></div>
                    <span className="text-xs font-bold text-[#1E1B4B] capitalize">{r}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Narrative */}
        {assessment.narrative && (
          <div className="bg-white rounded-3xl shadow-soft border border-white/80 p-6 sm:p-8 mt-5">
            <h3 className="text-xs font-black text-[#8E95B2] uppercase tracking-wide mb-2">Complainant Narrative</h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap font-medium">{assessment.narrative}</p>
          </div>
        )}
      </div>
    </div>
  );
}