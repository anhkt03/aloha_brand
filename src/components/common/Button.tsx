import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "accent" | "ghost" | "onfill" | "outlineW";
type ButtonSize = "md" | "sm" | "block";

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  accent: "btn-accent",
  ghost: "btn-ghost",
  onfill: "btn-onfill",
  outlineW: "btn-outline-w",
};

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkButtonProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>;

function classes(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(
    "btn",
    VARIANT_CLASS[variant],
    size === "sm" && "btn-sm",
    size === "block" && "btn-block",
    className,
  );
}

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={classes(variant, size, className)} {...props} />;
}

export function LinkButton({ variant, size, className, ...props }: LinkButtonProps) {
  return <a className={classes(variant, size, className)} {...props} />;
}
