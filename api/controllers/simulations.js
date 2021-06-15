import Simulation from '../models/simulation.js'

export default class SimulationController {
  static create (req, res, next) {
    const simulation = new Simulation({
      cpu: 'hi',
      ramSize: 'hi',
      ramFrecuency: 'hi',
      temporalDisk: 'hi'
    })
    simulation.save()
      .then((result) => {
        res.status(201).json({
          message: 'Created simulation successfully'

        })
      })
      .catch((err) => {
        // console.log(err);
        res.status(500).json({ error: err })
      })
  }
}
