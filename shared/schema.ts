import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const giveaways = pgTable("giveaways", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  prizeValue: integer("prize_value").notNull(),
  imageUrl: text("image_url"),
  durationDays: integer("duration_days").notNull(),
  entries: integer("entries").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const customPages = pgTable("custom_pages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  type: text("type").notNull(), // 'landing', 'event', 'rules', 'tournament'
  content: text("content").notNull(),
  isPublished: boolean("is_published").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertGiveawaySchema = createInsertSchema(giveaways).omit({
  id: true,
  entries: true,
  createdAt: true,
});

export const insertCustomPageSchema = createInsertSchema(customPages).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertGiveaway = z.infer<typeof insertGiveawaySchema>;
export type Giveaway = typeof giveaways.$inferSelect;
export type InsertCustomPage = z.infer<typeof insertCustomPageSchema>;
export type CustomPage = typeof customPages.$inferSelect;
