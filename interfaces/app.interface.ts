import { File } from "fastify-multer/lib/interfaces";
import httpError from "http-errors";

declare module "fastify" {
  interface FastifyRequest {
    file: File;
  }
  interface FastifyInstance{
    httpErrors: typeof httpError
  }
}
export default {}