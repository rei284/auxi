import { authClient } from '../../../lib/auth-client.js'
import z from 'zod/v4'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

const signup: FastifyPluginAsyncZod = async (fastify, opts): Promise<void> => {
  fastify.get('/signup', {schema: {
    querystring: z.object({
      email: z.email(),
      name: z.string(),
      password: z.string()
    })
  }},
  async (request, reply) => {
    const { email, name, password } = request.query
    const user = await authClient.signUp.email({
      email, name, password
    })
    if (user.error) {
      return reply.status(500).send(user.error)
    }
    return reply.send(user.data)
  })
}

export default signup