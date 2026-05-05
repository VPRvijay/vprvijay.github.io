import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, Loader2 } from "lucide-react";

const API_URL = "https://web-production-c6436.up.railway.app/chat";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  isError?: boolean;
}

const GLASS: React.CSSProperties = {
  background: "hsl(var(--background) / 0.92)",
  backdropFilter: "blur(24px) saturate(1.6)",
  WebkitBackdropFilter: "blur(24px) saturate(1.6)",
  border: "1px solid hsl(var(--primary) / 0.2)",
  boxShadow: "0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const idRef = useRef(0);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: ++idRef.current,
        text: "Hi! I'm Vijay's AI assistant. Ask me about his skills, projects, experience, or anything else! 👋",
        isUser: false,
      }]);
    }
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = { id: ++idRef.current, text, isUser: true };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      setMessages(prev => [...prev, { id: ++idRef.current, text: data.reply, isUser: false }]);
    } catch {
      setMessages(prev => [...prev, {
        id: ++idRef.current,
        text: "Sorry, couldn't reach the server. Please try again!",
        isUser: false,
        isError: true,
      }]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            style={GLASS}
            className="w-[340px] sm:w-[380px] h-[500px] rounded-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{ borderColor: "hsl(var(--primary) / 0.15)" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "hsl(var(--primary) / 0.15)" }}>
                  <Bot size={15} className="text-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground leading-none">Vijay's AI</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Ask me anything</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-white/5"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 scrollbar-thin">
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[82%] px-3 py-2 rounded-xl text-sm leading-relaxed"
                    style={
                      msg.isUser
                        ? {
                            background: "hsl(var(--primary) / 0.18)",
                            border: "1px solid hsl(var(--primary) / 0.3)",
                            color: "hsl(var(--foreground))",
                            borderBottomRightRadius: "4px",
                          }
                        : msg.isError
                        ? {
                            background: "rgba(239,68,68,0.08)",
                            border: "1px solid rgba(239,68,68,0.25)",
                            color: "#f87171",
                            borderBottomLeftRadius: "4px",
                          }
                        : {
                            background: "hsl(var(--primary) / 0.06)",
                            border: "1px solid hsl(var(--primary) / 0.12)",
                            color: "hsl(var(--muted-foreground))",
                            borderBottomLeftRadius: "4px",
                          }
                    }
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div
                    className="px-4 py-2.5 rounded-xl flex gap-1.5 items-center"
                    style={{
                      background: "hsl(var(--primary) / 0.06)",
                      border: "1px solid hsl(var(--primary) / 0.12)",
                      borderBottomLeftRadius: "4px",
                    }}
                  >
                    {[0, 0.2, 0.4].map((delay, i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-muted-foreground block"
                        animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              className="p-3 border-t flex gap-2 items-end"
              style={{ borderColor: "hsl(var(--primary) / 0.15)" }}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => {
                  setInput(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = Math.min(e.target.scrollHeight, 80) + "px";
                }}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Vijay..."
                rows={1}
                disabled={isLoading}
                className="flex-1 resize-none text-sm bg-transparent text-foreground placeholder:text-muted-foreground/50 outline-none leading-relaxed py-2 px-3 rounded-lg border transition-colors"
                style={{
                  borderColor: "hsl(var(--primary) / 0.2)",
                  background: "hsl(var(--primary) / 0.04)",
                  maxHeight: "80px",
                }}
              />
              <motion.button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-lg flex-shrink-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: "hsl(var(--primary) / 0.15)",
                  border: "1px solid hsl(var(--primary) / 0.3)",
                }}
              >
                {isLoading ? (
                  <Loader2 size={15} className="text-foreground animate-spin" />
                ) : (
                  <Send size={15} className="text-foreground" />
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen(prev => !prev)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-13 h-13 rounded-full flex items-center justify-center relative"
        style={{
          width: "52px",
          height: "52px",
          background: "hsl(var(--foreground) / 0.06)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid hsl(var(--primary) / 0.25)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
        aria-label="Toggle AI chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <X size={20} className="text-foreground" />
            </motion.span>
          ) : (
            <motion.span key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <Bot size={20} className="text-foreground" />
            </motion.span>
          )}
        </AnimatePresence>
        {/* pulse ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{ background: "hsl(var(--foreground))" }} />
        )}
      </motion.button>
    </div>
  );
}
