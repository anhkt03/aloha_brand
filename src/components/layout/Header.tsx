"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { primaryNav } from "@/data/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/common/Button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onOpenRegister?: () => void;
}

export function Header({ onOpenRegister = () => {} }: HeaderProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        className="sticky top-0 z-[80] border-b border-line backdrop-blur-md"
        style={{
          background: "color-mix(in srgb, var(--surface) 88%, transparent)",
        }}
      >
        <div className="flex h-[var(--nav-h)] w-full items-center gap-2 px-[clamp(12px,2vw,28px)]">
          <Link
            href="/"
            aria-label={siteConfig.name}
            className="flex h-full flex-shrink-0 items-center"
          >
            <span className="relative block h-full w-[130px] overflow-hidden sm:w-[160px] md:w-[210px]">
              <Image
                src="/images/brand/aloha-logo-horizontal.webp"
                alt={siteConfig.name}
                fill
                priority
                sizes="(min-width:768px) 210px, 180px"
                className="scale-[2] object-contain object-center"
              />
            </span>
          </Link>
          <nav
            aria-label="Primary"
            className="hidden min-w-0 flex-1 items-center justify-start gap-0 xl:flex xl:gap-0.5"
          >
            {primaryNav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "whitespace-nowrap rounded-[10px] px-2 py-2 font-display text-[13px] font-bold text-ink-soft transition hover:bg-surface-2 hover:text-brand xl:px-2.5 xl:text-[14px]",
                    active && "bg-[color-mix(in_srgb,var(--brand)_12%,transparent)] text-brand",
                  )}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>
          <div className="ml-auto flex flex-shrink-0 items-center gap-2 xl:ml-0">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button
              variant="primary"
              size="sm"
              onClick={onOpenRegister}
              className="hidden lg:inline-flex"
            >
              {t("cta")}
            </Button>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="grid h-[42px] w-[42px] place-items-center rounded-[12px] border-[1.5px] border-line-2 bg-surface text-ink xl:hidden"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onOpenRegister={onOpenRegister} />
    </>
  );
}
