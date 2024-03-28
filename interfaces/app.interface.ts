import { File } from "fastify-multer/lib/interfaces";

declare module "fastify" {
  interface FastifyRequest {
    file: File;
  }
}
export default {}