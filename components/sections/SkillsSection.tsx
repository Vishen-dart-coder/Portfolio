import React from 'react';
import Badge from '@/components/ui/Badge';

const skillCategories = [
  {
    category: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Firebase'],
  },
  {
    category: 'Tools & Platform',
    skills: ['Git', 'Docker', 'Vercel', 'AWS', 'CI/CD'],
  },
  {
    category: 'Design',
    skills: ['Figma', 'Responsive Design', 'UI/UX', 'Design Systems'],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-32 px-6 bg-neutral-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Skills & Technologies
        </h2>
        <p className="text-xl text-neutral-400 mb-16 max-w-2xl">
          Tools and technologies I use to bring ideas to life.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {skillCategories.map((category, index) => (
            <div key={index}>
              <h3 className="text-xl font-bold text-white mb-6">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <Badge key={skillIndex} variant="accent">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
