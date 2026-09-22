"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/common/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/common/Button";
import { useRegisterModal } from "@/components/layout/register-context";

const JOURNEY = [
  { title: "Tư vấn định hướng", desc: "Đánh giá năng lực và mong muốn, gợi ý quốc gia/ngành phù hợp." },
  { title: "Học ngoại ngữ", desc: "Đạt chuẩn ngôn ngữ đầu vào của trường (TOPIK, JLPT, HSK, IELTS...)." },
  { title: "Chọn trường & ngành", desc: "Tư vấn danh sách trường, so sánh học phí, học bổng, cơ hội việc làm." },
  { title: "Hoàn thiện hồ sơ", desc: "Bảng điểm, kế hoạch học tập, thư giới thiệu, portfolio nếu cần." },
  { title: "Nộp hồ sơ apply", desc: "Nộp trường và các quỹ học bổng phù hợp; theo dõi phản hồi." },
  { title: "Phỏng vấn & Visa", desc: "Luyện phỏng vấn, hồ sơ visa, giải trình tài chính." },
  { title: "Lên đường & Hỗ trợ", desc: "Hỗ trợ ổn định nơi ở, đón sân bay, hòa nhập môi trường mới." },
];

const DESTINATIONS = [
  { flag: "🇨🇳", name: "Trung Quốc", desc: "Học bổng chính phủ CSC, học bổng Khổng Tử, tự túc." },
  { flag: "🇰🇷", name: "Hàn Quốc", desc: "TOPIK 3+ vào D-2, chương trình cử nhân · thạc sĩ." },
  { flag: "🇯🇵", name: "Nhật Bản", desc: "JLPT N3+ , trường Nhật ngữ · Senmon · Đại học." },
  { flag: "🇬🇧", name: "Anh quốc & IELTS", desc: "Foundation, cử nhân, thạc sĩ – các trường Top UK." },
];

export default function GlobalPage() {
  const t = useTranslations("nav");
  const { open } = useRegisterModal();
  return (
    <>
      <PageHero
        eyebrow="Du học cùng ALOHA"
        title="Chạm tay tới giấc mơ toàn cầu"
        lead="Đồng hành trọn gói từ chọn trường, hoàn thiện hồ sơ đến visa và định cư — Trung, Hàn, Nhật và các nước nói tiếng Anh."
        breadcrumb={
          <>
            <Link href="/" className="hover:text-brand">
              {t("home")}
            </Link>
            <span>/</span>
            <span>{t("global")}</span>
          </>
        }
      />

      <Container>
        <div className="section">
          <h2 className="sec-title text-center">Bạn muốn đi đâu?</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DESTINATIONS.map((d) => (
              <article key={d.name} className="card hover">
                <div className="text-4xl">{d.flag}</div>
                <h3 className="mt-3 text-lg font-extrabold">{d.name}</h3>
                <p className="mt-2 text-[14px] text-ink-soft">{d.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>

      <div style={{ background: "var(--surface-2)" }}>
        <Container>
          <div className="section">
            <h2 className="sec-title text-center">7 bước du học cùng ALOHA</h2>
            <p className="sec-sub mt-3 text-center">Quy trình minh bạch — bạn luôn biết mình đang ở đâu trên hành trình.</p>
            <ol className="mt-10 grid gap-5">
              {JOURNEY.map((step, idx) => (
                <li key={step.title} className="grid grid-cols-[auto_1fr] items-start gap-5">
                  <div
                    className="grid h-14 w-14 place-items-center rounded-[20px] font-display text-xl font-black text-white shadow-sm"
                    style={{ background: "var(--grad)" }}
                  >
                    {idx + 1}
                  </div>
                  <div className="rounded-lg border border-line bg-surface p-6">
                    <h3 className="text-lg font-extrabold">{step.title}</h3>
                    <p className="mt-2 text-[14.5px] text-ink-soft">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-10 text-center">
              <Button variant="primary" onClick={open}>
                Nhận tư vấn du học
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
