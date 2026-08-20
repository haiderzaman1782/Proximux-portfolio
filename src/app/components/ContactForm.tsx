import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export function ContactForm({ onSuccess }: { onSuccess?: () => void }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        setStatus('success');
        onSuccess?.();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Something went wrong. Please try again or email us directly.");
      setStatus('idle');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-12 text-center"
      >
        <div className="w-20 h-20 bg-[var(--saas-lime)]/10 text-[var(--saas-lime)] rounded-full flex items-center justify-center mx-auto mb-6">
          <Sparkles size={40} />
        </div>
        <h3 className="text-2xl font-bold mb-2 font-syne">Message sent.</h3>
        <p className="text-[var(--saas-muted)]">We'll reply from hello@proximux.online within 24 hours.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-[var(--saas-lime)] mb-2">Full Name</label>
        <input required name="name" type="text" placeholder="Jane Doe"
          className="w-full bg-[var(--saas-input-bg)] border border-[var(--saas-border)] rounded-xl px-4 py-3 text-sm focus:border-[var(--saas-lime)] outline-none transition-colors" />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-[var(--saas-lime)] mb-2">Work Email</label>
        <input required name="email" type="email" placeholder="jane@company.com"
          className="w-full bg-[var(--saas-input-bg)] border border-[var(--saas-border)] rounded-xl px-4 py-3 text-sm focus:border-[var(--saas-lime)] outline-none transition-colors" />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-[var(--saas-lime)] mb-2">What are you building?</label>
        <textarea required name="message" rows={4} placeholder="e.g. A RAG assistant over 5k internal docs, or an AI receptionist for inbound calls..."
          className="w-full bg-[var(--saas-input-bg)] border border-[var(--saas-border)] rounded-xl px-4 py-3 text-sm focus:border-[var(--saas-lime)] outline-none transition-colors resize-none" />
      </div>
      <button disabled={status === 'submitting'}
        className="w-full py-4 bg-[var(--saas-lime)] text-black rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 mt-2">
        {status === 'submitting' ? (
          <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
        ) : (
          <>Send Brief <ArrowRight size={18} /></>
        )}
      </button>
    </form>
  );
}
