import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { loginHandler, logoutHandler, registerHandler } from "../handler/auth.handler";
import { loginOptions, logoutOptions, registerOptions } from "../schema/auth.schema";
export default (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: any
): void => {
    fastify.post("/register", registerOptions, registerHandler);
    fastify.post('/login', loginOptions , loginHandler)
    fastify.post('/logout', logoutOptions , logoutHandler)
  done();
};
