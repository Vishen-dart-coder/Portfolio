'use client';

import Card from '@/components/ui/Card';

interface TimelineItem {
  year: string;
  age: number;
  title: string;
  description: string;
  testimonial: string;
}

const timeline: TimelineItem[] = [
  {
    year: '2019',
    age: 6,
    title: 'Started Learning to Code',
    description: 'Discovered programming and fell in love with building things from scratch.',
    testimonial: '"The moment I made the computer do what I told it to do, I was hooked. This was magic."',
  },
  {
    year: '2020',
    age: 7,
    title: 'Built First LMMS Projects',
    description: 'Created small music production projects, learning audio programming fundamentals.',
    testimonial: '"Music taught me about patterns, timing, and how complex systems work together."',
  },
  {
    year: '2021',
    age: 8,
    title: 'Launched macedge.in',
    description: 'First major production website. Learned the difference between hobby code and production code.',
    testimonial: '"Shipping something real changed everything. Users don\'t care about perfect code—they care if it works."',
  },
  {
    year: '2022',
    age: 9,
    title: 'Explored Linux & Security',
    description: 'Dove deep into Linux systems and cybersecurity fundamentals.',
    testimonial: '"Understanding how systems work under the hood fundamentally changed how I write software."',
  },
  {
    year: '2023',
    age: 10,
    title: 'Mastered Linux, Started Building for Clients',
    description: 'Achieved proficiency in Linux and security, began taking on real client projects.',
    testimonial: '"Building for others taught me what \'production-ready\' actually means."',
  },
  {
    year: '2024',
    age: 11,
    title: 'Launched archive360.co',
    description: 'Major production app with real users and real stakes. Full-stack development.',
    testimonial: '"This project taught me more than the previous five years of tutorials combined."',
  },
  {
    year: '2025',
    age: 12,
    title: 'Co-launched thefragrancesstory.com',
    description: 'E-commerce platform for fragrance business. Complex inventory and payment systems.',
    testimonial: '"Real-world constraints force you to make better engineering decisions."',
  },
  {
    year: '2026',
    age: 13,
    title: 'Launched careerflow-ai.org.in',
    description: 'AI-powered career planning platform. Modern full-stack with AI integration.',
    testimonial: '"AI is the future, but the fundamentals—clean code, good UX, reliability—never change."',
  },
];

export default function TimelineSection() {
  return (
    <section id="timeline" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-sm uppercase tracking-wide text-neutral-400 mb-2">
            The Journey
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            7 Years of Building
          </h2>
          <p className="text-xl text-neutral-400">
            From age 6 to 13, here's how I learned to build production software.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-neutral-700 -translate-x-1/2" />

          {/* Timeline items */}
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div
                key={item.year}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Year badge */}
                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-neutral-800 border-2 border-accent-500 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-sm font-bold text-white">
                      {item.year}
                    </div>
                    <div className="text-xs text-neutral-400">Age {item.age}</div>
                  </div>
                </div>

                {/* Content card */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} ml-24 md:ml-0`}>
                  <Card>
                    <h3 className="text-2xl font-serif font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-neutral-400 mb-4">{item.description}</p>
                    <blockquote className="border-l-4 border-accent-500 pl-4 italic text-neutral-400">
                      {item.testimonial}
                    </blockquote>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
