import jwt from "jsonwebtoken";

export const generateJWT = function (data) {
  return jwt.sign(data, process.env.JWT_SECRET);
};

export const VerifyJWT = function (token) {
  return jwt.verify(token, process.env.JWT_SECRET);
};
