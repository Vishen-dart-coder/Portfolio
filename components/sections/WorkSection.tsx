import React from 'react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

const projects = [
  {
    title: 'CareerFlow AI',
    description:
      'AI-powered career development platform with personalized job recommendations and skill gap analysis.',
    tags: ['Next.js', 'TypeScript', 'OpenAI', 'Tailwind CSS'],
    year: '2024',
  },
  {
    title: 'Archive360',
    description:
      'Document management system with advanced search, version control, and collaborative features.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'AWS S3'],
    year: '2023',
  },
  {
    title: 'Macedge',
    description:
      'E-commerce platform for premium macadamia products with real-time inventory and analytics.',
    tags: ['Next.js', 'Stripe', 'MongoDB', 'Vercel'],
    year: '2023',
  },
  {
    title: 'The Fragrances Story',
    description:
      'Luxury fragrance e-commerce site with product customization and subscription management.',
    tags: ['React', 'Firebase', 'Stripe', 'Material UI'],
    year: '2022',
  },
];

const WorkSection = () => {
  return (
    <section id="work" className="py-32 px-6 bg-neutral-950">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Selected Work
        </h2>
        <p className="text-xl text-neutral-400 mb-16 max-w-2xl">
          A collection of projects that showcase my expertise in building scalable web applications.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} hover className="group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-accent-400 transition-colors duration-200">
                  {project.title}
                </h3>
                <span className="text-sm text-neutral-500">{project.year}</span>
              </div>
              <p className="text-neutral-400 mb-6 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="neutral">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
