import { FastifyReply, FastifyRequest } from "fastify";
import { ChangeRoleParams } from "../interfaces/user.interface";
import { isValidObjectId } from "mongoose";
import httpErrors from "http-errors";
import userModel from "../models/user.model";

export const changeRoleValidator: any = async (
  req: FastifyRequest<{ Params: ChangeRoleParams }>,
  reply: FastifyReply
): Promise<void> => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw httpErrors.BadRequest("This user id is not from mongodb");
  }

  const user = await userModel.findById(id).lean();

  if (user?.isSuperAdmin) {
    throw httpErrors.Forbidden("You cannot change the super admin role");
  }

  if (!user) {
    throw httpErrors.NotFound("User not found");
  }
};
