"use client";

import { useDropzone } from "react-dropzone";
import { ImagePlus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackPhotoUploadProps {
  imageUrl: string | null;
  onImageChange: (url: string | null, file: File | null) => void;
}

export function BackPhotoUpload({ imageUrl, onImageChange }: BackPhotoUploadProps) {
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    noClick: !!imageUrl,
    onDrop: (files) => {
      const file = files[0];
      if (!file) return;
      onImageChange(URL.createObjectURL(file), file);
    },
  });

  return (
    <div className="space-y-2">
      <label className="text-label-sm text-on-surface-variant block">
        Back photo <span className="normal-case tracking-normal text-on-surface-variant/70">(optional)</span>
      </label>
      <p className="text-xs text-on-surface-variant leading-relaxed">
        A small centered image on the back — a stamp, sticker, or memory.
      </p>

      {imageUrl ? (
        <div className="relative aspect-[4/3] max-w-[200px] rounded overflow-hidden border border-primary/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt="Back photo preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onImageChange(null, null)}
            className="absolute top-1.5 right-1.5 w-7 h-7 bg-black/50 text-white rounded-full flex items-center justify-center"
            aria-label="Remove back photo"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "border border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors max-w-[240px]",
            isDragActive
              ? "border-primary bg-secondary-container/30"
              : "border-outline-variant hover:border-primary hover:bg-surface-container"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            <ImagePlus size={20} className="text-primary" />
            <span className="text-sm text-primary font-medium">Add back photo</span>
          </div>
        </div>
      )}

      {!imageUrl && (
        <button
          type="button"
          onClick={open}
          className="text-xs text-primary underline underline-offset-2 hover:opacity-80"
        >
          Browse files
        </button>
      )}
    </div>
  );
}
