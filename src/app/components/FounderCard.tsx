import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import {
  Github, Linkedin, Globe, Mail, Phone, MapPin, CalendarDays,
} from 'lucide-react';

// lucide 0.487 ships no WhatsApp brand mark either, so inline one to match.
function WhatsappIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.4-1.48-.89-.8-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37s-1.05 1.02-1.05 2.5 1.08 2.9 1.22 3.1c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.35zM12.04 21.5a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.19 4.23-9.41 9.43-9.41 2.52 0 4.88.98 6.65 2.76a9.35 9.35 0 0 1 2.77 6.66c0 5.19-4.24 9.41-9.42 9.41zM20.52 3.49A11.78 11.78 0 0 0 12.04 0C5.5 0 .18 5.32.18 11.86c0 2.09.55 4.13 1.59 5.93L0 24l6.34-1.66a11.85 11.85 0 0 0 5.69 1.45h.01c6.54 0 11.86-5.32 11.86-11.86 0-3.17-1.23-6.15-3.48-8.4z" />
    </svg>
  );
}

type Social = { href: string; label: string; icon: ReactNode };

export function FounderCard({
  name, title, focus, bio, initials, location, image,
  github, linkedin, website, whatsapp,
  email, number, mobile, onBook, index,
}: {
  name: string;
  title: string;
  focus?: string;
  bio?: string;
  initials: string;
  location?: string;
  image?: string;
  whatsapp?: string;
  github?: string;
  linkedin?: string;
  website?: string;
  email?: string;
  number?: string;
  mobile?: boolean;
  onBook: () => void;
  index: number;
}) {
  const socials: Social[] = [
    github && { href: github, label: 'GitHub', icon: <Github size={16} /> },
    linkedin && { href: linkedin, label: 'LinkedIn', icon: <Linkedin size={16} /> },
    website && { href: website, label: 'Website', icon: <Globe size={16} /> },
    email && { href: `mailto:${email}`, label: 'Email', icon: <Mail size={16} /> },
    mobile && number && { href: `tel:${number}`, label: 'Call', icon: <Phone size={16} /> },
    whatsapp && { href: whatsapp, label: 'WhatsApp', icon: <WhatsappIcon size={16} /> },
  ].filter(Boolean) as Social[];

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
        {image && (
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[rgba(79,114,86,0.1)] border border-[rgba(79,114,86,0.25)] flex items-center justify-center text-[var(--saas-lime)] font-syne font-extrabold text-lg sm:text-xl shrink-0">
            <img src={image} alt={name} className="w-full h-full object-cover rounded-full" />
          </div>
        )}
        {!image && (
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[rgba(79,114,86,0.1)] border border-[rgba(79,114,86,0.25)] flex items-center justify-center text-[var(--saas-lime)] font-syne font-extrabold text-lg sm:text-xl shrink-0">
            {initials}
          </div>
        )}
        <div className="min-w-0">
          <div className="font-syne text-lg sm:text-xl font-bold text-[var(--saas-text)]">{name}</div>
          <div className="text-sm text-[var(--saas-lime)] font-medium">{title}</div>
          {location && (
            <div className="mt-1 flex items-center gap-1 text-xs text-[var(--saas-muted)]">
              <MapPin size={12} className="shrink-0" />
              <span className="truncate">{location}</span>
            </div>
          )}
        </div>
      </div>

      {focus && <p className="text-sm sm:text-base text-[var(--saas-text)] leading-relaxed mb-3">{focus}</p>}
      {bio && <p className="text-xs sm:text-sm text-[var(--saas-muted)] leading-relaxed mb-6 italic">{bio}</p>}

      <div className="mt-auto pt-5 border-t border-[var(--saas-border)]">
        {socials.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                aria-label={`${name} on ${s.label}`}
                className="w-9 h-9 rounded-full border border-[var(--saas-border)] hover:border-[var(--saas-lime)] hover:text-[var(--saas-lime)] text-[var(--saas-muted)] flex items-center justify-center transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        )}
        <button
          onClick={onBook}
          title="Book time"
          className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[var(--saas-border)] hover:border-[var(--saas-lime)] hover:text-[var(--saas-lime)] text-[var(--saas-text)] text-xs font-medium transition-colors"
        >
          <CalendarDays size={14} />
          Book time
        </button>
      </div>
    </motion.div>
  );
}
