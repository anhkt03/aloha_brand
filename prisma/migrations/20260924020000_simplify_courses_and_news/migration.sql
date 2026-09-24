-- AlterEnum
BEGIN;
CREATE TYPE "CourseStatus_new" AS ENUM ('HIDDEN', 'PUBLISHED');
ALTER TABLE "courses" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "courses" ALTER COLUMN "status" TYPE "CourseStatus_new" USING ("status"::text::"CourseStatus_new");
ALTER TYPE "CourseStatus" RENAME TO "CourseStatus_old";
ALTER TYPE "CourseStatus_new" RENAME TO "CourseStatus";
DROP TYPE "CourseStatus_old";
ALTER TABLE "courses" ALTER COLUMN "status" SET DEFAULT 'HIDDEN';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "NewsStatus_new" AS ENUM ('HIDDEN', 'PUBLISHED');
ALTER TABLE "news_articles" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "news_articles" ALTER COLUMN "status" TYPE "NewsStatus_new" USING ("status"::text::"NewsStatus_new");
ALTER TYPE "NewsStatus" RENAME TO "NewsStatus_old";
ALTER TYPE "NewsStatus_new" RENAME TO "NewsStatus";
DROP TYPE "NewsStatus_old";
ALTER TABLE "news_articles" ALTER COLUMN "status" SET DEFAULT 'HIDDEN';
COMMIT;

-- DropForeignKey
ALTER TABLE "course_type_translations" DROP CONSTRAINT "course_type_translations_course_type_id_fkey";

-- DropForeignKey
ALTER TABLE "course_levels" DROP CONSTRAINT "course_levels_course_type_id_fkey";

-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_course_type_id_fkey";

-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_course_level_id_fkey";

-- DropForeignKey
ALTER TABLE "news_article_category_translations" DROP CONSTRAINT "news_article_category_translations_category_id_fkey";

-- DropForeignKey
ALTER TABLE "news_tag_translations" DROP CONSTRAINT "news_tag_translations_news_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "news_articles" DROP CONSTRAINT "news_articles_category_id_fkey";

-- DropForeignKey
ALTER TABLE "news_article_tags" DROP CONSTRAINT "news_article_tags_news_article_id_fkey";

-- DropForeignKey
ALTER TABLE "news_article_tags" DROP CONSTRAINT "news_article_tags_news_tag_id_fkey";

-- DropIndex
DROP INDEX "course_levels_course_type_id_active_idx";

-- DropIndex
DROP INDEX "course_levels_course_type_id_name_key";

-- DropIndex
DROP INDEX "courses_slug_key";

-- DropIndex
DROP INDEX "courses_course_type_id_status_idx";

-- DropIndex
DROP INDEX "courses_course_level_id_status_idx";

-- DropIndex
DROP INDEX "courses_sort_order_status_idx";

-- DropIndex
DROP INDEX "news_articles_category_id_published_at_idx";

-- DropIndex
DROP INDEX "news_articles_prominent_status_idx";

-- AlterTable
ALTER TABLE "course_levels" DROP COLUMN "active",
DROP COLUMN "course_type_id",
DROP COLUMN "name",
DROP COLUMN "sort_order";

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "course_level_id",
DROP COLUMN "course_type_id",
DROP COLUMN "discount_percent",
DROP COLUMN "duration_months",
DROP COLUMN "icon_url",
DROP COLUMN "price_vnd",
DROP COLUMN "slug",
DROP COLUMN "sort_order",
DROP COLUMN "total_sessions",
ADD COLUMN     "category_id" INTEGER NOT NULL,
ADD COLUMN     "level_id" INTEGER NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'HIDDEN';

-- AlterTable
ALTER TABLE "course_translations" DROP COLUMN "label",
DROP COLUMN "outcome",
DROP COLUMN "roadmap",
DROP COLUMN "syllabus",
DROP COLUMN "target",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "duration" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "news_articles" DROP COLUMN "author",
DROP COLUMN "category_id",
DROP COLUMN "prominent",
DROP COLUMN "view_count",
ALTER COLUMN "status" SET DEFAULT 'HIDDEN';

-- AlterTable
ALTER TABLE "news_article_translations" DROP COLUMN "excerpt";

-- DropTable
DROP TABLE "course_types";

-- DropTable
DROP TABLE "course_type_translations";

-- DropTable
DROP TABLE "news_article_categories";

-- DropTable
DROP TABLE "news_article_category_translations";

-- DropTable
DROP TABLE "news_tags";

-- DropTable
DROP TABLE "news_tag_translations";

-- DropTable
DROP TABLE "news_article_tags";

-- CreateTable
CREATE TABLE "course_categories" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "course_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_category_translations" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "locale" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "course_category_translations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "course_category_translations_locale_idx" ON "course_category_translations"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "course_category_translations_category_id_locale_key" ON "course_category_translations"("category_id", "locale");

-- CreateIndex
CREATE INDEX "courses_category_id_status_idx" ON "courses"("category_id", "status");

-- CreateIndex
CREATE INDEX "courses_level_id_status_idx" ON "courses"("level_id", "status");

-- AddForeignKey
ALTER TABLE "course_category_translations" ADD CONSTRAINT "course_category_translations_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "course_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "course_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "course_levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

