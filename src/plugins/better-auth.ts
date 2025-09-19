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
  fastify.decorateRequest("user")


  const authenticate = async (req: FastifyRequest, res: FastifyReply) => {
    const session = await getAuthDecorator(fastify).api.getSession({
      headers: fromNodeHeaders(req.headers)
    });

    fastify.log.error(JSON.stringify(fromNodeHeaders(req.headers)))

    if (!session?.user) {
      return res.unauthorized('You must be logged in to access this resource.');
    }

    req.setDecorator('session', session);
    req.setDecorator('user', session.user);
  };
  fastify.decorate("authenticate", authenticate)
})

/* import type { BetterAuthOptions, betterAuth } from 'better-auth';
import { toNodeHandler } from 'better-auth/node';
import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { auth } from "../lib/auth.js"

import type { FastifyReply } from 'fastify';

type HttpHeaders = Partial<ReturnType<FastifyReply['getHeaders']>>;

export function mapHeaders(fastifyHeaders: HttpHeaders) {
  const headers = new Headers();
  Object.entries(fastifyHeaders).forEach(([key, value]) => {
    if (value) headers.append(key, value.toString());
  });

  return headers;
}

const kAuth = Symbol('betterAuth');

type BetterAuthInstance<AuthOptions extends BetterAuthOptions> = ReturnType<
  typeof betterAuth<AuthOptions>
>;

export type FastifyBetterAuthOptions<AuthOptions extends BetterAuthOptions = BetterAuthOptions> = {
  auth: BetterAuthInstance<AuthOptions>;
};

export function getAuthDecorator<AuthOptions extends BetterAuthOptions = BetterAuthOptions>(
  fastify: FastifyInstance,
): BetterAuthInstance<AuthOptions> {
  return fastify.getDecorator(kAuth);
}

async function fastifyBetterAuth(fastify: FastifyInstance, options: FastifyBetterAuthOptions) {
  fastify.decorate(kAuth, auth);

  await fastify.register((fastify) => {
    const authHandler = toNodeHandler(auth);

    fastify.addContentTypeParser(
      'application/json',
      (_request, _payload, done) => {
        done(null, null);
      },
    );

    const authBasePath = options.auth.options.basePath ?? '/api/auth';

    fastify.all(`${authBasePath}/*`, async (request, reply) => {
      const headers = reply.getHeaders()
      console.log(headers)
      console.log(mapHeaders(headers))
      reply.raw.setHeaders(mapHeaders(headers));
      await authHandler(request.raw, reply.raw);
    });
  });
}

export default fp(fastifyBetterAuth, {
  fastify: '5.x',
  name: 'fastify-better-auth',
}); */