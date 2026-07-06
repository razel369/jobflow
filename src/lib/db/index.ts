/**
 * Use the @libsql/client/web entrypoint for Vercel serverless compatibility.
 * It uses HTTP-only and avoids native bindings.
 */
import { createClient } from "@libsql/client/web";
import { drizzle } from "drizzle-orm/libsql/web";
import * as schema from "./schema";

/**
 * Vercel rewrites custom URL schemes (libsql://) to https:// unless the variable
 * is explicitly used by Vercel-aware tooling. Naming the env vars per Turso's
 * Vercel integration guide prevents this rewriting.
 */
const url = (process.env.TURSO_DATABASE_URL ?? process.env.DATABASE_URL ?? "").trim();
const authToken = (process.env.TURSO_AUTH_TOKEN ?? process.env.DATABASE_AUTH_TOKEN ?? "").trim();

if (!url) {
  console.warn("[db] TURSO_DATABASE_URL is not set — DB queries will fail");
}

export const sqlite = createClient({ url, authToken });
export const db = drizzle(sqlite, { schema });
export { schema };
export * from "./schema";