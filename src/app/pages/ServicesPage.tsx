import { motion } from 'motion/react';
import { useUI } from '../ui-context';
import { PageHeader } from '../components/PageHeader';
import { FeatureCard } from '../components/FeatureCard';
import { CtaBand } from '../components/CtaBand';
import { services } from '../data';

export function ServicesPage() {
  const { openService } = useUI();

  return (
    <>
      <section className="pt-16 sm:pt-24 lg:pt-28 pb-8 sm:pb-12 px-4 sm:px-8 lg:px-16 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <PageHeader
            eyebrow="What we engineer"
            title="Four disciplines. Built to hold up in production."
            intro="No marketing, no generalist sprawl. We go deep on the systems below — and hand you code you own outright. Click any pillar for the full technical scope."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
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
                onClick={() => openService(service)}
                className={`${i === 0 ? "md:rounded-tl-[16px]" : ""} ${i === 1 ? "md:rounded-tr-[16px]" : ""} ${i === 2 ? "md:rounded-bl-[16px]" : ""} ${i === 3 ? "md:rounded-br-[16px]" : ""}`}
              />
            ))}
          </motion.div>
        </div>
      </section>

      <CtaBand eyebrow="Have a project?" title="Scope your build in one call." />
    </>
  );
}
