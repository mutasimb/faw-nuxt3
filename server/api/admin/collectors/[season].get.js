import { Users } from '../../../utils/models'

export default defineEventHandler(async e => {
  const
    { tokenData } = e.context,
    { id: userId } = tokenData,

    season = getRouterParam(e, 'season'),

    roles = ["Super Admin", "Moderator", "User Manager"],

    user = await Users.findById(userId).select("-password")

  if(!user) throw createError({
    status: 400,
    statusMessage: 'User account couldn\'t be found'
  })
  if (roles.indexOf(user.role) === -1) throw createError({
    status: 401,
    statusMessage: 'User don\'t have access to collector data'
  })
  
  const targetUsers = await Users.find({ editSeasons: season, test: { $ne: true } }).select("-password")

  return { users: targetUsers }
})
