import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { env } from "../utils/env.js";
import { findUserById } from "../services/users.js";

export const checkToken = async (req, res, next) => {
  const auth = req.get("Authorization");
  if (!auth) {
    next(createHttpError(401, "Unauthorization"));
    return;
  }

  const [bearer, token] = req.headers.authorization.split(" ", 2);

  if (bearer !== "Bearer" || typeof token !== "string") {
    return next(createHttpError(401, "Auth header should be type of Bearer"));
  }

  const { id } = jwt.verify(token, env("JWT_SECRET"));
  const user = await findUserById(id);
  if (!user || !user.token || user.token !== token) {
    next(createHttpError(401, "Unauthorization"));
    return;
  }
  req.user = user;
  next();
};
