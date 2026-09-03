import React, { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello, I'm here to support you. You are not alone. How are you feeling today?" },
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

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
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
      setMessages((m) => [...m, { role: "assistant", content: "I'm having trouble responding right now. Please call 14566 for support." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#081C35] text-[#0E9F9A] shadow-xl shadow-slate-900/30 flex items-center justify-center hover:scale-105 transition cursor-pointer border border-[#0E9F9A]/30"
        aria-label="AI Support Chatbot"
      >
        {open ? <X className="w-6 h-6 text-white" /> : <Bot className="w-6 h-6 text-[#0E9F9A]" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-2.5rem)] sm:w-96 h-[28rem] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-2">
          <div className="px-4 py-3.5 bg-[#081C35] text-white flex items-center justify-between border-b border-[#0E9F9A]/30">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-[#0E9F9A]" />
              <div>
                <p className="font-semibold text-sm leading-tight text-white">MindPluze AI Assistant</p>
                <p className="text-[11px] opacity-90 flex items-center gap-1 text-[#D9F6EF]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0E9F9A]" /> Online · 24/7 Support
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                  m.role === "user" ? "bg-[#0E9F9A] text-white rounded-br-sm" : "bg-white border border-slate-200 text-slate-700 rounded-bl-sm"
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 px-3 py-2 rounded-2xl rounded-bl-sm flex items-center gap-1.5 text-slate-400">
                  <Loader2 className="w-4 h-4 animate-spin" /> typing...
                </div>
              </div>
            )}
          </div>
          <div className="p-3 border-t border-slate-200 bg-white flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type how you feel..."
              className="flex-1 text-sm px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0E9F9A]/30"
            />
            <button onClick={send} disabled={loading} className="w-10 h-10 rounded-lg bg-[#0E9F9A] text-white flex items-center justify-center disabled:opacity-50 hover:bg-[#081C35] transition">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}