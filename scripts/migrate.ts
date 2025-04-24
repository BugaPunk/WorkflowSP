import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db, closePool } from "../db/db.ts";

async function main() {
  console.log("Running database migrations...");

  try {
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("Migrations completed successfully!");
  } catch (error) {
    console.error("Error running migrations:", error);
  } finally {
    // Close the database connection
    await closePool();
  }
}

if (import.meta.main) {
  main();
}
