import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, ArrowRight } from 'lucide-react';

export function ServiceModal({ service, isOpen, onClose, onBook }: { service: any, isOpen: boolean, onClose: () => void, onBook: () => void }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-[101] w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[var(--saas-card-bg)] border border-[var(--saas-border)] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] p-6 sm:p-10 custom-scrollbar"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-[var(--saas-muted)] hover:text-[var(--saas-text)] transition-colors p-2 hover:bg-black/5 rounded-full">
              <X size={24} />
            </button>

            <div className="flex flex-col gap-6 sm:gap-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <div className="w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center bg-[rgba(43,110,163,0.1)] border border-[rgba(43,110,163,0.2)] rounded-2xl text-[var(--saas-lime)]">
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h2 className="font-syne text-2xl sm:text-4xl font-extrabold text-[var(--saas-text)] leading-tight">
                    {service.title}
                  </h2>
                </div>
              </div>

              <div className="space-y-5 sm:space-y-6">
                <div>
                  <h3 className="text-[10px] sm:text-xs uppercase tracking-widest text-[var(--saas-lime)] font-bold mb-2 sm:mb-3">Overview</h3>
                  <p className="text-base sm:text-xl text-[var(--saas-muted)] leading-relaxed font-medium">
                    {service.overview}
                  </p>
                </div>

                {service.highlight && (
                  <div className="bg-[var(--saas-inner-bg)] border border-[var(--saas-border)] rounded-xl px-5 py-4">
                    <h3 className="text-[10px] sm:text-xs uppercase tracking-widest text-[var(--saas-lime)] font-bold mb-2">Performance</h3>
                    <p className="text-sm sm:text-base text-[var(--saas-text)] font-mono">{service.highlight}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-2 sm:pt-4">
                  <div>
                    <h3 className="text-[10px] sm:text-xs uppercase tracking-widest text-[var(--saas-lime)] font-bold mb-3 sm:mb-4">What we deliver</h3>
                    <div className="space-y-2.5 sm:space-y-3">
                      {service.deliverables.map((feature: string, i: number) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.05 }}
                          className="flex items-start gap-3 text-[var(--saas-text)]"
                        >
                          <div className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 shrink-0 rounded-full bg-[rgba(43,110,163,0.1)] flex items-center justify-center text-[var(--saas-lime)]">
                            <Plus size={10} />
                          </div>
                          <span className="text-sm sm:text-base font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <div>
                      <h3 className="text-[10px] sm:text-xs uppercase tracking-widest text-[var(--saas-lime)] font-bold mb-3 sm:mb-4">Stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {service.fullStack.map((tech: string) => (
                          <span key={tech} className="px-3 py-1.5 rounded-full border border-[var(--saas-lime)]/30 text-[var(--saas-text)] text-xs sm:text-sm font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[var(--saas-inner-bg)] p-5 sm:p-6 rounded-2xl border border-[var(--saas-border)] mt-auto">
                      <h3 className="font-syne text-lg sm:text-xl font-bold text-[var(--saas-text)] mb-2 sm:mb-3">Scoping this?</h3>
                      <p className="text-[var(--saas-muted)] mb-5 text-xs sm:text-sm leading-relaxed">
                        Bring your constraints and success metrics. You'll leave the call with a rough architecture and a fixed-scope proposal.
                      </p>
                      <button
                        onClick={onBook}
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-[var(--saas-lime)] text-[var(--saas-on-accent)] rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-[var(--saas-lime)]/10 flex items-center justify-center gap-2 text-sm sm:text-base">
                        Book a technical call
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
