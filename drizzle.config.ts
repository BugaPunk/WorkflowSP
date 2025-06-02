import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    host: "localhost",
    user: "postgres",
    password: "123456",
    database: "workflow_db",
  },
});
