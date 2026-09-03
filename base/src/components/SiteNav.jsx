import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Brain, TrendingUp, Menu, X, LogOut, User } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import BreatheModal from "@/components/BreatheModal";

export default function SiteNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, isAdmin, logout } = useAuth();
  const [breatheOpen, setBreatheOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openChatbot = () => {
    window.dispatchEvent(new CustomEvent("open-chatbot"));
  };

  const handleNavClick = (to) => {
    setMobileMenuOpen(false);
    if (to.startsWith("/#")) {
      const id = to.replace("/#", "");
      if (pathname !== "/home" && pathname !== "/") {
        navigate("/home");
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 120);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Light Clean Elevated Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/70 text-[#1E1B4B] shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo with Purple & Peach Emblem */}
          <Link to="/home" className="flex items-center gap-3 shrink-0 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#FFA07A] via-[#FF8C68] to-[#4E36E2] flex items-center justify-center text-white shadow-soft-purple group-hover:scale-105 transition-transform">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-black text-2xl text-[#1E1B4B] tracking-tight">MindPluze</span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#4E36E2] bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
                14566
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-[#8E95B2] bg-[#F4F6FB] p-1.5 rounded-full border border-slate-200/60">
            <Link
              to="/home"
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                pathname === "/home" || pathname === "/"
                  ? "text-white bg-[#4E36E2] shadow-soft-purple"
                  : "hover:text-[#1E1B4B] hover:bg-white"
              }`}
            >
              Home
            </Link>

            <button
              onClick={() => handleNavClick("/#features")}
              className="px-3.5 py-1.5 rounded-full hover:text-[#1E1B4B] hover:bg-white transition-all cursor-pointer"
            >
              Features
            </button>

            <Link
              to="/assessment"
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                pathname === "/assessment"
                  ? "text-white bg-[#4E36E2] shadow-soft-purple"
                  : "hover:text-[#1E1B4B] hover:bg-white"
              }`}
            >
              Assessment
            </Link>

            <button
              onClick={openChatbot}
              className="px-3.5 py-1.5 rounded-full hover:text-[#1E1B4B] hover:bg-white transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-[#4E36E2] animate-pulse" />
              <span>AI Chatbot</span>
            </button>

            <button
              onClick={() => handleNavClick("/#how-it-works")}
              className="px-3.5 py-1.5 rounded-full hover:text-[#1E1B4B] hover:bg-white transition-all cursor-pointer"
            >
              How It Works
            </button>

            <Link
              to="/breathe"
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                pathname === "/breathe"
                  ? "text-white bg-[#4E36E2] shadow-soft-purple"
                  : "text-[#4E36E2] hover:bg-white"
              }`}
            >
              🫁 Breathe
            </Link>

            {/* Admin link visible ONLY to Admin */}
            {isAdmin && (
              <Link
                to="/dashboard"
                className={`px-3.5 py-1.5 rounded-full transition-all ${
                  pathname === "/dashboard"
                    ? "text-white bg-[#4E36E2] shadow-soft-purple font-bold"
                    : "text-[#4E36E2] hover:bg-white"
                }`}
              >
                📈 Admin Dashboard
              </Link>
            )}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3.5 shrink-0">
            {isAuthenticated ? (
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#1E1B4B] bg-[#F4F6FB] px-3.5 py-1.5 rounded-full border border-slate-200/60">
                  <User className="w-3.5 h-3.5 text-[#4E36E2]" />
                  <span className="max-w-[120px] truncate font-bold">{user?.name || user?.email || "Citizen"}</span>
                  <span className={`text-[10px] uppercase font-black px-1.5 py-0.5 rounded-full ${isAdmin ? "bg-[#4E36E2] text-white" : "bg-purple-100 text-[#4E36E2]"}`}>
                    {isAdmin ? "Officer" : "Citizen"}
                  </span>
                </span>
                
                <button
                  onClick={() => logout("/")}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/60 px-3.5 py-1.5 rounded-full transition cursor-pointer"
                  title="Log out"
                >
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-[#8E95B2] hover:text-[#1E1B4B] text-xs font-bold px-3 py-2 transition"
              >
                Sign In
              </Link>
            )}

            {/* Glowing Royal Purple Pill Button */}
            {isAdmin ? (
              <Link
                to="/dashboard"
                className="bg-[#4E36E2] hover:bg-[#3C28B6] text-white text-xs font-black px-6 py-2.5 rounded-full shadow-soft-purple transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <TrendingUp className="w-4 h-4" /> My Dashboard
              </Link>
            ) : (
              <Link
                to="/assessment"
                className="bg-[#4E36E2] hover:bg-[#3C28B6] text-white text-xs font-black px-6 py-2.5 rounded-full shadow-soft-purple transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                Start Assessment
              </Link>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex sm:hidden items-center gap-2">
            {isAuthenticated ? (
              <button
                onClick={() => logout("/")}
                className="text-rose-600 bg-rose-50 text-xs font-semibold px-3 py-1.5 rounded-full border border-rose-200"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-[#4E36E2] text-white text-xs font-bold px-4 py-1.5 rounded-full"
              >
                Login
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#8E95B2] hover:text-[#1E1B4B] hover:bg-[#F4F6FB] rounded-xl transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-2 text-[#1E1B4B] shadow-xl">
            <Link
              to="/home"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-medium hover:text-[#4E36E2]"
            >
              • Home
            </Link>
            <button
              onClick={() => handleNavClick("/#features")}
              className="block w-full text-left py-2 font-medium hover:text-[#4E36E2]"
            >
              • Features
            </button>
            <Link
              to="/assessment"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-medium hover:text-[#4E36E2]"
            >
              • Assessment
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openChatbot();
              }}
              className="block w-full text-left py-2 font-medium text-[#4E36E2]"
            >
              • AI Chatbot
            </button>
            <button
              onClick={() => handleNavClick("/#how-it-works")}
              className="block w-full text-left py-2 font-medium hover:text-[#4E36E2]"
            >
              • How It Works
            </button>
            <Link
              to="/breathe"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left py-2 text-[#4E36E2] font-semibold"
            >
              • 🫁 Guided Breathing
            </Link>
            {isAdmin && (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-[#4E36E2] font-bold"
              >
                • 📈 Executive Dashboard
              </Link>
            )}
          </div>
        )}
      </header>

      {/* Guided Breathing Modal */}
      <BreatheModal isOpen={breatheOpen} onClose={() => setBreatheOpen(false)} />
    </>
  );
}