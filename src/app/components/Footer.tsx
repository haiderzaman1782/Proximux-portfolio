import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Phone } from 'lucide-react';

const COMPANY = [
  { name: "Services", to: "/services" },
  { name: "Work", to: "/work" },
  { name: "Projects", to: "/projects" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" }
];

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-8 lg:px-16 border-t border-[var(--saas-border)]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 text-center lg:text-left mb-16 lg:mb-24">
          <div className="flex flex-col items-center lg:items-start">
            <Link to="/" className="flex items-center gap-1 mb-6 text-xl sm:text-2xl font-extrabold font-syne touch-manipulation min-h-[44px]">
              <span className="text-[var(--saas-text)]">PROXIMUX</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--saas-lime)]"></span>
            </Link>
            <p className="text-sm sm:text-base text-[var(--saas-muted)] max-w-[260px]">
              AI engineering &amp; software studio. RAG, voice agents, and full-stack web &amp; mobile.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-base sm:text-lg font-bold text-[var(--saas-text)] mb-2">Services</h4>
            {["RAG & Knowledge Engines", "AI Voice Agents", "Mobile Apps", "Full-Stack Web"].map((link) => (
              <Link key={link} to="/services" className="text-sm sm:text-base text-[var(--saas-muted)] hover:text-[var(--saas-lime)] transition-colors py-1">
                {link}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-base sm:text-lg font-bold text-[var(--saas-text)] mb-2">Company</h4>
            {COMPANY.map((link) => (
              <Link key={link.name} to={link.to} className="text-sm sm:text-base text-[var(--saas-muted)] hover:text-[var(--saas-lime)] transition-colors py-1">
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--saas-border)] flex flex-col md:flex-row items-center justify-between gap-6 text-xs sm:text-sm text-[var(--saas-muted)]">
          <div className="flex-1 text-center md:text-left">
            <p>© PROXIMUX. All rights reserved.</p>
          </div>
          <div className="flex-1 flex flex-col md:flex-row items-center justify-center md:justify-end gap-4 sm:gap-8">
            <a href="tel:03194290197" className="hover:text-[var(--saas-lime)] transition-colors flex items-center gap-2">
              <Phone size={14} />
              03194290197
            </a>
            <a href="mailto:hello@proximux.online" className="hover:text-[var(--saas-lime)] transition-colors flex items-center gap-2">
              <Mail size={14} />
              hello@proximux.online
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
