import { Router } from 'express'
import CpuController from '../controllers/cpus.js'

const router = Router()

router.get('/cpus', CpuController.getAll)

export default router
