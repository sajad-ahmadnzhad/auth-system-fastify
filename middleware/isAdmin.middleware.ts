import { FastifyRequest } from "fastify";
import { User } from "../interfaces/user.interface";

export default async (req: FastifyRequest): Promise<void> => {
  const user = <User>req.user;
  const { httpErrors } = req.server;
  if (!user.isAdmin) {
    throw httpErrors.Forbidden("This path is only for admins");
  }
};
