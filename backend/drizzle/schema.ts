import { sqliteTable, text } from "drizzle-orm/sqlite-core";

const foo = sqliteTable("foo", {
  bar: text("bar").notNull().default("Hey!"),
});
