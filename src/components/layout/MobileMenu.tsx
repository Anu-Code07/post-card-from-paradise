"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import type { User } from "@supabase/supabase-js";

interface MobileMenuProps {
  user: User | null;
}

export function MobileMenu({ user }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="tap-target flex items-center justify-center text-primary"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setOpen(false)}
          />
          <nav className="fixed top-[57px] right-0 left-0 z-50 bg-background border-b border-primary/10 p-5 flex flex-col gap-1 shadow-lg">
            {user ? (
              <>
                <Link
                  href="/gallery"
                  onClick={() => setOpen(false)}
                  className="py-3 px-4 text-body-lg hover:bg-surface-container rounded transition-colors"
                >
                  My Postcards
                </Link>
                <Link
                  href="/create"
                  onClick={() => setOpen(false)}
                  className="py-3 px-4 bg-primary text-on-primary rounded text-center font-medium active:scale-95 transition-transform"
                >
                  Create Postcard
                </Link>
                <Link
                  href="/account"
                  onClick={() => setOpen(false)}
                  className="py-3 px-4 text-on-surface-variant hover:bg-surface-container rounded transition-colors"
                >
                  Account
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="py-3 px-4 text-body-lg hover:bg-surface-container rounded transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="py-3 px-4 bg-primary text-on-primary rounded text-center font-medium active:scale-95 transition-transform"
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>
        </>
      )}
    </div>
  );
}
