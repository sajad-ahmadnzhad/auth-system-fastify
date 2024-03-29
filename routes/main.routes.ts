import { FastifyInstance} from "fastify";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";

export default async (fastify: FastifyInstance): Promise<void> => {
  fastify.register(authRoutes, { prefix: "v1/auth" });
  fastify.register(userRoutes, { prefix: "v1/user" });
};
