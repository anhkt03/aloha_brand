# Production deployment

1. Create a strong password and enable the prepared runtime role:
   `ALTER ROLE aloha_runtime LOGIN PASSWORD '<generated-secret>';`
2. Set `DATABASE_URL` to the pooled connection using `aloha_runtime`; retain `DIRECT_URL` only in the migration job.
3. Configure `AUTH_SESSION_SECRET`, `NEXT_PUBLIC_SUPABASE_URL`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, site URL and hotline in hosting secrets.
4. Keep the `alohadb` schema outside Supabase Data API exposed schemas. The application accesses it only through Prisma.
5. Run `npx prisma migrate deploy`, `npm test`, `npm run typecheck`, then `npm run build`.
6. Smoke-test login and CRUD as ADMIN, STAFF, inactive user and anonymous user. Verify upload type/size rejection and enrollment throttling.
7. Rotate any database password or secret ever shared outside the secret manager.
