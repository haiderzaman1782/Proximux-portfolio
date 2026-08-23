import { PageHeader } from '../components/PageHeader';
import { ProjectCard } from '../components/ProjectCard';
import { CtaBand } from '../components/CtaBand';
import { projects } from '../data';

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand eyebrow="Have something in mind?" title="Book a technical discovery call." />
    </>
  );
}
