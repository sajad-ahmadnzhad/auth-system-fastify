import { FastifyReply, FastifyRequest, RouteHandlerMethod } from "fastify";
import { LoginBody, RegisterBody } from "../interfaces/auth.interface";
import userModel from "../models/user.model";
import httpErrors from "http-errors";
export const registerHandler: RouteHandlerMethod = async (
  req,
  reply
): Promise<void> => {
  const body = <RegisterBody>req.body;

  const existingUser = await userModel.findOne({
    $or: [{ username: body.username }, { email: body.email }],
  });

  if (existingUser) {
    throw httpErrors.Conflict(
      "User with this username or email already exists"
    );
  }

  const profile = req.file
    ? `/public/usersProfile/${req.file.filename}`
    : "/public/usersProfile/customProfile.png";

  const hashPassword = await req.bcryptHash(body.password);
  const countUsers = await userModel.countDocuments();
  const user = await userModel.create({
    ...body,
    password: hashPassword,
    profile,
    isAdmin: countUsers === 0,
    isSuperAdmin: countUsers === 0,
  });

  const accessToken = req.server.jwt.sign({ id: user._id });
  const twoMonths = 60 * 60 * 24 * 60 * 1000;
  reply.setCookie("accessToken", accessToken, {
    secure: true,
    httpOnly: true,
    signed: true,
    maxAge: twoMonths,
  });

  reply.code(201).send({ message: "Registered was successful" });
};
export const loginHandler: RouteHandlerMethod = async (req, reply) => {
  const { identifier, password } = <LoginBody>req.body;
  const user = await userModel.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  });

  if (!user) {
    throw httpErrors.NotFound("User not found");
  }

  const comparePassword = req.server.bcrypt.compare(password, user.password);

  if (!comparePassword) {
    throw httpErrors.BadRequest("password is not valid");
  }

  const accessToken = req.server.jwt.sign(
    { id: user._id },
    { expiresIn: "30d" }
  );

  const twoMonths = 60 * 60 * 24 * 60 * 1000;
  reply.setCookie("accessToken", accessToken, {
    secure: true,
    httpOnly: true,
    signed: true,
    maxAge: twoMonths,
  });

  reply.send({ message: "your logged in successful" });
};
