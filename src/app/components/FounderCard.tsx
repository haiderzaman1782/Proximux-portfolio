import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import {
  Github, Linkedin, Twitter, Facebook, Instagram, Youtube,
  Globe, Mail, Phone, MapPin, CalendarDays
} from 'lucide-react';

// lucide 0.487 ships no TikTok brand mark, so inline one at the same 16px as the row.
function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.5 3c.28 2.08 1.45 3.6 3.5 3.87v2.4c-1.28.08-2.48-.3-3.5-1v6.9c0 3.48-2.4 5.83-5.6 5.83-3 0-5.4-2.35-5.4-5.6 0-3 2.1-5.2 5-5.2.3 0 .6.02.9.07v2.6a2.6 2.6 0 0 0-.9-.16c-1.4 0-2.4 1.06-2.4 2.55 0 1.55 1.05 2.66 2.55 2.66 1.5 0 2.55-1.1 2.55-3V3h3.3z" />
    </svg>
  );
}

type Social = { href: string; label: string; icon: ReactNode };

export function FounderCard({
  name, title, focus, bio, initials, location, image,
  github, linkedin, twitter, facebook, instagram, youtube, tiktok, website,
  email, number, mobile, onBook, index,
}: {
  name: string;
  title: string;
  focus?: string;
  bio?: string;
  initials: string;
  location?: string;
  image?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
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
    twitter && { href: twitter, label: 'Twitter / X', icon: <Twitter size={16} /> },
    instagram && { href: instagram, label: 'Instagram', icon: <Instagram size={16} /> },
    facebook && { href: facebook, label: 'Facebook', icon: <Facebook size={16} /> },
    youtube && { href: youtube, label: 'YouTube', icon: <Youtube size={16} /> },
    tiktok && { href: tiktok, label: 'TikTok', icon: <TikTokIcon size={16} /> },
    website && { href: website, label: 'Website', icon: <Globe size={16} /> },
    email && { href: `mailto:${email}`, label: 'Email', icon: <Mail size={16} /> },
    mobile && number && { href: `tel:${number}`, label: 'Call', icon: <Phone size={16} /> },
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
