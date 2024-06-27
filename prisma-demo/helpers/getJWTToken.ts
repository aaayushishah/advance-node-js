import jwt, { Secret } from "jsonwebtoken";
export const getJWTToken = (userId: string) => {
  return jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET as Secret,
    { expiresIn: "1 day" }
  );
};
