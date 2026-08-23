import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export function Stat({ number, label }: { number: React.ReactNode, label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      animate={isInView ? {
        textShadow: ["0 0 0px transparent", "0 0 20px var(--saas-lime)", "0 0 0px transparent"]
      } : {}}
      className="text-center"
    >
      <div className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--saas-text)] leading-none mb-4">
        {number}
      </div>
      <div className="text-xs sm:text-sm md:text-base text-[var(--saas-muted)] uppercase tracking-widest font-medium">
        {label}
      </div>
    </motion.div>
  );
}
