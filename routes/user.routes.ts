import { FastifyInstance } from "fastify";
import { deleteAccountOptions, myAccountOptions, updateOptions, changeRoleOptions, getAllOptions } from '../schema/user.schema';
import { changeRoleHandler, deleteAccountHandler, getAllHandler, myAccountHandler, updateHandler } from "../handler/user.handler";
import { ChangeRoleParams } from "../interfaces/user.interface";

export default async (fastify: FastifyInstance): Promise<void> => {
    fastify.get("/my-account", myAccountOptions, myAccountHandler);
    fastify.put("/", updateOptions, updateHandler);
    fastify.delete('/delete-account' , deleteAccountOptions , deleteAccountHandler)
    fastify.put<{Params: ChangeRoleParams}>('/change-role/:id' , changeRoleOptions , changeRoleHandler)
    fastify.get('/' , getAllOptions , getAllHandler)
};
