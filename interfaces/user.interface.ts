import { ObjectId } from "mongoose";

export interface UserModel {
  name: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  profile: string;
}
export interface UpdateBody {
  name: string;
  username: string;
  email: string;
  password: string;
}
export interface User extends Omit<UserModel, "password"> {
  _id: ObjectId;
}
