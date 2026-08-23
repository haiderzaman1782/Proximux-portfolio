import { PageHeader } from '../components/PageHeader';
import { ProjectCard } from '../components/ProjectCard';
import { CtaBand } from '../components/CtaBand';
import { projects } from '../data';

// Desktop (lg) bento placement, one entry per project in source order.
// The 3-col grid tiles into the editorial layout; mobile/tablet ignore these.
const BENTO = [
  'lg:col-start-1 lg:col-span-2 lg:row-start-1',                  // 1 - top-left, wide
  'lg:col-start-3 lg:row-start-1 lg:row-span-2',                 // 2 - right, tall
  'lg:col-start-1 lg:col-span-2 lg:row-start-2',                  // 3 - under 1, wide
  'lg:col-start-1 lg:row-start-3 lg:row-span-2',                 // 4 - left, tall
  'lg:col-start-2 lg:col-span-2 lg:row-start-3',                  // 5 - right-top, wide
  'lg:col-start-2 lg:col-span-2 lg:row-start-4',                  // 6 - right-bottom, wide
  'md:col-span-2 lg:col-start-1 lg:col-span-3 lg:row-start-5',    // 7 - full width
];

export function ProjectsPage() {
  return (
    <>
      <section className="pt-16 sm:pt-24 lg:pt-28 pb-12 px-4 sm:px-8 lg:px-16 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <PageHeader
            eyebrow="What we've built"
            title="Real projects, shipped."
            intro="A selection of work from our founder's track record, the engineering behind Proximux, spanning AI systems, iOS apps, and modern web platforms."
          />

          {/* Bento grid (desktop): a fixed 7-cell editorial layout.
              Band 1: P1 over P3 (left 2/3) + P2 tall (right 1/3).
              Band 2: P4 tall (left 1/3) + P5 over P6 (right 2/3).
              Band 3: P7 full width. Below lg it collapses to 1/2 columns. */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {projects.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} className={BENTO[i] || ''} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand eyebrow="Have something in mind?" title="Book a technical discovery call." />
    </>
  );
}
