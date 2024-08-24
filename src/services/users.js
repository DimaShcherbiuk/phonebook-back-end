// import { Session } from "../db/models/Session.js";
import { User } from "../db/models/User.js";
// import { createSession } from "../utils/createSession.js";
import { env } from "../utils/env.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const findUserByEmail = (email) => User.findOne({ email });

export const updateUserWithToken = (id) => {
  const token = jwt.sign({ id }, env("JWT_SECRET"));
  return User.findByIdAndUpdate(id, { token }, { new: true });
};

export const createUser = async (userData) => {
  const hashPassword = await bcrypt.hash(userData.password, 10);

  const user = await User.create({
    ...userData,
    password: hashPassword,
  });

  return updateUserWithToken(user._id);
};

export const findUserById = async (id) => {
  return User.findById(id);
};

export const resetToken = async (id) => {
  return User.findByIdAndUpdate(id, { token: " " });
};

// export const setupSession = async (userId) => {
//   await Session.deleteOne({ userId });

//   console.log(createSession());

//   return Session.create({ userId, ...createSession() });
// };
