ALTER TABLE "users" ADD COLUMN "username" TEXT;
ALTER TABLE "users" ADD COLUMN "password_hash" TEXT;

UPDATE "users"
SET "username" = lower(regexp_replace(split_part("email", '@', 1), '[^a-zA-Z0-9_]', '_', 'g')) || '_' || "id";
UPDATE "users" SET "password_hash" = '!' WHERE "password_hash" IS NULL;

ALTER TABLE "users" ALTER COLUMN "username" SET NOT NULL;
ALTER TABLE "users" ALTER COLUMN "password_hash" SET NOT NULL;
ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL;
ALTER TABLE "users" DROP COLUMN "auth_user_id";

CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
CREATE INDEX "users_username_active_idx" ON "users"("username", "active");
