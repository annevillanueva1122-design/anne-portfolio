import { createClient } from '@supabase/supabase-js';
import { config } from '../config';

export const supabase = createClient(config.supabaseUrl, config.supabaseKey, {
  auth: { persistSession: false },
});

export interface ContactMessage {
  name: string;
  email: string;
  company: string | null;
  message: string;
}

/** Saves the message (source of truth), then emails it. A failed email never fails the send. */
export async function sendMessage(msg: ContactMessage): Promise<void> {
  const { error } = await supabase.from('messages').insert(msg);
  if (error) throw new Error(error.message);

  fetch(`https://formsubmit.co/ajax/${config.notifyEmail}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      _subject: `New portfolio message from ${msg.name}`,
      _template: 'table',
      _captcha: 'false',
      _replyto: msg.email,
      Name: msg.name,
      Email: msg.email,
      Company: msg.company ?? '-',
      Message: msg.message,
    }),
  }).catch(() => {});
}
