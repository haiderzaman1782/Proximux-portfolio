import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useUI } from '../ui-context';

const NAV = [
  { name: "Services", to: "/services" },
  { name: "Work", to: "/work" },
  { name: "Projects", to: "/projects" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" }
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openBooking } = useUI();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `touch-manipulation min-h-[44px] flex items-center transition-colors ${isActive ? 'text-[var(--saas-lime)]' : 'text-[var(--saas-text)] hover:text-[var(--saas-lime)]'}`;

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        height: '64px',
        borderBottom: `1px solid var(--saas-border)`,
        backgroundColor: scrolled ? 'rgba(10, 10, 8, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'all 200ms ease'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1 touch-manipulation min-h-[44px]" style={{ fontFamily: 'var(--font-syne)' }}>
          <span className="text-xl sm:text-2xl font-extrabold text-[#e8e8e0]">PROXIMUX</span>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--saas-lime)', display: 'inline-block' }}></span>
        </Link>

        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm lg:text-base">
          {NAV.map((link) => (
            <NavLink key={link.name} to={link.to} className={linkClass}>
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={openBooking}
            className="touch-manipulation min-h-[44px] px-5 sm:px-6 py-2 border border-[var(--saas-border)] hover:border-[var(--saas-lime)] text-[var(--saas-text)] rounded-[24px] text-sm lg:text-base font-medium transition-colors"
          >
            Book a Call
          </button>
        </div>

        <button
          className="flex md:hidden touch-manipulation min-h-[44px] min-w-[44px] p-2 items-center justify-center text-[var(--saas-text)]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-16 left-0 right-0 z-50 shadow-2xl"
            style={{ backgroundColor: 'var(--saas-card-bg)', borderBottom: `1px solid var(--saas-border)`, padding: '20px' }}
          >
            <div className="flex flex-col gap-4">
              {NAV.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) => `touch-manipulation min-h-[44px] flex items-center text-lg ${isActive ? 'text-[var(--saas-lime)]' : 'text-[var(--saas-text)]'}`}
                >
                  {link.name}
                </NavLink>
              ))}
              <hr className="border-[var(--saas-border)]" />
              <button
                onClick={() => { openBooking(); setMobileOpen(false); }}
                className="touch-manipulation min-h-[44px] w-full bg-[var(--saas-lime)] text-black rounded-[24px] font-medium text-lg py-2"
              >
                Book a Technical Call
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
