import { FastifyInstance } from "fastify";
import { deleteAccountOptions, myAccountOptions, updateOptions } from "../schema/user.schema";
import { deleteAccountHandler, myAccountHandler, updateHandler } from "../handler/user.handler";

export default async (fastify: FastifyInstance): Promise<void> => {
  fastify.get("/my-account", myAccountOptions, myAccountHandler);
    fastify.put("/", updateOptions, updateHandler);
    fastify.delete('/delete-account' , deleteAccountOptions , deleteAccountHandler)
};
