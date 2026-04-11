/**
 * Cloudflare Pages Function — Contact form handler
 * POST /api/contact → sends email via Resend (or logs if no API key set)
 *
 * Environment variables (set in Cloudflare Pages dashboard):
 *   RESEND_API_KEY  — API key from resend.com (free: 3000 emails/month)
 *   CONTACT_EMAIL   — destination address (e.g. office@pts-centre.kiev.ua)
 */

interface Env {
  RESEND_API_KEY?: string;
  CONTACT_EMAIL?: string;
}

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  // Parse body
  let body: ContactPayload;
  try {
    body = await request.json() as ContactPayload;
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const { name, email, message, phone = '' } = body;

  // Basic validation
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return json({ error: 'Name, email and message are required.' }, 422);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Invalid email address.' }, 422);
  }

  const to = env.CONTACT_EMAIL ?? 'office@pts-centre.kiev.ua';

  // Send via Resend if API key is set
  if (env.RESEND_API_KEY) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Сайт Київ-PTS-Центр <noreply@pts-centre.kiev.ua>',
        to: [to],
        reply_to: email,
        subject: `Новий запит від ${name}`,
        html: `
          <h2>Новий запит із сайту</h2>
          <p><strong>Ім'я:</strong> ${esc(name)}</p>
          <p><strong>Email:</strong> ${esc(email)}</p>
          ${phone ? `<p><strong>Телефон:</strong> ${esc(phone)}</p>` : ''}
          <p><strong>Повідомлення:</strong></p>
          <p style="white-space:pre-wrap">${esc(message)}</p>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Resend error:', err);
      return json({ error: 'Failed to send email. Please call us directly.' }, 502);
    }
  } else {
    // Dev/demo mode: just log
    console.log('Contact form submission (no RESEND_API_KEY):', { name, email, phone, message });
  }

  return json({ ok: true });
};

// Reject non-POST
export const onRequest: PagesFunction = async ({ request, next }) => {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }
  return next();
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
