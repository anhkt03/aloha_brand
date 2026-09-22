import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Adds `background: var(--surface-2)` band around the section. */
  tinted?: boolean;
  /** Wrap children inside a `.wrap` container automatically. */
  contained?: boolean;
}

export function Section({
  tinted,
  contained = true,
  className,
  children,
  ...props
}: SectionProps) {
  const inner = contained ? <Container>{children as ReactNode}</Container> : children;
  const el = (
    <section className={cn("section", className)} {...props}>
      {inner}
    </section>
  );
  if (!tinted) return el;
  return <div style={{ background: "var(--surface-2)" }}>{el}</div>;
}

export function SectionHead({
  eyebrow,
  title,
  sub,
  center,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={cn("section-head", center && "center")}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="sec-title">{title}</h2>
      {sub ? <p className="sec-sub">{sub}</p> : null}
    </div>
  );
}
