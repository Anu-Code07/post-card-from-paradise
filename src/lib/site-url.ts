/** Canonical production URL — OAuth must match Supabase redirect allowlist */
export const PRODUCTION_SITE_URL = "https://post-card-from-paradise.vercel.app";

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

/** Origin for OAuth redirectTo — never send users to localhost from a deployed build */
export function getOAuthRedirectOrigin(clientOrigin?: string) {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  const origin = clientOrigin?.replace(/\/$/, "") ?? "";
  if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
    return origin || "http://localhost:3000";
  }

  return PRODUCTION_SITE_URL;
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
