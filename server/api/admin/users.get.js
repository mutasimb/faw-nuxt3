import { Users } from '../../utils/models'

export default defineEventHandler(async e => {
  const
    { tokenData } = e.context,
    { id } = tokenData,

    roles = ["Super Admin", "Moderator", "User Manager"],

    userReq = await Users.findById(id).select("-password")
  if(!userReq) throw createError({
    status: 400,
    statusMessage: 'User account couldn\'t be found'
  })
  if (roles.indexOf(userReq.role) === -1) throw createError({
    status: 401,
    statusMessage: 'User don\'t have access to admin data'
  })
  
  const admins = await Users.find({ role: { $in: roles } }).select("-password");

  return { admins }
})
