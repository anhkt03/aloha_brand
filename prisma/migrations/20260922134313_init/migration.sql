-- CreateEnum
CREATE TYPE "CourseStatus" AS ENUM ('OPEN', 'COMING_SOON', 'CLOSED');

-- CreateEnum
CREATE TYPE "NewsStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "EnrollmentType" AS ENUM ('TRIAL', 'REAL');

-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'STAFF');

-- CreateTable
CREATE TABLE "course_types" (
    "id" SERIAL NOT NULL,
    "icon_url" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "course_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_type_translations" (
    "id" SERIAL NOT NULL,
    "course_type_id" INTEGER NOT NULL,
    "locale" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "course_type_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_levels" (
    "id" SERIAL NOT NULL,
    "course_type_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "course_levels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_level_translations" (
    "id" SERIAL NOT NULL,
    "course_level_id" INTEGER NOT NULL,
    "locale" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "course_level_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "course_type_id" INTEGER NOT NULL,
    "course_level_id" INTEGER NOT NULL,
    "duration_months" INTEGER NOT NULL,
    "total_sessions" INTEGER NOT NULL,
    "status" "CourseStatus" NOT NULL DEFAULT 'OPEN',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "icon_url" TEXT,
    "price_vnd" INTEGER,
    "discount_percent" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_translations" (
    "id" SERIAL NOT NULL,
    "course_id" INTEGER NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "outcome" TEXT NOT NULL,
    "syllabus" TEXT[],
    "roadmap" TEXT,

    CONSTRAINT "course_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news_article_categories" (
    "id" SERIAL NOT NULL,
    "icon_url" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "news_article_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news_article_category_translations" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "locale" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "news_article_category_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news_tags" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "news_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news_tag_translations" (
    "id" SERIAL NOT NULL,
    "news_tag_id" INTEGER NOT NULL,
    "locale" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "news_tag_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news_articles" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "cover_image" TEXT NOT NULL,
    "gallery" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "category_id" INTEGER NOT NULL,
    "author" TEXT NOT NULL,
    "status" "NewsStatus" NOT NULL DEFAULT 'PUBLISHED',
    "prominent" BOOLEAN NOT NULL DEFAULT false,
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "published_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "news_articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news_article_tags" (
    "news_article_id" INTEGER NOT NULL,
    "news_tag_id" INTEGER NOT NULL,

    CONSTRAINT "news_article_tags_pkey" PRIMARY KEY ("news_article_id","news_tag_id")
);

-- CreateTable
CREATE TABLE "news_article_translations" (
    "id" SERIAL NOT NULL,
    "news_article_id" INTEGER NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "news_article_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enrollments" (
    "id" SERIAL NOT NULL,
    "type" "EnrollmentType" NOT NULL,
    "course_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "note" TEXT,
    "status" "EnrollmentStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "enrollments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "branches" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT,
    "map_url" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "branches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'STAFF',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "course_type_translations_locale_idx" ON "course_type_translations"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "course_type_translations_course_type_id_locale_key" ON "course_type_translations"("course_type_id", "locale");

-- CreateIndex
CREATE INDEX "course_levels_course_type_id_active_idx" ON "course_levels"("course_type_id", "active");

-- CreateIndex
CREATE UNIQUE INDEX "course_levels_course_type_id_name_key" ON "course_levels"("course_type_id", "name");

-- CreateIndex
CREATE INDEX "course_level_translations_locale_idx" ON "course_level_translations"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "course_level_translations_course_level_id_locale_key" ON "course_level_translations"("course_level_id", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "courses_slug_key" ON "courses"("slug");

-- CreateIndex
CREATE INDEX "courses_course_type_id_status_idx" ON "courses"("course_type_id", "status");

-- CreateIndex
CREATE INDEX "courses_course_level_id_status_idx" ON "courses"("course_level_id", "status");

-- CreateIndex
CREATE INDEX "courses_sort_order_status_idx" ON "courses"("sort_order", "status");

-- CreateIndex
CREATE INDEX "course_translations_locale_idx" ON "course_translations"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "course_translations_course_id_locale_key" ON "course_translations"("course_id", "locale");

-- CreateIndex
CREATE INDEX "news_article_category_translations_locale_idx" ON "news_article_category_translations"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "news_article_category_translations_category_id_locale_key" ON "news_article_category_translations"("category_id", "locale");

-- CreateIndex
CREATE INDEX "news_tag_translations_locale_idx" ON "news_tag_translations"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "news_tag_translations_news_tag_id_locale_key" ON "news_tag_translations"("news_tag_id", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "news_articles_slug_key" ON "news_articles"("slug");

-- CreateIndex
CREATE INDEX "news_articles_category_id_published_at_idx" ON "news_articles"("category_id", "published_at" DESC);

-- CreateIndex
CREATE INDEX "news_articles_status_published_at_idx" ON "news_articles"("status", "published_at" DESC);

-- CreateIndex
CREATE INDEX "news_articles_prominent_status_idx" ON "news_articles"("prominent", "status");

-- CreateIndex
CREATE INDEX "news_article_tags_news_tag_id_idx" ON "news_article_tags"("news_tag_id");

-- CreateIndex
CREATE INDEX "news_article_translations_locale_idx" ON "news_article_translations"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "news_article_translations_news_article_id_locale_key" ON "news_article_translations"("news_article_id", "locale");

-- CreateIndex
CREATE INDEX "enrollments_type_status_idx" ON "enrollments"("type", "status");

-- CreateIndex
CREATE INDEX "enrollments_course_id_status_idx" ON "enrollments"("course_id", "status");

-- CreateIndex
CREATE INDEX "enrollments_created_at_idx" ON "enrollments"("created_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "branches_code_key" ON "branches"("code");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "course_type_translations" ADD CONSTRAINT "course_type_translations_course_type_id_fkey" FOREIGN KEY ("course_type_id") REFERENCES "course_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_levels" ADD CONSTRAINT "course_levels_course_type_id_fkey" FOREIGN KEY ("course_type_id") REFERENCES "course_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_level_translations" ADD CONSTRAINT "course_level_translations_course_level_id_fkey" FOREIGN KEY ("course_level_id") REFERENCES "course_levels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_course_type_id_fkey" FOREIGN KEY ("course_type_id") REFERENCES "course_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_course_level_id_fkey" FOREIGN KEY ("course_level_id") REFERENCES "course_levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_translations" ADD CONSTRAINT "course_translations_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_article_category_translations" ADD CONSTRAINT "news_article_category_translations_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "news_article_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_tag_translations" ADD CONSTRAINT "news_tag_translations_news_tag_id_fkey" FOREIGN KEY ("news_tag_id") REFERENCES "news_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_articles" ADD CONSTRAINT "news_articles_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "news_article_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_article_tags" ADD CONSTRAINT "news_article_tags_news_article_id_fkey" FOREIGN KEY ("news_article_id") REFERENCES "news_articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_article_tags" ADD CONSTRAINT "news_article_tags_news_tag_id_fkey" FOREIGN KEY ("news_tag_id") REFERENCES "news_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_article_translations" ADD CONSTRAINT "news_article_translations_news_article_id_fkey" FOREIGN KEY ("news_article_id") REFERENCES "news_articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
