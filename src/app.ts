import * as path from 'node:path'
import AutoLoad from '@fastify/autoload'
import type { FastifyPluginAsync } from 'fastify'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app: FastifyPluginAsync = async (
  fastify,
): Promise<void> => {
  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    forceESM: true
  })

  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    forceESM: true
  })
}

export default app
export { app }
