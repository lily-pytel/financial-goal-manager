import mongoose from 'mongoose'
const Schema = mongoose.Schema

const goalSchema = new Schema({
  name: { type: 'String', required: true },
  type: { type: 'String', required: true },
  description: { type: 'String', required: false },
  years: { type: 'Array', required: true },
  progress: { type: 'Array', required: false }
})

export default mongoose.model('Goal', goalSchema)
