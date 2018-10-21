import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema({
  age: { type: 'String' },
  emergencySavings: { type: 'String' },
  debt: { type: 'Array' },
  retirementJob: { type: 'String' },
  retirementContribution: { type: 'String' },
  retirementInvestment: { type: 'String' },
  investment: { type: 'String' },
  Dateupdated: { type: 'Date', default: Date.now }
})

export default mongoose.model('User', userSchema)
