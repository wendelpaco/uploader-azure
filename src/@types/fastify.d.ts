import 'fastify'

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      UPLOAD_SERVICE_URL: string
      PORT: number
      AZURE_STORAGE_ACCOUNT_NAME: string
      AZURE_STORAGE_ACCESS_KEY: string
      AZURE_CONTAINER: string
      CORS_ORIGIN: string
      CORS_METHODS: string
      CORS_HEADERS: string
      FOLDER_DEFAULT_PREFIX: string
    }
  }
}
