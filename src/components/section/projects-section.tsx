import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsSection() {
  const featured = DATA.projects.filter((p) => "featured" in p && p.featured);
  const rest = DATA.projects.filter((p) => !("featured" in p && p.featured));
  return (
    <section id="projects">
      <div className="flex min-h-0 flex-col gap-y-6">
        <div className="flex flex-col gap-y-1">
          <h2 className="text-xl font-medium">Projects</h2>
          <p className="text-sm text-muted-foreground">
            Two live products, and the smaller things I build around them
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {featured.map((project, id) => (
            <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 12 + id * 0.05}>
              <ProjectCard
                featured
                href={project.href}
                title={project.title}
                description={project.description}
                dates={project.dates}
                tags={project.technologies}
                image={project.image}
                video={project.video}
                links={project.links}
              />
            </BlurFade>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 auto-rows-fr">
          {rest.map((project, id) => (
            <BlurFade
              key={project.title}
              delay={BLUR_FADE_DELAY * 13 + Math.min(id, 6) * 0.04}
              className="h-full"
            >
              <ProjectCard
                href={project.href}
                title={project.title}
                description={project.description}
                dates={project.dates}
                tags={project.technologies}
                image={project.image}
                video={project.video}
                links={project.links}
              />
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
