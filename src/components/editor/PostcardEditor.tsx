"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Grid3X3,
  ImagePlus,
  PenLine,
  Palette,
  Loader2,
  Share2,
  Type,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { PostcardPreview } from "./PostcardPreview";
import { PhotoUpload } from "./PhotoUpload";
import { MessageForm } from "./MessageForm";
import { StylePicker } from "./StylePicker";
import { ColorModePicker } from "./ColorModePicker";
import { FinishPicker } from "./FinishPicker";
import { TweaksPicker } from "./TweaksPicker";
import { FontPicker } from "./FontPicker";
import { LayoutPicker } from "./LayoutPicker";
import { EditorBottomBar } from "@/components/layout/BottomNav";
import { generateSlug } from "@/lib/utils";
import { FONT_BY_STYLE } from "@/lib/fonts";
import { DEFAULT_POSITIONS } from "@/lib/layouts";
import { tweaksFromPostcard, tweaksToPayload } from "@/lib/customization";
import type { Postcard, PostcardColorMode, PostcardFont, PostcardLayout, PostcardStyle, PostcardTweaks, PostcardVignette } from "@/lib/types";
import { cn } from "@/lib/utils";

type Panel = "layout" | "photos" | "message" | "style" | "typography";

const SIDEBAR_ITEMS: { id: Panel; label: string; icon: typeof Grid3X3 }[] = [
  { id: "photos", label: "Photos", icon: ImagePlus },
  { id: "message", label: "Message", icon: PenLine },
  { id: "typography", label: "Type", icon: Type },
  { id: "style", label: "Style", icon: Palette },
  { id: "layout", label: "Layout", icon: Grid3X3 },
];

interface PostcardEditorProps {
  existing?: Postcard;
}

export function PostcardEditor({ existing }: PostcardEditorProps) {
  const router = useRouter();
  const supabase = createClient();

  const [panel, setPanel] = useState<Panel>("photos");
  const [title, setTitle] = useState(existing?.title ?? "Postcard");
  const [location, setLocation] = useState(
    existing?.location ?? "the Carpathian Mountains"
  );
  const [message, setMessage] = useState(existing?.message ?? "");
  const [style, setStyle] = useState<PostcardStyle>(existing?.style ?? "retro");
  const [font, setFont] = useState<PostcardFont>(
    existing?.font ?? FONT_BY_STYLE[existing?.style ?? "retro"] ?? "caslon"
  );
  const [layout, setLayout] = useState<PostcardLayout>(existing?.layout ?? "editorial");
  const [colorMode, setColorMode] = useState<PostcardColorMode>(existing?.color_mode ?? "paper");
  const [vignette, setVignette] = useState<PostcardVignette>(existing?.vignette ?? "none");
  const [grain, setGrain] = useState(existing?.grain ?? false);
  const [tweaks, setTweaks] = useState<PostcardTweaks>(tweaksFromPostcard(existing));
  const [flipped, setFlipped] = useState(false);
  const defaultPos = DEFAULT_POSITIONS[existing?.layout ?? "editorial"];
  const [titleX, setTitleX] = useState(existing?.title_x ?? defaultPos.titleX);
  const [titleY, setTitleY] = useState(existing?.title_y ?? defaultPos.titleY);
  const [locationX, setLocationX] = useState(existing?.location_x ?? defaultPos.locationX);
  const [locationY, setLocationY] = useState(existing?.location_y ?? defaultPos.locationY);
  const [imageUrl, setImageUrl] = useState<string | null>(
    existing?.image_url ?? null
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [backImageUrl, setBackImageUrl] = useState<string | null>(
    existing?.back_image_url ?? null
  );
  const [backImageFile, setBackImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [postcardId, setPostcardId] = useState(existing?.id ?? null);
  const [slug, setSlug] = useState(existing?.slug ?? generateSlug());

  const handleImageChange = (url: string | null, file: File | null) => {
    if (imageUrl?.startsWith("blob:")) URL.revokeObjectURL(imageUrl);
    setImageUrl(url);
    setImageFile(file);
  };

  const handleBackImageChange = (url: string | null, file: File | null) => {
    if (backImageUrl?.startsWith("blob:")) URL.revokeObjectURL(backImageUrl);
    setBackImageUrl(url);
    setBackImageFile(file);
  };

  const handleStyleChange = (next: PostcardStyle) => {
    setStyle(next);
    setFont(FONT_BY_STYLE[next]);
  };

  const handleLayoutChange = (next: PostcardLayout) => {
    setLayout(next);
    const pos = DEFAULT_POSITIONS[next];
    setTitleX(pos.titleX);
    setTitleY(pos.titleY);
    setLocationX(pos.locationX);
    setLocationY(pos.locationY);
  };

  const uploadImage = useCallback(
    async (
      userId: string,
      id: string,
      file: File | null,
      suffix: string,
      existingUrl?: string | null
    ): Promise<string | null> => {
      if (!file) return existingUrl ?? null;

      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${userId}/${id}${suffix}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("postcard-images")
        .upload(path, file, { upsert: true });

      if (uploadError) throw new Error(uploadError.message);

      const { data } = supabase.storage.from("postcard-images").getPublicUrl(path);
      return data.publicUrl;
    },
    [supabase]
  );

  const savePostcard = async (status: "draft" | "published") => {
    const isPublish = status === "published";
    if (isPublish) setPublishing(true);
    else setSaving(true);
    setError(null);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("You must be signed in");

      const id = postcardId ?? crypto.randomUUID();
      const [uploadedUrl, uploadedBackUrl] = await Promise.all([
        uploadImage(user.id, id, imageFile, "", existing?.image_url),
        uploadImage(user.id, id, backImageFile, "-back", existing?.back_image_url),
      ]);

      const payload = {
        id,
        user_id: user.id,
        slug,
        title,
        message: message.slice(0, 280),
        location,
        style,
        layout,
        font,
        title_x: titleX,
        title_y: titleY,
        location_x: locationX,
        location_y: locationY,
        image_url: uploadedUrl,
        back_image_url: uploadedBackUrl,
        color_mode: colorMode,
        vignette,
        grain,
        ...tweaksToPayload(tweaks),
        status,
      };

      const { error: dbError } = await supabase.from("postcards").upsert(payload);
      if (dbError) throw new Error(dbError.message);

      setPostcardId(id);
      if (uploadedUrl) setImageUrl(uploadedUrl);
      if (uploadedBackUrl) setBackImageUrl(uploadedBackUrl);

      if (isPublish) {
        router.push(`/p/${slug}?published=1`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
      setPublishing(false);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:h-[calc(100dvh-var(--app-header-height))] lg:overflow-hidden min-h-[calc(100dvh-var(--app-header-height))] pb-[calc(var(--mobile-editor-bar-height)+env(safe-area-inset-bottom))] lg:pb-0">
        {/* Left nav — desktop */}
        <aside className="hidden lg:flex flex-col w-[220px] xl:w-56 bg-surface-container-low border-r border-primary/5 shrink-0 h-full overflow-hidden">
          <div className="p-5 border-b border-primary/5">
            <h2 className="text-headline-md font-serif text-primary">Customize</h2>
            <p className="text-[11px] uppercase tracking-widest text-on-surface-variant mt-1">
              Design your memory
            </p>
          </div>
          <nav className="flex-1 p-3 space-y-0.5">
            {SIDEBAR_ITEMS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setPanel(id)}
                className={cn(
                  "w-full rounded-lg px-3 py-2.5 flex items-center gap-3 transition-colors text-left",
                  panel === id
                    ? "bg-secondary-container text-on-secondary-container"
                    : "text-on-surface-variant hover:bg-surface-variant"
                )}
              >
                <Icon size={18} strokeWidth={panel === id ? 2.25 : 2} />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </nav>
          <div className="p-4 space-y-2 border-t border-primary/5">
            <button
              onClick={() => savePostcard("draft")}
              disabled={saving}
              className="w-full py-2.5 border border-primary/20 rounded font-medium text-sm hover:bg-surface-container disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving && <Loader2 size={16} className="animate-spin" />}
              Save Draft
            </button>
            <button
              onClick={() => savePostcard("published")}
              disabled={publishing}
              className="w-full py-2.5 bg-primary text-on-primary rounded font-medium text-sm hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {publishing ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Share2 size={16} />
              )}
              Publish & Share
            </button>
          </div>
        </aside>

        {/* Mobile tabs — stick below site header, not under it */}
        <div className="lg:hidden sticky mobile-editor-tabs z-40 flex overflow-x-auto border-b border-primary/5 bg-surface-container-low/95 backdrop-blur-md px-2 py-2 gap-1.5 shrink-0 scrollbar-none snap-x snap-mandatory shadow-[0_1px_0_rgba(23,24,24,0.04)]">
          {SIDEBAR_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setPanel(id)}
              className={cn(
                "flex-shrink-0 snap-start flex items-center gap-1.5 px-3.5 py-2.5 rounded-full text-xs font-medium tap-target touch-manipulation",
                panel === id
                  ? "bg-secondary-container text-on-secondary-container shadow-sm"
                  : "text-on-surface-variant bg-surface-container/80"
              )}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        {/* Canvas + mobile panel */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0 lg:h-full lg:overflow-hidden">
          <div className="editor-canvas shrink-0 flex flex-col items-center justify-start px-3 pt-3 pb-2 sm:px-6 sm:py-5 lg:px-12 lg:pt-8 lg:pb-6 lg:max-h-none overflow-x-hidden overflow-y-visible">
            <div className="w-full max-w-[min(100%,52rem)] mx-auto">
              <PostcardPreview
                imageUrl={imageUrl}
                title={title}
                location={location}
                message={message}
                style={style}
                layout={layout}
                font={font}
                editable
                flippable
                flipped={flipped}
                onFlip={() => setFlipped((f) => !f)}
                titleX={titleX}
                titleY={titleY}
                locationX={locationX}
                locationY={locationY}
                size="large"
                onTitleChange={setTitle}
                onLocationChange={setLocation}
                onMessageChange={(v) => setMessage(v.slice(0, 280))}
                onTitlePositionChange={(x, y) => {
                  setTitleX(x);
                  setTitleY(y);
                }}
                onLocationPositionChange={(x, y) => {
                  setLocationX(x);
                  setLocationY(y);
                }}
                backImageUrl={backImageUrl}
                onBackImageChange={handleBackImageChange}
                colorMode={colorMode}
                vignette={vignette}
                grain={grain}
                tweaks={tweaks}
              />
            </div>
            {error && (
              <p className="mt-4 text-error text-sm text-center max-w-sm">{error}</p>
            )}
          </div>

          {/* Mobile options panel — scrolls below fixed preview */}
          <div className="lg:hidden flex-1 min-h-0 overflow-y-auto overscroll-contain border-t border-primary/5 bg-background px-4 py-4 mobile-editor-panel">
            <PanelContent
              panel={panel}
              imageUrl={imageUrl}
              onImageChange={handleImageChange}
              title={title}
              location={location}
              message={message}
              style={style}
              font={font}
              onTitleChange={setTitle}
              onLocationChange={setLocation}
              onMessageChange={(v) => setMessage(v.slice(0, 280))}
              onStyleChange={handleStyleChange}
              onFontChange={setFont}
              layout={layout}
              onLayoutChange={handleLayoutChange}
              backImageUrl={backImageUrl}
              onBackImageChange={handleBackImageChange}
              colorMode={colorMode}
              onColorModeChange={setColorMode}
              vignette={vignette}
              onVignetteChange={setVignette}
              grain={grain}
              onGrainChange={setGrain}
              tweaks={tweaks}
              onTweaksChange={setTweaks}
            />
          </div>
        </div>

        {/* Right panel — desktop (scrolls independently) */}
        <aside className="hidden lg:flex flex-col w-[300px] xl:w-[340px] border-l border-primary/5 bg-background shrink-0 h-full max-h-[calc(100dvh-var(--app-header-height))] overflow-hidden">
          <div className="p-5 border-b border-primary/5 shrink-0 bg-background">
            <p className="text-label-sm text-on-surface-variant">
              {SIDEBAR_ITEMS.find((i) => i.id === panel)?.label}
            </p>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 mobile-editor-panel">
            <PanelContent
              panel={panel}
              imageUrl={imageUrl}
              onImageChange={handleImageChange}
              title={title}
              location={location}
              message={message}
              style={style}
              font={font}
              onTitleChange={setTitle}
              onLocationChange={setLocation}
              onMessageChange={(v) => setMessage(v.slice(0, 280))}
              onStyleChange={handleStyleChange}
              onFontChange={setFont}
              layout={layout}
              onLayoutChange={handleLayoutChange}
              backImageUrl={backImageUrl}
              onBackImageChange={handleBackImageChange}
              colorMode={colorMode}
              onColorModeChange={setColorMode}
              vignette={vignette}
              onVignetteChange={setVignette}
              grain={grain}
              onGrainChange={setGrain}
              tweaks={tweaks}
              onTweaksChange={setTweaks}
            />
          </div>
        </aside>
      </div>

      {showPreview && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setShowPreview(false)}
        >
          <div className="w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <PostcardPreview
              imageUrl={imageUrl}
              title={title}
              location={location}
              message={message}
              style={style}
              layout={layout}
              font={font}
              editable
              flippable
              flipped={flipped}
              onFlip={() => setFlipped((f) => !f)}
              size="large"
              onTitleChange={setTitle}
              onLocationChange={setLocation}
              onMessageChange={(v) => setMessage(v.slice(0, 280))}
              backImageUrl={backImageUrl}
              onBackImageChange={handleBackImageChange}
              colorMode={colorMode}
              vignette={vignette}
              grain={grain}
              tweaks={tweaks}
            />
          </div>
        </div>
      )}

      <EditorBottomBar
        onPreview={() => setShowPreview(true)}
        onSave={() => savePostcard("draft")}
        onPublish={() => savePostcard("published")}
        saving={saving}
        publishing={publishing}
      />
    </>
  );
}

function PanelContent({
  panel,
  imageUrl,
  onImageChange,
  title,
  location,
  message,
  style,
  font,
  onTitleChange,
  onLocationChange,
  onMessageChange,
  onStyleChange,
  onFontChange,
  layout,
  onLayoutChange,
  backImageUrl,
  onBackImageChange,
  colorMode,
  onColorModeChange,
  vignette,
  onVignetteChange,
  grain,
  onGrainChange,
  tweaks,
  onTweaksChange,
}: {
  panel: Panel;
  imageUrl: string | null;
  onImageChange: (url: string | null, file: File | null) => void;
  title: string;
  location: string;
  message: string;
  style: PostcardStyle;
  font: PostcardFont;
  layout: PostcardLayout;
  onTitleChange: (v: string) => void;
  onLocationChange: (v: string) => void;
  onMessageChange: (v: string) => void;
  onStyleChange: (s: PostcardStyle) => void;
  onFontChange: (f: PostcardFont) => void;
  onLayoutChange: (l: PostcardLayout) => void;
  backImageUrl: string | null;
  onBackImageChange: (url: string | null, file: File | null) => void;
  colorMode: PostcardColorMode;
  onColorModeChange: (m: PostcardColorMode) => void;
  vignette: PostcardVignette;
  onVignetteChange: (v: PostcardVignette) => void;
  grain: boolean;
  onGrainChange: (v: boolean) => void;
  tweaks: PostcardTweaks;
  onTweaksChange: (t: PostcardTweaks) => void;
}) {
  if (panel === "photos") {
    return <PhotoUpload imageUrl={imageUrl} onImageChange={onImageChange} />;
  }
  if (panel === "message") {
    return (
      <MessageForm
        message={message}
        onMessageChange={onMessageChange}
        backImageUrl={backImageUrl}
        onBackImageChange={onBackImageChange}
      />
    );
  }
  if (panel === "typography") {
    return <FontPicker value={font} onChange={onFontChange} />;
  }
  if (panel === "style") {
    return (
      <div className="space-y-6 pb-4">
        <StylePicker value={style} onChange={onStyleChange} />
        <ColorModePicker value={colorMode} onChange={onColorModeChange} />
        <div className="pt-1 border-t border-primary/5">
          <p className="text-[10px] uppercase tracking-widest text-secondary font-medium mb-4 pt-2">
            Photo finish
          </p>
          <FinishPicker
            vignette={vignette}
            grain={grain}
            onVignetteChange={onVignetteChange}
            onGrainChange={onGrainChange}
          />
        </div>
        <div className="pt-1 border-t border-primary/5">
          <p className="text-[10px] uppercase tracking-widest text-secondary font-medium mb-4 pt-2">
            Customize
          </p>
          <TweaksPicker value={tweaks} onChange={onTweaksChange} />
        </div>
      </div>
    );
  }
  return <LayoutPicker value={layout} onChange={onLayoutChange} />;
}
