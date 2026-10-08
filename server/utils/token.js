import jwt from "jsonwebtoken";

export const signToken = (userId) =>
  jwt.sign(
    { userId: userId.toString() },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );