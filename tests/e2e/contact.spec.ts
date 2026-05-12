import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Scroll to contact section
    await page.locator('#contact, [data-section="contact"]').scrollIntoViewIfNeeded();
  });

  test('should display contact form with all fields', async ({ page }) => {
    const form = page.locator('form');
    await expect(form).toBeVisible();

    // Check for name field
    await expect(form.locator('input[name="name"], input[id="name"]')).toBeVisible();

    // Check for email field
    await expect(form.locator('input[name="email"], input[id="email"]')).toBeVisible();

    // Check for message field
    await expect(form.locator('textarea[name="message"], textarea[id="message"]')).toBeVisible();

    // Check for submit button
    await expect(form.locator('button[type="submit"]')).toBeVisible();
  });

  test('should show validation errors for empty form', async ({ page }) => {
    const form = page.locator('form');

    // Try to submit empty form
    const submitButton = form.locator('button[type="submit"]');
    await submitButton.click();

    // Wait a bit for validation
    await page.waitForTimeout(500);

    // Check for error messages (could be native HTML5 validation or custom)
    const nameInput = form.locator('input[name="name"], input[id="name"]');
    const emailInput = form.locator('input[name="email"], input[id="email"]');
    const messageInput = form.locator('textarea[name="message"], textarea[id="message"]');

    // Check if fields are marked as invalid or have error states
    const nameInvalid = await nameInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
    const emailInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
    const messageInvalid = await messageInput.evaluate((el: HTMLTextAreaElement) => !el.validity.valid);

    expect(nameInvalid || emailInvalid || messageInvalid).toBeTruthy();
  });

  test('should show validation error for invalid email', async ({ page }) => {
    const form = page.locator('form');

    // Fill form with invalid email
    await form.locator('input[name="name"], input[id="name"]').fill('John Doe');
    await form.locator('input[name="email"], input[id="email"]').fill('invalid-email');
    await form.locator('textarea[name="message"], textarea[id="message"]').fill('Test message');

    // Try to submit
    await form.locator('button[type="submit"]').click();

    // Wait for validation
    await page.waitForTimeout(500);

    // Check email field validity
    const emailInput = form.locator('input[name="email"], input[id="email"]');
    const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
    expect(isInvalid).toBeTruthy();
  });

  test('should successfully submit valid form', async ({ page }) => {
    // Note: This will actually send an email if RESEND_API_KEY is configured
    // Consider mocking the API route in a real test environment

    const form = page.locator('form');

    // Fill form with valid data
    await form.locator('input[name="name"], input[id="name"]').fill('Test User');
    await form.locator('input[name="email"], input[id="email"]').fill('test@example.com');
    await form.locator('textarea[name="message"], textarea[id="message"]').fill('This is a test message for E2E testing.');

    // Submit form
    await form.locator('button[type="submit"]').click();

    // Wait for response
    await page.waitForTimeout(2000);

    // Check for success message or form reset
    // This depends on your implementation - adjust as needed
    const successIndicator = page.locator('text=/success|sent|thank you/i, [data-state="success"]');
    const isVisible = await successIndicator.isVisible().catch(() => false);

    // Alternative: check if form was reset
    const nameValue = await form.locator('input[name="name"], input[id="name"]').inputValue();

    // Either success message shown or form was reset
    expect(isVisible || nameValue === '').toBeTruthy();
  });

  test('should have contact links (email, social)', async ({ page }) => {
    // Look for email links
    const emailLink = page.locator('a[href^="mailto:"]');
    const emailCount = await emailLink.count();

    // Look for social links
    const socialLinks = page.locator('a[href*="github.com"], a[href*="linkedin.com"], a[href*="twitter.com"]');
    const socialCount = await socialLinks.count();

    // Should have at least one contact method besides the form
    expect(emailCount + socialCount).toBeGreaterThan(0);
  });
});
