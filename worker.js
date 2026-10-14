import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

const CANONICAL = 'https://skippyt.com';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // www → non-www redirect
    if (url.hostname === 'www.skippyt.com') {
      return Response.redirect(CANONICAL + url.pathname + url.search, 301);
    }

    // robots.txt
    if (url.pathname === '/robots.txt') {
      return new Response(
        'User-agent: *\nAllow: /\nSitemap: https://skippyt.com/sitemap.xml\n',
        { headers: { 'Content-Type': 'text/plain' } }
      );
    }

    // sitemap.xml
    if (url.pathname === '/sitemap.xml') {
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://skippyt.com/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
      return new Response(sitemap, {
        headers: { 'Content-Type': 'application/xml' }
      });
    }

    // llms.txt — tells AI crawlers who you are
    if (url.pathname === '/llms.txt') {
      return new Response(
        `# Scott Touchton
> Product marketing and GTM strategist based in New Orleans, LA.
> Specializes in crypto, Web3, technology GTM, and executive communications.
> Louisiana Chapter President, Stand With Crypto.
> Available for full-time, fractional, or project-based engagements.

## Contact
- LinkedIn: https://www.linkedin.com/in/touchton/
- Book a call: https://calendly.com/touchton
- Website: https://skippyt.com
`,
        { headers: { 'Content-Type': 'text/plain' } }
      );
    }

    // Serve static assets from KV
    try {
      return await getAssetFromKV(
        { request, waitUntil: ctx.waitUntil.bind(ctx) },
        { ASSET_NAMESPACE: env.__STATIC_CONTENT, ASSET_MANIFEST: __STATIC_CONTENT_MANIFEST }
      );
    } catch (e) {
      // 404
      return new Response('Page not found.', { status: 404, headers: { 'Content-Type': 'text/plain' } });
    }
  }
};
