import { preValidationAsyncHookHandler } from "fastify";
import {
  ChangeRoleParams,
  DeleteAccountBody,
  User,
} from "../interfaces/user.interface";
import { isValidObjectId } from "mongoose";
import userModel from "../models/user.model";

export const changeRoleValidator: preValidationAsyncHookHandler = async (
  req
): Promise<void> => {
  const { id } = req.params as ChangeRoleParams;
  const { httpErrors } = req.server;
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
export const deleteAccountValidator: preValidationAsyncHookHandler = async (
  req
): Promise<void> => {
  const user = <User>req.user;
  const body = <DeleteAccountBody>req.body;
  const { httpErrors } = req.server;

  if (user.isSuperAdmin) {
    throw httpErrors.BadRequest(
      "To delete your account, transfer ownership first"
    );
  }

  const foundUser = await userModel.findById(user._id);

  const comparePassword = await req.bcryptCompare(
    body.password,
    foundUser!.password
  );

  if (!comparePassword) {
    throw httpErrors.BadRequest("Password is not valid");
  }
};
