import { ApiResponse } from "../Utils/index.js";

export const GlobalErrorCaputre = (error, req, res, next) => {
  const status = error?.statusCode || 500;
  const message = error?.message || "Internal Server Error";
  return res
    .status(status)
    .json(new ApiResponse(status, message, {}, false, [error.name]));
};
