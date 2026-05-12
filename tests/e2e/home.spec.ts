import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display hero section with name and role', async ({ page }) => {
    // Check for main heading
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();

    // Check for description or role
    await expect(page.locator('text=/developer|engineer|designer/i')).toBeVisible();
  });

  test('should have functional navigation', async ({ page }) => {
    // Check navigation links exist
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    // Test navigation links
    await expect(nav.getByRole('link', { name: /work/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /blog/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /contact/i })).toBeVisible();
  });

  test('should display work projects section', async ({ page }) => {
    // Scroll to work section
    await page.locator('#work, [data-section="work"]').scrollIntoViewIfNeeded();

    // Check for work section heading
    await expect(page.getByRole('heading', { name: /work|projects/i })).toBeVisible();

    // Check for project cards
    const projectCards = page.locator('[data-testid="project-card"], .project-card, article');
    const count = await projectCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display GitHub stats section', async ({ page }) => {
    // Scroll to GitHub section
    await page.locator('#github, [data-section="github"]').scrollIntoViewIfNeeded();

    // Check for GitHub section
    const githubSection = page.locator('text=/github|contributions/i');
    await expect(githubSection.first()).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip();
    }

    // Check that main content is visible
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // Check that navigation is accessible (may be hamburger menu)
    const nav = page.locator('nav, [role="navigation"]');
    await expect(nav).toBeVisible();
  });

  test('should have contact form section', async ({ page }) => {
    // Scroll to contact section
    await page.locator('#contact, [data-section="contact"]').scrollIntoViewIfNeeded();

    // Check for contact heading
    await expect(page.getByRole('heading', { name: /contact/i })).toBeVisible();

    // Check for form
    await expect(page.locator('form')).toBeVisible();
  });

  test('should have footer with social links', async ({ page }) => {
    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded();

    // Check footer is visible
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Check for social or external links
    const links = footer.locator('a[href^="http"], a[href^="https"]');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
  });
});
