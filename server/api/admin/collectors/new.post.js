import bcryptjs from 'bcryptjs'

import { Users } from '../../../utils/models'

export default defineEventHandler(async e => {
  const
    { tokenData } = e.context,
    { id } = tokenData,

    {
      season,
      csv,
      batch,
      password
    } = await readBody(e),

    roles = ["Super Admin", "Moderator", "User Manager"],
    passwordRegex = /^[a-z]{5}$/,
    phoneRegex = /^8801[0-9]{9}$/

  const user = await Users.findById(id).select("-password")
  if (roles.indexOf(user.role) === -1) throw createError({
    status: 401,
    statusMessage: 'User don\'t have access to create new users'
  })

  if (!passwordRegex.test(password)) throw createError({
    status: 403,
    statusMessage: 'Invalid password'
  })
  if (csv.filter(el => !phoneRegex.test(el.Phone)).length) throw createError({
    status: 403,
    statusMessage: 'Invalid phone number'
  })
  if (csv.filter(el => !el.Name).length) throw createError({
    status: 403,
    statusMessage: 'Invalid name'
  })

  try {
    const promises = csv.map(async user => {
      const
        passwordNew = password + `${ user.Phone }`.slice(`${ user.Phone }`.length - 3),
        salt = await bcryptjs.genSalt(10),
        hashedPassword = await bcryptjs.hash(passwordNew, salt)

      const doc = await Users.findOne({ phone: user.Phone })
      if (!doc) {
        const newDoc = new Users({
          name: user.Name,
          phone: user.Phone,
          role: 'Data',
          title: user.Title,
          org: user.Organization,
          adm: {
            adm1: user.Division,
            adm2: user.District,
            adm3: user.Upazila,
            adm4: user.Union
          },
          defaultSeason: season,
          editSeasons: [season],
          viewSeasons: [],
          password: hashedPassword,
          tag: [batch]
        })

        const savedUser = await newDoc.save()

        return savedUser
      } else {
        doc.name = user.Name
        doc.role = 'Data'
        doc.title = user.Title
        doc.org = user.Organization
        doc.adm = {
          adm1: user.Division,
          adm2: user.District,
          adm3: user.Upazila,
          adm4: user.Union
        }
        doc.defaultSeason = season
        if (
          doc.editSeasons.map(el => el.toString()).indexOf(season) === -1
        ) doc.editSeasons.push(season)
        doc.password = hashedPassword

        if('tag' in doc) {
          if (doc.tag.indexOf(batch) === -1) doc.tag.push(batch)
        } else {
          doc.tag = [batch]
        }

        const savedUser = await doc.save()

        return savedUser
      }
    })

    await Promise.all(promises)

    const users = await Users.find({ editSeasons: season })

    return { users }
  } catch (error) {
    throw createError({
      status: 400,
      statusMessage: 'Unknown error'
    })
  }
})
