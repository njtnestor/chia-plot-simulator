import mongoose from 'mongoose'

const Schema = mongoose.Schema

const SimulationSchema = new Schema({
  cpu: String,
  ramSize: String,
  ramFrecuency: String,
  temporalDisk: String
}, { versionKey: false })
const Simulation = mongoose.models.Simulation || mongoose.model('Simulation', SimulationSchema)
export default Simulation
