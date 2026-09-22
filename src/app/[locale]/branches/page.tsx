import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/common/Container";
import { PageHero } from "@/components/layout/PageHero";

const BRANCHES = [
  { code: "CS1", name: "Cầu Giấy", address: "123 Trần Duy Hưng, Cầu Giấy, Hà Nội" },
  { code: "CS2", name: "Hải Dương", address: "56 Trần Hưng Đạo, TP. Hải Dương" },
  { code: "CS3", name: "Long Biên", address: "88 Nguyễn Văn Cừ, Long Biên, Hà Nội" },
  { code: "CS4", name: "Đống Đa", address: "12 Xã Đàn, Đống Đa, Hà Nội" },
  { code: "CS5", name: "Bắc Ninh", address: "45 Nguyễn Trãi, TP. Bắc Ninh" },
  { code: "CS6", name: "Hải Phòng", address: "22 Lạch Tray, Ngô Quyền, Hải Phòng" },
];

export default function BranchesPage() {
  const t = useTranslations("nav");
  return (
    <>
      <PageHero
        eyebrow="Hệ thống cơ sở"
        title="ALOHA khắp miền Bắc"
        lead="Hơn 10 cơ sở phủ Hà Nội và các tỉnh phía Bắc — chọn cơ sở gần bạn nhất."
        breadcrumb={
          <>
            <Link href="/" className="hover:text-brand">
              {t("home")}
            </Link>
            <span>/</span>
            <span>{t("branches")}</span>
          </>
        }
      />
      <Container>
        <div className="section">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {BRANCHES.map((b) => (
              <article key={b.code} className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-6 transition hover:-translate-y-1 hover:shadow">
                <header className="flex items-center gap-3">
                  <div
                    className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-[13px] text-white font-display font-black"
                    style={{ background: "var(--grad)" }}
                  >
                    {b.code}
                  </div>
                  <div>
                    <div className="font-display text-lg font-extrabold">{b.name}</div>
                    <div className="text-[13px] text-muted">Cơ sở {b.code}</div>
                  </div>
                </header>
                <p className="flex gap-2 text-[14.5px] text-ink-soft">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--teal)" strokeWidth="2" className="mt-[3px] flex-shrink-0">
                    <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {b.address}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
