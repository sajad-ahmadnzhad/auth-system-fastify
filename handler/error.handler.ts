import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import fs from "fs";
export default (
  error: FastifyError,
  req: FastifyRequest,
  reply: FastifyReply
): FastifyReply => {
  if (req.file && req.file.path) {
    fs.unlinkSync(req.file.path);
  }

  const message = error.message || "Internal Server Error !!";
  const code = Number(error.code) || Number(error.statusCode) || 500;
  return reply.code(code).send({ message });
};
