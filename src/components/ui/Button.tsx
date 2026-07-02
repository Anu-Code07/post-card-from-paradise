import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  loading?: boolean;
}

export function Button({
  variant = "primary",
  loading,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "w-full py-3.5 px-6 rounded-md font-semibold text-sm uppercase tracking-wide transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2",
        variant === "primary" && "bg-iris text-white hover:opacity-90",
        variant === "secondary" && "bg-dorian text-onyx hover:bg-peach/50",
        variant === "outline" && "border-2 border-onyx/10 text-onyx hover:bg-dorian",
        className
      )}
      {...props}
    >
      {loading && <Loader2 size={18} className="animate-spin" />}
      {children}
    </button>
  );
}
