import { useUI } from '../ui-context';
import { PageHeader } from '../components/PageHeader';
import { FounderCard } from '../components/FounderCard';
import { ProcessCard } from '../components/ProcessCard';
import { FadeInSection, HeadingReveal } from '../components/anim';
import { CtaBand } from '../components/CtaBand';
import { founders, processSteps } from '../data';

export function AboutPage() {
  const { openBooking } = useUI();

  return (
    <>
      <section className="pt-16 sm:pt-24 lg:pt-28 pb-8 px-4 sm:px-8 lg:px-16 overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          <PageHeader
            eyebrow="Who you'll work with"
            title="Two founders. You talk to the people writing the code."
            intro="No layers, no handoffs. The engineers who scope your project are the ones who ship it."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {founders.map((f, i) => (
              <FounderCard key={f.title} index={i} onBook={openBooking} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-16 bg-[var(--saas-input-bg)] border-y border-[var(--saas-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 sm:mb-20">
            <FadeInSection>
              <div className="inline-block mb-4 px-4 py-1.5 bg-[var(--saas-lime)] text-black rounded-[20px] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                How we work
              </div>
            </FadeInSection>
            <HeadingReveal className="justify-center text-center" text="A working demo before the full build. Then production." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {processSteps.map((item, i) => (
              <FadeInSection key={item.title} delay={i * 0.1}>
                <ProcessCard step={i + 1} icon={item.icon} title={item.title} description={item.desc} output={item.output} />
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      <CtaBand eyebrow="Let's talk" title="Book a technical discovery call." />
    </>
  );
}
