import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "any.required": "Should be a required",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Should be a required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Should be a required",
  }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Should be a required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Should be a required",
  }),
});
