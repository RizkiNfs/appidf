import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import z from 'zod'
import { users } from '../../db/schema/user'

export default defineEventHandler(async (event) => {
  try {
    const { username, password } = await readValidatedBody(event, z.object({
      username: z.string(),
      password: z.string(),
    }).parse)

    const [result] = await db
      .select({
        username: users.username,
        password: users.password,
      })
      .from(users)
      .where(eq(users.username, username))

    if (!await bcrypt.compare(password, result.password)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid username or password',
      })
    }

    const token = await sign({ username })

    setCookie(event, '__t', token, { maxAge: 60 * 60 * 24 * 24 }) // 24d

    return { message: 'Login successful' }
  }
  catch {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid username or password',
    })
  }
})
