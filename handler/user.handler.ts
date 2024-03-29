import { RouteHandlerMethod } from "fastify";

export const myAccountHandler: RouteHandlerMethod = (req , reply) => {
    const { user } = req
    reply.send(user)
}