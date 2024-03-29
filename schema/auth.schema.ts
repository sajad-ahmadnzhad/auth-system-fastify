import { RouteShorthandOptions } from "fastify";
import { isAuthMiddleware } from "../middleware/auth.middleware";
import {registerValidator} from '../validator/auth.validator'
import profileUploader from "../utils/uploader/profile.uploader";
export const registerOptions: RouteShorthandOptions = {
  preValidation: [profileUploader.single("profile"), registerValidator],
  schema: {
    body: {
      type: "object",
      required: ["name", "username", "email", "password", "confirmPassword"],
      properties: {
        name: { type: "string" },
        username: { type: "string" },
        email: { type: "string" },
        password: { type: "string", minLength: 8, $id: "passwordId" },
        confirmPassword: { $ref: "passwordId" },
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
} as const;
export const loginOptions: RouteShorthandOptions = {
  schema: {
    body: {
      type: "object",
      required: ["identifier", "password"],
      properties: {
        identifier: { type: "string" },
        password: { type: "string" },
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
} as const;
export const logoutOptions: RouteShorthandOptions = {
  preHandler: isAuthMiddleware,
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
} as const;
