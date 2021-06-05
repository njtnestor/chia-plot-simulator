import mongoose from 'mongoose'

const Schema = mongoose.Schema

const CpuSchema = new Schema({
  name: String
})
const Cpu = mongoose.models.Cpu || mongoose.model('Cpu', CpuSchema)
export default Cpu
