ALTER TABLE "feedback" ADD COLUMN "active" BOOLEAN NOT NULL DEFAULT false;
CREATE INDEX "feedback_active_created_at_idx" ON "feedback"("active", "created_at" DESC);
