import { PrismaClient } from "@prisma/client";
import { createHmac } from "crypto";

const prisma = new PrismaClient();
const baseUrl = process.env.SMOKE_BASE_URL || "http://localhost:3100";
const secret = process.env.AUTH_SESSION_SECRET;
if (!secret) throw new Error("AUTH_SESSION_SECRET is required");

function assert(condition, message) {
  if (!condition) throw new Error(`HTTP SMOKE ASSERTION FAILED: ${message}`);
}
function sessionCookie(id) {
  const payload = Buffer.from(JSON.stringify({ id, exp: Date.now() + 60 * 60 * 1000 })).toString("base64url");
  const signature = createHmac("sha256", secret).update(payload).digest("base64url");
  return `aloha_admin_session=${payload}.${signature}`;
}

try {
  const admin = await prisma.user.findUniqueOrThrow({ where: { username: "alohaadmin" } });
  const staff = await prisma.user.findUniqueOrThrow({ where: { username: "alohastaff" } });
  const course = await prisma.course.findUniqueOrThrow({ where: { slug: "smoke-five-language-course" }, include: { translations: true } });
  const requestKey = Date.now();

  const localeResults = {};
  for (const locale of ["vi", "en", "zh", "ko", "ja"]) {
    const expected = course.translations.find((item) => item.locale === locale)?.title;
    const homeResponse = await fetch(`${baseUrl}/${locale}`);
    assert(homeResponse.ok, `${locale} home page must return 200`);
    const response = await fetch(`${baseUrl}/${locale}/ngoaingu`);
    const html = await response.text();
    assert(response.ok, `${locale} training page must return 200`);
    assert(expected && html.includes(expected), `${locale} training page must contain localized course title`);
    localeResults[locale] = { home: homeResponse.status, training: response.status };
  }

  const articleResponse = await fetch(`${baseUrl}/zh/news/smoke-aloha-international-course`);
  assert(articleResponse.ok && (await articleResponse.text()).includes("ALOHA 国际交流课程开课"), "Chinese news detail must render database translation");
  const optionsResponse = await fetch(`${baseUrl}/api/enrollments`);
  assert(optionsResponse.ok && JSON.stringify(await optionsResponse.json()).includes(String(course.id)), "public course options must include smoke course");

  const invalidResponse = await fetch(`${baseUrl}/api/enrollments`, { method: "POST", headers: { "content-type": "application/json", "x-forwarded-for": `smoke-invalid-${requestKey}` }, body: JSON.stringify({}) });
  assert(invalidResponse.status === 400, "invalid enrollment must return 400");
  const payload = { type: "REAL", courseId: course.id, name: "[SMOKE HTTP] Lê Thu Hà", phone: "0900000002", email: "smoke.http@example.com", note: "HTTP integration smoke test" };
  await prisma.enrollment.deleteMany({ where: { courseId: course.id, phone: payload.phone } });
  const createResponse = await fetch(`${baseUrl}/api/enrollments`, { method: "POST", headers: { "content-type": "application/json", "x-forwarded-for": `smoke-create-${requestKey}` }, body: JSON.stringify(payload) });
  assert(createResponse.status === 201, "valid enrollment must be created");
  const duplicateResponse = await fetch(`${baseUrl}/api/enrollments`, { method: "POST", headers: { "content-type": "application/json", "x-forwarded-for": `smoke-create-${requestKey}` }, body: JSON.stringify(payload) });
  assert(duplicateResponse.status === 200, "duplicate enrollment must be suppressed");

  let rateLimitStatus = 0;
  for (let index = 0; index < 6; index += 1) {
    const response = await fetch(`${baseUrl}/api/enrollments`, { method: "POST", headers: { "content-type": "application/json", "x-forwarded-for": `smoke-rate-${requestKey}` }, body: "{}" });
    rateLimitStatus = response.status;
  }
  assert(rateLimitStatus === 429, "sixth enrollment request in a minute must be rate limited");

  const anonymousAdmin = await fetch(`${baseUrl}/admin`, { redirect: "manual" });
  assert([303, 307, 308].includes(anonymousAdmin.status), "anonymous admin request must redirect");
  const adminUsers = await fetch(`${baseUrl}/admin/users`, { headers: { cookie: sessionCookie(admin.id) }, redirect: "manual" });
  assert(adminUsers.status === 200, "ADMIN must access user management");
  const smokeArticle = await prisma.newsArticle.findUniqueOrThrow({ where: { slug: "smoke-aloha-international-course" } });
  const adminPages = [
    "/admin/courses", "/admin/courses/new", `/admin/courses/${course.id}`,
    "/admin/courses/types", "/admin/courses/levels",
    "/admin/news", "/admin/news/new", `/admin/news/${smokeArticle.id}`,
    "/admin/news/categories", "/admin/news/tags",
    "/admin/enrollments", "/admin/feedback", "/admin/feedback/new",
    "/admin/branches", "/admin/branches/new", "/admin/users", "/admin/users/new",
  ];
  for (const path of adminPages) {
    const response = await fetch(`${baseUrl}${path}`, { headers: { cookie: sessionCookie(admin.id) }, redirect: "manual" });
    assert(response.status === 200, `ADMIN page ${path} must return 200 (received ${response.status})`);
  }
  const staffDashboard = await fetch(`${baseUrl}/admin`, { headers: { cookie: sessionCookie(staff.id) }, redirect: "manual" });
  assert(staffDashboard.status === 200, "STAFF must access dashboard");
  const staffUsers = await fetch(`${baseUrl}/admin/users`, { headers: { cookie: sessionCookie(staff.id) }, redirect: "manual" });
  const staffUsersBody = await staffUsers.text();
  const staffRedirected = [303, 307, 308].includes(staffUsers.status) || staffUsersBody.includes("NEXT_REDIRECT") || staffUsersBody.includes("url=/admin") || staffUsersBody.includes('http-equiv="refresh"');
  assert(staffRedirected && !staffUsersBody.includes("ALOHA Administrator"), `STAFF must be redirected without receiving user records (received ${staffUsers.status})`);
  const anonymousUpload = await fetch(`${baseUrl}/api/admin/media`, { method: "POST", redirect: "manual" });
  assert([303, 307, 308].includes(anonymousUpload.status), "anonymous user must not upload media");
  const staffUploadValidation = await fetch(`${baseUrl}/api/admin/media`, { method: "POST", headers: { cookie: sessionCookie(staff.id) } });
  assert(staffUploadValidation.status === 400, "authenticated STAFF must reach media input validation");

  console.log(JSON.stringify({ ok: true, baseUrl, localePages: localeResults, adminPagesChecked: adminPages.length, enrollment: { invalid: invalidResponse.status, create: createResponse.status, duplicate: duplicateResponse.status, rateLimited: rateLimitStatus }, authorization: { anonymousAdmin: anonymousAdmin.status, adminUsers: adminUsers.status, staffDashboard: staffDashboard.status, staffUsers: staffUsers.status, anonymousUpload: anonymousUpload.status, staffUploadValidation: staffUploadValidation.status } }, null, 2));
} finally {
  await prisma.user.updateMany({ where: { username: "alohastaff" }, data: { active: false } });
  await prisma.$disconnect();
}
