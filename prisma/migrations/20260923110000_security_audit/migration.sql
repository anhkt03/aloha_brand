CREATE TABLE "audit_logs" (
  "id" BIGSERIAL PRIMARY KEY,
  "actor_user_id" INTEGER,
  "action" TEXT NOT NULL,
  "entity" TEXT NOT NULL,
  "entity_id" TEXT,
  "metadata" JSONB,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "audit_logs_actor_user_id_fkey" FOREIGN KEY ("actor_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE INDEX "audit_logs_actor_user_id_created_at_idx" ON "audit_logs"("actor_user_id", "created_at" DESC);
CREATE INDEX "audit_logs_entity_entity_id_created_at_idx" ON "audit_logs"("entity", "entity_id", "created_at" DESC);
CREATE INDEX "users_role_active_idx" ON "users"("role", "active");
CREATE INDEX "branches_active_code_idx" ON "branches"("active", "code");
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'aloha_runtime') THEN
    CREATE ROLE aloha_runtime NOLOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT;
  END IF;
END $$;
GRANT USAGE ON SCHEMA alohadb TO aloha_runtime;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA alohadb TO aloha_runtime;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA alohadb TO aloha_runtime;
ALTER DEFAULT PRIVILEGES IN SCHEMA alohadb GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO aloha_runtime;
ALTER DEFAULT PRIVILEGES IN SCHEMA alohadb GRANT USAGE, SELECT ON SEQUENCES TO aloha_runtime;
