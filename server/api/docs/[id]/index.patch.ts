import { and, eq, sql } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { type DocInsert, docs } from '../../../db/schema/doc'

const bodySchema = createInsertSchema(docs)
  .pick({ title: true, schema: true })
  .partial({ title: true, schema: true })

export type Body = Partial<Pick<DocInsert, 'title' | 'schema'>>

export default defineEventHandler(async (event) => {
  try {
    const { username } = await verifyToken(event)

    const body = await readValidatedBody(event, bodySchema.parse)

    const data: any = {}
    if (body.title)
      data.title = body.title
    if (body.schema)
      data.schema = body.schema

    await db
      .update(docs)
      .set({
        modifiedDate: sql`(CURRENT_TIMESTAMP)`,
        ...data,
      })
      .where(and(
        eq(docs.owner, username),
        eq(docs.id, event.context.params?.id as string),
      ))

    return { message: 'Success' }
  }
  catch {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid username or password',
    })
  }
})
