"use client";

import { cn } from "@/lib/utils";

interface LayoutPhotoProps {
  src: string;
  className?: string;
  alt?: string;
}

/** Native img — reliable for blob uploads and Supabase URLs in the editor */
export function LayoutPhoto({ src, className, alt = "" }: LayoutPhotoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={cn("absolute inset-0 w-full h-full object-cover", className)} />
  );
}
