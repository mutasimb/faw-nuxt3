import { Scoutings } from '../utils/models'

export default defineEventHandler(async e => {
  const
    { tokenData } = e.context,
    { id: userId } = tokenData,

    { season } = getQuery(e),

    roles = ["Super Admin", "Moderator", "User Manager", "Data Viewer"],

    user = await Users.findById(userId).select("-password")

  if(!user) throw createError({
    status: 400,
    statusMessage: 'User account couldn\'t be found'
  })
  if (roles.indexOf(user.role) === -1) throw createError({
    status: 401,
    statusMessage: 'User don\'t have access to field data'
  })

  const scoutings = await Scoutings
    .find({ season })
    .populate([
      { path: "user", select: "-password" },
      { path: "adm1" },
      { path: "adm2" },
      { path: "adm3" },
      { path: "adm4" }
    ])
    .sort({ submissionTime: -1 })

  return { scoutings }
})
