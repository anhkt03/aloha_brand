"use client";

import { useTranslations } from "next-intl";
import { Button, LinkButton } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { siteConfig } from "@/config/site";

export function CtaSection({ onOpenRegister }: { onOpenRegister: () => void }) {
  const t = useTranslations("cta");
  return (
    <Container>
      <div className="section" style={{ paddingTop: 0 }}>
        <div className="cta-band">
          <div className="cta-band-in">
            <span className="pill" style={{ background: "rgba(255,255,255,.18)", color: "#fff" }}>
              {t("badge")}
            </span>
            <h2 className="mt-3.5 font-display text-[clamp(26px,4vw,42px)] font-black">{t("title")}</h2>
            <p className="mx-auto mt-2 max-w-[56ch] text-[17px] text-white/90">{t("sub")}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button variant="accent" onClick={onOpenRegister}>
                {t("primary")}
              </Button>
              <LinkButton variant="ghost" href={siteConfig.hotlineHref}>
                {t("secondary")}
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
