import {
  FastifyInstance,
  FastifyPluginOptions,
  RouteShorthandOptions,
} from "fastify";
import {register} from "../handler/auth.handler";

const registerSchema: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
        required: ["message"],
      },
    },
  },
};

export default (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: any
) => {
  fastify.get("/register", registerSchema, register);
  done();
};
