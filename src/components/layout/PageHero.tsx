import type { ReactNode } from "react";
import { Container } from "@/components/common/Container";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  breadcrumb: ReactNode;
}

export function PageHero({ eyebrow, title, lead, breadcrumb }: PageHeroProps) {
  return (
    <div className="pagehero">
      <Container>
        <div className="flex items-center gap-2 text-[13px] font-semibold text-muted">{breadcrumb}</div>
        <span className="eyebrow mt-3">{eyebrow}</span>
        <h1 className="mt-3.5 font-display text-[clamp(30px,5vw,52px)] font-black">{title}</h1>
        {lead && <p className="mt-4 max-w-[60ch] text-[clamp(15px,1.8vw,19px)] text-ink-soft">{lead}</p>}
      </Container>
    </div>
  );
}
