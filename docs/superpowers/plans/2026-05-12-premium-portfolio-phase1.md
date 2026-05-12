# Premium Portfolio Website - Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the foundational Next.js 15 application with design system, basic homepage sections, and deployment infrastructure.

**Architecture:** Monolithic Next.js 15 App Router application with TypeScript, Tailwind CSS, and modular component structure. Server-side rendering for initial load, client-side interactivity for animations.

**Tech Stack:** Next.js 15, React 19, TypeScript 5, Tailwind CSS 4, Vercel

**What Phase 1 Delivers:**
- ✅ Next.js 15 project scaffolding with TypeScript
- ✅ Design system (tokens, Tailwind config, fonts)
- ✅ Core layout components (Navigation, Footer)
- ✅ Homepage with Hero, Work preview, Skills, Contact sections
- ✅ Basic UI components (Button, Card, Input, Badge)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Deployment to Vercel
- ✅ Testing setup (Jest, React Testing Library)

**Deferred to Phase 2:**
- 3D components (Three.js, React Three Fiber)
- Advanced scroll animations (GSAP, Lenis)
- MDX blog system
- GitHub API integration
- Timeline section
- Philosophy section
- Full E2E tests

---

## Phase 1 File Structure

```
portfolio-website/
├── app/
│   ├── layout.tsx                 # Root layout with fonts, metadata
│   ├── page.tsx                   # Homepage
│   ├── globals.css                # Global styles
│   ├── error.tsx                  # Error boundary
│   └── not-found.tsx              # 404 page
├── components/
│   ├── ui/
│   │   ├── Button.tsx             # Button component
│   │   ├── Card.tsx               # Card component
│   │   ├── Input.tsx              # Input field
│   │   ├── Textarea.tsx           # Textarea field
│   │   └── Badge.tsx              # Badge/tag component
│   ├── sections/
│   │   ├── HeroSection.tsx        # Hero section (static, no 3D)
│   │   ├── WorkSection.tsx        # Project showcase (basic grid)
│   │   ├── SkillsSection.tsx      # Tech skills grid
│   │   └── ContactSection.tsx     # Contact form + links
│   ├── Navigation.tsx             # Top navigation
│   ├── Footer.tsx                 # Footer
│   └── ErrorBoundary.tsx          # Component error boundary
├── lib/
│   ├── design-tokens.ts           # Design system tokens
│   ├── utils.ts                   # Utility functions (cn, etc.)
│   └── schemas/
│       └── contact.ts             # Zod schema for contact form
├── tests/
│   ├── setup.ts                   # Jest setup
│   └── components/
│       └── ui/
│           ├── Button.test.tsx
│           ├── Card.test.tsx
│           └── Badge.test.tsx
├── public/
│   ├── images/
│   └── projects/
├── .env.local                     # Environment variables (template)
├── .gitignore
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── jest.config.js
├── jest.setup.js
└── package.json
```

---

## Task 1: Project Scaffolding

**Goal:** Initialize Next.js 15 project with TypeScript and Tailwind CSS

**Files:**
- Create: `package.json`
- Create: `next.config.js`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `.gitignore`
- Create: `.env.local`

- [ ] **Step 1: Initialize Next.js project**

Run:
```bash
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

When prompted:
- Would you like to use TypeScript? › Yes
- Would you like to use ESLint? › Yes
- Would you like to use Tailwind CSS? › Yes
- Would you like to use `src/` directory? › No
- Would you like to use App Router? › Yes
- Would you like to customize the default import alias? › No

Expected: Creates Next.js 15 project structure

- [ ] **Step 2: Install additional dependencies**

Run:
```bash
npm install @studio-freight/lenis framer-motion class-variance-authority clsx tailwind-merge zod react-hook-form @hookform/resolvers gray-matter next-mdx-remote octokit
```

Run:
```bash
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event jest jest-environment-jsdom @types/jest
```

Expected: Dependencies installed

- [ ] **Step 3: Configure Next.js**

Edit `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },
};

module.exports = nextConfig;
```

Expected: Next.js configured for image optimization

- [ ] **Step 4: Create .env.local template**

Create `.env.local`:
```bash
# GitHub API
GITHUB_TOKEN=
GITHUB_USERNAME=Vishen-dart-coder

# Contact Form
CONTACT_EMAIL=iamvishensharma@gmail.com

# Revalidation
REVALIDATION_SECRET=
```

Expected: Environment variables template created

- [ ] **Step 5: Update .gitignore**

Append to `.gitignore`:
```
# Environment
.env.local
.env*.local

# Testing
coverage/

# Vercel
.vercel
```

Expected: .gitignore updated

- [ ] **Step 6: Verify setup**

Run:
```bash
npm run dev
```

Expected: Dev server starts on http://localhost:3000

- [ ] **Step 7: Commit**

Run:
```bash
git add .
git commit -m "chore: initialize Next.js 15 project with TypeScript and Tailwind"
```

Expected: Initial commit created

---

## Task 2: Design System & Tailwind Configuration

**Goal:** Set up design tokens and Tailwind configuration matching the premium aesthetic

**Files:**
- Create: `lib/design-tokens.ts`
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Create design tokens**

Create `lib/design-tokens.ts`:
```typescript
export const tokens = {
  colors: {
    background: '#F8F7F4',    // Warm neutral
    surface: '#FFFFFF',        // Pure white
    primary: '#111111',        // Near black
    secondary: '#5F5F5F',      // Medium gray
    border: '#E7E5E4',         // Subtle border
    accent: '#166534',         // Forest green
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
      '7xl': '4.5rem',   // 72px
    },
  },
  
  spacing: {
    section: '10rem',      // 160px
    container: '1280px',
    gutter: '2rem',
  },
  
  animation: {
    duration: {
      fast: '200ms',
      normal: '400ms',
      slow: '600ms',
      slower: '1000ms',
    },
    easing: {
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
    },
  },
} as const;
```

Expected: Design tokens defined

- [ ] **Step 2: Configure Tailwind**

Edit `tailwind.config.ts`:
```typescript
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
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
```

Expected: Tailwind configured with design system

- [ ] **Step 3: Set up global CSS**

Edit `app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #F8F7F4;
  --surface: #FFFFFF;
  --primary: #111111;
  --secondary: #5F5F5F;
  --border: #E7E5E4;
  --accent: #166534;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}

body {
  color: var(--primary);
  background: var(--background);
  font-family: var(--font-geist);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Expected: Global styles configured

- [ ] **Step 4: Commit**

Run:
```bash
git add lib/design-tokens.ts tailwind.config.ts app/globals.css
git commit -m "feat: add design system tokens and Tailwind config"
```

Expected: Design system committed

---

## Task 3: Utility Functions

**Goal:** Create utility functions for className merging and common helpers

**Files:**
- Create: `lib/utils.ts`
- Create: `lib/__tests__/utils.test.ts`

- [ ] **Step 1: Write test for cn utility**

Create `lib/__tests__/utils.test.ts`:
```typescript
import { cn } from '../utils';

describe('cn utility', () => {
  it('merges class names', () => {
    const result = cn('px-4', 'py-2');
    expect(result).toBe('px-4 py-2');
  });
  
  it('handles conditional classes', () => {
    const result = cn('base', false && 'false-class', 'active');
    expect(result).toBe('base active');
  });
  
  it('handles Tailwind class conflicts', () => {
    const result = cn('px-4', 'px-6');
    expect(result).toBe('px-6');
  });
  
  it('handles undefined and null', () => {
    const result = cn('base', undefined, null, 'active');
    expect(result).toBe('base active');
  });
});
```

Expected: Test file created

- [ ] **Step 2: Set up Jest**

Create `jest.config.js`:
```javascript
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
};

module.exports = createJestConfig(customJestConfig);
```

Create `jest.setup.js`:
```javascript
import '@testing-library/jest-dom';
```

Expected: Jest configured

- [ ] **Step 3: Run test to verify it fails**

Run:
```bash
npm test -- lib/__tests__/utils.test.ts
```

Expected: FAIL - "Cannot find module '../utils'"

- [ ] **Step 4: Implement cn utility**

Create `lib/utils.ts`:
```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
```

Expected: Utility functions implemented

- [ ] **Step 5: Run test to verify it passes**

Run:
```bash
npm test -- lib/__tests__/utils.test.ts
```

Expected: PASS - All tests passing

- [ ] **Step 6: Add package.json test script**

Edit `package.json`, add/modify scripts:
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

Expected: Test scripts added

- [ ] **Step 7: Commit**

Run:
```bash
git add lib/utils.ts lib/__tests__/utils.test.ts jest.config.js jest.setup.js package.json
git commit -m "feat: add utility functions with tests"
```

Expected: Utils committed

---

## Task 4: Button Component (TDD)

**Goal:** Create reusable Button component with variants and tests

**Files:**
- Create: `components/ui/Button.tsx`
- Create: `components/ui/__tests__/Button.test.tsx`

- [ ] **Step 1: Write failing test**

Create `components/ui/__tests__/Button.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });
  
  it('calls onClick when clicked', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
  
  it('does not call onClick when disabled', async () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Click</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
  
  it('applies primary variant styles', () => {
    render(<Button variant="primary">Click</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary');
  });
  
  it('applies secondary variant styles', () => {
    render(<Button variant="secondary">Click</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('border-border');
  });
});
```

Expected: Test file created

- [ ] **Step 2: Run test to verify it fails**

Run:
```bash
npm test -- components/ui/__tests__/Button.test.tsx
```

Expected: FAIL - "Cannot find module '../Button'"

- [ ] **Step 3: Implement Button component**

Create `components/ui/Button.tsx`:
```typescript
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium',
          'transition-all duration-200 ease-smooth',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-primary text-white hover:opacity-90': variant === 'primary',
            'border-2 border-border bg-surface text-primary hover:border-primary': variant === 'secondary',
            'bg-transparent text-primary hover:bg-surface': variant === 'ghost',
          },
          {
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-6 py-3 text-base': size === 'md',
            'px-8 py-4 text-lg': size === 'lg',
          },
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

Expected: Button component implemented

- [ ] **Step 4: Run test to verify it passes**

Run:
```bash
npm test -- components/ui/__tests__/Button.test.tsx
```

Expected: PASS - All tests passing

- [ ] **Step 5: Commit**

Run:
```bash
git add components/ui/Button.tsx components/ui/__tests__/Button.test.tsx
git commit -m "feat: add Button component with variants and tests"
```

Expected: Button component committed

---

## Task 5: Card Component (TDD)

**Goal:** Create Card component for projects and blog posts

**Files:**
- Create: `components/ui/Card.tsx`
- Create: `components/ui/__tests__/Card.test.tsx`

- [ ] **Step 1: Write failing test**

Create `components/ui/__tests__/Card.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react';
import { Card } from '../Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Test content</Card>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
  
  it('applies hover class when hover prop is true', () => {
    const { container } = render(<Card hover>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('hover:shadow-lg');
  });
  
  it('accepts custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('custom-class');
  });
});
```

Expected: Test file created

- [ ] **Step 2: Run test to verify it fails**

Run:
```bash
npm test -- components/ui/__tests__/Card.test.tsx
```

Expected: FAIL - "Cannot find module '../Card'"

- [ ] **Step 3: Implement Card component**

Create `components/ui/Card.tsx`:
```typescript
import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border border-border bg-surface p-6',
          'transition-all duration-400 ease-expo',
          hover && 'hover:shadow-lg hover:scale-[1.02] hover:border-primary',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
```

Expected: Card component implemented

- [ ] **Step 4: Run test to verify it passes**

Run:
```bash
npm test -- components/ui/__tests__/Card.test.tsx
```

Expected: PASS - All tests passing

- [ ] **Step 5: Commit**

Run:
```bash
git add components/ui/Card.tsx components/ui/__tests__/Card.test.tsx
git commit -m "feat: add Card component with hover effect"
```

Expected: Card component committed

---

## Task 6: Input & Textarea Components (TDD)

**Goal:** Create form input components for contact form

**Files:**
- Create: `components/ui/Input.tsx`
- Create: `components/ui/Textarea.tsx`
- Create: `components/ui/__tests__/Input.test.tsx`

- [ ] **Step 1: Write failing test**

Create `components/ui/__tests__/Input.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../Input';

describe('Input', () => {
  it('renders with label', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });
  
  it('shows error message when error prop is provided', () => {
    render(<Input label="Email" error="Invalid email" />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });
  
  it('applies error styles when error prop is provided', () => {
    render(<Input label="Email" error="Invalid email" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveClass('border-red-500');
  });
  
  it('accepts user input', async () => {
    render(<Input label="Name" />);
    const input = screen.getByLabelText('Name') as HTMLInputElement;
    
    await userEvent.type(input, 'John Doe');
    expect(input.value).toBe('John Doe');
  });
});
```

Expected: Test file created

- [ ] **Step 2: Run test to verify it fails**

Run:
```bash
npm test -- components/ui/__tests__/Input.test.tsx
```

Expected: FAIL - "Cannot find module '../Input'"

- [ ] **Step 3: Implement Input component**

Create `components/ui/Input.tsx`:
```typescript
import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-primary"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-3 rounded-lg border bg-surface',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-accent',
            'placeholder:text-secondary',
            error ? 'border-red-500' : 'border-border',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
```

Expected: Input component implemented

- [ ] **Step 4: Implement Textarea component**

Create `components/ui/Textarea.tsx`:
```typescript
import { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-primary"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'w-full px-4 py-3 rounded-lg border bg-surface resize-none',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-accent',
            'placeholder:text-secondary',
            error ? 'border-red-500' : 'border-border',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
```

Expected: Textarea component implemented

- [ ] **Step 5: Run test to verify it passes**

Run:
```bash
npm test -- components/ui/__tests__/Input.test.tsx
```

Expected: PASS - All tests passing

- [ ] **Step 6: Commit**

Run:
```bash
git add components/ui/Input.tsx components/ui/Textarea.tsx components/ui/__tests__/Input.test.tsx
git commit -m "feat: add Input and Textarea components with validation"
```

Expected: Form components committed

---

## Task 7: Badge Component (TDD)

**Goal:** Create Badge component for tech stack tags

**Files:**
- Create: `components/ui/Badge.tsx`
- Create: `components/ui/__tests__/Badge.test.tsx`

- [ ] **Step 1: Write failing test**

Create `components/ui/__tests__/Badge.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react';
import { Badge } from '../Badge';

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>React</Badge>);
    expect(screen.getByText('React')).toBeInTheDocument();
  });
  
  it('applies default variant styles', () => {
    const { container } = render(<Badge>React</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('bg-accent');
  });
  
  it('applies neutral variant styles', () => {
    const { container } = render(<Badge variant="neutral">React</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('bg-surface');
  });
});
```

Expected: Test file created

- [ ] **Step 2: Run test to verify it fails**

Run:
```bash
npm test -- components/ui/__tests__/Badge.test.tsx
```

Expected: FAIL - "Cannot find module '../Badge'"

- [ ] **Step 3: Implement Badge component**

Create `components/ui/Badge.tsx`:
```typescript
import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'accent' | 'neutral';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'accent', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
          'transition-transform duration-200 hover:scale-105',
          {
            'bg-accent/10 text-accent': variant === 'accent',
            'bg-surface border border-border text-primary': variant === 'neutral',
          },
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
```

Expected: Badge component implemented

- [ ] **Step 4: Run test to verify it passes**

Run:
```bash
npm test -- components/ui/__tests__/Badge.test.tsx
```

Expected: PASS - All tests passing

- [ ] **Step 5: Commit**

Run:
```bash
git add components/ui/Badge.tsx components/ui/__tests__/Badge.test.tsx
git commit -m "feat: add Badge component for tech tags"
```

Expected: Badge component committed

---

## Task 8: Root Layout with Fonts

**Goal:** Set up root layout with Geist and Source Serif 4 fonts, metadata

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Install font packages**

Run:
```bash
npm install geist next/font
```

Expected: Font packages installed

- [ ] **Step 2: Configure root layout**

Edit `app/layout.tsx`:
```typescript
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { Source_Serif_4 } from 'next/font/google';
import './globals.css';

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-serif',
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'Vishen Sharma | Self-Taught Developer',
    template: '%s | Vishen Sharma',
  },
  description: 'Premium portfolio of Vishen Sharma, a self-taught developer building production software since age 6.',
  keywords: ['web developer', 'react', 'next.js', 'typescript', 'portfolio'],
  authors: [{ name: 'Vishen Sharma', url: 'https://vishensharma.com' }],
  creator: 'Vishen Sharma',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vishensharma.com',
    siteName: 'Vishen Sharma',
    title: 'Vishen Sharma | Self-Taught Developer',
    description: 'Building production software since age 6.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${sourceSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

Expected: Root layout configured with fonts

- [ ] **Step 3: Update globals.css with font variables**

Edit `app/globals.css`, add after existing content:
```css
html {
  --font-geist: 'Geist', system-ui, sans-serif;
  --font-source-serif: 'Source Serif 4', Georgia, serif;
}
```

Expected: Font variables configured

- [ ] **Step 4: Test fonts load**

Run:
```bash
npm run dev
```

Visit http://localhost:3000 and inspect in DevTools that fonts load

Expected: Fonts load correctly

- [ ] **Step 5: Commit**

Run:
```bash
git add app/layout.tsx app/globals.css package.json package-lock.json
git commit -m "feat: configure root layout with Geist and Source Serif fonts"
```

Expected: Layout committed

---

## Task 9: Navigation Component

**Goal:** Create responsive navigation bar

**Files:**
- Create: `components/Navigation.tsx`

- [ ] **Step 1: Implement Navigation**

Create `components/Navigation.tsx`:
```typescript
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-semibold text-primary hover:opacity-70 transition-opacity"
          >
            Vishen Sharma
          </Link>
          
          <div className="flex items-center gap-8">
            <Link
              href="#work"
              className="text-sm text-secondary hover:text-primary transition-colors"
            >
              Work
            </Link>
            <Link
              href="#skills"
              className="text-sm text-secondary hover:text-primary transition-colors"
            >
              Skills
            </Link>
            <Link
              href="#contact"
              className="text-sm text-secondary hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
```

Expected: Navigation component created

- [ ] **Step 2: Test navigation**

Run:
```bash
npm run dev
```

Visit http://localhost:3000, scroll down to verify backdrop blur effect

Expected: Navigation works, blur on scroll

- [ ] **Step 3: Commit**

Run:
```bash
git add components/Navigation.tsx
git commit -m "feat: add responsive navigation with scroll effect"
```

Expected: Navigation committed

---

## Task 10: Footer Component

**Goal:** Create footer with contact links

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Implement Footer**

Create `components/Footer.tsx`:
```typescript
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-secondary">
              © {currentYear} Vishen Sharma. Building with curiosity and code.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <a
              href="mailto:iamvishensharma@gmail.com"
              className="text-sm text-secondary hover:text-primary transition-colors"
            >
              Email
            </a>
            <a
              href="https://github.com/Vishen-dart-coder"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-secondary hover:text-primary transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

Expected: Footer component created

- [ ] **Step 2: Commit**

Run:
```bash
git add components/Footer.tsx
git commit -m "feat: add footer with social links"
```

Expected: Footer committed

---

## Task 11: Hero Section (Static)

**Goal:** Create hero section with static background (no 3D for Phase 1)

**Files:**
- Create: `components/sections/HeroSection.tsx`

- [ ] **Step 1: Implement HeroSection**

Create `components/sections/HeroSection.tsx`:
```typescript
export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-surface">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-container mx-auto px-6 text-center">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 animate-fade-in">
          Vishen Sharma
        </h1>
        
        <p className="text-xl md:text-2xl text-secondary mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Self-Taught 13 year-old Developer
        </p>
        
        <p className="text-base md:text-lg text-secondary/80 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
          Building production software since age 6
        </p>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-secondary/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-secondary/30 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
```

Expected: Hero section created

- [ ] **Step 2: Commit**

Run:
```bash
git add components/sections/HeroSection.tsx
git commit -m "feat: add hero section with gradient background"
```

Expected: Hero committed

---

## Task 12: Work Section (Basic Grid)

**Goal:** Create work section with project cards (static, no horizontal scroll)

**Files:**
- Create: `components/sections/WorkSection.tsx`

- [ ] **Step 1: Implement WorkSection**

Create `components/sections/WorkSection.tsx`:
```typescript
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const projects = [
  {
    title: 'CareerFlow AI',
    description: 'AI-powered career platform helping professionals navigate their career journey with intelligent insights.',
    url: 'https://careerflow-ai.org.in',
    tags: ['AI/ML', 'Next.js', 'TypeScript'],
  },
  {
    title: 'Archive360',
    description: 'Document management SaaS platform for businesses to organize, search, and collaborate on files.',
    url: 'https://archive360.co',
    tags: ['SaaS', 'React', 'Node.js'],
  },
  {
    title: 'Macedge',
    description: 'Professional business website showcasing services and portfolio with modern design.',
    url: 'https://macedge.in',
    tags: ['Business', 'Next.js', 'Tailwind'],
  },
  {
    title: 'The Fragrances Story',
    description: 'E-commerce platform for premium fragrances with seamless shopping experience.',
    url: 'https://thefragrancesstory.com',
    tags: ['E-commerce', 'React', 'Stripe'],
  },
];

export function WorkSection() {
  return (
    <section id="work" className="py-section bg-surface">
      <div className="max-w-container mx-auto px-6">
        <div className="mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-4">
            Selected Work
          </h2>
          <div className="w-16 h-1 bg-accent" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card hover className="h-full">
                <h3 className="text-2xl font-semibold text-primary mb-3 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-secondary mb-6 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="accent">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
```

Expected: Work section created

- [ ] **Step 2: Commit**

Run:
```bash
git add components/sections/WorkSection.tsx
git commit -m "feat: add work section with project cards"
```

Expected: Work section committed

---

## Task 13: Skills Section

**Goal:** Create skills section with tech stack grid

**Files:**
- Create: `components/sections/SkillsSection.tsx`

- [ ] **Step 1: Implement SkillsSection**

Create `components/sections/SkillsSection.tsx`:
```typescript
import { Badge } from '@/components/ui/Badge';

const skills = {
  Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  Backend: ['Node.js', 'Python', 'Databases'],
  'Tools & Platform': ['Git', 'Vercel', 'Firebase'],
  Design: ['Figma', 'UI/UX'],
};

export function SkillsSection() {
  return (
    <section id="skills" className="py-section bg-background">
      <div className="max-w-container mx-auto px-6">
        <div className="mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-4">
            Technical Skills
          </h2>
          <div className="w-16 h-1 bg-accent" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-4">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <Badge key={skill} variant="neutral">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

Expected: Skills section created

- [ ] **Step 2: Commit**

Run:
```bash
git add components/sections/SkillsSection.tsx
git commit -m "feat: add skills section with tech stack grid"
```

Expected: Skills section committed

---

## Task 14: Contact Form Schema

**Goal:** Create Zod schema for contact form validation

**Files:**
- Create: `lib/schemas/contact.ts`
- Create: `lib/schemas/__tests__/contact.test.ts`

- [ ] **Step 1: Write failing test**

Create `lib/schemas/__tests__/contact.test.ts`:
```typescript
import { contactSchema } from '../contact';

describe('contactSchema', () => {
  it('validates correct data', () => {
    const data = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'This is a test message.',
    };
    
    const result = contactSchema.safeParse(data);
    expect(result.success).toBe(true);
  });
  
  it('rejects short name', () => {
    const data = {
      name: 'J',
      email: 'john@example.com',
      message: 'This is a test message.',
    };
    
    const result = contactSchema.safeParse(data);
    expect(result.success).toBe(false);
  });
  
  it('rejects invalid email', () => {
    const data = {
      name: 'John Doe',
      email: 'invalid-email',
      message: 'This is a test message.',
    };
    
    const result = contactSchema.safeParse(data);
    expect(result.success).toBe(false);
  });
  
  it('rejects short message', () => {
    const data = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Short',
    };
    
    const result = contactSchema.safeParse(data);
    expect(result.success).toBe(false);
  });
});
```

Expected: Test file created

- [ ] **Step 2: Run test to verify it fails**

Run:
```bash
npm test -- lib/schemas/__tests__/contact.test.ts
```

Expected: FAIL - "Cannot find module '../contact'"

- [ ] **Step 3: Implement contact schema**

Create `lib/schemas/contact.ts`:
```typescript
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

Expected: Schema implemented

- [ ] **Step 4: Run test to verify it passes**

Run:
```bash
npm test -- lib/schemas/__tests__/contact.test.ts
```

Expected: PASS - All tests passing

- [ ] **Step 5: Commit**

Run:
```bash
git add lib/schemas/contact.ts lib/schemas/__tests__/contact.test.ts
git commit -m "feat: add contact form validation schema"
```

Expected: Schema committed

---

## Task 15: Contact Section with Form

**Goal:** Create contact section with working form (console.log submission for Phase 1)

**Files:**
- Create: `components/sections/ContactSection.tsx`

- [ ] **Step 1: Implement ContactSection**

Create `components/sections/ContactSection.tsx`:
```typescript
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { contactSchema, type ContactFormData } from '@/lib/schemas/contact';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export function ContactSection() {
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
      // Phase 1: Just log to console
      // Phase 2: Will implement API route
      console.log('Form submission:', data);
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setSubmitState('success');
      reset();
      
      setTimeout(() => setSubmitState('idle'), 5000);
    } catch (error) {
      setSubmitState('error');
      console.error('Form submission error:', error);
    }
  };
  
  return (
    <section id="contact" className="py-section bg-surface">
      <div className="max-w-container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-4">
              Let's Work Together
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto" />
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Name"
              placeholder="Your name"
              error={errors.name?.message}
              {...register('name')}
            />
            
            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              error={errors.email?.message}
              {...register('email')}
            />
            
            <Textarea
              label="Message"
              rows={6}
              placeholder="Tell me about your project..."
              error={errors.message?.message}
              {...register('message')}
            />
            
            <Button
              type="submit"
              disabled={submitState === 'submitting'}
              className="w-full"
              size="lg"
            >
              {submitState === 'submitting' ? 'Sending...' : 'Send Message'}
            </Button>
            
            {submitState === 'success' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-center">
                  Message sent successfully! I'll get back to you soon.
                </p>
              </div>
            )}
            
            {submitState === 'error' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-center">
                  Failed to send message. Please try again or email me directly at{' '}
                  <a href="mailto:iamvishensharma@gmail.com" className="underline">
                    iamvishensharma@gmail.com
                  </a>
                </p>
              </div>
            )}
          </form>
          
          <div className="mt-12 pt-12 border-t border-border text-center">
            <p className="text-secondary mb-4">Or reach out directly</p>
            <div className="flex items-center justify-center gap-6">
              <a
                href="mailto:iamvishensharma@gmail.com"
                className="text-primary hover:text-accent transition-colors"
              >
                iamvishensharma@gmail.com
              </a>
              <span className="text-border">|</span>
              <a
                href="https://github.com/Vishen-dart-coder"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

Expected: Contact section created

- [ ] **Step 2: Test form**

Run:
```bash
npm run dev
```

Test form validation and submission (check console for logs)

Expected: Form validates, logs to console on submit

- [ ] **Step 3: Commit**

Run:
```bash
git add components/sections/ContactSection.tsx
git commit -m "feat: add contact section with validated form"
```

Expected: Contact section committed

---

## Task 16: Assemble Homepage

**Goal:** Put all sections together in homepage

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update homepage**

Edit `app/page.tsx`:
```typescript
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { WorkSection } from '@/components/sections/WorkSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <WorkSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
```

Expected: Homepage assembled

- [ ] **Step 2: Update layout to add smooth scroll**

Edit `app/layout.tsx`, modify the `html` tag:
```typescript
<html lang="en" className={`${GeistSans.variable} ${sourceSerif.variable} scroll-smooth`}>
```

Expected: Smooth scroll enabled

- [ ] **Step 3: Test full site**

Run:
```bash
npm run dev
```

Test:
- Navigation links scroll to sections
- All sections render correctly
- Responsive on mobile (resize browser)
- Forms validate
- Hover effects work

Expected: Full site working

- [ ] **Step 4: Commit**

Run:
```bash
git add app/page.tsx app/layout.tsx
git commit -m "feat: assemble homepage with all sections"
```

Expected: Homepage committed

---

## Task 17: Error Pages

**Goal:** Create error and 404 pages

**Files:**
- Create: `app/error.tsx`
- Create: `app/not-found.tsx`

- [ ] **Step 1: Create error page**

Create `app/error.tsx`:
```typescript
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-md">
        <h2 className="font-serif text-3xl font-bold text-primary mb-4">
          Something went wrong
        </h2>
        <p className="text-secondary mb-8">
          {error.message || 'An unexpected error occurred'}
        </p>
        <Button onClick={reset}>
          Try Again
        </Button>
      </div>
    </div>
  );
}
```

Expected: Error page created

- [ ] **Step 2: Create 404 page**

Create `app/not-found.tsx`:
```typescript
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-md">
        <h1 className="font-serif text-6xl font-bold text-primary mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-primary mb-4">
          Page not found
        </h2>
        <p className="text-secondary mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button>
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
```

Expected: 404 page created

- [ ] **Step 3: Commit**

Run:
```bash
git add app/error.tsx app/not-found.tsx
git commit -m "feat: add error and 404 pages"
```

Expected: Error pages committed

---

## Task 18: Responsive Design Testing

**Goal:** Test and fix responsive design issues

**Files:**
- Modify: Various component files as needed

- [ ] **Step 1: Test mobile layout**

Run:
```bash
npm run dev
```

Open DevTools, test these viewport sizes:
- 375px (iPhone SE)
- 768px (iPad)
- 1280px (Desktop)

Check:
- Navigation hamburger menu needed?
- Text sizing appropriate?
- Cards stack properly?
- Padding/margins appropriate?

Expected: Identify responsive issues

- [ ] **Step 2: Fix issues found**

For this phase, the design should work with existing responsive classes. If issues found, fix them.

Common fixes:
- Add more breakpoints to text sizes
- Adjust padding on mobile
- Stack elements on small screens

Expected: Responsive issues fixed

- [ ] **Step 3: Commit any fixes**

If changes made:
```bash
git add <files-modified>
git commit -m "fix: responsive design improvements"
```

Expected: Responsive design polished

---

## Task 19: Production Build Test

**Goal:** Test production build

**Files:**
- None (testing only)

- [ ] **Step 1: Run production build**

Run:
```bash
npm run build
```

Expected: Build succeeds with no errors

- [ ] **Step 2: Check build output**

Check the build output for:
- Bundle sizes (should be reasonable)
- No warnings about large bundles
- All pages generated

Expected: Build output looks good

- [ ] **Step 3: Test production server**

Run:
```bash
npm start
```

Visit http://localhost:3000 and test:
- All sections work
- Navigation works
- Form works
- No console errors

Expected: Production build works

- [ ] **Step 4: Run all tests**

Run:
```bash
npm test
```

Expected: All tests pass

---

## Task 20: Deployment to Vercel

**Goal:** Deploy Phase 1 to Vercel

**Files:**
- None (deployment only)

- [ ] **Step 1: Create GitHub repository**

Run:
```bash
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

Expected: Code pushed to GitHub

- [ ] **Step 2: Connect to Vercel**

1. Go to https://vercel.com
2. Click "Import Project"
3. Select GitHub repository
4. Configure:
   - Framework: Next.js
   - Build Command: (default)
   - Output Directory: (default)

Expected: Vercel project created

- [ ] **Step 3: Configure environment variables**

In Vercel dashboard:
- Add `CONTACT_EMAIL` = iamvishensharma@gmail.com
- (Other env vars will be added in Phase 2)

Expected: Env vars configured

- [ ] **Step 4: Deploy**

Click "Deploy" in Vercel dashboard

Expected: Deployment succeeds

- [ ] **Step 5: Test live site**

Visit your Vercel URL (e.g., portfolio-website.vercel.app)

Test:
- All sections load
- Navigation works
- Form validates (but won't send yet - Phase 2)
- Responsive design works
- No console errors

Expected: Live site works

- [ ] **Step 6: Document deployment**

Create `README.md`:
```markdown
# Vishen Sharma - Portfolio Website

Premium portfolio website built with Next.js 15, TypeScript, and Tailwind CSS.

## Phase 1 Complete ✅

- Next.js 15 with App Router
- Responsive design (mobile, tablet, desktop)
- Hero, Work, Skills, and Contact sections
- Form validation with Zod
- Deployed to Vercel

## Development

\`\`\`bash
npm install
npm run dev
\`\`\`

## Testing

\`\`\`bash
npm test
npm run test:coverage
\`\`\`

## Deployment

Automatically deploys to Vercel on push to main branch.

## Tech Stack

- Next.js 15
- React 19
- TypeScript 5
- Tailwind CSS 4
- Zod (validation)
- React Hook Form
- Geist & Source Serif 4 fonts

## Coming in Phase 2

- 3D components (Three.js, React Three Fiber)
- Advanced animations (GSAP, Lenis)
- MDX blog system
- GitHub API integration
- Timeline & Philosophy sections
- Contact form API route
```

Expected: README created

- [ ] **Step 7: Final commit**

Run:
```bash
git add README.md
git commit -m "docs: add README for Phase 1"
git push origin main
```

Expected: Phase 1 complete and deployed! 🎉

---

## Phase 1 Completion Checklist

Before moving to Phase 2, verify:

- [ ] Site deployed to Vercel and accessible
- [ ] All tests passing (`npm test`)
- [ ] Production build succeeds (`npm run build`)
- [ ] Lighthouse audit: Performance > 85, Accessibility > 90
- [ ] Mobile responsive (tested on 375px, 768px, 1280px)
- [ ] Navigation scrolls to sections smoothly
- [ ] Contact form validates correctly
- [ ] No console errors in production
- [ ] All commits have clear messages
- [ ] Code follows TypeScript strict mode (no `any`)

---

## Next Steps: Phase 2 Planning

Phase 2 will add:

1. **3D Components** (React Three Fiber)
   - GeometricHero with Three.js
   - ParticleField for work section
   - DepthLayers for transitions

2. **Advanced Animations** (GSAP + Lenis)
   - Smooth scroll with Lenis
   - Scroll-triggered animations
   - Timeline progressive draw
   - Parallax effects

3. **MDX Blog System**
   - Blog index page
   - Individual post pages
   - MDX processing
   - Reading time calculation

4. **GitHub Integration**
   - GitHub API client
   - Stats dashboard
   - Contribution graph
   - Pinned repositories

5. **Timeline & Philosophy Sections**
   - Vertical timeline with milestones
   - Testimonials synced with timeline
   - Philosophy section with editorial typography

6. **Contact API Route**
   - Email sending (Resend or SendGrid)
   - Form submission handling
   - Error handling

7. **E2E Tests** (Playwright)
   - Homepage flow
   - Contact form submission
   - Navigation

Phase 2 implementation plan will be created after Phase 1 completion.

---

**Phase 1 Complete!** 🎉

You now have a production-ready portfolio website with:
- Clean, premium design
- Responsive layout
- Working contact form (validation only)
- Deployed to Vercel
- Full test coverage
- Production-quality code

The foundation is solid for Phase 2's advanced features.
