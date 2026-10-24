import { expect, test } from '@playwright/test';
import { mockServices } from './helpers';

test('falls back to the built-in content when Supabase is down', async ({ page }) => {
  await mockServices(page, { content: 'fail' });
  await page.goto('/#work');
  await expect(page.getByRole('heading', { name: 'Kelly Family Agency' })).toBeVisible();
  await expect(page.locator('main')).toHaveAttribute('data-content-source', 'fallback');
});

test('renders work items and their tags from the database', async ({ page }) => {
  await mockServices(page);
  await page.route(/rest\/v1\/work_items/, route => route.fulfill({
    json: [{
      sort: 0, name: 'Test Client', type_label: 'Website · GHL', sector: 'Roofing', headline: 'A test build',
      description: 'From the database.', live_url: null,
      work_item_tags: [{ sort: 2, tags: { name: 'Second' } }, { sort: 1, tags: { name: 'First' } }],
    }],
  }));
  await page.goto('/#work');
  await expect(page.locator('main')).toHaveAttribute('data-content-source', 'supabase');
  const card = page.locator('article', { has: page.getByRole('heading', { name: 'Test Client' }) });
  await expect(card.locator('.tag')).toHaveText(['First', 'Second']);
});

test('keeps built-in content for sections the database returns empty', async ({ page }) => {
  await mockServices(page); // every content table answers []
  await page.goto('/#experience');
  await expect(page.locator('main')).toHaveAttribute('data-content-source', 'supabase');
  await expect(page.getByRole('heading', { name: 'ZZ Med Spa' })).toBeVisible();
});
