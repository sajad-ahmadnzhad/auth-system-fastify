import { FastifyRequest } from "fastify";
import { User } from "../interfaces/user.interface";
import httpErrors from "http-errors";

export default async (req: FastifyRequest): Promise<void> => {
  const user = <User>req.user;
  if (!user.isSuperAdmin) {
    throw httpErrors.Forbidden(
      "This path is only active for the owner or super admin"
    );
  }
};
