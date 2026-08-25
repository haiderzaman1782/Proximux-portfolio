import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CalendarDays } from 'lucide-react';
import Cal, { getCalApi } from '@calcom/embed-react';

// Proximux discovery-call scheduler. To change it, update both the namespace
// and calLink below to your Cal.com "<user>/<event>" slug.
const CAL_NAMESPACE = '30min';
const CAL_LINK = 'haider-zaman-exnwci/30min';

export function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Configure the Cal embed once (dark theme + lime brand colour).
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal('ui', {
        theme: 'light',
        hideEventTypeDetails: false,
        layout: 'month_view',
        cssVarsPerTheme: { light: { 'cal-brand': '#4f7256' } }
      });
    })();
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            className="relative z-[121] w-full max-w-3xl h-[85vh] bg-[var(--saas-card-bg)] border border-[var(--saas-border)] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--saas-border)] shrink-0">
              <div className="flex items-center gap-2 font-syne font-bold text-[var(--saas-text)]">
                <CalendarDays size={18} className="text-[var(--saas-lime)]" />
                Book a discovery call
              </div>
              <button onClick={onClose} className="text-[var(--saas-muted)] hover:text-[var(--saas-text)] transition-colors">
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-auto bg-[var(--saas-dark-bg)]">
              <Cal
                namespace={CAL_NAMESPACE}
                calLink={CAL_LINK}
                style={{ width: '100%', height: '100%', overflow: 'scroll' }}
                config={{ layout: 'month_view', theme: 'light' }}
              />
            </div>

            <div className="shrink-0 px-6 py-3 border-t border-[var(--saas-border)] text-center">
              <span className="text-xs text-[var(--saas-muted)]">
                Trouble loading? Email{' '}
                <a href="mailto:hello@proximux.online" className="text-[var(--saas-lime)] hover:underline">hello@proximux.online</a>
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
