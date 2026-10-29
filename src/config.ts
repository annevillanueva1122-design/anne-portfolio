// Public settings. The publishable key is safe in client code: Row Level Security
// limits it to reading portfolio content and inserting contact messages.
export const config = {
  supabaseUrl: 'https://yxuqiwjjaqjqiclkdkca.supabase.co',
  supabaseKey: 'sb_publishable_mY9BUHDQH1iThOJyUoY_GQ_WlEJQYB9',
  mediaBase: 'https://yxuqiwjjaqjqiclkdkca.supabase.co/storage/v1/object/public/portfolio',
  notifyEmail: 'anne.villanueva1122@gmail.com',
  bookingUrl:
    'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3CATbpabGfo88_K7s4i1uIv5q5qDJ_MMjLMUJ0v-l1YiSMsb4lDkBt91pB8aoeBIw68ejvvIk6?gv=true',
  cvUrl: '/May-Anne-Guevarra-CV-AI-Solutions-Architect_1.pdf',
  otherCaseStudyUrl: 'https://drive.google.com/file/d/1EnfUswlP_OETKDsfXgoya-Pw2o1JpGsT/view?usp=drive_link',
} as const;

/**
 * Full URL of a file in the Supabase media bucket, e.g. media('img-01.jpg').
 * Images are served as their .webp twin in the bucket (about 30% smaller); video and other files as-is.
 */
export const media = (file: string) => `${config.mediaBase}/${file.replace(/\.(jpe?g|png)$/i, '.webp')}`;
