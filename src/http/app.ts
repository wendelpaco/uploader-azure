import { registerRoutes } from './routes'
import { buildServer } from './server'

async function start() {
  try {
    const app = await buildServer()
    //Registro das rotas
    await registerRoutes(app)

    const PORT = app.config.PORT || 3001
    await app.listen({ port: app.config.PORT || 3001 })
    console.log(`Server Initialized on port ${PORT}`)
  } catch (err) {
    console.error('Error starting server:', err)
    process.exit(1)
  }
}

start()
