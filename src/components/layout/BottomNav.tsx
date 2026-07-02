"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Eye, Plus, Images, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/gallery", label: "Gallery", icon: Images },
  { href: "/create", label: "Create", icon: Plus, highlight: true },
  { href: "/account", label: "Account", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface-container-low/95 backdrop-blur-md border-t border-primary/10 safe-bottom">
      <div className="flex justify-around items-center px-1 py-1.5 sm:px-2 sm:py-2">
        {items.map(({ href, label, icon: Icon, highlight }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 py-2 px-4 rounded-lg tap-target transition-colors active:scale-95",
                active ? "text-primary font-semibold" : "text-on-surface-variant",
                highlight && !active && "text-primary"
              )}
            >
              {highlight ? (
                <span className="w-10 h-10 bg-primary text-on-primary rounded-full flex items-center justify-center -mt-4 shadow-md">
                  <Icon size={20} />
                </span>
              ) : (
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              )}
              <span className="text-[10px] uppercase tracking-wider">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function EditorBottomBar({
  onSave,
  onPublish,
  onPreview,
  saving,
  publishing,
}: {
  onSave: () => void;
  onPublish: () => void;
  onPreview: () => void;
  saving?: boolean;
  publishing?: boolean;
}) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface-container-low/95 backdrop-blur-md border-t border-primary/10 safe-bottom">
      <div className="flex justify-around items-center gap-1 px-2 py-1.5">
        <button
          onClick={onPreview}
          className="flex flex-col items-center gap-0.5 py-2 tap-target text-primary font-semibold active:scale-95"
        >
          <Eye size={20} />
          <span className="text-[10px] uppercase tracking-wider">Preview</span>
        </button>
        <button
          onClick={onSave}
          disabled={saving}
          className="flex flex-col items-center gap-0.5 py-2 tap-target text-on-surface-variant active:scale-95 disabled:opacity-50"
        >
          <span className="text-sm font-medium">{saving ? "Saving…" : "Save"}</span>
        </button>
        <button
          onClick={onPublish}
          disabled={publishing}
          className="bg-primary text-on-primary px-6 py-2.5 rounded text-sm font-medium active:scale-95 disabled:opacity-50"
        >
          {publishing ? "Publishing…" : "Share"}
        </button>
      </div>
    </nav>
  );
}
