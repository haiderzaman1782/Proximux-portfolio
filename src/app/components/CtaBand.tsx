import { motion } from 'motion/react';
import { ArrowRight, Mail } from 'lucide-react';
import { useUI } from '../ui-context';

export function CtaBand({
  eyebrow = "Start here",
  title = "Book a technical discovery call.",
  subtitle = "30 minutes with an engineer. We'll tell you if we're the right team for the build - and if we're not, who is."
}: { eyebrow?: string, title?: string, subtitle?: string }) {
  const { openBooking, openContact } = useUI();

  return (
    <section className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-8 overflow-hidden border-t border-[var(--saas-border)]">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[300px] h-[150px] sm:w-[600px] sm:h-[300px] lg:w-[800px] lg:h-[400px] rounded-[50%] bg-[radial-gradient(ellipse,rgba(43,110,163,0.08)_0%,transparent_70%)]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center max-w-4xl mx-auto"
      >
        <div className="inline-block mb-6 px-4 py-1.5 bg-[var(--saas-lime)] text-[var(--saas-on-accent)] rounded-[20px] text-[10px] sm:text-xs font-bold uppercase tracking-widest">
          {eyebrow}
        </div>
        <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--saas-text)] mb-8 leading-tight">
          {title}
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[var(--saas-muted)] max-w-2xl mx-auto mb-10 leading-relaxed">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openBooking}
            className="w-full sm:w-auto px-10 py-4 bg-[var(--saas-lime)] text-[var(--saas-on-accent)] rounded-[24px] font-bold text-sm sm:text-base transition-transform min-h-[44px] touch-manipulation shadow-xl shadow-[var(--saas-lime)]/10 flex items-center justify-center gap-2"
          >
            Book a Technical Discovery Call
            <ArrowRight size={18} />
          </motion.button>
          <a
            href="mailto:hello@proximux.online"
            className="w-full sm:w-auto px-8 py-4 border border-[var(--saas-border)] hover:border-[var(--saas-lime)] text-[var(--saas-text)] rounded-[24px] font-semibold text-sm sm:text-base transition-colors min-h-[44px] touch-manipulation flex items-center justify-center gap-2"
          >
            <Mail size={16} />
            hello@proximux.online
          </a>
        </div>
        <p className="mt-6 text-sm text-[var(--saas-muted)]">
          Prefer email? <button onClick={openContact} className="text-[var(--saas-lime)] font-medium hover:underline">Send a brief instead</button>
        </p>
      </motion.div>
    </section>
  );
}
