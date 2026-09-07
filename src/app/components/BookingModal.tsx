import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CalendarDays } from 'lucide-react';
import Cal, { getCalApi } from '@calcom/embed-react';

// Proximux discovery-call scheduler. To change it, update both the namespace
// and calLink below to your Cal.com "<user>/<event>" slug.
const CAL_NAMESPACE = '30min';
const CAL_LINK = 'haider-zaman-exnwci/30min';

// WhatsApp quick-book: an instant-chat alternative to the calendar for visitors
// who prefer messaging. Proximux WhatsApp line in international format
// (Pakistan +92, leading 0 dropped): local 0306 9262541 -> 923069262541.
// Digits only, no + or spaces.
const WHATSAPP_NUMBER = '923069262541';
const WHATSAPP_MSG = "Hi Proximux, I'd like to book a discovery call.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`;

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

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

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 flex items-center justify-center gap-1.5 px-6 py-2.5 border-b border-[var(--saas-border)] text-sm text-[var(--saas-muted)] hover:bg-[rgba(37,211,102,0.1)] transition-colors"
            >
              <WhatsAppIcon />
              Prefer a quick chat?&nbsp;<span className="font-semibold text-[#25D366]">Book on WhatsApp</span>
            </a>

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
