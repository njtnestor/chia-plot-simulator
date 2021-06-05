import express from 'express'

// Connect Mongo
import { init } from './connection.js'

// Require API routes
import router from './routes/router.js'
const app = express()
init()

// Import API Routes
app.use(router)

if (require.main === module) {
  const port = 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}

export default app
