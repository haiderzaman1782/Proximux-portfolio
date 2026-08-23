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
import { services, projects } from '../data';

export function HomePage() {
  const { openBooking } = useUI();
  const navigate = useNavigate();
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[82vh] md:min-h-[88vh] py-16 sm:py-20 md:py-24 flex items-center justify-center px-4 sm:px-8 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-[340px] h-[340px] sm:w-[560px] sm:h-[560px] lg:w-[760px] lg:h-[760px]">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(200,241,53,0.07)_0%,transparent_68%)]"></div>
            <HeroGlobe />
          </div>
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05, duration: 0.5, ease: "backOut" }}
            className="inline-flex items-center gap-2 mb-6 sm:mb-8 px-4 py-2 bg-[rgba(200,241,53,0.1)] border border-[rgba(200,241,53,0.2)] rounded-[20px] text-xs sm:text-sm"
          >
            <motion.span animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-2 h-2 rounded-full bg-[var(--saas-lime)] inline-block"></motion.span>
            <span className="text-[var(--saas-lime)]">2 build slots open - Q4 2026</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-syne text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-[#f5f5ef] mb-6 sm:mb-8 leading-[1.1]"
          >
            Production AI systems and software, shipped by the engineers who build them.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-[var(--saas-muted)] max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed"
          >
            Proximux is a two-founder engineering studio. We build custom RAG knowledge engines, autonomous AI voice agents, and full-stack web &amp; mobile applications - in Python/FastAPI and React Native. You work directly with the engineers writing the code. No account managers. No templates.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto max-w-[320px] sm:max-w-none mx-auto"
          >
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              onClick={openBooking}
              className="w-full sm:w-auto px-7 py-3 bg-[var(--saas-lime)] text-black rounded-[24px] font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-transform min-h-[44px] touch-manipulation whitespace-nowrap"
            >
              Request a Technical Discovery Call
              <ArrowRight size={16} />
            </motion.button>
            <Link
              to="/work"
              className="w-full sm:w-auto px-7 py-3 border border-[var(--saas-border)] hover:border-[var(--saas-lime)] text-[var(--saas-text)] rounded-[24px] font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-colors min-h-[44px] touch-manipulation whitespace-nowrap"
            >
              See our work
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      <TrustStrip />

      {/* Positioning */}
      <section className="py-16 sm:py-24 lg:py-28 px-4 sm:px-8 bg-[var(--saas-input-bg)] border-b border-[var(--saas-border)]">
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
                <div className="inline-block mb-4 px-4 py-1.5 bg-[var(--saas-lime)] text-black rounded-[20px] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
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

      {/* Projects preview */}
      <section className="py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-16 border-t border-[var(--saas-border)] overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16">
            <div>
              <FadeInSection>
                <div className="inline-block mb-4 px-4 py-1.5 bg-[var(--saas-lime)] text-black rounded-[20px] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
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

      {/* Stats */}
      <section ref={statsRef} className="py-12 sm:py-16 md:py-24 px-4 sm:px-8 border-t border-[var(--saas-border)]">
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
