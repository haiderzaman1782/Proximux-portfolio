import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

export function FAQ({ items }: { items: { q: string, a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-1">
      {items.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <motion.div
            key={faq.q}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
          >
            <div className="border-b border-[var(--saas-border)]">
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 text-left py-5 sm:py-6 px-4 group touch-manipulation min-h-[44px]"
              >
                <span className={`text-sm sm:text-base font-bold transition-colors ${isOpen ? 'text-[var(--saas-lime)]' : 'text-[var(--saas-text)]'} group-hover:text-[var(--saas-lime)]`}>
                  {faq.q}
                </span>
                <span className="text-[var(--saas-lime)] shrink-0">
                  {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -5, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden px-4"
                  >
                    <p className="text-sm sm:text-base text-[var(--saas-muted)] leading-relaxed pb-6">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
