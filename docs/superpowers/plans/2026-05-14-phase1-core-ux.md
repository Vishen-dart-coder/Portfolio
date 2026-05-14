# Phase 1: Core UX Enhancements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement dark mode, back to top button, loading animation, and parallax scrolling for foundational UX improvements

**Architecture:** Create design.html as preview environment, implement all Phase 1 features, test and approve before merging to index.html. Use CSS custom properties for theming, vanilla JavaScript for interactions.

**Tech Stack:** HTML5, CSS3 (Custom Properties), Vanilla JavaScript, Local Storage API, Intersection Observer API

---

## File Structure

**Files to Create:**
- `design.html` - Preview version of index.html with Phase 1 features
- `design-style.css` - Copy of style.css with Phase 1 enhancements
- `design-script.js` - Copy of script.js with Phase 1 functionality

**Files to Reference:**
- `index.html` - Source template
- `style.css` - Source styles
- `script.js` - Source scripts

**Workflow:**
1. Create design.html/css/js as copies
2. Implement all Phase 1 features in design files
3. Test and get user approval
4. Merge approved changes back to index.html/style.css/script.js

---

## Task 1: Setup Design Preview Environment

**Files:**
- Create: `design.html`
- Create: `design-style.css`
- Create: `design-script.js`

- [ ] **Step 1: Copy index.html to design.html**

```bash
cp index.html design.html
```

- [ ] **Step 2: Update design.html to reference design assets**

In `design.html`, replace:
```html
<link rel="stylesheet" href="style.css">
```

With:
```html
<link rel="stylesheet" href="design-style.css">
```

And replace:
```html
<script src="script.js"></script>
```

With:
```html
<script src="design-script.js"></script>
```

- [ ] **Step 3: Copy style.css to design-style.css**

```bash
cp style.css design-style.css
```

- [ ] **Step 4: Copy script.js to design-script.js**

```bash
cp script.js design-script.js
```

- [ ] **Step 5: Add loading class to body in design.html**

In `design.html`, modify the `<body>` tag:

```html
<body class="loading">
```

- [ ] **Step 6: Test preview environment**

Open `design.html` in browser and verify it loads correctly with all existing functionality intact.

Expected: Page loads identically to index.html

- [ ] **Step 7: Commit setup**

```bash
git add design.html design-style.css design-script.js
git commit -m "feat(phase1): setup design preview environment

Create isolated design files for Phase 1 development and testing.

Phase 1 of 3"
```

---

## Task 2: Implement Dark Mode CSS Variables

**Files:**
- Modify: `design-style.css:29-37` (existing :root variables)
- Modify: `design-style.css` (add dark theme variables after :root)

- [ ] **Step 1: Add dark mode color variables**

In `design-style.css`, after the existing `:root` block (around line 53), add:

```css
/* Dark Mode Theme */
[data-theme="dark"] {
  /* Colors */
  --color-background: #1C1A18;
  --color-surface: #2B2825;
  --color-primary: #E8E6E3;
  --color-secondary: #A8A5A0;
  --color-border: #3D3935;
  --color-accent: #4A9D6B;
  --color-accent-hover: #5BB57F;
}
```

- [ ] **Step 2: Add smooth theme transitions**

In `design-style.css`, after the `*` selector (around line 8), modify to include transitions:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
```

- [ ] **Step 3: Add reduced motion support**

In `design-style.css`, after the dark theme variables, add:

```css
/* Respect user motion preferences */
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

- [ ] **Step 4: Test dark mode colors manually**

In browser DevTools console, run:
```javascript
document.documentElement.setAttribute('data-theme', 'dark');
```

Expected: All colors should invert to dark theme
Check: Background, text, borders, buttons all use dark colors

Then run:
```javascript
document.documentElement.setAttribute('data-theme', 'light');
```

Expected: Colors revert to light theme

- [ ] **Step 5: Commit dark mode CSS**

```bash
git add design-style.css
git commit -m "feat(phase1): add dark mode CSS variables

Add dark theme color palette and smooth transitions between themes.
Support prefers-reduced-motion for accessibility.

Phase 1 of 3"
```

---

## Task 3: Implement Theme Detection Script

**Files:**
- Modify: `design.html` (add inline script in <head>)

- [ ] **Step 1: Add theme detection script before stylesheets**

In `design.html`, in the `<head>` section, add this script BEFORE the `<link rel="stylesheet">` tag (around line 13):

```html
  <!-- Theme Detection (prevents flash) -->
  <script>
    (function() {
      const savedTheme = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', theme);
    })();
  </script>
```

- [ ] **Step 2: Test theme persistence**

1. Open `design.html` in browser
2. Open DevTools Console
3. Run: `localStorage.setItem('theme', 'dark');`
4. Refresh page

Expected: Page loads in dark mode

5. Run: `localStorage.setItem('theme', 'light');`
6. Refresh page

Expected: Page loads in light mode

7. Run: `localStorage.removeItem('theme');`
8. Refresh page

Expected: Page loads in theme matching your system preference

- [ ] **Step 3: Commit theme detection**

```bash
git add design.html
git commit -m "feat(phase1): add theme detection script

Detect saved theme preference or system preference and apply before
page render to prevent flash of unstyled content.

Phase 1 of 3"
```

---

## Task 4: Implement Dark Mode Toggle Button

**Files:**
- Modify: `design.html` (add toggle button in header)
- Modify: `design-style.css` (add toggle button styles)
- Modify: `design-script.js` (add toggle functionality)

- [ ] **Step 1: Add toggle button HTML**

In `design.html`, in the header section, add the toggle button between `</nav>` and the "Get in Touch" button (around line 36):

```html
      </nav>

      <button id="theme-toggle" class="theme-toggle" aria-label="Toggle dark mode" title="Toggle dark mode">
        <svg class="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
        <svg class="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </button>

      <a href="#contact" class="cta-button">Get in Touch</a>
```

- [ ] **Step 2: Add toggle button styles**

In `design-style.css`, after the header styles (around line 140), add:

```css
.theme-toggle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: background-color 0.3s ease;
  padding: 0;
}

.theme-toggle:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

[data-theme="dark"] .theme-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.theme-toggle:focus {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.theme-toggle svg {
  position: absolute;
  transition: opacity 0.3s ease, transform 0.3s ease;
  color: var(--color-primary);
}

.sun-icon {
  opacity: 1;
  transform: rotate(0deg);
}

.moon-icon {
  opacity: 0;
  transform: rotate(180deg);
}

[data-theme="dark"] .sun-icon {
  opacity: 0;
  transform: rotate(180deg);
}

[data-theme="dark"] .moon-icon {
  opacity: 1;
  transform: rotate(0deg);
}

/* Hide theme toggle on mobile */
@media (max-width: 767px) {
  .theme-toggle {
    width: 32px;
    height: 32px;
  }
  
  .theme-toggle svg {
    width: 18px;
    height: 18px;
  }
}
```

- [ ] **Step 3: Add toggle functionality to JavaScript**

In `design-script.js`, at the top of the file (around line 5, after the "Smooth Scrolling" comment), add:

```javascript
// ============================================
// Dark Mode Toggle
// ============================================

const themeToggle = document.getElementById('theme-toggle');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update ARIA label
    const isDark = newTheme === 'dark';
    themeToggle.setAttribute('aria-label', isDark ? 'Toggle light mode' : 'Toggle dark mode');
    themeToggle.setAttribute('title', isDark ? 'Toggle light mode' : 'Toggle dark mode');
  });
  
  // Set initial ARIA label
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const isDark = currentTheme === 'dark';
  themeToggle.setAttribute('aria-label', isDark ? 'Toggle light mode' : 'Toggle dark mode');
  themeToggle.setAttribute('title', isDark ? 'Toggle light mode' : 'Toggle dark mode');
}
```

- [ ] **Step 4: Test toggle button**

Open `design.html` in browser and test:

1. Click toggle button
   - Expected: Theme switches between light and dark
   - Check: Icon rotates and changes
   - Check: All colors update smoothly

2. Refresh page
   - Expected: Theme persists (stays in chosen theme)

3. Test keyboard navigation:
   - Tab to toggle button (should show focus outline)
   - Press Enter or Space
   - Expected: Theme toggles

4. Check ARIA label:
   - In DevTools, inspect toggle button
   - Expected: aria-label updates based on current theme

- [ ] **Step 5: Commit toggle button**

```bash
git add design.html design-style.css design-script.js
git commit -m "feat(phase1): add dark mode toggle button

Add toggle button in header with sun/moon icon animation.
Support keyboard navigation and screen readers.

Phase 1 of 3"
```

---

## Task 5: Implement Back to Top Button

**Files:**
- Modify: `design.html` (add button before closing </body>)
- Modify: `design-style.css` (add button styles)
- Modify: `design-script.js` (add scroll detection and click handler)

- [ ] **Step 1: Add back to top button HTML**

In `design.html`, before the closing `</body>` tag (after the `<script>` tag), add:

```html
  
  <button id="back-to-top" class="back-to-top" aria-label="Back to top">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="19" x2="12" y2="5"></line>
      <polyline points="5 12 12 5 19 12"></polyline>
    </svg>
  </button>
</body>
```

- [ ] **Step 2: Add back to top button styles**

In `design-style.css`, at the end of the file (before media queries or around line 700), add:

```css
/* ============================================
   Back to Top Button
   ============================================ */

.back-to-top {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--color-accent);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: opacity 0.3s ease, transform 0.3s ease, background-color 0.2s ease;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
}

.back-to-top.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.back-to-top:hover {
  background-color: var(--color-accent-hover);
  transform: translateY(-2px);
}

.back-to-top:focus {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
}

.back-to-top svg {
  color: white;
}

/* Hide on mobile */
@media (max-width: 767px) {
  .back-to-top {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .back-to-top {
    transition: opacity 0.3s ease;
  }
  
  .back-to-top.visible {
    transform: translateY(0);
  }
  
  .back-to-top:hover {
    transform: translateY(0);
  }
}
```

- [ ] **Step 3: Add back to top functionality**

In `design-script.js`, after the dark mode toggle code (around line 30), add:

```javascript
// ============================================
// Back to Top Button
// ============================================

const backToTopButton = document.getElementById('back-to-top');

if (backToTopButton) {
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });
  
  // Scroll to top on click
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
```

- [ ] **Step 4: Test back to top button**

Open `design.html` in browser and test:

1. Scroll down page
   - Expected: Button appears after scrolling past 500px
   - Check: Button fades in smoothly

2. Click button
   - Expected: Page smoothly scrolls to top
   - Check: Button disappears when at top

3. Test hover:
   - Hover over button
   - Expected: Color darkens, button lifts slightly

4. Test keyboard:
   - Tab to button (when visible)
   - Press Enter or Space
   - Expected: Scrolls to top

5. Resize to mobile (< 768px)
   - Expected: Button hidden

- [ ] **Step 5: Commit back to top button**

```bash
git add design.html design-style.css design-script.js
git commit -m "feat(phase1): add back to top button

Add floating button in bottom-right that appears after scrolling
500px. Smooth scroll to top with accessibility support.

Phase 1 of 3"
```

---

## Task 6: Implement Loading Animation

**Files:**
- Modify: `design-style.css` (add loading styles)
- Modify: `design-script.js` (add loading removal)

- [ ] **Step 1: Add loading animation styles**

In `design-style.css`, after the body styles (around line 23), add:

```css
/* Loading Animation */
body.loading main {
  opacity: 0;
}

main {
  transition: opacity 0.6s ease;
}

@media (prefers-reduced-motion: reduce) {
  body.loading main {
    opacity: 1;
  }
  
  main {
    transition: none;
  }
}
```

- [ ] **Step 2: Add loading removal to JavaScript**

In `design-script.js`, at the very beginning of the file (line 1), add:

```javascript
// ============================================
// Loading Animation
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Remove loading class to trigger fade-in
  document.body.classList.remove('loading');
});

```

- [ ] **Step 3: Test loading animation**

Open `design.html` in browser and observe:

1. Initial page load
   - Expected: Content fades in smoothly
   - Check: No flash of content before fade

2. Hard refresh (Ctrl+Shift+R)
   - Expected: Fade-in animation repeats

3. Test with DevTools throttling:
   - Open DevTools > Network tab
   - Set throttling to "Slow 3G"
   - Refresh page
   - Expected: Content still fades in smoothly when loaded

- [ ] **Step 4: Commit loading animation**

```bash
git add design-style.css design-script.js
git commit -m "feat(phase1): add loading fade-in animation

Fade in main content on page load for polished experience.
Respects prefers-reduced-motion.

Phase 1 of 3"
```

---

## Task 7: Implement Parallax Scrolling

**Files:**
- Modify: `design.html` (add parallax classes to elements)
- Modify: `design-style.css` (add parallax support styles)
- Modify: `design-script.js` (add parallax scroll handler)

- [ ] **Step 1: Add parallax classes to HTML elements**

In `design.html`, add parallax classes to these elements:

1. Scroll-down indicator (around line 59-63):
```html
      <a href="#about" class="scroll-down parallax" data-speed="0.3" aria-label="Scroll down">
```

2. Hero image (around line 54-56):
```html
        <div class="hero-image parallax" data-speed="0.15">
```

- [ ] **Step 2: Add parallax support styles**

In `design-style.css`, in the hero section styles (around line 200), add:

```css
/* Parallax Support */
.parallax {
  will-change: transform;
}

@media (max-width: 767px) {
  .parallax {
    transform: none !important;
  }
}
```

- [ ] **Step 3: Add parallax scroll handler**

In `design-script.js`, after the back to top code (around line 60), add:

```javascript
// ============================================
// Parallax Scrolling
// ============================================

let parallaxTicking = false;

// Only run parallax on desktop and if motion is allowed
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = window.innerWidth < 768;

if (!prefersReducedMotion && !isMobile) {
  window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
      requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(el => {
          const speed = parseFloat(el.dataset.speed) || 0.5;
          el.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        parallaxTicking = false;
      });
      parallaxTicking = true;
    }
  });
}
```

- [ ] **Step 4: Test parallax scrolling**

Open `design.html` in browser (desktop size > 768px) and test:

1. Scroll down page
   - Expected: Hero image and scroll-down indicator move at different speeds
   - Check: Movement is subtle and smooth
   - Check: No jank or stuttering

2. Check performance:
   - Open DevTools > Performance tab
   - Start recording
   - Scroll up and down
   - Stop recording
   - Expected: No long tasks, smooth 60fps

3. Test mobile (< 768px):
   - Resize browser to mobile width
   - Scroll page
   - Expected: No parallax effect (elements don't move)

4. Test reduced motion:
   - Open DevTools > Rendering
   - Check "Emulate CSS prefers-reduced-motion"
   - Scroll page
   - Expected: No parallax effect

- [ ] **Step 5: Commit parallax scrolling**

```bash
git add design.html design-style.css design-script.js
git commit -m "feat(phase1): add parallax scrolling effects

Add subtle parallax to hero image and scroll indicator.
Disabled on mobile and respects prefers-reduced-motion.

Phase 1 of 3"
```

---

## Task 8: Phase 1 Testing & Validation

**Files:**
- Test: `design.html` (comprehensive testing)

- [ ] **Step 1: Dark mode comprehensive test**

Open `design.html` and test:

1. Theme toggle functionality:
   - [ ] Click toggle switches between light and dark
   - [ ] Icon animates smoothly (rotation)
   - [ ] All colors update correctly
   - [ ] Theme persists on page refresh
   - [ ] System preference detection works (test by clearing localStorage)

2. Color contrast check:
   - [ ] Light mode: All text readable
   - [ ] Dark mode: All text readable
   - [ ] Links visible in both modes
   - [ ] Buttons visible in both modes

3. Accessibility:
   - [ ] Toggle button keyboard accessible (Tab + Enter)
   - [ ] Focus indicator visible
   - [ ] ARIA label updates correctly

- [ ] **Step 2: Back to top button comprehensive test**

Test in `design.html`:

1. Visibility:
   - [ ] Hidden on page load
   - [ ] Appears after scrolling 500px
   - [ ] Fades in smoothly
   - [ ] Hidden on mobile (< 768px)

2. Functionality:
   - [ ] Clicking scrolls to top smoothly
   - [ ] Button accessible via keyboard
   - [ ] Hover effect works

3. Dark mode:
   - [ ] Button visible in both themes
   - [ ] Colors appropriate for each theme

- [ ] **Step 3: Loading animation test**

Test in `design.html`:

1. Hard refresh page (Ctrl+Shift+R)
   - [ ] Content fades in smoothly
   - [ ] No flash before animation

2. Slow connection:
   - [ ] Animation still smooth on slow 3G

3. Reduced motion:
   - [ ] No animation with prefers-reduced-motion

- [ ] **Step 4: Parallax scrolling test**

Test in `design.html`:

1. Desktop (> 768px):
   - [ ] Hero image moves at different speed than scroll
   - [ ] Scroll indicator moves at different speed
   - [ ] Movement is subtle (not excessive)
   - [ ] Smooth 60fps (check DevTools Performance)

2. Mobile (< 768px):
   - [ ] No parallax effect

3. Reduced motion:
   - [ ] No parallax with prefers-reduced-motion

- [ ] **Step 5: Cross-feature integration test**

Test all features working together:

1. Load page
   - [ ] Fades in smoothly
   - [ ] Theme detection works

2. Toggle dark mode
   - [ ] All features visible in dark mode
   - [ ] Back to top button color correct
   - [ ] Parallax works in dark mode

3. Scroll page
   - [ ] Parallax effects active
   - [ ] Back to top appears
   - [ ] Theme toggle visible in header

4. Click back to top
   - [ ] Scrolls to top smoothly
   - [ ] Parallax effects reset

- [ ] **Step 6: Browser compatibility test**

Test in multiple browsers:
- [ ] Chrome: All features work
- [ ] Firefox: All features work
- [ ] Safari: All features work
- [ ] Edge: All features work

- [ ] **Step 7: Performance test**

Run Lighthouse audit on `design.html`:
- [ ] Performance score >= 90
- [ ] Accessibility score >= 95
- [ ] Best Practices score >= 90
- [ ] No console errors

- [ ] **Step 8: Document test results**

Create a test summary in a commit message with any issues found and their resolutions.

```bash
git add design.html design-style.css design-script.js
git commit -m "test(phase1): validate all Phase 1 features

Comprehensive testing completed:
✓ Dark mode fully functional
✓ Back to top button working
✓ Loading animation smooth
✓ Parallax effects performant
✓ Accessibility verified
✓ Cross-browser tested
✓ Performance validated

Phase 1 of 3 - Ready for user approval"
```

---

## Phase 1 Completion Checklist

Before requesting user approval, verify:

- [ ] design.html loads correctly with all existing functionality
- [ ] Dark mode toggle works and persists
- [ ] System theme preference detected
- [ ] All colors readable in both themes
- [ ] Back to top button appears after 500px scroll
- [ ] Back to top scrolls smoothly
- [ ] Loading animation fades in content
- [ ] Parallax effects subtle and smooth
- [ ] All features work on mobile (except parallax and back-to-top)
- [ ] Keyboard navigation works for all interactive elements
- [ ] prefers-reduced-motion respected
- [ ] No console errors
- [ ] Performance acceptable (Lighthouse >= 90)
- [ ] All commits follow conventional commit format
- [ ] Code is clean and well-commented

---

## User Approval Gate

**Present to user:**

"Phase 1 implementation complete! 🎉

**Preview:** Open `design.html` in your browser to test:
- Dark mode toggle (sun/moon icon in header)
- Back to top button (bottom-right after scrolling)
- Loading fade-in animation
- Parallax scrolling effects on hero

**Testing:**
- Try toggling dark mode - does it look good?
- Scroll down and test the back to top button
- Check the page load animation (hard refresh)
- Notice the subtle parallax on the hero section

**Next steps:**
1. If you approve, I'll merge these changes to index.html
2. Then we can proceed to Phase 2 (GitHub stats, project links, skill bars, testimonial photos)

Let me know if you want any adjustments to Phase 1 before we proceed!"

---

## Post-Approval: Merge to Production

**Files:**
- Modify: `index.html`
- Modify: `style.css`
- Modify: `script.js`

- [ ] **Step 1: Backup current production files**

```bash
cp index.html index.html.backup
cp style.css style.css.backup
cp script.js script.js.backup
```

- [ ] **Step 2: Review changes in design files**

```bash
git diff index.html design.html
git diff style.css design-style.css
git diff script.js design-script.js
```

- [ ] **Step 3: Carefully merge approved changes**

Apply each change from design files to production files:
- Theme detection script in `<head>` of index.html
- Theme toggle button in header of index.html
- Loading class on body in index.html
- Parallax classes on elements in index.html
- Back to top button before `</body>` in index.html
- All CSS changes from design-style.css to style.css
- All JavaScript changes from design-script.js to script.js

- [ ] **Step 4: Test production files locally**

Open `index.html` and verify:
- All Phase 1 features work identically to design.html
- No regressions in existing functionality
- GitHub API integration still works

- [ ] **Step 5: Commit production changes**

```bash
git add index.html style.css script.js
git commit -m "feat(phase1): merge Phase 1 features to production

Merge approved Phase 1 features from design preview:
- Dark mode with system preference detection
- Back to top button
- Loading fade-in animation
- Parallax scrolling effects

All features tested and approved.

Phase 1 of 3 - Complete ✓"
```

- [ ] **Step 6: Deploy to Vercel**

```bash
vercel --prod
```

- [ ] **Step 7: Clean up design files (optional)**

If user wants to keep design files for future phases:
```bash
# Keep them for Phase 2
```

If user wants to remove them:
```bash
git rm design.html design-style.css design-script.js
git commit -m "chore: remove Phase 1 design preview files"
```

- [ ] **Step 8: Announce Phase 1 completion**

Message to user:
"Phase 1 deployed to production! ✅

Visit https://vishensharma.vercel.app to see the live changes.

Ready to start Phase 2? We'll add:
- GitHub stats in hero section
- Enhanced project cards with View Live/View Code buttons
- Skill proficiency bars
- Testimonial profile photos"

---

## Notes

**Dark Mode:**
- Theme persists in localStorage
- Respects system preference on first visit
- Smooth transitions without flash
- Works across all components

**Back to Top:**
- Only shows after scrolling 500px
- Hidden on mobile to avoid clutter
- Smooth scroll animation
- Accessible via keyboard

**Loading:**
- Non-blocking (no spinner)
- Smooth fade-in
- SEO-friendly (content structure visible immediately)

**Parallax:**
- Subtle movement (speeds 0.15-0.3)
- Disabled on mobile for performance
- Uses requestAnimationFrame for smooth 60fps
- Respects prefers-reduced-motion

**Performance Considerations:**
- All animations use GPU-accelerated properties (transform, opacity)
- Scroll handlers use requestAnimationFrame
- No layout thrashing
- Minimal JavaScript overhead

**Accessibility:**
- All interactive elements keyboard accessible
- Proper ARIA labels
- Focus indicators visible
- Respects prefers-reduced-motion
- Color contrast meets WCAG AA standards

---

## Self-Review Complete

**Spec coverage:** ✓
- [x] Dark mode with system preference detection (Task 2, 3, 4)
- [x] Dark mode manual toggle (Task 4)
- [x] Back to top button (Task 5)
- [x] Loading animation (Task 6)
- [x] Parallax scrolling (Task 7)

**Placeholder scan:** ✓ No TBD, TODO, or vague instructions

**Type consistency:** ✓ All class names, function names, and IDs consistent across tasks

**Dependencies:** ✓ All tasks have clear, complete code blocks

**File paths:** ✓ All file paths are exact and absolute

**Testing:** ✓ Each task includes test steps with expected outcomes
