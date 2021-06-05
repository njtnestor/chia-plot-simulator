import CpuRepository from '../repositories/cpus.js'

export default class CpuController {
  static getAll (req, res, next) {
    return CpuRepository.find({}).then(docs => res.json(docs))
  }
}
