// Supabase settings for the portfolio.
// The anon key is meant to be public; Row Level Security in schema.sql
// limits it to reading portfolio content and sending contact messages.
// Leave supabaseUrl empty and the site runs fully static from assets/.
window.SITE_CONFIG = {
  supabaseUrl: 'https://yxuqiwjjaqjqiclkdkca.supabase.co',
  supabaseAnonKey: 'sb_publishable_mY9BUHDQH1iThOJyUoY_GQ_WlEJQYB9', // publishable key (safe to share)
  // Where images and the video load from. 'assets' = files in this repo.
  // After uploading to the Supabase bucket, set it to:
  // 'https://abcdxyz.supabase.co/storage/v1/object/public/portfolio'
  mediaBase: 'https://yxuqiwjjaqjqiclkdkca.supabase.co/storage/v1/object/public/portfolio',
  // Contact form messages are also emailed here (via FormSubmit, no API key).
  // The first message sends an activation email: click the link in it once.
  notifyEmail: 'anne.villanueva1122@gmail.com'
};
