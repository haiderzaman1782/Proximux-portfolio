import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export function FeatureCard({ icon, title, oneLiner, highlight, stack, className, ctaLabel = "View technical scope", onClick }: {
  icon: React.ReactNode;
  title: string;
  oneLiner: string;
  highlight?: string;
  stack?: string[];
  className?: string;
  ctaLabel?: string;
  onClick?: () => void;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.97 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
      }}
      whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={`p-6 sm:p-8 lg:p-10 transition-all duration-300 relative group flex flex-col h-full bg-[var(--saas-card-bg)] hover:bg-[var(--saas-hover-bg)] cursor-pointer ${className || ''}`}
    >
      <div className="mb-6">{icon}</div>
      <h3 className="font-syne text-lg sm:text-xl lg:text-2xl font-bold text-[var(--saas-text)] mb-3 leading-tight">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-[var(--saas-muted)] leading-relaxed mb-5">
        {oneLiner}
      </p>

      {highlight && (
        <p className="text-xs sm:text-sm text-[var(--saas-lime)] font-mono mb-5 leading-relaxed">
          {highlight}
        </p>
      )}

      {stack && (
        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {stack.map((tech) => (
            <span key={tech} className="px-2.5 py-1 rounded-full border border-[var(--saas-lime)]/25 text-[var(--saas-muted)] text-[10px] sm:text-xs font-medium">
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 text-[var(--saas-lime)] text-xs font-bold uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">
        {ctaLabel} <ArrowRight size={14} />
      </div>
    </motion.div>
  );
}
