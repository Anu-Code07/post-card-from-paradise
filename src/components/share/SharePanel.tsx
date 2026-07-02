"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { getShareUrl } from "@/lib/utils";
import type { Postcard } from "@/lib/types";
import { PostcardPreview } from "@/components/editor/PostcardPreview";
import { EnvelopeReveal } from "@/components/share/EnvelopeReveal";
import { STYLES } from "@/lib/styles";
import { tweaksFromPostcard } from "@/lib/customization";

interface SharePanelProps {
  postcard: Postcard;
  senderName: string;
  justPublished?: boolean;
}

export function SharePanel({ postcard, senderName, justPublished }: SharePanelProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? getShareUrl(postcard.slug) : `/p/${postcard.slug}`;
  const styleLabel = STYLES.find((s) => s.id === postcard.style);

  const preview = (
    <PostcardPreview
      imageUrl={postcard.image_url}
      title={postcard.title}
      location={postcard.location}
      message={postcard.message}
      style={postcard.style}
      layout={postcard.layout ?? "editorial"}
      font={postcard.font ?? "caslon"}
      size="large"
      flippable
      titleX={postcard.title_x}
      titleY={postcard.title_y}
      locationX={postcard.location_x}
      locationY={postcard.location_y}
      backImageUrl={postcard.back_image_url}
      colorMode={postcard.color_mode ?? "paper"}
      vignette={postcard.vignette ?? "none"}
      grain={postcard.grain ?? false}
      tweaks={tweaksFromPostcard(postcard)}
    />
  );

  async function copyLink() {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function nativeShare() {
    if (navigator.share) {
      await navigator.share({
        title: `${postcard.title} from ${postcard.location}`,
        text: postcard.message || "Check out my postcard!",
        url: shareUrl,
      });
    } else {
      copyLink();
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
      <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 sm:p-8 bg-surface-container-low rounded-xl border border-primary/5">
        {justPublished ? (
          <div className="w-full max-w-[min(100%,52rem)] mx-auto animate-float">
            {preview}
          </div>
        ) : (
          <EnvelopeReveal
            slug={postcard.slug}
            senderName={senderName}
            className="w-full max-w-[min(100%,52rem)] mx-auto"
          >
            {preview}
          </EnvelopeReveal>
        )}
        <div className="mt-6 flex gap-3 text-label-sm text-on-surface-variant">
          <span className="text-secondary uppercase tracking-widest">
            {styleLabel?.label} ({styleLabel?.era})
          </span>
          <span>•</span>
          <span className="italic">{postcard.views} views</span>
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col gap-4">
        <div className="bg-surface-container-high p-6 sm:p-8 rounded-xl space-y-6">
          <div>
            <span className="text-label-sm text-primary block mb-2">Direct Link</span>
            <div className="relative flex items-center">
              <input
                readOnly
                value={shareUrl}
                className="w-full bg-transparent border-b-2 border-primary py-3 pr-12 focus:outline-none text-sm sm:text-base truncate"
              />
              <button
                onClick={copyLink}
                className="absolute right-0 tap-target text-on-surface-variant hover:text-primary active:scale-95"
                aria-label="Copy link"
              >
                {copied ? (
                  <Check size={20} className="text-green-600" />
                ) : (
                  <Copy size={20} />
                )}
              </button>
            </div>
          </div>

          <button
            onClick={nativeShare}
            className="w-full bg-primary text-on-primary py-4 rounded font-medium flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          >
            <Share2 size={18} />
            Share Postcard
          </button>
        </div>

        {postcard.message && (
          <div className="bg-surface-container p-6 rounded-xl border border-primary/5">
            <span className="text-label-sm text-on-surface-variant block mb-2">
              Message
            </span>
            <p className="font-serif italic text-lg leading-relaxed">
              &ldquo;{postcard.message}&rdquo;
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
