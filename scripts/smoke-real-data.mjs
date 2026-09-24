import { PrismaClient } from "@prisma/client";
import { randomBytes, scrypt as scryptCallback } from "crypto";
import { promisify } from "util";

const prisma = new PrismaClient();
const scrypt = promisify(scryptCallback);
const locales = ["vi", "en", "zh", "ko", "ja"];

function assert(condition, message) {
  if (!condition) throw new Error(`SMOKE ASSERTION FAILED: ${message}`);
}

async function passwordHash(password) {
  const salt = randomBytes(16).toString("hex");
  const derived = await scrypt(password, salt, 64);
  return `scrypt$${salt}$${Buffer.from(derived).toString("hex")}`;
}

const categoryNames = { vi: "[SMOKE] Ngoại ngữ quốc tế", en: "[SMOKE] International Languages", zh: "[SMOKE] 国际语言", ko: "[SMOKE] 국제 언어", ja: "[SMOKE] 国際言語" };
const levelNames = { vi: "Cơ bản", en: "Beginner", zh: "初级", ko: "초급", ja: "初級" };
const courseCopy = {
  vi: { title: "Khóa giao tiếp quốc tế 5 ngôn ngữ", duration: "24 buổi · 3 tháng", content: "Lộ trình giao tiếp cơ bản dành cho người mới bắt đầu, tự tin giao tiếp trong tình huống hằng ngày." },
  en: { title: "Five-language International Communication", duration: "24 sessions · 3 months", content: "A basic communication path for complete beginners to speak confidently in everyday situations." },
  zh: { title: "五语国际交流课程", duration: "24 节课 · 3 个月", content: "面向零基础学习者的基础交流课程，助力自信应对日常交流场景。" },
  ko: { title: "5개 언어 국제 회화 과정", duration: "24회 · 3개월", content: "초급 학습자를 위한 기초 회화 과정으로 일상 상황에서 자신 있게 소통할 수 있습니다." },
  ja: { title: "5言語国際コミュニケーション講座", duration: "24回 ・ 3ヶ月", content: "初心者向けの基礎会話コースで、日常の場面で自信を持って会話できるようになります。" },
};
const articleCopy = {
  vi: { title: "ALOHA khai giảng khóa giao tiếp quốc tế", content: "## Khai giảng\n\nALOHA mở lớp giao tiếp quốc tế với lộ trình rõ ràng và hoạt động thực hành mỗi buổi." },
  en: { title: "ALOHA launches an international communication course", content: "## Enrollment open\n\nALOHA introduces an international communication course with a clear roadmap and practice in every lesson." },
  zh: { title: "ALOHA 国际交流课程开课", content: "## 开始招生\n\nALOHA 推出国际交流课程，每节课都有清晰的学习路径和实践活动。" },
  ko: { title: "ALOHA 국제 회화 과정 개강", content: "## 수강 신청\n\nALOHA가 명확한 학습 로드맵과 매 수업 실습을 포함한 국제 회화 과정을 시작합니다." },
  ja: { title: "ALOHA国際コミュニケーション講座を開講", content: "## 受講受付中\n\nALOHAは明確な学習ロードマップと毎回の実践を備えた国際コミュニケーション講座を開講します。" },
};

async function upsertTranslatedParent(tx, model, translationRelation, identity, translations) {
  let item = await tx[model].findFirst({ where: { [translationRelation]: { some: identity } } });
  if (!item) item = await tx[model].create({ data: { [translationRelation]: { create: translations } } });
  else item = await tx[model].update({ where: { id: item.id }, data: { [translationRelation]: { deleteMany: {}, create: translations } } });
  return item;
}

try {
  const result = await prisma.$transaction(async (tx) => {
    const admin = await tx.user.findFirst({ where: { username: "alohaadmin", role: "ADMIN", active: true } });
    assert(admin, "default ADMIN must exist and be active");

    const category = await upsertTranslatedParent(tx, "courseCategory", "translations", { locale: "vi", name: categoryNames.vi }, locales.map((locale) => ({ locale, name: categoryNames[locale] })));
    const level = await upsertTranslatedParent(tx, "courseLevel", "translations", { locale: "vi", name: levelNames.vi }, locales.map((locale) => ({ locale, name: levelNames[locale] })));

    let course = await tx.course.findFirst({ where: { categoryId: category.id, levelId: level.id } });
    const courseData = { categoryId: category.id, levelId: level.id, status: "PUBLISHED", translations: { deleteMany: {}, create: locales.map((locale) => ({ locale, ...courseCopy[locale] })) } };
    course = course
      ? await tx.course.update({ where: { id: course.id }, data: courseData, include: { translations: true } })
      : await tx.course.create({ data: { ...courseData, translations: { create: locales.map((locale) => ({ locale, ...courseCopy[locale] })) } }, include: { translations: true } });

    const article = await tx.newsArticle.upsert({
      where: { slug: "smoke-aloha-international-course" },
      update: { status: "PUBLISHED", coverImage: "/images/news/placeholder.svg", gallery: [], publishedAt: new Date(), translations: { deleteMany: {}, create: locales.map((locale) => ({ locale, ...articleCopy[locale] })) } },
      create: { slug: "smoke-aloha-international-course", status: "PUBLISHED", coverImage: "/images/news/placeholder.svg", gallery: [], publishedAt: new Date(), translations: { create: locales.map((locale) => ({ locale, ...articleCopy[locale] })) } },
      include: { translations: true },
    });

    const branch = await tx.branch.upsert({ where: { code: "SMOKE-HN" }, update: { name: "ALOHA Demo Hà Nội", address: "Khu đô thị Cầu Giấy, Hà Nội", phone: "0901234567", mapUrl: "https://maps.google.com", lat: 21.0285, lng: 105.8542, active: true }, create: { code: "SMOKE-HN", name: "ALOHA Demo Hà Nội", address: "Khu đô thị Cầu Giấy, Hà Nội", phone: "0901234567", mapUrl: "https://maps.google.com", lat: 21.0285, lng: 105.8542, active: true } });
    const feedbackExisting = await tx.feedback.findFirst({ where: { name: "[SMOKE] Nguyễn Minh Anh" } });
    const feedback = feedbackExisting
      ? await tx.feedback.update({ where: { id: feedbackExisting.id }, data: { rating: 5, comment: "Giảng viên tận tâm, lộ trình rõ ràng và có nhiều hoạt động thực hành.", active: true } })
      : await tx.feedback.create({ data: { name: "[SMOKE] Nguyễn Minh Anh", rating: 5, comment: "Giảng viên tận tâm, lộ trình rõ ràng và có nhiều hoạt động thực hành.", active: true } });
    const enrollmentExisting = await tx.enrollment.findFirst({ where: { courseId: course.id, phone: "0900000001" } });
    const enrollment = enrollmentExisting
      ? await tx.enrollment.update({ where: { id: enrollmentExisting.id }, data: { type: "TRIAL", name: "[SMOKE] Trần Hoàng Nam", email: "smoke.student@example.com", note: "Đăng ký học thử qua smoke test", status: "CONFIRMED" } })
      : await tx.enrollment.create({ data: { type: "TRIAL", courseId: course.id, name: "[SMOKE] Trần Hoàng Nam", phone: "0900000001", email: "smoke.student@example.com", note: "Đăng ký học thử qua smoke test", status: "CONFIRMED" } });

    const staff = await tx.user.upsert({ where: { username: "alohastaff" }, update: { name: "ALOHA Staff Demo", email: "alohastaff@example.com", role: "STAFF", active: true }, create: { username: "alohastaff", name: "ALOHA Staff Demo", email: "alohastaff@example.com", passwordHash: await passwordHash("aloha2026"), role: "STAFF", active: true } });
    await tx.auditLog.create({ data: { actorUserId: admin.id, action: "SMOKE_UPSERT", entity: "SmokeDataset", entityId: "five-locales", metadata: { courseId: course.id, articleId: article.id, branchId: branch.id } } });

    assert(course.translations.length === 5, "course must have five translations");
    assert(new Set(course.translations.map((item) => item.locale)).size === 5, "course locale values must be unique");
    assert(article.translations.length === 5, "article must have five translations");
    assert(enrollment.status === "CONFIRMED", "enrollment status update must persist");
    assert(feedback.active, "feedback moderation update must persist");
    assert(staff.role === "STAFF" && staff.active, "STAFF account must be active");
    return { adminId: admin.id, staffId: staff.id, categoryId: category.id, levelId: level.id, courseId: course.id, articleId: article.id, enrollmentId: enrollment.id, feedbackId: feedback.id, branchId: branch.id };
  }, { timeout: 30_000 });

  await prisma.branch.deleteMany({ where: { code: "SMOKE-DELETE" } });
  const temporary = await prisma.branch.create({ data: { code: "SMOKE-DELETE", name: "Temporary delete check", address: "Smoke test", active: false } });
  await prisma.branch.delete({ where: { id: temporary.id } });
  assert(!await prisma.branch.findUnique({ where: { code: "SMOKE-DELETE" } }), "delete flow must remove temporary record");

  await prisma.branch.deleteMany({ where: { code: "SMOKE-ROLLBACK" } });
  await prisma.$transaction(async (tx) => {
    await tx.branch.create({ data: { code: "SMOKE-ROLLBACK", name: "Rollback check", address: "Smoke test", active: false } });
    throw new Error("EXPECTED_ROLLBACK");
  }).catch((error) => { if (error.message !== "EXPECTED_ROLLBACK") throw error; });
  assert(!await prisma.branch.findUnique({ where: { code: "SMOKE-ROLLBACK" } }), "transaction rollback must remove inserted record");

  const localeCounts = await prisma.courseTranslation.groupBy({ by: ["locale"], where: { courseId: result.courseId }, _count: true });
  console.log(JSON.stringify({ ok: true, ...result, localeCounts, retained: { articleSlug: "smoke-aloha-international-course", branchCode: "SMOKE-HN", staffUsername: "alohastaff" } }, null, 2));
} finally {
  await prisma.$disconnect();
}
