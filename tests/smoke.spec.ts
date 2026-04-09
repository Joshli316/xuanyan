import { test, expect } from '@playwright/test';

test.describe('XuanYan Smoke Tests', () => {

  test('homepage loads with hero heading', async ({ page }) => {
    await page.goto('/');
    // Nav brand should contain "XuanYan"
    await expect(page.locator('.nav-logo')).toContainText('XuanYan');
    // Hero heading — English default
    await expect(page.locator('.hero h1')).toContainText('Where Missions History Meets AI Innovation');
  });

  test('research page shows 12 report cards', async ({ page }) => {
    await page.goto('/#/research');
    // Wait for the report grid to populate
    const cards = page.locator('.report-card');
    await expect(cards).toHaveCount(12);
  });

  test('report detail loads for report 01', async ({ page }) => {
    await page.goto('/#/research/01');
    // The report title should appear in the main content
    await expect(page.locator('.report-content h1')).toContainText(
      'Christian Missions in China'
    );
  });

  test('timeline page loads with events', async ({ page }) => {
    await page.goto('/#/research/timeline');
    // Wait for async timeline data to load and render
    const events = page.locator('.timeline-event');
    await expect(events.first()).toBeVisible({ timeout: 10_000 });
    // Should have many events (71 in the dataset)
    const count = await events.count();
    expect(count).toBeGreaterThan(10);
  });

  test('tools hub shows tool cards', async ({ page }) => {
    await page.goto('/#/tools');
    // Tool cards are rendered as .card links inside .offer-grid
    const cards = page.locator('.offer-grid .card');
    await expect(cards.first()).toBeVisible();
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('search modal opens on Cmd+K', async ({ page }) => {
    await page.goto('/');
    const modal = page.locator('#search-modal');
    // Modal should not have the "open" class initially
    await expect(modal).not.toHaveClass(/open/);
    // Press Ctrl+K (works cross-platform; app accepts both Meta+K and Ctrl+K)
    await page.keyboard.press('Control+k');
    // Modal should now have the "open" class
    await expect(modal).toHaveClass(/open/);
    // Search input should be focused
    await expect(page.locator('.search-input')).toBeFocused();
  });

  test('language toggle switches to Chinese', async ({ page }) => {
    await page.goto('/');
    // Click the CN button
    await page.locator('.lang-toggle button[data-lang="cn"]').click();
    // Hero heading should now be in Chinese
    await expect(page.locator('.hero h1')).toContainText('当宣教历史遇见人工智能');
    // Nav links should be translated
    await expect(page.locator('.nav-links a').first()).toContainText('研究');
  });

  test('retention calculator has sliders and shows result', async ({ page }) => {
    await page.goto('/#/tools/retention');
    // Should have 5 sliders
    const sliders = page.locator('.calc-slider');
    await expect(sliders).toHaveCount(5);
    // Result area should be populated (showResult is called on init)
    const resultArea = page.locator('#result-area');
    await expect(resultArea).not.toBeEmpty();
    // Should show a percentage in the gauge
    await expect(resultArea.locator('text')).toContainText('%');
    // Calculate button should be present
    await expect(page.locator('#calc-btn')).toBeVisible();
  });

});
