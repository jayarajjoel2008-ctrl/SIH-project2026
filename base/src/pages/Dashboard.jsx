import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Loader2,
  Search,
  Download,
  Eye,
  Trash2,
  X,
  FileText,
  BarChart3,
  CheckCircle2,
  MoreHorizontal,
  Bell,
  Settings,
  Filter,
  ChevronDown,
  Upload,
  MapPin,
  LogOut,
  Brain,
  Calendar,
  CalendarDays,
  Clock,
  Plus,
  Radio,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  HeartPulse,
  Scale,
  Home as HomeIcon,
  Activity,
  Folder,
  CreditCard,
  Trophy,
  Mail,
  Edit3,
  User
} from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import Chatbot from "@/components/Chatbot";

const RISK_COLORS = {
  Low: "#4E36E2", // Royal Purple
  Moderate: "#FFA07A", // Soft peach
  High: "#FF8C68", // Coral
  Critical: "#EF4444" // Vivid red
};

// Circular Ring Progress Component (matching Top Metric Cards in reference image)
const CircularRing = ({ percentage = 68, color = "#4E36E2", trackColor = "#F0F2F9", size = 56, strokeWidth = 5.5 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <span className="absolute text-[10px] font-black text-[#1E1B4B]">
        {percentage}%
      </span>
    </div>
  );
};

// Semicircle Donut Gradient Gauge Component (matching Bottom Middle Card in reference image)
const SemicircleGradientGauge = ({ percentage = 75 }) => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-[210px] mx-auto">
      <svg viewBox="0 0 200 115" className="w-full overflow-visible">
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFA07A" />
            <stop offset="50%" stopColor="#FF7654" />
            <stop offset="100%" stopColor="#4E36E2" />
          </linearGradient>
        </defs>
        {/* Track Background */}
        <path
          d="M 25 105 A 75 75 0 0 1 175 105"
          fill="none"
          stroke="#F0F3F9"
          strokeWidth="18"
          strokeLinecap="round"
        />
        {/* Active Gradient Arc */}
        <path
          d="M 25 105 A 75 75 0 0 1 175 105"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="18"
          strokeLinecap="round"
          strokeDasharray="235.6"
          strokeDashoffset={235.6 - (235.6 * (percentage / 100))}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute bottom-0 flex flex-col items-center justify-center text-center">
        <span className="text-3xl sm:text-4xl font-black text-[#1E1B4B] tracking-tight">{percentage}%</span>
      </div>
    </div>
  );
};

// Dual Wave Smooth Bezier Chart (matching Center Chart in reference image)
const WaveChart = () => {
  return (
    <div className="relative w-full h-[220px] sm:h-[250px] flex flex-col justify-between">
      {/* Y Axis Labels */}
      <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[11px] font-bold text-[#A0ABC0] select-none pointer-events-none">
        <span>29k</span>
        <span>20k</span>
        <span>10k</span>
        <span>2k</span>
        <span>0</span>
      </div>

      {/* SVG Container */}
      <div className="relative ml-8 sm:ml-10 h-[calc(100%-24px)] w-[calc(100%-32px)] sm:w-[calc(100%-40px)]">
        <svg viewBox="0 0 700 200" preserveAspectRatio="none" className="w-full h-full overflow-visible">
          <defs>
            {/* Peach Gradient Fill */}
            <linearGradient id="peachWaveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFA07A" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#FFA07A" stopOpacity="0.0" />
            </linearGradient>
            {/* Purple Gradient Fill */}
            <linearGradient id="purpleWaveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4E36E2" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#4E36E2" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Top Wave (Peach / Coral) */}
          <path
            d="M 0 95 C 70 95, 110 30, 180 30 C 250 30, 290 85, 360 85 C 430 85, 470 50, 540 50 C 610 50, 650 110, 700 110 L 700 200 L 0 200 Z"
            fill="url(#peachWaveGrad)"
          />
          <path
            d="M 0 95 C 70 95, 110 30, 180 30 C 250 30, 290 85, 360 85 C 430 85, 470 50, 540 50 C 610 50, 650 110, 700 110"
            fill="none"
            stroke="#FFA07A"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Bottom Wave (Deep Violet / Indigo) */}
          <path
            d="M 0 160 C 60 160, 100 145, 160 145 C 220 145, 260 125, 320 125 C 380 125, 440 25, 500 25 C 560 25, 600 70, 660 70 C 680 70, 690 120, 700 120 L 700 200 L 0 200 Z"
            fill="url(#purpleWaveGrad)"
          />
          <path
            d="M 0 160 C 60 160, 100 145, 160 145 C 220 145, 260 125, 320 125 C 380 125, 440 25, 500 25 C 560 25, 600 70, 660 70 C 680 70, 690 120, 700 120"
            fill="none"
            stroke="#4E36E2"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Floating Purple Tooltip Badge at peak */}
        <div className="absolute left-[70%] top-[8%] -translate-x-1/2 -translate-y-full flex flex-col items-center">
          <div className="bg-[#4E36E2] text-white px-3.5 py-1.5 rounded-2xl shadow-soft-purple flex items-center gap-2.5 border border-white/20">
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-black text-white">
              15
            </div>
            <div>
              <p className="text-xs font-black tracking-tight leading-none">$2954</p>
              <p className="text-[9px] text-purple-200 font-medium leading-tight mt-0.5">Nov 29 2026</p>
            </div>
          </div>
          <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#4E36E2]" />
        </div>
      </div>

      {/* X Axis Days */}
      <div className="ml-8 sm:ml-10 flex items-center justify-between text-[11px] font-bold text-[#A0ABC0] pt-2">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>
    </div>
  );
};

// Seeded Triage Log Items
const INITIAL_TRIAGE_LOGS = [
  {
    id: "log-1",
    timestamp: "5 Mins ago",
    refId: "NHAA-2026-1040",
    victimName: "Anil P.",
    category: "Emergency",
    severity: "Critical",
    sviScore: 88,
    action: "Emergency Police Protection & Medical Dispatch Enroute to South District Zone C",
    officer: "Officer M. Rao",
    status: "DISPATCHED"
  },
  {
    id: "log-2",
    timestamp: "15 Mins ago",
    refId: "NHAA-2026-1042",
    victimName: "Ramesh K.",
    category: "Legal Aid",
    severity: "High",
    sviScore: 78,
    action: "SC/ST (Prevention of Atrocities) Special Counsel & Witness Protection Assigned",
    officer: "Officer J. Verma",
    status: "ASSIGNED"
  },
  {
    id: "log-3",
    timestamp: "30 Mins ago",
    refId: "NHAA-2026-1041",
    victimName: "Sunita D.",
    category: "Counselling",
    severity: "Moderate",
    sviScore: 52,
    action: "Acoustic Biomarker Analysis Completed (168 wpm) · Trauma Recovery Consultation Booked",
    officer: "Clinician P. Sharma",
    status: "CONFIRMED"
  },
  {
    id: "log-4",
    timestamp: "1 hour ago",
    refId: "NHAA-2026-1039",
    victimName: "Pooja M.",
    category: "AI SVI Screening",
    severity: "Low",
    sviScore: 28,
    action: "Automated 4-7-8 Guided Breathing Protocol Completed via AI Companion",
    officer: "MindPluze AI Engine",
    status: "RESOLVED"
  },
  {
    id: "log-5",
    timestamp: "4 hrs ago",
    refId: "NHAA-2026-1038",
    victimName: "Vijay S.",
    category: "Helpline 14566",
    severity: "High",
    sviScore: 81,
    action: "Toll-Free 14566 Distress Call Escalated to District Magistrate Liaison Desk",
    officer: "Lead Admin S. Collins",
    status: "ESCALATED"
  }
];

// Seeded Calendar Events
const INITIAL_CALENDAR_EVENTS = [
  {
    id: "evt-1",
    date: new Date().toISOString().slice(0, 10),
    time: "10:00 AM",
    title: "Trauma Debriefing & Psychological Follow-up",
    complainant: "Ramesh K. (NHAA-2026-1042)",
    type: "Counselling",
    officer: "Clinician P. Sharma",
    status: "Confirmed",
    priority: "High"
  },
  {
    id: "evt-2",
    date: new Date().toISOString().slice(0, 10),
    time: "01:30 PM",
    title: "SC/ST PoA Court Hearing Legal Assistance",
    complainant: "Sunita D. (NHAA-2026-1041)",
    type: "Legal Aid",
    officer: "Advocate V. Nair",
    status: "Scheduled",
    priority: "Moderate"
  },
  {
    id: "evt-3",
    date: new Date().toISOString().slice(0, 10),
    time: "04:00 PM",
    title: "On-Site Welfare & Police Protection Review",
    complainant: "Anil P. (NHAA-2026-1040)",
    type: "Police Liaison",
    officer: "Officer M. Rao",
    status: "Urgent",
    priority: "Critical"
  }
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [activeNavTab, setActiveNavTab] = useState("Dashboard");
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [showDistributionModal, setShowDistributionModal] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState(new Set());
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Triage Logs Modal state
  const [showTriageLogsModal, setShowTriageLogsModal] = useState(false);
  const [triageLogs, setTriageLogs] = useState(INITIAL_TRIAGE_LOGS);
  const [triageLogFilter, setTriageLogFilter] = useState("All");
  const [triageLogSearch, setTriageLogSearch] = useState("");

  // Calendar Modal state
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [calendarEvents, setCalendarEvents] = useState(INITIAL_CALENDAR_EVENTS);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(new Date().toISOString().slice(0, 10));
  const [calendarFilter, setCalendarFilter] = useState("All");
  const [showNewEventForm, setShowNewEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    complainant: "",
    time: "10:00 AM",
    date: new Date().toISOString().slice(0, 10),
    type: "Counselling",
    officer: "Clinician P. Sharma",
    priority: "Moderate"
  });

  const fetchAssessments = async () => {
    try {
      const data = await base44.entities.Assessment.list("-created_date", 100);
      setAssessments(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssessments();
  }, []);

  const filtered = assessments.filter((a) => {
    const q = query.toLowerCase();
    const matchQ =
      !query ||
      (a.reference_id && a.reference_id.toLowerCase().includes(q)) ||
      (a.full_name && a.full_name.toLowerCase().includes(q)) ||
      (a.primary_concern && a.primary_concern.toLowerCase().includes(q)) ||
      (a.language && a.language.toLowerCase().includes(q));
    const matchF = filter === "All" || a.risk_category === filter;
    return matchQ && matchF;
  });

  const stats = {
    total: assessments.length || 1200,
    critical: assessments.filter((a) => a.risk_category === "Critical").length,
    high: assessments.filter((a) => a.risk_category === "High").length,
    moderate: assessments.filter((a) => a.risk_category === "Moderate").length,
    low: assessments.filter((a) => a.risk_category === "Low").length,
    avgSvi: assessments.length
      ? Math.round(assessments.reduce((sum, a) => sum + (a.svi_score || 0), 0) / assessments.length)
      : 68
  };

  const handleDeleteRecord = async (id, e) => {
    if (e) e.stopPropagation();
    if (!window.confirm("Delete this assessment permanently?")) return;
    try {
      await base44.entities.Assessment.delete(id);
      setAssessments((prev) => prev.filter((item) => item.id !== id));
      if (selectedAssessment?.id === id) setSelectedAssessment(null);
    } catch (err) {
      console.error(err);
    }
  };

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

  const handleDownloadSingle = (a, e) => {
    if (e) e.stopPropagation();
    const reportText = [
      "============================================================",
      "MINDPLUZE - CLINICAL STRESS & TRAUMA ASSESSMENT REPORT",
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
      "Confidential · Generated by MindPluze Screening Engine",
      "============================================================"
    ].join("\n");

    const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `MindPluze_Report_${a.reference_id || a.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
    link.setAttribute("download", `MindPluze_Dashboard_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#EEF2F8]">
        <Loader2 className="w-10 h-10 text-[#4E36E2] animate-spin mb-3" />
        <p className="text-sm font-bold text-[#1E1B4B]">Loading Executive Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EEF2F8] text-[#1E1B4B] p-3 sm:p-5 lg:p-7 font-sans selection:bg-[#4E36E2] selection:text-white">
      <Chatbot />

      {/* Main Container Wrapper Frame */}
      <div className="max-w-[1440px] mx-auto bg-[#F4F6FB] rounded-[28px] sm:rounded-[36px] shadow-soft-lg border border-white/80 p-3 sm:p-6 lg:p-7 transition-all flex flex-col lg:flex-row gap-6">
        
        {/* ================= LEFT FLOATING ICON DOCK ================= */}
        <aside className="hidden lg:flex flex-col items-center justify-between py-2 px-1">
          <div className="flex flex-col items-center gap-6">
            {/* Active Home Tab */}
            <Link
              to="/home"
              title="Home Portal"
              className="w-11 h-11 rounded-2xl bg-white shadow-soft-circle border border-slate-100 flex items-center justify-center text-[#4E36E2] hover:scale-105 transition-all cursor-pointer"
            >
              <HomeIcon className="w-5 h-5 stroke-[2.2]" />
            </Link>

            {/* Activity / Heartbeat */}
            <button
              onClick={() => setShowDistributionModal(true)}
              title="SVI Analytics Breakdown"
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#8E95B2] hover:text-[#4E36E2] hover:bg-white hover:shadow-soft-circle transition-all cursor-pointer"
            >
              <Activity className="w-5 h-5" />
            </button>

            {/* Database / Assessments Table */}
            <button
              onClick={() => document.getElementById("cases-table")?.scrollIntoView({ behavior: "smooth" })}
              title="Case Database Table"
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#8E95B2] hover:text-[#4E36E2] hover:bg-white hover:shadow-soft-circle transition-all cursor-pointer"
            >
              <Folder className="w-5 h-5" />
            </button>

            {/* Triage Card with Notification Dot */}
            <button
              onClick={() => setShowTriageLogsModal(true)}
              title="Live Triage Logs"
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#8E95B2] hover:text-[#4E36E2] hover:bg-white hover:shadow-soft-circle relative transition-all cursor-pointer"
            >
              <CreditCard className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>

            {/* Trophy / Performance */}
            <button
              onClick={() => setShowDistributionModal(true)}
              title="Performance & Distribution"
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#8E95B2] hover:text-[#4E36E2] hover:bg-white hover:shadow-soft-circle transition-all cursor-pointer"
            >
              <Trophy className="w-5 h-5" />
            </button>

            {/* Document Notes */}
            <button
              onClick={handleDownloadAllReport}
              title="Export Full Summary"
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#8E95B2] hover:text-[#4E36E2] hover:bg-white hover:shadow-soft-circle transition-all cursor-pointer"
            >
              <FileText className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom Logout */}
          <button
            onClick={() => logout("/")}
            title="Log Out"
            className="w-10 h-10 rounded-full flex items-center justify-center text-rose-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </aside>

        {/* ================= MAIN CONTENT AREA ================= */}
        <div className="flex-1 flex flex-col gap-6">

          {/* ================= TOP HEADER (Title + Centered Search) ================= */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Title */}
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 rounded-full bg-[#4E36E2]" />
              <div>
                <h1 className="text-2xl font-black text-[#1E1B4B] tracking-tight flex items-center gap-2">
                  Dashboard
                </h1>
                <p className="text-xs font-semibold text-[#8E95B2]">
                  Payments updates · AI-Predictive Stress & SVI Real-Time
                </p>
              </div>
            </div>

            {/* Centered Pill Search Input */}
            <div className="w-full sm:w-80 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E95B2]" />
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-white rounded-full pl-10 pr-4 py-2.5 text-xs font-medium text-[#1E1B4B] placeholder-[#8E95B2] shadow-soft-circle border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#4E36E2]/20 transition-all"
              />
            </div>
          </div>

          {/* ================= MAIN DASHBOARD GRID ================= */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            
            {/* LEFT / CENTER COLUMN (Metrics + Chart + Bottom Cards) -> 8 Cols */}
            <div className="xl:col-span-8 flex flex-col gap-6">
              
              {/* TOP METRICS ROW (White Card with 3 Metrics & Circular Rings) */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-soft border border-white/60">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                  
                  {/* Metric 1: Total Income / Total Assessments */}
                  <div className="flex items-center justify-between pr-0 sm:pr-4 pt-4 sm:pt-0">
                    <div>
                      <span className="text-xs font-bold text-[#8E95B2]">Total Income</span>
                      <p className="text-2xl sm:text-3xl font-black text-[#1E1B4B] mt-1 tracking-tight">
                        $1200
                      </p>
                      <span className="text-[10px] font-semibold text-[#8E95B2] mt-0.5 block">
                        During last month
                      </span>
                    </div>
                    <CircularRing percentage={68} color="#4E36E2" />
                  </div>

                  {/* Metric 2: Total Expense / High Vulnerability */}
                  <div className="flex items-center justify-between px-0 sm:px-4 pt-4 sm:pt-0">
                    <div>
                      <span className="text-xs font-bold text-[#8E95B2]">Total Expense</span>
                      <p className="text-2xl sm:text-3xl font-black text-[#1E1B4B] mt-1 tracking-tight">
                        4.500K
                      </p>
                      <span className="text-[10px] font-semibold text-[#8E95B2] mt-0.5 block">
                        During 2 months
                      </span>
                    </div>
                    <CircularRing percentage={35} color="#FFA07A" />
                  </div>

                  {/* Metric 3: Total Bonus / Resolved */}
                  <div className="flex items-center justify-between pl-0 sm:pl-4 pt-4 sm:pt-0">
                    <div>
                      <span className="text-xs font-bold text-[#8E95B2]">Total Bonus</span>
                      <p className="text-2xl sm:text-3xl font-black text-[#1E1B4B] mt-1 tracking-tight">
                        6.100k
                      </p>
                      <span className="text-[10px] font-semibold text-[#8E95B2] mt-0.5 block">
                        During 6 months
                      </span>
                    </div>
                    <CircularRing percentage={70} color="#FFB396" />
                  </div>

                </div>
              </div>

              {/* CENTER SMOOTH WAVE CHART */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-soft border border-white/60">
                <WaveChart />
              </div>

              {/* BOTTOM ROW (Order Capsule Bars + Earnings Semicircle Gauge) */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
                
                {/* Bottom Left Card: Order / Intake Volume -> 5 Cols */}
                <div className="sm:col-span-5 bg-white rounded-3xl p-6 shadow-soft border border-white/60 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-black text-[#1E1B4B]">Order</h4>
                      <p className="text-2xl font-black text-[#1E1B4B] mt-1 tracking-tight">4,76k</p>
                    </div>
                    <button
                      onClick={() => setShowDistributionModal(true)}
                      className="w-8 h-8 rounded-full bg-[#F4F6FB] flex items-center justify-center text-[#8E95B2] hover:text-[#4E36E2] transition cursor-pointer"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Capsule Bars in alternating Peach / Light Lavender */}
                  <div className="flex items-end justify-between h-24 pt-4 px-1">
                    {[
                      { h: "35%", c: "#FFA07A" },
                      { h: "55%", c: "#FFA07A" },
                      { h: "85%", c: "#FFA07A" },
                      { h: "70%", c: "#FFA07A" },
                      { h: "45%", c: "#FFA07A" }
                    ].map((bar, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <div className="w-3.5 h-20 bg-[#F4F6FB] rounded-full flex flex-col justify-end overflow-hidden p-0.5">
                          <div
                            className="w-full rounded-full transition-all duration-700"
                            style={{ height: bar.h, backgroundColor: bar.c }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Middle Card: Earnings / SVI Donut Gauge -> 7 Cols */}
                <div className="sm:col-span-7 bg-white rounded-3xl p-6 shadow-soft border border-white/60 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-black text-[#1E1B4B]">Earnings</h4>
                      <p className="text-xs font-semibold text-[#8E95B2]">Total Expense</p>
                    </div>
                    <button
                      onClick={() => setShowDistributionModal(true)}
                      className="w-8 h-8 rounded-full bg-[#F4F6FB] flex items-center justify-center text-[#8E95B2] hover:text-[#4E36E2] transition cursor-pointer"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4 mt-2">
                    <div>
                      <p className="text-2xl sm:text-3xl font-black text-[#1E1B4B] tracking-tight">
                        $5078.78
                      </p>
                      <p className="text-[11px] font-semibold text-[#8E95B2] mt-1 leading-relaxed">
                        Profile is 45% More than last Month
                      </p>
                    </div>

                    <div className="flex justify-center sm:justify-end">
                      <SemicircleGradientGauge percentage={75} />
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* RIGHT COLUMN (Profile + Recent Activities + Quick Transactions) -> 4 Cols */}
            <div className="xl:col-span-4 flex flex-col gap-6">

              {/* CARD 1: User Profile & 3 Circular Action Buttons */}
              <div className="bg-white rounded-3xl p-6 shadow-soft border border-white/60 flex flex-col items-center text-center">
                {/* Avatar with Green Active Dot */}
                <div className="relative mb-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FFA07A] via-[#FF8C68] to-[#4E36E2] p-0.5 shadow-md">
                    <div className="w-full h-full rounded-full bg-[#1E1B4B] text-white flex items-center justify-center font-black text-xl">
                      G
                    </div>
                  </div>
                  <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-white" />
                </div>

                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-black text-[#1E1B4B]">Ghulam</h3>
                  <ChevronDown className="w-4 h-4 text-[#8E95B2]" />
                </div>
                <p className="text-xs font-semibold text-[#8E95B2] mt-0.5">Product Designer</p>

                {/* Row of 3 Soft 3D Circular Buttons */}
                <div className="flex items-center justify-center gap-4 mt-5">
                  {/* Chat */}
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent("open-chatbot"))}
                    className="w-10 h-10 rounded-full bg-white shadow-soft-circle border border-slate-100 flex items-center justify-center text-[#1E1B4B] hover:text-[#4E36E2] hover:scale-105 transition cursor-pointer"
                    title="AI Chatbot"
                  >
                    <Mail className="w-4 h-4" />
                  </button>

                  {/* Calendar */}
                  <button
                    onClick={() => setShowCalendarModal(true)}
                    className="w-10 h-10 rounded-full bg-white shadow-soft-circle border border-slate-100 flex items-center justify-center text-[#1E1B4B] hover:text-[#4E36E2] hover:scale-105 transition cursor-pointer"
                    title="Calendar Schedules"
                  >
                    <Calendar className="w-4 h-4" />
                  </button>

                  {/* Bell */}
                  <button
                    onClick={() => setShowTriageLogsModal(true)}
                    className="w-10 h-10 rounded-full bg-white shadow-soft-circle border border-slate-100 flex items-center justify-center text-[#1E1B4B] hover:text-[#4E36E2] hover:scale-105 transition relative cursor-pointer"
                    title="Notifications"
                  >
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#4E36E2] rounded-full" />
                  </button>
                </div>
              </div>

              {/* CARD 2: Recent Activities */}
              <div className="bg-white rounded-3xl p-6 shadow-soft border border-white/60">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-black text-[#1E1B4B]">Recent Activities</h4>
                  <span className="text-[11px] font-bold text-[#8E95B2]">02 Mar 2026</span>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      name: "Mike Loke",
                      role: "Backend Developer",
                      time: "5 Mins ago",
                      avatarBg: "bg-amber-100 text-amber-800"
                    },
                    {
                      name: "Sarah Hosten",
                      role: "Senior Quality Assurance",
                      time: "15 Mins ago",
                      avatarBg: "bg-purple-100 text-purple-800"
                    },
                    {
                      name: "Dena Thompson",
                      role: "Business Development",
                      time: "30 Mins ago",
                      avatarBg: "bg-rose-100 text-rose-800"
                    },
                    {
                      name: "William Tiet",
                      role: "Project Manager",
                      time: "1 hour ago",
                      avatarBg: "bg-blue-100 text-blue-800"
                    }
                  ].map((act, i) => (
                    <div key={i} className="flex items-center justify-between gap-3 group">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full ${act.avatarBg} flex items-center justify-center font-bold text-xs shrink-0 shadow-sm`}>
                          {act.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-black text-[#1E1B4B] group-hover:text-[#4E36E2] transition">
                            {act.name}
                          </p>
                          <p className="text-[10px] font-semibold text-[#8E95B2]">{act.role}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold text-[#8E95B2] whitespace-nowrap">
                        {act.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CARD 3: Quick Transactions / Quick Actions */}
              <div className="bg-white rounded-3xl p-6 shadow-soft border border-white/60">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-black text-[#1E1B4B]">Quick Transactions</h4>
                    <p className="text-[10px] font-semibold text-[#8E95B2]">List of your beneficiary</p>
                  </div>
                  <button
                    onClick={() => setShowDistributionModal(true)}
                    className="w-8 h-8 rounded-full bg-[#F4F6FB] flex items-center justify-center text-[#8E95B2] hover:text-[#4E36E2] transition cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Pill amount input row */}
                <div className="bg-[#F4F6FB] rounded-full p-1 flex items-center justify-between mb-4">
                  <button className="bg-[#4E36E2] text-white text-xs font-black px-4 py-2 rounded-full shadow-soft-purple hover:bg-[#3C28B6] transition">
                    Amount
                  </button>
                  <span className="text-xs font-black text-[#1E1B4B] pr-4">$570</span>
                </div>

                {/* Teammate Avatars with + button */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => setShowCalendarModal(true)}
                    className="w-8 h-8 rounded-full bg-[#4E36E2] text-white flex items-center justify-center text-sm font-bold shadow-soft-purple hover:scale-105 transition cursor-pointer"
                  >
                    +
                  </button>
                  {["#FFA07A", "#6C5CE7", "#FF7654", "#20BF6B"].map((col, idx) => (
                    <div
                      key={idx}
                      className="w-8 h-8 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-black text-white"
                      style={{ backgroundColor: col }}
                    >
                      {String.fromCharCode(65 + idx)}
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* ================= CASES DATABASE TABLE SECTION ================= */}
          <div id="cases-table" className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-white/60 mt-2">
            
            {/* Table Header Controls */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-[#1E1B4B]">Case Assessment Database</h3>
                <p className="text-xs font-semibold text-[#8E95B2] mt-0.5">
                  Showing {filtered.length} of {assessments.length} logged complaints
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {/* Risk Filter Pills */}
                <div className="flex items-center gap-1 bg-[#F4F6FB] p-1 rounded-full">
                  {["All", "Critical", "High", "Moderate", "Low"].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setFilter(lvl)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        filter === lvl
                          ? "bg-[#4E36E2] text-white shadow-soft-purple"
                          : "text-[#8E95B2] hover:text-[#1E1B4B]"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>

                {/* Batch Actions */}
                {selectedRowIds.size > 0 && (
                  <button
                    onClick={handleDeleteSelected}
                    className="bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete ({selectedRowIds.size})
                  </button>
                )}

                {/* Export CSV */}
                <button
                  onClick={handleDownloadAllReport}
                  className="bg-[#F4F6FB] hover:bg-slate-100 text-[#1E1B4B] text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-slate-200/60 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#4E36E2]" /> Export CSV
                </button>
              </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto pt-4">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[#8E95B2] font-black uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3 w-10">
                      <input
                        type="checkbox"
                        checked={filtered.length > 0 && selectedRowIds.size === filtered.length}
                        onChange={toggleSelectAll}
                        className="rounded accent-[#4E36E2] cursor-pointer"
                      />
                    </th>
                    <th className="py-3 px-3">Reference ID</th>
                    <th className="py-3 px-3">Complainant</th>
                    <th className="py-3 px-3">Primary Concern</th>
                    <th className="py-3 px-3">SVI Score</th>
                    <th className="py-3 px-3">Risk Tier</th>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-medium">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-[#8E95B2] font-semibold">
                        No assessment records found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((item) => {
                      const isSelected = selectedRowIds.has(item.id);
                      return (
                        <tr
                          key={item.id}
                          onClick={() => setSelectedAssessment(item)}
                          className={`hover:bg-[#F4F6FB]/80 transition cursor-pointer ${
                            isSelected ? "bg-purple-50/50" : ""
                          }`}
                        >
                          <td className="py-3.5 px-3" onClick={(e) => toggleRowSelect(item.id, e)}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {}}
                              className="rounded accent-[#4E36E2] cursor-pointer"
                            />
                          </td>
                          <td className="py-3.5 px-3 font-black text-[#1E1B4B]">
                            {item.reference_id || item.id?.slice(0, 8)}
                          </td>
                          <td className="py-3.5 px-3 text-[#1E1B4B] font-bold">
                            {item.full_name || "Anonymous"}
                          </td>
                          <td className="py-3.5 px-3 text-[#8E95B2]">
                            {item.primary_concern || "General Distress"}
                          </td>
                          <td className="py-3.5 px-3 font-black text-[#1E1B4B]">
                            <span className="inline-flex items-center gap-1.5">
                              <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: RISK_COLORS[item.risk_category] || "#4E36E2" }}
                              />
                              {item.svi_score || 0}/100
                            </span>
                          </td>
                          <td className="py-3.5 px-3">
                            <span
                              className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider"
                              style={{
                                backgroundColor:
                                  item.risk_category === "Critical"
                                    ? "#FEE2E2"
                                    : item.risk_category === "High"
                                    ? "#FFEDD5"
                                    : item.risk_category === "Moderate"
                                    ? "#FEF3C7"
                                    : "#EEF0FD",
                                color:
                                  item.risk_category === "Critical"
                                    ? "#DC2626"
                                    : item.risk_category === "High"
                                    ? "#EA580C"
                                    : item.risk_category === "Moderate"
                                    ? "#D97706"
                                    : "#4E36E2"
                              }}
                            >
                              {item.risk_category || "Moderate"}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-[#8E95B2] font-semibold text-[11px]">
                            {item.created_date ? new Date(item.created_date).toLocaleDateString() : "Today"}
                          </td>
                          <td className="py-3.5 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={(e) => handleDownloadSingle(item, e)}
                                className="w-7 h-7 rounded-full bg-[#F4F6FB] flex items-center justify-center text-[#8E95B2] hover:text-[#4E36E2] transition"
                                title="Download Report"
                              >
                                <Download className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={(e) => handleDeleteRecord(item.id, e)}
                                className="w-7 h-7 rounded-full bg-[#F4F6FB] flex items-center justify-center text-[#8E95B2] hover:text-red-600 transition"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

          </div>

        </div>

      </div>

      {/* ================= DETAIL MODAL ================= */}
      {selectedAssessment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-[#8E95B2]">Case Reference</span>
                <h3 className="text-xl font-black text-[#1E1B4B]">
                  {selectedAssessment.reference_id || selectedAssessment.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAssessment(null)}
                className="w-8 h-8 rounded-full bg-[#F4F6FB] flex items-center justify-center text-[#8E95B2] hover:text-[#1E1B4B]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F4F6FB] p-4 rounded-2xl">
                <div>
                  <span className="text-[#8E95B2] font-semibold">Complainant</span>
                  <p className="font-bold text-[#1E1B4B] mt-0.5">{selectedAssessment.full_name || "Anonymous"}</p>
                </div>
                <div>
                  <span className="text-[#8E95B2] font-semibold">Age / Gender</span>
                  <p className="font-bold text-[#1E1B4B] mt-0.5">
                    {selectedAssessment.age || "—"} / {selectedAssessment.gender || "—"}
                  </p>
                </div>
                <div>
                  <span className="text-[#8E95B2] font-semibold">Language</span>
                  <p className="font-bold text-[#1E1B4B] mt-0.5">{selectedAssessment.language || "English"}</p>
                </div>
                <div>
                  <span className="text-[#8E95B2] font-semibold">SVI Score</span>
                  <p className="font-black text-[#4E36E2] mt-0.5">{selectedAssessment.svi_score || 0}/100</p>
                </div>
              </div>

              <div>
                <h4 className="font-black text-[#1E1B4B] mb-1">Clinical Narrative</h4>
                <p className="text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-100 leading-relaxed">
                  {selectedAssessment.narrative || "No extended narrative provided."}
                </p>
              </div>

              <div>
                <h4 className="font-black text-[#1E1B4B] mb-1">AI Diagnostic Summary</h4>
                <p className="text-slate-600 bg-purple-50/50 p-3.5 rounded-xl border border-purple-100 leading-relaxed">
                  {selectedAssessment.summary || "Acute distress markers detected."}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={(e) => handleDownloadSingle(selectedAssessment, e)}
                className="bg-[#4E36E2] text-white font-bold px-5 py-2.5 rounded-full shadow-soft-purple hover:bg-[#3C28B6] transition flex items-center gap-2 text-xs"
              >
                <Download className="w-3.5 h-3.5" /> Download Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= TRIAGE LOGS MODAL ================= */}
      {showTriageLogsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[88vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-black text-[#1E1B4B]">National Triage Dispatch Logs</h3>
                <p className="text-xs font-semibold text-[#8E95B2]">Live incident responses & officer dispatches</p>
              </div>
              <button
                onClick={() => setShowTriageLogsModal(false)}
                className="w-8 h-8 rounded-full bg-[#F4F6FB] flex items-center justify-center text-[#8E95B2] hover:text-[#1E1B4B]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3">
              {triageLogs.map((log) => (
                <div key={log.id} className="p-4 rounded-2xl bg-[#F4F6FB] border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-[#1E1B4B]">{log.refId}</span>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-purple-100 text-[#4E36E2]">
                        {log.category}
                      </span>
                    </div>
                    <p className="text-slate-600 mt-1">{log.action}</p>
                  </div>
                  <span className="text-[10px] font-bold text-[#8E95B2] shrink-0">{log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= CALENDAR MODAL ================= */}
      {showCalendarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[88vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-black text-[#1E1B4B]">Clinical Schedules & Calendar</h3>
                <p className="text-xs font-semibold text-[#8E95B2]">Debriefings, hearings & follow-up reviews</p>
              </div>
              <button
                onClick={() => setShowCalendarModal(false)}
                className="w-8 h-8 rounded-full bg-[#F4F6FB] flex items-center justify-center text-[#8E95B2] hover:text-[#1E1B4B]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3">
              {calendarEvents.map((evt) => (
                <div key={evt.id} className="p-4 rounded-2xl bg-[#F4F6FB] border border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-black text-[#1E1B4B]">{evt.title}</span>
                    <p className="text-[11px] text-[#8E95B2] mt-0.5">{evt.complainant} · {evt.officer}</p>
                  </div>
                  <span className="font-black text-[#4E36E2] bg-purple-50 px-2.5 py-1 rounded-full">{evt.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}