import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import { formatDate } from '@/lib/utils';
import type { PostMetadata } from '@/lib/mdx';

interface BlogCardProps {
  post: PostMetadata;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card hover className="h-full">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-3">
            <time className="text-sm text-neutral-400">
              {formatDate(post.date)}
            </time>
            <span className="text-sm text-neutral-400">
              {post.readingTime} min read
            </span>
          </div>

          <h3 className="text-2xl font-serif font-semibold text-white mb-3 hover:text-accent-400 transition-colors">
            {post.title}
          </h3>

          <p className="text-neutral-400 mb-4 flex-grow">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="neutral">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
}
