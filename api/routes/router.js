import { Router } from 'express'
import cpus from './cpus.js'

const router = Router()

router.use(cpus)

export default router
