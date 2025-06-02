import { initDatabase, closeDatabase } from "../utils/db.ts";

async function main() {
  console.log("Testing database connection...");
  
  try {
    await initDatabase();
    console.log("Database connection test successful!");
  } catch (error) {
    console.error("Database connection test failed:", error);
  } finally {
    await closeDatabase();
  }
}

if (import.meta.main) {
  main();
}
