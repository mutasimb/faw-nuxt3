import { Seasons } from '../utils/models'
import { Users } from '../utils/models'

export default defineEventHandler(async e => {
  const
    { tokenData } = e.context,
    { id } = tokenData

  if(!id) throw createError({
    status: 400,
    statusMessage: 'Invalid token'
  })

  const user = await Users.findById(id).select("-password")
  if(!user) throw createError({
    status: 400,
    statusMessage: 'User account couldn\'t be found'
  })

  const seasons = await Seasons.find()
  return { seasons }
})
