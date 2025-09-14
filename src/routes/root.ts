import type { FastifyPluginAsync } from 'fastify'
import type { AsyncFunction } from 'fastify/types/instance.js'

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', {preHandler: fastify.getDecorator<AsyncFunction>("authenticate")}, async (request, reply) => ({ root: true }))
}

export default root