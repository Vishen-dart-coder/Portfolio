# Portfolio Website Redesign - Portfoy-Inspired Layout

**Date:** 2026-05-16  
**Author:** Claude + Vishen Sharma  
**Status:** Approved for Implementation

## Executive Summary

Complete redesign of the portfolio website to match the layout structure and aesthetic of the Portfoy/Portavia Framer templates while preserving existing functionality (theme toggle, smooth scrolling, GitHub integration) and maintaining Vishen's unique personal brand and content.

**Approach:** Complete HTML/CSS rewrite with preserved JavaScript functionality.

## Design Goals

1. **Modern, minimal aesthetic** inspired by Portfoy template
2. **Streamlined content** focusing on featured projects, skills, and contact
3. **Preserve unique differentiators** (7 years of experience at age 13)
4. **Maintain existing features** (dark mode, smooth navigation, GitHub API)
5. **Improve visual hierarchy** with bold typography and generous spacing

## Sections & Requirements

### 1. Overall Architecture

**Page Structure:**
1. Header (sticky navigation)
2. Hero Section
3. Featured Projects Section
4. Projects Grid Section
5. Skills Section
6. Contact Section
7. Footer

**Design System:**

- **Typography:**
  - Hero heading: 56-72px (large, bold, impactful)
  - Section headings: 32-48px
  - Body text: 16-18px
  - Font stack: Keep existing (Inter for UI, clean sans-serif)
  
- **Spacing:**
  - Section vertical padding: 80-120px
  - Content max-width: 1200px (centered)
  - Generous whitespace between elements
  - Grid gaps: 24-32px

- **Colors:**
  - Keep existing light/dark theme system
  - Simplify color palette - minimal accent usage
  - Clean backgrounds, subtle borders
  - Maintain theme toggle functionality

- **Animations:**
  - Keep scroll reveal animations (refined)
  - Smooth transitions for interactive elements
  - Subtle hover states on cards/links
  - Optional: gentle parallax on hero image

**Technical Preservation:**
- Theme toggle with localStorage persistence
- Smooth scroll navigation
- Mobile-responsive hamburger menu
- SEO meta tags
- Favicon system (theme-aware)
- Back-to-top button

### 2. Header

**Layout:**
- Sticky header with backdrop blur
- Left: "Vishen Sharma" logo/text
- Right: Navigation links (Home, Projects, Skills, Contact)
- Theme toggle button (sun/moon icon)
- Mobile: Hamburger menu

**Behavior:**
- Smooth scroll to sections on click
- Active state for current section
- Subtle shadow on scroll

### 3. Hero Section

**Layout:**
- Centered content layout
- Vertical stack of elements

**Content Hierarchy (top to bottom):**
1. **Greeting:** "Hi, I'm Vishen." (small, elegant, ~18-20px)
2. **Main Heading:** "I write about building on the web, tech and life." (large, bold, 56-72px)
3. **Subheading:** "13-year-old developer from India with 7 years of coding experience." (medium, ~20-24px)
4. **Metrics:** "7 Years Coding • [X] Projects • [X] Contributions" (inline, subtle, ~16px)
5. **Profile Image:** Circular photo, centered, ~200-250px diameter
6. **CTAs:** Two buttons side-by-side:
   - Primary: "View my work" (links to #projects)
   - Secondary: "Download Resume" (links to resume.pdf)

**Styling:**
- All text center-aligned
- Generous vertical spacing between elements
- Metrics with bullet separators
- Profile image with subtle border/shadow
- CTA buttons with clear visual hierarchy (primary filled, secondary outline)

**Dynamic Content:**
- Fetch repos count and contributions from GitHub API (same as current)
- Show "Loading..." while fetching

### 4. Featured Projects Section

**Layout:**
- Section heading: "Featured Projects"
- Two large project showcase cards
- Alternating left-right image/content layout (or stacked on smaller screens)

**Card Structure (per project):**
- **Large screenshot/image** (prominent, high quality)
- **Project title** (h3, bold)
- **Description** (2-3 sentences)
- **Tech tags** (pill-style badges: "React", "Node.js", "AI/ML")
- **Call-to-action link:** "View Live →" (with arrow)

**Projects to Feature:**
1. **CareerFlow AI**
   - Image: `images/careerflow.png`
   - Description: "AI-powered career guidance platform helping students and professionals navigate their career paths with intelligent recommendations and insights."
   - Tech: React, Node.js, AI/ML
   - Link: https://careerflow-ai.org.in

2. **Archive360**
   - Image: `images/archive360.png`
   - Description: "Enterprise-grade digital archiving solution securing India's past and digitizing its future with AI-led document management and compliant record control."
   - Tech: Next.js, TypeScript, Cloud Storage
   - Link: https://archive360.co

**Styling:**
- Large, high-quality images (full width or 50% width depending on layout)
- Clean card design with subtle shadows
- Hover states on entire card
- Tech tags with background colors
- Link with arrow icon and hover underline

### 5. Projects Grid Section

**Layout:**
- Section heading: "More Projects"
- Subheading or link: "View all projects →" (links to GitHub)
- 2-column grid on desktop, 1-column on mobile
- 4-6 repository cards

**Card Content (per repo):**
- Repository name (bold, clickable)
- Description (if available)
- Primary language (with colored dot)
- Stars and forks count (with icons)
- Link to GitHub repo

**Data Source:**
- Use GitHub API to fetch pinned repositories or top 4-6 repos
- Fallback to manual list if API fails

**Styling:**
- Card with border/subtle shadow
- Hover state (lift effect)
- Language dots (colored indicators)
- Icon + count for stars/forks
- Clean, minimal card design

### 6. Skills Section

**Layout:**
- Section heading: "Skills & Technologies"
- Three categories with subheadings

**Categories:**

1. **Primary Skills** (6 icons)
   - HTML, CSS, JavaScript, Git, GitHub, VS Code

2. **Advanced Skills** (6 icons)
   - TypeScript, React, Next.js, Node.js, Tailwind CSS, Figma

3. **Learning** (6-8 icons - curated)
   - Python, MongoDB, AWS, Supabase, Vercel, Docker, PostgreSQL, Firebase
   - (Remove: Java, Svelte, Angular, Prisma, GraphQL to streamline)

**Styling:**
- Use skillicons.dev for consistent icon appearance
- Larger icon size than current (~80-100px)
- Grid layout with generous spacing
- Category titles clear and separated
- Tooltip/title attributes on hover

### 7. Contact Section

**Layout:**
- Large, centered heading: "Let's work together"
- Subheading: "Feel free to reach out for collaborations or just a chat."
- Primary CTA buttons (prominent, side-by-side or stacked)
- Contact form below (secondary)

**Primary CTAs:**
- **Email button:** "Send me an email" → mailto:iamvishensharma@gmail.com
- **LinkedIn button:** "Connect on LinkedIn" → https://linkedin.com/in/vishen-sharma

**Contact Form (secondary):**
- Fields: Name, Email, Message
- Submit button: "Send Message"
- Form uses mailto submission (preserve existing behavior)

**Styling:**
- Heading large and bold (40-56px)
- Primary CTAs prominent with button styling
- Form fields clean and minimal
- Clear visual separation between CTAs and form
- Form as a "or use the form below" secondary option

### 8. Footer

**Layout:**
- Minimal footer
- Left: Copyright "© 2026 Vishen Sharma"
- Center: Quick links (Home, Projects, Skills, Contact)
- Right: Social icons (GitHub, LinkedIn, Email)

**Styling:**
- Dark background or subtle border-top
- Small text
- Links with hover states
- Social icons with hover effects

## Content to Remove

The following sections from the current site will be **removed** to achieve a more streamlined design:

1. **About Section** - Narrative text removed (personality shown through hero)
2. **Testimonials Section** - Full removal (focus on work, not social proof)
3. **GitHub Stats Section** - Remove stat cards (stars, forks, top language, repos count)
4. **Latest Repositories Section** - Replaced by curated Projects Grid
5. **Scroll-down indicator** - Remove arrow indicator from hero

## Content to Preserve

**Keep exactly as-is:**
- All existing projects (CareerFlow AI, Archive360) with images
- All contact information (email, GitHub, LinkedIn)
- Resume PDF download link
- Profile photo from GitHub
- Theme toggle functionality
- All SEO meta tags
- Google site verification

**Keep but modify:**
- Navigation structure (simplified labels)
- Skills list (curated to ~18-20 total)
- Hero metrics (repos count, contributions from GitHub API)
- Contact form (repositioned as secondary)

## File Structure

**Files to Create (new):**
- `index-new.html` (new structure, then rename to `index.html`)
- `style-new.css` (new styles, then rename to `style.css`)
- `script-new.js` (refactored JavaScript, then rename to `script.js`)

**Files to Preserve:**
- `resume.pdf`
- `images/careerflow.png`
- `images/archive360.png`
- `favicon.svg`
- `favicon-dark.svg`
- `googlece3f3189beee6005.html` (Google verification)

**Files to Archive:**
- Move current `index.html`, `style.css`, `script.js` to `_archive/` before replacement

## Implementation Approach

### Phase 1: HTML Structure
1. Create new semantic HTML structure
2. Set up sections with proper hierarchy
3. Add all content (text, images, links)
4. Include all meta tags and SEO elements
5. Preserve accessibility attributes (ARIA, roles)

### Phase 2: CSS Styling
1. Set up CSS custom properties for theme system
2. Implement base styles (typography, spacing, layout)
3. Style each section matching Portfoy aesthetic
4. Create responsive breakpoints
5. Add dark mode theme styles
6. Implement animations and transitions

### Phase 3: JavaScript Functionality
1. Theme toggle with localStorage
2. Smooth scroll navigation
3. Active nav link highlighting
4. GitHub API integration (repos + contributions)
5. Contact form submission handler
6. Scroll reveal animations
7. Back-to-top button
8. Mobile menu toggle

### Phase 4: Testing & Refinement
1. Cross-browser testing
2. Mobile responsiveness verification
3. Dark/light theme testing
4. JavaScript functionality testing
5. Performance optimization
6. Accessibility audit

### Phase 5: Deployment
1. Archive old files
2. Rename new files
3. Test on local server
4. Commit to git
5. Deploy to Vercel
6. Verify production deployment

## Success Criteria

✅ **Visual Design:**
- Clean, modern aesthetic matching Portfoy references
- Large, impactful typography
- Generous whitespace and spacing
- Professional polish

✅ **Functionality:**
- Theme toggle works perfectly
- Smooth scroll navigation
- GitHub API data loads correctly
- Contact form submits properly
- All links work

✅ **Content:**
- All essential information preserved
- Featured projects prominently displayed
- Skills clearly organized
- Contact options accessible

✅ **Technical:**
- Responsive on all devices
- Fast page load
- SEO tags intact
- Accessible (ARIA, semantic HTML)
- Clean, maintainable code

## Open Questions / Decisions Needed

None - design is approved and ready for implementation.
