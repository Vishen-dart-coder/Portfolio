import { formatDate } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

interface BlogHeaderProps {
  title: string;
  date: string;
  readingTime: number;
  tags: string[];
  author: string;
}

export function BlogHeader({
  title,
  date,
  readingTime,
  tags,
  author,
}: BlogHeaderProps) {
  return (
    <header className="mb-12">
      <div className="flex flex-wrap items-center gap-2 text-sm text-secondary mb-4">
        <time>{formatDate(date)}</time>
        <span>•</span>
        <span>{readingTime} min read</span>
        <span>•</span>
        <span>By {author}</span>
      </div>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-6">
        {title}
      </h1>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="accent">
            {tag}
          </Badge>
        ))}
      </div>
    </header>
  );
}
