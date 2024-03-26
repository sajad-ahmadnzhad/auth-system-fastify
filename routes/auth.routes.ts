import {
  FastifyInstance,
  FastifyPluginOptions,
  RouteShorthandOptions,
} from "fastify";
import authHandler from "../handler/auth.handler";

const registerSchema: RouteShorthandOptions = {
  schema: {},
};

export default (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: any
) => {
  fastify.get("/register", registerSchema, authHandler);
  done();
};
