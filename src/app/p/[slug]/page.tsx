import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { BRAND_NAME } from "@/lib/brand";
import { SharePanel } from "@/components/share/SharePanel";
import type { Postcard } from "@/lib/types";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ published?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("postcards")
    .select("title, location, message, image_url")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!data) return { title: "Postcard Not Found" };

  return {
    title: `${data.title} from ${data.location} | ${BRAND_NAME}`,
    description: data.message || `A postcard from ${data.location}`,
    openGraph: {
      title: `${data.title} from ${data.location}`,
      description: data.message || "A shared postcard",
      images: data.image_url ? [{ url: data.image_url }] : [{ url: "/icon.png" }],
    },
  };
}

export default async function SharePage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { published } = await searchParams;
  const supabase = await createClient();

  const { data } = await supabase
    .from("postcards")
    .select("*, profiles(full_name, email)")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!data) notFound();

  await supabase.rpc("increment_postcard_views", { postcard_slug: slug });

  const postcard = data as Postcard & {
    profiles?: { full_name: string | null; email: string | null } | null;
  };
  const senderName =
    postcard.profiles?.full_name?.trim() ||
    postcard.profiles?.email?.split("@")[0] ||
    "a friend";

  return (
    <div className="container-app pt-6 pb-12 sm:pt-8 md:pt-12">
      <header className="text-center mb-8 sm:mb-10 md:mb-14 px-2">
        <h1 className="text-headline-lg sm:text-display-lg font-serif text-primary mb-3">
          {published ? "Your memory is ready to share." : "A postcard for you."}
        </h1>
        <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto">
          {published
            ? "Copy the link below or share it directly."
            : "Someone sent you a postcard from their travels."}
        </p>
      </header>

      <SharePanel postcard={postcard} senderName={senderName} justPublished={published === "1"} />

      <div className="mt-12 text-center">
        <Link
          href="/signup"
          className="text-label-sm text-primary border-b border-primary hover:pb-1 transition-all"
        >
          Make your own postcard →
        </Link>
      </div>
    </div>
  );
}
