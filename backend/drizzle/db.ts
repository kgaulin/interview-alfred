import drizzleConfig from "@/drizzle.config";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const turso = createClient({
  url: drizzleConfig.dbCredentials.url,
  authToken: drizzleConfig.dbCredentials.authToken,
});

export const db = drizzle(turso);
