import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Heart, Zap, Activity } from "lucide-react";

export default function BreatheSection() {
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState("idle"); // 'idle' | 'inhale' | 'hold' | 'exhale'
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [completedCycles, setCompletedCycles] = useState(0);

  const INHALE_TIME = 4;
  const HOLD_TIME = 4;
  const EXHALE_TIME = 6;

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev > 1) {
            return prev - 1;
          }

          if (phase === "inhale") {
            setPhase("hold");
            return HOLD_TIME;
          } else if (phase === "hold") {
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
        subtitle: "Click to start 4-7-8 reset",
        scaleClass: "scale-100",
        ring1Scale: "scale-100 opacity-60",
        ring2Scale: "scale-100 opacity-30"
      };
    }

    if (phase === "inhale") {
      return {
        title: "Inhale",
        subtitle: `${secondsLeft}s · breathe in`,
        scaleClass: "scale-125 transition-transform duration-4000 ease-out",
        ring1Scale: "scale-135 opacity-80 transition-all duration-4000",
        ring2Scale: "scale-150 opacity-50 transition-all duration-4000"
      };
    }

    if (phase === "hold") {
      return {
        title: "Hold",
        subtitle: `${secondsLeft}s · sustain breath`,
        scaleClass: "scale-125 transition-transform duration-1000",
        ring1Scale: "scale-135 opacity-70",
        ring2Scale: "scale-150 opacity-40"
      };
    }

    return {
      title: "Exhale",
      subtitle: `${secondsLeft}s · release tension`,
      scaleClass: "scale-90 transition-transform duration-6000 ease-in",
      ring1Scale: "scale-105 opacity-40 transition-all duration-6000",
      ring2Scale: "scale-115 opacity-20 transition-all duration-6000"
    };
  };

  const orb = getOrbState();

  return (
    <section id="breathe" className="w-full bg-gradient-to-b from-[#0A1118] via-[#0B131E] to-[#0D1826] text-white py-16 sm:py-24 overflow-hidden relative border-y border-white/10">
      {/* Background radial glowing ambient halos */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#00A3FF]/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#FFA217]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Concentric Glowing Cyan & Molten Amber Smart Dial Breathing Sphere */}
          <div className="lg:col-span-6 flex items-center justify-center relative min-h-[380px] sm:min-h-[440px]">
            {/* Outer Ripple Ring 2 */}
            <div
              className={`absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border-2 border-[#00B4D8]/30 blur-xs pointer-events-none transition-all ${orb.ring2Scale}`}
            />

            {/* Middle Ripple Ring 1 */}
            <div
              className={`absolute w-60 h-60 sm:w-80 sm:h-80 rounded-full border-2 border-[#FFA217]/40 blur-xs pointer-events-none transition-all ${orb.ring1Scale}`}
            />

            {/* Central Smart Dial Spherical Glowing Orb */}
            <div
              className={`relative z-10 w-48 h-48 sm:w-64 sm:h-64 rounded-full shadow-2xl flex flex-col items-center justify-center text-white cursor-pointer select-none transition-transform ${orb.scaleClass}`}
              style={{
                background: "radial-gradient(circle at 50% 50%, #070D14 40%, #2A1504 75%, #FFA217 98%)",
                boxShadow: "0 0 50px rgba(0, 180, 216, 0.4), inset 0 0 35px rgba(255, 162, 23, 0.6)"
              }}
              onClick={handleStartToggle}
              title={isRunning ? "Click to pause" : "Click to start"}
            >
              <span className="text-3xl sm:text-4xl font-black tracking-tight drop-shadow-md text-white">
                {orb.title}
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#FFA217] mt-1 tracking-wide">
                {orb.subtitle}
              </span>

              <div className="flex items-center gap-3 text-slate-400 text-xs mt-2">
                <Zap className="w-3.5 h-3.5 text-[#FFA217]" />
                <Activity className="w-3.5 h-3.5 text-[#00B4D8]" />
              </div>
            </div>
          </div>

          {/* Right Column: Information & Controls */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00B4D8] uppercase bg-cyan-500/15 px-3.5 py-1 rounded-full border border-cyan-400/30">
              <span className="w-2 h-2 rounded-full bg-[#00B4D8] shrink-0 animate-pulse" />
              Two-Minute Nervous System Reset
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
              A little more room <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] via-[#38BDF8] to-[#FFA217]">
                inside the moment.
              </span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
              When trauma and panic symptoms escalate, rhythmic paced breathing activates the parasympathetic vagus nerve to lower heart rate and reduce stress hormones.
            </p>

            {/* Controls and Cycle Counter */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleStartToggle}
                className="bg-[#FFA217] hover:bg-[#FF8C00] text-slate-950 font-black px-8 py-3.5 rounded-full shadow-xl shadow-amber-500/25 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer text-sm"
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4 fill-slate-950" /> Pause Exercise
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-slate-950" /> Begin Breathing
                  </>
                )}
              </button>

              <button
                onClick={handleReset}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-slate-200 font-bold px-6 py-3.5 rounded-full flex items-center gap-2 transition-all hover:scale-105 cursor-pointer text-sm"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </button>

              <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-full flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#00B4D8]" />
                <span className="text-xs font-bold text-slate-300">
                  {completedCycles} {completedCycles === 1 ? "cycle" : "cycles"} completed
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
