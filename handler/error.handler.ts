import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export default (
  error: FastifyError,
  req: FastifyRequest,
  reply: FastifyReply
): FastifyReply => {
  const message = error.message || 'Internal Server Error !!';
  const code = Number(error.code) || Number(error.statusCode) || 500
  return reply.code(code).send({ message });
};
