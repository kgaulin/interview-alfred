import type { Config } from "drizzle-kit";

export default {
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  driver: "turso",
  dbCredentials: {
    url: "libsql://images-matthieumoreau.turso.io",
    authToken:
      "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MDkxODAwODksImlkIjoiYjk5NmE0MTAtZDZiNi0xMWVlLWEwZjEtNTYyYWRhNTU1MDAyIn0.3SfTBdwIrM9JsWJ-HsusTGElEyXbi6PW6dUVPd5lF7k6AE6YlXb1jsj8PkbwiYJMjvjschdVR1SSG657OueMDg",
  },
} satisfies Config;
