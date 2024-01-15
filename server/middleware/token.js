import jwt from 'jsonwebtoken'

export default defineEventHandler(async e => {
  const
    { token } = parseCookies(e),
    { secretJWT } = useRuntimeConfig()
    
  try {
    e.context.tokenData = await jwt.verify(token, secretJWT)
  } catch (error) {
    e.context.tokenData = null
  }
})
