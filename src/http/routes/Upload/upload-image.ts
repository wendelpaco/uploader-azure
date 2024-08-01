import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob'
import { v4 as uuidv4 } from 'uuid'

interface UploadQuery {
  blobName?: string
}

export async function uploadImage(app: FastifyInstance) {
  app.post('/upload-image', async (request: FastifyRequest<{ Querystring: UploadQuery }>, reply: FastifyReply) => {
    try {
      const data = await request.file()

      if (!data) {
        return reply.status(400).send({ error: 'No file uploaded' })
      }

      const uploadImagemBody = z.object({
        blobName: z.string().optional(),
      })

      const formBody = await uploadImagemBody.parseAsync({
        blobName: request.query.blobName,
      })

      const { blobName } = formBody
      const defaultPrefix = app.config.FOLDER_DEFAULT_PREFIX

      let blobNameToUpload = blobName
        ? blobName.replace(/^wiseshop_images_/, '')
        : `${defaultPrefix}${uuidv4()}${data.filename.slice(data.filename.lastIndexOf('.'))}`

      if (!blobNameToUpload.startsWith(defaultPrefix)) {
        blobNameToUpload = `${defaultPrefix}${blobNameToUpload}`
      }

      const accountName = app.config.AZURE_STORAGE_ACCOUNT_NAME
      const accountKey = app.config.AZURE_STORAGE_ACCESS_KEY
      const containerName = app.config.AZURE_CONTAINER
      const blobServiceUrl = `https://${accountName}.blob.core.windows.net`

      const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey)
      const blobServiceClient = new BlobServiceClient(blobServiceUrl, sharedKeyCredential)
      const containerClient = blobServiceClient.getContainerClient(containerName)

      const blockBlobClient = containerClient.getBlockBlobClient(blobNameToUpload)
      const uploadBlobResponse = await blockBlobClient.uploadStream(data.file, undefined, undefined, {
        blobHTTPHeaders: {
          blobContentType: data.mimetype,
        },
      })

      return reply.send({
        url: `${request.protocol}://${request.headers.host}/${blobNameToUpload}`,
        urlAzure: blockBlobClient.url,
        createdAt: uploadBlobResponse.date
      })

    } catch (error) {
      console.error(`Error: ${error}`)
      return reply.status(500).send({ error: 'Internal Server Error' })
    }
  })
}
