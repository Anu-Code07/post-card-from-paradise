import { readFileSync } from "node:fs";
import { join } from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const secret = process.env.MIGRATE_SECRET;
  const databaseUrl = process.env.DATABASE_URL;

  if (!secret || !databaseUrl) {
    return NextResponse.json(
      {
        error:
          "Set DATABASE_URL and MIGRATE_SECRET in env, then POST with Authorization: Bearer <MIGRATE_SECRET>",
      },
      { status: 500 }
    );
  }

  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sqlPath = join(
    process.cwd(),
    "supabase/migrations/009_catchup_postcard_columns.sql"
  );
  const migration = readFileSync(sqlPath, "utf8");

  const postgres = (await import("postgres")).default;
  const db = postgres(databaseUrl, { max: 1 });

  try {
    await db.unsafe(migration);
    return NextResponse.json({ ok: true, message: "Migration 009 applied" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Migration failed";
    return NextResponse.json({ error: message }, { status: 500 });
  } finally {
    await db.end({ timeout: 5 });
  }
}
