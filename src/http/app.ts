import { registerRoutes } from './routes'
import { buildServer } from './server'

async function start() {
  try {
    const app = await buildServer()
    //Registro das rotas
    await registerRoutes(app)

    const PORT = app.config.PORT
    const HOST = app.config.HOST

    await app.listen({ host: HOST, port: PORT })
    console.log(`Server Initialized on port ${PORT}`)
  } catch (err) {
    console.error('Error starting server:', err)
    process.exit(1)
  }
}

start()
