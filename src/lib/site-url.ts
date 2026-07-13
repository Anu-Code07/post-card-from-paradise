const DEFAULT_POST_AUTH_REDIRECT = "/gallery";

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

export function getAuthRedirectOrigin(currentOrigin?: string) {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  return (currentOrigin ?? getSiteUrl()).replace(/\/$/, "");
}

export function getSafeRedirectPath(redirectPath?: string | null) {
  if (!redirectPath || !redirectPath.startsWith("/") || redirectPath.startsWith("//")) {
    return DEFAULT_POST_AUTH_REDIRECT;
  }

  return redirectPath;
}

export function getAuthCallbackUrl(origin: string, redirectPath = DEFAULT_POST_AUTH_REDIRECT) {
  const callbackUrl = new URL("/auth/callback", origin.replace(/\/$/, ""));
  callbackUrl.searchParams.set("redirect", getSafeRedirectPath(redirectPath));

  return callbackUrl.toString();
}
