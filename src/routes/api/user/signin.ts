import { authClient } from '../../../lib/auth-client.js'
import z from 'zod/v4'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

const signin: FastifyPluginAsyncZod = async (fastify, opts): Promise<void> => {
  fastify.get('/signin', {schema: {
    querystring: z.object({
      email: z.email(),
      password: z.string()
    })
  }} , async (request, reply) => {
    const session = await authClient.signIn.email({
      email: request.query.email,
      password: request.query.password,
    })
    if (session.error) {
      return reply.status(500).send(session.error)
    }
    reply.redirect('/')
  })
}

export default signin