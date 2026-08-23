import { Mail, Phone, CalendarDays, ArrowRight } from 'lucide-react';
import { useUI } from '../ui-context';
import { PageHeader } from '../components/PageHeader';
import { ContactForm } from '../components/ContactForm';
import { FAQ } from '../components/FAQ';
import { HeadingReveal, FadeInSection } from '../components/anim';
import { faqs } from '../data';

export function ContactPage() {
  const { openBooking } = useUI();

  return (
    <>
      <section className="pt-16 sm:pt-24 lg:pt-28 pb-12 px-4 sm:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <PageHeader
            eyebrow="Start here"
            title="Book a technical discovery call."
            intro="30 minutes with an engineer. We'll tell you if we're the right team for the build - and if we're not, who is."
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
            {/* Form */}
            <div className="lg:col-span-3 bg-[var(--saas-card-bg)] border border-[var(--saas-border)] rounded-2xl p-6 sm:p-8">
              <h2 className="font-syne text-xl sm:text-2xl font-bold mb-2">Send a brief</h2>
              <p className="text-[var(--saas-muted)] text-sm mb-6">Tell us what you're building. We reply within 24 hours.</p>
              <ContactForm />
            </div>

            {/* Direct */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="bg-[var(--saas-card-bg)] border border-[var(--saas-border)] rounded-2xl p-6 sm:p-8">
                <h3 className="text-[10px] sm:text-xs uppercase tracking-widest text-[var(--saas-lime)] font-bold mb-4">Prefer to book directly?</h3>
                <button
                  onClick={openBooking}
                  className="w-full mb-6 px-5 py-3.5 bg-[var(--saas-lime)] text-[var(--saas-on-accent)] rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-95"
                >
                  <CalendarDays size={16} />
                  Book a call
                </button>
                <a href="mailto:hello@proximux.online" className="flex items-center gap-3 text-[var(--saas-text)] text-sm mb-4 hover:text-[var(--saas-lime)] transition-colors">
                  <Mail size={16} className="text-[var(--saas-lime)]" />
                  hello@proximux.online
                </a>
                <a href="tel:03194290197" className="flex items-center gap-3 text-[var(--saas-text)] text-sm hover:text-[var(--saas-lime)] transition-colors">
                  <Phone size={16} className="text-[var(--saas-lime)]" />
                  03194290197
                </a>
              </div>

              <div className="bg-[var(--saas-inner-bg)] border border-[var(--saas-border)] rounded-2xl p-6 sm:p-8">
                <h3 className="text-[10px] sm:text-xs uppercase tracking-widest text-[var(--saas-lime)] font-bold mb-3">What to expect</h3>
                <p className="text-sm text-[var(--saas-muted)] leading-relaxed flex items-start gap-2">
                  <ArrowRight size={15} className="text-[var(--saas-lime)] mt-0.5 shrink-0" />
                  Scope, constraints, a rough architecture, and a fixed-price proposal within ‹48h›.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 lg:py-28 px-4 sm:px-8 bg-[var(--saas-input-bg)] border-t border-[var(--saas-border)]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <FadeInSection>
              <div className="inline-block mb-4 px-4 py-1.5 bg-[var(--saas-lime)] text-[var(--saas-on-accent)] rounded-[20px] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                FAQ
              </div>
            </FadeInSection>
            <HeadingReveal className="justify-center" text="Straight answers for technical buyers." />
          </div>
          <FAQ items={faqs} />
        </div>
      </section>
    </>
  );
}
