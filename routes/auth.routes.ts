import { FastifyInstance } from "fastify";
import {
  loginHandler,
  logoutHandler,
  registerHandler,
} from "../handler/auth.handler";
import {
  loginOptions,
  logoutOptions,
  registerOptions,
} from "../schema/auth.schema";
export default async (fastify: FastifyInstance): Promise<void> => {
  fastify.post("/register", registerOptions, registerHandler);
  fastify.post("/login", loginOptions, loginHandler);
  fastify.post("/logout", logoutOptions, logoutHandler);
};
