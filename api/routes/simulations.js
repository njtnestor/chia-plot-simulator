import { Router } from 'express'
import SimulationController from '../controllers/simulations.js'

const router = Router()

router.post('/simulation', SimulationController.create)
export default router
