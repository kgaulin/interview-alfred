import { blob, sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const images = sqliteTable("images", {
  id: text('id').primaryKey(),
  file: blob("blob", { mode: "buffer" }),
  name: text("name").notNull().default(""),
  isReady: text("ready"),
});
