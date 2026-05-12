# Premium Portfolio Website - Phase 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add advanced 3D components, scroll animations, MDX blog system, GitHub integration, Timeline section, and Philosophy section to complete the premium portfolio experience.

**Architecture:** Building on Phase 1's foundation, add Three.js/React Three Fiber for 3D rendering, GSAP + Lenis for scroll animations, MDX for blog content, and Octokit for GitHub data fetching with ISR caching.

**Tech Stack:** React Three Fiber, Three.js, @react-three/drei, GSAP, ScrollTrigger, Lenis, MDX, next-mdx-remote, Octokit, Playwright

**What Phase 2 Delivers:**
- 3D components (GeometricHero, ParticleField, DepthLayers)
- Smooth scroll with Lenis
- GSAP scroll-triggered animations
- MDX blog with index and individual post pages
- GitHub API integration with stats, repos, contribution graph
- Timeline section with journey milestones and testimonials
- Philosophy section with editorial typography
- Contact form API route with email service
- E2E tests with Playwright
- Production-ready performance optimizations

---

## Phase 2 File Structure

```
portfolio-website/
├── app/
│   ├── blog/
│   │   ├── page.tsx                    # Blog index (MDX list)
│   │   ├── [slug]/
│   │   │   └── page.tsx                # Individual blog posts
│   │   └── layout.tsx                  # Blog-specific layout
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.ts                # Contact form handler
│   │   └── revalidate/
│   │       └── route.ts                # ISR revalidation webhook
├── components/
│   ├── three/
│   │   ├── GeometricHero.tsx           # Geometric mesh for hero
│   │   ├── ParticleField.tsx           # Interactive particles
│   │   ├── DepthLayers.tsx             # Parallax depth layers
│   │   └── Scene.tsx                   # Base Three.js scene wrapper
│   ├── animations/
│   │   ├── ScrollReveal.tsx            # GSAP scroll reveal wrapper
│   │   ├── ParallaxText.tsx            # Parallax text effect
│   │   └── SmoothScroll.tsx            # Lenis smooth scroll provider
│   ├── sections/
│   │   ├── TimelineSection.tsx         # Journey timeline
│   │   ├── PhilosophySection.tsx       # Philosophy with quotes
│   │   ├── GitHubSection.tsx           # GitHub stats + activity
│   │   └── BlogSection.tsx             # Latest blog posts preview
│   ├── blog/
│   │   ├── BlogCard.tsx                # Blog post card
│   │   ├── BlogHeader.tsx              # Post header with metadata
│   │   └── MDXComponents.tsx           # Custom MDX components
├── content/
│   └── blog/
│       ├── learning-journey.mdx        # Sample post 1
│       └── building-production.mdx     # Sample post 2
├── lib/
│   ├── github.ts                       # GitHub API client
│   ├── mdx.ts                          # MDX utilities
│   ├── animations.ts                   # GSAP animation helpers
│   └── email.ts                        # Email service (Resend)
├── tests/
│   ├── e2e/
│   │   ├── home.spec.ts                # Homepage E2E tests
│   │   ├── blog.spec.ts                # Blog E2E tests
│   │   └── contact.spec.ts             # Contact form E2E tests
│   └── unit/
│       ├── github.test.ts              # GitHub API tests
│       └── mdx.test.ts                 # MDX utilities tests
├── playwright.config.ts                # Playwright configuration
└── .env.local                          # Add GITHUB_TOKEN, RESEND_API_KEY
```

---

## Task 1: Install Phase 2 Dependencies

**Goal:** Add all required npm packages for 3D, animations, blog, and GitHub integration

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install Three.js and React Three Fiber dependencies**

Run:
```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing
npm install -D @types/three
```

Expected: Packages installed successfully

- [ ] **Step 2: Install GSAP and Lenis for animations**

Run:
```bash
npm install gsap @studio-freight/lenis
```

Expected: Packages installed successfully

- [ ] **Step 3: Install MDX dependencies**

Run:
```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
```

Expected: Packages installed successfully

- [ ] **Step 4: Install email service (Resend)**

Run:
```bash
npm install resend
```

Expected: Package installed successfully

- [ ] **Step 5: Install Playwright for E2E tests**

Run:
```bash
npm install -D @playwright/test
npx playwright install
```

Expected: Playwright installed with browsers

- [ ] **Step 6: Verify all installations**

Run: `npm list --depth=0`
Expected: All new packages listed without errors

- [ ] **Step 7: Commit dependency changes**

```bash
git add package.json package-lock.json
git commit -m "feat: add Phase 2 dependencies (Three.js, GSAP, Lenis, MDX, Resend, Playwright)"
```

---

## Task 2: Configure Next.js for MDX

**Goal:** Set up Next.js to process MDX files in /content/blog/

**Files:**
- Modify: `next.config.js`
- Create: `mdx-components.tsx`

- [ ] **Step 1: Update Next.js config for MDX**

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: true,
  },
};

module.exports = nextConfig;
```

- [ ] **Step 2: Create MDX components configuration**

```typescript
// mdx-components.tsx
import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-5xl font-serif font-bold text-primary mt-8 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-serif font-bold text-primary mt-6 mb-3">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-serif font-semibold text-primary mt-4 mb-2">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-lg text-secondary leading-relaxed mb-4">
        {children}
      </p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-accent underline hover:text-primary transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="bg-surface border border-border px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-surface border border-border p-4 rounded-lg overflow-x-auto mb-4">
        {children}
      </pre>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-lg text-secondary">
        {children}
      </li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent pl-4 italic text-secondary my-4">
        {children}
      </blockquote>
    ),
    ...components,
  };
}
```

- [ ] **Step 3: Test Next.js config**

Run: `npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 4: Commit MDX configuration**

```bash
git add next.config.js mdx-components.tsx
git commit -m "feat: configure Next.js for MDX blog posts"
```

---

## Task 3: Create MDX Utilities

**Goal:** Build utilities to parse, process, and list MDX blog posts

**Files:**
- Create: `lib/mdx.ts`
- Create: `lib/__tests__/mdx.test.ts`

- [ ] **Step 1: Write failing test for getAllPosts**

```typescript
// lib/__tests__/mdx.test.ts
import { getAllPosts, getPostBySlug } from '../mdx';

describe('MDX utilities', () => {
  describe('getAllPosts', () => {
    it('should return array of post metadata', async () => {
      const posts = await getAllPosts();
      expect(Array.isArray(posts)).toBe(true);
    });

    it('should sort posts by date descending', async () => {
      const posts = await getAllPosts();
      if (posts.length > 1) {
        const dates = posts.map(p => new Date(p.date).getTime());
        expect(dates).toEqual([...dates].sort((a, b) => b - a));
      }
    });

    it('should include required metadata fields', async () => {
      const posts = await getAllPosts();
      if (posts.length > 0) {
        const post = posts[0];
        expect(post).toHaveProperty('slug');
        expect(post).toHaveProperty('title');
        expect(post).toHaveProperty('date');
        expect(post).toHaveProperty('excerpt');
      }
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- lib/__tests__/mdx.test.ts`
Expected: FAIL with "Cannot find module '../mdx'"

- [ ] **Step 3: Create MDX utilities implementation**

```typescript
// lib/mdx.ts
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  author: string;
  readingTime: number;
}

export interface Post extends PostMetadata {
  content: string;
}

/**
 * Get all blog posts sorted by date (newest first)
 */
export async function getAllPosts(): Promise<PostMetadata[]> {
  try {
    const files = await fs.readdir(CONTENT_DIR);
    const mdxFiles = files.filter(file => file.endsWith('.mdx'));

    const posts = await Promise.all(
      mdxFiles.map(async (file) => {
        const slug = file.replace('.mdx', '');
        const post = await getPostBySlug(slug);
        return {
          slug: post.slug,
          title: post.title,
          date: post.date,
          excerpt: post.excerpt,
          tags: post.tags,
          author: post.author,
          readingTime: post.readingTime,
        };
      })
    );

    // Sort by date descending
    return posts.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

/**
 * Get a single blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<Post> {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  // Calculate reading time (200 words per minute)
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || new Date().toISOString(),
    excerpt: data.excerpt || '',
    tags: data.tags || [],
    author: data.author || 'Vishen Sharma',
    readingTime,
    content,
  };
}

/**
 * Get all unique tags from all posts
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = new Set<string>();
  
  posts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });

  return Array.from(tags).sort();
}
```

- [ ] **Step 4: Create content directory structure**

Run:
```bash
mkdir -p content/blog
```

Expected: Directory created

- [ ] **Step 5: Create sample MDX posts**

```mdx
<!-- content/blog/learning-journey.mdx -->
---
title: "My 7-Year Journey: From Age 6 to Building Production Apps"
date: "2026-05-10"
excerpt: "How I went from complete beginner to launching real production software, and what I learned along the way."
tags: ["learning", "journey", "personal"]
author: "Vishen Sharma"
---

# My 7-Year Journey

I started coding at age 6 in 2019. I didn't know what a variable was, or how the internet worked, or why anyone would need a database. I just knew I wanted to build things.

## 2019-2020: The Beginning

My first "programs" were terrible. They barely worked. But I didn't care—I was making the computer do things I told it to do. That was magic.

## 2021: First Real Project

At age 8, I launched macedge.in. It was my first real production website. Looking back, the code was messy, but it *worked*. People used it. That's when I realized: production software doesn't have to be perfect, it just has to solve a problem.

## 2022-2023: Going Deeper

I got into Linux and cybersecurity. Not because I wanted to be a hacker, but because I wanted to understand how systems actually work under the hood. This fundamentally changed how I write code—I started thinking about security, performance, and reliability from day one.

## 2024-2026: Building for Others

Archive360, The Fragrances Story, CareerFlow AI. These weren't hobby projects. These were real products with real users and real stakes. I learned more shipping these three projects than I did in the previous five years of tutorials.

## What I Learned

1. **Production quality matters.** Users don't care about your tech stack. They care if it works.
2. **Ship early, iterate fast.** Perfect is the enemy of done.
3. **Learn by doing.** Reading is useful. Building is essential.
4. **Stay uncomfortable.** The moment you're comfortable, you're stagnating.

The journey isn't over. It's just getting started.
```

```mdx
<!-- content/blog/building-production.mdx -->
---
title: "What 'Production-Ready' Actually Means"
date: "2026-05-08"
excerpt: "After shipping multiple production apps, here's what I learned about writing software that real users depend on."
tags: ["engineering", "production", "quality"]
author: "Vishen Sharma"
---

# What 'Production-Ready' Actually Means

"Production-ready" sounds fancy. But what does it actually mean?

After shipping [CareerFlow AI](https://careerflow-ai.org.in), [Archive360](https://archive360.co), and [The Fragrances Story](https://thefragrancesstory.com), here's my definition:

> Production-ready software is software you're not afraid to wake up and support at 3am.

## It's Not About Perfect Code

Your code will never be perfect. There will always be a better abstraction, a cleaner pattern, a more elegant solution. That's fine.

Production-ready code is:
- **Testable**: Can you verify it works without clicking through the entire app?
- **Observable**: When it breaks, can you figure out why?
- **Maintainable**: Can you change it in 6 months without breaking everything?

## It's About Handling Failure

Production software fails. Networks drop. APIs timeout. Users do unexpected things. Your job isn't to prevent all failures—that's impossible. Your job is to handle them gracefully.

Every feature I ship now has:
- Error boundaries that catch crashes
- Loading states that tell users what's happening
- Fallbacks for when things go wrong
- Retry logic for transient failures

## It's About User Experience

Production-ready means users can accomplish their goal even when things go wrong. It means your app doesn't lose their data. It means error messages actually help them fix the problem.

Technical excellence is meaningless if the user experience is broken.

## The Test: Can You Sleep?

The real test: Can you deploy on Friday and sleep peacefully over the weekend?

If the answer is no, it's not production-ready yet.
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test -- lib/__tests__/mdx.test.ts`
Expected: All tests PASS

- [ ] **Step 7: Commit MDX utilities and sample content**

```bash
git add lib/mdx.ts lib/__tests__/mdx.test.ts content/
git commit -m "feat: add MDX utilities and sample blog posts"
```

---

## Task 4: Create Blog Index Page

**Goal:** Build the `/blog` page that lists all blog posts

**Files:**
- Create: `app/blog/page.tsx`
- Create: `app/blog/layout.tsx`
- Create: `components/blog/BlogCard.tsx`

- [ ] **Step 1: Create blog layout**

```typescript
// app/blog/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Vishen Sharma',
  description: 'Thoughts on coding, learning, and building production software.',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

- [ ] **Step 2: Create BlogCard component**

```typescript
// components/blog/BlogCard.tsx
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
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
            <time className="text-sm text-secondary">
              {formatDate(post.date)}
            </time>
            <span className="text-sm text-secondary">
              {post.readingTime} min read
            </span>
          </div>

          <h3 className="text-2xl font-serif font-semibold text-primary mb-3 group-hover:text-accent transition-colors">
            {post.title}
          </h3>

          <p className="text-secondary mb-4 flex-grow">
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
```

- [ ] **Step 3: Create blog index page**

```typescript
// app/blog/page.tsx
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
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-4">
            Writing
          </h1>
          <p className="text-xl text-secondary max-w-2xl">
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
            <p className="text-secondary text-lg">
              No posts yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
```

- [ ] **Step 4: Test blog index page**

Run: `npm run dev`
Navigate to: http://localhost:3000/blog
Expected: Blog index displays with 2 sample posts

- [ ] **Step 5: Commit blog index**

```bash
git add app/blog/ components/blog/BlogCard.tsx
git commit -m "feat: add blog index page with post listing"
```

---

## Task 5: Create Individual Blog Post Pages

**Goal:** Build dynamic `/blog/[slug]` pages for individual posts

**Files:**
- Create: `app/blog/[slug]/page.tsx`
- Create: `components/blog/BlogHeader.tsx`

- [ ] **Step 1: Create BlogHeader component**

```typescript
// components/blog/BlogHeader.tsx
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

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
```

- [ ] **Step 2: Create individual blog post page**

```typescript
// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts, getPostBySlug } from '@/lib/mdx';
import { BlogHeader } from '@/components/blog/BlogHeader';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

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
          <MDXRemote source={post.content} />
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
```

- [ ] **Step 3: Test individual blog post page**

Run: `npm run dev`
Navigate to: http://localhost:3000/blog/learning-journey
Expected: Full blog post renders with MDX content

- [ ] **Step 4: Test 404 handling**

Navigate to: http://localhost:3000/blog/nonexistent-post
Expected: 404 page displays

- [ ] **Step 5: Commit blog post pages**

```bash
git add app/blog/[slug]/ components/blog/BlogHeader.tsx
git commit -m "feat: add individual blog post pages with MDX rendering"
```

---

## Task 6: Create GitHub API Client

**Goal:** Build utilities to fetch GitHub data with ISR caching

**Files:**
- Create: `lib/github.ts`
- Create: `lib/__tests__/github.test.ts`

- [ ] **Step 1: Write failing tests for GitHub utilities**

```typescript
// lib/__tests__/github.test.ts
import { calculateStats, formatContributionData } from '../github';

describe('GitHub utilities', () => {
  describe('calculateStats', () => {
    it('should calculate total stars correctly', () => {
      const repos = [
        { stargazers_count: 10, forks_count: 2, language: 'TypeScript' },
        { stargazers_count: 5, forks_count: 1, language: 'JavaScript' },
      ];

      const stats = calculateStats(repos as any, []);
      expect(stats.totalStars).toBe(15);
    });

    it('should calculate total forks correctly', () => {
      const repos = [
        { stargazers_count: 10, forks_count: 2, language: 'TypeScript' },
        { stargazers_count: 5, forks_count: 1, language: 'JavaScript' },
      ];

      const stats = calculateStats(repos as any, []);
      expect(stats.totalForks).toBe(3);
    });

    it('should count repositories correctly', () => {
      const repos = [
        { stargazers_count: 10, forks_count: 2, language: 'TypeScript' },
        { stargazers_count: 5, forks_count: 1, language: 'JavaScript' },
      ];

      const stats = calculateStats(repos as any, []);
      expect(stats.totalRepos).toBe(2);
    });

    it('should aggregate languages correctly', () => {
      const repos = [
        { stargazers_count: 10, forks_count: 2, language: 'TypeScript' },
        { stargazers_count: 5, forks_count: 1, language: 'TypeScript' },
        { stargazers_count: 3, forks_count: 0, language: 'JavaScript' },
      ];

      const stats = calculateStats(repos as any, []);
      expect(stats.languages).toEqual({
        TypeScript: 2,
        JavaScript: 1,
      });
    });

    it('should handle repos without language', () => {
      const repos = [
        { stargazers_count: 10, forks_count: 2, language: null },
        { stargazers_count: 5, forks_count: 1, language: 'TypeScript' },
      ];

      const stats = calculateStats(repos as any, []);
      expect(stats.languages.TypeScript).toBe(1);
      expect(stats.languages.null).toBeUndefined();
    });
  });

  describe('formatContributionData', () => {
    it('should format events into contribution data', () => {
      const events = [
        {
          type: 'PushEvent',
          created_at: '2026-05-12T10:00:00Z',
          repo: { name: 'user/repo1' },
        },
        {
          type: 'PullRequestEvent',
          created_at: '2026-05-12T11:00:00Z',
          repo: { name: 'user/repo2' },
        },
      ];

      const contributions = formatContributionData(events as any);
      expect(contributions).toHaveLength(2);
      expect(contributions[0].type).toBe('PushEvent');
      expect(contributions[0].repo).toBe('user/repo1');
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- lib/__tests__/github.test.ts`
Expected: FAIL with "Cannot find module '../github'"

- [ ] **Step 3: Create GitHub API client implementation**

```typescript
// lib/github.ts
import { Octokit } from 'octokit';
import { cache } from 'react';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const USERNAME = 'Vishen-dart-coder';

export interface GitHubStats {
  totalStars: number;
  totalForks: number;
  totalRepos: number;
  languages: Record<string, number>;
  contributions: ContributionData[];
}

export interface ContributionData {
  date: string;
  type: string;
  repo: string;
}

export interface PinnedRepo {
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
}

/**
 * Calculate aggregate stats from repositories and events
 */
export function calculateStats(
  repos: any[],
  events: any[]
): GitHubStats {
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
  const totalRepos = repos.length;

  const languages: Record<string, number> = {};
  repos.forEach((repo) => {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  });

  const contributions = formatContributionData(events);

  return {
    totalStars,
    totalForks,
    totalRepos,
    languages,
    contributions,
  };
}

/**
 * Format GitHub events into contribution data
 */
export function formatContributionData(events: any[]): ContributionData[] {
  return events.map((event) => ({
    date: event.created_at,
    type: event.type,
    repo: event.repo.name,
  }));
}

/**
 * Get fallback data when GitHub API fails
 */
function getFallbackData(): GitHubStats {
  return {
    totalStars: 0,
    totalForks: 0,
    totalRepos: 0,
    languages: {},
    contributions: [],
  };
}

/**
 * Fetch all GitHub data (cached per request)
 */
export const getGitHubData = cache(async (): Promise<GitHubStats> => {
  try {
    const [user, repos, events] = await Promise.all([
      octokit.rest.users.getByUsername({ username: USERNAME }),
      octokit.rest.repos.listForUser({
        username: USERNAME,
        per_page: 100,
        sort: 'updated',
      }),
      octokit.rest.activity.listPublicEventsForUser({
        username: USERNAME,
        per_page: 100,
      }),
    ]);

    const stats = calculateStats(repos.data, events.data);

    return stats;
  } catch (error) {
    console.error('GitHub API error:', error);
    return getFallbackData();
  }
});

/**
 * Get pinned repositories (top 6 by stars)
 */
export const getPinnedRepos = cache(async (): Promise<PinnedRepo[]> => {
  try {
    const { data: repos } = await octokit.rest.repos.listForUser({
      username: USERNAME,
      per_page: 100,
      sort: 'updated',
    });

    // Sort by stars and take top 6
    const sorted = repos
      .filter((repo) => !repo.fork) // Exclude forks
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6);

    return sorted.map((repo) => ({
      name: repo.name,
      description: repo.description || 'No description provided',
      url: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language || 'Unknown',
    }));
  } catch (error) {
    console.error('GitHub API error:', error);
    return [];
  }
});
```

- [ ] **Step 4: Add GITHUB_TOKEN to .env.local**

```bash
# .env.local
GITHUB_TOKEN=your_github_personal_access_token_here
```

Note: User needs to create a GitHub Personal Access Token with `public_repo` scope

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test -- lib/__tests__/github.test.ts`
Expected: All tests PASS

- [ ] **Step 6: Commit GitHub API client**

```bash
git add lib/github.ts lib/__tests__/github.test.ts
git commit -m "feat: add GitHub API client with stats calculation"
```

---

## Task 7: Create GitHub Section Component

**Goal:** Build the GitHubSection component to display GitHub stats and activity

**Files:**
- Create: `components/sections/GitHubSection.tsx`

- [ ] **Step 1: Create GitHubSection component**

```typescript
// components/sections/GitHubSection.tsx
import { getGitHubData, getPinnedRepos } from '@/lib/github';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export async function GitHubSection() {
  const [stats, pinnedRepos] = await Promise.all([
    getGitHubData(),
    getPinnedRepos(),
  ]);

  const topLanguages = Object.entries(stats.languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <section id="github" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-sm uppercase tracking-wide text-secondary mb-2">
            GitHub Activity
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">
            Open Source Contributions
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <Card>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {stats.totalRepos}
              </div>
              <div className="text-sm text-secondary">Repositories</div>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {stats.totalStars}
              </div>
              <div className="text-sm text-secondary">Stars</div>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {stats.totalForks}
              </div>
              <div className="text-sm text-secondary">Forks</div>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {stats.contributions.length}
              </div>
              <div className="text-sm text-secondary">Recent Activity</div>
            </div>
          </Card>
        </div>

        {/* Top Languages */}
        <div className="mb-16">
          <h3 className="text-2xl font-serif font-semibold text-primary mb-6">
            Most Used Languages
          </h3>
          <div className="flex flex-wrap gap-3">
            {topLanguages.map(([language, count]) => (
              <Badge key={language} variant="neutral">
                {language} ({count})
              </Badge>
            ))}
          </div>
        </div>

        {/* Pinned Repositories */}
        <div>
          <h3 className="text-2xl font-serif font-semibold text-primary mb-6">
            Pinned Repositories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pinnedRepos.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card hover>
                  <div className="mb-3">
                    <h4 className="text-xl font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
                      {repo.name}
                    </h4>
                    <p className="text-sm text-secondary line-clamp-2">
                      {repo.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="neutral">{repo.language}</Badge>
                    <div className="flex items-center gap-4 text-sm text-secondary">
                      <span>⭐ {repo.stars}</span>
                      <span>🍴 {repo.forks}</span>
                    </div>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </div>

        {/* View on GitHub CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/Vishen-dart-coder"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-primary transition-colors font-medium"
          >
            View Full Profile on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Test GitHubSection rendering**

Run: `npm run dev`
Navigate to: http://localhost:3000
Expected: GitHub section renders with stats (requires valid GITHUB_TOKEN)

- [ ] **Step 3: Commit GitHub section**

```bash
git add components/sections/GitHubSection.tsx
git commit -m "feat: add GitHub activity section with stats and pinned repos"
```

---

## Task 8: Create Timeline Section

**Goal:** Build the TimelineSection component showing journey milestones

**Files:**
- Create: `components/sections/TimelineSection.tsx`

- [ ] **Step 1: Create TimelineSection component**

```typescript
// components/sections/TimelineSection.tsx
import { Card } from '@/components/ui/Card';

interface TimelineItem {
  year: string;
  age: number;
  title: string;
  description: string;
  testimonial: string;
}

const timeline: TimelineItem[] = [
  {
    year: '2019',
    age: 6,
    title: 'Started Learning to Code',
    description: 'Discovered programming and fell in love with building things from scratch.',
    testimonial: '"The moment I made the computer do what I told it to do, I was hooked. This was magic."',
  },
  {
    year: '2020',
    age: 7,
    title: 'Built First LMMS Projects',
    description: 'Created small music production projects, learning audio programming fundamentals.',
    testimonial: '"Music taught me about patterns, timing, and how complex systems work together."',
  },
  {
    year: '2021',
    age: 8,
    title: 'Launched macedge.in',
    description: 'First major production website. Learned the difference between hobby code and production code.',
    testimonial: '"Shipping something real changed everything. Users don\'t care about perfect code—they care if it works."',
  },
  {
    year: '2022',
    age: 9,
    title: 'Explored Linux & Security',
    description: 'Dove deep into Linux systems and cybersecurity fundamentals.',
    testimonial: '"Understanding how systems work under the hood fundamentally changed how I write software."',
  },
  {
    year: '2023',
    age: 10,
    title: 'Mastered Linux, Started Building for Clients',
    description: 'Achieved proficiency in Linux and security, began taking on real client projects.',
    testimonial: '"Building for others taught me what \'production-ready\' actually means."',
  },
  {
    year: '2024',
    age: 11,
    title: 'Launched archive360.co',
    description: 'Major production app with real users and real stakes. Full-stack development.',
    testimonial: '"This project taught me more than the previous five years of tutorials combined."',
  },
  {
    year: '2025',
    age: 12,
    title: 'Co-launched thefragrancesstory.com',
    description: 'E-commerce platform for fragrance business. Complex inventory and payment systems.',
    testimonial: '"Real-world constraints force you to make better engineering decisions."',
  },
  {
    year: '2026',
    age: 13,
    title: 'Launched careerflow-ai.org.in',
    description: 'AI-powered career planning platform. Modern full-stack with AI integration.',
    testimonial: '"AI is the future, but the fundamentals—clean code, good UX, reliability—never change."',
  },
];

export function TimelineSection() {
  return (
    <section id="timeline" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-sm uppercase tracking-wide text-secondary mb-2">
            The Journey
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            7 Years of Building
          </h2>
          <p className="text-xl text-secondary">
            From age 6 to 13, here's how I learned to build production software.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          {/* Timeline items */}
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div
                key={item.year}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Year badge */}
                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-surface border-2 border-accent flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-sm font-bold text-primary">
                      {item.year}
                    </div>
                    <div className="text-xs text-secondary">Age {item.age}</div>
                  </div>
                </div>

                {/* Content card */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} ml-24 md:ml-0`}>
                  <Card>
                    <h3 className="text-2xl font-serif font-semibold text-primary mb-2">
                      {item.title}
                    </h3>
                    <p className="text-secondary mb-4">{item.description}</p>
                    <blockquote className="border-l-4 border-accent pl-4 italic text-secondary">
                      {item.testimonial}
                    </blockquote>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Test TimelineSection rendering**

Run: `npm run dev`
Navigate to: http://localhost:3000
Expected: Timeline section renders with alternating layout

- [ ] **Step 3: Commit Timeline section**

```bash
git add components/sections/TimelineSection.tsx
git commit -m "feat: add Timeline section with journey milestones"
```

---

## Task 9: Create Philosophy Section

**Goal:** Build the PhilosophySection component with editorial typography

**Files:**
- Create: `components/sections/PhilosophySection.tsx`

- [ ] **Step 1: Create PhilosophySection component**

```typescript
// components/sections/PhilosophySection.tsx
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
```

- [ ] **Step 2: Test PhilosophySection rendering**

Run: `npm run dev`
Navigate to: http://localhost:3000
Expected: Philosophy section renders with editorial typography

- [ ] **Step 3: Commit Philosophy section**

```bash
git add components/sections/PhilosophySection.tsx
git commit -m "feat: add Philosophy section with core principles"
```

---

## Task 10: Create Smooth Scroll Component

**Goal:** Implement Lenis smooth scrolling provider

**Files:**
- Create: `components/animations/SmoothScroll.tsx`

- [ ] **Step 1: Create SmoothScroll provider component**

```typescript
// components/animations/SmoothScroll.tsx
'use client';

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Animation loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 2: Integrate SmoothScroll into root layout**

```typescript
// Modify app/layout.tsx - add SmoothScroll wrapper
import { SmoothScroll } from '@/components/animations/SmoothScroll';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} antialiased`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Test smooth scrolling**

Run: `npm run dev`
Navigate to: http://localhost:3000
Scroll the page
Expected: Smooth, eased scrolling behavior

- [ ] **Step 4: Commit smooth scroll implementation**

```bash
git add components/animations/SmoothScroll.tsx app/layout.tsx
git commit -m "feat: add Lenis smooth scrolling"
```

---

## Task 11: Create GSAP Animation Utilities

**Goal:** Build reusable GSAP animation helpers and ScrollReveal component

**Files:**
- Create: `lib/animations.ts`
- Create: `components/animations/ScrollReveal.tsx`

- [ ] **Step 1: Create animation utilities**

```typescript
// lib/animations.ts
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Fade in from bottom animation
 */
export function fadeInUp(
  element: HTMLElement | string,
  options: gsap.TweenVars = {}
) {
  return gsap.from(element, {
    opacity: 0,
    y: 60,
    duration: 1,
    ease: 'power3.out',
    ...options,
  });
}

/**
 * Fade in with scale animation
 */
export function fadeInScale(
  element: HTMLElement | string,
  options: gsap.TweenVars = {}
) {
  return gsap.from(element, {
    opacity: 0,
    scale: 0.9,
    duration: 1,
    ease: 'power3.out',
    ...options,
  });
}

/**
 * Stagger animation for lists
 */
export function staggerFadeIn(
  elements: HTMLElement[] | string,
  options: gsap.TweenVars = {}
) {
  return gsap.from(elements, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.1,
    ...options,
  });
}

/**
 * Parallax effect
 */
export function parallax(
  element: HTMLElement | string,
  speed: number = 0.5,
  options: ScrollTrigger.Vars = {}
) {
  return gsap.to(element, {
    y: (i, target) => {
      return -ScrollTrigger.maxScroll(window) * speed;
    },
    ease: 'none',
    scrollTrigger: {
      start: 'top top',
      end: 'max',
      invalidateOnRefresh: true,
      scrub: 0,
      ...options,
    },
  });
}

/**
 * Reveal on scroll
 */
export function revealOnScroll(
  element: HTMLElement | string,
  options: ScrollTrigger.Vars = {}
) {
  return gsap.from(element, {
    opacity: 0,
    y: 60,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'top 20%',
      toggleActions: 'play none none none',
      ...options,
    },
  });
}
```

- [ ] **Step 2: Create ScrollReveal wrapper component**

```typescript
// components/animations/ScrollReveal.tsx
'use client';

import { useEffect, useRef } from 'react';
import { revealOnScroll } from '@/lib/animations';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function ScrollReveal({ children, delay = 0, className }: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const animation = revealOnScroll(elementRef.current, {
      delay,
    });

    return () => {
      animation.kill();
    };
  }, [delay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Test ScrollReveal component**

Add to a test page temporarily to verify behavior

- [ ] **Step 4: Commit animation utilities**

```bash
git add lib/animations.ts components/animations/ScrollReveal.tsx
git commit -m "feat: add GSAP animation utilities and ScrollReveal component"
```

---

## Task 12: Create Three.js Scene Wrapper

**Goal:** Build base Scene component for all Three.js experiences

**Files:**
- Create: `components/three/Scene.tsx`

- [ ] **Step 1: Create Scene wrapper component**

```typescript
// components/three/Scene.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

interface SceneProps {
  children: React.ReactNode;
  className?: string;
  camera?: {
    position?: [number, number, number];
    fov?: number;
  };
}

export function Scene({ children, className = '', camera }: SceneProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{
          position: camera?.position || [0, 0, 5],
          fov: camera?.fov || 75,
        }}
        gl={{
          antialias: true,
          alpha: true,
        }}
        dpr={[1, 2]} // Device pixel ratio (1x for mobile, 2x for retina)
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 2: Commit Scene wrapper**

```bash
git add components/three/Scene.tsx
git commit -m "feat: add Three.js Scene wrapper component"
```

---

## Task 13: Create GeometricHero Component

**Goal:** Build 3D geometric mesh for hero section

**Files:**
- Create: `components/three/GeometricHero.tsx`

- [ ] **Step 1: Create GeometricHero component**

```typescript
// components/three/GeometricHero.tsx
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function GeometricHero() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Rotate and animate mesh
  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Slow rotation
    meshRef.current.rotation.x = time * 0.1;
    meshRef.current.rotation.y = time * 0.15;

    // Subtle floating motion
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.3;
  });

  return (
    <group>
      {/* Ambient light */}
      <ambientLight intensity={0.5} />
      
      {/* Directional light */}
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Geometric mesh */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[2, 1]} />
        <MeshDistortMaterial
          color="#166534"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Background spheres for depth */}
      <mesh position={[-3, 2, -2]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#E7E5E4" opacity={0.3} transparent />
      </mesh>

      <mesh position={[3, -2, -3]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="#5F5F5F" opacity={0.2} transparent />
      </mesh>
    </group>
  );
}
```

- [ ] **Step 2: Integrate GeometricHero into HeroSection**

```typescript
// Modify components/sections/HeroSection.tsx - add 3D background
'use client';

import { Scene } from '@/components/three/Scene';
import { GeometricHero } from '@/components/three/GeometricHero';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-gradient-to-b from-background to-surface">
      {/* 3D Background */}
      <Scene className="opacity-30">
        <GeometricHero />
      </Scene>

      {/* Existing hero content */}
      {/* ... rest of the component ... */}
    </section>
  );
}
```

- [ ] **Step 3: Test GeometricHero rendering**

Run: `npm run dev`
Navigate to: http://localhost:3000
Expected: Animated 3D geometric mesh in hero section

- [ ] **Step 4: Commit GeometricHero**

```bash
git add components/three/GeometricHero.tsx components/sections/HeroSection.tsx
git commit -m "feat: add 3D geometric mesh to hero section"
```

---

## Task 14: Create ParticleField Component

**Goal:** Build interactive particle system for Work section

**Files:**
- Create: `components/three/ParticleField.tsx`

- [ ] **Step 1: Create ParticleField component**

```typescript
// components/three/ParticleField.tsx
'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
}

export function ParticleField({ count = 1000 }: ParticleFieldProps) {
  const points = useRef<THREE.Points>(null);

  // Generate random particle positions
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
    }
    
    return positions;
  }, [count]);

  // Animate particles
  useFrame((state) => {
    if (!points.current) return;

    const time = state.clock.getElapsedTime();
    
    // Rotate entire particle field
    points.current.rotation.y = time * 0.05;
    
    // Wave motion
    const positions = points.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = positions.array[i3];
      const z = positions.array[i3 + 2];
      
      (positions.array as Float32Array)[i3 + 1] = 
        Math.sin(x * 0.3 + time) * 0.5 + 
        Math.cos(z * 0.3 + time) * 0.5;
    }
    positions.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#166534"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}
```

- [ ] **Step 2: Test ParticleField rendering**

Add to WorkSection temporarily to verify

- [ ] **Step 3: Commit ParticleField**

```bash
git add components/three/ParticleField.tsx
git commit -m "feat: add interactive particle field component"
```

---

## Task 15: Create DepthLayers Component

**Goal:** Build parallax depth layers for Skills section

**Files:**
- Create: `components/three/DepthLayers.tsx`

- [ ] **Step 1: Create DepthLayers component**

```typescript
// components/three/DepthLayers.tsx
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function DepthLayers() {
  const layer1 = useRef<THREE.Mesh>(null);
  const layer2 = useRef<THREE.Mesh>(null);
  const layer3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const mouseX = state.mouse.x * 0.5;
    const mouseY = state.mouse.y * 0.5;

    // Parallax effect based on mouse position
    if (layer1.current) {
      layer1.current.rotation.x = mouseY * 0.3;
      layer1.current.rotation.y = mouseX * 0.3;
    }
    
    if (layer2.current) {
      layer2.current.rotation.x = mouseY * 0.2;
      layer2.current.rotation.y = mouseX * 0.2;
    }
    
    if (layer3.current) {
      layer3.current.rotation.x = mouseY * 0.1;
      layer3.current.rotation.y = mouseX * 0.1;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />

      {/* Layer 1 - Closest */}
      <mesh ref={layer1} position={[0, 0, 0]}>
        <planeGeometry args={[6, 6, 20, 20]} />
        <meshStandardMaterial
          color="#E7E5E4"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Layer 2 - Middle */}
      <mesh ref={layer2} position={[0, 0, -2]}>
        <planeGeometry args={[8, 8, 15, 15]} />
        <meshStandardMaterial
          color="#5F5F5F"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Layer 3 - Farthest */}
      <mesh ref={layer3} position={[0, 0, -4]}>
        <planeGeometry args={[10, 10, 10, 10]} />
        <meshStandardMaterial
          color="#166534"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  );
}
```

- [ ] **Step 2: Test DepthLayers rendering**

Add to a test section to verify parallax behavior

- [ ] **Step 3: Commit DepthLayers**

```bash
git add components/three/DepthLayers.tsx
git commit -m "feat: add depth layers component with parallax effect"
```

---

## Task 16: Create Contact Form API Route

**Goal:** Build API route to handle contact form submissions with email service

**Files:**
- Create: `app/api/contact/route.ts`
- Create: `lib/email.ts`

- [ ] **Step 1: Create email service wrapper**

```typescript
// lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = 'onboarding@resend.dev'; // Resend's test email
const TO_EMAIL = 'iamvishensharma@gmail.com';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

/**
 * Send contact form email
 */
export async function sendContactEmail(data: ContactFormData) {
  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `Portfolio Contact: ${data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: String(error) };
  }
}
```

- [ ] **Step 2: Create contact API route**

```typescript
// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';
import { contactSchema } from '@/lib/schemas/contact';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body
    const result = contactSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: result.error.flatten() },
        { status: 400 }
      );
    }

    // Send email
    const emailResult = await sendContactEmail(result.data);

    if (!emailResult.success) {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 3: Update ContactSection to use API route**

```typescript
// Modify components/sections/ContactSection.tsx

async function onSubmit(data: ContactFormData) {
  setFormState('submitting');

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    setFormState('success');
    reset();

    // Reset to idle after 5 seconds
    setTimeout(() => setFormState('idle'), 5000);
  } catch (error) {
    console.error('Form submission error:', error);
    setFormState('error');
  }
}
```

- [ ] **Step 4: Add RESEND_API_KEY to .env.local**

```bash
# .env.local
RESEND_API_KEY=your_resend_api_key_here
```

Note: User needs to sign up for Resend and get API key

- [ ] **Step 5: Test contact form submission**

Run: `npm run dev`
Fill out and submit contact form
Expected: Email sent successfully, success message displayed

- [ ] **Step 6: Commit contact API route**

```bash
git add app/api/contact/route.ts lib/email.ts components/sections/ContactSection.tsx
git commit -m "feat: add contact form API route with email service"
```

---

## Task 17: Create ISR Revalidation Webhook

**Goal:** Build webhook endpoint for on-demand GitHub data revalidation

**Files:**
- Create: `app/api/revalidate/route.ts`

- [ ] **Step 1: Create revalidate API route**

```typescript
// app/api/revalidate/route.ts
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { secret, path } = body;

    // Verify secret token
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: 'Invalid secret' },
        { status: 401 }
      );
    }

    // Revalidate specified path or homepage by default
    const targetPath = path || '/';
    revalidatePath(targetPath);

    return NextResponse.json({
      success: true,
      revalidated: true,
      path: targetPath,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: Support GET requests for manual testing
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const path = searchParams.get('path') || '/';

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { error: 'Invalid secret' },
      { status: 401 }
    );
  }

  revalidatePath(path);

  return NextResponse.json({
    success: true,
    revalidated: true,
    path,
    timestamp: new Date().toISOString(),
  });
}
```

- [ ] **Step 2: Add REVALIDATE_SECRET to .env.local**

```bash
# .env.local
REVALIDATE_SECRET=your_random_secret_here
```

Generate secret: `openssl rand -base64 32`

- [ ] **Step 3: Test revalidation endpoint**

Run: `npm run dev`
Test with: `curl -X POST http://localhost:3000/api/revalidate -H "Content-Type: application/json" -d '{"secret":"your_secret","path":"/"}'`
Expected: `{"success":true,"revalidated":true}`

- [ ] **Step 4: Document GitHub webhook setup in README**

Add instructions for setting up GitHub webhook to trigger revalidation

- [ ] **Step 5: Commit revalidation route**

```bash
git add app/api/revalidate/route.ts
git commit -m "feat: add ISR revalidation webhook for GitHub data"
```

---

## Task 18: Update Homepage with New Sections

**Goal:** Integrate all new sections into the main page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Update homepage to include all Phase 2 sections**

```typescript
// app/page.tsx
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { WorkSection } from '@/components/sections/WorkSection';
import { TimelineSection } from '@/components/sections/TimelineSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { PhilosophySection } from '@/components/sections/PhilosophySection';
import { GitHubSection } from '@/components/sections/GitHubSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/Footer';
import { Suspense } from 'react';

// Revalidate every hour for GitHub data
export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <WorkSection />
        <TimelineSection />
        <SkillsSection />
        <PhilosophySection />
        
        <Suspense fallback={<div className="py-20">Loading GitHub data...</div>}>
          <GitHubSection />
        </Suspense>
        
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Update Navigation with new section links**

```typescript
// Modify components/Navigation.tsx - add Timeline, Philosophy, GitHub links
const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#timeline', label: 'Journey' },
  { href: '#skills', label: 'Skills' },
  { href: '#philosophy', label: 'Philosophy' },
  { href: '#github', label: 'GitHub' },
  { href: '#contact', label: 'Contact' },
];
```

- [ ] **Step 3: Test full homepage**

Run: `npm run dev`
Navigate to: http://localhost:3000
Expected: All sections render correctly, smooth scrolling works, 3D elements visible

- [ ] **Step 4: Commit homepage updates**

```bash
git add app/page.tsx components/Navigation.tsx
git commit -m "feat: integrate all Phase 2 sections into homepage"
```

---

## Task 19: Configure Playwright for E2E Tests

**Goal:** Set up Playwright and write E2E tests

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/e2e/home.spec.ts`
- Create: `tests/e2e/blog.spec.ts`
- Create: `tests/e2e/contact.spec.ts`

- [ ] **Step 1: Create Playwright configuration**

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

- [ ] **Step 2: Create homepage E2E test**

```typescript
// tests/e2e/home.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should display hero section', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.getByRole('heading', { name: /Vishen Sharma/i })).toBeVisible();
    await expect(page.getByText(/Self-Taught 13 year-old Developer/i)).toBeVisible();
  });

  test('should navigate to all sections', async ({ page }) => {
    await page.goto('/');
    
    // Test navigation links
    await page.click('text=Journey');
    await expect(page.locator('#timeline')).toBeInViewport();
    
    await page.click('text=Skills');
    await expect(page.locator('#skills')).toBeInViewport();
    
    await page.click('text=Contact');
    await expect(page.locator('#contact')).toBeInViewport();
  });

  test('should display work projects', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.getByText('CareerFlow AI')).toBeVisible();
    await expect(page.getByText('Archive360')).toBeVisible();
    await expect(page.getByText('Macedge')).toBeVisible();
  });

  test('should display GitHub stats', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.getByText(/Repositories/i)).toBeVisible();
    await expect(page.getByText(/Stars/i)).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Test mobile menu
    await page.click('[aria-label="Toggle menu"]');
    await expect(page.getByRole('navigation')).toBeVisible();
  });
});
```

- [ ] **Step 3: Create blog E2E test**

```typescript
// tests/e2e/blog.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Blog', () => {
  test('should display blog index', async ({ page }) => {
    await page.goto('/blog');
    
    await expect(page.getByRole('heading', { name: /Writing/i })).toBeVisible();
    await expect(page.getByText(/learning-journey/i)).toBeVisible();
  });

  test('should navigate to blog post', async ({ page }) => {
    await page.goto('/blog');
    
    await page.click('text=My 7-Year Journey');
    
    await expect(page).toHaveURL(/\/blog\/learning-journey/);
    await expect(page.getByRole('heading', { name: /My 7-Year Journey/i })).toBeVisible();
  });

  test('should display MDX content correctly', async ({ page }) => {
    await page.goto('/blog/learning-journey');
    
    // Check for MDX-rendered content
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('p')).toHaveCount.greaterThan(3);
  });

  test('should navigate back to blog index', async ({ page }) => {
    await page.goto('/blog/learning-journey');
    
    await page.click('text=Back to Blog');
    
    await expect(page).toHaveURL('/blog');
  });
});
```

- [ ] **Step 4: Create contact form E2E test**

```typescript
// tests/e2e/contact.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('should display contact form', async ({ page }) => {
    await page.goto('/');
    
    await page.click('text=Contact');
    
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/message/i)).toBeVisible();
  });

  test('should show validation errors', async ({ page }) => {
    await page.goto('/#contact');
    
    await page.click('button:has-text("Send Message")');
    
    await expect(page.getByText(/name must be at least 2 characters/i)).toBeVisible();
  });

  test('should submit form successfully', async ({ page }) => {
    await page.goto('/#contact');
    
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'This is a test message for E2E testing.');
    
    await page.click('button:has-text("Send Message")');
    
    // Note: This will actually send an email in production
    await expect(page.getByText(/message sent/i)).toBeVisible({ timeout: 10000 });
  });

  test('should display contact links', async ({ page }) => {
    await page.goto('/#contact');
    
    await expect(page.getByRole('link', { name: /iamvishensharma@gmail.com/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /github/i })).toBeVisible();
  });
});
```

- [ ] **Step 5: Add E2E test script to package.json**

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:report": "playwright show-report"
  }
}
```

- [ ] **Step 6: Run E2E tests**

Run: `npm run test:e2e`
Expected: All E2E tests pass

- [ ] **Step 7: Commit E2E tests**

```bash
git add playwright.config.ts tests/e2e/ package.json
git commit -m "feat: add Playwright E2E tests for homepage, blog, and contact"
```

---

## Task 20: Performance Optimization & Production Build

**Goal:** Optimize bundle size, configure performance settings, verify production build

**Files:**
- Modify: `next.config.js`
- Create: `.env.production.local` (template)

- [ ] **Step 1: Update Next.js config for production optimizations**

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: true,
  },
  
  // Bundle analyzer (optional, enable when needed)
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
  //     config.plugins.push(
  //       new BundleAnalyzerPlugin({
  //         analyzerMode: 'static',
  //         openAnalyzer: false,
  //       })
  //     );
  //   }
  //   return config;
  // },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Headers for security and caching
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

- [ ] **Step 2: Create production environment template**

```bash
# .env.production.local (template - user fills in actual values)
GITHUB_TOKEN=
RESEND_API_KEY=
REVALIDATE_SECRET=
```

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: Build succeeds with no errors, bundle analysis shows optimized sizes

- [ ] **Step 4: Test production build locally**

Run: `npm run start`
Navigate to: http://localhost:3000
Expected: All features work correctly, performance is smooth

- [ ] **Step 5: Run Lighthouse audit**

Open Chrome DevTools → Lighthouse → Run audit
Expected: Performance 90+, Accessibility 90+, Best Practices 90+, SEO 90+

- [ ] **Step 6: Commit production optimizations**

```bash
git add next.config.js .env.production.local
git commit -m "feat: add production optimizations and performance tuning"
```

---

## Task 21: Update README with Phase 2 Documentation

**Goal:** Document all Phase 2 features, setup, and deployment instructions

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Update README with Phase 2 information**

Add sections for:
- Updated feature list (3D components, animations, blog, GitHub integration)
- Environment variables required (GITHUB_TOKEN, RESEND_API_KEY, REVALIDATE_SECRET)
- MDX blog usage and content structure
- GitHub webhook setup instructions
- Playwright E2E test instructions
- Performance optimization notes
- Updated tech stack with Three.js, GSAP, Lenis, MDX

- [ ] **Step 2: Commit README updates**

```bash
git add README.md
git commit -m "docs: update README with Phase 2 features and setup instructions"
```

---

## Self-Review Checklist

After completing all tasks, verify:

1. **Spec Coverage:**
   - [ ] MDX blog system (index + individual posts) ✓
   - [ ] GitHub API integration (stats, repos, activity) ✓
   - [ ] 3D components (GeometricHero, ParticleField, DepthLayers) ✓
   - [ ] Smooth scrolling with Lenis ✓
   - [ ] GSAP scroll animations ✓
   - [ ] Timeline section with milestones ✓
   - [ ] Philosophy section ✓
   - [ ] Contact form API with email service ✓
   - [ ] ISR revalidation webhook ✓
   - [ ] E2E tests with Playwright ✓

2. **No Placeholders:**
   - [ ] All code blocks contain actual implementation
   - [ ] No "TBD", "TODO", or "implement later"
   - [ ] All test blocks have actual test code
   - [ ] All imports and types are defined

3. **Type Consistency:**
   - [ ] GitHub types match across files
   - [ ] MDX types consistent
   - [ ] Three.js prop types correct

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-12-premium-portfolio-phase2.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
