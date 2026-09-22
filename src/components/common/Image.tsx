import NextImage, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

/**
 * Thin wrapper around `next/image` that keeps default settings consistent
 * across the codebase (rounded corners are opt-in, no layout shift).
 */
export function Image({ className, alt, ...props }: ImageProps) {
  return <NextImage className={cn("block h-auto w-full", className)} alt={alt} {...props} />;
}
