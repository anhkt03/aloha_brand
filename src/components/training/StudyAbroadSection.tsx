"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";

/**
 * "Ngoại ngữ và du học" — closing bridge to the study-abroad page.
 */
export function StudyAbroadSection() {
  const t = useTranslations("pages.training.studyAbroad");
  const router = useRouter();

  return (
    <section className="section" style={{ background: "var(--surface-2)" }}>
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-[1fr_1.1fr]">
          <div>
            <span className="eyebrow">{t("eyebrow")}</span>
            <h2 className="sec-title mt-3.5">{t("title")}</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{t("desc")}</p>
            <Button variant="primary" className="mt-6" onClick={() => router.push("/duhocquocte")}>
              {t("cta")}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Button>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/homepage/studyaboad.jpg"
              alt="Ngoại ngữ và du học cùng ALOHA"
              fill
              sizes="(min-width:768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
