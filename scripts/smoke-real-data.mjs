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

const courseTypeNames = {
  vi: "[SMOKE] Ngoại ngữ quốc tế",
  en: "[SMOKE] International Languages",
  zh: "[SMOKE] 国际语言",
  ko: "[SMOKE] 국제 언어",
  ja: "[SMOKE] 国際言語",
};
const levelNames = { vi: "Cơ bản", en: "Beginner", zh: "初级", ko: "초급", ja: "初級" };
const courseCopy = {
  vi: { title: "Khóa giao tiếp quốc tế 5 ngôn ngữ", label: "Giao tiếp cơ bản", target: "Người mới bắt đầu", outcome: "Tự tin giao tiếp trong tình huống hằng ngày", syllabus: ["Phát âm nền tảng", "Giao tiếp theo chủ đề", "Thực hành phản xạ"], roadmap: "Nền tảng → Giao tiếp → Thực hành" },
  en: { title: "Five-language International Communication", label: "Basic communication", target: "Complete beginners", outcome: "Communicate confidently in everyday situations", syllabus: ["Core pronunciation", "Topic-based communication", "Response practice"], roadmap: "Foundation → Communication → Practice" },
  zh: { title: "五语国际交流课程", label: "基础交流", target: "零基础学习者", outcome: "自信应对日常交流场景", syllabus: ["基础发音", "主题交流", "反应训练"], roadmap: "基础 → 交流 → 实践" },
  ko: { title: "5개 언어 국제 회화 과정", label: "기초 회화", target: "초급 학습자", outcome: "일상 상황에서 자신 있게 소통", syllabus: ["기초 발음", "주제별 회화", "반응 연습"], roadmap: "기초 → 회화 → 실전" },
  ja: { title: "5言語国際コミュニケーション講座", label: "基礎会話", target: "初心者", outcome: "日常の場面で自信を持って会話できる", syllabus: ["基礎発音", "テーマ別会話", "応答練習"], roadmap: "基礎 → 会話 → 実践" },
};
const categoryNames = { vi: "[SMOKE] Tuyển sinh", en: "[SMOKE] Admissions", zh: "[SMOKE] 招生", ko: "[SMOKE] 입학 안내", ja: "[SMOKE] 募集案内" };
const tagNames = { vi: "Khóa mới", en: "New course", zh: "新课程", ko: "신규 과정", ja: "新コース" };
const articleCopy = {
  vi: { title: "ALOHA khai giảng khóa giao tiếp quốc tế", excerpt: "Chương trình thực hành giao tiếp dành cho người mới bắt đầu.", content: "## Khai giảng\n\nALOHA mở lớp giao tiếp quốc tế với lộ trình rõ ràng và hoạt động thực hành mỗi buổi." },
  en: { title: "ALOHA launches an international communication course", excerpt: "A practical communication program for complete beginners.", content: "## Enrollment open\n\nALOHA introduces an international communication course with a clear roadmap and practice in every lesson." },
  zh: { title: "ALOHA 国际交流课程开课", excerpt: "面向零基础学习者的实用交流课程。", content: "## 开始招生\n\nALOHA 推出国际交流课程，每节课都有清晰的学习路径和实践活动。" },
  ko: { title: "ALOHA 국제 회화 과정 개강", excerpt: "초급 학습자를 위한 실용 회화 프로그램입니다.", content: "## 수강 신청\n\nALOHA가 명확한 학습 로드맵과 매 수업 실습을 포함한 국제 회화 과정을 시작합니다." },
  ja: { title: "ALOHA国際コミュニケーション講座を開講", excerpt: "初心者向けの実践的な会話プログラムです。", content: "## 受講受付中\n\nALOHAは明確な学習ロードマップと毎回の実践を備えた国際コミュニケーション講座を開講します。" },
};

async function upsertTranslatedParent(tx, model, translationRelation, identity, parentData, translations) {
  let item = await tx[model].findFirst({ where: { [translationRelation]: { some: identity } } });
  if (!item) {
    item = await tx[model].create({ data: { ...parentData, [translationRelation]: { create: translations } } });
  } else {
    item = await tx[model].update({ where: { id: item.id }, data: { ...parentData, [translationRelation]: { deleteMany: {}, create: translations } } });
  }
  return item;
}

try {
  const result = await prisma.$transaction(async (tx) => {
    const admin = await tx.user.findFirst({ where: { username: "alohaadmin", role: "ADMIN", active: true } });
    assert(admin, "default ADMIN must exist and be active");

    const courseType = await upsertTranslatedParent(tx, "courseType", "translations", { locale: "vi", name: courseTypeNames.vi }, { active: true, sortOrder: 900 }, locales.map((locale) => ({ locale, name: courseTypeNames[locale] })));
    let level = await tx.courseLevel.findUnique({ where: { courseTypeId_name: { courseTypeId: courseType.id, name: "smoke-beginner" } } });
    const levelData = { courseTypeId: courseType.id, name: "smoke-beginner", active: true, sortOrder: 1, translations: { deleteMany: {}, create: locales.map((locale) => ({ locale, name: levelNames[locale] })) } };
    level = level
      ? await tx.courseLevel.update({ where: { id: level.id }, data: levelData })
      : await tx.courseLevel.create({ data: { ...levelData, translations: { create: locales.map((locale) => ({ locale, name: levelNames[locale] })) } } });

    const course = await tx.course.upsert({
      where: { slug: "smoke-five-language-course" },
      update: { courseTypeId: courseType.id, courseLevelId: level.id, durationMonths: 3, totalSessions: 24, status: "OPEN", sortOrder: 900, priceVnd: 5900000, discountPercent: 10, translations: { deleteMany: {}, create: locales.map((locale) => ({ locale, ...courseCopy[locale] })) } },
      create: { slug: "smoke-five-language-course", courseTypeId: courseType.id, courseLevelId: level.id, durationMonths: 3, totalSessions: 24, status: "OPEN", sortOrder: 900, priceVnd: 5900000, discountPercent: 10, translations: { create: locales.map((locale) => ({ locale, ...courseCopy[locale] })) } },
      include: { translations: true },
    });

    const category = await upsertTranslatedParent(tx, "newsArticleCategory", "translations", { locale: "vi", name: categoryNames.vi }, { active: true, sortOrder: 900 }, locales.map((locale) => ({ locale, name: categoryNames[locale] })));
    const tag = await upsertTranslatedParent(tx, "newsTags", "translations", { locale: "vi", name: tagNames.vi }, { active: true }, locales.map((locale) => ({ locale, name: tagNames[locale] })));
    const article = await tx.newsArticle.upsert({
      where: { slug: "smoke-aloha-international-course" },
      update: { categoryId: category.id, author: "ALOHA Academic Team", status: "PUBLISHED", prominent: true, coverImage: "/images/news/placeholder.svg", gallery: [], publishedAt: new Date(), translations: { deleteMany: {}, create: locales.map((locale) => ({ locale, ...articleCopy[locale] })) }, tagLinks: { deleteMany: {}, create: [{ newsTagId: tag.id }] } },
      create: { slug: "smoke-aloha-international-course", categoryId: category.id, author: "ALOHA Academic Team", status: "PUBLISHED", prominent: true, coverImage: "/images/news/placeholder.svg", gallery: [], publishedAt: new Date(), translations: { create: locales.map((locale) => ({ locale, ...articleCopy[locale] })) }, tagLinks: { create: [{ newsTagId: tag.id }] } },
      include: { translations: true, tagLinks: true },
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
    assert(article.tagLinks.length === 1, "article/tag relation must exist");
    assert(enrollment.status === "CONFIRMED", "enrollment status update must persist");
    assert(feedback.active, "feedback moderation update must persist");
    assert(staff.role === "STAFF" && staff.active, "STAFF account must be active");
    return { adminId: admin.id, staffId: staff.id, courseTypeId: courseType.id, levelId: level.id, courseId: course.id, categoryId: category.id, tagId: tag.id, articleId: article.id, enrollmentId: enrollment.id, feedbackId: feedback.id, branchId: branch.id };
  }, { timeout: 30_000 });

  const duplicateSlugRejected = await prisma.course.create({ data: { slug: "smoke-five-language-course", courseTypeId: result.courseTypeId, courseLevelId: result.levelId, durationMonths: 1, totalSessions: 1 } }).then(() => false).catch((error) => error?.code === "P2002");
  assert(duplicateSlugRejected, "duplicate course slug must be rejected");

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
  console.log(JSON.stringify({ ok: true, ...result, localeCounts, retained: { courseSlug: "smoke-five-language-course", articleSlug: "smoke-aloha-international-course", branchCode: "SMOKE-HN", staffUsername: "alohastaff" } }, null, 2));
} finally {
  await prisma.$disconnect();
}
