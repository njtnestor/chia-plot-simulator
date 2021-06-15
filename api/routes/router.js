import { Router } from 'express'
import cpus from './cpus.js'
import simulations from './simulations.js'

const router = Router()

router.use(cpus)
router.use(simulations)

export default router
