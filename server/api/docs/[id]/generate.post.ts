import { renderToStream } from '@react-pdf/renderer'
import { and, eq } from 'drizzle-orm'
import { docs } from '~~/server/db/schema/doc'
import { createDocument } from '~~/shared/renderer'

export default defineEventHandler(async (event) => {
  try {
    const payload = await verifyToken(event)

    const id = event.context.params?.id as string

    const [results] = await db
      .select({
        schema: docs.schema,
      })
      .from(docs)
      .where(and(eq(docs.owner, payload.username), eq(docs.id, id)))
      .limit(1)

    const stream = await renderToStream(createDocument(results.schema))
    setResponseHeader(event, 'Content-Type', 'application/pdf')
    // @ts-expect-error stream is a stream
    return sendStream(event, stream)
  }
  catch {
    throw createError({
      statusCode: 401,
    })
  }
})
