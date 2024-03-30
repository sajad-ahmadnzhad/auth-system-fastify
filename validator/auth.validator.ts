import { preValidationHookHandler } from "fastify";
import { RegisterBody } from "../interfaces/auth.interface";

export const registerValidator: preValidationHookHandler = (
  req,
  reply,
  done
) => {
  const { password, confirmPassword } = <RegisterBody>req.body;
  const { httpErrors } = req.server;
  if (password !== confirmPassword) {
    done(
     new httpErrors.BadRequest(
        "The password value is not equal to the password confirmation"
      )
    );
  }
  done();
};
