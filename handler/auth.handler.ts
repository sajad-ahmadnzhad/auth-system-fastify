import { FastifyReply, FastifyRequest } from "fastify";

export let register = (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  reply.send({ message: "hello"  });
};