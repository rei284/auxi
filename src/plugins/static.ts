import fp from 'fastify-plugin'
import staticPlugin, {type FastifyStaticOptions} from "@fastify/static"
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * This plugins enables CORS
 *
 * @see https://github.com/fastify/fastify-cors
 */
export default fp<FastifyStaticOptions>(async (fastify) => {
  fastify.register(staticPlugin, {
    root: path.join(path.dirname(fileURLToPath(import.meta.url)), '../public'),
  })
})
