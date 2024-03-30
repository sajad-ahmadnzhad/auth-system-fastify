import { RouteShorthandOptions } from "fastify";
import authMiddleware from "../middleware/auth.middleware";
import profileUploader from "../utils/uploader/profile.uploader";
import { changeRoleValidator } from "../validator/user.validator";
import isSuperAdminMiddlewares from "../middleware/isSuperAdmin.middlewares";
import isAdminMiddleware from "../middleware/isAdmin.middleware";

export const myAccountOptions: RouteShorthandOptions = {
  preHandler: authMiddleware,
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
  preValidation: [authMiddleware, profileUploader.single("profile")],
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
  preHandler: authMiddleware,
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
  preHandler: [authMiddleware, isSuperAdminMiddlewares, changeRoleValidator],
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
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "string" },
      },
    },
  },
} as const;
export const getAllOptions: RouteShorthandOptions = {
  preHandler: [authMiddleware, isAdminMiddleware],
  schema: {
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          required: [
            "name",
            "username",
            "email",
            "isAdmin",
            "isSuperAdmin",
            "profile",
          ],
          properties: {
            name: { type: "string" },
            username: { type: "string" },
            email: { type: "string" },
            isAdmin: { type: "boolean" },
            isSuperAdmin: { type: "boolean" },
            profile: { type: "string" },
          },
        },
      },
    },
  },
};
