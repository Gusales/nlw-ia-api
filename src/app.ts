import fastify from 'fastify'
import { fastifyCors } from '@fastify/cors'

import { getAllPrompts } from './routes/get-all-prompts'
import { uploadVideosRoutes } from './routes/upload-videos'
import { createTranscriptionRoutes } from './routes/create-transcription'
import { generateAiCompletionRoute } from './routes/generate-ai-completion'
import { env } from './env'

export const app = fastify()

app.register(getAllPrompts)
app.register(uploadVideosRoutes)
app.register(createTranscriptionRoutes)
app.register(generateAiCompletionRoute)

app.register(fastifyCors, {
  origin: [
    env.NODE_ENV === 'dev' ? 'http://localhost:5173' : '', // PRODUCTION URL HERE
  ],
})
