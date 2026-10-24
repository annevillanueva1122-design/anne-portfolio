import type { Page, Request } from '@playwright/test';

export interface Captured { messages: Request[]; formsubmit: Request[] }

/**
 * Keeps tests off the real services: Supabase, FormSubmit, Google Calendar and fonts are all mocked.
 * `messagesStatus` sets what the messages insert returns (201 = saved).
 */
export async function mockServices(page: Page, opts: { messagesStatus?: number; content?: 'empty' | 'fail' } = {}): Promise<Captured> {
  const captured: Captured = { messages: [], formsubmit: [] };

  await page.route(/supabase\.co\/rest\/v1\/messages/, route => {
    captured.messages.push(route.request());
    return route.fulfill({ status: opts.messagesStatus ?? 201, body: '' });
  });
  await page.route(/supabase\.co\/rest\/v1\/(?!messages)/, route =>
    opts.content === 'fail' ? route.abort() : route.fulfill({ json: [] }));
  await page.route(/supabase\.co\/storage\//, route => route.fulfill({ status: 404, body: '' }));
  await page.route('https://formsubmit.co/**', route => {
    captured.formsubmit.push(route.request());
    return route.fulfill({ json: { success: 'true' } });
  });
  await page.route('https://calendar.google.com/**', route =>
    route.fulfill({ contentType: 'text/html', body: '<h1>Booking calendar</h1>' }));
  await page.route(/fonts\.(googleapis|gstatic)\.com/, route => route.abort());
  return captured;
}
