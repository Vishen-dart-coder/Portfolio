import { test, expect } from '@playwright/test';

test.describe('Blog', () => {
  test('should display blog index page', async ({ page }) => {
    await page.goto('/blog');

    // Check for blog heading
    await expect(page.getByRole('heading', { name: /blog|articles|posts/i })).toBeVisible();

    // Check for blog posts list
    const posts = page.locator('article, [data-testid="blog-post"]');
    const count = await posts.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should navigate to individual blog post', async ({ page }) => {
    await page.goto('/blog');

    // Click on first blog post link
    const firstPostLink = page.locator('article a, [data-testid="blog-post"] a').first();
    await firstPostLink.click();

    // Wait for navigation
    await page.waitForLoadState('networkidle');

    // Check we're on a blog post page
    expect(page.url()).toContain('/blog/');

    // Check for post content
    await expect(page.locator('article, main')).toBeVisible();
  });

  test('should render MDX content correctly', async ({ page }) => {
    await page.goto('/blog');

    // Navigate to first post
    const firstPostLink = page.locator('article a, [data-testid="blog-post"] a').first();
    await firstPostLink.click();
    await page.waitForLoadState('networkidle');

    // Check for common MDX elements
    const article = page.locator('article, main');
    await expect(article).toBeVisible();

    // Check for heading
    const heading = article.getByRole('heading').first();
    await expect(heading).toBeVisible();

    // Check for paragraphs or content
    const paragraphs = article.locator('p');
    const count = await paragraphs.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have back navigation to blog index', async ({ page }) => {
    await page.goto('/blog');

    // Navigate to first post
    const firstPostLink = page.locator('article a, [data-testid="blog-post"] a').first();
    await firstPostLink.click();
    await page.waitForLoadState('networkidle');

    // Look for back link or navigation
    const backLink = page.locator('a[href="/blog"], a:has-text("back")').first();
    await expect(backLink).toBeVisible();

    // Click back
    await backLink.click();
    await page.waitForLoadState('networkidle');

    // Should be back on blog index
    expect(page.url()).toContain('/blog');
    await expect(page.getByRole('heading', { name: /blog|articles|posts/i })).toBeVisible();
  });
});
