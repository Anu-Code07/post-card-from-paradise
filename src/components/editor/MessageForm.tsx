"use client";

import { BackPhotoUpload } from "./BackPhotoUpload";

interface MessageFormProps {
  message: string;
  onMessageChange: (v: string) => void;
  backImageUrl: string | null;
  onBackImageChange: (url: string | null, file: File | null) => void;
}

export function MessageForm({
  message,
  onMessageChange,
  backImageUrl,
  onBackImageChange,
}: MessageFormProps) {
  return (
    <div className="space-y-5">
      <p className="text-sm text-on-surface-variant leading-relaxed">
        Your message lives on the back. Flip the card to write it.
      </p>

      <div>
        <label className="text-label-sm text-on-surface-variant block mb-2">Message</label>
        <textarea
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder="Wish you were here…"
          rows={5}
          className="figma-input resize-none min-h-[120px] font-caveat text-xl"
        />
        <p className="text-xs text-on-surface-variant text-right mt-1">{message.length}/280</p>
      </div>

      <BackPhotoUpload imageUrl={backImageUrl} onImageChange={onBackImageChange} />
    </div>
  );
}
