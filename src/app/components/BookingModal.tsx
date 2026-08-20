import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CalendarDays } from 'lucide-react';

// TODO: replace with your real Cal.com / Calendly booking link.
export const CAL_URL = 'https://cal.com/proximux/discovery';

export function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            className="relative z-[121] w-full max-w-3xl h-[82vh] bg-[var(--saas-card-bg)] border border-[var(--saas-border)] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--saas-border)] shrink-0">
              <div className="flex items-center gap-2 font-syne font-bold text-[var(--saas-text)]">
                <CalendarDays size={18} className="text-[var(--saas-lime)]" />
                Book a discovery call
              </div>
              <button onClick={onClose} className="text-[var(--saas-muted)] hover:text-white transition-colors">
                <X size={22} />
              </button>
            </div>
            <iframe
              src={CAL_URL}
              title="Book a discovery call with Proximux"
              className="w-full flex-1 bg-white"
              style={{ border: 0 }}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
