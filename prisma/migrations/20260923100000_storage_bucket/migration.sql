INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('aloha-media', 'aloha-media', true, 5242880, ARRAY['image/jpeg','image/png','image/webp','image/avif','image/svg+xml'])
ON CONFLICT (id) DO UPDATE SET public = EXCLUDED.public, file_size_limit = EXCLUDED.file_size_limit, allowed_mime_types = EXCLUDED.allowed_mime_types;
-- No browser write policies are created. Local-auth users upload through the
-- authorized Next.js server route, which uses the server-only secret key.
