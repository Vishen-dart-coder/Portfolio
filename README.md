# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features a clean dark theme, smooth animations, and a comprehensive contact form.

## Features

### Phase 1 (Core Foundation)
- Responsive design optimized for mobile, tablet, and desktop (375px, 768px, 1280px+)
- Dark theme with elegant gradient backgrounds
- Smooth scroll navigation with animated sections
- Interactive contact form with validation
- Mobile-friendly hamburger menu
- Custom error and 404 pages
- Optimized production build with code splitting
- Comprehensive test coverage (57 tests)

### Phase 2 (Advanced Features)
- **3D Components**: Immersive GeometricHero with React Three Fiber, animated ParticleField, and DepthLayers for parallax effects
- **Smooth Scrolling**: Lenis smooth scroll integration for premium feel
- **GSAP Animations**: Scroll-triggered animations throughout the site
- **MDX Blog System**: Full-featured blog with 2 sample posts, syntax highlighting, and frontmatter support
- **GitHub Integration**: Live stats dashboard with contribution graphs, pinned repositories, and automatic updates via webhook
- **Timeline Section**: Interactive 7-year professional journey visualization
- **Philosophy Section**: Core principles showcase with 5 development values
- **Contact Form Email**: Resend integration for email delivery with proper error handling
- **ISR Revalidation**: Webhook endpoint for on-demand page regeneration
- **E2E Testing**: Playwright test suite covering navigation, blog, and contact form

## Tech Stack

### Frontend
- **Next.js 16.2.6** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library

### 3D & Animation
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F
- **GSAP** - Professional-grade animation library
- **Lenis** - Smooth scroll library

### Content & Data
- **MDX** - Markdown with JSX for blog posts
- **next-mdx-remote** - MDX rendering for Next.js
- **gray-matter** - Frontmatter parsing
- **Octokit** - GitHub API client

### Form Handling & Email
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **@hookform/resolvers** - Form validation integration
- **Resend** - Email delivery service

### Design System
- **Geist Font** - Modern sans-serif font family
- **Source Serif 4** - Elegant serif font for accents
- **Class Variance Authority** - Component variant management
- **clsx & tailwind-merge** - Utility class management

### Testing
- **Jest** - Testing framework
- **React Testing Library** - Component testing
- **@testing-library/user-event** - User interaction testing
- **Playwright** - End-to-end testing

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see Environment Variables section below)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:e2e` - Run Playwright E2E tests
- `npm run test:e2e:ui` - Run E2E tests with UI mode
- `npm run test:e2e:report` - View last E2E test report

## Project Structure

```
portfolio-website/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with fonts
│   ├── page.tsx             # Homepage with all sections
│   ├── error.tsx            # Error boundary page
│   ├── not-found.tsx        # 404 page
│   ├── globals.css          # Global styles
│   ├── blog/                # Blog pages
│   │   ├── page.tsx        # Blog list page
│   │   └── [slug]/         # Dynamic blog post pages
│   └── api/                 # API routes
│       ├── contact/        # Contact form endpoint
│       └── revalidate/     # ISR webhook endpoint
├── components/
│   ├── sections/            # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── WorkSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── TimelineSection.tsx
│   │   ├── PhilosophySection.tsx
│   │   └── GitHubSection.tsx
│   ├── 3d/                  # 3D components
│   │   ├── GeometricHero.tsx
│   │   ├── ParticleField.tsx
│   │   └── DepthLayers.tsx
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   └── Textarea.tsx
│   ├── Navigation.tsx       # Header navigation
│   └── Footer.tsx           # Footer component
├── content/
│   └── blog/                # MDX blog posts
│       ├── building-scalable-systems.mdx
│       └── future-of-web-development.mdx
├── lib/
│   ├── utils.ts             # Utility functions
│   ├── mdx.ts               # MDX utilities
│   ├── github.ts            # GitHub API client
│   ├── email.ts             # Email service
│   └── schemas/
│       └── contact.ts       # Form validation schema
├── e2e/                     # Playwright E2E tests
│   ├── homepage.spec.ts
│   ├── blog.spec.ts
│   └── contact.spec.ts
├── tailwind.config.ts       # Tailwind configuration
├── playwright.config.ts     # Playwright configuration
└── tsconfig.json            # TypeScript configuration
```

## Design System

### Colors
- **Background**: Neutral dark (#0A0A0A to #1A1A1A)
- **Accent**: Emerald green (#10B981)
- **Text**: White to neutral grays

### Typography
- **Sans-serif**: Geist (headings and body)
- **Serif**: Source Serif 4 (accents)

### Breakpoints
- **Mobile**: 375px (default)
- **Tablet**: 768px (md)
- **Desktop**: 1280px (lg)

## Environment Variables

Required environment variables for full functionality:

```bash
# GitHub API (for GitHub stats section)
GITHUB_TOKEN=your_github_personal_access_token

# Resend (for contact form email)
RESEND_API_KEY=your_resend_api_key

# ISR Revalidation (for GitHub webhook)
REVALIDATE_SECRET=your_random_secret
# Generate with: openssl rand -base64 32
```

### Getting API Keys

- **GitHub Token**: Create at https://github.com/settings/tokens
  - Required scope: `public_repo`
  - Used for fetching GitHub stats and pinned repositories
  - Site shows fallback data without token (no live stats)

- **Resend API Key**: Get at https://resend.com/api-keys
  - Required for contact form email delivery
  - Contact form will show error without API key

- **Revalidate Secret**: Generate with `openssl rand -base64 32`
  - Used to secure the ISR webhook endpoint
  - Optional - only needed if setting up GitHub webhook

## Adding Blog Posts

Create new `.mdx` files in `content/blog/`:

```mdx
---
title: "Your Post Title"
date: "2026-05-13"
excerpt: "Short description of your post"
tags: ["tag1", "tag2", "tag3"]
author: "Vishen Sharma"
---

# Your content here

Write your blog post content using Markdown and JSX.

## Code Examples

```javascript
const example = "Syntax highlighting works!";
```

You can use React components in MDX files too!
```

Posts are automatically:
- Listed on `/blog` sorted by date (newest first)
- Generated as static pages at build time
- Indexed for SEO with metadata from frontmatter

## Testing

### Unit Tests

The project includes comprehensive unit tests for all UI components and utilities:

- Button component (5 tests)
- Card component (4 tests)
- Badge component (4 tests)
- Input component (10+ tests)
- Contact form validation (10+ tests)
- Utility functions (10+ tests)

Run tests with:
```bash
npm test
```

### E2E Testing

Playwright tests cover critical user flows:

- **Homepage Navigation**: Hero section, scroll behavior, all section links
- **Blog Posts**: List page, individual posts, metadata rendering
- **Contact Form**: Validation, error messages, success states

Run E2E tests:
```bash
npm run test:e2e        # Run all tests headless
npm run test:e2e:ui     # Run with interactive UI
npm run test:e2e:report # View last test report
```

Tests run against development server on `http://localhost:3000`.

## Production Build

The production build is optimized with:
- Static page generation
- Code splitting and lazy loading
- Minified CSS and JavaScript
- Optimized images and fonts

Build the project:
```bash
npm run build
```

Build output:
- All tests passing (57/57)
- TypeScript compilation successful
- Static pages generated
- Production-ready bundle created

## GitHub Webhook Setup (Optional)

To automatically refresh GitHub stats when you push to your repository:

1. Go to your GitHub repository → Settings → Webhooks
2. Click "Add webhook"
3. Configure:
   - **Payload URL**: `https://your-domain.com/api/revalidate`
   - **Content type**: `application/json`
   - **Secret**: Leave empty (security handled by payload)
   - **Payload**: `{"secret": "YOUR_REVALIDATE_SECRET", "path": "/"}`
   - **Events**: Select "Just the push event"
4. Click "Add webhook"

When you push to your repo, the webhook triggers ISR revalidation and your GitHub stats update automatically.

## Deployment

This project is ready to deploy to Vercel, Netlify, or any platform that supports Next.js.

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Add environment variables:
   - `GITHUB_TOKEN`
   - `RESEND_API_KEY`
   - `REVALIDATE_SECRET`
4. Deploy with default settings

### Important Notes for Production

- **GitHub Token**: Required for live GitHub stats. Without it, section shows placeholder data
- **Resend API Key**: Required for contact form email delivery. Without it, form submissions will fail
- **Revalidate Secret**: Only needed if setting up GitHub webhook for auto-updates
- **ISR**: Homepage uses Incremental Static Regeneration with 1-hour revalidation
- **Build Time**: First build may take longer due to 3D asset compilation

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## License

This project is licensed under the MIT License.

## Author

Ashish Sharma - Full Stack Developer

---

Built with Next.js and TypeScript. Designed for performance, accessibility, and user experience.
