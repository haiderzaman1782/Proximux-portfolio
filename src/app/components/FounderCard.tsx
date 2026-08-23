import { motion } from 'motion/react';
import { Github, Linkedin, CalendarDays } from 'lucide-react';

export function FounderCard({ name, title, focus, bio, initials, github, linkedin, onBook, index }: {
  name: string;
  title: string;
  focus: string;
  bio: string;
  initials: string;
  github?: string;
  linkedin?: string;
  onBook: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      className="bg-[var(--saas-card-bg)] border border-[var(--saas-border)] rounded-2xl p-6 sm:p-8 flex flex-col h-full hover:border-[var(--saas-lime)]/50 transition-colors"
    >
      <div className="flex items-center gap-4 mb-6">
        {/* Replace with a real headshot in src/assets/team/ */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[rgba(43,110,163,0.1)] border border-[rgba(43,110,163,0.25)] flex items-center justify-center text-[var(--saas-lime)] font-syne font-extrabold text-lg sm:text-xl shrink-0">
          {initials}
        </div>
        <div>
          <div className="font-syne text-lg sm:text-xl font-bold text-[var(--saas-text)]">{name}</div>
          <div className="text-sm text-[var(--saas-lime)] font-medium">{title}</div>
        </div>
      </div>

      <p className="text-sm sm:text-base text-[var(--saas-text)] leading-relaxed mb-3">{focus}</p>
      <p className="text-xs sm:text-sm text-[var(--saas-muted)] leading-relaxed mb-6 italic">{bio}</p>

      <div className="flex items-center gap-3 mt-auto pt-5 border-t border-[var(--saas-border)]">
        <a href={github || '#'} target="_blank" rel="noopener noreferrer" title="GitHub" className="w-10 h-10 rounded-full border border-[var(--saas-border)] hover:border-[var(--saas-lime)] hover:text-[var(--saas-lime)] text-[var(--saas-muted)] flex items-center justify-center transition-colors">
          <Github size={16} />
        </a>
        <a href={linkedin || '#'} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="w-10 h-10 rounded-full border border-[var(--saas-border)] hover:border-[var(--saas-lime)] hover:text-[var(--saas-lime)] text-[var(--saas-muted)] flex items-center justify-center transition-colors">
          <Linkedin size={16} />
        </a>
        <button onClick={onBook} title="Book time" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[var(--saas-border)] hover:border-[var(--saas-lime)] hover:text-[var(--saas-lime)] text-[var(--saas-text)] text-xs font-medium transition-colors ml-auto">
          <CalendarDays size={14} />
          Book time
        </button>
      </div>
    </motion.div>
  );
}
