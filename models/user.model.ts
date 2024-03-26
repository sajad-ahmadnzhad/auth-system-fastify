import { Schema, model } from "mongoose";
import { UserModel } from "../interfaces/user.interface";

const userSchema = new Schema<UserModel>({
  name: { type: String, trim: true, required: true },
  username: { type: String, trim: true, lowercase: true, required: true },
  email: { type: String, trim: true, lowercase: true, required: true },
  password: { type: String, trim: true, lowercase: true, required: true },
});

export default model<UserModel>('user' , userSchema)