export function PhilosophySection() {
  return (
    <section id="philosophy" className="py-20 px-6 bg-surface">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-sm uppercase tracking-wide text-secondary mb-2">
            Philosophy
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">
            What I Believe
          </h2>
        </div>

        {/* Main Philosophy */}
        <div className="mb-12">
          <blockquote className="text-2xl md:text-3xl font-serif leading-relaxed text-primary mb-8 border-l-4 border-accent pl-6">
            "Great developers aren't defined by where they started, but by how
            relentlessly they keep learning and building. Technology changes
            constantly, so adaptability, curiosity, and execution matter more
            than chasing perfection."
          </blockquote>
          <p className="text-lg text-secondary">
            Build real things, stay uncomfortable, and focus on creating work
            that genuinely helps people.
          </p>
        </div>

        {/* Core Principles */}
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-serif font-semibold text-primary mb-3">
              1. Learn by Building Real Solutions
            </h3>
            <p className="text-lg text-secondary leading-relaxed">
              Tutorials teach syntax. Production code teaches engineering. The
              difference between hobby projects and software that real people
              depend on is immense. You don't truly understand a technology
              until you've shipped it under constraints.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-serif font-semibold text-primary mb-3">
              2. Production Quality Over Shortcuts
            </h3>
            <p className="text-lg text-secondary leading-relaxed">
              Fast and broken ships once. Solid and maintainable ships forever.
              Production-ready means code you're not afraid to wake up and
              support at 3am. It means error handling, observability, tests, and
              user experience that works even when things go wrong.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-serif font-semibold text-primary mb-3">
              3. Consistency and Curiosity Over Credentials
            </h3>
            <p className="text-lg text-secondary leading-relaxed">
              No one cares where you learned. They care what you can build. A
              degree doesn't make you a better engineer—shipping does.
              Consistency beats intensity. Showing up every day beats cramming
              once. Curiosity compounds.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-serif font-semibold text-primary mb-3">
              4. Systems Thinking and Holistic Development
            </h3>
            <p className="text-lg text-secondary leading-relaxed">
              Great software isn't just clean code. It's understanding the full
              stack: how users think, how systems scale, how teams collaborate,
              how products evolve. Frontend, backend, DevOps, design, product—it
              all matters. You can't build great products if you only understand
              one layer.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-serif font-semibold text-primary mb-3">
              5. Resourcefulness and Adaptability
            </h3>
            <p className="text-lg text-secondary leading-relaxed">
              The tools change. The frameworks change. The best practices change.
              What doesn't change: your ability to read docs, debug problems, and
              figure things out. Being resourceful means you're never blocked—you
              always find a way forward.
            </p>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-xl font-serif text-primary">
            I'm 13. I've been coding for 7 years. I've shipped production apps
            that real people use. And I'm just getting started.
          </p>
        </div>
      </div>
    </section>
  );
}
