import { HeadingReveal, FadeInSection } from './anim';

export function PageHeader({ eyebrow, title, intro }: { eyebrow: string, title: string, intro?: string }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
      <FadeInSection>
        <div className="inline-block mb-4 px-4 py-1.5 bg-[var(--saas-lime)] text-[var(--saas-on-accent)] rounded-[20px] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
          {eyebrow}
        </div>
      </FadeInSection>
      <HeadingReveal className="justify-center" text={title} />
      {intro && (
        <FadeInSection delay={0.2}>
          <p className="text-sm sm:text-base md:text-lg text-[var(--saas-muted)] max-w-2xl mx-auto mt-6 leading-relaxed">
            {intro}
          </p>
        </FadeInSection>
      )}
    </div>
  );
}
