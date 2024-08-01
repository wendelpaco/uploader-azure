import { MultipartFile } from '@fastify/multipart'
import 'fastify'

declare module 'fastify' {
  interface FastifyRequest {
    file(): Promise<MultipartFile>
  }
}
