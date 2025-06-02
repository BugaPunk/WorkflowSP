import { FreshContext } from "$fresh/server.ts";
import { db } from "../../utils/db.ts";

export const handler = async (_req: Request, _ctx: FreshContext): Promise<Response> => {
  try {
    // Query to get all tables in the public schema
    const result = await db.execute(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
    );

    return new Response(JSON.stringify({
      success: true,
      message: "Database connection successful",
      tables: result.rows
    }), {
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Database error:", error);

    return new Response(JSON.stringify({
      success: false,
      message: "Database connection failed",
      error: error instanceof Error ? error.message : String(error)
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
