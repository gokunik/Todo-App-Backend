import { ApiResponse, VerifyJWT } from "../Utils/index.js";

export const userJwtAuthorization = (req, res, next) => {
  try {
    const jwtToken = req.cookies.jwt;
    const user = VerifyJWT(jwtToken);
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, "Verification failed!", {}, false, [
          error.name,
          error.message,
        ])
      );
  }
};
