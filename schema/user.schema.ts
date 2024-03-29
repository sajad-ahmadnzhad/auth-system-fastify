import { RouteShorthandOptions } from "fastify";
import { isAuth } from "../middleware/auth.middleware";
import profileUploader from "../utils/uploader/profile.uploader";

export const myAccountOptions: RouteShorthandOptions = {
  preHandler: isAuth,
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
  preValidation: [isAuth, profileUploader.single("profile")],
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
  preHandler: isAuth ,
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
