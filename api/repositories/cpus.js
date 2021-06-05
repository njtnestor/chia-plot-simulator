import Cpus from '../models/cpus.js'

export default class CpuRepository {
  static find (options) {
    return Cpus.find(options)
  }
}
