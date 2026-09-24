"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { buttonBase, buttonVariants } from "./ui";

type ButtonVariant = keyof typeof buttonVariants;

function Spinner() {
  return (
    <svg className="h-4 w-4 shrink-0 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** Submit button that shows a spinner and disables itself while its parent `<form>` is pending. */
export function SubmitButton({
  variant,
  className,
  children,
  pendingText,
  disabled,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; pendingText?: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className={cn(variant && buttonBase, variant && buttonVariants[variant], className)}
      {...props}
    >
      {pending ? (
        <span className="inline-flex items-center gap-1.5">
          <Spinner />
          {pendingText ?? children}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
