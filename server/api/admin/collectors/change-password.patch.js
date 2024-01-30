import { Users } from '../../../utils/models'
import generatePassword from '../../../utils/generatePassword'

export default defineEventHandler(async e => {
  const
    { tokenData } = e.context,
    { id: userId } = tokenData,

    { id } = await readBody(e),

    roles = ["Super Admin", "Moderator", "User Manager"]

  const user = await Users.findById(userId).select("-password")
  if (roles.indexOf(user.role) === -1) throw createError({
    status: 401,
    statusMessage: 'User don\'t have access to change password'
  })

  const
    targetUser = await Users.findById(id),
    { password, hashedPassword } = await generatePassword(targetUser.phone)

  targetUser.password = hashedPassword
  await targetUser.save()

  return { savedpassword: password }
})
