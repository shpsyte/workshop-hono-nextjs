import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

export const client = createClient({
  url: process.env.DATABASE_URL!!,
  authToken: process.env.DATABASE_TOKEN!!,
});

export const db = drizzle(client, {
  schema: schema,
});
