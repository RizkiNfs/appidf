import { nanoid } from 'nanoid'
import { docs } from '../../db/schema/doc'

export default defineEventHandler(async (event) => {
  try {
    const payload = await verifyToken(event)

    const id = nanoid()
    await db
      .insert(docs)
      .values({
        id,
        title: 'untitled document',
        owner: payload.username,
        schema: { nodes: '' },
      })

    return { id }
  }
  catch {
    throw createError({
      statusCode: 401,
    })
  }
})
