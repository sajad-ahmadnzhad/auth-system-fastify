import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { registerHandler } from "../handler/auth.handler";
import { registerOptions } from "../schema/auth.schema";
export default (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: any
): void => {
  fastify.post("/register", registerOptions , registerHandler);
  done();
};
