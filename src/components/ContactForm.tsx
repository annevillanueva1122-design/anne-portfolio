import { useState, type FormEvent } from 'react';
import { isEmail } from '../lib/format';
import { sendMessage, type ContactMessage } from '../lib/supabase';

type Status = { kind: 'idle' | 'sending' | 'ok' | 'err'; text: string };

/** Contact form: validates, saves to Supabase, then emails a copy. `send` is injectable for tests. */
export function ContactForm({ send = sendMessage }: { send?: (m: ContactMessage) => Promise<void> }) {
  const [status, setStatus] = useState<Status>({ kind: 'idle', text: '' });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (d.website) { setStatus({ kind: 'ok', text: 'Thanks!' }); return; } // bot trap
    if (!d.name?.trim() || !d.message?.trim() || !isEmail(d.email ?? '')) {
      setStatus({ kind: 'err', text: 'Please add your name, a valid email and a message.' });
      return;
    }
    setStatus({ kind: 'sending', text: 'Sending…' });
    try {
      await send({ name: d.name.trim(), email: d.email.trim(), company: d.company?.trim() || null, message: d.message.trim() });
      form.reset();
      setStatus({ kind: 'ok', text: "Message sent. I'll get back to you soon." });
    } catch {
      setStatus({ kind: 'err', text: 'Something went wrong. Please email me directly.' });
    }
  }

  return (
    <form className="cform" noValidate onSubmit={onSubmit} aria-label="Contact form">
      <label>Name<input name="name" required maxLength={120} autoComplete="name" /></label>
      <label>Email<input name="email" type="email" required maxLength={200} autoComplete="email" /></label>
      <label className="full"><span>Company <span style={{ fontWeight: 400 }}>(optional)</span></span><input name="company" maxLength={160} autoComplete="organization" /></label>
      <label className="full">What are you working on?<textarea name="message" required maxLength={5000} /></label>
      <label className="hp" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <div className="btnrow full">
        <button className="btn dark" type="submit" disabled={status.kind === 'sending'}>Send message →</button>
        <span className={`status ${status.kind === 'ok' ? 'ok' : status.kind === 'err' ? 'err' : ''}`} role="status" aria-live="polite">{status.text}</span>
      </div>
    </form>
  );
}
