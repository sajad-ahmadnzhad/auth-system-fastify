import { RouteShorthandOptions } from "fastify";
import { isAuthMiddleware } from "../middleware/auth.middleware";
import profileUploader from "../utils/uploader/profile.uploader";
import { changeRoleValidation } from "../middleware/user.middleware";
import isSuperAdminMiddlewares from "../middleware/isSuperAdmin.middlewares";

export const myAccountOptions: RouteShorthandOptions = {
  preHandler: isAuthMiddleware,
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          name: { type: "string" },
          username: { type: "string" },
          email: { type: "string" },
          profile: { type: "string" },
          isAdmin: { type: "boolean" },
          isSuperAdmin: { type: "boolean" },
        },
      },
    },
  },
} as const;
export const updateOptions: RouteShorthandOptions = {
  preValidation: [isAuthMiddleware, profileUploader.single("profile")],
  schema: {
    body: {
      type: "object",
      required: ["name", "username", "email", "password"],
      properties: {
        name: { type: "string" },
        username: { type: "string" },
        email: { type: "string" },
        password: { type: "string", minLength: 8 },
      },
    },
    response: {
      200: {
        type: "object",
        required: ["message"],
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
} as const;
export const deleteAccountOptions: RouteShorthandOptions = {
  preHandler: isAuthMiddleware,
  schema: {
    body: {
      type: "object",
      required: ["password"],
      properties: {
        password: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        required: ["message"],
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
} as const;
export const changeRoleOptions: RouteShorthandOptions = {
  preHandler: [isAuthMiddleware , isSuperAdminMiddlewares , changeRoleValidation],
  schema: {
    response: {
      200: {
        type: "object",
        required: ["message"],
        properties: {
          message: { type: "string" },
        },
      },
    },
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: {type: 'string'}
      }
    }
  },
} as const;
