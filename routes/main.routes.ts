import { FastifyInstance, FastifyPluginOptions } from "fastify";
import authRoutes from "./auth.routes";

export default (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: any
): void => {
  fastify.register(authRoutes, { prefix: "v1/auth" });
  done();
};
