import fp from 'fastify-plugin'

import { db } from "../lib/db/index.js"

export default fp(async (fastify) => {
  fastify.decorate("db", db)
  fastify.addHook('onClose', async () => {
    db.$client.end()
  })
})
