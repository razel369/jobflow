/**
 * Apply Drizzle migrations to the configured Turso DB.
 * Reads DATABASE_URL & DATABASE_AUTH_TOKEN from env.
 *
 * Run: npm run db:migrate
 */
import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { migrate } from "drizzle-orm/libsql/migrator";

async function main() {
  const url = process.env.DATABASE_URL;
  const authToken = process.env.DATABASE_AUTH_TOKEN;

  if (!url) {
    console.error("DATABASE_URL is required. Copy .env.example to .env and fill it in.");
    process.exit(1);
  }

  console.log(`Migrating ${url}...`);

  const client = createClient({ url, authToken });
  const db = drizzle(client);

  try {
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("✓ Migrations applied");
  } catch (err: any) {
    console.error("Migration failed:", err.message);
    process.exit(1);
  }

  process.exit(0);
}

main();