import { model } from 'mongoose'

import UserSchema from '../schemas/Users'
import SeasonSchema from '../schemas/Seasons'

export const Users = model("users", UserSchema)
export const Seasons = model("seasons", SeasonSchema)
