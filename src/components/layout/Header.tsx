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
        <div className="mx-auto flex h-[var(--nav-h)] max-w-wrap items-center gap-3 px-[clamp(16px,3vw,40px)]">
          <Link
            href="/"
            aria-label={siteConfig.name}
            className="flex h-full flex-shrink-0 items-center py-2"
          >
            <span className="relative block aspect-square h-full overflow-hidden rounded-full bg-white">
              <Image
                src="/images/brand/aloha-logo.jpg"
                alt={siteConfig.name}
                fill
                priority
                sizes="72px"
                className="scale-[1.6] object-contain object-center"
              />
            </span>
          </Link>
          <nav
            aria-label="Primary"
            className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1"
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
                    "whitespace-nowrap rounded-[10px] px-2.5 py-2 font-display text-[13.5px] font-bold text-ink-soft transition hover:bg-surface-2 hover:text-brand xl:px-3 xl:text-[14.5px]",
                    active && "bg-[color-mix(in_srgb,var(--brand)_12%,transparent)] text-brand",
                  )}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>
          <div className="ml-auto flex flex-shrink-0 items-center gap-2 lg:ml-0">
            <a
              className="hidden items-center gap-2 whitespace-nowrap font-display text-sm font-extrabold text-brand 2xl:flex"
              href={siteConfig.hotlineHref}
            >
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {siteConfig.hotline}
            </a>
            <LanguageSwitcher className="hidden md:inline-flex" />
            <ThemeToggle className="hidden sm:inline-grid" />
            <Button
              variant="primary"
              size="sm"
              onClick={onOpenRegister}
              className="hidden sm:inline-flex"
            >
              {t("cta")}
            </Button>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="grid h-[42px] w-[42px] place-items-center rounded-[12px] border-[1.5px] border-line-2 bg-surface text-ink lg:hidden"
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
