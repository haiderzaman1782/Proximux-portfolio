import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { ContactForm } from './ContactForm';

export function ContactFormModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="relative z-[111] w-full max-w-lg bg-[var(--saas-card-bg)] border border-[var(--saas-border)] rounded-3xl shadow-2xl overflow-hidden"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-[var(--saas-muted)] hover:text-white transition-colors z-10">
              <X size={24} />
            </button>
            <div className="p-8 sm:p-10">
              <div className="mb-8">
                <h2 className="font-syne text-3xl font-extrabold mb-3">Book a discovery call</h2>
                <p className="text-[var(--saas-muted)]">Tell us what you're building. We'll reply within 24 hours with next steps.</p>
              </div>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
