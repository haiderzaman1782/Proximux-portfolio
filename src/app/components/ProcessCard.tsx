export function ProcessCard({ step, icon, title, description, output }: { step: number, icon: React.ReactNode, title: string, description: string, output: string }) {
  return (
    <div className="text-center group">
      <div className="relative inline-flex items-center justify-center mb-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[rgba(200,241,53,0.1)] border border-[rgba(200,241,53,0.2)] text-[var(--saas-lime)] transition-all group-hover:scale-110 group-hover:bg-[rgba(200,241,53,0.2)] shadow-sm">
        {icon}
        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--saas-lime)] text-black text-xs font-bold flex items-center justify-center">
          {step}
        </span>
      </div>
      <h3 className="font-syne text-lg sm:text-xl lg:text-2xl font-bold text-[var(--saas-text)] mb-3">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-[var(--saas-muted)] leading-relaxed max-w-[300px] mx-auto mb-4">
        {description}
      </p>
      <p className="text-xs sm:text-sm text-[var(--saas-lime)] font-mono max-w-[300px] mx-auto">
        {output}
      </p>
    </div>
  );
}
