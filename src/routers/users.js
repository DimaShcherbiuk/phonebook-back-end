import express from "express";
import { validateBody } from "../utils/validateBody.js";
import { createUserSchema, loginUserSchema } from "../validation/users.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUser,
} from "../controllers/users.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { checkToken } from "../middlewares/checkToken.js";

const router = express.Router();

router.post(
  "/signup",
  validateBody(createUserSchema),
  ctrlWrapper(registerUser)
);

router.post("/login", validateBody(loginUserSchema), ctrlWrapper(loginUser));
router.post("/logout", checkToken, ctrlWrapper(logoutUser));
router.get("/current", checkToken, ctrlWrapper(refreshUser));

export default router;
