import fp from 'fastify-plugin'
import cors, {type FastifyCorsOptions} from "@fastify/cors"
import { env } from "../utils/env.js"

/**
 * This plugins enables CORS
 *
 * @see https://github.com/fastify/fastify-cors
 */
export default fp<FastifyCorsOptions>(async (fastify) => {
  fastify.register(cors, {
    origin: env.URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With"
    ],
    credentials: true,
    maxAge: 86400
  })
})
