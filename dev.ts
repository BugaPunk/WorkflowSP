#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";

// Cargar variables de entorno sin validación estricta
import { load } from "$std/dotenv/mod.ts";
await load({ export: true, allowEmptyValues: true });

await dev(import.meta.url, "./main.ts", config);
