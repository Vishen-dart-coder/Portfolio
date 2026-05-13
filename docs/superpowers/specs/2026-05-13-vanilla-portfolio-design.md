# Vanilla Portfolio Website Design Specification

**Date:** 2026-05-13  
**Goal:** Rebuild portfolio website using vanilla HTML/CSS/JavaScript with minimalist, editorial design inspired by Sagar Thakkar's portfolio

## Overview

A clean, minimalist portfolio website built with pure HTML, CSS, and JavaScript. No frameworks, no build tools, no dependencies. Focus on sophisticated typography, generous whitespace, and editorial layout that showcases personality through content and design.

## Target Audience

Recruiters, potential collaborators, and fellow developers looking to learn about Vishen Sharma's work and background.

## Design Philosophy

**Minimalism**: Clean layouts, plenty of whitespace, restrained color palette  
**Readability**: Large typography, comfortable line-height, focused content  
**Editorial**: Blog-like aesthetic with serif headings and professional photography  
**Performance**: Zero dependencies, instant load times, native browser APIs only

## Technical Stack

- **HTML5**: Semantic markup with sections and proper heading hierarchy
- **CSS3**: Modern CSS with CSS custom properties (variables), flexbox, grid
- **Vanilla JavaScript**: Native Fetch API, Intersection Observer, smooth scrolling
- **No build tools**: Direct file linking, works by opening index.html
- **No dependencies**: Everything uses native browser features

## Design System

### Color Palette

```css
--color-background: #F8F7F4;  /* Warm off-white background */
--color-surface:    #FFFFFF;  /* White for cards/sections */
--color-primary:    #111111;  /* Rich black for headings */
--color-secondary:  #5F5F5F;  /* Gray for body text */
--color-border:     #E7E5E4;  /* Subtle borders */
--color-accent:     #166534;  /* Deep green for links/CTAs */
--color-accent-hover: #14532D; /* Darker green on hover */
```

### Typography

**Font Stacks:**
```css
--font-serif: 'Source Serif 4', 'Source Serif Pro', Georgia, serif;
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Usage:**
- Serif: Large headings, hero text, editorial statements
- Sans: Navigation, labels, body text, metadata

**Font Loading:**
- Use Google Fonts CDN for Source Serif 4 and Inter
- Include font-display: swap for performance
- Weights: 400 (regular), 600 (semi-bold), 700 (bold)

**Scale:**
- Hero heading: 64px (4rem) desktop, 40px (2.5rem) mobile
- Section headings: 32px (2rem) desktop, 24px (1.5rem) mobile
- Body text: 16px (1rem)
- Small text: 14px (0.875rem)
- Line-height: 1.6 for body, 1.2 for headings

### Spacing System

```css
--space-xs: 8px;
--space-sm: 16px;
--space-md: 24px;
--space-lg: 48px;
--space-xl: 80px;
--space-2xl: 120px;
```

### Layout

**Container:**
- Max-width: 1200px
- Padding: 24px mobile, 48px desktop
- Centered with auto margins

**Section Spacing:**
- Vertical padding: 80px desktop, 48px mobile
- Section dividers: 1px border with border color

**Breakpoints:**
```css
@media (min-width: 768px)  /* Tablet */
@media (min-width: 1024px) /* Desktop */
```

## File Structure

```
/
├── index.html          # Main HTML structure
├── style.css           # All styles
├── script.js           # All JavaScript
└── README.md           # Documentation
```

## Components & Sections

### 1. Header (Fixed Navigation)

**Structure:**
- Fixed position at top
- Background: transparent initially, surface white on scroll
- Border-bottom: 1px when scrolled
- Z-index: 100
- Padding: 16px 24px

**Layout (Flex):**
- Left: Name/logo (Source Serif 4, 20px)
- Center: Navigation links (Home, About, Projects, Skills, Contact)
- Right: Theme toggle icon + CTA button

**Navigation Links:**
- Inter font, 14px, color-secondary
- Hover: color-primary
- Active: color-accent with underline
- Smooth scroll to sections on click

**CTA Button:**
- Text: "Subscribe" or "Contact"
- Background: color-accent
- Color: white
- Padding: 8px 20px
- Border-radius: 4px
- Hover: darker accent

**Mobile (<768px):**
- Logo left, hamburger right
- Navigation in slide-out menu or stacked below
- CTA button moves to menu

### 2. Hero Section

**Layout (Two-column flex):**
- Left: Text content (60% width)
- Right: Portrait photo (40% width)
- Min-height: 80vh
- Align-items: center
- Gap: 48px

**Content:**
- Small greeting: "Hi, I'm Vishen." (Inter, 16px, color-secondary)
- Large heading: "I write about building on the web, tech and life." (Source Serif 4, 64px desktop, color-primary)
- Subheading: "13-year-old developer from India with 7 years of coding experience." (Inter, 18px, color-secondary, line-height: 1.6)
- CTA link: "View my work →" (color-accent, 16px, arrow icon)

**Portrait Photo:**
- Image: Fetched from GitHub API (avatar_url)
- Aspect ratio: 3:4 (portrait)
- Max-width: 400px
- Object-fit: cover
- Border-radius: 4px
- Subtle shadow: 0 4px 24px rgba(0,0,0,0.08)
- Background: color-surface (fallback while loading)

**Mobile:**
- Stack vertically (photo above text)
- Photo max-width: 300px, centered
- Heading: 40px
- Padding: 48px 24px

### 3. About Section

**Layout:**
- Single column, max-width: 720px, centered
- Padding: 80px 24px

**Content:**
- Section heading: "About" (Source Serif 4, 32px)
- Bio paragraph: 2-3 paragraphs about coding journey (Inter, 16px, line-height: 1.6)
- Timeline snippet: "Started coding at age 6, now with 7 years of experience"

**Style:**
- Generous line-height (1.6)
- Color-secondary for body text
- Color-primary for headings

### 4. Projects Section

**Header:**
- Flex layout: "Latest Projects" heading left, "View all projects →" link right
- Section heading: Source Serif 4, 32px
- Link: Inter, 14px, color-accent

**Grid Layout:**
- 3 columns desktop (1024px+)
- 2 columns tablet (768px-1023px)
- 1 column mobile (<768px)
- Gap: 24px

**Project Card:**
- Background: color-surface
- Border: 1px solid color-border
- Border-radius: 4px
- Padding: 24px
- Hover: shadow 0 8px 24px rgba(0,0,0,0.08), border-color: color-accent
- Transition: all 0.2s ease

**Card Content:**
- Title: Source Serif 4, 20px, color-primary
- Description: Inter, 14px, color-secondary, 2 lines max with ellipsis
- Metadata row (flex):
  - Language badge: color-secondary, 12px
  - Stars: "★ 5" format, color-secondary, 12px
  - Link icon: opens GitHub repo in new tab

**Data Source:**
- Fetch from GitHub API: `https://api.github.com/users/Vishen-dart-coder/repos`
- Sort by: stars descending
- Show: Top 6 repositories
- Loading state: Skeleton cards while fetching
- Error state: "Failed to load projects" message

### 5. Skills Section

**Layout:**
- Single column, max-width: 720px, centered
- Padding: 80px 24px

**Content:**
- Section heading: "Skills" (Source Serif 4, 32px)
- Skills grid: 3 columns desktop, 2 tablet, 1 mobile

**Skill Item:**
- Simple badge style
- Background: color-surface
- Border: 1px solid color-border
- Padding: 12px 20px
- Border-radius: 4px
- Text: Inter, 14px, color-primary
- Center aligned

**Skills List:**
- HTML & CSS
- JavaScript
- React
- Node.js
- Git & GitHub
- TypeScript
- Next.js
- (Add more based on GitHub repo languages)

### 6. Contact Section

**Layout:**
- Centered content, max-width: 720px
- Padding: 80px 24px

**Content:**
- Section heading: "Get in Touch" (Source Serif 4, 32px)
- Subheading: "Feel free to reach out for collaborations or just a chat." (Inter, 16px, color-secondary)

**Contact Links (Vertical list):**
- Email: iamvishensharma@gmail.com (clickable mailto link)
- GitHub: github.com/Vishen-dart-coder (opens in new tab)
- Website: careerflow-ai.org.in (opens in new tab)

**Link Style:**
- Color: color-accent
- Text-decoration: none
- Hover: underline, color: color-accent-hover
- Font: Inter, 16px
- Icon before text (optional)

### 7. Footer

**Layout:**
- Flex layout: 3 sections
- Padding: 48px 24px
- Border-top: 1px solid color-border
- Background: color-surface

**Sections:**
- Left: Copyright "© 2026 Vishen Sharma"
- Center: Navigation links (Home, About, Projects, Skills, Contact)
- Right: Social icons (Twitter, GitHub, Email)

**Footer Links:**
- Inter, 14px
- Color-secondary
- Hover: color-primary
- Gap: 24px

**Social Icons:**
- SVG icons (24px)
- Color-secondary
- Hover: color-accent
- Opens in new tab

**Mobile (<768px):**
- Stack vertically
- Center align everything
- Order: copyright, links, icons

## JavaScript Functionality

### 1. Smooth Scrolling

**Implementation:**
```javascript
// Click navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});
```

### 2. Header Scroll Effect

**Behavior:**
- Transparent background when at top
- White background + border when scrolled
- Smooth transition (0.3s ease)

**Implementation:**
```javascript
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
```

### 3. Active Navigation State

**Behavior:**
- Highlight current section in navigation
- Based on scroll position using Intersection Observer

**Implementation:**
```javascript
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(section => observer.observe(section));
```

### 4. GitHub API Integration

**Fetch User Data:**
```javascript
async function fetchGitHubData() {
  try {
    const response = await fetch('https://api.github.com/users/Vishen-dart-coder');
    const data = await response.json();
    return {
      name: data.name,
      bio: data.bio,
      avatar: data.avatar_url,
      followers: data.followers,
      repos: data.public_repos
    };
  } catch (error) {
    console.error('Failed to fetch GitHub data:', error);
    return null;
  }
}
```

**Fetch Repositories:**
```javascript
async function fetchRepositories() {
  try {
    const response = await fetch('https://api.github.com/users/Vishen-dart-coder/repos?sort=stars&per_page=6');
    const repos = await response.json();
    return repos.map(repo => ({
      name: repo.name,
      description: repo.description || 'No description',
      url: repo.html_url,
      language: repo.language,
      stars: repo.stargazers_count
    }));
  } catch (error) {
    console.error('Failed to fetch repositories:', error);
    return [];
  }
}
```

**Render Projects:**
```javascript
function renderProjects(repos) {
  const container = document.getElementById('projects-grid');
  container.innerHTML = repos.map(repo => `
    <article class="project-card">
      <h3>${repo.name}</h3>
      <p>${repo.description}</p>
      <div class="metadata">
        ${repo.language ? `<span class="language">${repo.language}</span>` : ''}
        <span class="stars">★ ${repo.stars}</span>
        <a href="${repo.url}" target="_blank" rel="noopener">View →</a>
      </div>
    </article>
  `).join('');
}
```

### 5. Scroll Reveal Animations

**Behavior:**
- Elements fade in and slide up as they enter viewport
- Uses Intersection Observer for performance

**Implementation:**
```javascript
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));
```

**CSS:**
```css
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
```

### 6. Loading States

**Project Cards Loading:**
```html
<div class="skeleton-card">
  <div class="skeleton-title"></div>
  <div class="skeleton-text"></div>
  <div class="skeleton-text"></div>
</div>
```

**CSS Animation:**
```css
.skeleton-title, .skeleton-text {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

## Responsive Design

### Mobile (<768px)
- Single column layouts
- Stacked navigation
- Hero: photo above text
- Projects: 1 column grid
- Skills: 1-2 columns
- Footer: centered, stacked
- Font sizes: 60% of desktop
- Padding: 24px

### Tablet (768px-1023px)
- Hero: smaller photo
- Projects: 2 columns
- Skills: 2 columns
- Navigation: horizontal but compact
- Font sizes: 80% of desktop
- Padding: 32px

### Desktop (1024px+)
- Full two-column layouts
- Projects: 3 columns
- Skills: 3-4 columns
- Generous spacing
- Full typography scale
- Padding: 48px

## Performance Considerations

### Optimization Strategies

1. **No Dependencies**: Zero JavaScript libraries = zero bundle size
2. **CSS Variables**: Easy theming without preprocessors
3. **Native APIs**: Intersection Observer, Fetch API built into browsers
4. **Lazy Loading**: Images load with `loading="lazy"` attribute
5. **Minimal JavaScript**: ~200 lines total, runs only when needed
6. **Font Loading**: `font-display: swap` prevents FOIT
7. **API Caching**: Cache GitHub data in sessionStorage (1 hour)

### Load Time Goals

- **First Contentful Paint**: <1s
- **Time to Interactive**: <2s
- **Total Page Size**: <100KB (before images)
- **Lighthouse Score**: 95+ across all categories

## Accessibility

### Requirements

- **Semantic HTML**: Proper heading hierarchy (h1 → h2 → h3)
- **ARIA Labels**: Navigation landmarks, button roles
- **Keyboard Navigation**: All interactive elements focusable
- **Focus Styles**: Visible focus indicators (outline: 2px solid accent)
- **Alt Text**: Descriptive alt for profile photo
- **Color Contrast**: WCAG AA minimum (4.5:1 for body text)
- **Skip Links**: "Skip to content" link for screen readers
- **Responsive Text**: Scales with user's font size preference

### Screen Reader Support

- Header: `<header role="banner">`
- Navigation: `<nav role="navigation" aria-label="Main">`
- Main: `<main role="main">`
- Sections: Proper `<section>` with `aria-labelledby`
- Footer: `<footer role="contentinfo">`

## Browser Support

### Target Browsers

- Chrome 90+ (95% coverage)
- Firefox 88+ (90% coverage)
- Safari 14+ (95% coverage)
- Edge 90+ (95% coverage)

### Fallbacks

- CSS Grid: Fallback to flexbox for older browsers
- Intersection Observer: Polyfill or show all content (graceful degradation)
- Smooth scrolling: Falls back to instant scroll
- CSS Variables: Fallback colors in standard properties

## Testing Strategy

### Manual Testing

1. **Visual Regression**: Compare to reference design (Sagar Thakkar)
2. **Responsive Testing**: Test on actual devices (phone, tablet, desktop)
3. **Browser Testing**: Test in Chrome, Firefox, Safari, Edge
4. **Navigation Flow**: Click all links, verify smooth scroll
5. **API Integration**: Verify GitHub data loads correctly
6. **Performance**: Check load times in DevTools

### User Testing

- Show to 2-3 people for first impressions
- Ask: Is the design clear? Does it load fast? Easy to navigate?

## Deployment

### Static Hosting Options

1. **GitHub Pages** (Recommended)
   - Push to `gh-pages` branch
   - Free, fast CDN
   - Custom domain support
   - HTTPS included

2. **Netlify**
   - Drag-and-drop deployment
   - Continuous deployment from Git
   - Form handling built-in
   - Free tier generous

3. **Vercel**
   - Deploy with `vercel` CLI
   - Zero config
   - Edge network
   - Free for personal sites

### Deployment Steps (GitHub Pages)

1. Create repository on GitHub
2. Push code to `main` branch
3. Enable GitHub Pages in Settings
4. Select source: `main` branch, root folder
5. Site live at: `https://vishen-dart-coder.github.io/portfolio/`

### Custom Domain (Optional)

1. Purchase domain (e.g., vishensharma.dev)
2. Add CNAME file to root: `vishensharma.dev`
3. Configure DNS: CNAME record pointing to `vishen-dart-coder.github.io`
4. Wait for propagation (5-30 minutes)

## Maintenance

### Content Updates

- **Projects**: Automatically update via GitHub API
- **Skills**: Edit HTML directly in `index.html`
- **Bio**: Edit About section text
- **Contact**: Update links in Contact section

### Version Control

- Use Git for version control
- Commit messages: "Update bio", "Add new project", etc.
- Tag releases: `v1.0`, `v1.1`, etc.

## Future Enhancements (Not in Initial Build)

1. Dark mode toggle (theme switcher)
2. Blog section with static posts
3. Contact form with email integration
4. Resume/CV download link
5. Testimonials section
6. More detailed project case studies

## Success Criteria

### Design Quality
- ✓ Matches reference design aesthetic
- ✓ Clean, minimalist, professional
- ✓ Proper typography hierarchy
- ✓ Consistent spacing system

### Functionality
- ✓ All navigation links work
- ✓ GitHub API integration successful
- ✓ Smooth scroll animations
- ✓ Responsive on all devices

### Performance
- ✓ Loads in <2 seconds
- ✓ No console errors
- ✓ Works without JavaScript (content visible)
- ✓ Lighthouse score 95+

### Code Quality
- ✓ Clean, readable HTML/CSS/JS
- ✓ Semantic markup
- ✓ Commented code for clarity
- ✓ No unused code

## Timeline Estimate

- **Setup & Structure**: 1 hour (HTML skeleton, CSS reset)
- **Styling**: 2-3 hours (Typography, layout, components)
- **JavaScript**: 1-2 hours (API integration, interactions)
- **Responsive**: 1 hour (Mobile/tablet breakpoints)
- **Testing & Polish**: 1 hour (Cross-browser, devices)
- **Total**: 6-8 hours

## Reference

Design inspired by: Sagar Thakkar's portfolio (sagarthakkar.com)
- Editorial typography (Source Serif 4 for headings)
- Clean two-column hero layout
- Minimalist card design
- Sophisticated color palette
- Professional portrait photography
