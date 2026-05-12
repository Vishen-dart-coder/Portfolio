import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts, getPostBySlug } from '@/lib/mdx';
import { BlogHeader } from '@/components/blog/BlogHeader';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useMDXComponents } from '@/mdx-components';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;

  try {
    const post = await getPostBySlug(slug);
    return {
      title: `${post.title} - Vishen Sharma`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.date,
        authors: [post.author],
        tags: post.tags,
      },
    };
  } catch {
    return {
      title: 'Post Not Found',
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen py-20 px-6">
      <article className="max-w-3xl mx-auto">
        {/* Back button */}
        <Link href="/blog" className="inline-block mb-8">
          <Button variant="ghost">← Back to Blog</Button>
        </Link>

        {/* Post header */}
        <BlogHeader
          title={post.title}
          date={post.date}
          readingTime={post.readingTime}
          tags={post.tags}
          author={post.author}
        />

        {/* Post content */}
        <div className="prose prose-lg max-w-none">
          <MDXRemote source={post.content} components={useMDXComponents({})} />
        </div>

        {/* Post footer */}
        <footer className="mt-12 pt-8 border-t border-border">
          <Link href="/blog">
            <Button variant="secondary">← Back to Blog</Button>
          </Link>
        </footer>
      </article>
    </main>
  );
}
