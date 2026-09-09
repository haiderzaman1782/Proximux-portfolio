import { motion } from 'motion/react';
import { ArrowRight, Mail } from 'lucide-react';
import { useUI } from '../ui-context';

export function CtaBand({
  eyebrow = "Start here",
  title,
  subtitle = "30 minutes with an engineer. We'll tell you if we're the right team for the build - and if we're not, who is."
}: { eyebrow?: string, title?: React.ReactNode, subtitle?: string }) {
  const { openBooking, openContact } = useUI();

  return (
    <section className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[26px] px-6 py-16 sm:px-12 sm:py-20 lg:py-24 text-center"
          style={{ backgroundColor: 'var(--cta-bg)', border: '1px solid var(--cta-border)' }}
        >
          {/* accent glow */}
          <div
            className="pointer-events-none absolute -right-24 -top-24 w-[420px] h-[420px] rounded-full"
            style={{ background: 'radial-gradient(circle, var(--cta-glow), transparent 65%)' }}
          />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div
              className="inline-block mb-6 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-medium uppercase tracking-[0.14em] font-mono"
              style={{ backgroundColor: 'var(--cta-accent)', color: 'var(--cta-on-accent)' }}
            >
              {eyebrow}
            </div>
            <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-6 leading-[1.08]" style={{ color: 'var(--cta-text)' }}>
              {title ?? (
                <>Book a technical <span className="font-serif italic font-normal" style={{ color: 'var(--cta-accent)' }}>discovery call.</span></>
              )}
            </h2>
            <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: 'var(--cta-muted)' }}>
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
              <motion.button
                onClick={openBooking}
                initial="rest" whileHover="hover" whileTap="tap"
                variants={{ rest: { y: 0 }, hover: { y: -2 }, tap: { y: 0, scale: 0.98 } }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="group w-full sm:w-auto px-9 py-4 rounded-full font-semibold text-sm sm:text-base flex items-center justify-center gap-2 min-h-[44px] touch-manipulation shadow-tint-lg"
                style={{ backgroundColor: 'var(--cta-accent)', color: 'var(--cta-on-accent)' }}
              >
                Book a Technical Discovery Call
                <motion.span variants={{ rest: { x: 0 }, hover: { x: 3 } }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                  <ArrowRight size={18} />
                </motion.span>
              </motion.button>
              <a
                href="mailto:hello@proximux.online"
                className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-sm sm:text-base transition-colors min-h-[44px] touch-manipulation flex items-center justify-center gap-2"
                style={{ border: '1px solid var(--cta-border)', color: 'var(--cta-text)' }}
              >
                <Mail size={16} />
                hello@proximux.online
              </a>
            </div>
            <p className="mt-6 text-sm" style={{ color: 'var(--cta-muted)' }}>
              Prefer email? <button onClick={openContact} className="font-medium hover:underline" style={{ color: 'var(--cta-accent)' }}>Send a brief instead</button>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
