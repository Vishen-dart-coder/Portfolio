# Portfolio Enhancements - Comprehensive Design Specification

**Date:** 2026-05-14  
**Project:** Vishen Sharma Portfolio Website  
**Scope:** Three-phase enhancement rollout

## Executive Summary

This specification outlines comprehensive enhancements to the portfolio website, including dark mode, enhanced GitHub integration, UI improvements, animations, and technical polish. Implementation is structured in three phases for incremental delivery and testing.

## Requirements Summary

### Must-Have Features
- Dark mode with system preference detection and manual toggle
- Back to top button
- LinkedIn social link
- Enhanced project cards with "View Live" and "View Code" buttons
- Skill proficiency progress bars
- Testimonial profile photos
- Hero section metrics from GitHub API
- Contact form with validation (mailto)
- SEO meta tags (Open Graph, Twitter Cards)
- Theme-aware favicons
- Loading animation
- Parallax scrolling effects

### Nice-to-Have Features
- GitHub achievement stats section
- Staggered animations for lists/grids

### Out of Scope
- Blog section (deferred to future)
- Full backend contact form integration
- Twitter/X social link (LinkedIn only)

## Implementation Approach

**Selected Approach:** Phased Rollout (3 phases)

**Rationale:**
- Incremental progress visibility
- Easier issue isolation and testing
- Ability to reprioritize between phases
- User can approve each phase before proceeding

---

## Phase 1: Core UX Enhancements

**Goal:** Establish foundational UX improvements that affect the entire portfolio

### 1.1 Dark Mode System

**Architecture:**
```
User opens page
    ↓
Theme detection script runs (in <head>)
    ↓
Check localStorage for saved preference
    ↓
If no saved preference → detect system theme via matchMedia
    ↓
Apply theme to <html data-theme="light|dark">
    ↓
Render page with appropriate CSS variables
```

**Color Scheme:**

Light mode (current):
- `--color-background: #F8F7F4` (warm cream)
- `--color-surface: #FFFFFF` (white)
- `--color-primary: #111111` (black)
- `--color-secondary: #5F5F5F` (gray)
- `--color-border: #E7E5E4` (light gray)
- `--color-accent: #166534` (forest green)
- `--color-accent-hover: #14532D` (darker green)

Dark mode (inverted warm):
- `--color-background: #1C1A18` (dark warm brown)
- `--color-surface: #2B2825` (warm charcoal)
- `--color-primary: #E8E6E3` (warm off-white)
- `--color-secondary: #A8A5A0` (warm gray)
- `--color-border: #3D3935` (warm dark gray)
- `--color-accent: #4A9D6B` (lighter green for contrast)
- `--color-accent-hover: #5BB57F` (brighter green)

**Toggle Button:**
- Location: Header, between nav links and "Get in Touch" button
- Icon: Sun (☀️) for light mode, Moon (🌙) for dark mode
- SVG icons with smooth rotation transition (180deg)
- Button specs:
  - Size: 36px × 36px
  - Border-radius: 50%
  - Background: transparent with hover state
  - ARIA label: "Toggle dark mode" / "Toggle light mode"
  - Keyboard accessible: Tab + Enter/Space

**CSS Implementation:**
```css
:root {
  /* Light mode variables (existing) */
}

[data-theme="dark"] {
  /* Dark mode variable overrides */
}

* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
```

**JavaScript Implementation:**
```javascript
// In <head> before styles (prevents flash)
(function() {
  const saved = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (systemDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

// In script.js
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}
```

**Accessibility:**
- Respects `prefers-color-scheme`
- Respects `prefers-reduced-motion` for transitions
- Keyboard navigable
- Screen reader friendly with ARIA labels

### 1.2 Back to Top Button

**Behavior:**
- Hidden by default
- Appears when `window.scrollY > 500`
- Fade-in animation (opacity 0 → 1, transform translateY(20px) → 0)
- Smooth scroll to top on click
- Hidden on screens < 768px (mobile)

**Design:**
- Position: Fixed bottom-right (24px from edges)
- Shape: Circular, 48px diameter
- Icon: Up arrow (↑) SVG, 20px
- Background: `var(--color-accent)`
- Shadow: `0 4px 12px rgba(0,0,0,0.15)`
- Hover: Slight lift (`translateY(-2px)`) + darker background
- Z-index: 1000

**HTML:**
```html
<button id="back-to-top" class="back-to-top" aria-label="Back to top">
  <svg><!-- up arrow --></svg>
</button>
```

**JavaScript:**
```javascript
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
```

**Accessibility:**
- Button element (not div)
- ARIA label
- Keyboard accessible
- Focus visible

### 1.3 Loading Animation

**Implementation:**
- Body has `.loading` class initially
- CSS sets `main { opacity: 0; }`
- JavaScript removes `.loading` on `DOMContentLoaded`
- Transition: `opacity 0.6s ease`

**Behavior:**
- No blocking spinner
- Content structure visible immediately (SEO-friendly)
- Smooth fade-in without delay
- Works with existing scroll reveal animations

**CSS:**
```css
body.loading main {
  opacity: 0;
}

main {
  transition: opacity 0.6s ease;
}
```

**JavaScript:**
```javascript
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('loading');
});
```

### 1.4 Parallax Scrolling Effects

**Target Elements:**
- Hero section background (decorative)
- Scroll-down indicator (enhance existing animation)
- Hero image (subtle movement)

**Implementation:**
- Use `requestAnimationFrame` for smooth 60fps
- Calculate `scrollY` and apply `transform: translateY()`
- Parallax speed: 0.3-0.5 (subtle)
- Add `.parallax` class + `data-speed` attribute to elements

**JavaScript:**
```javascript
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax');
      
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.dataset.speed) || 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
      });
      
      ticking = false;
    });
    ticking = true;
  }
});
```

**Accessibility & Performance:**
- Disabled on mobile (< 768px)
- Respects `prefers-reduced-motion`
- Uses GPU-accelerated `transform`
- No layout thrashing

---

## Phase 2: Content Enhancements

**Goal:** Enhance existing content with richer data and interactivity

### 2.1 GitHub Stats & Hero Metrics

**Hero Metrics Bar:**
- Location: Between hero subheading and action buttons
- Layout: Horizontal flex, items separated by `•` bullets
- Metrics:
  1. "7 Years Coding" (static)
  2. "X Projects" (from `public_repos` API field)
  3. "X+ Contributions" (estimated from API)

**Design:**
- Font: 14px, weight: 600
- Color: `var(--color-secondary)`
- Separator: `•` with left/right margin
- Responsive: Stack vertically on mobile < 480px

**GitHub Stats Section:**
- New section: "GitHub Stats" between Skills and Contact
- Grid: 4 cards on desktop, 2 on tablet, 1 on mobile
- Cards display:
  1. Total Stars (sum across all repos)
  2. Total Forks (sum across all repos)
  3. Public Repositories (count)
  4. Top Language (most used language by bytes)

**Card Design:**
- Background: `var(--color-surface)`
- Border: 1px solid `var(--color-border)`
- Padding: `var(--space-md)`
- Border-radius: 8px
- Hover: subtle lift + shadow

**API Implementation:**
```javascript
async function fetchGitHubStats() {
  const userData = await fetch(`https://api.github.com/users/${USERNAME}`);
  const repos = await fetch(`https://api.github.com/users/${USERNAME}/repos`);
  
  const user = await userData.json();
  const reposData = await repos.json();
  
  // Calculate stats
  const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = reposData.reduce((sum, repo) => sum + repo.forks_count, 0);
  const languages = {};
  reposData.forEach(repo => {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  });
  const topLanguage = Object.keys(languages).sort((a,b) => languages[b] - languages[a])[0];
  
  return {
    stars: totalStars,
    forks: totalForks,
    repos: user.public_repos,
    topLanguage
  };
}
```

### 2.2 Enhanced Project Links

**Modification:**
- Check `homepage` field in GitHub API response
- If `homepage` exists and is not empty: show both buttons
- If no `homepage`: show only "View Code" button

**Button Design:**
- "View Live": Primary button
  - Background: `var(--color-accent)`
  - Color: white
  - Icon: External link ↗
- "View Code": Secondary button
  - Background: transparent
  - Border: 1px solid `var(--color-accent)`
  - Color: `var(--color-accent)`
  - Icon: GitHub icon or code brackets

**Layout:**
- Both buttons inline, equal height
- Gap: `var(--space-sm)` between them
- Full width stack on mobile < 480px

**Code Modification:**
```javascript
function renderProjects(repos) {
  container.innerHTML = repos.map(repo => `
    <article class="project-card">
      <h3>${repo.name}</h3>
      <p>${repo.description}</p>
      <div class="metadata">
        ${repo.language ? `<span class="language">${repo.language}</span>` : ''}
        <span class="stars">★ ${repo.stars}</span>
      </div>
      <div class="project-actions">
        ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="btn-primary">View Live ↗</a>` : ''}
        <a href="${repo.url}" target="_blank" class="btn-secondary">View Code</a>
      </div>
    </article>
  `).join('');
}
```

### 2.3 Skill Proficiency Bars

**Implementation:**
- Add `<div class="skill-bar">` after each skill icon
- Bar specs:
  - Height: 4px
  - Width: Matches icon width (48px mobile, 56px desktop)
  - Background: `var(--color-border)`
  - Fill: `var(--color-accent)` at specified percentage
  - Border-radius: 2px

**Proficiency Levels:**
- Primary (90-95%): HTML, CSS, JavaScript, Git, GitHub, VS Code
- Advanced (75-85%): TypeScript, React, Next.js, Node.js, Tailwind CSS, Figma
- Learning (50-65%): Python, Java, MongoDB, AWS, Supabase, Svelte, Angular

**HTML Structure:**
```html
<div class="skill-item">
  <img src="icon.svg" alt="HTML" title="HTML">
  <div class="skill-bar">
    <div class="skill-fill" style="width: 95%" data-proficiency="95"></div>
  </div>
</div>
```

**Animation:**
- Bars animate on scroll reveal (same as section reveal)
- Use CSS transition: `width 1s ease`
- Start from 0%, fill to target percentage
- Staggered delay (each bar +0.1s delay)

**CSS:**
```css
.skill-bar {
  width: 100%;
  height: 4px;
  background: var(--color-border);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 8px;
}

.skill-fill {
  height: 100%;
  background: var(--color-accent);
  width: 0;
  transition: width 1s ease;
}

.revealed .skill-fill {
  width: var(--target-width); /* Set inline or via JS */
}
```

### 2.4 Testimonial Photos

**Implementation:**
- Use UI Avatars API: `https://ui-avatars.com/api/`
- Parameters:
  - `name`: Full name (e.g., "Sarah Mitchell")
  - `background`: `166534` (accent color)
  - `color`: `fff` (white text)
  - `size`: `64` (2x for retina)
  - `rounded`: `true`

**Photo URLs:**
- Sarah Mitchell: `https://ui-avatars.com/api/?name=Sarah+Mitchell&background=166534&color=fff&size=64&rounded=true`
- Michael Chen: `https://ui-avatars.com/api/?name=Michael+Chen&background=166534&color=fff&size=64&rounded=true`
- Emily Rodriguez: `https://ui-avatars.com/api/?name=Emily+Rodriguez&background=166534&color=fff&size=64&rounded=true`

**Layout:**
- Photo: 48px circle, positioned to left of author-info
- Gap: `var(--space-sm)` between photo and info
- Flexbox: `align-items: center`

**HTML Structure:**
```html
<div class="testimonial-author">
  <img src="[avatar-url]" alt="Sarah Mitchell" class="author-avatar">
  <div class="author-info">
    <h4>Sarah Mitchell</h4>
    <p>Senior Product Manager, TechStart</p>
  </div>
</div>
```

---

## Phase 3: Technical Improvements

**Goal:** Polish technical aspects and add professional touches

### 3.1 SEO Meta Tags

**Open Graph Tags:**
```html
<meta property="og:title" content="Vishen Sharma - Developer Portfolio">
<meta property="og:description" content="13-year-old developer from India with 7 years of coding experience. Full-stack developer passionate about web technologies.">
<meta property="og:image" content="[GitHub profile photo URL]">
<meta property="og:url" content="https://vishensharma.vercel.app">
<meta property="og:type" content="website">
```

**Twitter Card Tags:**
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Vishen Sharma - Developer Portfolio">
<meta name="twitter:description" content="13-year-old developer from India with 7 years of coding experience.">
<meta name="twitter:image" content="[GitHub profile photo URL]">
```

**Additional SEO:**
```html
<meta name="keywords" content="developer, portfolio, full-stack, web development, react, next.js, node.js, python, java, mongodb, vishen sharma">
<link rel="canonical" href="https://vishensharma.vercel.app">
```

**Dynamic Image Injection:**
```javascript
async function updateSEOImage() {
  const userData = await fetchGitHubData();
  if (userData && userData.avatar) {
    document.querySelector('meta[property="og:image"]').setAttribute('content', userData.avatar);
    document.querySelector('meta[name="twitter:image"]').setAttribute('content', userData.avatar);
  }
}
```

### 3.2 Contact Form

**Form Fields:**
1. Name (required, type="text", minlength="2")
2. Email (required, type="email")
3. Subject (optional, type="text")
4. Message (required, textarea, minlength="10", rows="5")

**Layout:**
- Desktop (>= 768px):
  - Row 1: Name (50%) | Email (50%)
  - Row 2: Subject (100%)
  - Row 3: Message (100%)
  - Row 4: Submit button (left-aligned)
- Mobile (< 768px):
  - All fields 100% width, stacked

**Design:**
- Input style:
  - Border: 1px solid `var(--color-border)`
  - Border-radius: 4px
  - Padding: 12px 16px
  - Font: inherit
  - Focus: Border color changes to `var(--color-accent)`
- Submit button:
  - Background: `var(--color-accent)`
  - Color: white
  - Padding: 12px 32px
  - Border-radius: 4px
  - Hover: Darker background

**Validation:**
- HTML5 validation attributes
- Custom JavaScript validation for better UX
- Error messages: Red text below field
- Success message: Green banner above form

**mailto Implementation:**
```javascript
const form = document.getElementById('contact-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  if (!validateForm()) return;
  
  const formData = new FormData(form);
  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject') || 'Portfolio Contact';
  const message = formData.get('message');
  
  const body = `From: ${name} (${email})\n\n${message}`;
  const mailtoLink = `mailto:iamvishensharma@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  window.location.href = mailtoLink;
  form.reset();
  showSuccessMessage('Thank you! Your email client will open shortly.');
});

function validateForm() {
  // Custom validation logic
  const name = form.querySelector('[name="name"]').value.trim();
  const email = form.querySelector('[name="email"]').value.trim();
  const message = form.querySelector('[name="message"]').value.trim();
  
  if (name.length < 2) {
    showError('name', 'Name must be at least 2 characters');
    return false;
  }
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError('email', 'Please enter a valid email');
    return false;
  }
  
  if (message.length < 10) {
    showError('message', 'Message must be at least 10 characters');
    return false;
  }
  
  return true;
}
```

### 3.3 Theme-Aware Favicons

**Files to Create:**
- `favicon-light.svg` (existing favicon renamed)
- `favicon-dark.svg` (new inverted version)
- Keep `favicon.ico` for fallback

**Light Mode Favicon:**
- VS letters: Green (`#166534`)
- Background: White or transparent

**Dark Mode Favicon:**
- VS letters: Light green (`#4A9D6B`) or white
- Background: Dark (`#1C1A18`) or transparent

**HTML Implementation:**
```html
<link rel="icon" type="image/svg+xml" href="favicon-light.svg" media="(prefers-color-scheme: light)">
<link rel="icon" type="image/svg+xml" href="favicon-dark.svg" media="(prefers-color-scheme: dark)">
<link rel="icon" type="image/x-icon" href="favicon.ico">
```

### 3.4 LinkedIn Social Icon

**Location:** Footer social icons section, between GitHub and Email

**HTML:**
```html
<a href="https://linkedin.com/in/vishen-sharma" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
</a>
```

**Styling:** Match existing footer icons (GitHub, Email)

---

## Cross-Phase Considerations

### Accessibility

**Keyboard Navigation:**
- All interactive elements focusable
- Visible focus indicators
- Logical tab order

**Screen Readers:**
- Semantic HTML (nav, main, section, article)
- ARIA labels on icon-only buttons
- Alt text on images
- Form labels properly associated

**Motion:**
- Respect `prefers-reduced-motion`:
  - Disable parallax
  - Reduce animation duration to 0.01s
  - Disable staggered animations

**Color Contrast:**
- Light mode: 4.5:1 minimum (WCAG AA)
- Dark mode: 4.5:1 minimum
- Test with contrast checker

### Performance

**JavaScript:**
- Debounce scroll handlers
- Use `requestAnimationFrame` for animations
- Lazy load GitHub API (non-blocking)
- Cache API responses (5 min TTL)

**CSS:**
- Use `transform` and `opacity` for animations (GPU)
- Avoid layout thrashing
- Minimize repaints
- CSS containment where applicable

**Images:**
- Use SVG for icons (scalable)
- Avatar images from CDN (UI Avatars)
- GitHub avatar cached by browser

**Bundle Size:**
- No new dependencies
- Vanilla JavaScript only
- Inline critical CSS for dark mode detection

### Responsive Design

**Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: >= 1024px

**Mobile Considerations:**
- Touch-friendly targets (min 44px)
- No parallax (performance)
- Simplified animations
- Stacked layouts
- Larger font sizes

**Tablet Considerations:**
- 2-column grids where appropriate
- Medium-sized touch targets
- Balance between mobile and desktop features

### Browser Compatibility

**Target:**
- Modern evergreen browsers (last 2 versions)
- Chrome, Firefox, Safari, Edge

**Fallbacks:**
- CSS custom properties (IE11 not supported, acceptable)
- `matchMedia` (widely supported)
- localStorage (check availability)
- SVG (universal support)

**Progressive Enhancement:**
- Site functional without JavaScript
- Dark mode defaults to light if JS disabled
- Form works as basic HTML form
- Links work without JavaScript

---

## Testing Strategy

### Phase 1 Testing

**Dark Mode:**
- [ ] Toggle switches themes
- [ ] System preference detected correctly
- [ ] Theme persists on reload
- [ ] All colors update (including new components)
- [ ] Smooth transitions without flash
- [ ] Toggle accessible via keyboard

**Back to Top:**
- [ ] Appears after 500px scroll
- [ ] Hidden initially and on mobile
- [ ] Smooth scroll to top
- [ ] Accessible via keyboard
- [ ] Hover state works

**Loading Animation:**
- [ ] Content fades in smoothly
- [ ] No layout shift
- [ ] Works with scroll reveals
- [ ] Performance acceptable

**Parallax:**
- [ ] Smooth 60fps
- [ ] Disabled on mobile
- [ ] Respects reduced motion
- [ ] No jank or layout issues

### Phase 2 Testing

**GitHub Stats:**
- [ ] API calls succeed
- [ ] Data renders correctly
- [ ] Hero metrics display
- [ ] Stats section displays
- [ ] Error handling for API failures
- [ ] Loading states

**Project Links:**
- [ ] "View Live" appears when homepage exists
- [ ] "View Code" always appears
- [ ] Links open in new tab
- [ ] Buttons styled correctly
- [ ] Responsive layout

**Skill Bars:**
- [ ] Correct percentages
- [ ] Animate on reveal
- [ ] Staggered timing
- [ ] Responsive sizing
- [ ] Dark mode colors

**Testimonial Photos:**
- [ ] Avatars load correctly
- [ ] Initials correct (SM, MC, ER)
- [ ] Circular crop
- [ ] Proper sizing (48px)
- [ ] Layout correct

### Phase 3 Testing

**SEO:**
- [ ] Meta tags in HTML
- [ ] OG image updates dynamically
- [ ] Validate with opengraph.xyz
- [ ] Validate with Twitter validator
- [ ] Canonical URL correct

**Contact Form:**
- [ ] Validation works (name, email, message)
- [ ] Error messages display
- [ ] Success message shows
- [ ] mailto opens with correct data
- [ ] Form resets after submit
- [ ] Responsive layout

**Favicons:**
- [ ] Light mode favicon shows in light mode
- [ ] Dark mode favicon shows in dark mode
- [ ] Fallback .ico works
- [ ] Test in multiple browsers

**LinkedIn:**
- [ ] Icon displays
- [ ] Link correct
- [ ] Opens in new tab
- [ ] Matches other social icons
- [ ] Accessible

### Cross-Browser Testing

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly (test with NVDA/VoiceOver)
- [ ] Color contrast passes WCAG AA
- [ ] `prefers-reduced-motion` respected
- [ ] Focus indicators visible
- [ ] ARIA labels present and correct

### Performance Testing

- [ ] Lighthouse score >= 90 (all categories)
- [ ] No console errors
- [ ] No layout shifts (CLS < 0.1)
- [ ] Fast load time (LCP < 2.5s)
- [ ] Smooth animations (no jank)
- [ ] API calls non-blocking

---

## Implementation Notes

### File Structure

```
portfolio-website/
├── index.html (main implementation)
├── design.html (preview/testing)
├── style.css
├── script.js
├── favicon-light.svg
├── favicon-dark.svg
├── favicon.ico
├── resume.pdf
└── images/
```

### Git Workflow

Each phase should be:
1. Implemented in feature branch
2. Tested locally
3. Committed with descriptive message
4. Deployed to Vercel
5. User approval before next phase

**Commit Message Format:**
```
feat(phase-X): brief description

Detailed changes:
- Feature 1
- Feature 2
- Feature 3

Phase X of 3
```

### Design Preview Approach

**design.html Strategy:**
- Copy index.html to design.html
- Implement phase features in design.html first
- User previews at localhost or via Vercel preview URL
- Once approved, merge changes into index.html
- Delete or keep design.html as sandbox

---

## Success Criteria

### Phase 1
- [ ] Dark mode fully functional and smooth
- [ ] Back to top button appears and works correctly
- [ ] Page loads with elegant fade-in
- [ ] Parallax effects smooth and performant
- [ ] All features accessible and responsive

### Phase 2
- [ ] GitHub stats display accurately
- [ ] Project links show conditionally based on homepage field
- [ ] Skill bars animate and show correct proficiency
- [ ] Testimonial photos load and display properly
- [ ] Hero metrics visible and accurate

### Phase 3
- [ ] SEO tags present and validated
- [ ] Contact form validates and opens mailto correctly
- [ ] Favicons switch based on theme
- [ ] LinkedIn icon displays and links correctly
- [ ] All features work across browsers

### Overall
- [ ] Portfolio feels polished and professional
- [ ] User experience is smooth and delightful
- [ ] Performance is excellent (Lighthouse 90+)
- [ ] Accessible to all users
- [ ] Mobile experience is excellent
- [ ] Dark mode is beautiful and functional

---

## Future Enhancements (Out of Scope)

These are deferred to future iterations:
- Blog section with markdown support
- Full backend contact form (e.g., Formspree, Web3Forms)
- Twitter/X social integration
- Additional social links (YouTube, Instagram, etc.)
- Advanced animations (page transitions, morphing)
- CMS integration
- Multi-language support
- Print stylesheet

---

## Appendix

### Color Palette Reference

**Light Mode:**
| Variable | Hex | Usage |
|----------|-----|-------|
| background | #F8F7F4 | Page background |
| surface | #FFFFFF | Cards, header |
| primary | #111111 | Headings, body text |
| secondary | #5F5F5F | Secondary text |
| border | #E7E5E4 | Borders, dividers |
| accent | #166534 | Buttons, links |
| accent-hover | #14532D | Hover states |

**Dark Mode:**
| Variable | Hex | Usage |
|----------|-----|-------|
| background | #1C1A18 | Page background |
| surface | #2B2825 | Cards, header |
| primary | #E8E6E3 | Headings, body text |
| secondary | #A8A5A0 | Secondary text |
| border | #3D3935 | Borders, dividers |
| accent | #4A9D6B | Buttons, links |
| accent-hover | #5BB57F | Hover states |

### Skill Proficiency Mapping

**Primary (90-95%):**
- HTML: 95%
- CSS: 95%
- JavaScript: 93%
- Git: 92%
- GitHub: 92%
- VS Code: 90%

**Advanced (75-85%):**
- TypeScript: 85%
- React: 83%
- Next.js: 80%
- Node.js: 82%
- Tailwind CSS: 85%
- Figma: 78%

**Learning (50-65%):**
- Python: 65%
- Java: 60%
- MongoDB: 62%
- AWS: 55%
- Supabase: 58%
- Svelte: 52%
- Angular: 50%

### API Endpoints

**GitHub API:**
- User data: `https://api.github.com/users/Vishen-dart-coder`
- Repositories: `https://api.github.com/users/Vishen-dart-coder/repos?sort=stars&per_page=100`
- Rate limit: 60 req/hour unauthenticated (sufficient for portfolio)

**UI Avatars:**
- Endpoint: `https://ui-avatars.com/api/`
- No rate limit
- No authentication required

---

**End of Specification**
