"use client";

import { useDropzone } from "react-dropzone";
import { Camera, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoUploadProps {
  imageUrl: string | null;
  onImageChange: (url: string | null, file: File | null) => void;
}

export function PhotoUpload({ imageUrl, onImageChange }: PhotoUploadProps) {
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
    <div className="space-y-3">
      <label className="text-label-sm text-on-surface-variant block">Your Photo</label>

      {imageUrl ? (
        <div className="relative aspect-[3/2] rounded overflow-hidden border border-primary/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt="Upload preview" className="w-full h-full object-cover" />
          <button
            onClick={() => onImageChange(null, null)}
            className="absolute top-2 right-2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center tap-target"
            aria-label="Remove photo"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 sm:p-12 text-center cursor-pointer transition-colors tap-target",
            isDragActive
              ? "border-primary bg-secondary-container/30"
              : "border-outline-variant hover:border-primary hover:bg-surface-container"
          )}
        >
          <input {...getInputProps({ capture: "environment" })} />
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center">
              <Upload size={24} className="text-primary" />
            </div>
            <div>
              <p className="font-medium text-primary">Tap to upload</p>
              <p className="text-sm text-on-surface-variant mt-1 hidden sm:block">
                or drag and drop your photo here
              </p>
            </div>
            <div className="flex items-center gap-2 text-label-sm text-on-surface-variant sm:hidden">
              <Camera size={14} />
              <span>Camera or gallery</span>
            </div>
          </div>
        </div>
      )}

      {!imageUrl && (
        <button
          onClick={open}
          className="w-full sm:hidden bg-primary text-on-primary py-3 rounded font-medium flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <Camera size={18} />
          Take Photo
        </button>
      )}
    </div>
  );
}
