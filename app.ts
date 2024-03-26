import Fastify from "fastify";
import { config } from "dotenv";
import notFoundHandler from "./handler/notFound.handler";
import errorHandler from "./handler/error.handler";
import mainRoutes from "./routes/main.routes";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import fastifyBcrypt from "fastify-bcrypt";
config();
import "./config/db.config";

export const fastify = Fastify({ logger: true });
const PORT = Number(process.env.PORT) || 5200;

const start = async () => {
  try {
    await fastify.listen({ port: PORT });
  } catch (error) {
    fastify.log.error(error);
  }
};
fastify.register(fastifyJwt, { secret: process.env.JWT_SECRET as string });
fastify.register(fastifyCookie, { secret: process.env.COOKIE_SECRET });
fastify.register(mainRoutes);
fastify.setNotFoundHandler(notFoundHandler);
fastify.setErrorHandler(errorHandler);
start();
