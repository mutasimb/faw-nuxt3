import { model } from 'mongoose'

import UserSchema from '../schemas/Users'

export const Users = model("users", UserSchema)
