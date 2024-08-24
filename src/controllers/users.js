import createHttpError from "http-errors";
import {
  findUserByEmail,
  createUser,
  updateUserWithToken,
  resetToken,
} from "../services/users.js";
import bcrypt from "bcrypt";
// import { setCookies } from "../utils/setCookies.js";

export async function registerUser(req, res) {
  const { name, email } = req.body;
  const user = await findUserByEmail(email);
  if (user) throw createHttpError(409, "Email in use");
  const newUser = await createUser(req.body);

  res.json({
    token: newUser.token,
    user: {
      name,
      email,
    },
  });
}

export async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) throw createHttpError(401, "User not found");
  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) throw createHttpError(401, "User not found");
  const updatedUser = await updateUserWithToken(user._id);
  res.json({
    token: updatedUser.token,
    user: {
      name: updatedUser.name,
      email,
    },
  });
}

export async function logoutUser(req, res) {
  await resetToken(req.user._id);
  res.status(204).end();
}

export function refreshUser(req, res) {
  const { name, email } = req.user;
  res.json({
    name,
    email,
  });
}
