import React, { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello, I am your MindPluze AI Companion. You are in a safe, confidential space. How can I assist you today?"
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener("open-chatbot", handleOpen);
    return () => window.removeEventListener("open-chatbot", handleOpen);
  }, []);

  const send = async (customText = null) => {
    const textToSend = customText || input.trim();
    if (!textToSend || loading) return;
    const userMsg = { role: "user", content: textToSend };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await base44.functions.invoke("supportChat", {
        message: userMsg.content,
        history: messages.map((m) => ({ role: m.role, content: m.content })),
      });
      setMessages((m) => [...m, { role: "assistant", content: res.data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "I am having temporary difficulty connecting. For emergency support, please dial toll-free National Helpline 14566."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-[#FFA217] via-[#FF8C00] to-[#E67E00] text-slate-950 shadow-xl shadow-amber-500/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer border border-amber-300/40 group"
        aria-label="AI Support Chatbot"
      >
        {open ? <X className="w-6 h-6 text-slate-950" /> : <Bot className="w-7 h-7 text-slate-950 group-hover:rotate-12 transition-transform" />}
      </button>

      {/* Floating Chat Modal */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-2.5rem)] sm:w-[26rem] h-[32rem] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-3 duration-200">
          
          {/* Header */}
          <div className="px-5 py-4 bg-[#0A1118] text-white flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FFA217] text-slate-950 flex items-center justify-center shadow-md font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <p className="font-black text-sm leading-tight text-white flex items-center gap-1.5">
                  MindPluze AI Companion
                </p>
                <p className="text-[10px] text-[#00B4D8] flex items-center gap-1 font-semibold mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online · 24/7 Crisis Triage
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Starter Chips */}
          <div className="bg-slate-100/80 px-4 py-2 flex items-center gap-1.5 overflow-x-auto border-b border-slate-200/60 text-[11px] font-bold">
            <button
              onClick={() => send("I am feeling anxious and overwhelmed.")}
              className="bg-white hover:bg-[#FFA217] hover:text-slate-950 text-slate-700 px-3 py-1 rounded-full border border-slate-200 transition shrink-0 cursor-pointer"
            >
              Calm panic
            </button>
            <button
              onClick={() => send("How do I contact Helpline 14566?")}
              className="bg-white hover:bg-[#FFA217] hover:text-slate-950 text-slate-700 px-3 py-1 rounded-full border border-slate-200 transition shrink-0 cursor-pointer"
            >
              Helpline 14566
            </button>
            <button
              onClick={() => send("Tell me about SC/ST legal rights.")}
              className="bg-white hover:bg-[#FFA217] hover:text-slate-950 text-slate-700 px-3 py-1 rounded-full border border-slate-200 transition shrink-0 cursor-pointer"
            >
              Legal Aid
            </button>
          </div>

          {/* Message List */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/80">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed font-medium ${
                    m.role === "user"
                      ? "bg-[#00B4D8] text-white rounded-br-none shadow-md shadow-cyan-500/20"
                      : "bg-white border border-slate-200/80 text-slate-800 rounded-bl-none shadow-xs"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200/80 px-4 py-2.5 rounded-2xl rounded-bl-none flex items-center gap-2 text-xs text-slate-400 font-medium">
                  <Loader2 className="w-3.5 h-3.5 text-[#00B4D8] animate-spin" />
                  AI is typing...
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-slate-100 bg-white flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type your message or concern..."
              className="flex-1 text-xs px-3.5 py-2.5 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]/30 font-medium text-slate-800"
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              className="w-10 h-10 rounded-full bg-[#FFA217] hover:bg-[#FF8C00] text-slate-950 flex items-center justify-center disabled:opacity-40 transition shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}