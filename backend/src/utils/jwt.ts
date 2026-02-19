import jwt from "jsonwebtoken";

const ACCESS_SECRET = "access_secret_key";
const REFRESH_SECRET = "refresh_secret_key";

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_SECRET) as { userId: string };
};
