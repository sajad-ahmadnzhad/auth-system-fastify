import { RouteShorthandOptions } from "fastify";
import { isAuth, registerPerValidation } from "../middleware/auth.middleware";
import profileUploader from "../utils/uploader/profile.uploader";
export const registerOptions: RouteShorthandOptions = {
  preValidation: [profileUploader.single("profile"), registerPerValidation],
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
