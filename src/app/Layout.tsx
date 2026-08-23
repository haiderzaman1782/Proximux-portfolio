import { useState, useEffect, useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { PageLoader } from './components/anim';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ServiceModal } from './components/ServiceModal';
import { ContactFormModal } from './components/ContactFormModal';
import { BookingModal } from './components/BookingModal';
import { ChatWidget } from './components/ChatWidget';
import { UIContext } from './ui-context';
import type { Service } from './data';

export function Layout() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showLoader, setShowLoader] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const { pathname } = useLocation();

  // Jump to top on every route change (instant, not smooth).
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    html.style.scrollBehavior = prev;
  }, [pathname]);

  // Remove the intro loader after it fades - guarantees the page is never left
  // covered (e.g. a background-opened tab pauses the fade animation).
  useEffect(() => {
    const t = setTimeout(() => setShowLoader(false), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 100);
    const onMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('scroll', onScroll);
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  const ui = useMemo(() => ({
    openBooking: () => setBookingOpen(true),
    openContact: () => setContactOpen(true),
    openService: (s: Service) => setSelectedService(s),
    openChat: () => setChatOpen(true)
  }), []);

  return (
    <UIContext.Provider value={ui}>
      <div style={{ backgroundColor: 'var(--saas-dark-bg)', color: 'var(--saas-text)', minHeight: '100vh', overflowX: 'clip' }}>
        {showLoader && <PageLoader />}

        <motion.div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{ background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(43,110,163,0.04), transparent 60%)` }}
        />

        <Navbar />

        <main className="relative z-10">
          <Outlet />
        </main>

        <Footer />

        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-[40px] left-[40px] z-50 w-12 h-12 rounded-full bg-[var(--saas-lime)] text-[var(--saas-on-accent)] flex items-center justify-center shadow-lg cursor-pointer border-0 touch-manipulation overflow-hidden"
              title="Scroll to top"
            >
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                <ArrowUp size={24} />
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>

        <ServiceModal
          service={selectedService}
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          onBook={() => { setSelectedService(null); setBookingOpen(true); }}
        />
        <ContactFormModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
        <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />

        <ChatWidget open={chatOpen} onOpenChange={setChatOpen} />
      </div>
    </UIContext.Provider>
  );
}
