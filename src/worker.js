const SECURITY_HEADERS = Object.freeze({
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "upgrade-insecure-requests"
  ].join("; "),
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY"
});

const PUBLIC_LOCALES = Object.freeze([
  "en", "it", "de", "fr", "es", "nl", "pt", "pl", "ro", "cs", "sv", "el", "da", "fi", "zh-CN"
]);

function withSecurityHeaders(response, options = {}) {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) headers.set(name, value);
  headers.set("Cache-Control", options.cacheControl || "public, max-age=300");
  if (options.noIndex) headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

function isHiddenRussianContext(url) {
  const path = url.pathname.toLowerCase();
  return path === "/ru" || path.startsWith("/ru/") || url.searchParams.get("lang") === "ru";
}

function createRobots(origin) {
  return new Response(`User-agent: *\nAllow: /\nDisallow: /ru\nDisallow: /ru/\nSitemap: ${origin}/sitemap.xml\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}

function createSitemap(origin) {
  const urls = [origin, ...PUBLIC_LOCALES.filter((locale) => locale !== "en").map((locale) => `${origin}/?lang=${locale.toLowerCase()}`)];
  const entries = urls.map((url) => `  <url><loc>${url.replaceAll("&", "&amp;")}</loc></url>`).join("\n");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
}

export async function handleRequest(request, env) {
  const url = new URL(request.url);
  const origin = env.PUBLIC_ORIGIN || url.origin;

  if (request.method !== "GET" && request.method !== "HEAD") {
    return withSecurityHeaders(json({ error: "method_not_allowed" }, 405), { cacheControl: "no-store" });
  }

  if (url.pathname === "/api/health") {
    return withSecurityHeaders(json({
      status: "ok",
      product: "CLARYEL Web Community",
      version: env.PRODUCT_VERSION || "0.1.0"
    }), { cacheControl: "no-store" });
  }

  if (url.pathname === "/api/public-config") {
    return withSecurityHeaders(json({
      product: "CLARYEL Web Community",
      edition: "community",
      freeSiteLimit: Number.parseInt(env.FREE_SITE_LIMIT || "2", 10),
      publicOrigin: origin,
      publicLocales: PUBLIC_LOCALES,
      hiddenLocales: ["ru"],
      aiMode: "chatgpt-application"
    }), { cacheControl: "public, max-age=300" });
  }

  if (url.pathname === "/robots.txt") {
    return withSecurityHeaders(createRobots(origin), { cacheControl: "public, max-age=3600" });
  }

  if (url.pathname === "/sitemap.xml") {
    return withSecurityHeaders(createSitemap(origin), { cacheControl: "public, max-age=3600" });
  }

  const noIndex = isHiddenRussianContext(url);
  let assetResponse = await env.ASSETS.fetch(request);
  if (assetResponse.status === 404 && !url.pathname.includes(".")) {
    assetResponse = await env.ASSETS.fetch(new Request(new URL("/index.html", url), request));
  }
  return withSecurityHeaders(assetResponse, {
    cacheControl: url.pathname.includes(".") ? "public, max-age=86400" : "public, max-age=300",
    noIndex
  });
}

export default { fetch: handleRequest };
