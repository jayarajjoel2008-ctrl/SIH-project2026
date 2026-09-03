import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import {
  Brain,
  Shield,
  ShieldCheck,
  User,
  HeartHandshake,
  LogIn,
  Loader2,
  Lock,
  Mail,
  ArrowRight,
  Phone,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Stethoscope,
  Wind
} from "lucide-react";
import { safeReturnTo } from "@/lib/authReturnTo";

export default function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithRole, loginGuest, isAuthenticated, user } = useAuth();

  // Mode: "user" | "admin"
  const defaultTab = searchParams.get("role") === "admin" ? "admin" : "user";
  const [activeTab, setActiveTab] = useState(defaultTab);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);

  // If already authenticated, redirect intelligently
  useEffect(() => {
    if (isAuthenticated && user) {
      const returnTo = safeReturnTo();
      if (returnTo) {
        navigate(returnTo);
      } else if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/home");
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError("");
    setEmail("");
    setPassword("");
  };

  const handleDemoFill = (roleType) => {
    setError("");
    if (roleType === "user") {
      setEmail("citizen.user@mindpluze.org");
      setPassword("citizen123");
    } else {
      setEmail("officer.admin@mindpluze.gov.in");
      setPassword("admin123");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const returnTo = safeReturnTo();
      const loggedUser = await loginWithRole(email, password, activeTab);
      const isRoleAdmin = activeTab === "admin" || loggedUser?.role === "admin";
      
      if (returnTo) {
        navigate(returnTo);
      } else if (isRoleAdmin) {
        navigate("/dashboard");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setError("");
    setGuestLoading(true);
    try {
      await loginGuest();
      navigate("/home");
    } catch (err) {
      setError("Unable to start guest session. Please try again.");
    } finally {
      setGuestLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#081C35] via-[#0D2B52] to-[#081C35] flex flex-col justify-between relative overflow-hidden py-8 px-4 sm:px-6 lg:px-8">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0E9F9A]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header / Portal Branding */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between z-10 mb-6">
        <Link to="/home" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 backdrop-blur flex items-center justify-center text-[#0E9F9A] shadow-lg group-hover:scale-105 transition">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl text-white tracking-tight">MindPluze</span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#0E9F9A]/20 text-[#0E9F9A] border border-[#0E9F9A]/30 px-2 py-0.5 rounded-full">
                NHAA 14566
              </span>
            </div>
            <p className="text-xs text-slate-300">AI-Powered Predictive Stress & Trauma Triage</p>
          </div>
        </Link>

        {/* Quick Help Hotline Badge */}
        <div className="hidden sm:flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 text-rose-300 px-3.5 py-1.5 rounded-full text-xs font-semibold">
          <Phone className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          <span>24/7 Helpline: <strong>14566</strong></span>
        </div>
      </div>

      {/* Main Authentication Container */}
      <div className="max-w-xl mx-auto w-full z-10">
        {/* Role Selector Tabs */}
        <div className="bg-white/10 p-1.5 rounded-2xl backdrop-blur-md border border-white/15 flex items-center gap-2 mb-6 shadow-xl">
          <button
            type="button"
            onClick={() => handleTabChange("user")}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
              activeTab === "user"
                ? "bg-[#0E9F9A] text-white shadow-lg shadow-teal-950/30 scale-[1.01]"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Citizen / User Login</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("admin")}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
              activeTab === "admin"
                ? "bg-white text-[#081C35] shadow-lg shadow-black/20 scale-[1.01]"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Shield className="w-4 h-4 text-[#0E9F9A]" />
            <span>Helpline Officer / Admin</span>
          </button>
        </div>

        {/* Card Body */}
        <div className="bg-white rounded-3xl p-7 sm:p-9 shadow-2xl border border-white/20 transition-all duration-300">
          {/* Header depending on role */}
          {activeTab === "user" ? (
            <div className="mb-6">
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 text-[#0E9F9A] bg-[#0E9F9A]/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  <HeartHandshake className="w-3.5 h-3.5" /> Citizen & Complainant Portal
                </div>
                <button
                  type="button"
                  onClick={() => handleDemoFill("user")}
                  className="text-xs font-semibold text-[#0E9F9A] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" /> Fill Demo User
                </button>
              </div>
              <h2 className="text-2xl font-black text-[#081C35] mt-2 tracking-tight">
                Welcome to Confidential Care
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Access your trauma assessments, AI support, and emergency welfare services safely.
              </p>
            </div>
          ) : (
            <div className="mb-6">
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" /> Authorized Officer Portal
                </div>
                <button
                  type="button"
                  onClick={() => handleDemoFill("admin")}
                  className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" /> Fill Demo Admin
                </button>
              </div>
              <h2 className="text-2xl font-black text-[#081C35] mt-2 tracking-tight">
                Helpline & Clinical Admin
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Access National Helpline 14566 SVI Analytics, case triage, and dispatch logs.
              </p>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5" htmlFor="email">
                {activeTab === "user" ? "Email Address" : "Officer / Admin Email"}
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  required
                  placeholder={activeTab === "user" ? "citizen@example.com" : "officer@mindpluze.gov.in"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0E9F9A] focus:ring-2 focus:ring-[#0E9F9A]/20 transition text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700" htmlFor="password">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-[#0E9F9A] hover:underline font-semibold"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0E9F9A] focus:ring-2 focus:ring-[#0E9F9A]/20 transition text-sm font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || guestLoading}
              className={`w-full mt-2 text-white font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 text-base transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 cursor-pointer ${
                activeTab === "user"
                  ? "bg-[#0E9F9A] hover:bg-[#0C8783] shadow-teal-900/20"
                  : "bg-[#081C35] hover:bg-[#0D2B52] shadow-slate-900/20"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  {activeTab === "user" ? "Sign In as Citizen" : "Secure Admin Login"}
                </>
              )}
            </button>
          </form>

          {/* Citizen Guest / Anonymous Access Option */}
          {activeTab === "user" && (
            <div className="mt-5 pt-5 border-t border-slate-100">
              <div className="relative flex justify-center text-xs uppercase mb-4">
                <span className="bg-white px-3 text-slate-400 font-semibold tracking-wider">
                  Or Immediate Crisis Assessment
                </span>
              </div>

              <button
                type="button"
                onClick={handleGuestLogin}
                disabled={guestLoading || loading}
                className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition cursor-pointer hover:border-slate-300"
              >
                {guestLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-[#0E9F9A]" />
                ) : (
                  <Stethoscope className="w-4 h-4 text-[#0E9F9A]" />
                )}
                <span>Continue as Anonymous Citizen (No Sign-In Required)</span>
              </button>
            </div>
          )}

          {/* Quick Actions & Security Highlights */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            {activeTab === "user" ? (
              <>
                <div>
                  New here?{" "}
                  <Link to="/register" className="text-[#0E9F9A] font-bold hover:underline">
                    Create free account
                  </Link>
                </div>
                <Link to="/breathe" className="inline-flex items-center gap-1 text-[#0E9F9A] font-semibold hover:underline">
                  <Wind className="w-3.5 h-3.5" /> Guided Breathing
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>256-Bit Encrypted Admin Session</span>
                </div>
                <div className="text-slate-400">
                  NHAA Officer ID required
                </div>
              </>
            )}
          </div>
        </div>

        {/* Public Exploration Link */}
        <div className="text-center mt-6">
          <Link
            to="/home"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full backdrop-blur border border-white/10 transition"
          >
            <span>Explore Public Features & Guidelines</span>
            <ArrowRight className="w-4 h-4 text-[#0E9F9A]" />
          </Link>
        </div>
      </div>

      {/* Emergency Footer Banner */}
      <div className="max-w-4xl mx-auto w-full z-10 mt-8 text-center text-xs text-slate-400">
        <p>
          Emergency Triage Partner: National Helpline Against Atrocities (14566) · Ministry of Social Justice & Empowerment
        </p>
      </div>
    </div>
  );
}
