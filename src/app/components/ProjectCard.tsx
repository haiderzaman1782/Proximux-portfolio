import { motion } from 'motion/react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import type { Project } from '../data';

export function ProjectCard({ project, index, className = '' }: { project: Project; index: number; className?: string }) {
  const { title, category, description, tags, link, linkLabel, demo } = project;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      className={`bg-[var(--saas-card-bg)] border border-[var(--saas-border)] rounded-2xl p-6 sm:p-8 flex flex-col h-full hover:border-[var(--saas-lime)]/50 transition-colors ${className}`}
    >
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[var(--saas-lime)] font-bold">{category}</span>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            title={linkLabel || 'Open'}
            className="text-[var(--saas-muted)] hover:text-[var(--saas-lime)] transition-colors"
          >
            <ArrowUpRight size={16} />
          </a>
        )}
      </div>

      <h3 className="font-syne text-lg sm:text-xl font-bold text-[var(--saas-text)] mb-3 leading-snug">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-[var(--saas-muted)] leading-relaxed mb-6">
        {description}
      </p>

      <div className="mt-auto">
        {demo && (
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mb-4 px-3.5 py-1.5 rounded-full bg-[var(--saas-lime)] text-[var(--saas-on-accent)] text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            <ExternalLink size={13} /> Live demo
          </a>
        )}
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="px-2.5 py-1 rounded-full border border-[var(--saas-lime)]/25 text-[var(--saas-muted)] text-[10px] sm:text-xs font-medium">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
