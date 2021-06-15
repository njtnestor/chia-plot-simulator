import CpuRepository from '../repositories/cpus.js'
import Cpu from '../models/cpus.js'

export default class CpuController {
  static getAll (req, res, next) {
    if (req.query.brand) {
      const brand = req.query.brand
      return CpuRepository.find({ brand }).then(docs => res.json(docs))
    }
    return CpuRepository.find({}).then(docs => res.json(docs))
  }

  static create (req, res, next) {
    const cpu = new Cpu({ brand: 'hi', model: 'hi' })
    cpu.save()
      .then((result) => {
        res.status(201).json({
          message: 'Created cpu successfully'

        })
      })
      .catch((err) => {
        // console.log(err);
        res.status(500).json({ error: err })
      })
  }
}
