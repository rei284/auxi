import type { FastifyPluginAsync } from 'fastify'

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async (_request, reply) => reply.sendFile('index.html'))
}

export default root