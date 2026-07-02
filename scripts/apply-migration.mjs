import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import postgres from "postgres";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("Set DATABASE_URL (Supabase → Project Settings → Database → Connection string)");
  process.exit(1);
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const migration = readFileSync(
  join(root, "supabase/migrations/009_catchup_postcard_columns.sql"),
  "utf8"
);

const sql = postgres(databaseUrl, { max: 1 });

try {
  await sql.unsafe(migration);
  console.log("Migration 009 applied successfully.");
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  await sql.end({ timeout: 5 });
}
