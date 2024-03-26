import { FastifyReply, FastifyRequest } from "fastify";

export default (req: FastifyRequest, reply: FastifyReply): FastifyReply => {
  return reply.code(404).send({ message: "Page not found !!" });
};
