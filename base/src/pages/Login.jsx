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
  AlertCircle
} from "lucide-react";
import { safeReturnTo } from "@/lib/authReturnTo";

export default function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithRole, loginGuest, isAuthenticated, user } = useAuth();

  const defaultTab = searchParams.get("role") === "admin" ? "admin" : "user";
  const [activeTab, setActiveTab] = useState(defaultTab);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);

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
      setError(err?.message || "Invalid credentials. Please verify your email and password.");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestEntry = async () => {
    setError("");
    setGuestLoading(true);
    try {
      await loginGuest();
      const returnTo = safeReturnTo();
      navigate(returnTo || "/home");
    } catch (err) {
      setError("Unable to start guest session. Please try again.");
    } finally {
      setGuestLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#EEF2F8] text-[#1E1B4B] flex flex-col justify-between relative overflow-hidden py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#4E36E2] selection:text-white">
      {/* Soft Background Halos */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header / Portal Branding */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between z-10 mb-6">
        <Link to="/home" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#FFA07A] via-[#FF8C68] to-[#4E36E2] flex items-center justify-center text-white shadow-soft-purple group-hover:scale-105 transition">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl text-[#1E1B4B] tracking-tight">MindPluze</span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-purple-50 text-[#4E36E2] border border-purple-100 px-2 py-0.5 rounded-full">
                NHAA 14566
              </span>
            </div>
            <p className="text-xs text-[#8E95B2] font-semibold">AI-Powered Predictive Stress & Trauma Triage</p>
          </div>
        </Link>

        {/* Quick Help Hotline Badge */}
        <div className="hidden sm:flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-600 px-3.5 py-1.5 rounded-full text-xs font-bold">
          <Phone className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
          <span>24/7 Helpline: <strong>14566</strong></span>
        </div>
      </div>

      {/* Main Authentication Container */}
      <div className="max-w-xl mx-auto w-full z-10">
        {/* Role Selector Tabs */}
        <div className="bg-white p-1.5 rounded-2xl border border-slate-200/70 flex items-center gap-2 mb-6 shadow-soft">
          <button
            type="button"
            onClick={() => handleTabChange("user")}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "user"
                ? "bg-[#4E36E2] text-white shadow-soft-purple scale-[1.01]"
                : "text-[#8E95B2] hover:text-[#1E1B4B] hover:bg-[#F4F6FB]"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Citizen / User Login</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("admin")}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "admin"
                ? "bg-[#4E36E2] text-white shadow-soft-purple scale-[1.01]"
                : "text-[#8E95B2] hover:text-[#1E1B4B] hover:bg-[#F4F6FB]"
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Helpline Officer / Admin</span>
          </button>
        </div>

        {/* Card Body */}
        <div className="bg-white rounded-3xl p-7 sm:p-9 shadow-soft-lg border border-white/80 transition-all duration-300">
          {activeTab === "user" ? (
            <div className="mb-6">
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 text-[#4E36E2] bg-purple-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  <HeartHandshake className="w-3.5 h-3.5" /> Citizen & Complainant Portal
                </div>
                <button
                  type="button"
                  onClick={() => handleDemoFill("user")}
                  className="text-xs font-semibold text-[#4E36E2] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" /> Fill Demo User
                </button>
              </div>
              <h2 className="text-2xl font-black text-[#1E1B4B] mt-2 tracking-tight">
                Welcome to Confidential Care
              </h2>
              <p className="text-xs text-[#8E95B2] font-semibold mt-1">
                Access your trauma assessments, AI support, and emergency welfare services safely.
              </p>
            </div>
          ) : (
            <div className="mb-6">
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 text-[#4E36E2] bg-purple-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4E36E2]" /> Authorized Officer Portal
                </div>
                <button
                  type="button"
                  onClick={() => handleDemoFill("admin")}
                  className="text-xs font-semibold text-[#4E36E2] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" /> Fill Demo Admin
                </button>
              </div>
              <h2 className="text-2xl font-black text-[#1E1B4B] mt-2 tracking-tight">
                Helpline & Clinical Admin
              </h2>
              <p className="text-xs text-[#8E95B2] font-semibold mt-1">
                Access National Helpline 14566 SVI Analytics, case triage, and dispatch logs.
              </p>
            </div>
          )}

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2.5">
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
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E95B2]" />
                <input
                  id="email"
                  type="email"
                  required
                  placeholder={activeTab === "user" ? "citizen@example.com" : "officer@mindpluze.gov.in"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-[#1E1B4B] placeholder-[#8E95B2] focus:outline-none focus:border-[#4E36E2] focus:ring-2 focus:ring-[#4E36E2]/20 transition text-xs font-semibold bg-[#F4F6FB]"
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
                  className="text-xs text-[#4E36E2] hover:underline font-bold"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E95B2]" />
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-[#1E1B4B] placeholder-[#8E95B2] focus:outline-none focus:border-[#4E36E2] focus:ring-2 focus:ring-[#4E36E2]/20 transition text-xs font-semibold bg-[#F4F6FB]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4E36E2] hover:bg-[#3C28B6] disabled:opacity-50 text-white font-black py-3.5 rounded-full shadow-soft-purple transition flex items-center justify-center gap-2 cursor-pointer text-xs mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>{activeTab === "user" ? "Sign In as Citizen" : "Sign In to Officer Portal"}</span>
                </>
              )}
            </button>
          </form>

          {/* Guest Assessment Quick Path */}
          {activeTab === "user" && (
            <div className="mt-5 pt-5 border-t border-slate-100">
              <button
                type="button"
                onClick={handleGuestEntry}
                disabled={guestLoading}
                className="w-full bg-[#F4F6FB] hover:bg-slate-100 text-[#1E1B4B] font-bold py-3 rounded-full border border-slate-200/80 transition flex items-center justify-center gap-2 text-xs cursor-pointer"
              >
                {guestLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-[#4E36E2]" />
                ) : (
                  <>
                    <span>Continue as Anonymous Guest</span>
                    <ArrowRight className="w-4 h-4 text-[#4E36E2]" />
                  </>
                )}
              </button>
            </div>
          )}

          {/* Registration link */}
          <div className="mt-6 text-center text-xs text-[#8E95B2] font-semibold">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#4E36E2] font-black hover:underline">
              Create an Account
            </Link>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="max-w-4xl mx-auto w-full text-center text-xs text-[#8E95B2] z-10 mt-6 font-semibold">
        Protected under National Helpline Against Atrocities (14566) Safeguards · SC/ST PoA Statutory Compliance
      </div>
    </div>
  );
}
