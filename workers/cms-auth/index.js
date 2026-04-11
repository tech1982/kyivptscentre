/**
 * Sveltia CMS / Decap CMS GitHub OAuth handler
 * Deployed as a Cloudflare Worker.
 *
 * Env vars (set as Worker secrets):
 *   GITHUB_CLIENT_ID
 *   GITHUB_CLIENT_SECRET
 */

export default {
  async fetch(request, env) {
    const { pathname, searchParams, origin } = new URL(request.url);

    // ── Step 1: redirect browser to GitHub ──────────────────────────────────
    if (pathname === '/auth') {
      const params = new URLSearchParams({
        client_id: env.GITHUB_CLIENT_ID,
        scope: 'repo,user',
        state: searchParams.get('state') ?? '',
      });
      return Response.redirect(
        `https://github.com/login/oauth/authorize?${params}`,
        302,
      );
    }

    // ── Step 2: GitHub redirects back here with ?code= ───────────────────────
    if (pathname === '/callback') {
      const code = searchParams.get('code');
      if (!code) {
        return new Response('Missing OAuth code', { status: 400 });
      }

      // Exchange code for access token
      const tokenRes = await fetch(
        'https://github.com/login/oauth/access_token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            client_id: env.GITHUB_CLIENT_ID,
            client_secret: env.GITHUB_CLIENT_SECRET,
            code,
          }),
        },
      );

      const data = await tokenRes.json();

      if (data.error || !data.access_token) {
        return new Response(
          `GitHub OAuth error: ${data.error_description ?? data.error}`,
          { status: 400 },
        );
      }

      // Post token back to the CMS window (Netlify/Decap/Sveltia CMS protocol)
      const token = JSON.stringify({
        token: data.access_token,
        provider: 'github',
      });

      const html = `<!DOCTYPE html><html><body><script>
        (function () {
          function cb(e) {
            window.opener.postMessage(
              'authorization:github:success:${token.replace(/'/g, "\\'")}',
              e.origin
            );
          }
          window.addEventListener('message', cb, false);
          window.opener.postMessage('authorizing:github', '*');
        })();
      </script></body></html>`;

      return new Response(html, {
        headers: { 'Content-Type': 'text/html;charset=UTF-8' },
      });
    }

    return new Response('Not found', { status: 404 });
  },
};
