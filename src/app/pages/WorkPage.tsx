import { useUI } from '../ui-context';
import { PageHeader } from '../components/PageHeader';
import { ProofCard } from '../components/ProofCard';
import { CtaBand } from '../components/CtaBand';
import { proofCases } from '../data';

export function WorkPage() {
  const { openBooking, openChat } = useUI();

  return (
    <>
      <section className="pt-16 sm:pt-24 lg:pt-28 pb-12 px-4 sm:px-8 lg:px-16 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <PageHeader
            eyebrow="Proof, not promises"
            title="Don't take our word for it. Try the live demo."
            intro="Our Ask Proximux assistant is live now, running on the same RAG stack we build for clients. Ask it anything and watch it answer from our own content. The voice and mobile demos are on the way."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {proofCases.map((c, i) => (
              <ProofCard key={c.mediaLabel} index={i} onCta={openBooking} onChat={openChat} {...c} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand eyebrow="Convinced?" title="Book a technical discovery call." />
    </>
  );
}
