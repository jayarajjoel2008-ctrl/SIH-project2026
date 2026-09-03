import React, { useState, useEffect } from "react";
import { X, Wind, Play, Pause, RotateCcw, Heart } from "lucide-react";

export default function BreatheModal({ isOpen, onClose }) {
  const [phase, setPhase] = useState("Inhale"); // Inhale (4s), Hold (7s), Exhale (8s)
  const [timer, setTimer] = useState(4);
  const [isActive, setIsActive] = useState(true);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    if (!isOpen || !isActive) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev > 1) return prev - 1;

        if (phase === "Inhale") {
          setPhase("Hold");
          return 7;
        } else if (phase === "Hold") {
          setPhase("Exhale");
          return 8;
        } else {
          setPhase("Inhale");
          setCycleCount((c) => c + 1);
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, isActive, phase]);

  if (!isOpen) return null;

  const phaseInstruction = {
    Inhale: "Breathe in deeply through your nose...",
    Hold: "Hold your breath gently. Relax your shoulders.",
    Exhale: "Exhale slowly through your mouth..."
  };

  const scaleClass =
    phase === "Inhale"
      ? "scale-125 bg-purple-50 text-[#4E36E2] border-2 border-[#4E36E2]"
      : phase === "Hold"
      ? "scale-125 bg-orange-50 text-[#EA580C] border-2 border-[#FFA07A]"
      : "scale-90 bg-[#F4F6FB] text-[#1E1B4B] border-2 border-[#1E1B4B]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-purple-50 text-[#4E36E2] mb-3">
          <Wind className="w-6 h-6" />
        </div>

        <h3 className="text-2xl font-bold text-[#1E1B4B]">4-7-8 Calm Breathing</h3>
        <p className="text-sm text-slate-500 mt-1">
          Ground yourself to reduce immediate stress and regulate heart rate.
        </p>

        {/* Visual Breathing Circle */}
        <div className="my-8 flex items-center justify-center">
          <div
            className={`w-44 h-44 rounded-full flex flex-col items-center justify-center transition-all duration-1000 ease-in-out shadow-inner ${scaleClass}`}
          >
            <span className="text-2xl font-bold uppercase tracking-wider">{phase}</span>
            <span className="text-4xl font-extrabold mt-1">{timer}s</span>
          </div>
        </div>

        <p className="text-sm font-medium text-slate-700 min-h-[40px] px-4">
          {phaseInstruction[phase]}
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => setIsActive(!isActive)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4E36E2] hover:bg-[#3C28B6] text-white font-medium text-sm transition shadow"
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isActive ? "Pause" : "Resume"}
          </button>
          <button
            onClick={() => {
              setPhase("Inhale");
              setTimer(4);
              setIsActive(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm transition"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400 flex items-center justify-center gap-1">
          <Heart className="w-3.5 h-3.5 text-rose-500" /> Completed Cycles: {cycleCount}
        </div>
      </div>
    </div>
  );
}
