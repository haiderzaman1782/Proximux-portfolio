import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useUI } from '../ui-context';
import { TrustStrip } from '../components/TrustStrip';
import { FeatureCard } from '../components/FeatureCard';
import { Stat } from '../components/Stat';
import { CountUp, FadeInSection, HeadingReveal } from '../components/anim';
import { CtaBand } from '../components/CtaBand';
import { HeroGlobe } from '../components/HeroGlobe';
import { ProjectCard } from '../components/ProjectCard';
import { ProcessCard } from '../components/ProcessCard';
import { services, projects, processSteps } from '../data';

export function HomePage() {
  const { openBooking } = useUI();
  const navigate = useNavigate();
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[68vh] md:min-h-[74vh] py-14 sm:py-16 md:py-20 flex items-center justify-center px-4 sm:px-8 lg:px-16 overflow-hidden">
        {/* wireframe globe + soft accent glow behind the headline (paper texture comes from the app shell) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none py-10 sm:py-14">
          <div className="relative w-[300px] h-[300px] sm:w-[480px] sm:h-[480px] lg:w-[620px] lg:h-[620px] max-w-[90vw] max-h-[56vh]">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,var(--accent-glow)_0%,transparent_68%)]"></div>
            <HeroGlobe />
          </div>
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 mb-5 sm:mb-6 px-4 py-2 bg-[var(--saas-card-bg)] border border-[var(--saas-border)] rounded-full text-xs sm:text-sm shadow-tint-sm"
          >
            <motion.span animate={{ scale: [1, 1.35, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-2 h-2 rounded-full bg-[var(--saas-lime)] inline-block"></motion.span>
            <span className="text-[var(--saas-muted)]">Two-founder engineering studio · <span className="text-[var(--saas-lime)] font-medium">2 build slots open</span></span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-syne text-[clamp(2.6rem,1.7rem+3.1vw,4.35rem)] font-semibold tracking-[-0.025em] text-[var(--saas-text)] mb-5 sm:mb-6 leading-[1.04]"
          >
            We build custom AI systems and software, and <span className="font-serif italic font-normal text-[var(--saas-lime)]">ship them to production.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-[var(--saas-muted)] max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed"
          >
            Hire us to build RAG knowledge engines, AI voice agents, and full-stack web and mobile apps. You work directly with the two engineers writing the code, and you own all of it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto max-w-[320px] sm:max-w-none mx-auto"
          >
            <motion.button
              onClick={openBooking}
              initial="rest" whileHover="hover" whileTap="tap"
              variants={{ rest: { y: 0 }, hover: { y: -2 }, tap: { y: 0, scale: 0.98 } }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="group w-full sm:w-auto px-7 py-3.5 bg-[var(--saas-lime)] text-[var(--saas-on-accent)] rounded-full font-semibold text-sm sm:text-base flex items-center justify-center gap-2 min-h-[44px] touch-manipulation whitespace-nowrap shadow-tint-lg"
            >
              Book a discovery call
              <motion.span variants={{ rest: { x: 0 }, hover: { x: 3 } }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                <ArrowRight size={16} />
              </motion.span>
            </motion.button>
            <Link
              to="/work"
              className="group w-full sm:w-auto px-7 py-3.5 border border-[var(--saas-border)] hover:border-[var(--saas-lime)] hover:text-[var(--saas-lime)] text-[var(--saas-text)] rounded-full font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-colors min-h-[44px] touch-manipulation whitespace-nowrap"
            >
              See our work
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Positioning */}
      <section className="dotted-band py-16 sm:py-24 lg:py-28 px-4 sm:px-8 border-y border-[var(--saas-border)]">
        <div className="max-w-3xl mx-auto">
          <FadeInSection delay={0.1}>
            <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-[var(--saas-muted)] leading-relaxed text-center px-4">
              Most agencies sell you <strong className="text-[var(--saas-text)] font-extrabold">hours and dashboards</strong>. We ship <strong className="text-[var(--saas-text)] font-extrabold">working systems</strong> - and prove them with a running demo before you commit. Fewer projects, senior engineers, and <strong className="text-[var(--saas-text)] font-black tracking-tighter">code you own outright</strong>.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Services preview */}
      <section className="py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-16 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16">
            <div>
              <FadeInSection>
                <div className="inline-block mb-3 text-[11px] sm:text-xs font-medium uppercase tracking-[0.14em] font-mono text-[var(--saas-lime)]">
                  What we engineer
                </div>
              </FadeInSection>
              <HeadingReveal text="Four things we build well." />
            </div>
            <Link to="/services" className="text-[var(--saas-lime)] font-semibold text-sm flex items-center gap-1.5 hover:gap-2.5 transition-all shrink-0">
              All services <ArrowRight size={15} />
            </Link>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-1 md:grid-cols-2 gap-0.5 bg-[var(--saas-border)] rounded-[16px] overflow-hidden"
          >
            {services.map((service, i) => (
              <FeatureCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                oneLiner={service.oneLiner}
                highlight={service.highlight}
                stack={service.stack}
                ctaLabel="Explore this service"
                onClick={() => navigate('/services')}
                className={`${i === 0 ? "md:rounded-tl-[16px]" : ""} ${i === 1 ? "md:rounded-tr-[16px]" : ""} ${i === 2 ? "md:rounded-bl-[16px]" : ""} ${i === 3 ? "md:rounded-br-[16px]" : ""}`}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-16 border-t border-[var(--saas-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <FadeInSection>
              <div className="inline-block mb-3 text-[11px] sm:text-xs font-medium uppercase tracking-[0.14em] font-mono text-[var(--saas-lime)]">
                How it works
              </div>
            </FadeInSection>
            <HeadingReveal text="From first call to code you own." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-8">
            {processSteps.map((step, i) => (
              <ProcessCard
                key={step.title}
                step={i + 1}
                icon={step.icon}
                title={step.title}
                description={step.desc}
                output={step.output}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Projects preview */}
      <section className="py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-16 border-t border-[var(--saas-border)] overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16">
            <div>
              <FadeInSection>
                <div className="inline-block mb-3 text-[11px] sm:text-xs font-medium uppercase tracking-[0.14em] font-mono text-[var(--saas-lime)]">
                  What we've built
                </div>
              </FadeInSection>
              <HeadingReveal text="Real projects, shipped." />
            </div>
            <Link to="/projects" className="text-[var(--saas-lime)] font-semibold text-sm flex items-center gap-1.5 hover:gap-2.5 transition-all shrink-0">
              All projects <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {projects.filter((p) => p.featured).map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* Stats */}
      <section ref={statsRef} className="py-12 sm:py-16 md:py-24 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 sm:gap-12">
            <Stat number={<CountUp end={2} start={statsInView} duration={1200} />} label="Founding engineers" />
            <Stat number={<CountUp end={4} start={statsInView} duration={1500} />} label="Core disciplines" />
            <Stat number={<CountUp end={100} suffix="%" start={statsInView} duration={2000} />} label="Code & IP yours" />
            <Stat number={<CountUp end={0} start={statsInView} duration={800} />} label="Account managers" />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
