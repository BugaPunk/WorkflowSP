import { testConnection, closePool } from "./db.ts";

async function main() {
  const isConnected = await testConnection();
  
  if (isConnected) {
    console.log("Database connection test successful!");
  } else {
    console.error("Database connection test failed!");
  }
  
  await closePool();
}

main();
