import { db, closePool } from "../db/db.ts";

async function main() {
  console.log("Checking database tables...");
  
  try {
    // Query to get all tables in the public schema
    const result = await db.execute(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
    );
    
    console.log("Tables in the database:");
    console.log(result.rows);
  } catch (error) {
    console.error("Error checking tables:", error);
  } finally {
    await closePool();
  }
}

if (import.meta.main) {
  main();
}
