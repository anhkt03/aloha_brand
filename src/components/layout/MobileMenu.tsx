"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { primaryNav } from "@/data/navigation";
import { siteConfig } from "@/config/site";
import { Button, LinkButton } from "@/components/common/Button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onOpenRegister: () => void;
}

export function MobileMenu({ open, onClose, onOpenRegister }: MobileMenuProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[150] flex flex-col bg-surface px-5 pb-6 pt-[calc(env(safe-area-inset-top,0px)+18px)] transition-transform duration-300 ease-out",
        open ? "translate-x-0" : "invisible translate-x-full",
      )}
      aria-hidden={!open}
    >
      <div className="mb-6 flex items-center justify-between">
        <span className="relative block h-14 w-14 overflow-hidden rounded-full bg-white">
          <Image
            src="/images/brand/aloha-logo.jpg"
            alt={siteConfig.name}
            fill
            sizes="56px"
            className="scale-[1.6] object-contain object-center"
          />
        </span>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="grid h-[42px] w-[42px] place-items-center rounded-[12px] border-[1.5px] border-line-2 text-ink"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav className="flex flex-col gap-1">
        {primaryNav.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.key}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center justify-between rounded-xl px-3 py-4 font-display text-lg font-extrabold text-ink",
                active && "bg-surface-2 text-brand",
              )}
            >
              {t(item.key)}
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto flex flex-col gap-3 pt-5">
        <div className="flex gap-2">
          <LanguageSwitcher className="flex-1 justify-center" />
          <ThemeToggle />
        </div>
        <LinkButton variant="primary" size="block" href={siteConfig.hotlineHref}>
          {t("hotline")} {siteConfig.hotline}
        </LinkButton>
        <Button variant="accent" size="block" onClick={onOpenRegister}>
          {t("cta")}
        </Button>
      </div>
    </div>
  );
}
