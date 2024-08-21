import { eq } from 'drizzle-orm'
import { docs } from '../../db/schema/doc'

export default defineEventHandler(async (event) => {
  try {
    const payload = await verifyToken(event)

    const results = await db
      .select({
        id: docs.id,
        title: docs.title,
        createdDate: docs.createdDate,
        modifiedDate: docs.modifiedDate,
        owner: docs.owner,
      })
      .from(docs)
      .where(eq(docs.owner, payload.username))

    return { data: results }
  }
  catch {
    throw createError({
      statusCode: 401,
    })
  }
})
