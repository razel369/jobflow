import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

const url = process.env.DATABASE_URL ?? process.env.TURSO_DATABASE_URL;
const authToken = process.env.DATABASE_AUTH_TOKEN ?? process.env.TURSO_AUTH_TOKEN;

if (!url) {
  throw new Error("DATABASE_URL / TURSO_DATABASE_URL is required");
}

export const sqlite = createClient({
  url,
  authToken,
});

export const db = drizzle(sqlite, { schema });
export { schema };
export * from "./schema";