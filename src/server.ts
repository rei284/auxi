import Fastify from "fastify";
import { env } from "./utils/env.js";
import app from "./app.js";
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod'

const fastify = Fastify({
	logger: true,
}).withTypeProvider<ZodTypeProvider>();

fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

fastify.register(app);

fastify.listen({ host: env.HOST, port: env.PORT }, (err) => {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
});
