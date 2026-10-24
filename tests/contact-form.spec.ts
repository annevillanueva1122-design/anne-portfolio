import { expect, test } from '@playwright/test';
import { mockServices } from './helpers';

test.describe('Contact form', () => {
  test('saves the message to Supabase, emails it, and clears the form', async ({ page }) => {
    const sent = await mockServices(page);
    await page.goto('/#contact');

    const form = page.getByRole('form', { name: 'Contact form' });
    await form.getByLabel('Name').fill('Jamie Lee');
    await form.getByLabel('Email').fill('jamie@example.com');
    await form.getByLabel(/Company/).fill('Lee Roofing');
    await form.getByLabel('What are you working on?').fill('Need GHL follow-up automation.');
    await form.getByRole('button', { name: 'Send message' }).click();

    await expect(form.getByRole('status')).toHaveText("Message sent. I'll get back to you soon.");
    expect(sent.messages).toHaveLength(1);
    expect(sent.messages[0].postDataJSON()).toEqual({
      name: 'Jamie Lee', email: 'jamie@example.com', company: 'Lee Roofing', message: 'Need GHL follow-up automation.',
    });
    await expect.poll(() => sent.formsubmit.length).toBe(1);
    expect(sent.formsubmit[0].postDataJSON()).toMatchObject({ _replyto: 'jamie@example.com', Name: 'Jamie Lee' });
    await expect(form.getByLabel('Name')).toHaveValue('');
  });

  for (const [what, email, message] of [
    ['an invalid email', 'not-an-email', 'Hello'],
    ['an empty message', 'jamie@example.com', ''],
  ]) {
    test(`blocks ${what} without calling Supabase`, async ({ page }) => {
      const sent = await mockServices(page);
      await page.goto('/#contact');

      const form = page.getByRole('form', { name: 'Contact form' });
      await form.getByLabel('Name').fill('Jamie');
      await form.getByLabel('Email').fill(email);
      await form.getByLabel('What are you working on?').fill(message);
      await form.getByRole('button', { name: 'Send message' }).click();

      await expect(form.getByRole('status')).toHaveText('Please add your name, a valid email and a message.');
      expect(sent.messages).toHaveLength(0);
    });
  }

  test('shows an error and keeps the text when saving fails', async ({ page }) => {
    const sent = await mockServices(page, { messagesStatus: 500 });
    await page.goto('/#contact');

    const form = page.getByRole('form', { name: 'Contact form' });
    await form.getByLabel('Name').fill('Jamie');
    await form.getByLabel('Email').fill('jamie@example.com');
    await form.getByLabel('What are you working on?').fill('Hello');
    await form.getByRole('button', { name: 'Send message' }).click();

    await expect(form.getByRole('status')).toHaveText('Something went wrong. Please email me directly.');
    await expect(form.getByLabel('Name')).toHaveValue('Jamie');
    expect(sent.formsubmit).toHaveLength(0);
  });

  test('silently drops bots that fill the hidden field', async ({ page }) => {
    const sent = await mockServices(page);
    await page.goto('/#contact');

    const form = page.getByRole('form', { name: 'Contact form' });
    await form.locator('input[name="website"]').fill('http://spam.example', { force: true });
    await form.getByLabel('Name').fill('Bot');
    await form.getByLabel('Email').fill('bot@example.com');
    await form.getByLabel('What are you working on?').fill('Buy now');
    await form.getByRole('button', { name: 'Send message' }).click();

    await expect(form.getByRole('status')).toHaveText('Thanks!');
    expect(sent.messages).toHaveLength(0);
  });
});
