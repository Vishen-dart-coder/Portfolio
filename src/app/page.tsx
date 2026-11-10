/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Link from "next/link";
import { Timeline, TimelineConnectItem, TimelineItem } from "@/components/timeline";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import HackathonsSection from "@/components/section/hackathons-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import { ArrowUpRight } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 gap-y-6 flex flex-col md:flex-row justify-between">
            <div className="gap-2 flex flex-col order-2 md:order-1">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl"
                yOffset={8}
                text="I build web apps, AI tools and the systems under them"
              />
              <BlurFadeText
                className="text-muted-foreground max-w-[600px] md:text-lg lg:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.intro}
              />
              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                  {DATA.stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col gap-1">
                      <dt className="order-2 font-mono text-xs text-muted-foreground">{stat.label}</dt>
                      <dd className="order-1 text-2xl font-medium tabular-nums leading-none">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
              <Avatar className="size-24 md:size-32 border rounded-full">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-medium">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>
                {DATA.summary}
              </Markdown>
            </div>
          </BlurFade>
        </div>
      </section>
      {DATA.work.length > 0 && (
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-medium">Work Experience</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection />
          </BlurFade>
        </div>
      </section>
      )}
      {DATA.education.length > 0 && (
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-medium">Education</h2>
          </BlurFade>
          <Timeline>
            {DATA.education.map((education) => (
              <TimelineItem key={education.school} className="w-full flex items-start justify-between gap-10">
                <TimelineConnectItem className="flex items-start justify-center">
                  {education.logoUrl ? (
                    <img
                      src={education.logoUrl}
                      alt={education.school}
                      className="size-10 bg-white z-10 shrink-0 overflow-hidden border rounded-full object-cover flex-none"
                    />
                  ) : (
                    <div className="size-10 bg-card z-10 shrink-0 border rounded-full flex-none flex items-center justify-center text-sm font-medium text-muted-foreground">
                      {education.school.charAt(0)}
                    </div>
                  )}
                </TimelineConnectItem>
                <Link
                  href={education.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-1 items-start justify-between gap-x-3 min-w-0"
                >
                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <div className="font-medium leading-none flex items-center gap-2">
                      {education.school}
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-[opacity,transform] duration-200" aria-hidden />
                    </div>
                    <div className="font-sans text-sm text-muted-foreground">
                      {education.degree}
                    </div>
                  </div>
                  {education.start && (
                    <span className="text-xs font-mono tabular-nums text-muted-foreground text-right flex-none">
                      {education.start} - {education.end}
                    </span>
                  )}
                </Link>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      </section>
      )}
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-medium">Skills</h2>
          </BlurFade>
          <div className="flex flex-col gap-5">
            {DATA.skillGroups.map((group, gi) => (
              <BlurFade key={group} delay={BLUR_FADE_DELAY * 10 + gi * 0.04}>
                <div className="grid gap-2 sm:grid-cols-[148px_1fr] sm:gap-4">
                  <p className="pt-1.5 font-mono text-xs text-muted-foreground">{group}</p>
                  <div className="flex flex-wrap gap-2">
                    {DATA.skills
                      .filter((skill) => skill.group === group)
                      .map((skill) => (
                        <div
                          key={skill.name}
                          className="group/skill border bg-background border-border rounded-lg h-8 w-fit px-3 flex items-center gap-2 transition-colors duration-150 ease-out hover:bg-muted hover:border-foreground/20"
                        >
                          {skill.icon && <skill.icon className="size-4 rounded overflow-hidden object-contain transition-transform duration-200 ease-out group-hover/skill:-translate-y-px group-hover/skill:scale-110 motion-reduce:transform-none" />}
                          <span className="text-foreground text-sm">{skill.name}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <ProjectsSection />
        </BlurFade>
      </section>
      {DATA.hackathons.length > 0 && (
      <section id="hackathons">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <HackathonsSection />
        </BlurFade>
      </section>
      )}
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
