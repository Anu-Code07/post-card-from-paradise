import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { BRAND_BYLINE, BRAND_NAME } from "@/lib/brand";
import { MobileMenu } from "./MobileMenu";

export async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-primary/5 min-h-[var(--app-header-height)]">
      <div className="container-app flex items-center justify-between py-3 sm:py-3 md:py-4 gap-3 min-h-[var(--app-header-height)]">
        <Link
          href="/"
          className="tap-target flex flex-col shrink-0 leading-tight"
        >
          <span className="text-lg sm:text-headline-md font-serif text-primary font-bold">
            {BRAND_NAME}
          </span>
          <span className="text-[10px] sm:text-xs text-on-surface-variant font-sans tracking-wide mt-0.5">
            {BRAND_BYLINE}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {user ? (
            <>
              <Link
                href="/gallery"
                className="text-label-sm text-on-surface-variant hover:text-primary transition-colors"
              >
                My Postcards
              </Link>
              <Link
                href="/create"
                className="bg-primary text-on-primary px-6 py-2.5 rounded text-label-sm hover:opacity-90 active:scale-95 transition-all"
              >
                Create
              </Link>
              <Link
                href="/account"
                className="text-on-surface-variant hover:text-primary transition-colors tap-target flex items-center"
                aria-label="Account"
              >
                <span className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-sm font-medium text-on-secondary-container">
                  {user.email?.[0]?.toUpperCase() ?? "?"}
                </span>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-label-sm text-on-surface-variant hover:text-primary transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-primary text-on-primary px-6 py-2.5 rounded text-label-sm hover:opacity-90 active:scale-95 transition-all"
              >
                Get Started
              </Link>
            </>
          )}
        </nav>

        <MobileMenu user={user} />
      </div>
    </header>
  );
}
