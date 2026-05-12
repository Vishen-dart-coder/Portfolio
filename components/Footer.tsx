export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border py-8 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-secondary text-sm">
            &copy; {currentYear} Your Name. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="mailto:your.email@example.com"
              className="text-secondary hover:text-primary transition-colors"
            >
              Email
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-primary transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
