import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { PostcardCard } from "@/components/gallery/PostcardCard";
import { BottomNav } from "@/components/layout/BottomNav";
import type { Postcard } from "@/lib/types";

export default async function GalleryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: postcards } = await supabase
    .from("postcards")
    .select("*")
    .eq("user_id", user!.id)
    .order("updated_at", { ascending: false });

  const items = (postcards ?? []) as Postcard[];

  return (
    <>
      <div className="container-app pt-5 pb-28 sm:pt-6 md:pb-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-12">
          <div>
            <h1 className="text-headline-lg font-serif italic">Your Saved Memories</h1>
            <p className="text-on-surface-variant mt-2 text-sm md:text-base">
              {items.length === 0
                ? "No postcards yet — create your first one."
                : `${items.length} postcard${items.length === 1 ? "" : "s"}`}
            </p>
          </div>
          <Link
            href="/create"
            className="hidden md:inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-2.5 rounded font-medium hover:opacity-90 active:scale-95 transition-all"
          >
            <Plus size={18} />
            New Postcard
          </Link>
        </div>

        {items.length === 0 ? (
          <Link
            href="/create"
            className="border-2 border-dashed border-outline-variant flex flex-col items-center justify-center p-12 md:p-16 text-center hover:bg-surface-container transition-colors rounded-sm min-h-[240px]"
          >
            <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center mb-4">
              <Plus size={28} className="text-primary" />
            </div>
            <h3 className="font-serif text-lg">New Memory</h3>
            <p className="text-on-surface-variant mt-2 text-sm">
              Start creating your first postcard
            </p>
          </Link>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            {items.map((postcard) => (
              <PostcardCard key={postcard.id} postcard={postcard} />
            ))}
            <Link
              href="/create"
              className="border-2 border-dashed border-outline-variant flex flex-col items-center justify-center p-8 text-center hover:bg-surface-container transition-colors rounded-sm min-h-[180px]"
            >
              <Plus size={24} className="text-primary mb-2" />
              <span className="font-serif">New Memory</span>
            </Link>
          </section>
        )}
      </div>
      <BottomNav />
    </>
  );
}
