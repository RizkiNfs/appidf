import { and, eq } from 'drizzle-orm'
import { docs } from '../../../db/schema/doc'

export default defineEventHandler(async (event) => {
  try {
    const payload = await verifyToken(event)

    const id = event.context.params?.id as string

    const [results] = await db
      .select({
        id: docs.id,
        title: docs.title,
        createdDate: docs.createdDate,
        modifiedDate: docs.modifiedDate,
        owner: docs.owner,
        schema: docs.schema,
      })
      .from(docs)
      .where(and(eq(docs.owner, payload.username), eq(docs.id, id)))
      .limit(1)

    return { data: results }
  }
  catch {
    throw createError({
      statusCode: 401,
    })
  }
})
