import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Brain, TrendingUp, Menu, X, LogOut, User } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import BreatheModal from "@/components/BreatheModal";

export default function SiteNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [breatheOpen, setBreatheOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openChatbot = () => {
    window.dispatchEvent(new CustomEvent("open-chatbot"));
  };

  const handleNavClick = (to) => {
    setMobileMenuOpen(false);
    if (to.startsWith("/#")) {
      const id = to.replace("/#", "");
      if (pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Top Emergency Utility Bar */}
      <div className="bg-[#FF5722] text-white text-xs sm:text-sm font-semibold tracking-wide py-2 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
          <a href="tel:14566" className="underline underline-offset-2 hover:opacity-90 font-bold">
            14566 (NHAA)
          </a>
          <span className="opacity-75 font-normal">|</span>
          <a href="tel:100" className="underline underline-offset-2 hover:opacity-90 font-bold">
            Police: 100
          </a>
          <span className="opacity-75 font-normal">|</span>
          <a href="tel:108" className="underline underline-offset-2 hover:opacity-90 font-bold">
            Medical: 108
          </a>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-18 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-[#584CE4] flex items-center justify-center text-white shadow-md shadow-indigo-100">
              <Brain className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl text-[#3A338F] tracking-tight">MindCare AI</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 text-sm font-medium text-slate-700">
            <Link
              to="/"
              className={`px-2 py-1 transition flex items-center gap-1 ${
                pathname === "/" ? "text-[#584CE4] font-bold" : "text-slate-700 hover:text-[#584CE4]"
              }`}
            >
              <span className="text-slate-400 mr-0.5">•</span> Home
            </Link>

            <button
              onClick={() => handleNavClick("/#features")}
              className="px-2 py-1 text-slate-700 hover:text-[#584CE4] transition flex items-center gap-1 cursor-pointer"
            >
              <span className="text-slate-400 mr-0.5">•</span> Features
            </button>

            <Link
              to="/assessment"
              className={`px-2 py-1 transition flex items-center gap-1 ${
                pathname === "/assessment" ? "text-[#584CE4] font-bold" : "text-slate-700 hover:text-[#584CE4]"
              }`}
            >
              <span className="text-slate-400 mr-0.5">•</span> Assessment
            </Link>

            <button
              onClick={openChatbot}
              className="px-2 py-1 text-slate-700 hover:text-[#584CE4] transition flex items-center gap-1 cursor-pointer"
            >
              <span className="text-slate-400 mr-0.5">•</span> AI Chatbot
            </button>

            <button
              onClick={() => handleNavClick("/#how-it-works")}
              className="px-2 py-1 text-slate-700 hover:text-[#584CE4] transition flex items-center gap-1 cursor-pointer"
            >
              <span className="text-slate-400 mr-0.5">•</span> How It Works
            </button>

            <Link
              to="/breathe"
              className={`px-2 py-1 transition flex items-center gap-1 font-semibold ${
                pathname === "/breathe" ? "text-[#584CE4] font-bold" : "text-[#584CE4] hover:text-[#473BC7]"
              }`}
            >
              <span className="text-slate-400 mr-0.5">•</span> 🫁 Breathe
            </Link>

            <Link
              to="/dashboard"
              className={`px-2 py-1 transition flex items-center gap-1 ${
                pathname === "/dashboard" ? "text-[#584CE4] font-bold" : "text-slate-700 hover:text-[#584CE4]"
              }`}
            >
              <span className="text-slate-400 mr-0.5">•</span> 📈 Admin
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full">
                  <User className="w-3.5 h-3.5 text-[#584CE4]" /> {user?.email || "Admin"}
                </span>
                <button
                  onClick={() => logout(true)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-full transition cursor-pointer"
                  title="Log out"
                >
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login?returnTo=/dashboard"
                className="bg-[#584CE4] hover:bg-[#473BC7] text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md shadow-indigo-100 transition"
              >
                Login / Sign Up
              </Link>
            )}

            <Link
              to="/dashboard"
              className={`text-sm font-semibold hover:underline flex items-center gap-1 ml-1 ${
                pathname === "/dashboard" ? "text-[#584CE4]" : "text-[#584CE4]"
              }`}
            >
              <span className="text-slate-400">•</span> <TrendingUp className="w-4 h-4" /> My Dashboard
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden items-center gap-2">
            {isAuthenticated ? (
              <button
                onClick={() => logout(true)}
                className="text-rose-600 bg-rose-50 text-xs font-semibold px-3 py-1.5 rounded-full"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login?returnTo=/dashboard"
                className="bg-[#584CE4] text-white text-xs font-semibold px-3.5 py-1.5 rounded-full"
              >
                Login
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-800 font-medium"
            >
              • Home
            </Link>
            <button
              onClick={() => handleNavClick("/#features")}
              className="block w-full text-left py-2 text-slate-800 font-medium"
            >
              • Features
            </button>
            <Link
              to="/assessment"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-800 font-medium"
            >
              • Assessment
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openChatbot();
              }}
              className="block w-full text-left py-2 text-slate-800 font-medium"
            >
              • AI Chatbot
            </button>
            <button
              onClick={() => handleNavClick("/#how-it-works")}
              className="block w-full text-left py-2 text-slate-800 font-medium"
            >
              • How It Works
            </button>
            <Link
              to="/breathe"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left py-2 text-[#584CE4] font-semibold"
            >
              • 🫁 Breathe
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-800 font-medium"
            >
              • 📈 My Dashboard
            </Link>
          </div>
        )}
      </header>

      {/* Guided Breathing Modal */}
      <BreatheModal isOpen={breatheOpen} onClose={() => setBreatheOpen(false)} />
    </>
  );
}