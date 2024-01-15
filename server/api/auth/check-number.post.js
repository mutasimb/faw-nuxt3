import { Users } from '../../utils/models'

export default defineEventHandler(async e => {
  const { phone } = await readBody(e)

  const user = await Users.findOne({ phone }).select("-password")
  if(!user) throw createError({
    status: 400,
    statusMessage: 'Phone number is not registered'
  })

  return { user }
})
