import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
          Ashish Sharma
        </h1>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-neutral-300 mb-4">
          Full Stack Developer
        </h2>
        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto">
          Building modern web applications with clean code and thoughtful design
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-neutral-500 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-accent-500 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
