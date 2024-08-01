import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import axios from 'axios'
import { z } from 'zod'

const getImageSchema = z.object({
  blobName: z.string().min(1, 'Blob name is required')
})

export async function getImage(app: FastifyInstance) {
  app.get('/wiseshop/images/*', async (request: FastifyRequest<{ Params: { '*': string } }>, reply: FastifyReply) => {
    try {
      const result = getImageSchema.safeParse({ blobName: request.params['*'] })
      if (!result.success) {
        return reply.status(400).send({ error: result.error.errors })
      }

      const accountName = app.config.AZURE_STORAGE_ACCOUNT_NAME
      const containerName = app.config.AZURE_CONTAINER
      const folderPrefix = app.config.FOLDER_DEFAULT_PREFIX

      const blobName = result.data.blobName
      const blobServiceUrl = `https://${accountName}.blob.core.windows.net`
      const blobUrl = `${blobServiceUrl}/${containerName}/${folderPrefix}${blobName}`

      const response = await axios.get(blobUrl, { responseType: 'arraybuffer' })

      reply.header('Content-Type', response.headers['content-type'])
      reply.send(response.data)
    } catch (error) {
      console.error(`Error: ${error}`)
      return reply.status(500).send({ error: 'Internal Server Error' })
    }
  })
}
