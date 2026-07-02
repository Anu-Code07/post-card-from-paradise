/** Canonical site URL — used for OAuth callbacks and metadata */

export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

/** Origin from an incoming request (respects Vercel proxies) */
export function getRequestOrigin(request: Request) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost ?? request.headers.get("host");
  if (!host) return getSiteUrl();

  const proto = request.headers.get("x-forwarded-proto") ?? "https";
  return `${proto}://${host}`;
}

export function getAuthCallbackUrl(origin: string, redirectPath = "/gallery") {
  const path = redirectPath.startsWith("/") ? redirectPath : `/${redirectPath}`;
  return `${origin.replace(/\/$/, "")}/auth/callback?redirect=${encodeURIComponent(path)}`;
}
