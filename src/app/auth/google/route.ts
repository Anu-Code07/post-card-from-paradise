import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  getAuthCallbackUrl,
  getOAuthRedirectOrigin,
  getRequestOrigin,
} from "@/lib/site-url";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirect = searchParams.get("redirect") ?? "/gallery";
  const requestOrigin = getRequestOrigin(request);
  const callbackOrigin = getOAuthRedirectOrigin(requestOrigin);

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: getAuthCallbackUrl(callbackOrigin, redirect),
    },
  });

  if (error || !data.url) {
    const loginUrl = new URL("/login", requestOrigin);
    loginUrl.searchParams.set("error", "oauth");
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.redirect(data.url);
}
