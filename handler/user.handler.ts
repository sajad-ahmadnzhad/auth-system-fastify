import { FastifyReply, FastifyRequest, RouteHandlerMethod } from "fastify";
import {
  ChangeRoleParams,
  UpdateBody,
  User,
} from "../interfaces/user.interface";
import userModel from "../models/user.model";
import path from "path";
import { rimrafSync } from "rimraf";

export const myAccountHandler: RouteHandlerMethod = (req, reply) => {
  const user = <User>req.user;
  reply.send(user);
};
export const updateHandler: RouteHandlerMethod = async (req, reply) => {
  const body = <UpdateBody>req.body;
  const user = <User>req.user;
  if (req.file && user.profile !== "customProfile.png") {
    rimrafSync(path.join(process.cwd(), "public", user.profile));
  }

  const profile = req.file && `/usersProfile/${req.file.filename}`;
  const hashPassword = await req.bcryptHash(body.password);
  await userModel.findByIdAndUpdate(user._id, {
    ...body,
    profile,
    password: hashPassword,
  });

  reply.send({ message: "Updated user successfully" });
};
export const deleteAccountHandler: RouteHandlerMethod = async (req, reply) => {
  const user = <User>req.user;

  const foundUser = await userModel.findById(user._id);

  if (user.profile !== "customProfile.png") {
    rimrafSync(path.join(process.cwd(), "public", user.profile));
  }

  await foundUser?.deleteOne();
  reply.clearCookie("accessToken", { path: "/" });

  reply.send({ message: "Deleted account successfully" });
};
export const changeRoleHandler = async (
  req: FastifyRequest<{ Params: ChangeRoleParams }>,
  reply: FastifyReply
) => {
  const { id } = req.params;

  const user = await userModel.findById(id);

  const newRole = await userModel.findByIdAndUpdate(
    id,
    { isAdmin: !user!.isAdmin },
    { new: true }
  );
  reply.send({
    message: `changed role to ${
      newRole!.isAdmin ? "admin" : "user"
    } successfully`,
  });
};
export const getAllHandler: RouteHandlerMethod = async (req, reply) => {
  const allUsers = await userModel.find().lean();
  reply.send(allUsers);
};
export const getAllAdminHandler: RouteHandlerMethod = async (req, reply) => {
  const allAdmins = await userModel.find({ isAdmin: true }).lean();
  reply.send(allAdmins);
};
