import type { H3Event } from 'h3'
import * as jose from 'jose'
import type { KeyLike } from 'jose'

const alg = 'RS256'

let privateKey: KeyLike

interface Payload {
  username: string
}

const issuer = 'urn:appidf:issuer'
const audience = 'urn:appidf:audience'

export async function sign(payload: Payload) {
  if (!privateKey) {
    const config = useRuntimeConfig()
    privateKey = await jose.importPKCS8(config.JWT_PRIVATE_KEY, alg)
  }

  return new jose.SignJWT({ 'urn:appidf:claim': true, ...payload })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime('24d')
    .sign(privateKey)
}

let publicKey: KeyLike

export async function verify(jwt: string) {
  if (!publicKey) {
    const config = useRuntimeConfig()
    publicKey = await jose.importSPKI(config.JWT_PUBLIC_KEY, alg)
  }

  return jose.jwtVerify<jose.JWTPayload & Payload>(jwt, publicKey, {
    issuer,
    audience,
  })
}

export async function verifyToken(event: H3Event) {
  const token = getCookie(event, '__t')

  if (!token) {
    throw createError({ statusCode: 401 })
  }

  try {
    const { payload } = await verify(token)
    return payload
  }
  catch {
    throw createError({ statusCode: 401 })
  }
}
