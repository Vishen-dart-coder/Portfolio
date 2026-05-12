import { getAllPosts } from '@/lib/mdx';
import { BlogCard } from '@/components/blog/BlogCard';

export const revalidate = 3600; // Revalidate every hour

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4">
            Writing
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl">
            Thoughts on coding, learning, and building production software.
          </p>
        </div>

        {/* Blog posts grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-neutral-400 text-lg">
              No posts yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
