import { FastifyInstance } from "fastify";
import { myAccountOptions, updateOptions } from "../schema/user.schema";
import { myAccountHandler, updateHandler } from "../handler/user.handler";

export default async (fastify: FastifyInstance): Promise<void> => {
  fastify.get("/my-account", myAccountOptions, myAccountHandler);
  fastify.put("/", updateOptions, updateHandler);
};
