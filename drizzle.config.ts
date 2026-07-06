import { defineConfig } from "drizzle-kit";

const url = process.env.DATABASE_URL ?? process.env.TURSO_DATABASE_URL ?? "";
const authToken = process.env.DATABASE_AUTH_TOKEN ?? process.env.TURSO_AUTH_TOKEN;

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "turso",
  dbCredentials: {
    url,
    authToken,
  },
  verbose: true,
  strict: true,
});