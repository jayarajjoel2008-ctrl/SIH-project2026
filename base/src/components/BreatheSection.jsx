import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, SlidersHorizontal, Sparkles } from "lucide-react";

export default function BreatheSection() {
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState("idle"); // 'idle' | 'inhale' | 'exhale'
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [completedCycles, setCompletedCycles] = useState(0);

  const INHALE_TIME = 4;
  const EXHALE_TIME = 6;

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev > 1) {
            return prev - 1;
          }

          // Switch phases
          if (phase === "inhale") {
            setPhase("exhale");
            return EXHALE_TIME;
          } else {
            setPhase("inhale");
            setCompletedCycles((c) => c + 1);
            return INHALE_TIME;
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, phase]);

  const handleStartToggle = () => {
    if (!isRunning) {
      setIsRunning(true);
      if (phase === "idle") {
        setPhase("inhale");
        setSecondsLeft(INHALE_TIME);
      }
    } else {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhase("idle");
    setSecondsLeft(INHALE_TIME);
    setCompletedCycles(0);
  };

  // Determine circle animation and text
  const getOrbState = () => {
    if (!isRunning && phase === "idle") {
      return {
        title: "Ready",
        subtitle: "when you are",
        scaleClass: "scale-100",
        ring1Scale: "scale-100 opacity-60",
        ring2Scale: "scale-100 opacity-40"
      };
    }

    if (phase === "inhale") {
      return {
        title: "Inhale",
        subtitle: `${secondsLeft}s · breathe in`,
        scaleClass: "scale-125 transition-transform duration-[4000ms] ease-out",
        ring1Scale: "scale-130 opacity-80 transition-all duration-[4000ms]",
        ring2Scale: "scale-145 opacity-60 transition-all duration-[4000ms]"
      };
    }

    return {
      title: "Exhale",
      subtitle: `${secondsLeft}s · release`,
      scaleClass: "scale-90 transition-transform duration-[6000ms] ease-in",
      ring1Scale: "scale-105 opacity-40 transition-all duration-[6000ms]",
      ring2Scale: "scale-115 opacity-20 transition-all duration-[6000ms]"
    };
  };

  const orb = getOrbState();

  return (
    <section id="breathe" className="w-full bg-[#E8F3FC] py-16 sm:py-24 border-y border-slate-200/60 scroll-mt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Visual Calming Interactive Orb & Ripple Rings */}
          <div className="lg:col-span-6 flex items-center justify-center relative min-h-[380px] sm:min-h-[440px]">
            {/* Outer Ripple Ring 2 */}
            <div
              className={`absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#D9F6EF]/60 blur-sm pointer-events-none transition-all ${orb.ring2Scale}`}
            />

            {/* Middle Ripple Ring 1 */}
            <div
              className={`absolute w-60 h-60 sm:w-80 sm:h-80 rounded-full bg-[#D9F6EF] blur-xs pointer-events-none transition-all ${orb.ring1Scale}`}
            />

            {/* Additional soft ambient glow */}
            <div className="absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full bg-[#0E9F9A]/15 blur-xl pointer-events-none" />

            {/* Central Spherical Glowing Orb */}
            <div
              className={`relative z-10 w-48 h-48 sm:w-60 sm:h-60 rounded-full shadow-2xl flex flex-col items-center justify-center text-white cursor-pointer select-none transition-transform ${orb.scaleClass}`}
              style={{
                background: "radial-gradient(circle at 35% 30%, #D9F6EF 0%, #0E9F9A 55%, #081C35 100%)",
                boxShadow: "0 20px 50px rgba(14, 159, 154, 0.35), inset 0 2px 6px rgba(255, 255, 255, 0.5)"
              }}
              onClick={handleStartToggle}
              title={isRunning ? "Click to pause" : "Click to start"}
            >
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight drop-shadow-sm text-white">
                {orb.title}
              </span>
              <span className="text-xs sm:text-sm font-medium opacity-95 mt-1 tracking-wide text-[#D9F6EF]">
                {orb.subtitle}
              </span>
            </div>
          </div>

          {/* Right Column: Typography & Controls */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Mint badge: • TWO-MINUTE RESET */}
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#0E9F9A] uppercase bg-[#D9F6EF] px-3 py-1 rounded-full border border-[#0E9F9A]/20">
              <span className="w-2 h-2 rounded-full bg-[#0E9F9A] shrink-0 animate-pulse" />
              TWO-MINUTE RESET
            </div>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#081C35] tracking-tight leading-[1.12]">
              A little more room
              <span className="block font-serif italic font-normal text-[#0E9F9A] mt-1">
                inside the moment.
              </span>
            </h2>

            {/* Subtitle / explanation text */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
              When everything feels loud, try a paced breath. This exercise is optional and does not replace emergency or clinical support.
            </p>

            {/* Pacing Info & Cycle Stats */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-600 font-medium pt-1">
              <span className="inline-flex items-center gap-1.5 text-slate-800">
                <SlidersHorizontal className="w-4 h-4 text-[#0E9F9A]" />
                4 seconds in · 6 seconds out
              </span>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1.5 text-slate-800">
                <Sparkles className="w-4 h-4 text-[#D9A600]" />
                <strong className="text-[#081C35]">{completedCycles}</strong> cycles completed
              </span>
            </div>

            {/* Buttons Row: Start breathing + Reset */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleStartToggle}
                className="inline-flex items-center gap-2.5 bg-[#0E9F9A] hover:bg-[#0C8783] text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-teal-900/20 text-base transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                {isRunning ? (
                  <>
                    <Pause className="w-5 h-5 fill-white" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-white" /> Start breathing
                  </>
                )}
              </button>

              <button
                onClick={handleReset}
                className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 flex items-center justify-center transition shadow-sm cursor-pointer"
                aria-label="Reset breathing timer"
                title="Reset"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
