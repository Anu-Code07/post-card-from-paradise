"use client";

import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, Check, Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  valid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, valid, className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-semibold text-foreground">{label}</label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            className={cn(
              "w-full rounded-md px-4 py-3 text-base transition-colors outline-none",
              "bg-dorian text-foreground placeholder:text-light-slate",
              error
                ? "border-2 border-fuschia bg-white"
                : valid
                  ? "border-2 border-evergreen bg-white"
                  : "border-2 border-transparent focus:border-iris focus:bg-white",
              isPassword && "pr-12",
              valid && "pr-10",
              error && "pr-10",
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-light-slate hover:text-foreground tap-target"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
          {valid && !isPassword && (
            <Check size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-evergreen" />
          )}
          {error && (
            <AlertCircle size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-fuschia" />
          )}
        </div>
        {helperText && !error && (
          <p className="text-sm text-light-slate">{helperText}</p>
        )}
        {error && <p className="text-sm text-fuschia">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, helperText, className, ...props }, ref) => (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-semibold text-foreground">{label}</label>
      )}
      <textarea
        ref={ref}
        className={cn(
          "w-full rounded-md px-4 py-3 text-base resize-none transition-colors outline-none",
          "bg-dorian text-foreground placeholder:text-light-slate",
          "border-2 border-transparent focus:border-iris focus:bg-white",
          className
        )}
        {...props}
      />
      {helperText && <p className="text-sm text-light-slate">{helperText}</p>}
    </div>
  )
);
Textarea.displayName = "Textarea";
