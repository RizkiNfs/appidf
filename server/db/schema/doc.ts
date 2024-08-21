import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { users } from './user'

export interface DocSchema extends Record<string, any> {

}

export const docs = sqliteTable('docs', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  createdDate: integer('created_time').default(sql`(CURRENT_TIMESTAMP)`),
  modifiedDate: integer('updated_time').default(sql`(CURRENT_TIMESTAMP)`),
  owner: text('owner').references(() => users.username).notNull(),
  schema: text('schema', { mode: 'json' }).$type<DocSchema>().notNull(),
})

export type DocSelect = typeof docs.$inferSelect
export type DocInsert = typeof docs.$inferInsert

export type DocField = keyof DocSelect
