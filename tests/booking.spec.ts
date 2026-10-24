import { expect, test } from '@playwright/test';
import { mockServices } from './helpers';

test.describe('Discovery call booking', () => {
  test.beforeEach(async ({ page }) => {
    await mockServices(page);
    await page.goto('/#contact');
  });

  test('calendar stays hidden until the button is clicked', async ({ page }) => {
    await expect(page.getByRole('dialog', { name: 'Book a discovery call' })).toHaveCount(0);
    await expect(page.locator('iframe')).toHaveCount(0);

    await page.getByRole('button', { name: 'Book your discovery call with me' }).click();

    const dialog = page.getByRole('dialog', { name: 'Book a discovery call' });
    await expect(dialog).toBeVisible();
    await expect(dialog.locator('iframe')).toHaveAttribute('src', /calendar\.google\.com\/calendar\/appointments\/schedules\//);
    await expect(page.frameLocator('iframe').getByRole('heading', { name: 'Booking calendar' })).toBeVisible();
  });

  test('closes with the × button', async ({ page }) => {
    await page.getByRole('button', { name: 'Book your discovery call with me' }).click();
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });

  test('closes with Escape and gives page scrolling back', async ({ page }) => {
    await page.getByRole('button', { name: 'Book your discovery call with me' }).click();
    await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  });

  test('closes when clicking outside the calendar', async ({ page }) => {
    await page.getByRole('button', { name: 'Book your discovery call with me' }).click();
    await page.getByRole('dialog').click({ position: { x: 5, y: 5 } });
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });
});
