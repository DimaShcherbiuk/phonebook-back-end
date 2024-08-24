import createHttpError from "http-errors";

export const validateBody = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      next(createHttpError(400, "Bad request", { error: error.details }));
    }
  };
};
