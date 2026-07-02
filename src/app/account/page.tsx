"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { BottomNav } from "@/components/layout/BottomNav";
import { Loader2, LogOut } from "lucide-react";
import type { User } from "@supabase/supabase-js";

export default function AccountPage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
  }, [supabase.auth]);

  async function handleSignOut() {
    setSigningOut(true);
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50dvh]">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <>
      <div className="container-app pt-6 pb-28 md:pb-16 max-w-lg">
        <h1 className="text-headline-lg font-serif mb-8">Account</h1>

        <div className="bg-surface-container-low rounded-xl border border-primary/5 p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center text-xl font-serif text-on-secondary-container">
              {user?.email?.[0]?.toUpperCase() ?? "?"}
            </div>
            <div className="min-w-0">
              <p className="font-medium truncate">
                {user?.user_metadata?.full_name ?? "Traveler"}
              </p>
              <p className="text-sm text-on-surface-variant truncate">{user?.email}</p>
            </div>
          </div>

          <div className="border-t border-primary/5 pt-6">
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="w-full flex items-center justify-center gap-2 py-3 border border-primary/20 rounded font-medium text-primary hover:bg-surface-container active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {signingOut ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <LogOut size={18} />
              )}
              Sign Out
            </button>
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
}
