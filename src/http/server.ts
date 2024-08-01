import fastify from 'fastify'
import fastifyEnv from '@fastify/env'
import fastifyMultipart from '@fastify/multipart'
import { envSchema } from '../config/envSchema'
import cors from '@fastify/cors'

export async function buildServer() {
  const app = fastify({
    logger: true
  })

  const envOptions = {
    confKey: 'config',
    schema: envSchema,
    dotenv: true,
  }

  try {
    await app.register(cors, {})
    await app.register(fastifyEnv, envOptions)
    await app.register(fastifyMultipart)
    // console.log('Environment variables loaded:', app.config)
    return app
  } catch (err) {
    console.error('Error configuring server:', err)
    throw err
  }
}
