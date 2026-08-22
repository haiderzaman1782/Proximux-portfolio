import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, ArrowUp, Sparkles } from 'lucide-react';

// The chat API is your Vercel function at /api/chat (same origin — no config needed).
const API_URL = (import.meta as any).env?.VITE_RAG_API_URL || '/api';

type Source = { n: number; title: string; score: number };
type Msg = {
  role: 'user' | 'assistant';
  text: string;
  sources?: Source[];
  latency?: number;
  error?: boolean;
};

const SUGGESTIONS = [
  "What's your process?",
  "How much does a RAG project cost?",
  "Who are the founders?",
  "Typical timeline for a voice agent?"
];

export function ChatWidget({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  async function send(question: string) {
    const q = question.trim();
    if (!q || loading) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', text: q }]);
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q })
      });
      if (!res.ok) {
        const detail = await res.json().catch(() => ({}));
        throw new Error(detail.detail || detail.error || `Request failed (${res.status})`);
      }
      const data = await res.json();
      setMessages((m) => [...m, { role: 'assistant', text: data.answer, sources: data.sources, latency: data.latency_ms }]);
    } catch (e: any) {
      setMessages((m) => [...m, { role: 'assistant', text: e.message || 'Something went wrong. Try again in a moment.', error: true }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Launcher */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => onOpenChange(!open)}
        className="fixed bottom-5 right-5 z-[90] w-14 h-14 rounded-full bg-[var(--saas-lime)] text-black flex items-center justify-center shadow-xl shadow-black/40 touch-manipulation"
        aria-label="Ask Proximux"
      >
        {open ? <X size={24} /> : <MessageSquare size={22} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="fixed bottom-24 right-5 z-[90] w-[calc(100vw-40px)] max-w-[390px] h-[560px] max-h-[calc(100vh-120px)] bg-[var(--saas-card-bg)] border border-[var(--saas-border)] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[var(--saas-border)] shrink-0">
              <span className="w-8 h-8 rounded-full bg-[rgba(200,241,53,0.12)] border border-[rgba(200,241,53,0.3)] flex items-center justify-center text-[var(--saas-lime)]">
                <Sparkles size={15} />
              </span>
              <div className="leading-tight">
                <div className="font-syne font-bold text-sm text-[var(--saas-text)]">Ask Proximux</div>
                <div className="text-[11px] text-[var(--saas-muted)]">RAG over our own docs — cited answers</div>
              </div>
              <button onClick={() => onOpenChange(false)} className="ml-auto text-[var(--saas-muted)] hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4 custom-scrollbar">
              {messages.length === 0 && (
                <div className="pt-2">
                  <p className="text-sm text-[var(--saas-muted)] mb-4 leading-relaxed">
                    Hi — ask me anything about Proximux. Every answer is retrieved from our real content and cited.
                  </p>
                  <div className="flex flex-col gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="text-left text-[13px] px-3 py-2 rounded-xl border border-[var(--saas-border)] hover:border-[var(--saas-lime)] hover:text-[var(--saas-lime)] text-[var(--saas-text)] transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                  <div
                    className={
                      m.role === 'user'
                        ? 'max-w-[85%] bg-[var(--saas-lime)] text-black rounded-2xl rounded-br-sm px-3.5 py-2.5 text-sm'
                        : `max-w-[90%] rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-sm leading-relaxed ${m.error ? 'bg-[rgba(212,24,61,0.1)] border border-[rgba(212,24,61,0.3)] text-[#f5a3b3]' : 'bg-[var(--saas-inner-bg)] border border-[var(--saas-border)] text-[var(--saas-text)]'}`
                    }
                  >
                    <div className="whitespace-pre-wrap">{m.text}</div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[var(--saas-inner-bg)] border border-[var(--saas-border)] rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-[var(--saas-lime)]"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="shrink-0 p-3 border-t border-[var(--saas-border)] flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Proximux…"
                className="flex-1 bg-[var(--saas-input-bg)] border border-[var(--saas-border)] rounded-full px-4 py-2.5 text-sm text-[var(--saas-text)] outline-none focus:border-[var(--saas-lime)] transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-10 h-10 rounded-full bg-[var(--saas-lime)] text-black flex items-center justify-center disabled:opacity-40 transition-opacity shrink-0"
                aria-label="Send"
              >
                <ArrowUp size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
