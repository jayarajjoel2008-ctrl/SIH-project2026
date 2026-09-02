import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Shield, LogIn, Loader2, Info, ArrowLeft } from "lucide-react";
import { safeReturnTo } from "@/lib/authReturnTo";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const returnTo = safeReturnTo();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await base44.auth.loginViaEmailPassword(email, password);
      window.location.href = returnTo || "/dashboard";
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-[#6875DF] via-[#5B50D6] to-[#433496] relative">
      {/* Top back link */}
      <Link
        to="/"
        className="absolute top-6 left-6 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur px-3.5 py-1.5 rounded-full transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      {/* Admin Login Card matching screenshot */}
      <div className="w-full max-w-[440px] bg-white rounded-[2rem] p-8 sm:p-10 shadow-2xl border border-white/20 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center gap-2.5 mb-1">
          <Shield className="w-7 h-7 text-slate-900 fill-slate-900 shrink-0" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Admin Login
          </h1>
        </div>

        <p className="text-sm font-medium text-slate-500 mb-6">
          Access the MindCare AI Dashboard
        </p>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoFocus
              placeholder="admin@mindcare.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#584CE4] focus:ring-2 focus:ring-[#584CE4]/20 transition text-sm"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-semibold text-slate-700" htmlFor="password">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-[#584CE4] hover:underline font-medium"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              required
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#584CE4] focus:ring-2 focus:ring-[#584CE4]/20 transition text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-[#6366F1] to-[#584CE4] hover:from-[#5457E5] hover:to-[#473BC7] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 text-base transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" /> Login
              </>
            )}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium text-center">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>Use any registered account</span>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 text-center text-xs text-slate-400">
          Don't have an account?{" "}
          <Link
            to={"/register" + (returnTo !== "/dashboard" ? "?returnTo=" + encodeURIComponent(returnTo) : "")}
            className="text-[#584CE4] font-semibold hover:underline"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
