# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features a clean dark theme, smooth animations, and a comprehensive contact form.

## Features

- Responsive design optimized for mobile, tablet, and desktop (375px, 768px, 1280px+)
- Dark theme with elegant gradient backgrounds
- Smooth scroll navigation with animated sections
- Interactive contact form with validation
- Mobile-friendly hamburger menu
- Custom error and 404 pages
- Optimized production build with code splitting
- Comprehensive test coverage (57 tests)

## Tech Stack

### Frontend
- **Next.js 16.2.6** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library

### Form Handling
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **@hookform/resolvers** - Form validation integration

### Design System
- **Geist Font** - Modern sans-serif font family
- **Source Serif 4** - Elegant serif font for accents
- **Class Variance Authority** - Component variant management
- **clsx & tailwind-merge** - Utility class management

### Testing
- **Jest** - Testing framework
- **React Testing Library** - Component testing
- **@testing-library/user-event** - User interaction testing

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

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## Project Structure

```
portfolio-website/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with fonts
│   ├── page.tsx             # Homepage with all sections
│   ├── error.tsx            # Error boundary page
│   ├── not-found.tsx        # 404 page
│   └── globals.css          # Global styles
├── components/
│   ├── sections/            # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── WorkSection.tsx
│   │   ├── SkillsSection.tsx
│   │   └── ContactSection.tsx
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   └── Textarea.tsx
│   ├── Navigation.tsx       # Header navigation
│   └── Footer.tsx           # Footer component
├── lib/
│   ├── utils.ts             # Utility functions
│   └── schemas/
│       └── contact.ts       # Form validation schema
├── tailwind.config.ts       # Tailwind configuration
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

## Testing

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

## Deployment

This project is ready to deploy to Vercel, Netlify, or any platform that supports Next.js.

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Deploy with default settings

### Environment Variables

No environment variables required for basic functionality. Add as needed for:
- Email service integration (contact form)
- Analytics tracking
- CMS integration

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
