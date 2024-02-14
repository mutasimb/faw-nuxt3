import { Schema } from 'mongoose'

export default new Schema({
  season: { type: Schema.Types.ObjectId, ref: "seasons", required: true },
  country: { type: Schema.Types.ObjectId, ref: "countries", required: true },
  level: { type: Number, required: true },
  gid: { type: String, required: true },
  name: { type: String, required: true },
  parentId: [
    { type: Schema.Types.ObjectId, ref: "areas" }
  ],
  parentNames: [
    { type: String }
  ]
})
