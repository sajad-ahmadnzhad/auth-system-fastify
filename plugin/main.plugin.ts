import { FastifyInstance, FastifyPluginOptions } from "fastify";
import httpErrorsPlugin from "./httpErrors.plugin";
import fp from "fastify-plugin";

export default fp(async (fastify: FastifyInstance) => {
  return fastify.register(httpErrorsPlugin);
});
