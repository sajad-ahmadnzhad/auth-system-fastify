import { preHandlerAsyncHookHandler, preValidationHookHandler } from "fastify";
import { JWTPayload, RegisterBody } from "../interfaces/auth.interface";
import httpErrors from "http-errors";
import userModel from "../models/user.model";
export const registerPerValidation: preValidationHookHandler = (
  req,
  reply,
  done
) => {
  const { password, confirmPassword } = <RegisterBody>req.body;

  if (password !== confirmPassword) {
    done(
      new httpErrors.BadRequest(
        "The password value is not equal to the password confirmation"
      )
    );
  }
  done();
};
export const isAuthMiddleware: preHandlerAsyncHookHandler = async (req, reply) => {
  const token = req.cookies.accessToken;
  if (!token) {
    throw httpErrors.Forbidden(
      "This path is protected. To access it, you must log in first"
    );
  }

  const verifyToken = <JWTPayload>req.server.jwt.verify(token);

  const user = await userModel.findById(verifyToken.id).select("-password");

  if (!user) {
    throw httpErrors.BadRequest("User not found");
  }

  req.user = user;
};
