import { motion } from 'motion/react';

export function ProofCard({ mediaLabel, mediaType, diagram, headline, metrics, artifacts, index, onCta }: {
  mediaLabel: string;
  mediaType: 'demo' | 'audio' | 'video';
  diagram: React.ReactNode;
  headline: string;
  metrics: string[];
  artifacts: { label: string; icon: React.ReactNode; href?: string }[];
  index: number;
  onCta: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      className="bg-[var(--saas-card-bg)] border border-[var(--saas-border)] rounded-2xl flex flex-col h-full overflow-hidden hover:border-[var(--saas-lime)]/50 transition-colors"
    >
      {/* Architecture diagram — replace with a real demo recording when available */}
      <div className="relative bg-[var(--saas-inner-bg)] border-b border-[var(--saas-border)] px-5 pt-9 pb-5 overflow-hidden">
        <span className="absolute top-3 left-4 z-10 text-[10px] uppercase tracking-widest text-[var(--saas-muted)]">{mediaLabel}</span>
        <span className="absolute top-3 right-3 z-10 text-[9px] uppercase tracking-widest text-[#6b6b60] border border-[var(--saas-border)] rounded-full px-2 py-0.5">
          {mediaType === 'audio' ? 'Audio' : mediaType === 'demo' ? 'Live' : 'Video'}
        </span>
        {/* width-driven SVG: fills the card width, height derives from the viewBox — cannot overflow */}
        <div className="w-full [&>svg]:block [&>svg]:w-full [&>svg]:h-auto">{diagram}</div>
      </div>

      <div className="p-6 sm:p-8 flex flex-col h-full">
        <h3 className="font-syne text-lg sm:text-xl font-bold text-[var(--saas-text)] mb-5 leading-snug">
          {headline}
        </h3>

        <div className="space-y-2.5 mb-6">
          {metrics.map((m) => (
            <div key={m} className="flex items-start gap-2.5 text-sm text-[var(--saas-muted)]">
              <span className="w-1.5 h-1.5 mt-1.5 shrink-0 rounded-full bg-[var(--saas-lime)]"></span>
              <span className="font-mono text-xs sm:text-sm">{m}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-auto pt-5 border-t border-[var(--saas-border)]">
          {artifacts.map((a) => {
            const cls = "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--saas-border)] hover:border-[var(--saas-lime)] hover:text-[var(--saas-lime)] text-[var(--saas-text)] text-[11px] sm:text-xs font-medium transition-colors";
            // A real link → open it (new tab for http, same tab for tel:/mailto:).
            // No link set yet → fall back to the booking form.
            if (a.href) {
              const external = /^https?:/.test(a.href);
              return (
                <a
                  key={a.label}
                  href={a.href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={cls}
                >
                  {a.icon}
                  {a.label}
                </a>
              );
            }
            return (
              <button key={a.label} onClick={onCta} className={cls}>
                {a.icon}
                {a.label}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
