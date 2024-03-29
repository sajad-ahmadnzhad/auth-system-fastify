import { RouteHandlerMethod } from "fastify";
import { UpdateBody, User } from "../interfaces/user.interface";
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
