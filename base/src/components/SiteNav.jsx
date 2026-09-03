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

  const isHome = pathname === "/" || pathname === "/home";

  return (
    <>
      {/* Main Header / Navigation */}
      <header
        className={`sticky top-0 z-40 transition-colors duration-200 ${
          isHome
            ? "bg-slate-950/50 backdrop-blur-md border-b border-white/10 shadow-lg text-white"
            : "bg-white/90 backdrop-blur-md border-b border-slate-100/80 shadow-soft text-[#1E1B4B]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-3 shrink-0 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#FF8C68] via-[#FFA07A] to-[#4E36E2] flex items-center justify-center text-white shadow-soft-purple group-hover:scale-105 transition">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className={`font-black text-xl tracking-tight ${isHome ? "text-white" : "text-[#1E1B4B]"}`}>
                MindPluze
              </span>
              <p className={`text-[10px] font-bold tracking-wider uppercase -mt-0.5 ${isHome ? "text-slate-300" : "text-[#8E95B2]"}`}>
                NHAA 14566 Module
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className={`hidden lg:flex items-center gap-1.5 text-xs sm:text-sm font-bold p-1.5 rounded-full border ${
              isHome
                ? "bg-white/10 backdrop-blur-sm border-white/20 text-white/90"
                : "bg-[#F4F6FB] border-slate-200/60 text-[#8E95B2]"
            }`}
          >
            <Link
              to="/home"
              className={`px-4 py-2 rounded-full transition-all ${
                pathname === "/home" || pathname === "/"
                  ? "bg-white text-[#4E36E2] shadow-sm font-black"
                  : isHome
                  ? "hover:text-white"
                  : "hover:text-[#1E1B4B]"
              }`}
            >
              Home
            </Link>

            <button
              onClick={() => handleNavClick("/#features")}
              className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
                isHome ? "hover:text-white" : "hover:text-[#1E1B4B]"
              }`}
            >
              Features
            </button>

            <Link
              to="/assessment"
              className={`px-4 py-2 rounded-full transition-all ${
                pathname === "/assessment"
                  ? "bg-white text-[#4E36E2] shadow-sm font-black"
                  : isHome
                  ? "hover:text-white"
                  : "hover:text-[#1E1B4B]"
              }`}
            >
              Assessment
            </Link>

            <button
              onClick={openChatbot}
              className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
                isHome ? "hover:text-white" : "hover:text-[#1E1B4B]"
              }`}
            >
              AI Chatbot
            </button>

            <button
              onClick={() => handleNavClick("/#how-it-works")}
              className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
                isHome ? "hover:text-white" : "hover:text-[#1E1B4B]"
              }`}
            >
              How It Works
            </button>

            <Link
              to="/breathe"
              className={`px-4 py-2 rounded-full transition-all ${
                pathname === "/breathe"
                  ? "bg-white text-[#4E36E2] shadow-sm font-black"
                  : isHome
                  ? "hover:text-white"
                  : "hover:text-[#1E1B4B]"
              }`}
            >
              🫁 Breathe
            </Link>

            <Link
              to="/dashboard"
              className={`px-4 py-2 rounded-full transition-all ${
                pathname === "/dashboard"
                  ? "bg-[#4E36E2] text-white shadow-soft-purple font-black"
                  : isHome
                  ? "hover:text-white"
                  : "hover:text-[#1E1B4B]"
              }`}
            >
              📈 Admin
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full border shadow-xs ${
                    isHome
                      ? "bg-black/30 backdrop-blur border-white/20 text-white"
                      : "bg-[#F4F6FB] border-slate-200/80 text-[#1E1B4B]"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <User className={`w-3.5 h-3.5 ${isHome ? "text-[#FFA07A]" : "text-[#4E36E2]"}`} />
                  <span>{user?.name || user?.email || "Citizen"}</span>
                  <span
                    className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full ${
                      user?.role === "admin"
                        ? "bg-[#1E1B4B] text-white"
                        : isHome
                        ? "bg-[#4E36E2] text-white"
                        : "bg-[#4E36E2] text-white"
                    }`}
                  >
                    {user?.role === "admin" ? "Officer" : "Citizen"}
                  </span>
                </span>
                <button
                  onClick={() => logout("/")}
                  className={`inline-flex items-center gap-1 text-xs font-bold px-3.5 py-2 rounded-full transition cursor-pointer ${
                    isHome
                      ? "text-red-200 bg-red-950/40 hover:bg-red-900/60 border border-red-500/30"
                      : "text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100"
                  }`}
                  title="Log out"
                >
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-[#4E36E2] hover:bg-[#3C28B6] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-full shadow-soft-purple transition hover:scale-105"
              >
                Login / Portals
              </Link>
            )}

            <Link
              to="/dashboard"
              className="text-xs sm:text-sm font-bold flex items-center gap-1.5 px-4 py-2 rounded-full border transition bg-white text-[#1E1B4B] border-slate-200 hover:border-[#4E36E2] shadow-sm hover:scale-105"
            >
              <TrendingUp className="w-4 h-4 text-[#FF8C68]" /> My Dashboard
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden items-center gap-2">
            {isAuthenticated ? (
              <button
                onClick={() => logout("/")}
                className="text-rose-600 bg-rose-50 text-xs font-bold px-3.5 py-1.5 rounded-full"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-[#4E36E2] text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm"
              >
                Login
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-100 bg-white px-5 py-5 space-y-2 shadow-soft-lg rounded-b-3xl">
            <Link
              to="/home"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-[#1E1B4B] font-bold text-sm"
            >
              • Home
            </Link>
            <button
              onClick={() => handleNavClick("/#features")}
              className="block w-full text-left py-2.5 text-slate-700 font-bold text-sm"
            >
              • Features
            </button>
            <Link
              to="/assessment"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-slate-700 font-bold text-sm"
            >
              • Assessment
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openChatbot();
              }}
              className="block w-full text-left py-2.5 text-slate-700 font-bold text-sm"
            >
              • AI Chatbot
            </button>
            <button
              onClick={() => handleNavClick("/#how-it-works")}
              className="block w-full text-left py-2.5 text-slate-700 font-bold text-sm"
            >
              • How It Works
            </button>
            <Link
              to="/breathe"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left py-2.5 text-[#4E36E2] font-bold text-sm"
            >
              • 🫁 Breathe
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-[#4E36E2] font-black text-sm"
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