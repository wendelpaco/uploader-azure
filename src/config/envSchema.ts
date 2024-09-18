// envSchema.ts
import { Type, Static } from '@sinclair/typebox'

export const envSchema = Type.Object({
  HOST: Type.String({ default: '0.0.0.0' }),
  PORT: Type.Number({ default: 3001 }),
  AZURE_STORAGE_ACCOUNT_NAME: Type.String({ default: '' }),
  AZURE_STORAGE_ACCESS_KEY: Type.String({ default: '' }),
  AZURE_CONTAINER: Type.String({ default: '' }),
  CORS_ORIGIN: Type.String({ default: '' }),
  CORS_METHODS: Type.String({ default: '' }),
  CORS_HEADERS: Type.String({ default: '' }),
  FOLDER_DEFAULT_PREFIX: Type.String({ default: '' }),
})

export type EnvSchema = Static<typeof envSchema>
