import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { Users } from '../../utils/models'

export default defineEventHandler(async e => {
  const
    { phone, password } = await readBody(e),
    { secretJWT } = useRuntimeConfig()

  const user = await Users.findOne({ phone })
  if(!user) throw createError({
    status: 400,
    statusMessage: 'Phone number is not registered'
  })

  const isMatch = await bcryptjs.compare(password, user.password)
  if(!isMatch) throw createError({
    status: 400,
    statusMessage: 'Incorrect password'
  })

  const
    payload = { id: user._doc._id.toString() },
    token = await jwt.sign(payload, secretJWT, { expiresIn: '14 days' })

  return { token }
})
