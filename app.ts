import Fastify from "fastify";
import { config } from "dotenv";
config();

const app = Fastify({ logger: true });
const PORT = Number(process.env.PORT) || 5200;
const start = async () => {
  try {
    await app.listen({ port: PORT });
  } catch (error) {
    app.log.error(error);
  }
};


start()