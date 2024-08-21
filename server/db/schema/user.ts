import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  username: text('username').unique().notNull(),
  password: text('password').notNull(),
})

export type UserSelect = typeof users.$inferSelect
export type UserInsert = typeof users.$inferInsert

export type UserField = keyof UserSelect
