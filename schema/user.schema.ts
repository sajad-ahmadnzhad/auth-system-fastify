import { RouteShorthandOptions } from "fastify";
import { isAuth } from "../middleware/auth.middleware";

export const myAccountOptions: RouteShorthandOptions = {
    preHandler: isAuth,
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    name: {type: "string"},
                    username: {type: "string"},
                    email: {type: "string"},
                    profile: {type: "string"},
                    isAdmin: {type: 'boolean'},
                    isSuperAdmin: {type: 'boolean'},
                }
            }
        }
    }
} as const