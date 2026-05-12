"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-semibold text-primary hover:text-accent transition-colors"
          >
            Your Name
          </Link>
          <ul className="flex gap-8">
            <li>
              <Link
                href="#work"
                className="text-secondary hover:text-primary transition-colors"
              >
                Work
              </Link>
            </li>
            <li>
              <Link
                href="#skills"
                className="text-secondary hover:text-primary transition-colors"
              >
                Skills
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="text-secondary hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
