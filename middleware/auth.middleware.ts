import { preValidationHookHandler } from "fastify";
import { RegisterBody } from "../interfaces/auth.interface";
import httpErrors from "http-errors";

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

export const isAuth: preValidationHookHandler = (req, reply, done) => {
  console.log()
  done();
};
