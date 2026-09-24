-- Auth identities are owned by Supabase Auth. Existing local password hashes
-- must not be carried into the new model.
ALTER TABLE "users" ADD COLUMN "auth_user_id" UUID;

-- The initial database is empty. If a deployment already has users, associate
-- each profile with its auth.users UUID before applying this migration.
ALTER TABLE "users" ALTER COLUMN "auth_user_id" SET NOT NULL;
ALTER TABLE "users" DROP COLUMN "password_hash";

CREATE UNIQUE INDEX "users_auth_user_id_key" ON "users"("auth_user_id");
CREATE INDEX "users_auth_user_id_active_idx" ON "users"("auth_user_id", "active");
