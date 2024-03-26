import Fastify from "fastify";
import { config } from "dotenv";
import notFoundHandler from "./handler/notFound.handler";
import errorHandler from "./handler/error.handler";
config();

export const fastify = Fastify({ logger: true });
const PORT = Number(process.env.PORT) || 5200;
const start = async () => {
  try {
      await fastify.listen({ port: PORT });
  } catch (error) {
    fastify.log.error(error);
  }
};

fastify.get('/', (req , reply) => {
    throw new Error('sajad')
})

fastify.setNotFoundHandler(notFoundHandler)
fastify.setErrorHandler(errorHandler)
start()