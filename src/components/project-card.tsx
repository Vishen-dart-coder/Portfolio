/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Markdown from "react-markdown";

function ProjectImage({ src, alt, tall }: { src: string; alt: string; tall?: boolean }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return <div className="w-full h-48 bg-muted" />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn("w-full object-cover object-top", tall ? "h-56 sm:h-72" : "h-44")}
      onError={() => setImageError(true)}
    />
  );
}

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
  featured?: boolean;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
  featured = false,
}: Props) {
  return (
    <div
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
      }}
      className={cn(
        "group/card relative flex flex-col h-full border border-border rounded-xl overflow-hidden transition-[background-color,transform] duration-150 ease-out hover:bg-muted/30 active:scale-[0.995]",
        className
      )}
    >
      {/* Cursor spotlight: a soft neutral light on the surface and a brighter one on the border */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-xl opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 motion-reduce:hidden"
        style={{
          background:
            "radial-gradient(360px circle at var(--x, 50%) var(--y, 50%), color-mix(in oklab, var(--foreground) 5%, transparent), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-xl opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 motion-reduce:hidden"
        style={{
          padding: 1,
          background:
            "radial-gradient(240px circle at var(--x, 50%) var(--y, 50%), color-mix(in oklab, var(--foreground) 35%, transparent), transparent 70%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)",
        }}
      />
      <div className="relative shrink-0">
        <Link
          href={href || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {video ? (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className={cn("w-full object-cover", featured ? "h-56 sm:h-72" : "h-44")}
            />
          ) : image ? (
            <ProjectImage src={image} alt={title} tall={featured} />
          ) : null}
        </Link>
        {links && links.length > 0 && (
          <div className={cn("flex flex-wrap gap-2", video || image ? "absolute top-2 right-2" : "px-6 pt-6")}>
            {links.map((link, idx) => (
              <Link
                href={link.href}
                key={idx}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Badge
                  className="flex items-center gap-1.5 text-xs bg-black text-white hover:bg-black/90"
                  variant="default"
                >
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className={cn("flex flex-col gap-3 flex-1", featured ? "p-6" : "p-5")}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h3 className={cn("font-medium", featured && "text-lg")}>{title}</h3>
            <time className="text-xs font-mono text-muted-foreground">{dates}</time>
          </div>
          <Link
            href={href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            aria-label={`Open ${title}`}
          >
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="text-xs flex-1 prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
          <Markdown>{description}</Markdown>
        </div>
        {tags && tags.length > 0 && (
          <p className="mt-auto font-mono text-xs text-muted-foreground">{tags.join(" · ")}</p>
        )}
      </div>
    </div>
  );
}
