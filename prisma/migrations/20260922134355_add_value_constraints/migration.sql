ALTER TABLE "feedback"
  ADD CONSTRAINT "feedback_rating_range"
  CHECK ("rating" BETWEEN 1 AND 5);

ALTER TABLE "courses"
  ADD CONSTRAINT "courses_discount_percent_range"
  CHECK ("discount_percent" IS NULL OR "discount_percent" BETWEEN 0 AND 100);
