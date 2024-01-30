import { Users } from '../../utils/models'

export default defineEventHandler(async e => {
  const
    { tokenData } = e.context,
    { id: userId } = tokenData,

    { id } = await readBody(e),

    roles = ["Super Admin", "Moderator"]

  const user = await Users.findById(userId).select("-password")
  if (roles.indexOf(user.role) === -1) throw createError({
    status: 401,
    statusMessage: 'User don\'t have access to delete admin user'
  })

  await Users.findByIdAndDelete(id);

  return {}
})
