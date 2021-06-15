import mongoose from 'mongoose'

const Schema = mongoose.Schema

const CpuSchema = new Schema({
  brand: String,
  model: String
}, { versionKey: false })
const Cpu = mongoose.models.Cpu || mongoose.model('Cpu', CpuSchema)
export default Cpu
