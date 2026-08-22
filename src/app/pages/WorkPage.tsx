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
            title="Don't take our word for it. Run the demos."
            intro="Every system below is real. Watch the teardown, open the live demo, or read the code."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {proofCases.map((c, i) => (
              <ProofCard key={c.mediaLabel} index={i} onCta={openBooking} onChat={openChat} {...c} />
            ))}
          </div>

          <div className="mt-10 sm:mt-12 bg-[var(--saas-card-bg)] border border-[var(--saas-border)] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <p className="text-sm sm:text-base text-[var(--saas-muted)] max-w-2xl">
              Metrics, media, and repo links marked <span className="text-[var(--saas-lime)] font-mono">‹ ›</span> are placeholders — each gets a real recording, number, or repository before launch.
            </p>
            <button
              onClick={openBooking}
              className="shrink-0 px-6 py-3 border border-[var(--saas-border)] hover:border-[var(--saas-lime)] hover:text-[var(--saas-lime)] text-[var(--saas-text)] rounded-[24px] font-semibold text-sm transition-colors"
            >
              Request a walkthrough
            </button>
          </div>
        </div>
      </section>

      <CtaBand eyebrow="Convinced?" title="Book a technical discovery call." />
    </>
  );
}
