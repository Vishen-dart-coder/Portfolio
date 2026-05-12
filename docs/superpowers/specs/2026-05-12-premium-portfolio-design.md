# Premium Portfolio Website - Design Specification

**Project:** Premium Portfolio + Blog Website for Vishen Sharma  
**Date:** May 12, 2026  
**Version:** 1.0  
**Status:** Approved for Implementation

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Project Goals](#project-goals)
3. [User Profile](#user-profile)
4. [Architecture & Tech Stack](#architecture--tech-stack)
5. [Component Structure & Design System](#component-structure--design-system)
6. [Page Layouts & User Flows](#page-layouts--user-flows)
7. [Performance & Optimization](#performance--optimization)
8. [Error Handling & Edge Cases](#error-handling--edge-cases)
9. [Testing Strategy](#testing-strategy)
10. [Deployment & Maintenance](#deployment--maintenance)
11. [Success Metrics](#success-metrics)

---

## Executive Summary

A premium, award-level portfolio website for Vishen Sharma, a self-taught 13-year-old developer with 7 years of experience building production software. The site showcases exceptional design quality, advanced 3D scroll interactions, and a comprehensive GitHub integration, targeting senior-level recruiters and potential clients.

**Core Requirements:**
- Premium aesthetic (editorial, minimal, polished, timeless)
- Hybrid 3D experience (geometric hero, depth layers, interactive particles)
- MDX-powered blog for journey/experience content
- Comprehensive GitHub profile integration
- Production-quality implementation (Lighthouse 90+, 60fps animations)
- Full contact suite with form + social links

**Target Audience:**
- Tech recruiters (primary)
- Potential clients
- Fellow developers
- Future collaborators

---

## Project Goals

### Primary Goals

1. **Communicate Elite Craftsmanship**  
   The website should immediately signal "This person builds world-class products" through design quality, attention to detail, and technical execution.

2. **Tell the Journey Story**  
   Showcase a 7-year journey from age 6 to 13, highlighting growth, real production projects, and mature technical thinking.

3. **Demonstrate Technical Range**  
   Prove mastery of modern web stack through the implementation itself: advanced animations, 3D graphics, performance optimization, and clean architecture.

4. **Enable Opportunities**  
   Make it effortless for recruiters and clients to understand the value proposition and initiate contact.

### Secondary Goals

1. Build an MDX blog platform for sharing knowledge and experiences
2. Create a reusable, maintainable codebase that can evolve over time
3. Establish a premium personal brand in the developer community
4. Showcase real production work (careerflow-ai, archive360, macedge, thefragrancesstory)

---

## User Profile

**Name:** Vishen Sharma  
**Age:** 13 years old  
**Title:** Self-Taught Developer  
**Email:** iamvishensharma@gmail.com  
**GitHub:** Vishen-dart-coder

### Development Journey

- **2019 (Age 6):** Started learning to code
- **2020:** Built small LMMS projects
- **2021:** Launched macedge.in (first major site)
- **2022:** Explored Linux and security
- **2023:** Mastered Linux/security, started building for clients
- **2024:** Launched archive360.co
- **2025:** Co-launched thefragrancesstory.com
- **2026:** Launched careerflow-ai.org.in

### Tech Stack

**Frontend:**
- React
- Next.js
- TypeScript
- Tailwind CSS

**Backend:**
- Node.js
- Python
- Databases

**Tools & Platform:**
- Git
- Vercel
- Firebase

**Design:**
- Figma
- UI/UX

### Core Philosophy

> "I believe great developers aren't defined by where they started, but by how relentlessly they keep learning and building. Technology changes constantly, so adaptability, curiosity, and execution matter more than chasing perfection. Build real things, stay uncomfortable, and focus on creating work that genuinely helps people."

**Key Themes:**
- Learning by building real solutions
- Production-quality over shortcuts
- Consistency and curiosity over credentials
- Systems thinking and holistic product development
- Resourcefulness and adaptability

---

## Architecture & Tech Stack

### Architectural Decision: Monolithic Next.js App

**Why this approach:**
- Simplest to maintain as a solo developer
- Excellent performance with App Router SSG
- Easy to iterate and add blog posts
- Single codebase, single deployment
- Best DX for long-term maintenance

**Rejected alternatives:**
- Headless CMS: Unnecessary complexity for personal blog
- Micro-frontend: Fragmented experience, multiple deployments

### Directory Structure

```
portfolio-website/
├── app/                          # Next.js 15 App Router
│   ├── (home)/                  # Home page group
│   │   ├── page.tsx             # Main landing
│   │   └── layout.tsx           # Home-specific layout
│   ├── blog/                    # Blog section
│   │   ├── page.tsx             # Blog index
│   │   ├── [slug]/              # Individual posts
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── work/                    # Project showcases
│   │   ├── page.tsx
│   │   └── [project]/
│   │       └── page.tsx
│   ├── api/                     # API routes
│   │   ├── contact/route.ts     # Contact form handler
│   │   └── revalidate/route.ts  # On-demand revalidation
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── error.tsx                # Global error boundary
│   └── not-found.tsx            # 404 page
├── components/                   # React components
│   ├── three/                   # 3D components
│   │   ├── GeometricHero.tsx
│   │   ├── ParticleField.tsx
│   │   └── DepthLayers.tsx
│   ├── sections/                # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── WorkSection.tsx
│   │   ├── BlogSection.tsx
│   │   ├── TimelineSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── PhilosophySection.tsx
│   │   ├── GitHubSection.tsx
│   │   └── ContactSection.tsx
│   ├── ui/                      # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   └── AnimatedText.tsx
│   ├── animations/              # Animation wrappers
│   │   ├── ScrollReveal.tsx
│   │   └── ParallaxText.tsx
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── SmoothScroll.tsx
│   └── PageTransition.tsx
├── content/                     # MDX blog posts
│   └── blog/
│       ├── my-first-post.mdx
│       └── learning-journey.mdx
├── lib/                         # Utilities
│   ├── github.ts               # GitHub API client
│   ├── mdx.ts                  # MDX processing
│   ├── animations.ts           # Animation utilities
│   ├── design-tokens.ts        # Design system tokens
│   └── utils.ts                # General utilities
├── public/                      # Static assets
│   ├── images/
│   ├── projects/
│   └── fonts/
├── tests/                       # Test files
│   ├── e2e/
│   └── unit/
├── .env.local                   # Local env variables
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### Tech Stack

#### Framework & Core
- **Next.js 15** (App Router with React Server Components)
- **React 19** (Latest concurrent features)
- **TypeScript 5** (Strict mode enabled)
- **Vercel** (Deployment platform)

**Why Next.js 15 App Router:**
- Built-in performance optimizations (automatic code splitting, image optimization)
- Server Components reduce client-side JavaScript
- Streaming SSR for faster TTFB
- Integrated with Vercel for zero-config deployment
- Native TypeScript support
- File-system based routing

#### Styling
- **Tailwind CSS 4** (Utility-first CSS)
- **CSS Variables** (Dynamic theming)
- **Geist** (UI typography - Vercel's font)
- **Source Serif 4** (Editorial typography)

**Why Tailwind CSS:**
- Rapid development without CSS file switching
- Consistent design tokens
- Excellent tree-shaking (only used classes shipped)
- Great DX with VS Code Intellisense
- Easy responsive design

#### 3D & Animation
- **React Three Fiber** + **Three.js** (3D rendering)
- **@react-three/drei** (Three.js helpers)
- **@react-three/postprocessing** (Visual effects)
- **Framer Motion** (Component animations)
- **GSAP** + **ScrollTrigger** (Scroll-linked animations)
- **Lenis** (Smooth scrolling)

**Why this animation stack:**
- React Three Fiber: Declarative Three.js for React
- GSAP: Industry standard, performant timeline animations
- Framer Motion: Best-in-class React animation library
- Lenis: Smoothest scroll implementation available

#### Content & Data
- **MDX** (Blog content with @next/mdx)
- **Gray-matter** (Frontmatter parsing)
- **Octokit** (GitHub REST API client)
- **React Hook Form** + **Zod** (Form validation)

**Why MDX:**
- Write blog posts in Markdown with JSX components
- Type-safe with TypeScript
- Zero-runtime cost (compiled at build)
- Easy to version control

#### Developer Tools
- **ESLint** (Linting)
- **Prettier** (Code formatting)
- **Jest** + **React Testing Library** (Unit & integration tests)
- **Playwright** (E2E tests)
- **Bundle Analyzer** (Bundle optimization)

### Data Flow Architecture

#### GitHub Integration Flow

**Why this approach:**  
ISR (Incremental Static Regeneration) with on-demand revalidation provides the best balance of fresh data and performance.

```
┌─────────────────────────────────────────────────────┐
│ 1. Build Time (Initial)                             │
│    - Fetch GitHub data via Octokit                  │
│    - Generate static page with data                 │
│    - Cache for 1 hour (revalidate: 3600)           │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ 2. Runtime (User Visits)                            │
│    - Serve cached static page (instant)            │
│    - If cache expired, regenerate in background    │
│    - Show stale data while regenerating            │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ 3. On-Demand Revalidation (Optional)                │
│    - GitHub webhook triggers on push                │
│    - Call /api/revalidate?secret=xxx                │
│    - Immediately regenerate homepage               │
└─────────────────────────────────────────────────────┘
```

**Implementation:**
```typescript
// lib/github.ts
import { Octokit } from '@octokit/rest';
import { cache } from 'react';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export const getGitHubData = cache(async () => {
  try {
    const [user, repos, events] = await Promise.all([
      octokit.users.getByUsername({ username: 'Vishen-dart-coder' }),
      octokit.repos.listForUser({ username: 'Vishen-dart-coder', per_page: 100 }),
      octokit.activity.listPublicEventsForUser({ username: 'Vishen-dart-coder', per_page: 100 }),
    ]);
    
    return {
      profile: user.data,
      repositories: repos.data,
      activity: events.data,
      stats: calculateStats(repos.data, events.data),
    };
  } catch (error) {
    console.error('GitHub API error:', error);
    return getFallbackData(); // Use cached/stale data
  }
});

// app/page.tsx
export const revalidate = 3600; // 1 hour

export default async function HomePage() {
  const githubData = await getGitHubData();
  return <HomePage data={githubData} />;
}
```

#### Blog System Flow

**Why this approach:**  
Static generation at build time for maximum performance. Blog posts are pure content, no need for dynamic data.

```
┌─────────────────────────────────────────────────────┐
│ 1. Build Time                                       │
│    - Scan /content/blog/ directory                  │
│    - Parse MDX files with gray-matter               │
│    - Extract frontmatter (title, date, excerpt)     │
│    - Compile MDX to React components                │
│    - Generate static pages                          │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ 2. Runtime                                          │
│    - Serve pre-rendered HTML (instant)             │
│    - No API calls, no server computation           │
│    - Hydrate React for interactivity               │
└─────────────────────────────────────────────────────┘
```

**Content Structure:**
```markdown
---
title: "My Journey Learning Next.js"
date: "2026-05-12"
excerpt: "How I went from zero to building production apps in 6 months"
tags: ["next.js", "learning", "journey"]
author: "Vishen Sharma"
---

# Content starts here...
```

#### 3D Loading Strategy

**Why this approach:**  
Critical path optimization. Load hero 3D immediately, lazy-load everything else to keep initial bundle small.

```
┌─────────────────────────────────────────────────────┐
│ 1. Initial Load (Critical Path)                     │
│    - GeometricHero component loads immediately      │
│    - Small bundle (~50kb for hero 3D)              │
│    - User sees 3D within 1-2 seconds               │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ 2. Scroll-Based Lazy Loading                       │
│    - Intersection Observer detects section entry    │
│    - Dynamic import triggers for that section       │
│    - ParticleField loads when Work section visible │
│    - DepthLayers loads when scrolled to             │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ 3. Performance Degradation                          │
│    - Detect device tier (high/medium/low)           │
│    - High: Full 3D experience                       │
│    - Medium: Reduced particle count, simpler mesh   │
│    - Low (mobile): No Three.js, CSS parallax only   │
└─────────────────────────────────────────────────────┘
```

---

## Component Structure & Design System

### Design Tokens

**Why design tokens:**  
Centralized values ensure consistency across the entire site. Changes propagate automatically. Type-safe with TypeScript.

```typescript
// lib/design-tokens.ts
export const tokens = {
  colors: {
    background: '#F8F7F4',    // Warm neutral base
    surface: '#FFFFFF',        // Pure white cards/surfaces
    primary: '#111111',        // Near black text
    secondary: '#5F5F5F',      // Medium gray secondary text
    border: '#E7E5E4',         // Subtle borders
    accent: '#166534',         // Forest green (used sparingly)
  },
  
  typography: {
    fontFamily: {
      ui: 'var(--font-geist)',
      serif: 'var(--font-source-serif)',
    },
    scale: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem',  // 60px
      '7xl': '4.5rem',   // 72px - Hero text only
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
    letterSpacing: {
      tight: '-0.02em',
      normal: '0',
      wide: '0.02em',
    },
  },
  
  spacing: {
    section: '10rem',      // Vertical spacing between sections
    container: '1280px',   // Max content width
    gutter: '2rem',        // Horizontal padding
  },
  
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
  
  animation: {
    duration: {
      fast: '200ms',
      normal: '400ms',
      slow: '600ms',
      slower: '1000ms',
    },
    easing: {
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',      // ease-in-out
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',  // bounce
      expo: 'cubic-bezier(0.16, 1, 0.3, 1)',       // expo-out (premium feel)
    },
  },
};
```

### Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8F7F4',
        surface: '#FFFFFF',
        primary: '#111111',
        secondary: '#5F5F5F',
        border: '#E7E5E4',
        accent: '#166534',
      },
      fontFamily: {
        sans: ['var(--font-geist)'],
        serif: ['var(--font-source-serif)'],
      },
      maxWidth: {
        container: '1280px',
      },
      spacing: {
        section: '10rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

### Component Hierarchy

#### Layout Components

**SmoothScroll** (`components/SmoothScroll.tsx`)
- Wraps entire app
- Implements Lenis smooth scrolling
- Integrates with GSAP ScrollTrigger
- Handles scroll events for animations

**Navigation** (`components/Navigation.tsx`)
- Minimal top navigation bar
- Logo + links (Work, Blog, Contact)
- Magnetic cursor interaction on hover
- Blur backdrop when scrolled
- Smooth scroll to sections

**Footer** (`components/Footer.tsx`)
- Contact CTA
- Social links (Email, GitHub)
- Copyright notice
- Subtle accent line

**PageTransition** (`components/PageTransition.tsx`)
- Cinematic page transitions
- Fade + scale effect
- Uses Framer Motion layout animations

#### Section Components

**HeroSection** (`components/sections/HeroSection.tsx`)
- Full-screen (100vh)
- 3D geometric mesh background
- Layered typography with depth
- Animated scroll indicator
- Pin + fade on scroll

**WorkSection** (`components/sections/WorkSection.tsx`)
- Horizontal scroll container (GSAP ScrollTrigger)
- Project cards with hover elevation
- Interactive particle field background
- Click card → navigate to project detail page

**BlogSection** (`components/sections/BlogSection.tsx`)
- 3-column grid layout (responsive: 1 col mobile, 2 col tablet)
- Blog cards with cover image
- Stagger reveal animation on scroll
- Depth layers (parallax on mouse movement)
- "View All Posts" CTA

**TimelineSection** (`components/sections/TimelineSection.tsx`)
- Vertical timeline (2019-2026)
- Progressive line drawing on scroll
- Milestone items fade in at checkpoints
- Testimonials float in synced with year
- Hover effect highlights quote

**SkillsSection** (`components/sections/SkillsSection.tsx`)
- Categorized skill grid (Frontend, Backend, Tools, Design)
- Tech badges with subtle hover tilt
- Cascade animation on scroll into view
- Color-coded by category

**PhilosophySection** (`components/sections/PhilosophySection.tsx`)
- Large editorial typography
- Pull quote with parallax effect
- Multi-paragraph body text
- Fades in progressively on scroll
- Background: subtle depth layers

**GitHubSection** (`components/sections/GitHubSection.tsx`)
- Stats dashboard (repos, stars, commits)
- Contribution graph (green squares)
- Pinned repositories grid
- Count-up animation on scroll into view
- "View Full Profile" link to GitHub

**ContactSection** (`components/sections/ContactSection.tsx`)
- Contact form (name, email, message)
- Magnetic focus effect on inputs
- Submit button with hover expansion
- Email + GitHub links
- Success/error states with animations

#### 3D Components

**GeometricHero** (`components/three/GeometricHero.tsx`)
- Abstract low-poly geometric mesh
- Soft lighting with ambient + directional lights
- Rotates based on mouse position
- Slow ambient rotation
- Post-processing: subtle bloom

**ParticleField** (`components/three/ParticleField.tsx`)
- Thousands of particles (adaptive count based on device)
- React to mouse movement
- React to project card proximity
- Depth-based sizing (perspective)
- Performance: instanced mesh

**DepthLayers** (`components/three/DepthLayers.tsx`)
- Multiple layered planes
- Parallax depth on scroll
- Ambient camera movement
- Soft gradients and lighting
- Used in transitions between sections

**Scene** (`components/three/Scene.tsx`)
- Shared Three.js canvas wrapper
- Camera configuration
- Renderer setup
- Post-processing pipeline
- Performance monitoring

#### UI Components

**Button** (`components/ui/Button.tsx`)
- Primary, secondary, ghost variants
- Magnetic hover effect (cursor pulls button slightly)
- Scale animation on click
- Loading state with spinner
- Disabled state

**Card** (`components/ui/Card.tsx`)
- Base card component
- Hover: elevation + shadow increase
- Smooth transition (400ms expo easing)
- Optional image/content slots
- Used for projects and blog posts

**Input** / **Textarea** (`components/ui/Input.tsx`, `components/ui/Textarea.tsx`)
- Form input fields
- Focus state: border color + scale
- Error state: red border + message
- Label animation on focus
- Accessible (proper ARIA labels)

**Badge** (`components/ui/Badge.tsx`)
- Tech stack tags
- Color variants (accent, neutral)
- Small, compact design
- Used in project cards and skills grid

**AnimatedText** (`components/ui/AnimatedText.tsx`)
- Text reveal on scroll
- Word-by-word or character-by-character animation
- Configurable delay and duration
- Uses Framer Motion

**LoadingSpinner** (`components/ui/LoadingSpinner.tsx`)
- Elegant loading indicator
- Used during form submission
- Used during 3D scene loading
- Smooth rotation animation

### Scroll Animation System

**GSAP ScrollTrigger Configuration**

Each section gets unique scroll behavior tailored to its content:

```typescript
// lib/animations.ts
export const scrollBehaviors = {
  hero: {
    type: 'pin-fade',
    config: {
      pin: true,
      scrub: 1,
      start: 'top top',
      end: '+=100%',
      // Hero pins, then fades out as user scrolls
    },
  },
  
  work: {
    type: 'horizontal-scroll',
    config: {
      trigger: '.work-section',
      horizontal: true,
      scrub: 1,
      pin: true,
      snap: 1 / 4, // Snap to cards
      // Horizontal scroll through project cards
    },
  },
  
  blog: {
    type: 'stagger-reveal',
    config: {
      trigger: '.blog-section',
      start: 'top 80%',
      stagger: 0.2,
      // Cards reveal in sequence
    },
  },
  
  timeline: {
    type: 'progressive-draw',
    config: {
      trigger: '.timeline-section',
      scrub: 1,
      // Timeline line draws as you scroll
      // Milestones fade in at checkpoints
    },
  },
  
  skills: {
    type: 'grid-cascade',
    config: {
      trigger: '.skills-section',
      start: 'top 70%',
      stagger: {
        grid: 'auto',
        from: 'start',
        amount: 0.5,
      },
      // Grid items cascade in
    },
  },
  
  philosophy: {
    type: 'parallax-text',
    config: {
      trigger: '.philosophy-section',
      scrub: 1,
      // Text layers move at different speeds
    },
  },
  
  contact: {
    type: 'magnetic-pull',
    config: {
      trigger: '.contact-section',
      start: 'top 80%',
      // Elements pull toward center on entry
    },
  },
};
```

**Key Interactions by Section:**

1. **Hero:** Geometric mesh rotates based on scroll velocity, typography fades and scales on scroll down
2. **Work:** Horizontal scroll with project cards, particles react to mouse and card proximity
3. **Blog:** Cards stagger reveal with depth, hover adds elevation and glow
4. **Timeline:** Vertical line draws progressively, items fade in at scroll checkpoints, testimonials sync with year
5. **Skills:** Grid items cascade in on intersection, subtle hover tilt on each badge
6. **Philosophy:** Large editorial text with multi-speed parallax layers
7. **GitHub:** Stats count up when scrolled into view, contribution graph animates in
8. **Contact:** Form fields have magnetic focus (pull toward cursor), button expands on hover

### Responsive Strategy

**Breakpoints:**
```typescript
sm: '640px'   // Mobile landscape
md: '768px'   // Tablet portrait
lg: '1024px'  // Laptop
xl: '1280px'  // Desktop
2xl: '1536px' // Large desktop
```

**3D Responsiveness:**

**Desktop (>1024px):**
- Full 3D experience
- High particle count (5000+)
- Post-processing effects (bloom, SSAO)
- 60fps target

**Tablet (768px - 1024px):**
- Simplified 3D
- Reduced particles (2000)
- Medium-poly mesh
- No post-processing
- 30fps acceptable

**Mobile (<768px):**
- **No Three.js loaded** (saves ~200kb bundle)
- CSS-based parallax instead
- Static hero image with subtle transform
- Smooth 60fps guaranteed

**Typography Scale Adjustments:**
```css
/* Mobile */
.hero-title {
  font-size: 2.25rem; /* 36px - 4xl */
}

/* Tablet */
@media (min-width: 768px) {
  .hero-title {
    font-size: 3rem; /* 48px - 5xl */
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .hero-title {
    font-size: 4.5rem; /* 72px - 7xl */
  }
}
```

**Layout Adjustments:**
- Work section: Horizontal scroll → vertical stack on mobile
- Blog grid: 3 columns → 2 columns (tablet) → 1 column (mobile)
- Timeline: Keep vertical on all breakpoints (works well)
- Skills grid: 4 columns → 2 columns (mobile)

---

## Page Layouts & User Flows

### Homepage Layout

Full single-page experience with scroll-based storytelling.

#### Section 1: Hero (100vh)

```
┌────────────────────────────────────────────┐
│ [Nav: Logo | Work | Blog | Contact]        │
│                                            │
│      [3D Geometric Mesh Background]        │
│                                            │
│            Vishen Sharma                   │
│       Self-Taught 13 year-old              │
│            Developer                       │
│                                            │
│   "Building production software since 6"   │
│                                            │
│          ↓ Scroll indicator                │
└────────────────────────────────────────────┘
```

**Interactions:**
- 3D mesh rotates subtly with mouse (lerp factor: 0.05)
- Typography has layered depth (foreground moves faster than background)
- Scroll indicator pulses gently (opacity 0.5 → 1)
- Section pins briefly, then fades on scroll down

**Implementation Notes:**
- Hero text uses Source Serif 4 for editorial feel
- 3D scene rendered in <Canvas> with transparent background
- Mouse tracking with `useThree()` hook
- GSAP ScrollTrigger pins section then fades

---

#### Section 2: Selected Work (Horizontal Scroll)

```
┌────────────────────────────────────────────┐
│  Selected Work                             │
│  ────                                      │
│                                            │
│  [Scroll horizontally to explore] →        │
│                                            │
│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐      │
│  │Career│  │Archive│  │Macedge│ │Frag │   │
│  │Flow │  │ 360 │  │ .in │  │Story│      │
│  │ AI  │  │     │  │     │  │     │      │
│  │[Img]│  │[Img]│  │[Img]│  │[Img]│      │
│  │     │  │     │  │     │  │     │      │
│  │AI/ML│  │SaaS │  │Biz  │  │Shop │      │
│  └─────┘  └─────┘  └─────┘  └─────┘      │
│  [Particle field reacts to cards]         │
└────────────────────────────────────────────┘
```

**Projects:**
1. **careerflow-ai.org.in** - AI-powered career platform
2. **archive360.co** - Document management SaaS
3. **macedge.in** - Business website
4. **thefragrancesstory.com** - E-commerce fragrance store

**Interactions:**
- Horizontal scroll triggered by vertical scroll (GSAP)
- Each card has hover: elevation (translateZ), glow (box-shadow)
- Particle field particles move toward hovered card
- Click card → navigate to `/work/[project-slug]`

**Implementation Notes:**
- Container is pinned while horizontal scroll happens
- Cards are in flexbox with `scroll-snap-type: x mandatory`
- ParticleField component uses Three.js instanced mesh
- Mouse position tracked, particles interpolate toward cursor

---

#### Section 3: Writing / Blog (3-Column Grid)

```
┌────────────────────────────────────────────┐
│  Latest Writing                            │
│  ────                                      │
│                                            │
│  ┌──────┐  ┌──────┐  ┌──────┐            │
│  │[Img] │  │[Img] │  │[Img] │            │
│  │      │  │      │  │      │            │
│  │Title │  │Title │  │Title │            │
│  │      │  │      │  │      │            │
│  │Excerpt│  │Excerpt│  │Excerpt│          │
│  │...   │  │...   │  │...   │            │
│  │      │  │      │  │      │            │
│  │5 min │  │8 min │  │3 min │            │
│  └──────┘  └──────┘  └──────┘            │
│                                            │
│         [View All Posts →]                 │
└────────────────────────────────────────────┘
```

**Interactions:**
- Cards stagger reveal on scroll (delay: 0.2s between cards)
- Depth layers: parallax on mouse movement
- Hover: scale(1.03), shadow increase, border color change
- Click card → navigate to `/blog/[slug]`

**Implementation Notes:**
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Cover images use `next/image` with blur placeholder
- Reading time calculated from word count
- Framer Motion for stagger animation

---

#### Section 4: Experience Timeline (Vertical)

```
┌────────────────────────────────────────────┐
│  Journey                                   │
│  ────                                      │
│                                            │
│   2019 ●────── Started learning to code    │
│        │       [Testimonial Quote]         │
│        │                                   │
│   2020 ●────── Built LMMS projects        │
│        │       [Quote]                     │
│        │                                   │
│   2021 ●────── Launched macedge.in        │
│        │       [Quote]                     │
│        │                                   │
│   2022 ●────── Linux & Security           │
│        │       [Quote]                     │
│        │                                   │
│   2023 ●────── Client work begins         │
│        │       [Quote]                     │
│        │                                   │
│   2024 ●────── Launched archive360.co     │
│        │       [Quote]                     │
│        │                                   │
│   2025 ●────── thefragrancesstory.com     │
│        │       [Quote]                     │
│        │                                   │
│   2026 ●────── careerflow-ai.org.in       │
│        │       [Quote]                     │
│                                            │
└────────────────────────────────────────────┘
```

**Timeline Data:**
- 2019 (age 6): Started learning to code
- 2020: Built small LMMS projects
- 2021: Launched macedge.in
- 2022: Explored Linux and security
- 2023: Mastered Linux/security, started client work
- 2024: Launched archive360.co
- 2025: Co-launched thefragrancesstory.com
- 2026: Launched careerflow-ai.org.in

**Interactions:**
- Vertical line draws as you scroll (SVG strokeDashoffset animation)
- Each milestone fades in when it reaches viewport center
- Testimonials float in from right, synced with year
- Hover on year: highlight quote with background color

**Implementation Notes:**
- Line is SVG path with GSAP drawSVG animation
- ScrollTrigger: each milestone has its own trigger point
- Testimonials positioned absolutely, animated with Framer Motion
- Mobile: smaller spacing, stack testimonials below milestones

---

#### Section 5: Technical Skills (Grid)

```
┌────────────────────────────────────────────┐
│  Technical Skills                          │
│  ────                                      │
│                                            │
│  Frontend                                  │
│  [React] [Next.js] [TypeScript] [Tailwind]│
│                                            │
│  Backend                                   │
│  [Node.js] [Python] [Databases]           │
│                                            │
│  Tools & Platform                          │
│  [Git] [Vercel] [Firebase]                │
│                                            │
│  Design                                    │
│  [Figma] [UI/UX]                          │
│                                            │
└────────────────────────────────────────────┘
```

**Skills Data:**
- Frontend: React, Next.js, TypeScript, Tailwind CSS
- Backend: Node.js, Python, Databases
- Tools: Git, Vercel, Firebase
- Design: Figma, UI/UX

**Interactions:**
- Grid items cascade in (stagger: 0.1s)
- Each badge has subtle hover tilt (rotateX: 5deg)
- Color-coded by category (Frontend: blue, Backend: green, Tools: purple, Design: orange)

**Implementation Notes:**
- Grid: `grid-cols-2 md:grid-cols-4`
- GSAP stagger animation on scroll into view
- Hover tilt uses CSS transform with transition
- Badges are reusable Badge component

---

#### Section 6: Philosophy (Editorial Typography)

```
┌────────────────────────────────────────────┐
│                                            │
│     "I believe great developers            │
│      aren't defined by where               │
│      they started, but by how              │
│      relentlessly they keep                │
│      learning and building."               │
│                                            │
│  ──────────────────────────────────────   │
│                                            │
│  [3-4 paragraphs of philosophy             │
│   in beautiful editorial typography]       │
│                                            │
│   • Learning by building                   │
│   • Production quality approach            │
│   • What drives development                │
│   • Future of web development              │
│                                            │
└────────────────────────────────────────────┘
```

**Philosophy Content:**

**Pull Quote:**
> "I believe great developers aren't defined by where they started, but by how relentlessly they keep learning and building."

**Body Sections:**

1. **Learning Philosophy:**
   Best way to learn is building things that solve real problems. Tutorials teach fundamentals, but real growth comes from debugging production issues and rewriting messy code. Being self-taught forced resourcefulness. Consistency and curiosity matter more than credentials.

2. **Production Quality Approach:**
   Build with maintainability in mind. Production quality means clean architecture over shortcuts, reliability over hype, performance and accessibility by default. Care about details like DX, edge cases, responsiveness. Shipping fast matters, but shipping responsibly matters more.

3. **What Drives Development:**
   Ability to turn ideas into reality. Coding gives leverage to create tools, solve problems, build experiences that reach people globally. Constant evolution of technology keeps work intellectually engaging. Going from concept to working system is still satisfying.

4. **Future of Web Development:**
   Moving toward higher abstraction, stronger AI integration, focus on developer velocity. Repetitive work will be automated, making fundamentals more important. Developers who understand architecture, systems thinking, UX, and problem solving will stand out. Line between engineer, designer, and product builder continues to blur.

**Interactions:**
- Large pull quote with parallax (moves slower than scroll)
- Body text fades in progressively (paragraph by paragraph)
- Background: subtle depth layers moving at different speeds

**Implementation Notes:**
- Pull quote: Source Serif 4, 3xl size, center-aligned
- Body text: Source Serif 4, lg size, max-width 65ch (readable line length)
- Parallax: GSAP ScrollTrigger with different scrub speeds per layer
- Mobile: reduce font sizes, remove parallax (performance)

---

#### Section 7: GitHub Stats (Dashboard)

```
┌────────────────────────────────────────────┐
│  GitHub Activity                           │
│  ────                                      │
│                                            │
│  ┌────────┐  ┌────────┐  ┌────────┐      │
│  │  42    │  │  156   │  │  1.2k  │      │
│  │ Repos  │  │ Stars  │  │Commits │      │
│  └────────┘  └────────┘  └────────┘      │
│                                            │
│  [Contribution Graph - green squares]     │
│                                            │
│  Pinned Repositories                       │
│  ┌──────────┐  ┌──────────┐              │
│  │ Repo 1   │  │ Repo 2   │              │
│  │ Desc...  │  │ Desc...  │              │
│  │ ⭐ 45 TS │  │ ⭐ 23 JS │              │
│  └──────────┘  └──────────┘              │
│                                            │
│  [View Full Profile on GitHub →]          │
└────────────────────────────────────────────┘
```

**Data Fetched:**
- User profile (name, bio, avatar)
- Total repos, followers, following
- Total stars across all repos
- Total commits (calculated from events)
- Contribution graph data
- Pinned repositories (or top 6 by stars if no pins)

**Interactions:**
- Stats count up on scroll into view (e.g., 0 → 42 for repos)
- Contribution graph squares fade in row by row
- Repo cards hover: elevation + border color change
- Click card → open GitHub repo in new tab

**Implementation Notes:**
- Data fetched at build time via Octokit
- Cached with ISR (revalidate: 3600)
- Count-up animation uses Framer Motion `useSpring`
- Contribution graph: SVG grid of squares
- Fallback to cached data if API fails

---

#### Section 8: Contact (Form + Links)

```
┌────────────────────────────────────────────┐
│  Let's Work Together                       │
│  ────                                      │
│                                            │
│  ┌──────────────────┐                     │
│  │ Name             │                     │
│  ├──────────────────┤                     │
│  │ Email            │                     │
│  ├──────────────────┤                     │
│  │ Message          │                     │
│  │                  │                     │
│  │                  │                     │
│  └──────────────────┘                     │
│                                            │
│  [Send Message]                            │
│                                            │
│  ──────── or ────────                     │
│                                            │
│  [iamvishensharma@gmail.com]               │
│  [github.com/Vishen-dart-coder]            │
│                                            │
└────────────────────────────────────────────┘
```

**Form Fields:**
- Name (required, 2-100 chars)
- Email (required, valid email format)
- Message (required, 10-1000 chars)

**Contact Links:**
- Email: iamvishensharma@gmail.com
- GitHub: Vishen-dart-coder

**Interactions:**
- Form fields have magnetic focus (cursor pulls input slightly)
- Submit button expands on hover (scale: 1.05)
- Success: elegant green banner + form reset
- Error: red banner with retry option
- Links have underline animation on hover

**Implementation Notes:**
- React Hook Form + Zod validation
- API route: `/api/contact` (sends email via service)
- Magnetic effect: track cursor position, apply transform
- Success/error states: Framer Motion AnimatePresence
- Mobile: full-width form, stack email/GitHub links

---

### Blog Index Page (`/blog`)

Full blog listing with search/filter (optional future enhancement).

```
┌────────────────────────────────────────────┐
│  [Nav]                                     │
│                                            │
│  Writing                                   │
│  Thoughts on development, learning,        │
│  and building products.                    │
│                                            │
│  ┌──────────────────────────────┐         │
│  │ [Cover Image]                │         │
│  │ Post Title Here              │         │
│  │ Excerpt text goes here...    │         │
│  │ May 12, 2026 • 5 min read    │         │
│  └──────────────────────────────┘         │
│                                            │
│  ┌──────────────────────────────┐         │
│  │ [Cover Image]                │         │
│  │ Another Post Title           │         │
│  │ Excerpt text...              │         │
│  │ May 10, 2026 • 8 min read    │         │
│  └──────────────────────────────┘         │
│                                            │
│  [Load More Posts]                         │
└────────────────────────────────────────────┘
```

**Layout:**
- Single column on mobile
- Single column on all breakpoints (easier to read)
- Large, magazine-style cards

**Post Card Contents:**
- Cover image (16:9 ratio)
- Title (2xl, Source Serif 4)
- Excerpt (2-3 sentences)
- Date + reading time

**Interactions:**
- Hover: elevation + border color
- Click card → navigate to post
- Smooth scroll to top when clicking "Load More"

---

### Blog Post Page (`/blog/[slug]`)

Long-form content with beautiful typography.

```
┌────────────────────────────────────────────┐
│  [Nav]                                     │
│                                            │
│  ← Back to Blog                            │
│                                            │
│       Post Title Here                      │
│       May 12, 2026 • 5 min read            │
│                                            │
│  [Hero Image - full width]                │
│                                            │
│  ┌──────────────────────────────┐         │
│  │   [MDX Content]              │         │
│  │                              │         │
│  │   Headings, paragraphs,      │         │
│  │   code blocks, images,       │         │
│  │   quotes, lists...           │         │
│  │                              │         │
│  │   Beautifully typeset        │         │
│  │   with Source Serif 4        │         │
│  └──────────────────────────────┘         │
│                                            │
│  ──────────────────────────────────────   │
│                                            │
│  More Posts                                │
│  [Post 1] [Post 2] [Post 3]               │
│                                            │
└────────────────────────────────────────────┘
```

**Typography:**
- Title: 4xl (mobile) → 6xl (desktop), Source Serif 4
- Body: lg, Source Serif 4, line-height 1.75
- Max width: 65ch (optimal reading length)
- Headings: hierarchy (h2: 3xl, h3: 2xl, h4: xl)

**MDX Components:**
- Code blocks: Syntax highlighting (Shiki)
- Images: Full-width or inline (next/image)
- Blockquotes: Accent border-left, italic
- Lists: Proper spacing and indentation
- Links: Underline on hover, accent color

**Related Posts:**
- Show 3 most recent posts (exclude current)
- Small cards with image + title
- Horizontal layout on desktop, vertical on mobile

---

### Project Detail Page (`/work/[project]`)

Deep dive into a single project.

```
┌────────────────────────────────────────────┐
│  [Nav]                                     │
│                                            │
│  ← Back to Work                            │
│                                            │
│  ┌──────────────────────────────┐         │
│  │   [Project Hero Image/Video] │         │
│  └──────────────────────────────┘         │
│                                            │
│  Project Name                              │
│  Brief tagline/description                 │
│                                            │
│  [Visit Live Site →]  [View Code →]       │
│                                            │
│  ──────────────────────────────────────   │
│                                            │
│  Overview                                  │
│  Detailed description...                   │
│                                            │
│  Challenge                                 │
│  What problem did this solve?...           │
│                                            │
│  Solution                                  │
│  How you built it...                       │
│                                            │
│  Tech Stack                                │
│  [React] [Next.js] [TypeScript]...        │
│                                            │
│  ┌──────────────────────────────┐         │
│  │   [Screenshot/Features]      │         │
│  └──────────────────────────────┘         │
│                                            │
│  Results                                   │
│  • Impact metric 1                         │
│  • Impact metric 2                         │
│  • Impact metric 3                         │
│                                            │
└────────────────────────────────────────────┘
```

**Project Data Structure:**
```typescript
interface Project {
  slug: string;
  title: string;
  tagline: string;
  url: string;
  repo?: string;
  heroImage: string;
  overview: string;
  challenge: string;
  solution: string;
  techStack: string[];
  features: {
    title: string;
    description: string;
    image: string;
  }[];
  results: string[];
}
```

**Projects to Include:**
1. **careerflow-ai.org.in** - AI career platform
2. **archive360.co** - Document management
3. **macedge.in** - Business website
4. **thefragrancesstory.com** - E-commerce

---

## Performance & Optimization

### Performance Budget

**Lighthouse Targets (All Pages):**
- Performance: 90+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

**Core Web Vitals:**
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms (legacy)
- **INP** (Interaction to Next Paint): < 200ms
- **CLS** (Cumulative Layout Shift): < 0.1

**Bundle Size Targets:**
- Initial JS: < 150kb gzipped
- Initial CSS: < 30kb gzipped
- Per-page JS: < 50kb gzipped
- 3D libraries total: < 200kb (lazy loaded)

**Why these targets:**  
These metrics represent "Good" thresholds per Google's Web Vitals. They ensure the site feels instant and professional.

---

### Code Splitting Strategy

**Critical Path (Loaded Immediately):**
- Next.js core runtime (~50kb)
- React runtime (~40kb)
- Hero section components (~20kb)
- Navigation (~5kb)
- Critical CSS (above-the-fold) (~10kb)
- Geist font (preloaded, ~30kb)

**Total Initial Load:** ~155kb gzipped

**Lazy Loaded (On Demand):**

```typescript
// 3D Components (client-only)
const GeometricHero = dynamic(() => import('@/components/three/GeometricHero'), {
  loading: () => <div className="w-full h-full bg-gradient-to-b from-background to-surface" />,
  ssr: false,
});

const ParticleField = dynamic(() => import('@/components/three/ParticleField'), {
  loading: () => <ParticleFieldSkeleton />,
  ssr: false,
});

// Form (loads when contact section enters viewport)
const ContactForm = dynamic(() => import('@/components/ContactForm'), {
  loading: () => <FormSkeleton />,
});

// Heavy sections (viewport-based loading)
const Timeline = dynamic(() => import('@/components/sections/Timeline'), {
  loading: () => <TimelineSkeleton />,
});
```

**Route-Based Code Splitting:**
- Homepage: Hero + work preview (~200kb total)
- Blog index: Blog list components (~30kb)
- Blog post: MDX renderer + syntax highlighting (~50kb)
- Project detail: Project components (~40kb)

**Why this approach:**  
Only load what the user needs, when they need it. 3D components are large (Three.js is ~150kb), so we defer loading until the section is visible.

---

### Image Optimization

**Strategy:**

All images go through `next/image`:
```typescript
<Image
  src="/projects/careerflow.jpg"
  alt="CareerFlow AI Dashboard"
  width={1200}
  height={800}
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/..." // Generated at build
  priority={false} // Only hero gets priority
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

**Image Formats:**
- WebP for all photos (with JPEG fallback)
- AVIF for hero images (best quality/size)
- SVG for logos and icons
- Responsive srcset generated automatically by Next.js

**Lazy Loading:**
- Images below fold: `loading="lazy"` (automatic)
- Custom lazy load for 3D textures (viewport-based)
- Blur placeholders while loading (prevents layout shift)

**Image Sizes:**
- Hero images: 1920x1080 (AVIF, quality 90)
- Project screenshots: 1200x800 (WebP, quality 85)
- Blog covers: 800x450 (WebP, quality 80)
- Thumbnails: 400x300 (WebP, quality 75)

**Why WebP/AVIF:**  
30-50% smaller file sizes than JPEG/PNG with same visual quality. AVIF is even better but has less browser support (96% as of 2026), so we use it only for critical hero images with WebP fallback.

---

### Font Optimization

**Font Loading Strategy:**

```typescript
// app/layout.tsx
import { GeistSans } from 'geist/font/sans';
import { Source_Serif_4 } from 'next/font/google';

// Geist: Self-hosted via Vercel (0ms latency)
const geist = GeistSans;

// Source Serif 4: Google Fonts with optimization
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap', // Prevent FOIT (Flash of Invisible Text)
  variable: '--font-source-serif',
  preload: true,
  weight: ['400', '600', '700'], // Only load weights used
});

export default function RootLayout({ children }) {
  return (
    <html className={`${geist.variable} ${sourceSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

**Why this approach:**
- **Geist:** Self-hosted on Vercel CDN, zero latency, pre-cached
- **Source Serif 4:** Google Fonts with `font-display: swap` prevents invisible text
- **Variable fonts:** Fewer files to download
- **Preload:** Critical fonts load immediately
- **Subset:** Only Latin characters (smaller files)

**Font Sizes Used:**
- Only load 3 weights (400, 600, 700)
- Total font download: ~60kb (both fonts combined)

---

### 3D Performance Optimization

**Device Tier Detection:**

```typescript
// lib/device-detection.ts
export function getPerformanceTier(): 'high' | 'medium' | 'low' {
  if (typeof window === 'undefined') return 'medium';
  
  // Check device memory (GB)
  const memory = (navigator as any).deviceMemory || 4;
  
  // Check CPU cores
  const cores = navigator.hardwareConcurrency || 4;
  
  // Check if mobile
  const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
  
  if (isMobile) return 'low';
  if (memory >= 8 && cores >= 8) return 'high';
  if (memory >= 4 && cores >= 4) return 'medium';
  return 'low';
}
```

**Adaptive 3D Loading:**

```typescript
const tier = getPerformanceTier();

// High-end devices: Full experience
if (tier === 'high') {
  return <GeometricHero particles={5000} polyCount="high" postProcessing />;
}

// Mid-range: Reduced quality
if (tier === 'medium') {
  return <GeometricHero particles={2000} polyCount="medium" postProcessing={false} />;
}

// Low-end (mobile): No Three.js
return <StaticHero />;
```

**3D Configuration by Tier:**

| Feature | High | Medium | Low |
|---------|------|--------|-----|
| Particle Count | 5000+ | 2000 | 0 (static) |
| Mesh Poly Count | 10k+ | 5k | 0 |
| Post-Processing | Yes | No | No |
| Shadow Quality | High | Low | None |
| Target FPS | 60 | 60 | 60 (CSS only) |
| Bundle Size | ~200kb | ~200kb | 0kb |

**Performance Monitoring:**

```typescript
// Monitor FPS and downgrade if needed
let frameCount = 0;
let lastTime = performance.now();
let currentQuality = 'high';

function monitorPerformance() {
  frameCount++;
  const currentTime = performance.now();
  
  if (currentTime >= lastTime + 1000) {
    const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
    
    // If FPS drops below 30, reduce quality
    if (fps < 30 && currentQuality === 'high') {
      currentQuality = 'medium';
      reduceParticleCount();
      disablePostProcessing();
    }
    
    if (fps < 20 && currentQuality === 'medium') {
      currentQuality = 'low';
      unloadThreeJS();
      showStaticFallback();
    }
    
    frameCount = 0;
    lastTime = currentTime;
  }
  
  requestAnimationFrame(monitorPerformance);
}
```

**Why adaptive loading:**  
Ensures smooth 60fps on all devices. High-end users get the premium experience, low-end users still get a beautiful (static) site without jank.

---

### Animation Performance

**Best Practices Implemented:**

1. **Only animate transform and opacity** (GPU-accelerated properties)
2. **Use will-change sparingly** (only during animation, remove after)
3. **GSAP for complex scroll** (better than CSS, requestAnimationFrame-based)
4. **Framer Motion for components** (optimized React animations)
5. **Pause animations when tab inactive** (save battery)

**Scroll Performance with Lenis:**

```typescript
// lib/smooth-scroll.ts
import Lenis from '@studio-freight/lenis';

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
```

**Throttle Expensive Operations:**

```typescript
import { throttle } from 'lodash-es';

// Only update particles every 16ms (60fps)
const throttledMouseMove = throttle((e: MouseEvent) => {
  updateParticles(e.clientX, e.clientY);
}, 16);

window.addEventListener('mousemove', throttledMouseMove);
```

**Reduced Motion Support:**

```css
/* Respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

```typescript
// Disable 3D if user prefers reduced motion
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

{!prefersReducedMotion && <GeometricHero />}
{prefersReducedMotion && <StaticHero />}
```

---

### Caching Strategy

**Static Assets:**

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 year
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 year
          },
        ],
      },
    ];
  },
};
```

**ISR (Incremental Static Regeneration):**

```typescript
// app/page.tsx (Homepage)
export const revalidate = 3600; // 1 hour

// app/blog/page.tsx (Blog index)
export const revalidate = 3600; // 1 hour

// app/blog/[slug]/page.tsx (Individual posts)
export const revalidate = false; // Never revalidate (static)

// GitHub data fetching
export const revalidate = 3600; // 1 hour
```

**On-Demand Revalidation:**

```typescript
// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  
  // Verify secret (prevent unauthorized revalidation)
  if (secret !== process.env.REVALIDATION_SECRET) {
    return new Response('Invalid secret', { status: 401 });
  }
  
  // Revalidate homepage (GitHub data)
  revalidatePath('/');
  
  return NextResponse.json({ 
    revalidated: true, 
    now: Date.now() 
  });
}
```

**GitHub Webhook Setup:**
1. Go to GitHub repo settings → Webhooks
2. Add webhook URL: `https://vishensharma.com/api/revalidate?secret=xxx`
3. Select "Just the push event"
4. When you push code, homepage revalidates automatically

**Why ISR + On-Demand:**  
Best of both worlds. Data stays fresh without rebuilding entire site. On-demand revalidation ensures immediate updates when you push major work.

---

### SEO Optimization

**Metadata Configuration:**

```typescript
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Vishen Sharma | Self-Taught Developer',
    template: '%s | Vishen Sharma',
  },
  description: 'Premium portfolio of Vishen Sharma, a self-taught developer building production software since age 6. Expertise in React, Next.js, TypeScript, and modern web development.',
  keywords: [
    'web developer',
    'react developer',
    'next.js developer',
    'typescript',
    'full-stack developer',
    'self-taught developer',
    'portfolio',
    'vishen sharma',
  ],
  authors: [{ name: 'Vishen Sharma', url: 'https://vishensharma.com' }],
  creator: 'Vishen Sharma',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vishensharma.com',
    siteName: 'Vishen Sharma',
    title: 'Vishen Sharma | Self-Taught Developer',
    description: 'Building production software since age 6.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vishen Sharma - Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vishen Sharma | Self-Taught Developer',
    description: 'Building production software since age 6.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
```

**Structured Data (JSON-LD):**

```typescript
// app/layout.tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Vishen Sharma',
  jobTitle: 'Software Developer',
  url: 'https://vishensharma.com',
  sameAs: [
    'https://github.com/Vishen-dart-coder',
  ],
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Web Development',
    'UI/UX Design',
  ],
  description: 'Self-taught developer building production software since age 6',
};

// In <head>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

**Sitemap Generation:**

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  
  const blogUrls = posts.map((post) => ({
    url: `https://vishensharma.com/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
  
  return [
    {
      url: 'https://vishensharma.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://vishensharma.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogUrls,
  ];
}
```

**robots.txt:**

```typescript
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: 'https://vishensharma.com/sitemap.xml',
  };
}
```

---

### Accessibility

**WCAG 2.1 AA Compliance:**

1. **Color Contrast:**
   - All text meets 4.5:1 contrast minimum
   - Accent color (#166534) tested against backgrounds
   - Focus states highly visible (outline + color change)

2. **Keyboard Navigation:**
   - All interactive elements focusable
   - Tab order logical (top to bottom, left to right)
   - Skip to content link (hidden until focused)
   - Enter/Space activate buttons

3. **ARIA Labels:**
   - All buttons have accessible names
   - Form inputs properly labeled
   - Landmarks: `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>`
   - `aria-label` for icon-only buttons

4. **Semantic HTML:**
   - Proper heading hierarchy (h1 → h2 → h3)
   - Lists for navigation and content
   - `<button>` for actions, `<a>` for navigation

5. **Focus Management:**
   - Visible focus indicators
   - Focus restored after modal close
   - Focus trapped in modal when open

**Motion Accessibility:**

```typescript
// hooks/useReducedMotion.ts
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return prefersReducedMotion;
}

// Usage
const prefersReducedMotion = useReducedMotion();

{!prefersReducedMotion && <AnimatedComponent />}
{prefersReducedMotion && <StaticComponent />}
```

---

## Error Handling & Edge Cases

### Error Boundaries

**Global Error Boundary:**

```typescript
// app/error.tsx
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Global error:', error);
  }, [error]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-4">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          Something went wrong
        </h2>
        <p className="text-secondary mb-8">
          {error.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
```

**Component-Level Error Boundary:**

```typescript
// components/ErrorBoundary.tsx
'use client';

import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };
  
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Component error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">Something went wrong loading this component.</p>
        </div>
      );
    }
    
    return this.props.children;
  }
}

export default ErrorBoundary;
```

**Usage for 3D Components:**

```typescript
<ErrorBoundary fallback={<StaticHero />}>
  <GeometricHero />
</ErrorBoundary>
```

**Why error boundaries:**  
3D components can fail (WebGL not supported, GPU issues). Error boundaries prevent entire page crash and provide graceful fallback.

---

### GitHub API Error Handling

**Rate Limiting:**

```typescript
// lib/github.ts
export async function getGitHubData() {
  try {
    const data = await octokit.users.getByUsername({ 
      username: 'Vishen-dart-coder' 
    });
    return data;
  } catch (error: any) {
    if (error.status === 403) {
      // Rate limit exceeded
      console.error('GitHub API rate limit exceeded');
      const resetTime = error.response?.headers?.['x-ratelimit-reset'];
      console.error('Rate limit resets at:', new Date(resetTime * 1000));
      return getFallbackData();
    }
    
    if (error.status === 404) {
      // User not found
      console.error('GitHub user not found');
      return getEmptyState();
    }
    
    // Network error or other issue
    console.error('GitHub API error:', error);
    return getFallbackData();
  }
}
```

**Fallback Data:**

```typescript
// lib/github-fallback.ts
export const fallbackGitHubData = {
  profile: {
    name: 'Vishen Sharma',
    bio: 'Self-taught developer building production software',
    public_repos: 42,
    followers: 156,
    avatar_url: '/avatar-fallback.jpg',
  },
  repositories: [],
  stats: {
    totalStars: 0,
    totalCommits: 0,
  },
  lastUpdated: null, // Indicates stale data
};
```

**User Communication:**

```typescript
{isUsingFallback && (
  <div className="text-sm text-secondary italic">
    GitHub data temporarily unavailable. Showing cached information.
  </div>
)}
```

---

### Form Validation & Error States

**Contact Form Validation:**

```typescript
// lib/schemas/contact.ts
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name too long'),
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email too long'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message too long (max 1000 characters)'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

**Form Component:**

```typescript
// components/ContactForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactFormData } from '@/lib/schemas/contact';
import { useState } from 'react';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });
  
  const onSubmit = async (data: ContactFormData) => {
    setSubmitState('submitting');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error('Failed to send message');
      
      setSubmitState('success');
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitState('idle'), 5000);
    } catch (error) {
      setSubmitState('error');
      console.error('Form submission error:', error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input
          id="name"
          {...register('name')}
          className={`
            w-full px-4 py-3 rounded-lg border
            ${errors.name ? 'border-red-500' : 'border-border'}
            focus:outline-none focus:ring-2 focus:ring-accent
          `}
          placeholder="Your name"
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>
      
      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={`
            w-full px-4 py-3 rounded-lg border
            ${errors.email ? 'border-red-500' : 'border-border'}
            focus:outline-none focus:ring-2 focus:ring-accent
          `}
          placeholder="your@email.com"
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>
      
      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          {...register('message')}
          rows={5}
          className={`
            w-full px-4 py-3 rounded-lg border
            ${errors.message ? 'border-red-500' : 'border-border'}
            focus:outline-none focus:ring-2 focus:ring-accent
            resize-none
          `}
          placeholder="Your message..."
        />
        {errors.message && (
          <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
        )}
      </div>
      
      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitState === 'submitting'}
        className="
          w-full px-6 py-3 bg-primary text-white rounded-lg
          hover:opacity-90 transition disabled:opacity-50
        "
      >
        {submitState === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>
      
      {/* Success Message */}
      {submitState === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800">
            Message sent successfully! I'll get back to you soon.
          </p>
        </div>
      )}
      
      {/* Error Message */}
      {submitState === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">
            Failed to send message. Please try again or email me directly at{' '}
            <a href="mailto:iamvishensharma@gmail.com" className="underline">
              iamvishensharma@gmail.com
            </a>
          </p>
        </div>
      )}
    </form>
  );
}
```

---

### 3D Loading & Error States

**WebGL Support Detection:**

```typescript
// lib/webgl.ts
export function checkWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch (e) {
    return false;
  }
}
```

**Usage:**

```typescript
// components/three/GeometricHero.tsx
const [use3D, setUse3D] = useState(true);

useEffect(() => {
  if (!checkWebGLSupport()) {
    console.warn('WebGL not supported, falling back to static hero');
    setUse3D(false);
  }
}, []);

if (!use3D) {
  return <StaticHero />;
}

return <Canvas>...</Canvas>;
```

**Loading States:**

```typescript
const GeometricHero = dynamic(() => import('./GeometricHero'), {
  loading: () => (
    <div className="w-full h-full bg-gradient-to-b from-background to-surface animate-pulse">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-secondary">Loading 3D scene...</div>
      </div>
    </div>
  ),
  ssr: false,
});
```

---

### Edge Cases

**Empty States:**

**No Blog Posts:**
```typescript
{posts.length === 0 && (
  <div className="text-center py-16">
    <p className="text-secondary">No posts yet. Check back soon!</p>
  </div>
)}
```

**No GitHub Repos:**
```typescript
{repos.length === 0 && (
  <div className="text-center py-8">
    <p className="text-secondary">Loading repositories...</p>
  </div>
)}
```

**No Pinned Repos (Fallback to Top Repos):**
```typescript
const displayRepos = pinnedRepos.length > 0 
  ? pinnedRepos 
  : allRepos
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6);
```

**Browser Compatibility:**

**Intersection Observer Polyfill:**
```typescript
// Only load polyfill if not supported
if (typeof window !== 'undefined' && !('IntersectionObserver' in window)) {
  await import('intersection-observer');
}
```

**JavaScript Disabled:**
```html
<!-- app/layout.tsx -->
<noscript>
  <div style={{
    padding: '2rem',
    textAlign: 'center',
    background: '#f8f7f4',
  }}>
    <h2>JavaScript Required</h2>
    <p>
      This website requires JavaScript to display properly. 
      Please enable JavaScript in your browser settings.
    </p>
  </div>
</noscript>
```

**Very Small Screens (<320px):**
```css
@media (max-width: 320px) {
  .hero-title {
    font-size: 1.875rem; /* 30px - 3xl */
  }
  
  .container {
    padding: 1rem;
  }
}
```

**Very Large Screens (>2000px):**
```css
@media (min-width: 2000px) {
  .container {
    max-width: 1600px;
    margin-left: auto;
    margin-right: auto;
  }
}
```

---

## Testing Strategy

### Testing Pyramid

```
         /\
        /E2E\         (Few - Critical user flows)
       /______\
      /        \
     /Integration\    (Some - Component interactions)
    /____________\
   /              \
  /  Unit Tests    \  (Many - Utilities, logic)
 /__________________\
```

### Unit Tests

**Utilities & Logic:**

```typescript
// lib/__tests__/github.test.ts
import { calculateStats } from '../github';

describe('GitHub utilities', () => {
  it('calculates total stars correctly', () => {
    const repos = [
      { stargazers_count: 10, forks: 2 },
      { stargazers_count: 25, forks: 5 },
    ];
    
    const stats = calculateStats(repos, []);
    expect(stats.totalStars).toBe(35);
  });
  
  it('handles empty repo list', () => {
    const stats = calculateStats([], []);
    expect(stats.totalStars).toBe(0);
    expect(stats.totalRepos).toBe(0);
  });
  
  it('calculates commits from events', () => {
    const events = [
      { type: 'PushEvent', payload: { commits: [1, 2] } },
      { type: 'PushEvent', payload: { commits: [1] } },
      { type: 'WatchEvent' },
    ];
    
    const stats = calculateStats([], events);
    expect(stats.totalCommits).toBe(3);
  });
});
```

**Design Tokens:**

```typescript
// lib/__tests__/design-tokens.test.ts
import { tokens } from '../design-tokens';

describe('Design tokens', () => {
  it('has all required color tokens', () => {
    expect(tokens.colors).toHaveProperty('background');
    expect(tokens.colors).toHaveProperty('surface');
    expect(tokens.colors).toHaveProperty('primary');
    expect(tokens.colors).toHaveProperty('accent');
  });
  
  it('colors are valid hex codes', () => {
    Object.values(tokens.colors).forEach((color) => {
      expect(color).toMatch(/^#[0-9A-F]{6}$/i);
    });
  });
});
```

### Component Tests

**Button Component:**

```typescript
// components/ui/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  it('calls onClick when clicked', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    await userEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
  
  it('shows loading state', () => {
    render(<Button loading>Click</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });
});
```

**Card Component:**

```typescript
// components/ui/__tests__/Card.test.tsx
import { render, screen } from '@testing-library/react';
import { Card } from '../Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Test content</Card>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
  
  it('applies hover class on hover variant', () => {
    const { container } = render(<Card hover>Content</Card>);
    expect(container.firstChild).toHaveClass('hover:shadow-lg');
  });
});
```

### Integration Tests

**Contact Form:**

```typescript
// components/__tests__/ContactForm.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '../ContactForm';

// Mock fetch
global.fetch = jest.fn();

describe('ContactForm', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });
  
  it('shows validation errors for invalid email', async () => {
    render(<ContactForm />);
    
    const emailInput = screen.getByLabelText('Email');
    await userEvent.type(emailInput, 'invalid-email');
    
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await userEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });
  });
  
  it('shows validation error for short message', async () => {
    render(<ContactForm />);
    
    await userEvent.type(screen.getByLabelText('Name'), 'John Doe');
    await userEvent.type(screen.getByLabelText('Email'), 'john@example.com');
    await userEvent.type(screen.getByLabelText('Message'), 'Short');
    await userEvent.click(screen.getByRole('button', { name: /send message/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument();
    });
  });
  
  it('submits form with valid data', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });
    
    render(<ContactForm />);
    
    await userEvent.type(screen.getByLabelText('Name'), 'John Doe');
    await userEvent.type(screen.getByLabelText('Email'), 'john@example.com');
    await userEvent.type(screen.getByLabelText('Message'), 'This is a test message that is long enough.');
    await userEvent.click(screen.getByRole('button', { name: /send message/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
    });
    
    expect(global.fetch).toHaveBeenCalledWith('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a test message that is long enough.',
      }),
    });
  });
  
  it('shows error message on API failure', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API error'));
    
    render(<ContactForm />);
    
    await userEvent.type(screen.getByLabelText('Name'), 'John Doe');
    await userEvent.type(screen.getByLabelText('Email'), 'john@example.com');
    await userEvent.type(screen.getByLabelText('Message'), 'This is a test message.');
    await userEvent.click(screen.getByRole('button', { name: /send message/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/failed to send message/i)).toBeInTheDocument();
    });
  });
});
```

### E2E Tests (Playwright)

**Homepage Flow:**

```typescript
// tests/e2e/homepage.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('hero section loads correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check hero text
    await expect(page.getByText('Vishen Sharma')).toBeVisible();
    await expect(page.getByText('Self-Taught 13 year-old Developer')).toBeVisible();
    
    // Check navigation
    await expect(page.getByRole('link', { name: 'Work' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Blog' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
  });
  
  test('can navigate to work section', async ({ page }) => {
    await page.goto('/');
    
    // Click Work link
    await page.getByRole('link', { name: 'Work' }).click();
    
    // Should scroll to work section
    await expect(page.getByText('Selected Work')).toBeInViewport();
  });
  
  test('project cards are interactive', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to work section
    await page.getByText('Selected Work').scrollIntoViewIfNeeded();
    
    // Hover on first project card
    const firstCard = page.locator('[data-testid="project-card"]').first();
    await firstCard.hover();
    
    // Should have hover effect (check for shadow or scale)
    // This is visual, hard to test programmatically
    
    // Click on first project
    await firstCard.click();
    
    // Should navigate to project detail page
    await expect(page).toHaveURL(/\/work\/.+/);
  });
  
  test('blog section shows posts', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to blog section
    await page.getByText('Latest Writing').scrollIntoViewIfNeeded();
    
    // Should show at least one blog card
    const blogCards = page.locator('[data-testid="blog-card"]');
    await expect(blogCards.first()).toBeVisible();
  });
  
  test('GitHub section shows data', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to GitHub section
    await page.getByText('GitHub Activity').scrollIntoViewIfNeeded();
    
    // Should show stats
    await expect(page.getByText(/repos/i)).toBeVisible();
    await expect(page.getByText(/stars/i)).toBeVisible();
    await expect(page.getByText(/commits/i)).toBeVisible();
  });
});
```

**Contact Form E2E:**

```typescript
// tests/e2e/contact.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('can submit contact form', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to contact section
    await page.getByText('Let\'s Work Together').scrollIntoViewIfNeeded();
    
    // Fill form
    await page.getByLabel('Name').fill('Test User');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Message').fill('This is a test message for the E2E test.');
    
    // Submit
    await page.getByRole('button', { name: /send message/i }).click();
    
    // Check success message
    await expect(page.getByText(/message sent successfully/i)).toBeVisible({ timeout: 10000 });
  });
  
  test('shows validation errors', async ({ page }) => {
    await page.goto('/');
    
    await page.getByText('Let\'s Work Together').scrollIntoViewIfNeeded();
    
    // Try to submit empty form
    await page.getByRole('button', { name: /send message/i }).click();
    
    // Should show validation errors
    await expect(page.getByText(/name must be at least/i)).toBeVisible();
    await expect(page.getByText(/please enter a valid email/i)).toBeVisible();
    await expect(page.getByText(/message must be at least/i)).toBeVisible();
  });
});
```

**Blog E2E:**

```typescript
// tests/e2e/blog.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Blog', () => {
  test('can navigate to blog index', async ({ page }) => {
    await page.goto('/');
    
    // Click Blog link in nav
    await page.getByRole('link', { name: 'Blog' }).click();
    
    // Should be on blog page
    await expect(page).toHaveURL('/blog');
    await expect(page.getByText('Writing')).toBeVisible();
  });
  
  test('can read a blog post', async ({ page }) => {
    await page.goto('/blog');
    
    // Click first blog post
    const firstPost = page.locator('[data-testid="blog-card"]').first();
    await firstPost.click();
    
    // Should be on blog post page
    await expect(page).toHaveURL(/\/blog\/.+/);
    
    // Should show post content
    await expect(page.locator('article')).toBeVisible();
    
    // Should have back link
    await expect(page.getByText('← Back to Blog')).toBeVisible();
  });
});
```

### Testing Tools & Configuration

**Package.json Scripts:**

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:headed": "playwright test --headed",
    "test:all": "npm run test && npm run test:e2e"
  }
}
```

**Jest Configuration:**

```javascript
// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
  ],
  coverageThresholds: {
    global: {
      statements: 70,
      branches: 65,
      functions: 70,
      lines: 70,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
```

**Playwright Configuration:**

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
    screenshot: 'only-on-failure',
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
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

**Coverage Target:**
- Utilities: 90%+
- Components: 70%+
- Pages: 50%+
- Overall: 70%+

---

## Deployment & Maintenance

### Environment Variables

**Required Environment Variables:**

```bash
# .env.local (development)
GITHUB_TOKEN=ghp_xxxxxxxxxxxxx
GITHUB_USERNAME=Vishen-dart-coder
REVALIDATION_SECRET=random-secret-string-here
CONTACT_EMAIL=iamvishensharma@gmail.com

# Email service (choose one)
# Option 1: Resend
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Option 2: SendGrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx

# Option 3: Nodemailer (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=iamvishensharma@gmail.com
SMTP_PASS=app-specific-password
```

**Vercel Environment Setup:**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Add environment variables
vercel env add GITHUB_TOKEN production
vercel env add GITHUB_USERNAME production
vercel env add REVALIDATION_SECRET production
vercel env add CONTACT_EMAIL production
vercel env add RESEND_API_KEY production

# Also add to preview environment (optional)
vercel env add GITHUB_TOKEN preview
vercel env add REVALIDATION_SECRET preview
vercel env add RESEND_API_KEY preview
```

**Why these variables:**
- `GITHUB_TOKEN`: Increases GitHub API rate limit from 60 to 5000 req/hour
- `REVALIDATION_SECRET`: Secures on-demand revalidation endpoint
- `CONTACT_EMAIL`: Target email for contact form submissions
- Email service API key: Sends contact form emails

---

### Deployment Strategy

**Platform: Vercel**

**Why Vercel:**
- Zero-config Next.js deployment
- Automatic HTTPS (Let's Encrypt)
- Global CDN (Edge Network, 100+ regions)
- Instant rollbacks
- Preview deployments for every push
- Built-in analytics and speed insights
- Free for personal projects (hobby plan)
- Excellent DX (deployment takes ~2 minutes)

**Git Workflow:**

```
main branch        → Production (vishensharma.com)
develop branch     → Preview (develop-*.vercel.app)
feature/* branches → Preview (feature-*-*.vercel.app)
```

**Deployment Process:**

**Step 1: Initial Deployment**

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (first time)
vercel

# Follow prompts:
# - Link to existing project? No
# - What's your project's name? portfolio-website
# - In which directory is your code located? ./
# - Want to modify settings? No

# Deploy to production
vercel --prod
```

**Step 2: Connect GitHub**

1. Go to Vercel dashboard
2. Click "Import Git Repository"
3. Select your GitHub repo
4. Configure:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: (leave default) `next build`
   - Output Directory: (leave default) `.next`
5. Add environment variables
6. Deploy

**Step 3: Automatic Deployments**

Once GitHub is connected:
- Push to `main` → Deploys to production automatically
- Push to other branches → Creates preview deployment
- Pull requests → Preview deployment with comment in PR

**Step 4: Domain Setup**

```bash
# Add custom domain (when ready)
vercel domains add vishensharma.com
vercel domains add www.vishensharma.com

# Vercel will provide DNS instructions
```

**DNS Configuration (at domain registrar):**

```
Type    Name    Value
────────────────────────────────────────
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

**Wait for DNS propagation (5 minutes - 24 hours)**

---

### CI/CD Pipeline

**GitHub Actions (Optional - Vercel handles most of this)**

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run ESLint
        run: npm run lint
      
      - name: Run TypeScript check
        run: npm run type-check
  
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm test -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
  
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
  
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright
        run: npx playwright install --with-deps
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

**Why CI/CD:**  
Catch issues before they reach production. Automated tests run on every PR, blocking merge if tests fail.

---

### Post-Deployment

**Monitoring:**

1. **Vercel Analytics** (built-in, free)
   - Page views
   - Top pages
   - Referrers
   - Devices/browsers

2. **Vercel Speed Insights** (built-in, free)
   - Core Web Vitals
   - Performance Score
   - Real user monitoring

3. **Google Search Console**
   - Index status
   - Search queries
   - Click-through rate
   - Mobile usability issues

4. **Lighthouse CI** (optional, weekly audits)
   - Automated Lighthouse runs
   - Performance regression detection
   - Accessibility checks

**Setup Vercel Analytics:**

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

**Setup Google Search Console:**

1. Go to https://search.google.com/search-console
2. Add property: vishensharma.com
3. Verify ownership (DNS or meta tag)
4. Submit sitemap: vishensharma.com/sitemap.xml

---

### Maintenance Plan

**Regular Tasks:**

**Weekly:**
- Check Vercel analytics for traffic patterns
- Monitor GitHub data freshness (is ISR working?)
- Check for broken links (external sites may change)

**Bi-weekly:**
- Review contact form submissions (if stored)
- Check for security alerts (Dependabot, npm audit)
- Monitor performance metrics (any regressions?)

**Monthly:**
- Update dependencies (`npm outdated`, `npm update`)
- Review and update project showcases (add new work)
- Write and publish new blog posts
- Check SEO rankings (Google Search Console)

**Quarterly:**
- Full Lighthouse audit on all pages
- Performance review (bundle size, load times)
- Accessibility audit (manual screen reader test)
- Update Node.js version if needed
- Review and update content (projects, bio, skills)

**As Needed:**
- Add new blog posts (MDX files)
- Update project portfolio
- Respond to contact form submissions
- Fix bugs reported by users

---

### Dependency Updates

**Check for Updates:**

```bash
# List outdated packages
npm outdated

# Update non-breaking (minor, patch)
npm update

# Update major versions (test thoroughly)
npm install <package>@latest

# Update all to latest (dangerous, test extensively)
npx npm-check-updates -u
npm install
```

**Update Strategy:**

1. **Security Updates:** Apply immediately
2. **Framework Updates (Next.js, React):** Test thoroughly in dev, read migration guides
3. **Minor Updates:** Apply monthly
4. **Major Updates:** Plan for quarterly review, allocate time for testing

**Test After Updates:**

```bash
# Run all tests
npm run test:all

# Check build
npm run build

# Run locally
npm run dev

# Test in preview deployment
git checkout -b deps/update-dependencies
git push origin deps/update-dependencies
# Vercel creates preview deployment automatically
# Test preview deployment thoroughly before merging
```

---

### Content Updates

**Add New Blog Post:**

1. Create MDX file:
   ```bash
   touch content/blog/my-new-post.mdx
   ```

2. Add frontmatter:
   ```markdown
   ---
   title: "My New Blog Post"
   date: "2026-05-15"
   excerpt: "A brief description of the post"
   tags: ["next.js", "learning"]
   author: "Vishen Sharma"
   ---
   
   # Post content here...
   ```

3. Commit and push:
   ```bash
   git add content/blog/my-new-post.mdx
   git commit -m "Add new blog post: My New Blog Post"
   git push origin main
   ```

4. Vercel auto-deploys (~2 minutes)

**Update Project Portfolio:**

1. Edit project list:
   ```typescript
   // app/work/page.tsx
   const projects = [
     // Add new project
     {
       slug: 'new-project',
       title: 'New Project',
       tagline: 'Brief description',
       // ...
     },
   ];
   ```

2. Create project detail page:
   ```bash
   mkdir -p app/work/new-project
   touch app/work/new-project/page.tsx
   ```

3. Add project images:
   ```bash
   cp new-project-hero.jpg public/projects/
   ```

4. Commit and push

---

### Rollback Plan

**If deployment has critical issues:**

**Option 1: Instant Rollback (Vercel Dashboard)**

1. Go to Vercel dashboard
2. Click "Deployments"
3. Find previous working deployment
4. Click "..." → "Promote to Production"
5. Takes ~30 seconds

**Option 2: Git Revert**

```bash
# Revert last commit
git revert HEAD
git push origin main

# Vercel auto-deploys the revert
```

**Option 3: Redeploy Specific Commit**

```bash
# Find working commit
git log

# Checkout old commit
git checkout <commit-hash>

# Force deploy to production
vercel --prod --force
```

**Why multiple options:**  
Vercel dashboard is fastest (30s). Git revert preserves history. Specific commit redeploy useful for complex rollbacks.

---

### Launch Checklist

**Pre-Launch (Final QA):**

- ✅ Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- ✅ Test on multiple devices (Desktop, tablet, mobile - real devices if possible)
- ✅ Test on slow connection (Chrome DevTools: Slow 3G)
- ✅ Verify all forms work (contact form)
- ✅ Check all links (internal & external)
- ✅ Run full Lighthouse audit (all pages)
- ✅ Run accessibility audit (manual screen reader test)
- ✅ Verify GitHub data loads correctly
- ✅ Test 3D scenes on desktop (verify no jank)
- ✅ Test mobile experience (verify no 3D, good performance)
- ✅ Check error states (network offline, API failure)
- ✅ Proofread all text (no typos)
- ✅ Get feedback from 2-3 people
- ✅ Verify meta tags (Open Graph, Twitter Card)
- ✅ Test social sharing (how does link look in Slack, Discord?)

**Launch Day:**

- ✅ Deploy to production (`vercel --prod`)
- ✅ Configure custom domain (DNS)
- ✅ Verify DNS propagation (use https://dnschecker.org)
- ✅ Test live site thoroughly (all features, all pages)
- ✅ Submit sitemap to Google Search Console
- ✅ Submit to Bing Webmaster Tools
- ✅ Update GitHub profile README with portfolio link
- ✅ Share on LinkedIn (if applicable)
- ✅ Share on Twitter/X (if applicable)
- ✅ Add to resume/CV

**Post-Launch (First 48 Hours):**

- ✅ Monitor Vercel analytics (traffic, errors)
- ✅ Check Vercel logs for errors
- ✅ Monitor contact form submissions
- ✅ Check Google Search Console (indexing status)
- ✅ Fix any issues reported by users
- ✅ Celebrate! 🎉

---

## Success Metrics

### Primary Metrics

**Performance:**
- Lighthouse Performance Score: 90+ ✅
- LCP: < 2.5s ✅
- INP: < 200ms ✅
- CLS: < 0.1 ✅

**Reach:**
- Google indexing: All pages indexed within 1 week
- Organic traffic: 100+ visitors/month by month 3
- Recruiter views: Track via contact form submissions

**Engagement:**
- Avg time on site: > 2 minutes
- Blog post views: 50+ views/post within first week
- Contact form submissions: 2+ per month

### Secondary Metrics

**Technical:**
- Zero critical accessibility violations (WCAG AA)
- 99.9% uptime (Vercel SLA)
- < 200kb initial bundle size

**Content:**
- 1-2 blog posts published per month
- 4+ production projects showcased
- All projects have detailed case studies

**SEO:**
- Domain Authority: 20+ by month 6
- Ranking for "[your name]" searches: Position 1
- Ranking for relevant keywords (e.g., "self-taught developer"): Top 50

### How to Measure

**Performance:**
- Lighthouse CI (weekly automated audits)
- Vercel Speed Insights (real user data)
- Web Vitals Chrome extension (manual spot checks)

**Reach & Engagement:**
- Vercel Analytics (built-in, free)
- Google Analytics (optional, more detailed)
- Google Search Console (SEO data)

**Conversions:**
- Contact form submissions (track via API logs or DB)
- GitHub profile visits (GitHub traffic insights)
- LinkedIn profile views (after sharing portfolio)

---

## Conclusion

This design specification provides a complete blueprint for a premium, production-ready portfolio website that:

1. **Communicates Elite Craftsmanship** through design quality, motion, and attention to detail
2. **Tells a Compelling Story** of a 7-year journey from age 6 to 13
3. **Demonstrates Technical Range** through advanced 3D, animations, and architecture
4. **Optimizes for Performance** with Lighthouse 90+, 60fps animations, and fast load times
5. **Ensures Maintainability** with clean architecture, comprehensive testing, and clear documentation
6. **Enables Opportunities** through excellent SEO, contact options, and recruiter-friendly presentation

**Next Steps:**
1. Review and approve this design specification
2. Invoke the `writing-plans` skill to create detailed implementation plan
3. Begin implementation with frontend scaffolding and design system
4. Build out sections incrementally with testing
5. Deploy to Vercel and launch

The website will serve as both a showcase of work and a testament to technical ability, positioning Vishen Sharma as an elite developer despite being self-taught and only 13 years old.

---

**Document Status:** ✅ Ready for Implementation  
**Last Updated:** May 12, 2026  
**Author:** Claude (with Vishen Sharma)  
**Version:** 1.0
