import type { Config } from "drizzle-kit";

export default {
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  driver: "turso",
  dbCredentials: {
    url: "libsql://interview-1-kgaulin.turso.io",
    authToken:
      "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MDg5MTU2MzEsImlkIjoiMmI5NzFjNTEtZDQ1MS0xMWVlLWIzMmEtZGU0YWQ3NTljZGZlIn0.CS6uXpA91Cspa44jkOrTjZegXMRWyIV9Oz4VMUmP8efs_sWbgfOcKHGgGnwQLQRU29lNJQ1DSAxG2TddfodmBw",
  },
} satisfies Config;
