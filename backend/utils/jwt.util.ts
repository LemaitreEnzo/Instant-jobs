import { Response } from "express";
import jwt from "jsonwebtoken";
import type { StringValue } from "ms";

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const JWT_EXPIRY: StringValue = (process.env.JWT_EXPIRY ||
  "3600") as StringValue;

const generateJWT = (res: Response, userId: string) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  });

  const expiryInSeconds = parseInt(JWT_EXPIRY);
  if (isNaN(expiryInSeconds)) {
    throw new Error("Invalid JWT_EXPIRY value");
  }

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: expiryInSeconds * 1000,
    path: "/",
  });
};

const clearJWT = (res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });
};

export { clearJWT, generateJWT };
