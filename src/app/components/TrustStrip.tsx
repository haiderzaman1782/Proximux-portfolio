import { motion } from 'motion/react';

const DEFAULT_STACK = ["Python", "FastAPI", "OpenAI", "Pinecone", "React Native", "iOS", "Android"];

export function TrustStrip({ items = DEFAULT_STACK }: { items?: string[] }) {
  return (
    <section className="py-10 sm:py-12 border-y border-[var(--saas-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#6b6b60] text-center mb-8 px-2">
          Built with
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-10 max-w-3xl mx-auto">
          {items.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="text-sm sm:text-base font-semibold tracking-wide text-[var(--saas-muted)] hover:text-[var(--saas-lime)] transition-colors cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
