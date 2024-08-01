import { FastifyInstance } from 'fastify'
import { getImage } from './Upload/get-image'
import { uploadImage } from './Upload/upload-image'

export async function registerRoutes(app: FastifyInstance) {
  app.register(uploadImage)
  app.register(getImage)
}
