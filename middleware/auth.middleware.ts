import { FastifyReply, FastifyRequest } from "fastify";
import { JWTPayload } from "../interfaces/auth.interface";
import userModel from "../models/user.model";
export default async (req: FastifyRequest): Promise<void> => {
  const token = req.cookies.accessToken;
  const { httpErrors } = req.server;
  if (!token) {
    throw httpErrors.Forbidden(
      "This path is protected. To access it, you must log in first"
    );
  }

  const verifyToken = <JWTPayload>req.server.jwt.verify(token);

  const user = await userModel.findById(verifyToken.id).select("-password");

  if (!user) {
    throw httpErrors.BadRequest("User not found");
  }

  req.user = user;
};
