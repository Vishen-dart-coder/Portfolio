import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import WorkSection from '@/components/sections/WorkSection';
import TimelineSection from '@/components/sections/TimelineSection';
import SkillsSection from '@/components/sections/SkillsSection';
import { PhilosophySection } from '@/components/sections/PhilosophySection';
import GitHubSection from '@/components/sections/GitHubSection';
import ContactSection from '@/components/sections/ContactSection';
import { Suspense } from 'react';

// Revalidate every hour for GitHub data
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <WorkSection />
        <TimelineSection />
        <SkillsSection />
        <PhilosophySection />

        <Suspense fallback={<div className="py-20 text-center text-neutral-400">Loading GitHub data...</div>}>
          <GitHubSection />
        </Suspense>

        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
