-- Backfill the newly required Chinese locale from the preferred existing
-- translation. ON CONFLICT keeps this migration safe to re-run.
INSERT INTO "course_type_translations" ("course_type_id", "locale", "name")
SELECT ct."id", 'zh', source."name"
FROM "course_types" ct
CROSS JOIN LATERAL (
  SELECT t."name" FROM "course_type_translations" t
  WHERE t."course_type_id" = ct."id"
  ORDER BY CASE t."locale" WHEN 'vi' THEN 0 WHEN 'en' THEN 1 ELSE 2 END, t."id"
  LIMIT 1
) source
ON CONFLICT ("course_type_id", "locale") DO NOTHING;

INSERT INTO "course_level_translations" ("course_level_id", "locale", "name")
SELECT cl."id", 'zh', source."name"
FROM "course_levels" cl
CROSS JOIN LATERAL (
  SELECT t."name" FROM "course_level_translations" t
  WHERE t."course_level_id" = cl."id"
  ORDER BY CASE t."locale" WHEN 'vi' THEN 0 WHEN 'en' THEN 1 ELSE 2 END, t."id"
  LIMIT 1
) source
ON CONFLICT ("course_level_id", "locale") DO NOTHING;

INSERT INTO "course_translations" ("course_id", "locale", "title", "label", "target", "outcome", "syllabus", "roadmap")
SELECT c."id", 'zh', source."title", source."label", source."target", source."outcome", source."syllabus", source."roadmap"
FROM "courses" c
CROSS JOIN LATERAL (
  SELECT t."title", t."label", t."target", t."outcome", t."syllabus", t."roadmap"
  FROM "course_translations" t
  WHERE t."course_id" = c."id"
  ORDER BY CASE t."locale" WHEN 'vi' THEN 0 WHEN 'en' THEN 1 ELSE 2 END, t."id"
  LIMIT 1
) source
ON CONFLICT ("course_id", "locale") DO NOTHING;

INSERT INTO "news_article_category_translations" ("category_id", "locale", "name")
SELECT category."id", 'zh', source."name"
FROM "news_article_categories" category
CROSS JOIN LATERAL (
  SELECT t."name" FROM "news_article_category_translations" t
  WHERE t."category_id" = category."id"
  ORDER BY CASE t."locale" WHEN 'vi' THEN 0 WHEN 'en' THEN 1 ELSE 2 END, t."id"
  LIMIT 1
) source
ON CONFLICT ("category_id", "locale") DO NOTHING;

INSERT INTO "news_tag_translations" ("news_tag_id", "locale", "name")
SELECT tag."id", 'zh', source."name"
FROM "news_tags" tag
CROSS JOIN LATERAL (
  SELECT t."name" FROM "news_tag_translations" t
  WHERE t."news_tag_id" = tag."id"
  ORDER BY CASE t."locale" WHEN 'vi' THEN 0 WHEN 'en' THEN 1 ELSE 2 END, t."id"
  LIMIT 1
) source
ON CONFLICT ("news_tag_id", "locale") DO NOTHING;

INSERT INTO "news_article_translations" ("news_article_id", "locale", "title", "excerpt", "content")
SELECT article."id", 'zh', source."title", source."excerpt", source."content"
FROM "news_articles" article
CROSS JOIN LATERAL (
  SELECT t."title", t."excerpt", t."content"
  FROM "news_article_translations" t
  WHERE t."news_article_id" = article."id"
  ORDER BY CASE t."locale" WHEN 'vi' THEN 0 WHEN 'en' THEN 1 ELSE 2 END, t."id"
  LIMIT 1
) source
ON CONFLICT ("news_article_id", "locale") DO NOTHING;
