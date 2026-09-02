import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";
import {
  Loader2,
  AlertTriangle,
  TrendingUp,
  Users,
  Activity,
  Search,
  Download,
  Eye,
  Trash2,
  X,
  FileText,
  BarChart3,
  CheckCircle2,
  Stethoscope,
  Scale,
  HeartPulse,
  ShieldAlert,
  ShieldCheck,
  Phone
} from "lucide-react";
import { base44 } from "@/api/base44Client";
import SiteNav from "@/components/SiteNav";
import Chatbot from "@/components/Chatbot";

const RISK_COLORS = {
  Low: "#10B981", // Emerald
  Moderate: "#F59E0B", // Amber
  High: "#F97316", // Orange
  Critical: "#EF4444" // Red
};

const recIcons = {
  counselling: HeartPulse,
  "legal aid": Scale,
  "medical assistance": Stethoscope,
  "police intervention": ShieldAlert,
  "witness protection": ShieldCheck,
  "emergency support": Phone
};

export default function Dashboard() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [showDistributionModal, setShowDistributionModal] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [selectedRowIds, setSelectedRowIds] = useState(new Set());
  const navigate = useNavigate();

  const fetchAssessments = async () => {
    try {
      setLoading(true);
      const data = await base44.entities.Assessment.list("-created_date", 200);
      setAssessments(data || []);
    } catch (e) {
      console.error("Failed to load assessments:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssessments();
  }, []);

  // Compute metrics
  const counts = { Low: 0, Moderate: 0, High: 0, Critical: 0 };
  assessments.forEach((a) => {
    if (counts[a.risk_category] !== undefined) counts[a.risk_category]++;
  });
  const pieData = Object.entries(counts).map(([name, value]) => ({ name, value }));
  const total = assessments.length;
  const critical = counts.Critical;
  const avgSvi = total ? Math.round(assessments.reduce((s, a) => s + (a.svi_score || 0), 0) / total) : 0;

  // Language counts
  const langCounts = {};
  assessments.forEach((a) => {
    langCounts[a.language] = (langCounts[a.language] || 0) + 1;
  });
  const langData = Object.entries(langCounts).map(([name, value]) => ({ name, value }));

  // Indicator counts
  const indicatorCounts = {};
  assessments.forEach((a) => {
    if (Array.isArray(a.detected_indicators)) {
      a.detected_indicators.forEach((ind) => {
        indicatorCounts[ind] = (indicatorCounts[ind] || 0) + 1;
      });
    }
  });
  const topIndicators = Object.entries(indicatorCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));

  // Filtered rows
  const filtered = assessments.filter((a) => {
    const matchFilter = filter === "All" || a.risk_category === filter;
    const q = query.toLowerCase();
    const matchQuery =
      !q ||
      (a.reference_id || "").toLowerCase().includes(q) ||
      (a.full_name || "").toLowerCase().includes(q) ||
      (a.primary_concern || "").toLowerCase().includes(q) ||
      (a.language || "").toLowerCase().includes(q);
    return matchFilter && matchQuery;
  });

  // --- ACTIONS ---

  // 1. Delete single record
  const handleDelete = async (id, e) => {
    if (e) e.stopPropagation();
    try {
      await base44.entities.Assessment.delete(id);
      setAssessments((prev) => prev.filter((item) => item.id !== id));
      if (selectedAssessment?.id === id) {
        setSelectedAssessment(null);
      }
      setDeleteConfirmId(null);
      selectedRowIds.delete(id);
      setSelectedRowIds(new Set(selectedRowIds));
    } catch (err) {
      console.error("Failed to delete record:", err);
      alert("Failed to delete record: " + err.message);
    }
  };

  // 2. Delete selected records
  const handleDeleteSelected = async () => {
    if (selectedRowIds.size === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedRowIds.size} selected record(s)?`)) return;

    for (const id of selectedRowIds) {
      try {
        await base44.entities.Assessment.delete(id);
      } catch (err) {
        console.error("Error deleting record " + id, err);
      }
    }
    setAssessments((prev) => prev.filter((item) => !selectedRowIds.has(item.id)));
    setSelectedRowIds(new Set());
  };

  // 3. Download single record report
  const handleDownloadSingle = (a, e) => {
    if (e) e.stopPropagation();
    const reportText = [
      "============================================================",
      "MINDCARE AI - CLINICAL STRESS & TRAUMA ASSESSMENT REPORT",
      "National Helpline Against Atrocities (NHAA 14566)",
      "============================================================",
      `Reference ID:         ${a.reference_id || "N/A"}`,
      `Assessment ID:        ${a.id}`,
      `Date & Time:          ${a.created_date ? new Date(a.created_date).toLocaleString() : "N/A"}`,
      `Status:               ${a.status || "Analyzed"}`,
      "",
      "--- COMPLAINANT DEMOGRAPHICS ---",
      `Full Name:            ${a.full_name || "Anonymous Complainant"}`,
      `Age:                  ${a.age || "N/A"}`,
      `Gender:               ${a.gender || "N/A"}`,
      `Phone:                ${a.phone || "N/A"}`,
      `Language:             ${a.language || "English"}`,
      `Input Mode:           ${a.input_mode || "Text"}`,
      `Primary Concern:      ${a.primary_concern || "N/A"}`,
      `Self-Reported Stress: ${a.self_reported_stress || 5} / 10`,
      "",
      "--- AI CLINICAL FINDINGS ---",
      `Stress Vulnerability Index (SVI): ${a.svi_score || 0} / 100`,
      `Risk Category:        ${a.risk_category || "Moderate"} Risk`,
      "",
      "Detected Indicators:",
      ...(a.detected_indicators && a.detected_indicators.length
        ? a.detected_indicators.map((ind) => `  * ${ind}`)
        : ["  * General distress"]),
      "",
      "Voice Analytics & Speech Biomarkers:",
      ...(a.voice_features
        ? Object.entries(a.voice_features).map(([k, v]) => `  * ${k.replace(/_/g, " ")}: ${v}`)
        : ["  * Standard text entry"]),
      "",
      "Recommended Interventions:",
      ...(a.recommendations && a.recommendations.length
        ? a.recommendations.map((rec) => `  [✓] ${rec.toUpperCase()}`)
        : ["  [✓] Psychological counselling"]),
      "",
      "Clinical Summary:",
      a.summary || "Complainant presents acute trauma indicators requiring targeted support.",
      "",
      "Complainant Narrative:",
      a.narrative || "No narrative text provided.",
      "",
      "============================================================",
      "Confidential · Generated by MindCare AI Screening Engine",
      "============================================================"
    ].join("\n");

    const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `MindCare_Report_${a.reference_id || a.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 4. Download complete aggregated report (CSV)
  const handleDownloadAllReport = () => {
    if (assessments.length === 0) {
      alert("No assessment records to export.");
      return;
    }

    const headers = [
      "Reference ID",
      "Full Name",
      "Age",
      "Gender",
      "Phone",
      "Language",
      "Input Mode",
      "Primary Concern",
      "Self Stress (1-10)",
      "SVI Score",
      "Risk Category",
      "Detected Indicators",
      "Recommendations",
      "Summary",
      "Date"
    ];

    const rows = filtered.map((a) => [
      `"${a.reference_id || ""}"`,
      `"${(a.full_name || "").replace(/"/g, '""')}"`,
      `"${a.age || ""}"`,
      `"${a.gender || ""}"`,
      `"${a.phone || ""}"`,
      `"${a.language || ""}"`,
      `"${a.input_mode || ""}"`,
      `"${(a.primary_concern || "").replace(/"/g, '""')}"`,
      `"${a.self_reported_stress || ""}"`,
      `"${a.svi_score || ""}"`,
      `"${a.risk_category || ""}"`,
      `"${(a.detected_indicators || []).join("; ")}"`,
      `"${(a.recommendations || []).join("; ")}"`,
      `"${(a.summary || "").replace(/"/g, '""')}"`,
      `"${a.created_date ? new Date(a.created_date).toLocaleString() : ""}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `MindCare_Complete_Dashboard_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Row selection toggle
  const toggleRowSelect = (id, e) => {
    e.stopPropagation();
    const next = new Set(selectedRowIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedRowIds(next);
  };

  const toggleSelectAll = () => {
    if (selectedRowIds.size === filtered.length) {
      setSelectedRowIds(new Set());
    } else {
      setSelectedRowIds(new Set(filtered.map((a) => a.id)));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 text-[#584CE4] animate-spin mb-3" />
        <p className="text-sm font-semibold text-slate-600">Loading MindCare Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <SiteNav />
      <Chatbot />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#584CE4]">
                NHAA 14566 Clinical Module
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              My Dashboard
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Real-time stress, trauma assessments, and emergency clinical triage overview.
            </p>
          </div>

          {/* Top Quick Actions */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => setShowDistributionModal(true)}
              className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-semibold px-4 py-2.5 rounded-xl shadow-sm text-sm transition cursor-pointer"
            >
              <BarChart3 className="w-4 h-4 text-[#584CE4]" /> View Distribution
            </button>
            <button
              onClick={handleDownloadAllReport}
              className="inline-flex items-center gap-2 bg-[#584CE4] hover:bg-[#473BC7] text-white font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-indigo-100 text-sm transition cursor-pointer"
            >
              <Download className="w-4 h-4" /> Download Complete Report
            </button>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
          <StatCard icon={Users} label="Total Assessments" value={total} color="#584CE4" />
          <StatCard icon={AlertTriangle} label="Critical Risk Cases" value={critical} color="#EF4444" />
          <StatCard icon={Activity} label="Average SVI Score" value={`${avgSvi}/100`} color="#F59E0B" />
          <StatCard icon={TrendingUp} label="Languages Screened" value={Object.keys(langCounts).length} color="#10B981" />
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Risk Distribution Chart */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-7">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">Risk Distribution</h3>
                <p className="text-xs text-slate-400">Stress Vulnerability Index breakdown</p>
              </div>
              <button
                onClick={() => setShowDistributionModal(true)}
                className="text-xs font-bold text-[#584CE4] hover:underline flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" /> Details
              </button>
            </div>

            {total === 0 ? (
              <Empty />
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={95}
                    innerRadius={55}
                    paddingAngle={4}
                  >
                    {pieData.map((e) => (
                      <Cell key={e.name} fill={RISK_COLORS[e.name]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-2">
              {Object.entries(counts).map(([k, v]) => (
                <span
                  key={k}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: `${RISK_COLORS[k]}15`,
                    color: RISK_COLORS[k]
                  }}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: RISK_COLORS[k] }} />
                  {k}: {v}
                </span>
              ))}
            </div>
          </div>

          {/* Languages Screened Chart */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-7">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">Assessments by Language</h3>
                <p className="text-xs text-slate-400">Multilingual inclusivity metrics</p>
              </div>
            </div>

            {langData.length === 0 ? (
              <Empty />
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={langData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#584CE4" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-5 mb-5">
          <div className="flex flex-col sm:flex-row gap-3.5 sm:items-center justify-between">
            <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200/70 rounded-2xl px-4 py-2.5 flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by reference ID, name, concern, language..."
                className="bg-transparent text-sm outline-none w-full text-slate-800 placeholder-slate-400"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-xs text-slate-400 hover:text-slate-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Risk filter tabs */}
            <div className="flex gap-1.5 flex-wrap">
              {["All", "Low", "Moderate", "High", "Critical"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    filter === f
                      ? "bg-[#584CE4] text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Assessment Records Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-6">
          <div className="p-4 sm:px-6 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
            <h2 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#584CE4]" />
              Assessment Records ({filtered.length})
            </h2>

            {selectedRowIds.size > 0 && (
              <button
                onClick={handleDeleteSelected}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 px-3.5 py-1.5 rounded-xl transition cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete Selected ({selectedRowIds.size})
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-sm">
              No matching assessments found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold border-b border-slate-100">
                  <tr>
                    <th className="px-4 py-3.5 w-10">
                      <input
                        type="checkbox"
                        checked={selectedRowIds.size === filtered.length && filtered.length > 0}
                        onChange={toggleSelectAll}
                        className="rounded border-slate-300 text-[#584CE4] focus:ring-[#584CE4] cursor-pointer"
                      />
                    </th>
                    <th className="px-4 py-3.5 font-bold">Reference ID</th>
                    <th className="px-4 py-3.5 font-bold">Complainant</th>
                    <th className="px-4 py-3.5 font-bold">Concern</th>
                    <th className="px-4 py-3.5 font-bold">Language</th>
                    <th className="px-4 py-3.5 font-bold">SVI Score</th>
                    <th className="px-4 py-3.5 font-bold">Risk Level</th>
                    <th className="px-4 py-3.5 font-bold">Date</th>
                    <th className="px-4 py-3.5 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((a) => (
                    <tr
                      key={a.id}
                      className="hover:bg-indigo-50/40 transition group cursor-pointer"
                      onClick={() => setSelectedAssessment(a)}
                    >
                      <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedRowIds.has(a.id)}
                          onChange={(e) => toggleRowSelect(a.id, e)}
                          className="rounded border-slate-300 text-[#584CE4] focus:ring-[#584CE4] cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-3.5 font-mono text-xs font-bold text-[#584CE4]">
                        {a.reference_id}
                      </td>
                      <td className="px-4 py-3.5 font-medium text-slate-800">
                        {a.full_name || "Anonymous"}
                      </td>
                      <td className="px-4 py-3.5 text-slate-600">
                        {a.primary_concern || "General distress"}
                      </td>
                      <td className="px-4 py-3.5 text-slate-600">
                        {a.language || "English"}
                      </td>
                      <td className="px-4 py-3.5 font-extrabold text-slate-900">
                        {a.svi_score}
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className="px-2.5 py-1 rounded-full text-xs font-bold inline-block"
                          style={{
                            backgroundColor: `${RISK_COLORS[a.risk_category]}15`,
                            color: RISK_COLORS[a.risk_category]
                          }}
                        >
                          {a.risk_category}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-400 whitespace-nowrap">
                        {a.created_date ? new Date(a.created_date).toLocaleDateString() : "—"}
                      </td>
                      <td className="px-4 py-3.5 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="inline-flex items-center gap-1.5">
                          {/* View Button */}
                          <button
                            onClick={() => setSelectedAssessment(a)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-[#584CE4] text-[#584CE4] hover:text-white text-xs font-bold transition cursor-pointer"
                            title="View Details"
                          >
                            <Eye className="w-3.5 h-3.5" /> View
                          </button>

                          {/* Download Button */}
                          <button
                            onClick={(e) => handleDownloadSingle(a, e)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
                            title="Download Clinical Report"
                          >
                            <Download className="w-3.5 h-3.5" /> Download
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteConfirmId(a.id);
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white text-xs font-bold transition cursor-pointer"
                            title="Delete Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* BOTTOM ACTION BAR (Download, View, Delete) matching user request */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h3 className="font-extrabold text-slate-900 text-base">Dashboard Actions</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Export data, inspect comprehensive distribution metrics, or manage records.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* View Distribution Button */}
            <button
              onClick={() => setShowDistributionModal(true)}
              className="inline-flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-[#584CE4] font-bold px-5 py-3 rounded-2xl text-sm transition shadow-sm cursor-pointer"
            >
              <Eye className="w-4 h-4" /> View Distribution Details
            </button>

            {/* Download Complete Report Button */}
            <button
              onClick={handleDownloadAllReport}
              className="inline-flex items-center gap-2 bg-[#584CE4] hover:bg-[#473BC7] text-white font-bold px-5 py-3 rounded-2xl text-sm transition shadow-lg shadow-indigo-100 cursor-pointer"
            >
              <Download className="w-4 h-4" /> Download Complete Report
            </button>

            {/* Delete / Clear Action */}
            {selectedRowIds.size > 0 ? (
              <button
                onClick={handleDeleteSelected}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-3 rounded-2xl text-sm transition shadow-md shadow-red-200 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" /> Delete Selected ({selectedRowIds.size})
              </button>
            ) : (
              <button
                onClick={() => {
                  if (filtered.length > 0) {
                    setDeleteConfirmId(filtered[0].id);
                  } else {
                    alert("No records to delete.");
                  }
                }}
                className="inline-flex items-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold px-5 py-3 rounded-2xl text-sm transition cursor-pointer"
              >
                <Trash2 className="w-4 h-4" /> Delete Top Record
              </button>
            )}
          </div>
        </div>
      </div>

      {/* --- MODAL 1: VIEW DISTRIBUTION DETAILS --- */}
      {showDistributionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setShowDistributionModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#584CE4] flex items-center justify-center">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900">Clinical Distribution Details</h3>
                <p className="text-xs text-slate-500">Comprehensive screening statistics across all complainant data</p>
              </div>
            </div>

            {/* Risk Category Distribution Table */}
            <div className="mb-6">
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-3">
                Risk Classification Breakdown
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.entries(counts).map(([cat, count]) => {
                  const pct = total ? Math.round((count / total) * 100) : 0;
                  return (
                    <div
                      key={cat}
                      className="p-4 rounded-2xl border border-slate-100 text-center"
                      style={{ backgroundColor: `${RISK_COLORS[cat]}10` }}
                    >
                      <p className="text-xs font-bold" style={{ color: RISK_COLORS[cat] }}>
                        {cat} Risk
                      </p>
                      <p className="text-2xl font-black text-slate-900 mt-1">{count}</p>
                      <p className="text-[11px] text-slate-500">{pct}% of total</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Detected Psychological Indicators */}
            <div className="mb-6">
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-3">
                Trauma & Vulnerability Indicator Frequencies
              </h4>
              {topIndicators.length === 0 ? (
                <p className="text-xs text-slate-400">No indicators recorded yet.</p>
              ) : (
                <div className="space-y-2.5">
                  {topIndicators.map(({ name, count }) => {
                    const pct = total ? Math.round((count / total) * 100) : 0;
                    return (
                      <div key={name} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span className="capitalize">{name}</span>
                          <span>
                            {count} cases ({pct}%)
                          </span>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#584CE4] to-[#E06D53] rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(100, pct)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={handleDownloadAllReport}
                className="inline-flex items-center gap-2 bg-[#584CE4] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#473BC7] transition"
              >
                <Download className="w-4 h-4" /> Export CSV Report
              </button>
              <button
                onClick={() => setShowDistributionModal(false)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 2: SINGLE RECORD VIEW MODAL --- */}
      {selectedAssessment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedAssessment(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center justify-between pr-8 mb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#584CE4]">
                  {selectedAssessment.reference_id}
                </p>
                <h3 className="text-2xl font-black text-slate-900 mt-0.5">
                  {selectedAssessment.full_name || "Anonymous Complainant"}
                </h3>
              </div>
              <span
                className="px-3.5 py-1.5 rounded-full text-xs font-bold"
                style={{
                  backgroundColor: `${RISK_COLORS[selectedAssessment.risk_category]}15`,
                  color: RISK_COLORS[selectedAssessment.risk_category]
                }}
              >
                {selectedAssessment.risk_category} Risk ({selectedAssessment.svi_score}/100)
              </span>
            </div>

            {/* Demographics & Meta */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl text-xs mb-5">
              <div>
                <span className="text-slate-400 block">Age / Gender:</span>
                <span className="font-bold text-slate-800">
                  {selectedAssessment.age || "N/A"} / {selectedAssessment.gender || "N/A"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Language / Mode:</span>
                <span className="font-bold text-slate-800">
                  {selectedAssessment.language || "English"} ({selectedAssessment.input_mode || "Text"})
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Self-Report Stress:</span>
                <span className="font-bold text-slate-800">
                  {selectedAssessment.self_reported_stress || 5} / 10
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Date Submitted:</span>
                <span className="font-bold text-slate-800">
                  {selectedAssessment.created_date
                    ? new Date(selectedAssessment.created_date).toLocaleDateString()
                    : "—"}
                </span>
              </div>
            </div>

            {/* Clinical Summary */}
            {selectedAssessment.summary && (
              <div className="mb-5">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                  Clinical Summary
                </h4>
                <p className="text-sm text-slate-700 bg-indigo-50/40 p-4 rounded-2xl border border-indigo-100/50 leading-relaxed">
                  {selectedAssessment.summary}
                </p>
              </div>
            )}

            {/* Detected Indicators */}
            {selectedAssessment.detected_indicators?.length > 0 && (
              <div className="mb-5">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
                  Detected Indicators
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedAssessment.detected_indicators.map((ind) => (
                    <span
                      key={ind}
                      className="px-3 py-1 rounded-xl bg-red-50 text-red-600 text-xs font-bold border border-red-100"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {selectedAssessment.recommendations?.length > 0 && (
              <div className="mb-5">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
                  Recommended Support Actions
                </h4>
                <div className="grid sm:grid-cols-2 gap-2">
                  {selectedAssessment.recommendations.map((r) => {
                    const Icon = recIcons[String(r).toLowerCase().trim()] || CheckCircle2;
                    return (
                      <div
                        key={r}
                        className="flex items-center gap-2.5 bg-slate-50 border border-slate-100 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 capitalize"
                      >
                        <Icon className="w-4 h-4 text-[#584CE4]" />
                        <span>{r}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Narrative */}
            {selectedAssessment.narrative && (
              <div className="mb-6">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                  Complainant Narrative
                </h4>
                <div className="text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl max-h-36 overflow-y-auto leading-relaxed whitespace-pre-wrap">
                  {selectedAssessment.narrative}
                </div>
              </div>
            )}

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
              <button
                onClick={() => handleDelete(selectedAssessment.id)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-xl transition"
              >
                <Trash2 className="w-4 h-4" /> Delete This Record
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadSingle(selectedAssessment)}
                  className="inline-flex items-center gap-1.5 bg-[#584CE4] hover:bg-[#473BC7] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow"
                >
                  <Download className="w-4 h-4" /> Download Report
                </button>
                <button
                  onClick={() => setSelectedAssessment(null)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 3: DELETE CONFIRMATION DIALOG --- */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-rose-100 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">Delete Assessment Record?</h3>
            <p className="text-xs text-slate-500 mt-1 mb-5">
              This action cannot be undone and will remove this complainant's assessment from the dashboard.
            </p>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition shadow-sm"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-5 sm:p-6 transition hover:shadow-md">
      <div
        className="w-11 h-11 rounded-2xl flex items-center justify-center mb-3.5"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{value}</p>
      <p className="text-xs font-semibold text-slate-500 mt-1">{label}</p>
    </div>
  );
}

function Empty() {
  return (
    <div className="h-[250px] flex items-center justify-center text-slate-300 text-sm">
      No assessment records yet
    </div>
  );
}