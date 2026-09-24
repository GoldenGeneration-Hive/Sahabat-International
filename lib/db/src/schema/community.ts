import { date, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

// A single editable public event record. Date and venue remain unset until confirmed.
export const nextEventTable = pgTable("next_event", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  date: date("date", { mode: "string" }),
  venue: text("venue"),
  details: text("details").notNull(),
});

export const eventInterestTable = pgTable("event_interest", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  volunteerTiming: text("volunteer_timing"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertEventInterestSchema = createInsertSchema(eventInterestTable).omit({
  id: true,
  createdAt: true,
});
export type InsertEventInterest = z.infer<typeof insertEventInterestSchema>;
export type EventInterest = typeof eventInterestTable.$inferSelect;