import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import type { Postcard } from "@/lib/types";
import { MoreVertical } from "lucide-react";

interface PostcardCardProps {
  postcard: Postcard;
}

export function PostcardCard({ postcard }: PostcardCardProps) {
  const href =
    postcard.status === "published"
      ? `/p/${postcard.slug}`
      : `/create/${postcard.id}`;

  return (
    <Link href={href} className="group block">
      <div className="aspect-[3/2] relative postcard-shadow mb-4 overflow-hidden bg-surface-container-low border border-primary/10 rounded-sm">
        <div className="absolute inset-0 postcard-inner-glow z-10 pointer-events-none" />
        {postcard.image_url ? (
          <Image
            src={postcard.image_url}
            alt={postcard.title}
            fill
            className="object-cover grayscale-[0.1] group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-surface-container flex items-center justify-center text-on-surface-variant text-sm">
            No image yet
          </div>
        )}
        <div
          className={`absolute top-3 right-3 px-3 py-1 rounded-sm text-label-sm uppercase tracking-tighter ${
            postcard.status === "published"
              ? "bg-white/90 backdrop-blur-sm border border-primary/5"
              : "bg-primary text-on-primary"
          }`}
        >
          {postcard.status === "published" ? "Published" : "Draft"}
        </div>
      </div>
      <div className="flex justify-between items-start gap-2">
        <div className="min-w-0">
          <h3 className="text-headline-md font-serif group-hover:underline decoration-1 underline-offset-4 truncate">
            {postcard.title} from {postcard.location}
          </h3>
          <p className="text-label-sm text-on-surface-variant mt-1 italic">
            {formatDate(postcard.created_at)}
            {postcard.status === "published" && ` • ${postcard.views} views`}
          </p>
        </div>
        <MoreVertical
          size={18}
          className="text-outline shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>
    </Link>
  );
}
