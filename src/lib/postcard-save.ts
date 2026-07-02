import type { SupabaseClient } from "@supabase/supabase-js";

const LEGACY_STYLES = new Set(["modern", "retro", "vintage"]);

export async function upsertPostcard(
  supabase: SupabaseClient,
  payload: Record<string, unknown>
) {
  let current = { ...payload };

  for (let attempt = 0; attempt < 40; attempt++) {
    const { error } = await supabase.from("postcards").upsert(current);
    if (!error) return;

    const msg = error.message;

    const missingColumn = msg.match(/Could not find the '([^']+)' column/);
    if (missingColumn) {
      const { [missingColumn[1]]: _removed, ...rest } = current;
      current = rest;
      continue;
    }

    if (
      msg.includes("check constraint") &&
      "style" in current &&
      !LEGACY_STYLES.has(String(current.style))
    ) {
      current = { ...current, style: "vintage" };
      continue;
    }

    throw new Error(msg);
  }

  throw new Error(
    "Could not save postcard. Run supabase/migrations/009_catchup_postcard_columns.sql in the Supabase SQL Editor."
  );
}
