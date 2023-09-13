import fs from 'node:fs'
import path from "node:path"
import { promisify } from "node:util"
import { pipeline } from 'node:stream'
import { randomUUID } from "node:crypto"

import { FastifyInstance } from "fastify";
import { fastifyMultipart } from '@fastify/multipart'

import { prisma } from '../lib/prisma'

const pump = promisify(pipeline)

export async function uploadVideosRoutes(app: FastifyInstance) {
  const size = 1_048_576 * 25 // 25 MB
  app.register(fastifyMultipart, {
    limits: {
      fileSize: size 
    }
  })

  app.post('/videos', async (request, reply) => {
    const data = await request.file()

    if (!data) {
      return reply.status(400).send({ error: 'Missing file input.' })
    }

    const extension = path.extname(data.filename)
    console.log(data.fieldname);
    

    if (extension !== '.mp3') {
      return reply.status(400).send({ error: 'Invalid input type, please upload a MP3.' })
    }

    const fileBaseName = path.basename(data.fieldname, extension)
    const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`

    const uploadDestination = path.resolve(__dirname, '../../tmp', fileUploadName)

    await pump(data.file, fs.createWriteStream(uploadDestination))

    const video = await prisma.video.create({
      data: {
        name: data.filename,
        path: uploadDestination
      }
    })
    return reply.status(200).send({
      video
    })
  })
}