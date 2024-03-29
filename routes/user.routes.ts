import { FastifyInstance } from "fastify";
import { myAccountOptions } from "../schema/user.schema";
import { myAccountHandler } from "../handler/user.handler";

export default async (fastify: FastifyInstance): Promise<void> => {
  fastify.get("/my-account", myAccountOptions, myAccountHandler);
};
