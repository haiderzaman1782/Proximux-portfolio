import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useUI } from '../ui-context';
import { ThemeToggle } from './ThemeToggle';

const NAV = [
  { name: "Services", to: "/services" },
  { name: "Demos", to: "/work" },
  { name: "Projects", to: "/projects" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" }
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openBooking } = useUI();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

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
      transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        height: '64px',
        borderBottom: `1px solid var(--saas-border)`,
        backgroundColor: 'var(--saas-nav-scrolled)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: scrolled ? '0 1px 12px hsl(var(--shadow-color) / 0.10)' : 'none',
        transition: 'box-shadow 200ms ease'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1 touch-manipulation min-h-[44px]" style={{ fontFamily: 'var(--font-syne)' }}>
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--saas-text)]">PROXIMUX</span>
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
          <ThemeToggle />
          <motion.button
            onClick={openBooking}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={{
              rest: { y: 0 },
              hover: { y: -2 },
              tap: { y: 0, scale: 0.98 }
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="group touch-manipulation min-h-[44px] px-5 sm:px-6 py-2 bg-[var(--saas-lime)] text-[var(--saas-on-accent)] rounded-full text-sm lg:text-base font-semibold flex items-center gap-2 shadow-tint-sm"
          >
            Book a Call
            <motion.span variants={{ rest: { x: 0 }, hover: { x: 3 } }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
              <ArrowRight size={16} />
            </motion.span>
          </motion.button>
        </div>

        <div className="flex md:hidden items-center gap-1">
          <ThemeToggle />
          <button
            className="touch-manipulation min-h-[44px] min-w-[44px] p-2 flex items-center justify-center text-[var(--saas-text)]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* scroll-progress line */}
      <motion.div
        style={{ scaleX: progress, transformOrigin: '0% 50%' }}
        className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[var(--saas-lime)] opacity-70"
      />

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
                className="touch-manipulation min-h-[44px] w-full bg-[var(--saas-lime)] text-[var(--saas-on-accent)] rounded-full font-semibold text-lg py-2.5"
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
