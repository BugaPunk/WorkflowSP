/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

// Cargar variables de entorno sin validación estricta
import { load } from "$std/dotenv/mod.ts";
await load({ export: true, allowEmptyValues: true });

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";
import config from "./fresh.config.ts";
import { initDatabase } from "./utils/db.ts";

// Initialize the database connection
console.log("Initializing database connection...");
await initDatabase();

// Start the Fresh application
await start(manifest, config);
