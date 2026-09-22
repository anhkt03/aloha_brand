import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/common/Container";
import { PageHero } from "@/components/layout/PageHero";

const VMV = [
  { title: "Tầm nhìn", desc: "Trở thành hệ thống đào tạo ngoại ngữ hàng đầu miền Bắc.", bg: "linear-gradient(135deg,#469142,#295326)" },
  { title: "Sứ mệnh", desc: "Đồng hành cùng người học chinh phục mục tiêu ngôn ngữ và mở rộng cơ hội toàn cầu.", bg: "linear-gradient(135deg,#28b4d2,#469142)" },
  { title: "Giá trị cốt lõi", desc: "Chất lượng · Chân thành · Kiên trì · Đổi mới · Cộng đồng.", bg: "linear-gradient(135deg,#e1ba23,#469142)" },
];

const TIMELINE = [
  { year: "2014", title: "Thành lập ALOHA", desc: "Cơ sở đầu tiên tại Hà Nội với 2 lớp học đầu tiên." },
  { year: "2017", title: "Mở rộng miền Bắc", desc: "Ra mắt cơ sở thứ 3 tại Hải Dương, ra mắt chương trình HSK." },
  { year: "2020", title: "Chuyển đổi số", desc: "Triển khai lớp học trực tuyến và app quản lý học viên." },
  { year: "2023", title: "10.000+ học viên", desc: "Cột mốc 10.000 học viên đã học và tốt nghiệp tại ALOHA." },
  { year: "2025", title: "11 cơ sở", desc: "Khai trương cơ sở thứ 11 tại Hải Phòng, phủ khắp miền Bắc." },
];

export default function AboutPage() {
  const t = useTranslations("nav");
  return (
    <>
      <PageHero
        eyebrow="Về chúng tôi"
        title="Về ALOHA Language School"
        lead="Hệ thống đào tạo ngoại ngữ hướng tới chất lượng giảng dạy, trải nghiệm học tập và sự phát triển toàn diện của học viên."
        breadcrumb={
          <>
            <Link href="/" className="hover:text-brand">
              {t("home")}
            </Link>
            <span>/</span>
            <span>{t("about")}</span>
          </>
        }
      />
      <Container>
        <div className="section">
          <h2 className="sec-title text-center">Tầm nhìn · Sứ mệnh · Giá trị</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VMV.map((v) => (
              <div key={v.title} className="relative min-h-[220px] overflow-hidden rounded-lg p-8 text-white" style={{ background: v.bg }}>
                <h3 className="mt-16 text-2xl font-black">{v.title}</h3>
                <p className="mt-2 text-[14.5px] text-white/95">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <div style={{ background: "var(--surface-2)" }}>
        <Container>
          <div className="section">
            <h2 className="sec-title text-center">Chặng đường ALOHA</h2>
            <div className="mx-auto mt-10 max-w-3xl">
              {TIMELINE.map((row, idx) => (
                <div key={row.year} className="grid grid-cols-[80px_20px_1fr] gap-4 pb-6">
                  <div className="text-right font-display text-lg font-black text-brand">{row.year}</div>
                  <div className="relative flex justify-center">
                    <span className="mt-2 h-3 w-3 rounded-full" style={{ background: "var(--grad)" }} />
                    {idx < TIMELINE.length - 1 && <span className="absolute top-4 h-full w-[2px] bg-line-2" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold">{row.title}</h3>
                    <p className="text-[14.5px] text-ink-soft">{row.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
