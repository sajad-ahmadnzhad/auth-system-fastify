import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { loginHandler, registerHandler } from "../handler/auth.handler";
import { loginOptions, registerOptions } from "../schema/auth.schema";
export default (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: any
): void => {
    fastify.post("/register", registerOptions, registerHandler);
    fastify.post('/login', loginOptions , loginHandler)
  done();
};
