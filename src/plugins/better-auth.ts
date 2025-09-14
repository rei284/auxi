import fp from 'fastify-plugin'
import betterauth, { type FastifyBetterAuthOptions, getAuthDecorator } from 'fastify-better-auth'
import { auth } from "../lib/auth.js"
import type { FastifyReply, FastifyRequest } from 'fastify'
import { fromNodeHeaders } from 'better-auth/node'

/**
 * This plugins simplifies using better-auth for fastify
 *
 * @see https://github.com/flaviodelgrosso/fastify-better-auth
 */
export default fp<FastifyBetterAuthOptions>(async (fastify) => {
  fastify.register(betterauth, { auth })
  
  fastify.decorateRequest("session")
  const authenticate = async (req: FastifyRequest, res: FastifyReply) => {
    const session = await getAuthDecorator(fastify).api.getSession({
      headers: fromNodeHeaders(req.headers)
    });

    if (!session?.user) {
      return res.unauthorized('You must be logged in to access this resource.');
    }

    req.setDecorator('session', session);
  };
  fastify.decorate("authenticate", authenticate)
})
