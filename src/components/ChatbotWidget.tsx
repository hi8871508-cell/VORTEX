// src/components/ChatbotWidget.tsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare,
  X,
  Send,
  Wrench,
  Bot,
  Sparkles,
  Copy,
  Check,
  Minimize2,
  RefreshCw,
} from "lucide-react";
import { ChatMessage } from "../types";

const INITIAL_GREETING: ChatMessage = {
  id: "msg-init",
  sender: "assistant",
  text: "Hey! I'm Huddy, your Plumbing AI assistant. How can I help you today?",
  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
};

const SUGGESTIONS = [
  "Серверт яаж холбогдох вэ?",
  "VIP эрх ямар үнэтэй вэ?",
  "Пинг хэр бага вэ?",
  "Why plumbing assistant?",
];

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || loading) return;

    const userMsg: ChatMessage = {
      id: "msg-u-" + Date.now(),
      sender: "user",
      text: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageContent,
          history: messages.slice(-5),
        }),
      });

      const data = await response.json();
      const botReply =
        data.reply ||
        "I'm keeping the VORTEX lines clean! If you have trouble connecting, run `connect 103.165.46.162:27040` in your CS2 console.";

      const botMsg: ChatMessage = {
        id: "msg-b-" + Date.now(),
        sender: "assistant",
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      const errorMsg: ChatMessage = {
        id: "msg-err-" + Date.now(),
        sender: "assistant",
        text: "Uh oh, line pressure dropped! Server connection: `connect 103.165.46.162:27040`. Feel free to ask another question!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([INITIAL_GREETING]);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="w-[92vw] sm:w-[380px] h-[520px] max-h-[80vh] bg-[#120d26]/95 border border-pink-500/40 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden mb-3"
          >
            {/* Header */}
            <div className="p-3.5 bg-gradient-to-r from-[#1c123b] via-[#241347] to-[#1a0f33] border-b border-purple-900/40 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-600 to-purple-600 flex items-center justify-center text-white shadow-md">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#120d26]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white font-['Chakra_Petch',sans-serif]">
                      Huddy AI
                    </h3>
                    <span className="text-[10px] bg-pink-950/80 text-pink-300 border border-pink-500/30 px-1.5 py-0.2 rounded font-semibold">
                      Plumbing & CS2
                    </span>
                  </div>
                  <p className="text-[11px] text-purple-300/70">Powered by Gemini 3.8 Flash</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Дахин эхлүүлэх"
                  className="p-1.5 text-purple-400 hover:text-white rounded-lg hover:bg-purple-900/40 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-purple-400 hover:text-white rounded-lg hover:bg-purple-900/40 transition-colors cursor-pointer"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs">
              {messages.map((msg) => {
                const isUser = msg.sender === "user";
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                        isUser
                          ? "bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-br-none shadow-md shadow-pink-600/10"
                          : "bg-[#1d163a] border border-purple-800/40 text-purple-100 rounded-bl-none shadow-md"
                      }`}
                    >
                      {msg.text}

                      {/* If response contains connect command, offer quick copy */}
                      {!isUser && msg.text.includes("connect 103.165.46.162") && (
                        <div className="mt-2 pt-2 border-t border-purple-700/40 flex items-center justify-between">
                          <code className="text-[10px] text-pink-300 font-mono">
                            connect 103.165.46.162:27040
                          </code>
                          <button
                            onClick={() =>
                              handleCopyText("connect 103.165.46.162:27040", msg.id)
                            }
                            className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-purple-900/60 hover:bg-pink-600 text-white transition-colors cursor-pointer"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span>Хууллаа</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Хуулах</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-purple-400/50 mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                );
              })}

              {loading && (
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#1d163a] border border-purple-800/40 w-24 text-purple-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce" />
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce"
                    style={{ animationDelay: "0.15s" }}
                  />
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce"
                    style={{ animationDelay: "0.3s" }}
                  />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions Chips */}
            <div className="px-3 py-1.5 flex gap-1.5 overflow-x-auto no-scrollbar border-t border-purple-900/30 bg-[#0e0921]/60">
              {SUGGESTIONS.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(sug)}
                  className="shrink-0 text-[10px] px-2.5 py-1 rounded-full bg-purple-950/80 hover:bg-pink-950/60 border border-purple-800/40 hover:border-pink-500/50 text-purple-300 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                >
                  {sug}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-2.5 bg-[#0f0a22] border-t border-purple-900/40 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Huddy-аас асуух..."
                className="flex-1 px-3 py-2 rounded-xl bg-[#1c1438] border border-purple-800/40 text-white placeholder-purple-400/40 text-xs outline-none focus:border-pink-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-xl bg-[#f43f5e] hover:bg-[#e11d48] disabled:opacity-40 text-white flex items-center justify-center transition-all shadow-md shadow-pink-600/20 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 text-white shadow-xl shadow-pink-600/30 flex items-center justify-center border-2 border-pink-400/50 cursor-pointer relative group"
        aria-label="Huddy AI чатбот нээх"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <Bot className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-pink-500 border border-white text-[9px] font-bold items-center justify-center">
                1
              </span>
            </span>
          </>
        )}
      </motion.button>
    </div>
  );
};
