import Fastify from "fastify";
import { config } from "dotenv";
import notFoundHandler from "./handler/notFound.handler";
import errorHandler from "./handler/error.handler";
import mainRoutes from "./routes/main.routes";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import fastifyBcrypt from "fastify-bcrypt";
import fastifyMulter from "fastify-multer";
import fastifyStatic from "@fastify/static";
config();
import "./config/db.config";
import "./interfaces/app.interface";
import path from "path";

const fastify = Fastify({ logger: true });
const PORT = Number(process.env.PORT) || 5200;

const start = async () => {
  try {
    await fastify.listen({ port: PORT });
  } catch (error) {
    fastify.log.error(error);
  }
};
fastify.register(fastifyStatic, {root: path.join(__dirname , 'public')})
fastify.register(fastifyMulter.contentParser);
fastify.register(fastifyJwt, { secret: process.env.JWT_SECRET as string });
fastify.register(fastifyCookie, { secret: process.env.COOKIE_SECRET });
fastify.register(fastifyBcrypt, { saltWorkFactor: 12 });
fastify.register(mainRoutes);
fastify.setNotFoundHandler(notFoundHandler);
fastify.setErrorHandler(errorHandler);
start();
