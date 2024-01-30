import { Users } from '../../utils/models'
import { Seasons } from '../../utils/models'
import generatePassword from '../../utils/generatePassword'

export default defineEventHandler(async e => {
  const
    { tokenData } = e.context,
    { id } = tokenData,

    {
      name,
      role,
      title,
      org,
      phone
    } = await readBody(e),

    roles = ["Super Admin", "Moderator"],
    phoneRegex = /^8801[0-9]{9}$/

  const user = await Users.findById(id).select("-password");
  if (roles.indexOf(user.role) === -1) throw createError({
    status: 401,
    statusMessage: 'User don\'t have access to create new admin'
  })

  if(!phoneRegex.test(phone)) throw createError({
    status: 403,
    statusMessage: 'Invalid phone number'
  })

  const
    { password, hashedPassword } = await generatePassword(phone),
    defaultSeason = await Seasons.findOne({ default: true }),

    newUser = new Users({
      name,
      role,
      title,
      org,
      phone,
      defaultSeason,
      viewSeasons: [],
      editSeasons: [],
      password: hashedPassword
    }),

    savedUser = await newUser.save()

  return { savedUser, password }
})
